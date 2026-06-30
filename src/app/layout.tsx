
import React from 'react';
import type { Metadata } from 'next';
import { Poppins, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400","500","600","700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400","700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400","700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday",
  description: "A magical interactive birthday experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
