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
  title: "Omar Abdelmonim | Front-End Developer Portfolio",
  description: "Explore the modern front-end web development portfolio of Omar Abdelmonim, specializing in React, Next.js, and high-performance interactive interfaces.",
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
