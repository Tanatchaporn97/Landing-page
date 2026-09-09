"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover, HoverSlideDescription } from "./AnimatedSlideshow";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const KolPackagesSection = dynamic(() => import("./KolPackagesSection"));
const NewsroomSection = dynamic(() => import("./NewsroomSection"));
const FAQAccordion = dynamic(() => import("./FAQAccordion"));
const ContactFormSection = dynamic(() => import("./ContactFormSection"));


const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

// Hoisted to a stable reference so it doesn't get recreated (and break
// memoized scroll-progress calculations) on every render.
const OUR_SERVICES = [
  { img: "/services/campaign-reviews.jpg", title: "Campaign Reviews",
    desc: "รีวิวสินค้าและบริการผ่านอินฟลูเอนเซอร์ที่ใช่ พร้อมสื่อสารข้อความและจุดเด่นของแบรนด์ได้อย่างมีประสิทธิภาพ เปลี่ยนให้ทุกความสนใจเป็นยอดขาย",
    descEn: "Product and service reviews through the right influencers, communicating your brand's key messages effectively — turning every bit of interest into sales.",
    objectPosition: "center 15%" },
  { img: "/services/social-challenges.jpg", title: "Social Challenges",
    desc: "โดดเด่นเหนือใครด้วยชาเลนจ์สนุก ๆ กระตุ้นการมีส่วนร่วมแบบออร์แกนิค ช่วยให้แบรนด์เป็นที่น่าจดจำ และกลายเป็นเรื่องที่ใคร ๆ ก็อยากพูดถึง",
    descEn: "Stand out with fun challenges that spark organic engagement, making your brand memorable and giving people something to talk about." },
  { img: "/services/product-seeding.jpg", title: "Product Seeding",
    desc: "สร้างกระแสให้สินค้าผ่านคอมเมนต์และรีวิวจำนวนมากอย่างเป็นธรรมชาติ ช่วยเพิ่ม Social Proof ทำให้แบรนด์ดูมีความน่าเชื่อถือและกระตุ้นการตัดสินใจซื้อ",
    descEn: "Spark buzz for your product through a natural flood of comments and reviews, boosting social proof, credibility, and purchase decisions.",
    objectPosition: "30% center" },
  { img: "/services/livestream-affiliate.jpg", title: "Livestream & Affiliate",
    desc: "คอนเทนต์ที่ออกแบบมาเพื่อสร้างผลลัพธ์ด้านยอดขาย โดยตรงจากอินฟลูเอนเซอร์ ทำให้ทุกการลงทุนของคุณกลายเป็นรายได้",
    descEn: "Content designed to drive sales results directly through influencers, turning every investment into revenue.",
    objectPosition: "65% center" },
  { img: "/services/influencer-at-events.png", title: "Influencer at Events",
    desc: "ไม่ว่างานเปิดตัว กิจกรรม หรืออีเวนต์พิเศษ เราคัดเลือกอินฟลูเอนเซอร์ที่ใช่ ถ่ายทอดเรื่องราวสดๆ สร้างกระแสได้อย่างต่อเนื่อง",
    descEn: "From launch events to special activities, we handpick the right influencers to capture and share the moment live, keeping the buzz going." },
  { img: "/services/paid-media.jpg", title: "Paid Media",
    desc: "เพิ่มพลังให้แคมเปญด้วยการยิงโฆษณาและบูสต์คอนเทนต์ เข้าถึงกลุ่มเป้าหมายตรงจุด อัปยอดขาย และทำให้ทุกการลงทุนคุ้มค่าที่สุด",
    descEn: "Supercharge your campaign with targeted ads and content boosting — reaching the right audience, driving sales, and maximizing every baht spent.",
    objectPosition: "30% center" },
];

