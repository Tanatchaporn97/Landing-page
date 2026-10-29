import { Metadata } from "next";
import BrandClientWrapper from "../../components/BrandClientWrapper";
import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { SITE_URL } from "@/lib/site";
import { FaqJsonLd } from "../../components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/brand`,
      languages: {
        en: `${SITE_URL}/en/brand`,
        th: `${SITE_URL}/th/brand`,
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `${SITE_URL}/${lang}/brand`,
      siteName: 'Buddy Review',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seo.title,
      description: dict.seo.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <FaqJsonLd faqs={(dict?.brandFaqs || []).slice(0, 8)} />
      <BrandClientWrapper lang={lang as Locale} dict={dict} />
    </>
  );
}
