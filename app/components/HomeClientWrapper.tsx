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

      {/* ── Hero — full-bleed editorial split (Brand ↔ Influencer), two halves slide in and meet at center ── */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "620px",
          overflow: "hidden",
          background: "#ffffff",
          zIndex: 10,
        }}
      >
        <div className="hero-split-grid" style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "620px",
        }}>
          {/* Left half — For Brands */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Link href={`/${lang}/brand`} className="hero-split-panel" aria-label={lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
              style={{ position: "relative", display: "block", width: "100%", height: "100%", minHeight: "620px", textDecoration: "none" }}>
              <Image src="/services/influencer-campaign-management.jpg" alt="" fill sizes="50vw" priority
                style={{ objectFit: "cover", filter: "grayscale(60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,10,38,0.25) 0%, rgba(17,10,38,0.55) 100%)" }} />

              <div className="hero-split-label" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#ffffff", padding: "22px 40px", textAlign: "center", minWidth: "230px" }}>
                <span style={{ ...KT, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#5f26e5", textTransform: "uppercase" }}>
                  {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
                </span>
                <h3 style={{ ...KT, fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "6px 0", color: "#111827", textTransform: "uppercase", lineHeight: 1 }}>
                  {lang === "th" ? "แบรนด์" : "Brands"}
                </h3>
                <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                  {lang === "th" ? "ดูรายละเอียด" : "View More"} →
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right half — For Creators */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Link href={`/${lang}/influencer`} className="hero-split-panel" aria-label={lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Creators"}
              style={{ position: "relative", display: "block", width: "100%", height: "100%", minHeight: "620px", textDecoration: "none" }}>
              <Image src="/header-influencer-poster.jpg" alt="" fill sizes="50vw" priority
                style={{ objectFit: "cover", filter: "grayscale(60%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,10,38,0.25) 0%, rgba(17,10,38,0.55) 100%)" }} />

              <div className="hero-split-label" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#111827", padding: "22px 40px", textAlign: "center", minWidth: "230px" }}>
                <span style={{ ...KT, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#ff0089", textTransform: "uppercase" }}>
                  {lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Creators"}
                </span>
                <h3 style={{ ...KT, fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, margin: "6px 0", color: "#ffffff", textTransform: "uppercase", lineHeight: 1 }}>
                  {lang === "th" ? "ครีเอเตอร์" : "Creators"}
                </h3>
                <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                  {lang === "th" ? "ดูรายละเอียด" : "View More"} →
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        <style>{`
          .hero-split-label{ transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 16px 40px rgba(0,0,0,0.25); }
          .hero-split-panel:hover .hero-split-label{ transform: translate(-50%, -50%) scale(1.05); }
          @media (max-width: 900px){
            .hero-split-grid{ grid-template-columns: 1fr !important; grid-auto-rows: auto; }
            .hero-split-panel{ min-height: 320px !important; }
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
