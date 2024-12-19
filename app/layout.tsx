import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Wrapper from "./Wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ItemsFind QR Code Generator | Personalized QR Codes from Your Data",
  description:
    "Create custom QR codes instantly with ItemsFind. Transform your personal, business, or product information into shareable, scannable QR codes with ease and precision.",
  keywords: [
    "QR code generator",
    "custom QR code",
    "personalized QR code",
    "data to QR code",
    "instant QR creation",
    "user-generated QR codes",
    "free QR code maker",
    "digital information sharing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrapper>
          <Navbar />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
