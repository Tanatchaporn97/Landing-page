import type { Metadata } from "next";
import { type Locale } from "../../../i18n-config";
import BuddyRanksClient from "./BuddyRanksClient";
import { SITE_URL } from "@/lib/site";

const META = {
  en: {
    title: "Buddy Ranks | Buddy Review",
    description: "Discover Buddy Review's influencer ranking system. Level up your profile and unlock exclusive brand campaigns and higher earning potential.",
  },
  th: {
    title: "Buddy Ranks | Buddy Review",
    description: "ค้นพบระบบการจัดอันดับอินฟลูเอนเซอร์ของ Buddy Review เพิ่มระดับโปรไฟล์เพื่อปลดล็อกแคมเปญจากแบรนด์ชั้นนำและเพิ่มโอกาสสร้างรายได้",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/buddy-ranks`,
      languages: { en: `${SITE_URL}/en/buddy-ranks`, th: `${SITE_URL}/th/buddy-ranks` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}/buddy-ranks`,
      siteName: "Buddy Review",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [`${SITE_URL}/og-image.jpg`] },
  };
}

export default async function BuddyRanksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <BuddyRanksClient lang={lang as Locale} />;
}
