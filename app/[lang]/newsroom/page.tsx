import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import NewsroomClient from "./NewsroomClient";
import { SITE_URL } from "@/lib/site";

const META = {
  en: {
    title: "Newsroom | Buddy Review",
    description: "Latest news, event recaps, and announcements from Buddy Review.",
  },
  th: {
    title: "ข่าวสาร | Buddy Review",
    description: "ข่าวสาร กิจกรรม และประกาศล่าสุดจาก Buddy Review",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/newsroom`,
      languages: { en: `${SITE_URL}/en/newsroom`, th: `${SITE_URL}/th/newsroom` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}/newsroom`,
      siteName: "Buddy Review",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [`${SITE_URL}/og-image.jpg`] },
  };
}

export default async function NewsroomPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <NewsroomClient lang={lang as Locale} dict={dict} />
    </Suspense>
  );
}
