import { Suspense } from "react";
import type { Metadata } from "next";
import { type Locale } from "../../../i18n-config";
import SuccessClient from "./SuccessClient";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const isTh = lang === "th";

  const title = isTh ? "เรื่องราวความสำเร็จ | Buddy Review" : "Success Stories | Buddy Review";
  const description = isTh
    ? "ดูผลลัพธ์จริงจากแคมเปญ Influencer Marketing ที่ขับเคลื่อนด้วยข้อมูล ผ่าน Success Stories ของแบรนด์ที่ร่วมงานกับ Buddy Review"
    : "See real results from data-driven Influencer Marketing campaigns. Explore success stories from brands that partnered with Buddy Review.";
  const canonical = `https://agency.buddyreview.co/${lang}/success`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        th: "https://agency.buddyreview.co/th/success",
        en: "https://agency.buddyreview.co/en/success",
        "x-default": "https://agency.buddyreview.co/th/success",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      type: "website",
      locale: isTh ? "th_TH" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://agency.buddyreview.co/og-image.jpg"],
    },
  };
}

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <SuccessClient lang={lang as Locale} />
    </Suspense>
  );
}
