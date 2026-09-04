import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OurJourney from "../../components/OurJourney";
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

      <section style={{ padding: "160px 0 120px", textAlign: "center" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 48px" }}>
          <h1 className="section-title font-bold" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.2, margin: "0 0 32px" }}>
            {lang === "th" ? "เกี่ยวกับ" : "About"}{" "}
            <span style={{ background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "เรา" : "Us"}
            </span>
          </h1>
        </div>

        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
          <iframe
            src="https://www.youtube.com/embed/sONGZCJUv1I?autoplay=1&mute=1&playsinline=1"
            title="Buddy Review"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 48px" }}>
          <p style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.85, margin: "32px 0 0" }}>
            {lang === "th"
              ? "เพราะทุกแบรนด์ควรได้รับบริการที่ดีที่สุด เราจึงมุ่งพัฒนาแพลตฟอร์มและโซลูชันที่ขับเคลื่อนด้วยเทคโนโลยีและดาต้า เพื่อให้แคมเปญของคุณตอบโจทย์ คุ้มค่า และมีผลลัพธ์ที่ตรงตามเป้าหมาย"
              : "Because every brand deserves the best service, we're committed to building technology- and data-driven platforms and solutions — so your campaigns hit the mark, deliver value, and achieve the results you're aiming for."}
          </p>
        </div>

        {/* ── Vision / Mission / Value ── */}
        <div style={{ maxWidth: "1294px", margin: "80px auto 0", padding: "0 48px" }}>
          <div className="vmv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {(lang === "th" ? [
              { title: "Vision", desc: "ศูนย์กลาง Influencer Marketing ด้วยเทคโนโลยีล้ำสมัย เพื่อให้แบรนด์เข้าถึงผู้บริโภคอย่างมีประสิทธิภาพ" },
              { title: "Mission", desc: "พัฒนาระบบที่ผสานเทคโนโลยีกับความเข้าใจตลาดอินฟลูเอนเซอร์ เพื่อตอบโจทย์ทุกความต้องการของแบรนด์" },
              { title: "Value", desc: "มอบแคมเปญพรีเมียมที่ปรับแต่งได้ เน้นผลลัพธ์ตรงเป้าและคุ้มค่า เพราะทุกแบรนด์ควรได้รับบริการที่ดีที่สุด" },
            ] : [
              { title: "Vision", desc: "The hub of influencer marketing powered by cutting-edge technology, helping brands reach consumers effectively." },
              { title: "Mission", desc: "Building systems that blend technology with a deep understanding of the influencer market to meet every brand's needs." },
              { title: "Value", desc: "Delivering customizable premium campaigns focused on real results and value — because every brand deserves the best service." },
            ]).map((item) => (
              <div key={item.title} style={{
                borderRadius: "24px",
                padding: "48px 32px",
                textAlign: "center",
                background: "rgba(255,255,255,0.32)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
              }}>
                <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 800, margin: "0 0 20px",
                  background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {item.title}
                </h3>
                <p style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Journey ── */}
        <OurJourney lang={lang as Locale} />
      </section>

      <Footer lang={lang as Locale} variant="home" dict={dict} />
    </div>
  );
}
