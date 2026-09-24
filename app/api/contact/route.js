import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

export const runtime = "nodejs";

let pool;

function getPool() {
  if (pool) return pool;

  const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error("Database configuration is incomplete");
  }

  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
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

export async function POST(request) {
  try {
    const body = await request.json();
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

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

    const transporter = getTransporter();
    const details = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

    await Promise.all([
      getPool().execute(
        "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
        [name, email, phone, message],
      ),
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

    return NextResponse.json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "We could not save or send your message right now. Please try again later." }, { status: 500 });
  }
}