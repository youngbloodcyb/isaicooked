import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is AI Cooked?",
  description: "AGI or Bubble Pop?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col min-h-screen items-center justify-center font-mono p-8 max-w-2xl mx-auto gap-8">
          <Image src="/logo.png" alt="Is AI Cooked?" width={500} height={100} />
          {children}
        </main>
      </body>
    </html>
  );
}
