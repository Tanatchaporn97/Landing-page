import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const META = {
  en: { title: "About Us | Buddy Review", description: "Learn more about Buddy Review, Thailand's influencer marketing agency." },
  th: { title: "เกี่ยวกับเรา | Buddy Review", description: "รู้จัก Buddy Review เอเจนซี่ Influencer Marketing ของไทย" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/about`,
      languages: { en: "https://agency.buddyreview.co/en/about", th: "https://agency.buddyreview.co/th/about" },
    },
    openGraph: {
      title: m.title, description: m.description,
      url: `https://agency.buddyreview.co/${lang}/about`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US", type: "website",
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="background" style={{ ...KT, minHeight: "100vh" }}>
      <Navbar lang={lang as Locale} variant="home" />

      <section style={{ padding: "160px 48px 120px", textAlign: "center" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h1 className="section-title font-bold" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.2, margin: "0 0 32px" }}>
            {lang === "th" ? "เกี่ยวกับ" : "About"}{" "}
            <span style={{ background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "เรา" : "Us"}
            </span>
          </h1>
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 32px rgba(95,38,229,0.15)" }}>
            <iframe
              src="https://www.youtube.com/embed/sONGZCJUv1I"
              title="Buddy Review"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <p style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.85, margin: "32px 0 0" }}>
            {lang === "th"
              ? "เพราะทุกแบรนด์ควรได้รับบริการที่ดีที่สุด เราจึงมุ่งพัฒนาแพลตฟอร์มและโซลูชันที่ขับเคลื่อนด้วยเทคโนโลยีและดาต้า เพื่อให้แคมเปญของคุณตอบโจทย์ คุ้มค่า และมีผลลัพธ์ที่ตรงตามเป้าหมาย"
              : "Because every brand deserves the best service, we're committed to building technology- and data-driven platforms and solutions — so your campaigns hit the mark, deliver value, and achieve the results you're aiming for."}
          </p>
        </div>
      </section>

      <Footer lang={lang as Locale} variant="home" dict={dict} />
    </div>
  );
}
