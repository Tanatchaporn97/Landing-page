import type { Metadata } from "next";
import { Inter, Kanit, Cantata_One, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cantataOne = Cantata_One({ weight: "400", subsets: ["latin"], variable: "--font-cantata" });
const playfair = Playfair_Display({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-playfair" });
const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buddy Review — Data-Powered Influencer Marketing",
  description: "From Strategy To Insight, We Turn Influence Into Impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${kanit.variable} ${cantataOne.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
