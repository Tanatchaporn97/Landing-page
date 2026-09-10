import Link from "next/link";
import CardFanCarousel from "../../components/CardFanCarousel";
import VideoScrollFan from "../../components/VideoScrollFan";
import type { Metadata } from "next";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const INFLUENCER_HEADER_VIDEOS = [
  { src: "/videos/influencer-header/header-2.mp4", name: "Icepapan" },
  { src: "/videos/influencer-header/header-3.mp4", name: "Pookkyjdp" },
  { src: "/videos/influencer-header/header-4.mp4", name: "Nice.Naphatchw" },
  { src: "/videos/influencer-header/header-5.mp4", name: "ducky.jesse" },
  { src: "/videos/influencer-header/header-6.mp4", name: "ignoreyouuu" },
  { src: "/videos/influencer-header/header-7.mp4", name: "suppapitchayas" },
  { src: "/videos/influencer-header/header-8.mp4", name: "deerboraa" },
];

// Hoisted to a stable reference — passing a fresh array literal as a prop on
// every render would make CardFanCarousel's memoized callbacks (and the
// effect depending on them) recompute and re-run unnecessarily.
const BUDDY_RANKS_CARDS = [
  { imgUrl: "/buddy-ranks/1-followers-trimmed.png", alt: "Buddy Ranks — follower analysis" },
  { imgUrl: "/buddy-ranks/2-followers-2-trimmed.png", alt: "Buddy Ranks — audience interests" },
  { imgUrl: "/buddy-ranks/3-content-ideas-trimmed.png", alt: "Buddy Ranks — content assistant" },
  { imgUrl: "/buddy-ranks/4-content-ideas-2-trimmed.png", alt: "Buddy Ranks — content ideas" },
  { imgUrl: "/buddy-ranks/5-compare-trimmed.png", alt: "Buddy Ranks — creator comparison" },
];

