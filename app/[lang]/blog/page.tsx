import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import BlogClient from "./BlogClient";
import { SITE_URL } from "@/lib/site";

const META = {
  en: {
    title: "Blog | Buddy Review",
    description: "Stay updated with the latest insights on influencer marketing, industry trends, and practical tips from the Buddy Review team.",
  },
  th: {
    title: "บล็อก | Buddy Review",
    description: "อัปเดตข้อมูลล่าสุดเกี่ยวกับ Influencer Marketing เทรนด์ในอุตสาหกรรม และเคล็ดลับที่เป็นประโยชน์จากทีม Buddy Review",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: { en: `${SITE_URL}/en/blog`, th: `${SITE_URL}/th/blog` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}/blog`,
      siteName: "Buddy Review",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [`${SITE_URL}/og-image.jpg`] },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <BlogClient lang={lang as Locale} dict={dict} />
    </Suspense>
  );
}
