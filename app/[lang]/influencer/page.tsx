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
import OpportunityVisual, { OpportunityPhone } from "../../components/OpportunityVisual";
import UnlockCards from "../../components/UnlockCards";
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
const CategoriesMarquee = dynamic(() => import("../../components/CategoriesMarquee"));
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

      {/* ── Video Showcase ── */}
      <section style={{ position: "relative", minHeight: "60vh", overflow: "hidden" }}>
        <div className="video-showcase-row" style={{ position: "absolute", inset: 0, display: "flex" }}>
          {["/videos/influencer-header/header-1.mp4", "/videos/influencer-header/header-2.mp4", "/videos/influencer-header/header-3.mp4"].map((src) => (
            <video key={src} autoPlay muted loop playsInline
              style={{ flex: 1, minWidth: 0, height: "100%", objectFit: "cover" }}>
              <source src={src} type="video/mp4" />
            </video>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,20,0.28)" }} />

        <div style={{ position: "relative", zIndex: 1, minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "64px 16px" }}>
          <h2 style={{ margin: "0 0 24px", lineHeight: 1.15 }}>
            <span className="vs-line1" style={{ ...KT, display: "block", fontWeight: 900, fontSize: "clamp(40px,7vw,80px)", color: "#ffffff", whiteSpace: "nowrap" }}>
              {lang === "th" ? "แมทช์งานที่ใช่" : "Match the Right Job,"}
            </span>
            <span className="vs-line2" style={{ ...KT, display: "block", fontWeight: 900, fontSize: "clamp(60px,10vw,140px)", whiteSpace: "nowrap",
              background: "linear-gradient(45deg, #a78bfa 0%, #ff8bc7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "ได้งานที่ชอบ" : "Get Work You Love"}
            </span>
          </h2>
          <p style={{ ...KT, fontWeight: 700, fontSize: "clamp(15px,1.6vw,18px)", color: "rgba(255,255,255,0.9)", maxWidth: "900px", lineHeight: 1.8, margin: "0 0 32px" }}>
            {lang === "th" ? (
              <>จบปัญหาความยุ่งยากในการรีวิวแบบเดิม ๆ<br />เชื่อมต่อกับแบรนด์ชั้นนำและสร้างรายได้จากสิ่งที่คุณรัก</>
            ) : (
              <>End the hassle of old-school reviewing.<br />Connect with top brands and earn from what you love.</>
            )}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", background: "#5f26e5", color: "#ffffff", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
              {lang === "th" ? "สมัครเลย" : "Apply Now"}
            </a>
            <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", fontSize: "16px", fontWeight: 700, color: "#111827", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(95,38,229,0.25)", borderRadius: "50px", padding: "10px 28px 10px 14px" }}>
              <Image src="/social/Line.png" alt="LINE" width={26} height={26} style={{ borderRadius: "6px" }} />
              {lang === "th" ? "สมัครผ่านไลน์" : "Apply via LINE"}
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 760px){
            .video-showcase-row{ flex-direction: column; }
            .vs-line1, .vs-line2{ white-space: normal !important; }
          }
        `}</style>
      </section>

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee bgClassName="inf-logo-bg" fadeColor="#F7F1FC" />


      {/* ── Opportunity Banner ── */}
      <section className="inf-section" style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F9F6FE 100%)",
        padding: "100px 48px",
      }}>
        <div className="opportunity-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div style={{ textAlign: "left" }}>
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
              margin: "0 0 48px",
              fontWeight: 400,
              maxWidth: "460px",
            }}>
              {lang === "th" ? (
                <>Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น<br />
                ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำ พร้อมทีมงานที่ช่วยเหลือ<br />
                ในทุกขั้นตอน เพิ่มโอกาสสร้างรายได้จากการรีวิว</>
              ) : (
                <>Buddy Review makes being an influencer easier,<br />
                with a system that connects you to leading brands<br />
                and a team supporting you every step of the way.</>
              )}
            </p>

            <OpportunityVisual lang={lang as "th" | "en"} />
          </div>

          {/* Mobile mockup — same image as the Header */}
          <OpportunityPhone />
        </div>

        <style>{`
          @media (max-width: 900px){
            .opportunity-grid{ grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Path to Partnership ── */}
      <PathToPartnership lang={lang as Locale} />

      {/* ── Our Work ── */}
      <section className="inf-section" style={{ background: "#ffffff", padding: "100px 48px" }}>
        <div className="our-work-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <p style={{ ...KT, fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 12px" }}>
              {lang === "th" ? "ผลงานของเรา" : "OUR WORK"}
            </p>
            <h2 style={{ fontFamily: lang === "th" ? "var(--font-kanit),'Noto Sans Thai',sans-serif" : "var(--font-playfair), serif", fontWeight: 800, fontSize: "clamp(32px,3.5vw,52px)", lineHeight: 1.25, margin: 0, color: "#111827" }}>
              {lang === "th" ? (
                <>รู้จักช่องตัวเองให้มากขึ้น<br />
                <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  แล้วโตได้แบบมีทิศทาง
                </span></>
              ) : (
                <>Know your channel better,{" "}
                <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  grow with direction
                </span></>
              )}
            </h2>
          </div>
          <div>
            <p className="desc-text" style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.85, margin: "0 0 32px" }}>
              {lang === "th"
                ? "ทุกแคมเปญมีเรื่องราว เราช่วยแบรนด์และอินฟลูเอนเซอร์สร้างผลลัพธ์ที่จับต้องได้ ผ่านกลยุทธ์ที่แม่นยำและคอนเทนต์ที่เข้าถึงใจ มาดูกันว่าเราช่วยแบรนด์ต่างๆ ประสบความสำเร็จได้อย่างไร"
                : "Every campaign has a story. We help brands and influencers create real, measurable results through precise strategy and content that resonates. See how we've helped brands succeed."}
            </p>
            <Link href={`/${lang}/success`} className="btn-insight"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 32px", textDecoration: "none" }}>
              {lang === "th" ? "ดูผลงานของเรา" : "See Our Work"} →
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px){
            .our-work-grid{ grid-template-columns: 1fr !important; text-align: center !important; }
          }
        `}</style>
      </section>

      {/* ── Unlock Exclusive Opportunities ── */}
      <section className="inf-section" style={{ background: "linear-gradient(180deg, #F5F0FC 0%, #F1EBFA 100%)", padding: "100px 48px" }}>
        <UnlockIconHover />
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Unlock Exclusive </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Opportunities</span>
            </h2>
          </div>

          {/* Click-to-expand card row */}
          <UnlockCards items={lang === "th" ? [
            { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", bg: "#d7f2df", title: "แบรนด์เชื่อถือได้", desc: "ไม่มีแบรนด์เงียบ ไม่มีงานปลอม มีแต่ความโปร" },
            { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", bg: "#fbdce9", title: "จ่ายตรง ไม่มีเบี้ยว", desc: "งานจบ เงินไม่หาย กดเบิกเองได้ทุกเมื่อ รับตามรอบแบบตรงเวลา" },
            { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", bg: "#dbeafe", title: "รีวิวได้ครบ", desc: "จบทุกแพลตฟอร์ม ให้คุณสามารถมีโอกาส รับงานรีวิวได้หลากหลายช่องทาง" },
            { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", bg: "#fde8cf", title: "สิทธิพิเศษเฉพาะคุณ", desc: "ร่วมกิจกรรมและรับรางวัลสุดเอ็กซ์คลูซีฟ" },
            { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", bg: "#e5ddfb", title: "มืออาชีพที่อยู่เคียงข้างคุณ", desc: "ทำงานได้อย่างมั่นใจ ด้วยทีมงานมืออาชีพ และระบบที่ช่วยให้ทุกอย่างง่ายขึ้น" },
            { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", bg: "#d6f3f5", title: "แมทช์งานที่ใช่", desc: "รู้งานใหม่ก่อนใคร ด้วยระบบคัดกรองที่แมทช์งานตรงใจ ให้คุณได้ทำงานที่ใช่จากสิ่งที่ชอบ" },
          ] : [
            { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", bg: "#d7f2df", title: "Trusted Brands", desc: "No ghosting, no fake jobs. Just professionalism." },
            { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", bg: "#fbdce9", title: "Paid on Time, Every Time", desc: "Finish the job, keep your money — withdraw anytime and get paid on a reliable schedule." },
            { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", bg: "#dbeafe", title: "Review Anywhere", desc: "Covers every platform, giving you the chance to take on review work across multiple channels." },
            { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", bg: "#fde8cf", title: "Exclusive Perks for You", desc: "Join events and win exclusive rewards." },
            { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", bg: "#e5ddfb", title: "Professionals By Your Side", desc: "Work with confidence, backed by a professional team and a system that makes everything easier." },
            { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", bg: "#d6f3f5", title: "The Right Match", desc: "Be first to know about new jobs with a matching system that connects you to work you'll actually love." },
          ]} />
        </div>
      </section>


      {/* ── Testimonials — scroll-jacking section (desktop) / static (mobile) ── */}
      <TestimonialsScrollSection dict={dict} lang={lang} />


      {/* ── Influencer Categories ── */}
      <section style={{ overflow: "hidden", background: "#E9DFF7" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Influencer{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Categories</span>
          </h2>
        </div>

        <CategoriesMarquee />
      </section>

      {/* ── Industry Insights → FAQs → Pre-footer CTA: one continuous blended background ── */}
      <div style={{ background: "linear-gradient(180deg, #E9DFF7 0%, #DDCDF1 100%)" }}>

        {/* ── FAQs ── */}
        <FAQAccordion faqs={dict?.faqPage?.faqsInfluencer} lang={lang as Locale} variant="influencer" dict={dict} />

        {/* ── Pre-footer CTA ── */}
        <section className="inf-section" style={{ padding: "80px 48px" }}>
          <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
            <div style={{
              width: "100%",
              minHeight: "200px",
              boxSizing: "border-box",
              backgroundImage: "url(/gradient-landing-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "32px",
              boxShadow: "0 8px 32px rgba(95,38,229,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "24px",
              padding: "56px 48px",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {lang === "th" ? (
                  <>
                    <h3 style={{ ...KT, fontSize: "clamp(26px,3.4vw,42px)", fontWeight: 800, margin: 0, lineHeight: 1.3,
                      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      อยากเป็น Influencer แต่ไม่รู้จะเริ่มตรงไหน?
                    </h3>
                    <p style={{ ...KT, fontSize: "clamp(16px,1.9vw,20px)", fontWeight: 400, color: "rgba(1,8,47,0.78)", margin: 0, lineHeight: 1.7 }}>
                      เริ่มต้นง่าย ๆ กับ <span style={{ color: "#5f26e5", fontWeight: 700 }}>Buddy Review</span> เปิดรับโอกาสใหม่ ๆ และเติบโตไปพร้อมกับเรา
                    </p>
                    <p style={{ ...KT, fontSize: "clamp(18px,2.1vw,24px)", fontWeight: 700, color: "#2d137d", margin: 0, lineHeight: 1.5 }}>
                      สมัครฟรี ไม่มีค่าใช้จ่าย
                    </p>
                  </>
                ) : (
                  <>
                    <h3 style={{ ...KT, fontSize: "clamp(26px,3.4vw,42px)", fontWeight: 800, color: "#01082F", margin: 0, lineHeight: 1.3 }}>
                      Want to be an influencer but don&apos;t know where to start?
                    </h3>
                    <p style={{ ...KT, fontSize: "clamp(16px,1.9vw,20px)", fontWeight: 400, color: "rgba(1,8,47,0.78)", margin: 0, lineHeight: 1.7 }}>
                      It&apos;s easy with <span style={{ color: "#5f26e5", fontWeight: 700 }}>Buddy Review</span> — unlock new opportunities and grow together with us.
                    </p>
                    <p style={{ ...KT, fontSize: "clamp(18px,2.1vw,24px)", fontWeight: 700, color: "#2d137d", margin: 0, lineHeight: 1.5 }}>
                      Sign up free — no cost at all!
                    </p>
                  </>
                )}
              </div>
              <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
                className="btn-hero-solid-purple"
                style={{ ...KT, display: "inline-flex", alignItems: "center", borderRadius: "50px", padding: "14px 40px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
                {lang === "th" ? "สมัครเลย" : "Apply Now"}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <Footer lang={lang as Locale} variant="influencer" dict={dict} />

    </div>
    </>
  );
}
