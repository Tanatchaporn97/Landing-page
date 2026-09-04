"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const CategoriesMarquee = dynamic(() => import("./CategoriesMarquee"));
const TestimonialsCarousel = dynamic(() => import("./TestimonialsCarousel"));
const KolPackagesSection = dynamic(() => import("./KolPackagesSection"));
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

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 24px" }}>
              {[
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
              ].map(({ icon, title, titleEn, desc, descEn }) => (
                <motion.div key={title} style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px",
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "32px 28px 40px",
                  boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                  boxSizing: "border-box",
                }}
                className="solution-card wwo-card"
                whileHover={{ scale: 1.03, y: -4, boxShadow: "0 12px 32px rgba(95,38,229,0.08)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}>
                  <div className="icon-wrap-lg" style={{ background: "#ede9f8", borderRadius: "50%",
                    width: "68px", height: "68px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ position: "relative", width: "73px", height: "73px" }}>
                      <Image src={icon} alt={lang === "th" ? title : titleEn} fill sizes="73px" style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                  <h3 className="card-h3" style={{ ...KT, fontSize: "24px", fontWeight: 700, color: "#5f26e5",
                    lineHeight: "1.3", margin: 0 }}>{lang === "th" ? title : titleEn}</h3>
                  <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: 0 }}>{lang === "th" ? desc : descEn}</p>
                </motion.div>
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

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 24px" }}>
              {[
                { img: "/services/campaign-reviews.jpg", title: "Campaign Reviews",
                  desc: "รีวิวสินค้าและบริการผ่านอินฟลูเอนเซอร์ที่ใช่ พร้อมสื่อสารข้อความและจุดเด่นของแบรนด์ได้อย่างมีประสิทธิภาพ เปลี่ยนให้ทุกความสนใจเป็นยอดขาย",
                  descEn: "Product and service reviews through the right influencers, communicating your brand's key messages effectively — turning every bit of interest into sales." },
                { img: "/services/social-challenges.jpg", title: "Social Challenges",
                  desc: "โดดเด่นเหนือใครด้วยชาเลนจ์สนุก ๆ กระตุ้นการมีส่วนร่วมแบบออร์แกนิค ช่วยให้แบรนด์เป็นที่น่าจดจำ และกลายเป็นเรื่องที่ใคร ๆ ก็อยากพูดถึง",
                  descEn: "Stand out with fun challenges that spark organic engagement, making your brand memorable and giving people something to talk about." },
                { img: "/services/product-seeding.jpg", title: "Product Seeding",
                  desc: "สร้างกระแสให้สินค้าผ่านคอมเมนต์และรีวิวจำนวนมากอย่างเป็นธรรมชาติ ช่วยเพิ่ม Social Proof ทำให้แบรนด์ดูมีความน่าเชื่อถือและกระตุ้นการตัดสินใจซื้อ",
                  descEn: "Spark buzz for your product through a natural flood of comments and reviews, boosting social proof, credibility, and purchase decisions.",
                  objectPosition: "30% center" },
                { img: "/services/livestream-affiliate.jpg", title: "Livestream & Affiliate",
                  desc: "คอนเทนต์ที่ออกแบบมาเพื่อสร้างผลลัพธ์ด้านยอดขาย โดยตรงจากอินฟลูเอนเซอร์ ทำให้ทุกการลงทุนของคุณกลายเป็นรายได้",
                  descEn: "Content designed to drive sales results directly through influencers, turning every investment into revenue." },
                { img: "/services/influencer-at-events.png", title: "Influencer at Events",
                  desc: "ไม่ว่างานเปิดตัว กิจกรรม หรืออีเวนต์พิเศษ เราคัดเลือกอินฟลูเอนเซอร์ที่ใช่ ถ่ายทอดเรื่องราวสดๆ สร้างกระแสได้อย่างต่อเนื่อง",
                  descEn: "From launch events to special activities, we handpick the right influencers to capture and share the moment live, keeping the buzz going." },
                { img: "/services/paid-media.jpg", title: "Paid Media",
                  desc: "เพิ่มพลังให้แคมเปญด้วยการยิงโฆษณาและบูสต์คอนเทนต์ เข้าถึงกลุ่มเป้าหมายตรงจุด อัปยอดขาย และทำให้ทุกการลงทุนคุ้มค่าที่สุด",
                  descEn: "Supercharge your campaign with targeted ads and content boosting — reaching the right audience, driving sales, and maximizing every baht spent.",
                  objectPosition: "30% center" },
              ].map(({ img, title, desc, descEn, objectPosition }) => (
                <motion.div key={title} style={{
                  position: "relative",
                  borderRadius: "28px",
                  overflow: "hidden",
                  width: "390px",
                  height: "520px",
                  flexShrink: 0,
                  boxShadow: "0 8px 32px rgba(95,38,229,0.18)",
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}>
                  <Image src={img} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: objectPosition || "center" }} />
                  <div style={{ position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(95,38,229,1) 0%, rgba(95,38,229,0.85) 30%, rgba(95,38,229,0) 65%)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 24px 28px",
                    display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, color: "#ffffff", margin: "0 0 6px", lineHeight: 1.2 }}>{title}</h3>
                    <p style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, color: "rgba(255,255,255,0.85)", margin: 0 }}>{lang === "th" ? desc : descEn}</p>
                  </div>
                </motion.div>
              ))}
          </div>
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
                    <div className="cs-arrow-btn" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  {/* Category pill */}
                  <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/${lang}/category/${catSlug(card.cat)}`); }}
                      className="cs-cat-btn" style={{ ...KT, fontSize: "13px", fontWeight: 600, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
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

      {/* ── Trust Influencers ── */}
      <section className="py-20 px-6 influencer-bg">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-12"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "85px",
              fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Trust{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Influencers</span>
          </h2>

          {/* Infinite marquee — auto-slides right to left */}
          <TestimonialsCarousel lang={lang} />
        </div>
      </section>

      {/* ── Influencer Categories ── */}
      <section style={{ overflow: "hidden" }} className="py-20 category-bg">
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

      {/* ── KOL Campaign Packages ── */}
      <KolPackagesSection lang={lang} />

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
