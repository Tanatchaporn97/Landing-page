"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GradientCard } from "@/components/ui/gradient-card";
import { Target, Sparkles, Layers, Wallet, BarChart3 } from "lucide-react";
import BusinessGoalsSection from "./BusinessGoalsSection";
import CreatorSelectionSection from "./CreatorSelectionSection";
import CampaignLearningSection from "./CampaignLearningSection";
import CategoriesMarquee from "./CategoriesMarquee";
import CreatorCategoriesSection from "./CreatorCategoriesSection";
import BrandHeroVisual from "./BrandHeroVisual";
import CaseExplorer from "./CaseExplorer";
import ImpactStats from "./ImpactStats";
import { Badge } from "@/components/ui/badge";

// Lazy load below-the-fold components
const LogoMarquee = dynamic(() => import("./LogoMarquee"));
const KolPackagesSection = dynamic(() => import("./KolPackagesSection"));
const NewsroomSection = dynamic(() => import("./NewsroomSection"));
const FAQAccordion = dynamic(() => import("./FAQAccordion"));
const ContactFormSection = dynamic(() => import("./ContactFormSection"));


const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

// Hoisted to a stable reference so it doesn't get recreated (and break
// memoized scroll-progress calculations) on every render.
const SERVICE_CARD_WIDTH = 220; // inactive card width, px
const SERVICE_CARD_GAP = 20; // gap between cards in the scroll row, px

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
  { img: "/services/social-challenges-v3.jpg", title: "Social Challenges",
    desc: "โดดเด่นเหนือใครด้วยชาเลนจ์สนุก ๆ กระตุ้นการมีส่วนร่วมแบบออร์แกนิค ช่วยให้แบรนด์เป็นที่น่าจดจำ และกลายเป็นเรื่องที่ใคร ๆ ก็อยากพูดถึง",
    descEn: "Stand out with fun challenges that spark organic engagement, making your brand memorable and giving people something to talk about." },
  { img: "/services/ugc-product-seeding2.png", title: "UGC & Product Seeding",
    desc: "สร้างกระแสให้สินค้าผ่าน UGC คอมเมนต์ และรีวิวจากผู้ใช้งานและครีเอเตอร์อย่างเป็นธรรมชาติ ช่วยเพิ่ม Social Proof สร้างความน่าเชื่อถือ และกระตุ้นการตัดสินใจซื้อ",
    descEn: "Spark buzz for your product through natural UGC, comments, and reviews from real users and creators — boosting social proof, credibility, and purchase decisions." },
  { img: "/services/livestream-affiliate4.jpg", title: "Livestream & Affiliate",
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
  { img: "/services/photo-video-production2.png", title: "Photo & Video Production",
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

  // Keep the active card scrolled fully into view whenever it changes — via
  // clicking a card directly, or via the arrow buttons stepping to the next/
  // previous one. This keeps the expand animation and the scroll position
  // moving together as a single connected motion, instead of the strip
  // jumping to wherever a fixed-pixel scrollBy happened to land.
  //
  // Deliberately scrolls only servicesScrollRef's own scrollLeft instead of
  // using card.scrollIntoView(): scrollIntoView walks up every scrollable
  // ancestor, including the page itself, so once this section scrolled out
  // of view the 5s auto-advance timer below kept yanking the whole page
  // back up into view to satisfy "block: nearest".
  //
  // The target is computed from the fixed card width/gap constants instead
  // of a live getBoundingClientRect() read: at the instant activeService
  // changes, the card is still mid-tween from its old width (220 → 380),
  // so measuring it in the moment produced a target based on the stale,
  // narrower size.
  //
  // Animated with motion's own animate() rather than scrollTo({behavior:
  // "smooth"}): the browser's native smooth-scroll runs on its own timing,
  // independent of the card's 0.5s width tween, so the two fought each
  // other — the card visibly overshot off-screen to the left before
  // snapping back once the two animations happened to converge. Driving
  // scrollLeft with the exact same duration/easing as the card's layout
  // transition keeps them perfectly in lockstep.
  //
  // A step to a non-adjacent card — the 12→0 auto-advance wraparound, or
  // clicking a card far from the current one — covers ~2000px of scroll
  // in the same 0.5s the width tween runs. The card sits scrolled out of
  // view for nearly the whole transition and only snaps into frame right
  // at the end, reading as if it got clipped at the row's edge. Jumping
  // straight to the target for these long hops (and only animating the
  // short, adjacent-card case) avoids that off-screen sweep entirely.
  const prevActiveServiceRef = useRef(0);
  const scrollActiveCardIntoView = () => {
    const container = servicesScrollRef.current;
    if (!container) return;
    const prev = prevActiveServiceRef.current;
    const target = activeService * (SERVICE_CARD_WIDTH + SERVICE_CARD_GAP);
    if (Math.abs(activeService - prev) === 1) {
      animate(container.scrollLeft, target, {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => { container.scrollLeft = v; },
      });
    } else {
      container.scrollLeft = target;
    }
  };
  useEffect(() => {
    scrollActiveCardIntoView();
    prevActiveServiceRef.current = activeService;
  }, [activeService]);

  // Auto-advance the Our Services row every 5s, looping back to the start;
  // paused while the user is hovering the row.
  const [servicesAutoPaused, setServicesAutoPaused] = useState(false);
  useEffect(() => {
    if (servicesAutoPaused) return;
    const id = setInterval(() => {
      setActiveService((prev) => (prev + 1) % OUR_SERVICES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [servicesAutoPaused]);



  const [activeCampaignStep, setActiveCampaignStep] = useState(0);
  // desc / descEn: "|" marks the line break — every step reads as exactly two lines on desktop.
  const CAMPAIGN_STEPS = [
    { img: "/how-we-run-campaigns/plan-campaign.png", title: "กำหนดรายละเอียดบรีฟ", titleEn: "Define the Brief",
      desc: "ทำความเข้าใจโจทย์ของแบรนด์ตั้งแต่ต้นทาง|เพื่อวางทิศทางแคมเปญให้ตรงเป้าหมายที่สุด",
      descEn: "We start by fully understanding your brief,|so the campaign direction is aligned with your goals from day one." },
    { img: "/how-we-run-campaigns/manage-seamlessly.png", title: "วางแผนแคมเปญ", titleEn: "Plan the Campaign",
      desc: "เปลี่ยนเป้าหมายของแบรนด์เป็นกลยุทธ์ที่จับต้องได้|ให้ทุกการสื่อสารไปถึงกลุ่มเป้าหมายได้ตรงจุด",
      descEn: "We turn your brand's goals into a concrete strategy,|so every message reaches the right audience." },
    { img: "/how-we-run-campaigns/select-influencers.png", title: "คัดสรรอินฟลูเอนเซอร์ที่ใช่", titleEn: "Select the Right Influencers",
      desc: "ผ่านระบบ KOL Discovery จับคู่อินฟลูเอนเซอร์ที่เหมาะสมที่สุด|กับแบรนด์คุณด้วยข้อมูลเชิงลึกที่แม่นยำ",
      descEn: "Our KOL Discovery system matches your brand|with the most suitable influencers using precise data insights." },
    { img: "/how-we-run-campaigns/review-drafts.png", title: "จัดการแคมเปญไร้รอยต่อ", titleEn: "Manage Seamlessly",
      desc: "ให้แคมเปญของคุณดำเนินไปอย่างไม่มีสะดุด|ด้วยทีมงานมืออาชีพที่ดูแลทุกขั้นตอน",
      descEn: "Your campaign runs without a hitch,|with a professional team overseeing every step." },
    { img: "/how-we-run-campaigns/launch.png", title: "Launch คอนเทนต์ พร้อมติดตามผล", titleEn: "Launch & Track Results",
      desc: "ลงคอนเทนต์ตามแผน พร้อมเฝ้าติดตามเรียลไทม์|เพื่อให้ทุกโพสต์ราบรื่นตั้งแต่ต้นจนจบ",
      descEn: "Content goes live as planned, with real-time monitoring|so every post runs smoothly from start to finish." },
    { img: "/how-we-run-campaigns/report-results.png", title: "รายงานผลแบบเรียลไทม์", titleEn: "Real-Time Reporting",
      desc: "ติดตามทุกความเคลื่อนไหวบนแดชบอร์ด|พร้อมรับรายงานและอินไซต์ที่นำไปใช้ต่อได้จริง",
      descEn: "Track every move on the dashboard|and get reports and insights you can actually put to use." },
  ];
  const CAMPAIGN_ROW_HEIGHT = 140;
  const CAMPAIGN_ROW_GAP = 24;

  // Auto-advance the campaign steps every 5s, looping back to the start;
  // paused while the user is hovering the step list.
  const [campaignAutoPaused, setCampaignAutoPaused] = useState(false);
  useEffect(() => {
    if (campaignAutoPaused) return;
    const id = setInterval(() => {
      setActiveCampaignStep((prev) => (prev + 1) % CAMPAIGN_STEPS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [campaignAutoPaused]);




  return (
    <div className="hero-bg min-h-screen flex flex-col overflow-x-hidden" style={{ ...KT }}>

      {/* ── Navbar ── */}
      <Navbar variant="brand" lang={lang} />

      {/* ── Hero through "How We Run Campaigns" — ONE single continuous gradient
          definition (not several separate gradients on separate sections) so there is
          no seam or slope discontinuity anywhere Hero → Our Clients → Tagline → the
          rest of the page. Hero, Our Clients (LogoMarquee), and the Tagline section are
          all transparent so this shows straight through them. "Find the Right Creator"
          sits inside this range but keeps its own dark background image (matching
          Measure/Learn/Improve) untouched. The gradient is only ever interrupted by
          "Measure, Learn, Improve" right after this wrapper closes, which keeps its own
          dark background as the one deliberate divider. Scoped to this wrapper only —
          not the shared .hero-bg class — so Home/Influencer pages are unaffected. */}
      <div style={{
        background: "linear-gradient(180deg, #e8dcf8 0%, #ecdff5 4%, #f2e6f6 8%, #f8f2fa 12%, #ffffff 16%, #f5eefc 24%, #efe3fa 32%, #e8d8f7 42%, #e5dcf6 55%, #e2d5f3 70%, #dfd0f0 85%, #dccbee 100%)",
      }}>
      {/* ── Hero ── */}
      <section
        className="flex items-start px-6 relative"
        style={{
          minHeight: "72vh",
          paddingTop: "195px",
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
            <h2 className="font-bold uppercase" style={{ ...KT, color: "#111827", fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: "0 0 24px" }}>
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

            <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.7, margin: "40px 0 32px" }}>
              {lang === "th" ? (
                <>วางกลยุทธ์ คัดเลือก Creator และบริหารแคมเปญให้ตรง<br />เป้าหมายของแบรนด์ ตั้งแต่ Brief จนถึงรายงานผล</>
              ) : (
                "From Strategy To Insight, We Turn Influence Into Impact."
              )}
            </p>

            <a href="#contact" className="btn-glass-purple" style={{ ...KT,
              fontWeight: 600, fontSize: "16px",
              padding: "16px 36px", borderRadius: "50px", textDecoration: "none" }}>
              {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
            </a>

          </div>

          {/* Right: interactive campaign-dashboard + creator-cards composition */}
          <div style={{ position: "relative" }}>
            <BrandHeroVisual lang={lang as "th" | "en"} />
          </div>
        </div>
      </section>

      {/* ── Impact Stats — same strip as Home; transparent so the page gradient shows through ── */}
      <ImpactStats lang={lang as "th" | "en"} background="transparent" style={{ marginTop: 0, paddingTop: 0 }} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee headingStyle={{ ...PIERSON, fontWeight: 800, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} />

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
          <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: 0 }}>
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "620px" }}>
              <div>
                <Badge variant="outline">What We Do</Badge>
              </div>
              <h2 className="font-bold section-h2-fixed" style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: 0,
                fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827" }}>
                Solutions for Every{" "}
                <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Creator Marketing
                </span>{" "}
                Need
              </h2>
              <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0 }}>
                {lang === "th"
                  ? "ตั้งแต่ Strategy, Creator Campaigns, Commerce ไปจนถึง Content & Production"
                  : "From Strategy, Creator Campaigns, and Commerce to Content & Production."}
              </p>
            </div>
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
          <div ref={servicesScrollRef}
            onMouseEnter={() => setServicesAutoPaused(true)}
            onMouseLeave={() => setServicesAutoPaused(false)}
            style={{
              display: "flex", gap: `${SERVICE_CARD_GAP}px`, overflowX: "auto", scrollSnapType: "x mandatory",
              scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
              alignItems: "center", paddingBottom: "8px",
            }}>
            {OUR_SERVICES.map((item, i) => {
              const isActive = activeService === i;
              return (
                <div key={item.title} onClick={() => setActiveService(i)}
                  ref={(el) => { serviceCardRefs.current[i] = el; }}
                  style={{
                    width: isActive ? 380 : SERVICE_CARD_WIDTH,
                    // minHeight (not a hard height) so collapsed cards keep their original
                    // compact size, while an expanded card can grow taller to fit its full
                    // description instead of clipping it.
                    minHeight: "486px",
                    flexShrink: 0, scrollSnapAlign: "start",
                    borderRadius: isActive ? 24 : 20, overflow: "hidden", cursor: "pointer",
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                    display: "flex", flexDirection: "column",
                  }}>
                  <div style={{ position: "relative", width: "100%", height: isActive ? "290px" : "406px", flexShrink: 0 }}>
                    <Image src={item.img} alt={item.title} fill sizes={isActive ? "380px" : "220px"}
                      style={{ objectFit: "cover", objectPosition: item.objectPosition || "center" }} />
                  </div>
                  <div style={{
                    padding: isActive ? "24px 26px 28px" : "18px 18px 20px",
                    display: "flex", flexDirection: "column",
                    minHeight: isActive ? "196px" : "80px", flexShrink: 0,
                  }}>
                    <h3 style={{ ...KT, fontSize: isActive ? "22px" : "16px", fontWeight: 700, color: "#5f26e5", margin: isActive ? "0 0 10px" : 0, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    {isActive && (
                      <p style={{
                        ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0,
                      }}>
                        {lang === "th" ? item.desc : item.descEn}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>
        </div>
      </section>

      {/* ── Find the Right Creator — KOL discovery mockup ── */}
      <section style={{
        background: "url('/backgrounds/dark-blue-bg2.jpg') center / cover no-repeat",
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", marginBottom: "56px" }}>
            <Badge variant="outline">Why Buddy Review</Badge>
            <h2 className="font-bold section-h2-fixed" style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2,
              fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: 0 }}>
              Think Smarter,{" "}
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Execute Better
              </span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0, maxWidth: "640px" }}>
              {lang === "th"
                ? "เราใช้ Strategy, Creator Intelligence และ Campaign Data เชื่อมทุกขั้นตอนเข้าด้วยกัน ตั้งแต่การเลือก Creator ไปจนถึงการวัดผล เพื่อให้ทุกการตัดสินใจมีเหตุผล และทุกแคมเปญนำไปต่อยอดได้"
                : "We connect Strategy, Creator Intelligence, and Campaign Data across every step — from Creator selection to measurement — so every decision is backed by reason, and every campaign can be built on."}
            </p>
          </div>

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
                  style={{
                    ...KT,
                    background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 8px 28px rgba(95,38,229,0.08)",
                  }}
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
              style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "1.2", margin: 0,
                fontFeatureSettings: "'pnum' on,'lnum' on" }}>
              See the Work{" "}
              <span style={{
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>in Action</span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", color: "#111827", maxWidth: "560px", margin: 0 }}>
              {lang === "th"
                ? "ดูว่าเราเปลี่ยนโจทย์ของแต่ละแบรนด์ให้เป็นแคมเปญจริงอย่างไร"
                : "See how we turn each brand's challenge into a real campaign."}
            </p>
          </div>

          <CaseExplorer lang={lang as "th" | "en"} stories={dict?.successStories ?? []} />

          {/* ดูเพิ่มเติม CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <Link href={`/${lang}/success`} className="btn-glass-purple" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
            }}>
              {lang === "th" ? "ดูเคสทั้งหมด" : "View All Cases"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── How We Run Campaigns ── */}
      <section className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", maxWidth: "760px", margin: "0 auto 56px" }}>
            <Badge variant="outline">Campaign Flow</Badge>
            <h2 className="section-h2-fixed" style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: 0 }}>
              Keep Every Step{" "}
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Moving
              </span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0 }}>
              {lang === "th"
                ? "ทีม Buddy Review ดูแลแคมเปญตั้งแต่ต้นจนจบ พร้อมให้ลูกค้าเห็นความคืบหน้าและสิ่งที่ต้องตัดสินใจในแต่ละขั้น"
                : "The Buddy Review team manages your campaign from start to finish, keeping you updated on progress and every decision along the way."}
            </p>
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
            <div
              onMouseEnter={() => setCampaignAutoPaused(true)}
              onMouseLeave={() => setCampaignAutoPaused(false)}
              style={{ position: "relative", display: "flex", flexDirection: "column", gap: `${CAMPAIGN_ROW_GAP}px`, paddingLeft: "32px" }}>
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
                  style={{ minHeight: `${CAMPAIGN_ROW_HEIGHT}px`, display: "flex", flexDirection: "column", justifyContent: "flex-start",
                    cursor: "pointer", opacity: i === activeCampaignStep ? 1 : 0.55, transition: "opacity 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{
                      ...KT, fontSize: "20px", fontWeight: 800, flexShrink: 0,
                      color: "#5f26e5",
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h3 style={{ ...KT, fontSize: "20px", fontWeight: 700, margin: 0, transition: "color 0.2s",
                        color: i === activeCampaignStep ? "#5f26e5" : "#111827" }}>{lang === "th" ? step.title : step.titleEn}</h3>
                      <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: 0 }}>
                        {(lang === "th" ? step.desc : step.descEn).split("|").map((line, li) => (
                          <span key={li}>{li > 0 && <>{" "}<br className="kesm-br" /></>}{line}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* forced 2-line breaks only where the column is wide enough; narrow screens wrap naturally */}
              <style>{`@media (max-width: 1100px){ .kesm-br{ display: none; } }`}</style>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ── Campaign Learning — Measure, Learn, Improve ── */}
      <section style={{
        background: "url('/backgrounds/dark-blue-bg2.jpg') center / cover no-repeat",
        position: "relative", overflow: "hidden",
      }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <CampaignLearningSection lang={lang as "th" | "en"} />
        </div>
      </section>

      {/* ── Influencer Categories through Contact — one continuous, soft gradient.
          Starts right where "Keep Every Step Moving" (the last section before the
          Measure/Learn/Improve divider) left off, so the two feel like one gradient
          even though the dark Campaign Learning section sits between them, then settles
          into a light, flat purple tone from KOL Campaign Packages onward instead of
          fading all the way to white. */}
      <div style={{
        background: "linear-gradient(180deg, #dccbee 0%, #ecdef7 20%, #f2e4f9 32%, #e6d2f2 100%)",
      }}>
      {/* ── Influencer Categories ── */}
      <section style={{ overflow: "hidden", background: "transparent" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center"
            style={{ ...PIERSON, fontWeight: 700, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: "0 0 48px" }}>
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
      <NewsroomSection lang={lang} dict={dict} variant="brand" />

      {/* ── FAQs ── */}
      <FAQAccordion faqs={dict?.homeFaqs} lang={lang} variant="brand" dict={dict} />

      <div id="contact" className="contact-bg" style={{ padding: "80px 0" }}>
        <Suspense fallback={null}>
          <ContactFormSection lang={lang} dict={dict?.contactForm}
            headingOverride={lang === "th" ? "มี Brief แล้ว หรือยังไม่แน่ใจว่าควรเริ่มจากอะไร?" : "Have a brief, or not sure where to start?"}
            subheadingOverride={lang === "th"
              ? "เล่าเป้าหมายของคุณให้เราฟัง ทีม Buddy Review จะช่วยมองโจทย์ วางแนวทาง และแนะนำ campaign approach ที่เหมาะกับแบรนด์"
              : "Tell us your goal — the Buddy Review team will help frame the challenge, shape the direction, and recommend a campaign approach that fits your brand."}
          />
        </Suspense>
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
