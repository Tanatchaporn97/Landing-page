import { Metadata } from "next";
import HomeClientWrapper from "../components/HomeClientWrapper";
import { type Locale } from "../../i18n-config";
import { getDictionary } from "../../get-dictionary";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return {
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        th: `${SITE_URL}/th`,
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `${SITE_URL}/${lang}`,
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

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <HomeClientWrapper lang={lang as Locale} dict={dict} />;
}
