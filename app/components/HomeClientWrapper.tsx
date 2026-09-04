"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { animate, stagger, inView } from "motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedCounter from "./AnimatedCounter";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const BlogPostsSection = dynamic(() => import("./BlogPostsSection"));
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

  const photoCardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!photoCardsRef.current) return;
    return inView(photoCardsRef.current, () => {
      animate(".photo-card-h", { opacity: [0, 1], y: [50, 0] }, { duration: 0.405, delay: stagger(0.135) });
    }, { amount: 0.3 });
  }, []);







  return (
    <div className="hero-bg min-h-screen flex flex-col overflow-x-hidden" style={{ ...KT }}>

      {/* ── Navbar ── */}
      <Navbar variant="home" lang={lang} />

      {/* ── Hero ── */}
      <section
        className="flex flex-col items-center justify-start text-center px-6 relative hero-section hero-header-glow"
        style={{
          minHeight: "72vh",
          paddingTop: "120px",
          paddingBottom: "64px",
          overflow: "hidden",
          position: "relative",
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
        <div className="relative" style={{ maxWidth: "1100px", zIndex: 2 }}>
          <h1 className="font-bold uppercase mb-6 hero-h1"
            style={{ color: "#ffffff", fontSize: "clamp(28px,3.9vw,56px)", lineHeight: "84px", textAlign: "center",
              marginTop: "1lh",
              fontFeatureSettings: "'pnum' on,'lnum' on",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)" }}>
            {t.headline1}<br/>{t.headline2}
          </h1>
          <h2 className="font-normal mb-12"
            style={{ color: "#ffffff", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: "1.7", textAlign: "center",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 48px" }}>
            From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href={`/${lang}/brand`} className="btn-hero font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none", color: "#5f26e5" }}>
              {t.imBrand}
            </Link>
            <Link href={`/${lang}/influencer`} className="btn-hero btn-hero-solid-purple font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none" }}>
              {t.imInfluencer}
            </Link>
          </div>

          {/* Impact Stats — static figures from Success Stories section */}
          <div className="hero-stats-strip" style={{
            display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
            marginTop: "76px",
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
          <div className="text-center mb-12" style={{ maxWidth: "954px", margin: "0 auto 48px" }}>
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

          {/* 4 Photo Cards */}
          <div ref={photoCardsRef} className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { src: "/card1.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
              { src: "/card2.jpg", title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers." },
              { src: "/card3.png", title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
              { src: "/card4.png", title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
            ].map((card, i) => (
              <div key={card.title} className="relative overflow-hidden photo-card-h"
                style={{ height: "403px", borderRadius: "24px", opacity: 0 }}>
                <Image src={card.src} alt={card.title} fill className="object-cover object-top" sizes="280px"/>
                <div className="absolute bottom-0 left-0 right-0"
                  style={{ background: "linear-gradient(to top,rgba(95,38,229,1) 0%,rgba(95,38,229,0) 100%)",
                    padding: "29px 18px" }}>
                  <h3 className="text-white font-medium text-center"
                    style={{ fontSize: "24px", lineHeight: "1.2",
                      fontFeatureSettings: "'pnum' on,'lnum' on", marginBottom: "8px" }}>
                    {card.title}
                  </h3>
                  <p className="text-white font-normal text-center"
                    style={{ fontSize: "16px", lineHeight: "1.5" }}>
                    {lang === "th" ? card.desc : card.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Insights ── */}
      <BlogPostsSection lang={lang} dict={dict} />

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
