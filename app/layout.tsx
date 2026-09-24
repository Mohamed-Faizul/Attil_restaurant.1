import type { Metadata } from "next";
import { DM_Sans, Fredoka, Playfair_Display } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-logo",
  weight: "600",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attil Multi Cuisine Restaurant",
  description: "A cinematic table for global flavours in Andipatti, Tamil Nadu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<WhatsAppButton /></body>
    </html>
  );
}
