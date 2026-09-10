import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactFormSection from "../../components/ContactFormSection";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import type { Metadata } from "next";

const META = {
  en: {
    title: "Contact Us | Buddy Review",
    description: "Get in touch with Buddy Review — Thailand's influencer marketing agency. Tell us about your brand or campaign and we'll get back to you.",
  },
  th: {
    title: "ติดต่อเรา | Buddy Review",
    description: "ติดต่อ Buddy Review เอเจนซี่ Influencer Marketing ของไทย เล่าให้เราฟังเกี่ยวกับแบรนด์หรือแคมเปญของคุณ แล้วเราจะติดต่อกลับ",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/contact`,
      languages: { en: "https://agency.buddyreview.co/en/contact", th: "https://agency.buddyreview.co/th/contact" },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://agency.buddyreview.co/${lang}/contact`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["https://agency.buddyreview.co/og-image.jpg"] },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="background" style={{ minHeight: "100vh" }}>
      <Navbar lang={lang as Locale} variant="home" />
      <div style={{ paddingTop: "80px" }}>
        <ContactFormSection lang={lang as Locale} dict={dict?.contactForm} />
      </div>
      <Footer variant="home" lang={lang as Locale} dict={dict} />
    </div>
  );
}