const WHAT_WE_OFFER = [
  { icon: "/what-we-offer/What We Offer-01.png", title: "กลยุทธ์แม่นยำ", titleEn: "Precision Strategy",
    desc: "ออกแบบแคมเปญจากข้อมูลเชิงลึก เพื่อผลลัพธ์ที่ตรงเป้าและวัดผลได้จริง",
    descEn: "Campaigns designed from deep data insights, built to hit your goals and deliver measurable results." },
  { icon: "/what-we-offer/What We Offer-02.png", title: "คัดอินฟลูเอนเซอร์ด้วย AI", titleEn: "AI-Powered Influencer Matching",
    desc: "เลือกอินฟลูเอนเซอร์ที่ “ใช่ที่สุด” ด้วยระบบ AI เพื่อเข้าถึงกลุ่มเป้าหมายอย่างแม่นยำ",
    descEn: "Find the perfect-fit influencers with our AI system to reach your target audience precisely." },
  { icon: "/what-we-offer/What We Offer-03.png", title: "ดูแลครบวงจร", titleEn: "End-to-End Management",
    desc: "ทีมงานมืออาชีพจัดการทุกขั้นตอนตั้งแต่เริ่มวางแผนจนจบแคมเปญ",
    descEn: "A professional team handles every step, from planning through campaign wrap-up." },
  { icon: "/what-we-offer/What We Offer-04.png", title: "งบคุ้มค่า", titleEn: "Budget That Works Harder",
    desc: "ตัดสินใจบนพื้นฐานข้อมูล ช่วยเพิ่มประสิทธิภาพและผลตอบแทนสูงสุด",
    descEn: "Data-driven decisions that boost efficiency and maximize your return." },
  { icon: "/what-we-offer/What We Offer-05.png", title: "วัดผลเรียลไทม์", titleEn: "Real-Time Reporting",
    desc: "ติดตามและสรุปผลผ่านแดชบอร์ดแบบเรียลไทม์ ชัดเจนทุกมิติ",
    descEn: "Track and review results through a real-time dashboard, clear in every dimension." },
];

/* ── Icons ── */




const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);






import { type Locale } from "../../i18n-config";