import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InfluencerHero from "../../components/InfluencerHero";
import PathToPartnership from "../../components/PathToPartnership";
import UnlockIconHover from "../../components/UnlockIconHover";
import OpportunityScatter, { OpportunityScatterMobileTop, OpportunityScatterMobileBottom } from "../../components/OpportunityScatter";
import UnlockCards from "../../components/UnlockCards";
import ApplyPartnerships from "../../components/ApplyPartnerships";
import CreatorStories from "../../components/CreatorStories";
import MarqueeTicker from "../../components/MarqueeTicker";
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
      <section style={{ position: "relative", background: "#F7F2E9", overflow: "hidden", padding: "72px 0 64px" }}>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px" }}>
          <h2 style={{ margin: "0 0 24px", lineHeight: 1.1 }}>
            <span className="vs-line1" style={{ ...(lang === "th" ? KT : { fontFamily: "var(--font-playfair), serif" }), display: "block", fontWeight: lang === "th" ? 900 : 700, fontStyle: lang === "th" ? "normal" : "italic", fontSize: "clamp(36px,6vw,72px)", color: "#111827", whiteSpace: "nowrap" }}>
              {lang === "th" ? "แมทช์งานที่ใช่" : "Match the Right Job,"}
            </span>
            <span className="vs-line2" style={{ ...(lang === "th" ? KT : { fontFamily: "var(--font-playfair), serif" }), display: "block", fontWeight: 700, fontSize: "clamp(52px,9vw,128px)", whiteSpace: "nowrap",
              background: "linear-gradient(45deg, #5f26e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "ได้งานที่ชอบ" : "Get Work You Love"}
            </span>
          </h2>
          <p style={{ ...KT, fontWeight: 700, fontSize: "clamp(18px,1.8vw,28px)", color: "rgba(17,24,39,0.75)", maxWidth: "900px", lineHeight: 1.7, margin: "0 0 32px" }}>
            {lang === "th" ? (
              <>จบปัญหาความยุ่งยากในการรีวิวแบบเดิม ๆ<br />เชื่อมต่อกับแบรนด์ชั้นนำและสร้างรายได้จากสิ่งที่คุณรัก</>
            ) : (
              <>End the hassle of old-school reviewing.<br />Connect with top brands and earn from what you love.</>
            )}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
              className="vs-cta-solid"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", background: "#5f26e5", color: "#ffffff", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
              {lang === "th" ? "สมัครเลย" : "Apply Now"}
            </a>
            <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer"
              className="vs-cta-line"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", fontSize: "16px", fontWeight: 700, color: "#06C755", background: "#ffffff", border: "1.5px solid #06C755", borderRadius: "50px", padding: "10px 28px 10px 14px" }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .348-.281.629-.629.629H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.628-.63.349 0 .63.285.63.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              {lang === "th" ? "สมัครผ่านไลน์" : "Apply via LINE"}
            </a>
          </div>
        </div>

        <VideoScrollFan videos={INFLUENCER_HEADER_VIDEOS} />

        <style>{`
          .vs-cta-solid{ transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease; }
          .vs-cta-solid:hover{ background: #111827 !important; color: #ffffff !important; transform: translateY(-2px); }
          .vs-cta-line{ transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease; }
          .vs-cta-line:hover{ background: #06C755 !important; color: #ffffff !important; transform: translateY(-2px); }
          @media (max-width: 760px){
            .vs-line1, .vs-line2{ white-space: normal !important; }
          }
        `}</style>
      </section>

      {/* ── Ticker ── */}
      <MarqueeTicker items={lang === "th"
        ? ["เปิดรับ Creator ใหม่", "รับงานจากแบรนด์ชั้นนำ", "สมัครฟรี ไม่มีค่าใช้จ่าย", "จ่ายตรงเวลาทุกแคมเปญ"]
        : ["Now Accepting New Creators", "Work With Top Brands", "Apply Free — No Cost", "Paid On Time, Every Time"]} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee bgClassName="inf-logo-bg" fadeColor="#F7F1FC" />


      {/* ── Opportunity Banner ── */}
      <section className="inf-section opportunity-section" style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F9F6FE 100%)",
        padding: "100px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Desktop/tablet — decorative scatter is absolutely positioned around the (always normal-flow, always legible) heading */}
        <div className="opportunity-scatter-area" style={{ position: "relative", maxWidth: "1600px", minHeight: "700px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <OpportunityScatter lang={lang as "th" | "en"} />

          <OpportunityScatterMobileTop lang={lang as "th" | "en"} />

          <div className="opportunity-grid" style={{ width: "100%", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, boxSizing: "border-box" }}>
          <div style={{ textAlign: "center", width: "100%" }}>
            <h2 className="opportunity-heading" style={{
              ...(lang === "th" ? KT : { fontFamily: "var(--font-playfair), serif" }),
              fontSize: "clamp(28px,3.3vw,48px)",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 32px",
              whiteSpace: "nowrap",
              overflowWrap: "break-word",
            }}>
              <span style={{ fontStyle: lang === "th" ? "normal" : "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {lang === "th" ? "โอกาสใหม่ " : "New Opportunities, "}
              </span>
              <span style={{ color: "#111827" }}>{lang === "th" ? "เริ่มต้นได้ที่นี่" : "Start Here"}</span>
            </h2>
            <p className="desc-text" style={{
              ...KT,
              color: "#111827",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: "0 auto 48px",
              fontWeight: 400,
              maxWidth: "500px",
              overflowWrap: "break-word",
            }}>
              {lang === "th" ? (
                <>Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น<br />
                ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำและทีมงานที่ช่วยเหลือทุกขั้นตอน</>
              ) : (
                <>Buddy Review makes being an influencer easier,<br />
                connecting you to top brands with support every step of the way.</>
              )}
            </p>
          </div>
          </div>

          <OpportunityScatterMobileBottom lang={lang as "th" | "en"} />
        </div>

        <style>{`
          @media (max-width: 760px){
            .opportunity-scatter-area{ min-height: 0 !important; }
            .opportunity-scatter-desktop{ display: none !important; }
            .opportunity-scatter-mobile{ display: flex !important; }
          }
          @media (max-width: 560px){
            .opportunity-heading{ white-space: normal !important; overflow-wrap: break-word !important; word-break: break-word !important; font-size: clamp(22px,6.5vw,30px) !important; }
          }
        `}</style>
      </section>

      {/* ── Unlock Exclusive Opportunities ── */}
      <section className="inf-section" style={{ background: "linear-gradient(180deg, #F5F0FC 0%, #F1EBFA 100%)", padding: "100px 48px" }}>
        <UnlockIconHover />
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
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

      {/* ── Our Work / Buddy Ranks ── */}
      <section className="inf-section" style={{ background: "#F5F0FC", padding: "100px 48px", overflow: "hidden" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: lang === "th" ? "var(--font-kanit),'Noto Sans Thai',sans-serif" : "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: "0 0 24px" }}>
            <span style={{ fontStyle: lang === "th" ? "normal" : "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Buddy Ranks
            </span><br />
            {lang === "th" ? (
              <span style={{ color: "#111827" }}>รู้จักช่องตัวเองให้มากขึ้น<br />แล้วโตได้แบบมีทิศทาง</span>
            ) : (
              <span style={{ color: "#111827" }}>Know your channel better, grow with direction</span>
            )}
          </h2>
          <p className="desc-text" style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: "620px" }}>
            {lang === "th"
              ? "Buddy Ranks ใช้ AI ในการช่วยวิเคราะห์ผู้ติดตาม คอนเทนต์ และ Performance รู้ว่า คนดูคือใคร คอนเทนต์แบบไหนเวิร์ก และควรทำอะไรต่อ"
              : "Buddy Ranks uses AI to help analyze your followers, content, and performance — know who your audience is, what content works, and what to do next."}
          </p>
          <a href="https://rank.buddyreview.co/" target="_blank" rel="noopener noreferrer" className="btn-insight"
            style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 32px", textDecoration: "none" }}>
            {lang === "th" ? "วิเคราะห์ TikTok ฟรี" : "Analyze Your TikTok Free"} →
          </a>
        </div>

        {/* Apply For Partnerships — 3 numbered cards */}
        <ApplyPartnerships lang={lang as "th" | "en"} />

        {/* Hoverable fan carousel — numeric order left → right, center = 3 */}
        <div className="buddy-ranks-mockup-bleed">
          <CardFanCarousel cards={BUDDY_RANKS_CARDS} />
        </div>

        <style>{`
          @media (min-width: 768px) and (max-width: 1080px){
            .buddy-ranks-mockup-bleed{ margin-left: -32px; margin-right: -32px; }
          }
          /* Mobile: keep the fan inside the section's side padding instead of
             bleeding to the screen edge — scale it down per breakpoint so the
             outermost cards never spill past the viewport. */
          @media (max-width: 767px){
            .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.85); transform-origin: center center; }
          }
          @media (max-width: 639px){
            .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.75); }
          }
          @media (max-width: 479px){
            .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.52); }
          }
        `}</style>
      </section>

      {/* ── Path to Partnership ── */}
      <PathToPartnership lang={lang as Locale} />


      {/* ── Testimonials — scroll-jacking section (desktop) / static (mobile) ── */}
      <TestimonialsScrollSection dict={dict} lang={lang} />


      {/* ── Influencer Categories ── */}
      <section style={{ overflow: "hidden", background: "#E9DFF7" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: "0 0 48px" }}>
            Influencer{" "}
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Categories</span>
          </h2>
        </div>

        <CategoriesMarquee />
      </section>

      {/* ── Creator Stories (videos only, no heading) ── */}
      <section style={{ background: "#E9DFF7", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <CreatorStories />
        </div>
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
