"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GradientCard } from "@/components/ui/gradient-card";
import { Target, Sparkles, Layers, Wallet, BarChart3, Rocket, Users, RefreshCw, PartyPopper, ShoppingBag } from "lucide-react";
import BusinessGoalsSection from "./BusinessGoalsSection";
import CreatorSelectionSection from "./CreatorSelectionSection";
import CampaignLearningSection from "./CampaignLearningSection";
import CreatorCategoriesSection from "./CreatorCategoriesSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
    descEn: "Product and service reviews through the right influencers, communicating your brand's key messages effectively — turning every bit of interest into sales." },
  { img: "/services/influencer-campaign-management.jpg", title: "Influencer Campaign Management",
    desc: "ดูแลแคมเปญอินฟลูเอนเซอร์แบบครบวงจร ตั้งแต่การวางแผน คัดเลือกอินฟลูเอนเซอร์ ประสานงาน ไปจนถึงติดตามและวัดผล เพื่อให้ทุกขั้นตอนของแคมเปญเดินหน้าได้อย่างมีประสิทธิภาพ",
    descEn: "End-to-end influencer campaign management — from planning and influencer selection to coordination, tracking, and reporting — keeping every stage of your campaign running smoothly." },
  { img: "/services/ugc-product-seeding.jpg", title: "Influencer Network",
    desc: "เข้าถึงเครือข่ายอินฟลูเอนเซอร์หลากหลายหมวดหมู่ พร้อมค้นหาและคัดเลือกคนที่ตรงกับโจทย์ กลุ่มเป้าหมาย และภาพลักษณ์ของแบรนด์ได้อย่างแม่นยำ",
    descEn: "Access a diverse network of influencers across every category, with precise search and selection to match your brief, target audience, and brand image." },
  { img: "/services/on-demand-fast-track.jpg", title: "On-Demand & Fast-Track Campaigns",
    desc: "ตอบโจทย์แคมเปญที่ต้องการความรวดเร็ว ด้วยการค้นหาและประสานงานอินฟลูเอนเซอร์ในเวลาจำกัด ช่วยให้แบรนด์เริ่มแคมเปญได้ทันทุกโอกาสและทุกกระแส",
    descEn: "Built for campaigns that need speed — sourcing and coordinating influencers on tight timelines so your brand can jump on every opportunity and trend the moment it happens." },
  { img: "/services/social-challenges.jpg", title: "Social Challenges",
    desc: "โดดเด่นเหนือใครด้วยชาเลนจ์สนุก ๆ กระตุ้นการมีส่วนร่วมแบบออร์แกนิค ช่วยให้แบรนด์เป็นที่น่าจดจำ และกลายเป็นเรื่องที่ใคร ๆ ก็อยากพูดถึง",
    descEn: "Stand out with fun challenges that spark organic engagement, making your brand memorable and giving people something to talk about." },
  { img: "/services/ugc-product-seeding.jpg", title: "UGC & Product Seeding",
    desc: "สร้างกระแสให้สินค้าผ่าน UGC คอมเมนต์ และรีวิวจากผู้ใช้งานและครีเอเตอร์อย่างเป็นธรรมชาติ ช่วยเพิ่ม Social Proof สร้างความน่าเชื่อถือ และกระตุ้นการตัดสินใจซื้อ",
    descEn: "Spark buzz for your product through natural UGC, comments, and reviews from real users and creators — boosting social proof, credibility, and purchase decisions." },
  { img: "/services/livestream-affiliate.jpg", title: "Livestream & Affiliate",
    desc: "คอนเทนต์ที่ออกแบบมาเพื่อสร้างผลลัพธ์ด้านยอดขายโดยตรงผ่าน Livestream และ Affiliate จากอินฟลูเอนเซอร์ เปลี่ยนความสนใจให้กลายเป็นการซื้อได้ง่ายขึ้น",
    descEn: "Content designed to drive sales results directly through influencer livestreams and affiliate links, turning interest into purchases more easily." },
  { img: "/services/influencer-event-activation.jpg", title: "Influencer & Event Activation",
    desc: "ตั้งแต่อินฟลูเอนเซอร์ร่วมงาน Presenter และ Speaker ไปจนถึงทีมประสานงานหน้างาน เราช่วยให้อีเวนต์สร้างคอนเทนต์ กระแส และการพูดถึงได้อย่างต่อเนื่องทั้ง Online และ On-site",
    descEn: "From influencer guests, presenters, and speakers to on-ground coordination — we help your event generate content, buzz, and conversation continuously, both online and on-site." },
  { img: "/services/paid-media-amplification.jpg", title: "Paid Media & Amplification",
    desc: "เพิ่มพลังให้แคมเปญด้วยการยิงโฆษณา บูสต์ และ Amplify คอนเทนต์จากอินฟลูเอนเซอร์ เข้าถึงกลุ่มเป้าหมายได้กว้างและแม่นยำขึ้น พร้อมผลักดันผลลัพธ์จากทุกคอนเทนต์ให้ไปได้ไกลกว่าเดิม",
    descEn: "Supercharge your campaign with paid ads, boosting, and amplification of influencer content — reaching a wider, more precise audience and pushing every piece of content further." },
  { img: "/services/always-on-strategy.jpg", title: "Always-On Influencer & Media Strategy",
    desc: "วางกลยุทธ์ Influencer และ Media อย่างต่อเนื่องตลอดทั้งปี ช่วยให้แบรนด์รักษาการมองเห็น สร้างความสัมพันธ์กับกลุ่มเป้าหมาย และต่อยอดผลลัพธ์ได้มากกว่าแคมเปญระยะสั้น",
    descEn: "Ongoing influencer and media strategy planned year-round, helping your brand maintain visibility, build relationships with its audience, and compound results beyond a single short-term campaign." },
  { img: "/services/creative-content-concept.jpg", title: "Creative Content & Concept Development",
    desc: "พัฒนา Campaign Concept, Key Message และแนวทางคอนเทนต์ให้เหมาะกับแบรนด์และแพลตฟอร์ม ช่วยให้อินฟลูเอนเซอร์สร้างคอนเทนต์ที่น่าสนใจ พร้อมสื่อสารสิ่งที่แบรนด์ต้องการได้อย่างชัดเจน",
    descEn: "Developing campaign concepts, key messages, and content direction tailored to your brand and platform — helping influencers create compelling content that clearly communicates what your brand needs to say." },
  { img: "/services/photo-video-production.jpg", title: "Photo & Video Production",
    desc: "สร้างสรรค์ภาพและวิดีโอตั้งแต่การวาง Concept, Storyboard ไปจนถึงการถ่ายทำและ Post-production เพื่อให้แบรนด์มีคอนเทนต์คุณภาพพร้อมใช้บนทุกช่องทาง",
    descEn: "Creative photo and video production from concept and storyboard through filming and post-production, giving your brand quality, ready-to-use content across every channel." },
  { img: "/services/product-seeding.jpg", title: "Publishing & Advertorial",
    desc: "เพิ่มพื้นที่การมองเห็นให้แบรนด์ผ่านบทความและคอนเทนต์บนช่องทางที่เหมาะสม ถ่ายทอดเรื่องราวและข้อมูลของแบรนด์ในรูปแบบที่เข้าถึงและสร้างความน่าเชื่อถือได้มากขึ้น",
    descEn: "Expand your brand's visibility through articles and content placed on the right channels, telling your brand's story in a way that's accessible and builds credibility.",
    objectPosition: "30% center" },
];

