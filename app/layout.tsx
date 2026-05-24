import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sichon Engineering Company | Intelligent Infrastructure Engineering",
  description:
    "Sichon Engineering Company builds practical, intelligent infrastructure for safer mobility, clean energy, environmental resilience, and trusted delivery in Kenya.",
  openGraph: {
    title: "Sichon Engineering Company",
    description:
      "Practical engineering for intelligent infrastructure and sustainable development.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071012",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
