import type { Metadata } from "next";
import { Inter, Kanit, Cantata_One, Playfair_Display } from "next/font/google";
import { i18n, type Locale } from "../../i18n-config";
import CtaPressEffect from "../components/CtaPressEffect";
import "../globals.css";

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} ${kanit.variable} ${cantataOne.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CtaPressEffect />
        {children}
      </body>
    </html>
  );
}
