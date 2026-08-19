import { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import FaqClient from "./FaqClient";

const META = {
  en: {
    title: "FAQs | Buddy Review",
    description: "Find answers to common questions about Buddy Review's influencer marketing services, pricing, platforms, and how we work with brands and influencers.",
  },
  th: {
    title: "คำถามที่พบบ่อย | Buddy Review",
    description: "รวมคำตอบทุกข้อสงสัยเกี่ยวกับ Buddy Review ไม่ว่าคุณจะเป็นแบรนด์หรืออินฟลูเอนเซอร์ ค้นหาคำตอบที่คุณต้องการได้ที่นี่",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/faq`,
      languages: { en: "https://agency.buddyreview.co/en/faq", th: "https://agency.buddyreview.co/th/faq" },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://agency.buddyreview.co/${lang}/faq`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["https://agency.buddyreview.co/og-image.jpg"] },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const allFaqs = [
    ...(dict?.faqPage?.faqsBrand ?? []),
    ...(dict?.faqPage?.faqsInfluencer ?? []),
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <FaqClient lang={lang as Locale} dict={dict} />
      </Suspense>
    </>
  );
}
