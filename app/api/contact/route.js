import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

export const runtime = "nodejs";

let pool;
let databaseReady;

function getDatabaseConfig() {
  const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;
  const port = Number(DB_PORT);

  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME || !DB_PORT || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Database configuration is incomplete or invalid");
  }

  return { host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME, port };
}

function getDatabaseLogContext() {
  const { DB_HOST, DB_USER, DB_NAME, DB_PORT } = process.env;
  return { host: DB_HOST, port: DB_PORT, user: DB_USER, database: DB_NAME };
}

function getPool() {
  if (pool) return pool;

  const config = getDatabaseConfig();

  pool = mysql.createPool({
    ...config,
    ssl: { rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

async function ensureDatabaseReady() {
  const connectionDetails = getDatabaseLogContext();
  let connection;

  try {
    const config = getDatabaseConfig();
    Object.assign(connectionDetails, { port: config.port });
    connection = await getPool().getConnection();
    await connection.ping();
    console.info("TiDB connection verified", connectionDetails);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.info("TiDB contact_messages table verified", connectionDetails);
  } catch (error) {
    console.error("TiDB connection or schema check failed", {
      ...connectionDetails,
      code: error.code,
      message: error.message,
    });
    throw error;
  } finally {
    connection?.release();
  }
}

function prepareDatabase() {
  if (!databaseReady) {
    databaseReady = ensureDatabaseReady().catch((error) => {
      databaseReady = undefined;
      throw error;
    });
  }

  return databaseReady;
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP configuration is incomplete");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function logOperationError(operation, error) {
  console.error(`Contact ${operation} failed`, {
    ...getDatabaseLogContext(),
    code: error.code,
    errno: error.errno,
    sqlState: error.sqlState,
    message: error.message,
  });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid contact form." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please submit a valid contact form." }, { status: 400 });
  }

  try {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Name, email, phone, and message are required." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (name.length > 100 || email.length > 254 || phone.length > 20 || message.length > 65535) {
      return NextResponse.json({ error: "One or more contact fields are too long." }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

    try {
      await prepareDatabase();
      await getPool().execute(
        "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
        [name, email, phone, message]
      );
      console.info("Contact message stored in TiDB", {
        database: getDatabaseConfig().database,
        table: "contact_messages",
      });
    } catch (error) {
      logOperationError("database storage", error);
      return NextResponse.json(
        { error: "We could not store your message in the contact database. Please try again later." },
        { status: 503 }
      );
    }

    let transporter;
    try {
      transporter = getTransporter();
      await transporter.verify();
      console.info("Contact email transport verified");
    } catch (error) {
      console.error("Contact email transport verification failed", {
        code: error.code,
        message: error.message,
      });
      return NextResponse.json(
        { error: "Your message was stored, but email delivery is temporarily unavailable." },
        { status: 502 }
      );
    }

    const details = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const emailResults = await Promise.allSettled([
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: adminEmail,
        replyTo: email,
        subject: `New contact inquiry from ${name}`,
        text: `Customer inquiry\n\n${details}`,
      }),
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thank you for contacting Attil",
        text: `Hi ${name},\n\nThank you for contacting Attil Multi Cuisine Restaurant. We have received your message and will get back to you soon.\n\nYour message:\n${message}\n\nWarm regards,\nAttil Multi Cuisine Restaurant`,
      }),
    ]);

    const emailFailures = emailResults.flatMap((result, index) => {
      if (result.status === "fulfilled") return [];
      const recipient = index === 0 ? "admin" : "customer";
      console.error(`Contact ${recipient} email failed`, {
        code: result.reason.code,
        message: result.reason.message,
      });
      return [recipient];
    });

    if (emailFailures.length) {
      const deliveryIssues = emailFailures.includes("admin") && emailFailures.includes("customer")
        ? "restaurant and confirmation emails could not be sent"
        : emailFailures[0] === "admin"
          ? "the restaurant notification could not be sent"
          : "the confirmation email could not be sent";
      return NextResponse.json(
        { error: `Your message was stored, but ${deliveryIssues}. Please contact the restaurant directly if needed.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact submission configuration failed", {
      code: error.code,
      message: error.message,
    });
    return NextResponse.json(
      { error: "Contact service configuration is incomplete. Please try again later." },
      { status: 500 }
    );
  }
}