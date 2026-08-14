import { Metadata } from "next";
import HomeClientWrapper from "../components/HomeClientWrapper";
import { type Locale } from "../../i18n-config";
import { getDictionary } from "../../get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return {
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: {
      canonical: `https://landing-page-bubblely.vercel.app/${lang}`,
      languages: {
        en: 'https://landing-page-bubblely.vercel.app/en',
        th: 'https://landing-page-bubblely.vercel.app/th',
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `https://landing-page-bubblely.vercel.app/${lang}`,
      siteName: 'Buddy Review',
      images: [
        {
          url: 'https://landing-page-bubblely.vercel.app/og-image.jpg',
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
      images: ['https://landing-page-bubblely.vercel.app/og-image.jpg'],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <HomeClientWrapper lang={lang as Locale} dict={dict} />;
}
