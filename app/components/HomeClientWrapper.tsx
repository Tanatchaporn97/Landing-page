"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
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

      {/* ── Hero — brand/influencer panels slide in from the sides, heading stays centered in the gap ── */}
      <section
        className="hero-section hero-header-glow"
        style={{
          position: "relative",
          minHeight: "88vh",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Background image */}
        <Image src="/header-landing-bg3.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" style={{
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,5,20,0.30)", zIndex: 1 }} />

        {/* Left panel — Brand, slides in from the left, stops short of center */}
        <motion.div
          className="hero-side-panel hero-side-panel-left"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "absolute", left: 0, top: 0, bottom: "220px", width: "clamp(160px, 20vw, 320px)", zIndex: 2 }}
        >
          <Link href={`/${lang}/brand`} className="hero-split-panel" style={{
            ...KT, textDecoration: "none", position: "relative", display: "block", width: "100%", height: "100%", overflow: "hidden",
          }}>
            <Image src="/heading-website-brand.jpg" alt={t.imBrand} fill sizes="(max-width: 640px) 100vw, 27vw" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.25) 70%, rgba(20,10,40,0.05) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "8px", padding: "clamp(18px,2.4vw,36px)", textAlign: "left" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                {lang === "th" ? "สำหรับ" : "For"}
              </span>
              <span style={{ fontSize: "clamp(22px,2.6vw,36px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                {lang === "th" ? "แบรนด์" : "Brand"}
              </span>
              <span className="hero-split-cta" style={{
                marginTop: "8px", display: "inline-flex", alignItems: "center", width: "fit-content",
                fontSize: "13px", fontWeight: 600, color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.5)", borderRadius: "50px",
                padding: "8px 18px",
              }}>
                {lang === "th" ? "ดูเพิ่มเติม" : "Learn More"}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Right panel — Influencer, slides in from the right, stops short of center */}
        <motion.div
          className="hero-side-panel hero-side-panel-right"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "absolute", right: 0, top: 0, bottom: "220px", width: "clamp(160px, 20vw, 320px)", zIndex: 2 }}
        >
          <Link href={`/${lang}/influencer`} className="hero-split-panel" style={{
            ...KT, textDecoration: "none", position: "relative", display: "block", width: "100%", height: "100%", overflow: "hidden",
          }}>
            <Image src="/header-influencer-poster.jpg" alt={t.imInfluencer} fill sizes="(max-width: 640px) 100vw, 27vw" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(270deg, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.25) 70%, rgba(20,10,40,0.05) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: "8px", padding: "clamp(18px,2.4vw,36px)", textAlign: "right" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                {lang === "th" ? "สำหรับ" : "For"}
              </span>
              <span style={{ fontSize: "clamp(22px,2.6vw,36px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                {lang === "th" ? "อินฟลูเอนเซอร์" : "Influencers"}
              </span>
              <span className="hero-split-cta" style={{
                marginTop: "8px", display: "inline-flex", alignItems: "center", width: "fit-content",
                fontSize: "13px", fontWeight: 600, color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.5)", borderRadius: "50px",
                padding: "8px 18px",
              }}>
                {lang === "th" ? "ดูเพิ่มเติม" : "Learn More"}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Center — heading + subhead, sits in the gap left by the two side panels */}
        <div className="hero-center-content relative" style={{
          position: "relative", zIndex: 3, minHeight: "88vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "120px clamp(160px, 20vw, 320px) 48px",
        }}>
          <h1 className="font-bold uppercase mb-6 hero-h1"
            style={{ color: "#ffffff", fontSize: "clamp(17px,2.1vw,30px)", lineHeight: 1.3, textAlign: "center",
              fontFeatureSettings: "'pnum' on,'lnum' on",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)" }}>
            <span className="hero-h1-line" style={{ display: "block" }}>{t.headline1}</span>
            <span className="hero-h1-line" style={{ display: "block" }}>{t.headline2}</span>
          </h1>
          <h2 className="font-normal mb-12"
            style={{ color: "#ffffff", fontSize: "clamp(14px,1.3vw,20px)", lineHeight: "1.7", textAlign: "center",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: 0 }}>
            From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span>
          </h2>
        </div>

        <style>{`
          .hero-split-panel{ transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .hero-split-panel:hover{ transform: scale(1.03); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
          .hero-split-cta{ transition: background-color 0.25s ease, color 0.25s ease; }
          .hero-split-panel:hover .hero-split-cta{ background: #ffffff; color: #1c1140; }
          .hero-h1-line{ white-space: nowrap; }
          @media (max-width: 900px){
            .hero-side-panel{ display: none !important; }
            .hero-center-content{ padding-left: 24px !important; padding-right: 24px !important; }
            .hero-h1-line{ white-space: normal !important; }
          }
        `}</style>

        <div className="relative" style={{ zIndex: 3 }}>
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
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                borderRadius: "20px",
                padding: "26px 20px",
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
              style={{ fontSize: "18px", lineHeight: "1.7", textAlign: "center",
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
