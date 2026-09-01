import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InfluencerHero from "../../components/InfluencerHero";
import PathToPartnership from "../../components/PathToPartnership";
import UnlockIconHover from "../../components/UnlockIconHover";
import { type Locale } from "../../../i18n-config";

const META = {
  en: {
    title: "For Influencers | Buddy Review",
    description: "Join Buddy Review and connect with Thailand's top brands. Earn from reviews on Instagram, TikTok, YouTube, and more — with guaranteed on-time payments.",
  },
  th: {
    title: "สำหรับอินฟลูเอนเซอร์ | Buddy Review",
    description: "เข้าร่วม Buddy Review และเชื่อมต่อกับแบรนด์ชั้นนำ สร้างรายได้จากการรีวิวบน Instagram, TikTok, YouTube และอื่นๆ พร้อมการจ่ายเงินที่ตรงเวลาและมั่นใจได้",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/influencer`,
      languages: { en: "https://agency.buddyreview.co/en/influencer", th: "https://agency.buddyreview.co/th/influencer" },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://agency.buddyreview.co/${lang}/influencer`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["https://agency.buddyreview.co/og-image.jpg"] },
  };
}

// Lazy load below-the-fold components
const TestimonialsScrollSection = dynamic(() => import("../../components/TestimonialsScrollSection"));
const LogoMarquee = dynamic(() => import("../../components/LogoMarquee"));
const SuccessStoriesSlider = dynamic(() => import("../../components/SuccessStoriesSlider"));
const BlogPostsSection = dynamic(() => import("../../components/BlogPostsSection"));
const FAQAccordion = dynamic(() => import("../../components/FAQAccordion"));

import { getDictionary } from "../../../get-dictionary";

