"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedCounter from "./AnimatedCounter";
import TrustedPartnerShowcase from "./TrustedPartnerShowcase";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const NewsroomSection = dynamic(() => import("./NewsroomSection"));
const FAQAccordion = dynamic(() => import("./FAQAccordion"));
const ContactFormSection = dynamic(() => import("./ContactFormSection"));


const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

/* ── Icons ── */




const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);






import { type Locale } from "../../i18n-config";

export default function HomeClientWrapper({ lang, dict }: { lang: Locale; dict: any }) {
  const t = dict?.home || {};
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);







  return (
    <div className="hero-bg min-h-screen flex flex-col overflow-x-hidden" style={{ ...KT }}>

      {/* ── Navbar ── */}
      <Navbar variant="home" lang={lang} />

      {/* ── Hero — organic "blob" side panels (Brand ↔ Influencer), headline centered between them ── */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "620px",
          paddingTop: "110px",
          overflow: "hidden",
          background: "linear-gradient(180deg, #FBF8FE 0%, #F3EBFC 100%)",
          zIndex: 10,
        }}
      >
        <div className="hero-blob-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(280px, 640px) 1fr",
          alignItems: "stretch",
          minHeight: "620px",
        }}>
          {/* Left card — For Brands, shaped like the Buddy Review "bd" mark (rounded card + tail), tilted */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ height: "100%", minWidth: 0 }}
          >
          <Link href={`/${lang}/brand`} className="hero-blob hero-blob-left" aria-label={lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", textDecoration: "none", minWidth: 0 }}>
            <div className="hero-icon-card" style={{ position: "relative", width: "clamp(330px, 37vw, 594px)", aspectRatio: "280 / 280", flexShrink: 0, marginLeft: "clamp(-12.8px, -0.512vw, -2.56px)", transform: "scale(1.28)", transformOrigin: "100% 50%" }}>
              <svg viewBox="265 450 280 280" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "drop-shadow(0 20px 32px rgba(36,17,71,0.30))" }}>
                <defs>
                  <linearGradient id="heroIconGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#241147" />
                    <stop offset="100%" stopColor="#4a2a86" />
                  </linearGradient>
                  <clipPath id="heroIconClipL" clipPathUnits="userSpaceOnUse">
                    <path d="M265,500 L445,500 A90,90 0 0 1 445,680 L265,680 Z" />
                  </clipPath>
                </defs>
                <path d="M265,500 L445,500 A90,90 0 0 1 445,680 L265,680 Z" fill="url(#heroIconGradL)" />
                <image href="/hero-illustrations/brand.svg" x="265" y="450" width="280" height="280" preserveAspectRatio="xMidYMid slice" clipPath="url(#heroIconClipL)" opacity="0.6" />
              </svg>
              <div className="hero-blob-content" style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "12px", padding: "20% 100px" }}>
                <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>
                  For Brands
                </span>
                <h3 style={{ ...KT, fontSize: "clamp(19px,2.7vw,29px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.22, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
                  {lang === "th" ? <>เปลี่ยนทุกแคมเปญ<br />ให้วัดผลได้</> : "Turn Every Campaign Into Measurable Results"}
                </h3>
                <p style={{ ...KT, fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.55, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
                  {lang === "th" ? <>กลยุทธ์ อินไซต์<br />และทีมที่พาแบรนด์ไปไกลขึ้น</> : "Strategic insights and a team that takes your brand further."}
                </p>
                <span className="hero-blob-cta" style={{ ...KT, marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", color: "#1c1140", borderRadius: "50px", padding: "8px 8px 8px 16px", fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#5f26e5", color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>→</span>
                </span>
              </div>
            </div>
          </Link>
          </motion.div>

          {/* Center — eyebrow + headline + subhead */}
          <div className="hero-blob-center" style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 20px", gap: "18px", minWidth: 0 }}>
            <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "#5f26e5", textTransform: "uppercase" }}>
              Buddy Review Connects
            </span>
            <h1 className="font-black uppercase hero-h1" style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontSize: "clamp(22px,3.6vw,46px)", lineHeight: 1.25, margin: 0, width: "100%", maxWidth: "620px",
              overflowWrap: "break-word", wordBreak: "break-word", fontFeatureSettings: "'pnum' on,'lnum' on",
            }}>
              <span className="hero-h1-line" style={{ display: "block" }}>{t.headline1?.split(" ")[0]}</span>
              <span className="hero-h1-line" style={{ display: "block" }}>{t.headline1?.split(" ").slice(1).join(" ")}</span>
              <span className="hero-h1-line" style={{ display: "block" }}>{t.headline2}</span>
            </h1>
            <p style={{ ...KT, color: "#4b5563", fontSize: "16px", lineHeight: 1.7, margin: 0, maxWidth: "380px" }}>
              From Strategy To Insight,<br />We Turn Influence Into Impact.
            </p>
          </div>

          {/* Right card — For Creators, same "bd" mark shape as the brand card, flipped 180° */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ height: "100%", minWidth: 0 }}
          >
          <Link href={`/${lang}/influencer`} className="hero-blob hero-blob-right" aria-label={lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Creators"}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end", textDecoration: "none", minWidth: 0 }}>
            <div className="hero-icon-card" style={{ position: "relative", width: "clamp(330px, 37vw, 594px)", aspectRatio: "280 / 280", flexShrink: 0, marginRight: "clamp(-12.8px, -0.512vw, -2.56px)", transform: "scale(1.28)", transformOrigin: "0% 50%" }}>
              <svg viewBox="265 450 280 280" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "scaleX(-1)", filter: "drop-shadow(0 20px 32px rgba(36,17,71,0.30))" }}>
                <defs>
                  <linearGradient id="heroIconGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#241147" />
                    <stop offset="100%" stopColor="#4a2a86" />
                  </linearGradient>
                  <clipPath id="heroIconClipR" clipPathUnits="userSpaceOnUse">
                    <path d="M265,500 L445,500 A90,90 0 0 1 445,680 L265,680 Z" />
                  </clipPath>
                </defs>
                <path d="M265,500 L445,500 A90,90 0 0 1 445,680 L265,680 Z" fill="url(#heroIconGradR)" />
                <image href="/hero-illustrations/creator.svg" x="265" y="450" width="280" height="280" preserveAspectRatio="xMidYMid slice" clipPath="url(#heroIconClipR)" opacity="0.6" />
              </svg>
              <div className="hero-blob-content" style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "12px", padding: "20% 100px" }}>
                <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>
                  For Creators
                </span>
                <h3 style={{ ...KT, fontSize: "clamp(19px,2.7vw,29px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.22, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
                  {lang === "th" ? <>สร้างงานที่ใช่<br />จากสิ่งที่คุณรัก</> : "Land Work You Actually Love"}
                </h3>
                <p style={{ ...KT, fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.55, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
                  {lang === "th" ? "เชื่อมต่อแบรนด์ชั้นนำ และเติบโตในแบบของคุณ" : "Connect with top brands and grow in your own way."}
                </p>
                <span className="hero-blob-cta" style={{ ...KT, marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", color: "#1c1140", borderRadius: "50px", padding: "8px 8px 8px 16px", fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Creators"}
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#5f26e5", color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>→</span>
                </span>
              </div>
            </div>
          </Link>
          </motion.div>
        </div>

        <style>{`
          .hero-blob-cta{ transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .hero-blob:hover .hero-blob-cta{ transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
          @media (max-width: 900px){
            .hero-blob-grid{ grid-template-columns: 1fr !important; grid-auto-rows: auto; }
            .hero-blob-left, .hero-blob-right{ min-height: 320px; }
          }
          @media (max-width: 560px){
            .hero-h1-line{ white-space: normal !important; }
            .hero-icon-card{ transform: scale(1) !important; }
          }
        `}</style>

        <div className="relative" style={{ zIndex: 12 }}>
          {/* Impact Stats — static figures from Success Stories section */}
          <div className="hero-stats-strip" style={{
            display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
            position: "relative", marginTop: "24px", paddingBottom: "48px",
          }}>
            {[
              { target: 1000000, startValue: 900000, suffix: "+", label: lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network" },
              { target: 1000, startValue: 900, suffix: "+", label: lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients" },
              { target: 4000, startValue: 3000, suffix: "+", label: lang === "th" ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered" },
            ].map((s) => (
              <motion.div key={s.label} className="hero-stat-item" style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "6px",
                padding: "10px 20px",
                width: "280px",
                boxSizing: "border-box",
              }}
              whileHover={{
                scale: [null, 1.05, 1.08],
                transition: { duration: 0.5, times: [0, 0.6, 1], ease: ["easeInOut", "easeOut"] },
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>
                <span style={{
                  ...KT, fontSize: "31px", fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap",
                  background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  <AnimatedCounter target={s.target} startValue={s.startValue} suffix={s.suffix} />
                </span>
                <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", lineHeight: 1.35, whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ── Hero → Logos fade overlay ── */}
      <div className="hero-logos-fade" style={{ height: "120px", marginTop: "-120px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 11, pointerEvents: "none" }} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee />

      {/* ── Your Trusted Partner ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }} className="px-6 trusted-section partner-bg">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Heading */}
          <div className="text-center" style={{ maxWidth: "954px", margin: "0 auto" }}>
            <h2 className="section-title font-bold mb-6 section-h2-fixed"
              style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", textAlign: "center",
                fontFeatureSettings: "'pnum' on,'lnum' on" }}>
              Your Trusted Partner in Thailand&apos;s<br/>
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Influencer Marketing Landscape
              </span>
            </h2>
            <p className="font-normal desc-text"
              style={{ fontSize: "16px", lineHeight: "1.7", textAlign: "center",
                color: "#111827" }}>
              {lang === "th" ? (
                <>Buddy Review ช่วยแบรนด์วางแผนและบริหาร Influencer Marketing ตั้งแต่การวางกลยุทธ์<br/>
                คัดเลือกอินฟลูเอนเซอร์ ดูแลแคมเปญ ไปจนถึงการวัดผล ด้วยทีมที่มีประสบการณ์ พร้อม Data<br/>
                และ Technology ที่ช่วยให้วางแผน ตัดสินใจ และวัดผลแคมเปญได้อย่างมีประสิทธิภาพ</>
              ) : (
                <>An Influencer Marketing agency blending data, technology, and expert teams<br/>
                to craft precise, measurable campaigns that drive sustainable business growth.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Benefit ── */}
      <section style={{ background: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }} className="px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <TrustedPartnerShowcase lang={lang as "th" | "en"} />
        </div>
      </section>

      {/* ── Industry Insights ── */}
      <NewsroomSection lang={lang} dict={dict} />

      {/* ── FAQs ── */}
      <FAQAccordion faqs={dict?.homeFaqs} lang={lang} variant="home" dict={dict} />

      <div id="contact" className="contact-bg" style={{ padding: "80px 0" }}>
        <ContactFormSection lang={lang} dict={dict?.contactForm} />
      </div>

      {/* ── Footer ── */}
      <Footer variant="home" lang={lang} dict={dict} />

    </div>
  );
}

const th = {
  contactUs:    "ติดต่อเรา",
  imInfluencer: "สำหรับอินฟลูเอนเซอร์",
  imBrand:      "ฉันคือแบรนด์",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "พร้อมเริ่มต้นแล้วหรือยัง?",
  ctaSub:       "เข้าร่วมกับแบรนด์และอินฟลูเอนเซอร์หลายร้อยรายที่เติบโตกับ Buddy Review",
  viewMore:     "ดูเพิ่มเติม",
  readMore:     "อ่านเพิ่มเติม",
  showLess:     "ดูน้อยลง",
  stillHaveQuestions: "มีคำถามเพิ่มเติมไหม?",
};

const en = {
  contactUs:    "Contact Us",
  imInfluencer: "I'm an Influencer",
  imBrand:      "I'm a Brand",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "Ready to get started?",
  ctaSub:       "Join hundreds of brands and influencers already growing with Buddy Review.",
  viewMore:     "View More",
  readMore:     "Read More",
  showLess:     "Show Less",
  stillHaveQuestions: "Still have questions?",
};
