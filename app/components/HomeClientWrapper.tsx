"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedCounter from "./AnimatedCounter";
import TrustedPartnerShowcase from "./TrustedPartnerShowcase";
import HomeSplitHero from "./HomeSplitHero";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const NewsroomSection = dynamic(() => import("./NewsroomSection"));
const FAQAccordion = dynamic(() => import("./FAQAccordion"));
const ContactFormSection = dynamic(() => import("./ContactFormSection"));


const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

// One continuous gradient spanning Hero → Stats → Logos → Trusted-Partner
// intro, so the background blends without hard seams between sections
// (mirrors the influencer page's PAGE_GRADIENT convention).
const HOME_TOP_GRADIENT = "linear-gradient(180deg, #eef0fd 0%, #f3eefc 6%, #f8f2fa 12%, #ffffff 18%, #f5eefc 24%, #efe3fa 50%, #e8d8f7 75%, #e0cbf2 100%)";

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

      {/* ── Hero → Stats → Logos → Trusted-Partner intro — one continuous
          gradient wrapper (no per-section background) so color blends
          seamlessly all the way down, per the split-hero brief. ── */}
      <div style={{ background: HOME_TOP_GRADIENT }}>

      {/* ── New Split Hero — Brand ↔ Influencer ── */}
      <HomeSplitHero lang={lang as "th" | "en"} />

      {/* ── Impact Stats — no background of its own; shows the same
          continuous gradient behind it, so Hero → Stats has no seam. ── */}
      <div className="hero-stats-strip" style={{
        display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
        position: "relative", marginTop: "8px", paddingBottom: "150px", zIndex: 6,
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

      {/* ── Brand Logos Marquee — transparent bg, shares the same wrapper gradient ── */}
      <LogoMarquee background="transparent" headingStyle={{ ...KT, fontWeight: 700, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} />

      {/* ── Your Trusted Partner ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "transparent" }} className="px-6 trusted-section">
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
      <section style={{ background: "transparent", paddingTop: "80px", paddingBottom: "80px" }} className="px-6">
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
