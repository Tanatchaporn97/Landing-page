import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CARD_IMGS: Record<string, string> = {
  nissin:        "/success-stories-2/Success stories-08.jpg",
  "ldc-dental":  "/success-stories-2/Success stories-09.jpg",
  watsons:       "/success-stories-2/Success stories-10.jpg",
  viu:           "/success-stories-2/Success stories-11.jpg",
  ahc:           "/success-stories-2/Success stories-12.jpg",
  "guss-damn-good": "/success-stories-2/Success stories-13.jpg",
};

const META = {
  en: { title: "Success Stories | Buddy Review", description: "Explore real campaign results from top brands that partnered with Buddy Review for influencer marketing." },
  th: { title: "เรื่องราวความสำเร็จ | Buddy Review", description: "ดูผลลัพธ์จริงจากแคมเปญของแบรนด์ชั้นนำที่ร่วมงานกับ Buddy Review" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/success-stories`,
      languages: { en: "https://agency.buddyreview.co/en/success-stories", th: "https://agency.buddyreview.co/th/success-stories" },
    },
    openGraph: {
      title: m.title, description: m.description,
      url: `https://agency.buddyreview.co/${lang}/success-stories`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US", type: "website",
    },
  };
}

export default async function SuccessStoriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const stories: any[] = dict.successStories ?? [];

  return (
    <div className="background" style={{ ...KT, minHeight: "100vh" }}>
      <Navbar lang={lang as Locale} variant="home" />

      {/* Hero */}
      <section style={{ padding: "140px 48px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 className="section-title font-bold" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.2, margin: "0 0 20px" }}>
            Success{" "}
            <span style={{ background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Stories
            </span>
          </h1>
          <p style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            {lang === "th"
              ? "ผลลัพธ์จริงจากแคมเปญของแบรนด์ชั้นนำที่ไว้วางใจ Buddy Review"
              : "Real results from leading brands that trust Buddy Review"}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "0 48px 100px" }} className="success-stories-grid-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="success-stories-grid">
          {stories.map((story) => {
            const img = CARD_IMGS[story.slug] ?? story.logo;
            return (
              <Link key={story.slug} href={`/${lang}/success/${story.slug}`} style={{ textDecoration: "none" }}>
                <div className="ss-card" style={{
                  borderRadius: "28px", overflow: "hidden", height: "460px", position: "relative",
                  background: "rgba(255,255,255,0.22)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.45)", boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                  transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer",
                }}>
                  <Image src={img} alt={story.brand} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)" }} />
                  {/* Content */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                    <span style={{ ...KT, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" as const }}>
                      {story.industry}
                    </span>
                    <h2 style={{ ...KT, fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "6px 0 8px", lineHeight: 1.2 }}>{story.brand}</h2>
                    <p style={{ ...KT, fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
                      {lang === "th" ? story.tagline : (story.taglineEn ?? story.tagline)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer lang={lang as Locale} variant="home" dict={dict} />
    </div>
  );
}
