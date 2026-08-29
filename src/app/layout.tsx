import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Omar Abd-Almoniem Amin Mahdy | Full-Stack Developer Portfolio",
  description: "Explore the modern full-stack web development portfolio of Omar Abd-Almoniem Amin Mahdy, specializing in React, Next.js, Node.js, and high-performance interactive interfaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/omar.ico.png" type="image/png" />
      </head>
      <body className={`${plusJakarta.variable} ${inter.variable} antialiased bg-black text-white font-sans selection:bg-red-500/30 selection:text-red-200`}>
        {children}
      </body>
    </html>
  );
}