export default async function InfluencerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* ── Navbar — outside overflow container so position:fixed works on iOS Safari ── */}
      <Navbar lang={lang as Locale} variant="influencer" />

    <div className="hero" style={{ ...KT, overflowX: "hidden" }}>


      {/* ── Hero ── */}
      <InfluencerHero lang={lang as Locale} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee bgClassName="inf-logo-bg" fadeColor="#F7F1FC" />


      {/* ── Opportunity Banner ── */}
      <section className="inf-section" style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F9F6FE 100%)",
        padding: "100px 48px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{
            ...KT,
            fontSize: "clamp(32px,3.5vw,52px)",
            fontWeight: 800,
            lineHeight: 1.25,
            margin: "0 0 32px",
          }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "โอกาสใหม่" : "New Opportunities,"}
            </span>
            <br />
            <span style={{ color: "#111827" }}>{lang === "th" ? "เริ่มต้นได้ที่นี่" : "Start Here"}</span>
          </h2>
          <p className="desc-text" style={{
            ...KT,
            color: "#111827",
            fontSize: "18px",
            lineHeight: 1.85,
            margin: 0,
            fontWeight: 400,
          }}>
            {lang === "th" ? (
              <>Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำ<br />
              พร้อมทีมงานที่ช่วยเหลือในทุกขั้นตอน เพิ่มโอกาสสร้างรายได้จากการรีวิว</>
            ) : (
              <>Buddy Review makes being an influencer easier, with a system that connects you to leading brands<br />
              and a team that supports you every step of the way — boosting your opportunities to earn from reviews.</>
            )}
          </p>
        </div>
      </section>

      {/* ── Path to Partnership ── */}
      <PathToPartnership lang={lang as Locale} />

      {/* ── Unlock Exclusive Opportunities ── */}
      <section className="inf-section" style={{ background: "linear-gradient(180deg, #F5F0FC 0%, #F1EBFA 100%)", padding: "100px 48px" }}>
        <UnlockIconHover />
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Unlock Exclusive </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Opportunities</span>
            </h2>
          </div>

          {/* 3-column: left features | phone | right features */}
          <div className="unlock-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "2px", alignItems: "center" }}>

            {/* Left features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {(lang === "th" ? [
                { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", title: "แบรนด์เชื่อถือได้", desc: "ไม่มีแบรนด์เงียบ ไม่มีงานปลอม\nมีแต่ความโปร" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", title: "จ่ายตรง ไม่มีเบี้ยว", desc: "งานจบ เงินไม่หาย กดเบิกเองได้ทุกเมื่อ รับตามรอบแบบตรงเวลา" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", title: "รีวิวได้ครบ", desc: "จบทุกแพลตฟอร์ม ให้คุณสามารถมีโอกาส รับงานรีวิวได้หลากหลายช่องทาง" },
              ] : [
                { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", title: "Trusted Brands", desc: "No ghosting, no fake jobs\nJust professionalism." },
                { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", title: "Paid on Time, Every Time", desc: "Finish the job, keep your money — withdraw anytime and get paid on a reliable schedule." },
                { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", title: "Review Anywhere", desc: "Covers every platform, giving you the chance to take on review work across multiple channels." },
              ]).map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center — phone */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
              <Image
                className="unlock-phone-img"
                src="/buddy-rank-phone.png"
                alt="Buddy Rank"
                width={608}
                height={1200}
                style={{ width: "608px", height: "auto", display: "block", position: "relative", zIndex: 1 }}
              />
            </div>

            {/* Right features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {(lang === "th" ? [
                { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", title: "สิทธิพิเศษเฉพาะคุณ", desc: "ร่วมกิจกรรมและรับรางวัลสุดเอ็กซ์คลูซีฟ" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", title: "มืออาชีพที่อยู่เคียงข้างคุณ", desc: "ทำงานได้อย่างมั่นใจ ด้วยทีมงานมืออาชีพ และระบบที่ช่วยให้ทุกอย่างง่ายขึ้น" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", title: "แมทช์งานที่ใช่", desc: "รู้งานใหม่ก่อนใคร ด้วยระบบคัดกรองที่แมทช์งานตรงใจ ให้คุณได้ทำงานที่ใช่จากสิ่งที่ชอบ" },
              ] : [
                { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", title: "Exclusive Perks for You", desc: "Join events and win exclusive rewards." },
                { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", title: "Professionals By Your Side", desc: "Work with confidence, backed by a professional team and a system that makes everything easier." },
                { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", title: "The Right Match", desc: "Be first to know about new jobs with a matching system that connects you to work you'll actually love." },
              ]).map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── Case Studies ── */}
      <SuccessStoriesSlider lang={lang as Locale} />


      {/* ── Testimonials — scroll-jacking section (desktop) / static (mobile) ── */}
      <TestimonialsScrollSection dict={dict} lang={lang} />


      {/* ── Industry Insights ── */}
      <div style={{ background: "linear-gradient(180deg, #E9DFF7 0%, #E5D9F5 100%)" }}>
        <BlogPostsSection lang={lang as Locale} dict={dict} filterCategory="influencer" />
      </div>


      {/* ── FAQs ── */}
      <div style={{ background: "linear-gradient(180deg, #E5D9F5 0%, #E1D3F3 100%)" }}>
        <FAQAccordion faqs={dict?.faqPage?.faqsInfluencer} lang={lang as Locale} variant="influencer" dict={dict} />
      </div>

      {/* ── Pre-footer CTA ── */}
      <section className="inf-section" style={{ background: "linear-gradient(180deg, #E1D3F3 0%, #DDCDF1 100%)", padding: "80px 48px" }}>
        <div style={{
          maxWidth: "1294px",
          margin: "0 auto",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "24px",
        }}>
          <p style={{ ...KT, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.6 }}>
            {lang === "th" ? (
              <>มาเริ่มเป็นอินฟลูฯง่ายๆ แค่ปลายนิ้วกับ Buddy Review<br />สมัครฟรี! ไม่มีค่าใช้จ่าย</>
            ) : (
              <>Becoming an influencer starts right at your fingertips with Buddy Review<br />Sign up free — no cost at all!</>
            )}
          </p>
          <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
            className="btn-hero-solid-purple"
            style={{ ...KT, display: "inline-flex", alignItems: "center", borderRadius: "50px", padding: "14px 40px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
            {lang === "th" ? "สมัครเลย" : "Apply Now"}
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer lang={lang as Locale} variant="influencer" dict={dict} />

    </div>
    </>
  );
}
