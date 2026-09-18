"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
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

      {/* ── Hero — one continuous diagonal-split background (Brand ↔ Influencer), side text slides in ── */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "620px",
          paddingTop: "110px",
          overflow: "hidden",
          background: "linear-gradient(100deg, #e8dcf8 0%, #ecdff5 16%, #f2e6f6 28%, #f8f2fa 40%, #ffffff 50%, #f8f2fa 60%, #f2e6f6 72%, #ecdff5 84%, #e8dcf8 100%)",
          zIndex: 10,
        }}
      >
        <div className="hero-diagonal-grid" style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1fr",
          alignItems: "center",
          minHeight: "620px",
        }}>
          {/* Left — For Brand */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ paddingRight: "24px" }}
          >
            <Link href={`/${lang}/brand`} className="hero-side-card" style={{
              position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-start",
              textAlign: "left", minHeight: "620px", padding: "56px 40px 40px",
              overflow: "hidden", textDecoration: "none",
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
              background: "linear-gradient(160deg, #ffffff 0%, #f5f2fc 100%)",
            }}>
              {/* Dotted grid pattern */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(rgba(95,38,229,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              {/* Soft purple blob */}
              <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(155,110,255,0.4) 0%, transparent 70%)", zIndex: 0 }} />
              {/* Sparkles */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0089" style={{ position: "absolute", top: "28%", right: "14%", zIndex: 1, opacity: 0.6 }}><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#5f26e5" style={{ position: "absolute", top: "58%", left: "8%", zIndex: 1, opacity: 0.5 }}><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>

              {/* Dashboard mockup, bottom-right, bleeding past the card edges */}
              <div style={{ position: "absolute", bottom: "-28px", right: "-48px", width: "82%", zIndex: 1, pointerEvents: "none" }}>
                <Image src="/hero-illustrations/brand-mockup.png" alt="" width={1341} height={1017} priority style={{ width: "100%", height: "auto", display: "block" }} />
              </div>

              {/* Text content */}
              <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px", maxWidth: "185px" }}>
                <span style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#5f26e5", background: "#ffffff", border: "1px solid rgba(95,38,229,0.2)", borderRadius: "50px", padding: "6px 14px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#5f26e5"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>
                  For Brand
                </span>
                <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,34px)", fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.2 }}>
                  {lang === "th" ? <>เปลี่ยนทุกแคมเปญ<br /><span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ให้วัดผลได้</span></> : <>Turn Every Campaign<br /><span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Into Real Results</span></>}
                </h3>
                <p style={{ ...KT, fontSize: "15px", color: "#4b5563", margin: 0, lineHeight: 1.6 }}>
                  {lang === "th" ? "กลยุทธ์ อินไซต์ และทีมที่พาแบรนด์ไปไกลขึ้น" : "Strategic insights and a team that takes your brand further."}
                </p>
                <span style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", color: "#ffffff", borderRadius: "50px", padding: "12px 12px 12px 22px", fontSize: "15px", fontWeight: 600 }}>
                  {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Center — eyebrow + headline + subhead */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px", padding: "0 20px" }}>
            <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#111827" }}>
              Buddy Review Connects
            </span>
            <h1 className="font-black uppercase" style={{
              ...KT,
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontSize: "clamp(22px,3vw,42px)", lineHeight: 1.25, margin: 0,
              fontFeatureSettings: "'pnum' on,'lnum' on",
            }}>
              DATA-POWERED<br />INFLUENCER MARKETING<br />FOR MEASURABLE GROWTH
            </h1>
            <p style={{ ...KT, color: "#374151", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
              From Strategy To Insight,<br />We Turn Influence Into Impact.
            </p>
          </div>

          {/* Right — For Creators */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ paddingLeft: "24px" }}
          >
            <Link href={`/${lang}/influencer`} className="hero-side-card" style={{
              position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center", gap: "10px", minHeight: "620px", padding: "32px 24px 32px 42px",
              overflow: "hidden", textDecoration: "none",
              clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
            }}>
              <Image src="/hero-illustrations/creator-full.svg" alt="" fill sizes="30vw" style={{ objectFit: "cover", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>For Creators</span>
                <h3 style={{ ...KT, fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: 1.25 }}>
                  {lang === "th" ? <>สร้างงานที่ใช่<br />จากสิ่งที่คุณรัก</> : <>Land Work You<br />Actually Love</>}
                </h3>
                <p style={{ ...KT, fontSize: "16px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6 }}>
                  {lang === "th" ? "เชื่อมต่อแบรนด์ชั้นนำ และเติบโตในแบบของคุณ" : "Connect with top brands and grow in your own way."}
                </p>
                <span className="btn-hero px-4 py-3 rounded-full" style={{ ...KT, marginTop: "6px", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", fontSize: "16px", fontWeight: 600 }}>
                  {lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Creators"}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 900px){
            .hero-section{ background: linear-gradient(180deg, #f2eefb 0%, #ffffff 100%) !important; }
            .hero-diagonal-grid{ grid-template-columns: 1fr !important; grid-auto-rows: auto; row-gap: 40px; padding: 40px 0; }
            .hero-diagonal-grid > div:nth-child(1), .hero-diagonal-grid > div:nth-child(3){ padding-left: 24px !important; padding-right: 24px !important; }
            .hero-side-card{ clip-path: none !important; border-radius: 16px; padding: 32px 24px !important; }
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