const WHAT_WE_OFFER = [
  { icon: "/what-we-offer/What We Offer-02.png", title: "กลยุทธ์แม่นยำ", titleEn: "Precision Strategy",
    desc: "ออกแบบแคมเปญจากข้อมูลเชิงลึก เพื่อผลลัพธ์ที่ตรงเป้าและวัดผลได้จริง",
    descEn: "Campaigns designed from deep data insights, built to hit your goals and deliver measurable results.",
    Icon: Target, gradient: "purple" as const, badgeText: "Data-Driven", badgeColor: "#5f26e5" },
  { icon: "/what-we-offer/What We Offer-01.png", title: "คัดอินฟลูเอนเซอร์ด้วย AI", titleEn: "AI-Powered Influencer Matching",
    desc: "เลือกอินฟลูเอนเซอร์ที่ “ใช่ที่สุด” ด้วยระบบ AI เพื่อเข้าถึงกลุ่มเป้าหมายอย่างแม่นยำ",
    descEn: "Find the perfect-fit influencers with our AI system to reach your target audience precisely.",
    Icon: Sparkles, gradient: "purple" as const, badgeText: "AI-Powered", badgeColor: "#ff0089" },
  { icon: "/what-we-offer/What We Offer-05.png", title: "ดูแลครบวงจร", titleEn: "End-to-End Management",
    desc: "ทีมงานมืออาชีพจัดการทุกขั้นตอนตั้งแต่เริ่มวางแผนจนจบแคมเปญ",
    descEn: "A professional team handles every step, from planning through campaign wrap-up.",
    Icon: Layers, gradient: "purple" as const, badgeText: "End-to-End", badgeColor: "#2e1a7a" },
  { icon: "/what-we-offer/What We Offer-03.png", title: "งบคุ้มค่า", titleEn: "Budget That Works Harder",
    desc: "ตัดสินใจบนพื้นฐานข้อมูล ช่วยเพิ่มประสิทธิภาพและผลตอบแทนสูงสุด",
    descEn: "Data-driven decisions that boost efficiency and maximize your return.",
    Icon: Wallet, gradient: "purple" as const, badgeText: "Cost-Efficient", badgeColor: "#b6146e" },
  { icon: "/what-we-offer/What We Offer-04.png", title: "วัดผลเรียลไทม์", titleEn: "Real-Time Reporting",
    desc: "ติดตามและสรุปผลผ่านแดชบอร์ดแบบเรียลไทม์ ชัดเจนทุกมิติ",
    descEn: "Track and review results through a real-time dashboard, clear in every dimension.",
    Icon: BarChart3, gradient: "purple" as const, badgeText: "Real-Time", badgeColor: "#7c3aed" },
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

  // Always land at the top of the page on entry — Next.js's own scroll
  // restoration runs after mount and can override an immediate scrollTo,
  // so force it again on the next frame to win that race. Otherwise the
  // router cache restores whatever scroll position this route was left at
  // on a previous visit, making the "บริการของเรา" nav link appear to jump
  // straight to the services section instead of the page header.
  useEffect(() => {
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeService, setActiveService] = useState(0);
  const csRef2 = useRef<HTMLDivElement>(null); // scratch copy for redesign experiments
  const STORY_TABS = ["New Market Entry", "Niche Community", "Always-on Content", "Event Activation", "Shoppable Content"] as const;
  const STORY_TAB_ICONS = { "New Market Entry": Rocket, "Niche Community": Users, "Always-on Content": RefreshCw, "Event Activation": PartyPopper, "Shoppable Content": ShoppingBag } as const;
  const [activeStoryTab, setActiveStoryTab] = useState<typeof STORY_TABS[number]>(STORY_TABS[0]);

  // Keep the active card scrolled fully into view whenever it changes — via
  // clicking a card directly, or via the arrow buttons stepping to the next/
  // previous one. This keeps the expand animation and the scroll position
  // moving together as a single connected motion, instead of the strip
  // jumping to wherever a fixed-pixel scrollBy happened to land.
  useEffect(() => {
    const card = serviceCardRefs.current[activeService];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [activeService]);

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
        className="flex items-start px-6 relative"
        style={{
          minHeight: "72vh",
          paddingTop: "240px",
          paddingBottom: "100px",
          paddingLeft: "24px",
          paddingRight: "24px",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          background: "transparent",
        }}
      >
        <div className="hero-grid-inf relative" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", zIndex: 2,
          display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "72px", alignItems: "center" }}>

          {/* Left: real hero copy, playful stacked layout + underline squiggle + pill CTA */}
          <div style={{ position: "relative" }}>
            <h2 className="font-bold uppercase" style={{ ...KT, color: "#111827", fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.2, margin: "1lh 0 24px" }}>
              {lang === "th" ? (
                <>ไม่ใช่แค่กลยุทธ์<br/></>
              ) : (
                <>Not Just Strategies.<br/></>
              )}
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {lang === "th" ? "แต่คือการลงมือทำที่สร้างผลลัพธ์ได้จริง" : "Execution That Delivers."}
              </span>
            </h2>

            <p style={{ ...KT, color: "#111827", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: 1.7, margin: "40px 0 32px" }}>
              {lang === "th" ? (
                "วางกลยุทธ์ คัดเลือก Creator และบริหารแคมเปญให้ตรงเป้าหมายของแบรนด์ ตั้งแต่ Brief จนถึงรายงานผล"
              ) : (
                "From Strategy To Insight, We Turn Influence Into Impact."
              )}
            </p>

            <a href="#contact" className="btn-hero-solid-purple" style={{ ...KT, display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontWeight: 600, fontSize: "16px",
              padding: "16px 36px", borderRadius: "50px", textDecoration: "none" }}>
              {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
            </a>

            {/* Number stats — plain text, no card/box, centered as a group */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", marginTop: "40px" }}>
              {[
                { value: "1,000,000+", labelTh: "เครือข่ายอินฟลูเอนเซอร์", labelEn: "Influencer Network" },
                { value: "1,000+",     labelTh: "ลูกค้าที่ไว้วางใจ",       labelEn: "Trusted Clients" },
                { value: "4,000+",     labelTh: "แคมเปญที่ส่งมอบ",         labelEn: "Campaigns Delivered" },
              ].map((s) => (
                <div key={s.value} style={{ textAlign: "center" }}>
                  <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1,
                    background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.value}
                  </p>
                  <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    {lang === "th" ? s.labelTh : s.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: tilted mockup with floating decorative accents */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", width: "380px", height: "380px", borderRadius: "50%",
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

      {/* ── Start With Your Goal — Business Objectives ── */}
      <section style={{ background: "transparent" }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <BusinessGoalsSection lang={lang as "th" | "en"} />
        </div>
      </section>

      {/* ── Our Services (expanded first card + scrollable strip, same scroll-arrow
           mechanism as Success Stories) ── */}
      <section id="our-services" className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <h2 className="font-bold section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: 0,
              fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827" }}>
              Our{" "}
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Services
              </span>
            </h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="arrow-cta-btn" onClick={() => setActiveService((prev) => Math.max(0, prev - 1))}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="arrow-cta-btn" onClick={() => setActiveService((prev) => Math.min(OUR_SERVICES.length - 1, prev + 1))}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Single scrollable row — click any card to expand it (image + description),
              all other cards collapse to just image + title */}
          <div ref={servicesScrollRef} style={{ display: "flex", gap: "20px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], alignItems: "center", paddingBottom: "8px" }}>
            {OUR_SERVICES.map((item, i) => {
              const isActive = activeService === i;
              return (
                <motion.div key={item.title} layout onClick={() => setActiveService(i)}
                  ref={(el) => { serviceCardRefs.current[i] = el; }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{
                    width: isActive ? 380 : 220, flexShrink: 0, scrollSnapAlign: "start",
                    borderRadius: isActive ? 24 : 20, overflow: "hidden", cursor: "pointer",
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                    display: "flex", flexDirection: "column",
                  }}>
                  <motion.div layout style={{ position: "relative", width: "100%", aspectRatio: isActive ? "8 / 5" : "3 / 4", flexShrink: 0 }}>
                    <Image src={item.img} alt={item.title} fill sizes={isActive ? "380px" : "220px"}
                      style={{ objectFit: "cover", objectPosition: item.objectPosition || "center" }} />
                    {/* Fade the image into the card's white body — long, eased, multi-stop
                        so the transition is imperceptible (no hard seam line) */}
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.45) 65%, rgba(255,255,255,0.8) 85%, #ffffff 100%)",
                    }} />
                  </motion.div>
                  <motion.div layout style={{ padding: isActive ? "24px 26px 28px" : "18px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ ...KT, fontSize: isActive ? "22px" : "16px", fontWeight: 700, color: "#5f26e5", margin: isActive ? "0 0 10px" : 0, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    {isActive && (
                      <p style={{ ...KT, fontSize: "14px", lineHeight: 1.7, color: "#4b5563", margin: 0 }}>
                        {lang === "th" ? item.desc : item.descEn}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>
        </div>
      </section>

      {/* ── Find the Right Creator — KOL discovery mockup ── */}
      <section style={{
        backgroundImage: "url('/creator-mockup/section-bg.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        position: "relative", overflow: "hidden",
      }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <CreatorSelectionSection lang={lang as "th" | "en"} />
        </div>
      </section>

      {/* ── Explore Every Creator Category ── */}
      <section style={{ background: "transparent" }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <CreatorCategoriesSection lang={lang as "th" | "en"} />
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section style={{ background: "transparent" }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="text-center font-bold mb-14 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: "0 0 56px" }}>
            What We{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Offer
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {WHAT_WE_OFFER.map((item, i) => {
              const isLast = i === WHAT_WE_OFFER.length - 1;
              const card = (
                <GradientCard
                  key={i}
                  gradient={item.gradient}
                  badgeText={item.badgeText}
                  badgeColor={item.badgeColor}
                  title={lang === "th" ? item.title : item.titleEn}
                  description={lang === "th" ? item.desc : item.descEn}
                  imageUrl={item.icon}
                  style={{ ...KT }}
                />
              );
              return isLast ? (
                <div key={i} className="md:col-span-2 flex justify-center">
                  <div className="w-full md:max-w-[calc(50%-20px)] lg:max-w-[calc(50%-20px)]">
                    {card}
                  </div>
                </div>
              ) : card;
            })}
          </div>
        </div>
      </section>

      {/* ── Success Stories — tabbed layout adapted from shadcnblocks Feature108 ── */}
      <section id="success-stories" className="py-20 px-6 success-bg">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", marginBottom: "8px" }}>
            <Badge variant="outline">Selected Campaigns</Badge>
            <h2 className="section-title font-bold section-h2-fixed"
              style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "1.2", margin: 0,
                fontFeatureSettings: "'pnum' on,'lnum' on" }}>
              See the Work{" "}
              <span style={{
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>in Action</span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", color: "#6b7280", maxWidth: "560px", margin: 0 }}>
              {lang === "th"
                ? "ดูว่าเราเปลี่ยนโจทย์ของแต่ละแบรนด์ให้เป็นแคมเปญจริงอย่างไร"
                : "See how we turn each brand's challenge into a real campaign."}
            </p>
          </div>

          <Tabs value={activeStoryTab} onValueChange={(v) => setActiveStoryTab(v as typeof STORY_TABS[number])} className="mt-8">
            <TabsList className="cs-tabs-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {STORY_TABS.map((tabLabel) => {
                const TabIcon = STORY_TAB_ICONS[tabLabel];
                return (
                  <TabsTrigger key={tabLabel} value={tabLabel} style={{ ...KT }}>
                    <TabIcon className="h-4 w-4 shrink-0" />
                    {tabLabel}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mx-auto mt-8 rounded-2xl" style={{ background: "rgba(95,38,229,0.05)", padding: "32px 24px" }}>
              {[
                { value: "New Market Entry", href: `/${lang}/success/siangpure`,      img: "/success-stories-2/Success stories-16.jpg", cat: "HEALTHCARE",     title: "Siangpure",
                  overview: "แคมเปญที่พา Siangpure บุกตลาดใหม่ผ่านครีเอเตอร์ชาวอินเดียบน Instagram เพื่อสร้างการรับรู้ในกลุ่มผู้บริโภคที่ไม่เคยเข้าถึงมาก่อน",
                  overviewEn: "A campaign that brought Siangpure into a new market through Indian Creators on Instagram, building awareness with an audience never reached before.",
                  stats: [{ label: "Reach", labelTh: "การเข้าถึง", value: "1.2M" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "15" }, { label: "Engagement Rate", labelTh: "อัตรามีส่วนร่วม", value: "4.8%" }],
                  imgFit: "contain" as const, imgBg: "#ffffff" },
                { value: "Niche Community",  href: `/${lang}/success/optimum-hi-pro`, img: "/success-stories-2/Success stories-14.jpg", cat: "PET CARE",       title: "Optimum Hi Pro",
                  overview: "เจาะกลุ่มคนเลี้ยงปลาคาร์พที่มีความเฉพาะทางสูง ผ่านครีเอเตอร์ที่เข้าใจ community นี้จริงๆ พร้อมขยายการรับรู้ในวงกว้าง",
                  overviewEn: "Reaching the highly specialized koi-keeper community through Creators who truly understand it, while expanding awareness at scale.",
                  stats: [{ label: "Reach", labelTh: "การเข้าถึง", value: "850K" }, { label: "Community Engagement", labelTh: "การมีส่วนร่วม", value: "+65%" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "10" }],
                  imgFit: "contain" as const, imgBg: "#0e1a5c" },
                { value: "Always-on Content", href: `/${lang}/success/auntie-annes`,  img: "/success-stories-2/Success stories-15.jpg", cat: "FOOD & BEVERAGE", title: "Auntie Anne's",
                  overview: "สร้าง Always-on Content Engine บน TikTok ที่ผลิตคอนเทนต์ต่อเนื่องกว่า 15 เดือน รักษาการมองเห็นแบรนด์ได้ตลอดปี",
                  overviewEn: "Built an always-on TikTok content engine producing content continuously for 15+ months, keeping the brand visible year-round.",
                  stats: [{ label: "Duration", labelTh: "ระยะเวลา", value: "15+ mo." }, { label: "Content Pieces", labelTh: "ชิ้นคอนเทนต์", value: "200+" }, { label: "Avg. Views", labelTh: "ยอดวิวเฉลี่ย", value: "500K" }],
                  imgFit: "contain" as const, imgBg: "#ffffff", imgPosition: "center 40%" },
                { value: "Event Activation", href: `/${lang}/success/ahc`,           img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",       title: "AHC",
                  overview: "จุดกระแสด้วยอีเวนต์ที่ต่อยอดจากซีรีส์ไวรัล AHC Skin Game สร้างการพูดถึงบนโซเชียลอย่างต่อเนื่อง",
                  overviewEn: "Sparked buzz with an event built on the viral series \"AHC Skin Game,\" driving continuous social conversation.",
                  stats: [{ label: "Event Reach", labelTh: "การเข้าถึงอีเวนต์", value: "2M" }, { label: "Media Mentions", labelTh: "การพูดถึง", value: "120+" }, { label: "Engagement Rate", labelTh: "อัตรามีส่วนร่วม", value: "6.2%" }] },
                { value: "Shoppable Content", href: `/${lang}/success/watsons`,      img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY", title: "Watsons",
                  overview: "ดัน House Brand ให้ปังบน TikTok และ Lemon8 ด้วยคอนเทนต์ที่พาไปสู่การตัดสินใจซื้อโดยตรง",
                  overviewEn: "Boosted House Brand products on TikTok and Lemon8 with content designed to drive direct purchase decisions.",
                  stats: [{ label: "Sales Uplift", labelTh: "ยอดขายเพิ่มขึ้น", value: "+40%" }, { label: "Reach", labelTh: "การเข้าถึง", value: "1.5M" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "25" }] },
              ].map((story) => (
                <TabsContent key={story.value} value={story.value} className="grid place-items-center gap-10 lg:grid-cols-2">
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <button
                      onClick={() => router.push(`/${lang}/category/${catSlug(story.cat)}`)}
                      style={{ ...KT, width: "fit-content", fontSize: "12px", fontWeight: 600, color: "#5f26e5", background: "#ffffff",
                        border: "1px solid rgba(95,38,229,0.2)", borderRadius: "50px", padding: "6px 14px", letterSpacing: "0.06em", cursor: "pointer" }}
                    >
                      {story.cat.charAt(0) + story.cat.slice(1).toLowerCase()}
                    </button>
                    <h3 style={{ ...KT, fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
                      {story.title}
                    </h3>
                    <p style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5f26e5", margin: 0 }}>
                      {lang === "th" ? "ภาพรวม" : "Overview"}
                    </p>
                    <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#4b5563", margin: "-12px 0 0" }}>
                      {lang === "th" ? story.overview : story.overviewEn}
                    </p>
                    <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginTop: "4px" }}>
                      {story.stats.map((stat) => (
                        <div key={stat.label}>
                          <p style={{ ...KT, fontSize: "24px", fontWeight: 800, color: "#111827", margin: "0 0 2px" }}>{stat.value}</p>
                          <p style={{ ...KT, fontSize: "12px", color: "#9ca3af", margin: 0 }}>{lang === "th" ? stat.labelTh : stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={story.href} className="btn-insight" style={{
                      ...KT, width: "fit-content", borderRadius: "50px", fontSize: "15px", fontWeight: 600,
                      padding: "12px 32px", textDecoration: "none", display: "inline-block", marginTop: "8px",
                    }}>
                      {lang === "th" ? "อ่านเพิ่มเติม" : "Read More"}
                    </Link>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "20px", overflow: "hidden",
                    background: story.imgBg || "#f3f0fb" }}>
                    <Image src={story.img} alt={story.title} fill sizes="(max-width: 1024px) 100vw, 480px"
                      style={{ objectFit: story.imgFit || "cover", objectPosition: story.imgPosition || "center" }} />
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>

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

      {/* ── Success Stories (COPY — scratch section for redesign experiments; keep
           the original above untouched, iterate freely here) ── */}
      <section id="success-stories-v2" className="py-20 px-6 success-bg">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

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

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button className="arrow-cta-btn" onClick={() => csRef2.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="arrow-cta-btn" onClick={() => csRef2.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div ref={csRef2} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], paddingBottom: "8px" }}>

            {[
              { href: `/${lang}/success/nissin`,         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          taglineEn: "Sparking social media food cravings with a bold new flavor: spicy Tom Yum Kung cheese." },
              { href: `/${lang}/success/ldc-dental`,     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", taglineEn: "Clear-aligner reviews from influencers, leading into an exclusive event with LDC Dental." },
              { href: `/${lang}/success/watsons`,        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               taglineEn: "House-brand products taking off with influencer power on TikTok & Lemon8." },
              { href: `/${lang}/success/viu`,            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          taglineEn: "Local-powered influencers bringing the \"Isan Chom Wiew\" campaign to life." },
              { href: `/${lang}/success/ahc`,            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   taglineEn: "Igniting brand buzz with an event inspired by the viral series \"AHC Skin Game.\"" },
              { href: `/${lang}/success/guss-damn-good`, img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   taglineEn: "A flavor with a story: when ice cream meets antacid powder." },
              { href: `/${lang}/success/optimum-hi-pro`, img: "/success-stories-2/Success stories-14.jpg", cat: "PET CARE",  title: "Optimum Hi Pro",  tagline: "เข้าถึงคนเลี้ยงปลาคาร์พอย่างตรงกลุ่ม พร้อมขยายการรับรู้ในวงกว้าง",   taglineEn: "Reaching koi keepers with precision, while expanding awareness at scale.", imgFit: "contain" as const, imgBg: "#0e1a5c" },
              { href: `/${lang}/success/auntie-annes`,   img: "/success-stories-2/Success stories-15.jpg",   cat: "FOOD & BEVERAGE", title: "Auntie Anne's",   tagline: "สร้าง Always-on TikTok Content Engine ที่ผลิตต่อเนื่องกว่า 15 เดือน", taglineEn: "Building an always-on TikTok content engine, running for 15+ months.", imgFit: "contain" as const, imgBg: "#ffffff", imgPosition: "center 40%" },
              { href: `/${lang}/success/siangpure`,      img: "/success-stories-2/Success stories-16.jpg",      cat: "HEALTHCARE",      title: "Siangpure",       tagline: "เข้าถึงผู้บริโภคชาวอินเดียผ่าน Indian Influencers บน Instagram",  taglineEn: "Reaching Indian consumers through Indian influencers on Instagram.", imgFit: "contain" as const, imgBg: "#ffffff" },
            ].slice().reverse().map(card => (
              <Link key={card.href} href={card.href} className="cs-card-link" style={{ textDecoration: "none", flexShrink: 0, width: "390px", scrollSnapAlign: "start" }}>
                <div className="cs-card" style={{
                  borderRadius: "28px", height: "520px",
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                  boxSizing: "border-box",
                }}>
                  <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%", background: card.imgBg || undefined }}>
                    <Image src={card.img} alt={card.title} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: card.imgFit || "cover", objectPosition: card.imgPosition || "center" }} />
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
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>

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

      {/* ── Campaign Learning — Measure, Learn, Improve ── */}
      <section style={{
        backgroundImage: "url('/creator-mockup/campaign-learning-bg2.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        position: "relative", overflow: "hidden",
      }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <CampaignLearningSection lang={lang as "th" | "en"} />
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
