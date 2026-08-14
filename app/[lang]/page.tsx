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
      canonical: `https://www.yourdomain.com/${lang}`,
      languages: {
        en: 'https://www.yourdomain.com/en',
        th: 'https://www.yourdomain.com/th',
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `https://www.yourdomain.com/${lang}`,
      siteName: 'Buddy Review',
      images: [
        {
          url: 'https://www.yourdomain.com/og-image.jpg', // TODO: เปลี่ยนเป็น URL รูปจริงของคุณ
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
      images: ['https://www.yourdomain.com/og-image.jpg'], // TODO: เปลี่ยนเป็น URL รูปจริงของคุณ
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <HomeClientWrapper lang={lang as Locale} dict={dict} />;
}