export default function BrandClientWrapper({ lang, dict }: { lang: Locale; dict: any }) {
  const t = dict?.home || {};
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const csRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const catSlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

  const [activeCampaignStep, setActiveCampaignStep] = useState(0);
  const CAMPAIGN_STEPS = [
    { img: "/how-we-run-campaigns/plan-campaign.png", title: "วางแผนแคมเปญ", titleEn: "Plan the Campaign",
      desc: "เปลี่ยนเป้าหมายของแบรนด์เป็นกลยุทธ์ที่จับต้องได้ ให้ทุกการสื่อสารไปถึงกลุ่มเป้าหมายได้ตรงจุด",
      descEn: "We turn your brand's goals into a concrete strategy, so every message reaches the right audience." },
    { img: "/how-we-run-campaigns/select-influencers.png", title: "คัดสรรอินฟลูเอนเซอร์ที่ใช่", titleEn: "Select the Right Influencers",
      desc: "ผ่านระบบ KOL Discovery จับคู่อินฟลูเอนเซอร์ที่เหมาะสมที่สุดกับแบรนด์คุณด้วยข้อมูลเชิงลึกที่แม่นยำ",
      descEn: "Our KOL Discovery system matches your brand with the most suitable influencers using precise data insights." },
    { img: "/how-we-run-campaigns/manage-seamlessly.png", title: "จัดการแคมเปญไร้รอยต่อ", titleEn: "Manage Seamlessly",
      desc: "ให้แคมเปญของคุณดำเนินไปอย่างไม่มีสะดุด ด้วยทีมงานมืออาชีพที่ดูแลทุกขั้นตอน",
      descEn: "Your campaign runs without a hitch, with a professional team overseeing every step." },
    { img: "/how-we-run-campaigns/review-drafts.png", title: "ตรวจดราฟต์คอนเทนต์", titleEn: "Review Content Drafts",
      desc: "เช็กทุกชิ้นให้ตรงโทนแบรนด์ และปรับจูนให้พร้อมก่อนโพสต์ เพื่อผลลัพธ์ที่ดีที่สุด",
      descEn: "We check every piece to match your brand tone and fine-tune it before posting, for the best results." },
    { img: "/how-we-run-campaigns/report-results.png", title: "รายงานผลแบบเรียลไทม์", titleEn: "Real-Time Reporting",
      desc: "ติดตามทุกความเคลื่อนไหวบนแดชบอร์ด พร้อมรับรายงานและอินไซต์ที่นำไปใช้ต่อได้จริง",
      descEn: "Track every move on the dashboard and get reports and insights you can actually put to use." },
  ];
  const CAMPAIGN_ROW_HEIGHT = 96;
  const CAMPAIGN_ROW_GAP = 24;




  return (
    <div className="hero-bg min-h-screen flex flex-col overflow-x-hidden" style={{ ...KT }}>

      {/* ── Navbar ── */}
      <Navbar variant="brand" lang={lang} />

      {/* ── Hero ── */}
      <section
        className="flex items-start px-6 relative hero-section brand-hero-bg"
        style={{
          minHeight: "72vh",
          paddingTop: "120px",
          paddingBottom: "64px",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="hero-grid-inf relative" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", zIndex: 2,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }}>

          {/* Left: headline, subhead, CTA */}
          <div>
            <h1 className="font-bold uppercase mb-6 hero-h1"
              style={{ color: "#111827", fontSize: "clamp(22px,2.6vw,38px)", lineHeight: 1.25, textAlign: "left",
                marginTop: "1lh",
                fontFeatureSettings: "'pnum' on,'lnum' on", whiteSpace: "nowrap" }}>
              Not Just Strategies.<br/>
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Execution That Delivers.
              </span>
            </h1>
            <h2 className="font-normal mb-12"
              style={{ color: "#111827", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: "1.7", textAlign: "left",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 48px" }}>
              {lang === "th" ? (
                "มากกว่ากลยุทธ์ คือพาแบรนด์ไปถึงเป้าหมาย"
              ) : (
                <>From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span></>
              )}
            </h2>
            <div className="flex flex-wrap gap-6 justify-start">
              <a href="#contact" className="btn-hero btn-hero-solid-purple font-semibold hero-btn"
                style={{ ...KT, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center",
                  fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none" }}>
                {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
              </a>
            </div>

            {/* Scattered stat cards under the CTA (same layout as I'm Influencer page) */}
            <div className="hero-stat-cards" style={{ position: "relative", height: "260px", marginTop: "48px" }}>
              <motion.div
              className="hero-stat-card"
              animate={{ rotate: -4 }}
              whileHover={{ rotate: -4, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{ position: "absolute", left: 0, top: "36px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 1, cursor: "pointer" }}
            >
              <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🌐</span>
              <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>1,000,000+</p>
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network"}</p>
            </motion.div>
            <motion.div
              className="hero-stat-card"
              animate={{ rotate: 2 }}
              whileHover={{ rotate: 2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{ position: "absolute", left: "169px", top: "62px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 2, cursor: "pointer" }}
            >
              <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🤝</span>
              <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>1,000+</p>
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients"}</p>
            </motion.div>
            <motion.div
              className="hero-stat-card"
              animate={{ rotate: -2 }}
              whileHover={{ rotate: -2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{ position: "absolute", left: "325px", top: "10px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 3, cursor: "pointer" }}
            >
              <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🎯</span>
              <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>4,000+</p>
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{lang === "th" ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered"}</p>
              </motion.div>
            </div>
          </div>

          {/* Right: dashboard mockup */}
          <div className="brand-hero-dashboard" style={{ position: "relative", aspectRatio: "6251 / 4239" }}>
            <Image src="/im-brand-dashboard.png" alt={lang === "th" ? "แดชบอร์ดแคมเปญ" : "Campaign dashboard"} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} />
          </div>
        </div>

      </section>

      {/* ── Hero (playful variant) ── */}
      <section
        className="flex items-start px-6 relative"
        style={{
          minHeight: "72vh",
          padding: "100px 24px",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(180deg, #F9F6FE 0%, #FFFFFF 100%)",
        }}
      >
        <div className="hero-grid-inf relative" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", zIndex: 2,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* Left: real hero copy, playful stacked layout + underline squiggle + pill CTA */}
          <div style={{ position: "relative" }}>
            <h2 className="font-bold uppercase" style={{ ...KT, color: "#111827", fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.2, margin: "0 0 24px" }}>
              Not Just Strategies.<br/>
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Execution That Delivers.
                </span>
                <svg viewBox="0 0 320 24" width="100%" height="24" style={{ position: "absolute", left: 0, bottom: "-14px", overflow: "visible" }} aria-hidden="true">
                  <path d="M4 14 C 60 2, 120 22, 180 10 S 280 4, 316 12" fill="none" stroke="#ff0089" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            {/* Floating scribble accent, echoing the reference's hand-drawn doodle */}
            <svg viewBox="0 0 60 60" width="52" height="52" style={{ position: "absolute", top: "-8px", right: "8%" }} aria-hidden="true">
              <path d="M6 40 C 18 44, 24 20, 14 12 C 8 6, 20 2, 28 10 M40 6 L 46 2 M44 14 L 52 12" fill="none" stroke="#5f26e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
            </svg>

            <p style={{ ...KT, color: "#6b7280", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: 1.7, margin: "40px 0 32px", maxWidth: "440px" }}>
              {lang === "th" ? (
                "มากกว่ากลยุทธ์ คือพาแบรนด์ไปถึงเป้าหมาย"
              ) : (
                <>From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span></>
              )}
            </p>

            <a href="#contact" style={{ ...KT, display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "#5f26e5", color: "#ffffff", fontWeight: 600, fontSize: "16px",
              padding: "16px 36px", borderRadius: "50px", textDecoration: "none" }}>
              {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
            </a>

            {/* Number stats, playful tilted row — same size as the header above, centered */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "40px" }}>
              {[
                { rotate: -3, emoji: "🌐", value: "1,000,000+", labelTh: "เครือข่ายอินฟลูเอนเซอร์", labelEn: "Influencer Network" },
                { rotate: 2,  emoji: "🤝", value: "1,000+",     labelTh: "ลูกค้าที่ไว้วางใจ",       labelEn: "Trusted Clients" },
                { rotate: -2, emoji: "🎯", value: "4,000+",     labelTh: "แคมเปญที่ส่งมอบ",         labelEn: "Campaigns Delivered" },
              ].map((s) => (
                <motion.div key={s.value}
                  animate={{ rotate: s.rotate }}
                  whileHover={{ rotate: 0, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  style={{ position: "relative", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>{s.emoji}</span>
                  <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1,
                    background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.value}
                  </p>
                  <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    {lang === "th" ? s.labelTh : s.labelEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: tilted mockup with floating decorative accents */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", width: "320px", height: "320px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,0,137,0.10) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0,
            }} />
            <motion.div
              style={{ position: "relative", aspectRatio: "6251 / 4239", zIndex: 1 }}
              animate={{ rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <Image src="/im-brand-dashboard.png" alt={lang === "th" ? "แดชบอร์ดแคมเปญ" : "Campaign dashboard"} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} />
            </motion.div>

            <span style={{ position: "absolute", top: "6%", left: "0%", fontSize: "28px", zIndex: 2 }}>✨</span>
            <span style={{ position: "absolute", bottom: "10%", right: "2%", fontSize: "24px", zIndex: 2 }}>💜</span>
          </div>
        </div>
      </section>

      {/* ── Hero → Logos fade overlay ── */}
      <div className="hero-logos-fade" style={{ height: "120px", marginTop: "-120px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 11, pointerEvents: "none" }} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee />

      {/* ── Tagline ── */}
      <section className="pt-20 px-6" style={{ paddingBottom: 0 }}>
        <div className="text-center" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 20px" }}>
            <span style={{ color: "#111827" }}>{lang === "th" ? "แคมเปญอินฟลูเอนเซอร์" : "Influencer Campaigns"}</span>{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "ที่เราพร้อมดูแลคุณในทุกขั้นตอนอย่างเหนือระดับ" : "Elevated at Every Step"}
            </span>
          </h2>
          <p style={{ ...KT, fontSize: "18px", lineHeight: "1.7", color: "#111827", margin: 0 }}>
            {lang === "th"
              ? "ทุกกลยุทธ์ต่อยอดด้วยดาต้าและทีมงานมืออาชีพ เพื่อให้แคมเปญของคุณไปถึงผลลัพธ์ที่วางไว้"
              : "Every strategy is powered by data and a professional team, driving your campaign to the results you set out to achieve."}
          </p>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="text-center font-bold mb-14 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: "0 0 56px" }}>
            What We{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Offer
            </span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {WHAT_WE_OFFER.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                borderRadius: "24px", padding: "32px 28px",
                display: "flex", flexDirection: "column", gap: "12px",
              }}>
                {item.icon && (
                  <div className="relative shrink-0" style={{ width: "58px", height: "58px" }}>
                    <Image src={item.icon} alt={lang === "th" ? item.title : item.titleEn} fill sizes="58px" style={{ objectFit: "contain" }} />
                  </div>
                )}
                <h3 style={{ ...KT, fontSize: "22px", fontWeight: 700, lineHeight: 1.3, color: "#5f26e5", margin: 0 }}>
                  {lang === "th" ? item.title : item.titleEn}
                </h3>
                <p style={{ ...KT, fontSize: "15px", lineHeight: 1.7, color: "#111827", margin: 0 }}>
                  {lang === "th" ? item.desc : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section id="our-services" className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="text-center font-bold mb-14 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: "0 0 56px" }}>
            Our{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Services
            </span>
          </h2>

          <HoverSlider className="flex flex-col-reverse items-center justify-evenly gap-10 md:flex-row md:items-start md:gap-12">
            <div className="flex flex-col" style={{ gap: "clamp(8px,1.2vw,16px)" }}>
              {OUR_SERVICES.map(({ title, desc, descEn }, index) => (
                <div key={title}>
                  <TextStaggerHover
                    index={index}
                    text={title}
                    className="cursor-pointer"
                    style={{ ...KT, fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 800 }}
                  />
                  <HoverSlideDescription
                    index={index}
                    style={{ ...KT, fontSize: "15px", lineHeight: 1.6, color: "#111827", maxWidth: "420px" }}
                  >
                    {lang === "th" ? desc : descEn}
                  </HoverSlideDescription>
                </div>
              ))}
            </div>
            <HoverSliderImageWrap className="w-full max-w-[420px] rounded-[28px]" style={{ aspectRatio: "4 / 3", boxShadow: "0 12px 40px rgba(95,38,229,0.16)" }}>
              {OUR_SERVICES.map(({ img, title, objectPosition }, index) => (
                <HoverSliderImage
                  key={title}
                  index={index}
                  src={img}
                  alt={title}
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover"
                  style={{ objectPosition: objectPosition || "center" }}
                />
              ))}
            </HoverSliderImageWrap>
          </HoverSlider>
        </div>
      </section>

      {/* ── How We Run Campaigns ── */}
      <section className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 56px" }}>
            <h2 className="section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: "0 0 20px" }}>
              How We{" "}
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Run Campaigns
              </span>
            </h2>
          </div>

          <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            {/* Left: image, crossfades to match the hovered step */}
            <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3 / 2" }}>
              <AnimatePresence mode="wait">
                <motion.div key={CAMPAIGN_STEPS[activeCampaignStep].img}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ position: "absolute", inset: 0 }}>
                  <Image src={CAMPAIGN_STEPS[activeCampaignStep].img}
                    alt={lang === "th" ? CAMPAIGN_STEPS[activeCampaignStep].title : CAMPAIGN_STEPS[activeCampaignStep].titleEn}
                    fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: hoverable step list with a sliding progress bar */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: `${CAMPAIGN_ROW_GAP}px`, paddingLeft: "32px" }}>
              {/* track */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", borderRadius: "2px", background: "rgba(95,38,229,0.12)" }} />
              {/* sliding highlight */}
              <motion.div
                animate={{ top: activeCampaignStep * (CAMPAIGN_ROW_HEIGHT + CAMPAIGN_ROW_GAP) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ position: "absolute", left: 0, width: "4px", height: `${CAMPAIGN_ROW_HEIGHT}px`, borderRadius: "2px",
                  background: "linear-gradient(180deg, #5f25e5 0%, #ff0089 100%)" }} />

              {CAMPAIGN_STEPS.map((step, i) => (
                <div key={step.title}
                  onMouseEnter={() => setActiveCampaignStep(i)}
                  style={{ minHeight: `${CAMPAIGN_ROW_HEIGHT}px`, display: "flex", flexDirection: "column", justifyContent: "center",
                    cursor: "pointer", opacity: i === activeCampaignStep ? 1 : 0.55, transition: "opacity 0.2s" }}>
                  <h3 style={{ ...KT, fontSize: "20px", fontWeight: 700, margin: "0 0 6px", transition: "color 0.2s",
                    color: i === activeCampaignStep ? "#5f26e5" : "#111827" }}>{lang === "th" ? step.title : step.titleEn}</h3>
                  <p style={{ ...KT, fontSize: "15px", lineHeight: "1.7", color: "#111827", margin: 0 }}>{lang === "th" ? step.desc : step.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Stories (card carousel, reference: ฉันคืออินฟลูเอนเซอร์ page) ── */}
      <section id="success-stories" className="py-20 px-6 success-bg">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Heading — matches site-standard section heading style */}
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Success{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Stories</span>
          </h2>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button className="arrow-cta-btn" onClick={() => csRef.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="arrow-cta-btn" onClick={() => csRef.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Cards scroll row */}
          <div ref={csRef} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], paddingBottom: "8px" }}>

            {/* ── Cards ── */}
            {[
              { href: `/${lang}/success/nissin`,         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          taglineEn: "Sparking social media food cravings with a bold new flavor: spicy Tom Yum Kung cheese." },
              { href: `/${lang}/success/ldc-dental`,     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", taglineEn: "Clear-aligner reviews from influencers, leading into an exclusive event with LDC Dental." },
              { href: `/${lang}/success/watsons`,        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               taglineEn: "House-brand products taking off with influencer power on TikTok & Lemon8." },
              { href: `/${lang}/success/viu`,            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          taglineEn: "Local-powered influencers bringing the \"Isan Chom Wiew\" campaign to life." },
              { href: `/${lang}/success/ahc`,            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   taglineEn: "Igniting brand buzz with an event inspired by the viral series \"AHC Skin Game.\"" },
              { href: `/${lang}/success/guss-damn-good`, img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   taglineEn: "A flavor with a story: when ice cream meets antacid powder." },
            ].map(card => (
              <Link key={card.href} href={card.href} className="cs-card-link" style={{ textDecoration: "none", flexShrink: 0, width: "390px", scrollSnapAlign: "start" }}>
                <div className="cs-card" style={{
                  borderRadius: "28px", height: "520px",
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                  boxSizing: "border-box",
                }}>
                  <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={card.img} alt={card.title} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="cs-card-overlay" />
                  {/* Arrow button — top right */}
                  <div style={{ position: "absolute", top: "28px", right: "28px", zIndex: 2 }}>
                    <div className="cs-arrow-btn" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  {/* Category pill */}
                  <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/${lang}/category/${catSlug(card.cat)}`); }}
                      className="cs-cat-btn" style={{ ...KT, fontSize: "10px", fontWeight: 600, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "5px 12px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
                    >
                      {card.cat.charAt(0) + card.cat.slice(1).toLowerCase()}
                    </button>
                  </div>
                  {/* Bottom info */}
                  <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                    <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>{lang === "th" ? card.tagline : card.taglineEn}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* dummy spacer so last card doesn't stick to edge */}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>

          {/* ดูเพิ่มเติม CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <Link href={`/${lang}/success`} className="btn-insight" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {t.viewMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ── KOL Campaign Packages ── */}
      <KolPackagesSection lang={lang} />

      {/* ── Industry Insights ── */}
      <NewsroomSection lang={lang} dict={dict} variant="brand" />

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
