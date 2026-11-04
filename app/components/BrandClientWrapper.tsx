"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GradientCard } from "@/components/ui/gradient-card";
import { Target, Sparkles, Layers, Wallet, BarChart3, Brain } from "lucide-react";
import BusinessGoalsSection from "./BusinessGoalsSection";
import CreatorSelectionSection from "./CreatorSelectionSection";
import CampaignLearningSection from "./CampaignLearningSection";
import CategoriesMarquee from "./CategoriesMarquee";
import CreatorCategoriesSection from "./CreatorCategoriesSection";
import BrandHeroVisual from "./BrandHeroVisual";
import CaseExplorer from "./CaseExplorer";
import ImpactStats from "./ImpactStats";
import { Badge } from "@/components/ui/badge";
import { isHistoryNavigation } from "./NavHistory";

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
  { img: "/services/campaign-reviews-v5.jpg", objectPosition: "center 40%", title: "Campaign Reviews",
    desc: "รีวิวสินค้าและบริการผ่านอินฟลูเอนเซอร์ที่ใช่ พร้อมสื่อสารข้อความและจุดเด่นของแบรนด์ได้อย่างมีประสิทธิภาพ เปลี่ยนให้ทุกความสนใจเป็นยอดขาย",
    descEn: "Connect with the right influencers to showcase your products, communicate key selling points, and encourage purchase decisions." },
  { img: "/services/influencer-campaign-management.jpg", title: "Influencer Campaign Management",
    desc: "ดูแลแคมเปญอินฟลูเอนเซอร์แบบครบวงจร ตั้งแต่การวางแผน คัดเลือกอินฟลูเอนเซอร์ ประสานงาน ไปจนถึงติดตามและวัดผล เพื่อให้ทุกขั้นตอนของแคมเปญเดินหน้าได้อย่างมีประสิทธิภาพ",
    descEn: "End-to-end campaign management, from planning and influencer selection to creator coordination, execution, and performance reporting." },
  { img: "/services/ugc-product-seeding.jpg", title: "Influencer Network",
    desc: "เข้าถึงเครือข่ายอินฟลูเอนเซอร์หลากหลายหมวด\u2060หมู่ พร้อมค้นหาและคัดเลือกคนที่ตรงกับโจทย์ กลุ่มเป้า\u2060หมาย และภาพลักษณ์ของแบรนด์ได้อย่างแม่นยำ",
    descEn: "Access a diverse influencer network and find creators who align with your campaign objectives, target audience, and brand identity." },
  { img: "/services/on-demand-fast-track2.jpg", objectPosition: "62% center", title: "On-Demand & Fast-Track Campaigns",
    desc: "ตอบโจทย์แคมเปญที่ต้องการความรวดเร็ว ด้วยการค้นหาและประสานงานอินฟลูเอนเซอร์ในเวลาจำกัด ช่วยให้แบรนด์เริ่มแคมเปญได้ทันทุกโอกาสและทุกกระแส",
    descEn: "Move quickly with streamlined influencer sourcing and coordination, helping your brand respond to emerging trends and time-sensitive opportunities." },
  { img: "/services/social-challenges-v5.jpg", objectPosition: "center 32%", title: "Social Challenges",
    desc: "โดดเด่นเหนือใครด้วยชาเลนจ์สนุก ๆ กระตุ้นการมีส่วนร่วมแบบออร์แกนิค ช่วยให้แบรนด์เป็นที่น่าจดจำ และกลายเป็นเรื่องที่ใคร ๆ ก็อยากพูดถึง",
    descEn: "Spark participation and organic engagement through creative social challenges that get people involved and talking about your brand." },
  { img: "/services/ugc-product-seeding3.jpg", objectPosition: "center 30%", title: "UGC & Product Seeding",
    desc: "สร้างกระแสให้สินค้าผ่าน UGC คอมเมนต์ และรีวิวจากผู้ใช้งานและครีเอเตอร์อย่างเป็นธรรมชาติ ช่วยเพิ่ม Social Proof สร้างความน่าเชื่อถือ และกระตุ้นการตัดสินใจซื้อ",
    descEn: "Build social proof and credibility through authentic user-generated content, comments, and reviews from consumers and creators." },
  { img: "/services/livestream-affiliate5.jpg", title: "Livestream & Affiliate",
    desc: "คอนเทนต์ที่ออกแบบมาเพื่อสร้างผลลัพธ์ด้านยอดขายโดยตรงผ่าน Livestream และ Affiliate จ\u2060า\u2060กอินฟลูเอนเซอร์ เปลี่ยนความสนใจให้กลายเป็นการซื้อได้ง่ายขึ้น",
    descEn: "Connect creator-led livestreams and affiliate marketing with your sales objectives, making it easier for audiences to discover and purchase your products." },
  { img: "/services/influencer-event-activation2.jpg", objectPosition: "60% center", title: "Influencer & Event Activation",
    desc: "ตั้งแต่อินฟลูเอนเซอร์ร่วมงาน Presenter และ Speaker ไปจนถึงทีมประสานงานหน้างาน เราช่วยให้อีเวนต์สร้างคอนเทนต์ กระแส และการพูดถึงได้อย่างต่อเนื่องทั้ง Online และ On-site",
    descEn: "Bring your events to life with influencer appearances, presenters, speakers, and on-site coordination, generating content and conversations across online and on-site experiences." },
  { img: "/services/presenter-celebrity.jpg", objectPosition: "center 24%", title: "Presenter & Celebrity Marketing",
    desc: "คัดเลือกและประสานงาน Presenter, Celebrity และ Brand Ambassador ที่เ\u2060ห\u2060ม\u2060า\u2060ะ\u2060กั\u2060บภ\u2060า\u2060พ\u2060ลั\u2060ก\u2060ษ\u2060ณ์และกลุ่มเป้าหมายของแบรนด์ ช่วยสร้างการจดจำ เพิ่มความน่าเชื่อถือ และขยายการรับรู้แบรนด์ผ่านบุคคลที่มีชื่อเสียง",
    descEn: "Find the right presenters, celebrities, and brand ambassadors to represent your brand, build credibility, strengthen brand recognition, and connect with your target audience." },
  { img: "/services/community-fandom3.jpg", objectPosition: "45% center", title: "Community & Fandom Marketing",
    desc: "สร้างการมีส่วนร่วมระหว่างแบรนด์กับกลุ่ม Community และ Fandom ผ่าน\u200Bอิ\u2060น\u2060ฟ\u2060ลู\u2060เ\u2060อ\u2060น\u2060เ\u2060ซ\u2060อ\u2060ร์\u200Bและคอนเทนต์ที่ตรงกับความสนใจของแต่ละกลุ่ม ช่วยสร้างกระแส กระตุ้นการ\u200Bพู\u2060ด\u2060ถึ\u2060ง\u200Bและบอกต่อ พร้อมสร้างความสัมพันธ์ที่ดีกับกลุ่มเป้าหมาย",
    descEn: "Connect your brand with passionate communities and fandoms through relevant influencers and content, sparking engagement, conversations, and organic word-of-mouth." },
  { img: "/services/paid-media-amplification-vivid.jpg", title: "Paid Media & Amplification",
    desc: "เพิ่มพลังให้แคมเปญด้วยการยิงโฆษณา บูสต์ และ Amplify คอนเทนต์จากอินฟลูเอนเซอร์ เข้าถึงกลุ่มเป้าหมายได้กว้างและแม่นยำขึ้น พร้อมผลักดันผลลัพธ์จากทุกคอนเทนต์ให้ไปได้ไกลกว่าเดิม",
    descEn: "Extend the reach and impact of influencer content through targeted paid media, reaching relevant audiences and maximising content exposure." },
  { img: "/services/always-on-auntieannes2.jpg", imgTall: "/services/always-on-auntieannes-tall.jpg", objectPosition: "center 39%", title: "Always-On Influencer & Media Strategy",
    desc: "วางกลยุทธ์ Influencer และ Media อย่างต่อเนื่องตลอดทั้งปี ช่วยให้แบรนด์รักษาการมองเห็น สร้างความสัมพันธ์กับกลุ่มเป้าหมาย และต่อยอดผลลัพธ์ได้มากกว่าแคมเปญระยะสั้น",
    descEn: "Keep your brand visible and connected with audiences through ongoing influencer collaborations and a consistent, year-round media strategy." },
  { img: "/services/creative-content-concept2.jpg", objectPosition: "58% 72%", title: "Creative Content & Concept Development",
    desc: "พัฒนา Campaign Concept, Key Message และแนวทางคอนเทนต์ให้เหมาะกับแบรนด์และแพลตฟอร์ม ช่วยให้อินฟลูเอนเซอร์สร้างคอนเทนต์ที่น่าสนใจ พร้อมสื่อสารสิ่งที่แบรนด์ต้องการได้อย่างชัดเจน",
    descEn: "Develop campaign concepts, key messages, and creative direction that align with your brand, audience, and platform requirements." },
  { img: "/services/photo-video-production3.jpg", objectPosition: "36% center", title: "Photo & Video Production",
    desc: "สร้างสรรค์ภาพและวิดีโอตั้งแต่การวาง Concept, Storyboard ไปจนถึงการถ่ายทำและ Post-production เพื่อให้แบรนด์มีคอนเทนต์คุณภาพพร้อมใช้บนทุกช่องทาง",
    descEn: "Bring creative ideas to life through professional photo and video production, from concept development and storyboarding to filming and post-production." },
  { img: "/services/publishing-advertorial-real.jpg", objectPosition: "center 38%", title: "Publishing & Advertorial",
    desc: "เพิ่มพื้นที่การมองเห็นให้แบรนด์ผ่านบทความและคอนเทนต์บนช่องทางที่เหมาะสม ถ่ายทอดเรื่องราวและข้อมูลของแบรนด์ในรูปแบบที่เข้าถึงและสร้างความน่าเชื่อถือได้มากขึ้น",
    descEn: "Expand your brand's presence through strategically placed articles and advertorial content that communicate your story and build credibility.",
    },
];

const WHAT_WE_OFFER = [
  { icon: "/what-we-offer/What We Offer-02.png", title: "วางแผนให้ตรงเป้าหมาย", titleEn: "Strategies Built Around Your Goals",
    desc: "ออกแบบกลยุทธ์และคอนเทนต์ตามโจทย์ของแต่ละแบรนด์ เพื่อให้การสื่อสารเข้าถึงกลุ่มเป้าหมายได้ตรงจุดและตอบโจทย์",
    descEn: "We tailor strategies and content to your brand's objectives, reaching the right audience with messaging designed to meet your campaign goal.",
    Icon: Target, gradient: "purple" as const, badgeText: "Data-Driven", badgeColor: "#5f26e5" },
  { icon: "/what-we-offer/What We Offer-01.png", title: "เลือก Creator ได้แม่นยำขึ้น", titleEn: "Smarter Creator Selection",
    desc: "ใช้ฐานข้อมูล Creator กว่า 1 ล้านโปรไฟล์ วิเคราะห์\u200Bตั\u2060ว\u2060ต\u2060น\u200B กลุ่มผู้ติดตาม และ Performance ที่ผ่านมา เพื่อเลือกคนที่เหมาะกับแบรนด์",
    descEn: "With over 1 million creator profiles, we analyse creator identities, audience data, and past performance to find the best fit for your brand.",
    Icon: Sparkles, gradient: "purple" as const, badgeText: "AI-Powered", badgeColor: "#ff0089" },
  { icon: "/what-we-offer/ai-insight-v2.png", title: "เปลี่ยนข้อมูลเป็น Insight ด้วย AI", titleEn: "Turning Data into Actionable Insights",
    desc: "ใช้ AI วิเคราะห์ข้อมูลตลอดแคมเปญ เพื่อค้นหา Insight ที่ช่วยให้ตัดสินใจได้แม่นยำและพัฒนาผลลัพธ์อย่างต่อเนื่อง",
    descEn: "We use AI to analyse campaign data, uncover actionable insights, and support smarter decisions and ongoing performance improvements.",
    Icon: Brain, gradient: "purple" as const, badgeText: "AI Insights", badgeColor: "#9333ea" },
  { icon: "/what-we-offer/What We Offer-05.png", title: "ทำแคมเปญได้ง่ายขึ้น", titleEn: "Campaign Management Made Simple",
    desc: "ทีมงานดูแลตั้งแต่ต้นจนจบ พร้อมระบบ Campaign Management ช่วยติดตามงานและจัดการคอนเทนต์ ลดภาระการประสานงานของแบรนด์",
    descEn: "Our team manages your campaign from start to finish, supported by tools that streamline task tracking, content management, and coordination.",
    Icon: Layers, gradient: "purple" as const, badgeText: "End-to-End", badgeColor: "#2e1a7a" },
  { icon: "/what-we-offer/What We Offer-03.png", title: "ใช้งบได้คุ้มค่ามากขึ้น", titleEn: "Make Every Budget Count",
    desc: "ใช้ข้อมูลผลงานและกลุ่มผู้ติดตามช่วยเลือก Creator วางแผน Media และจัดสรรงบ เพื่อลดการใช้จ่าย\u200Bซ้ำ\u2060ซ้\u2060อ\u2060น\u200Bและเพิ่มความคุ้มค่าของแคมเปญ",
    descEn: "We use performance and audience data to guide creator selection, media planning, and budget allocation, helping reduce unnecessary spending and maximise campaign value.",
    Icon: Wallet, gradient: "purple" as const, badgeText: "Cost-Efficient", badgeColor: "#b6146e" },
  { icon: "/what-we-offer/What We Offer-04.png", title: "เห็นผลเร็ว ตัดสินใจได้ทัน", titleEn: "Real-Time Insights. Faster Decisions.",
    desc: "ติดตาม Performance เทียบกับ KPI ผ่าน Dashboard ช่วยให้รู้เร็วว่าอะไรได้ผล จุดไหนต้องปรับปรุง และแก้ไขได้ทันระหว่างแคมเปญ",
    descEn: "Track performance against KPIs through our dashboard, see what's working, identify areas for improvement, and make timely adjustments while your campaign is running.",
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
  // Browser back/forward is the exception: keep the restored position so
  // "Back" from an article or case study returns to the section it came from.
  useEffect(() => {
    if (isHistoryNavigation()) return;
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  // Every "ติดต่อเรา" link on this page (hero, KOL packages, navbar) glides down
  // to the contact form instead of jumping: a slow ease-in-out tween on window
  // scroll, stopping just under the fixed navbar. KOL package links
  // ("?budget=…#contact") also pre-fill the form's budget with that package's price.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      const budgetLink = href.startsWith("?budget=") && href.endsWith("#contact");
      if (href !== "#contact" && !href.endsWith("/contact#contact") && !budgetLink) return;
      const target = document.getElementById("contact");
      if (!target) return;
      e.preventDefault();
      if (budgetLink) {
        const budget = new URLSearchParams(href.slice(0, href.indexOf("#"))).get("budget") || "";
        window.dispatchEvent(new CustomEvent("contact:prefill", { detail: { budget } }));
      }
      const to = target.getBoundingClientRect().top + window.scrollY - 24;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo(0, to); return; }
      const distance = Math.abs(to - window.scrollY);
      animate(window.scrollY, to, {
        duration: Math.min(2.2, Math.max(1, distance / 2500)),
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (v) => window.scrollTo(0, v),
      });
      history.replaceState(null, "", budgetLink ? href : "#contact");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeService, setActiveService] = useState(0);

  // Phones: services become a plain swipe carousel (full cards, snap, counter + arrows)
  const svcTrackRef = useRef<HTMLDivElement>(null);
  const [svcSlide, setSvcSlide] = useState(0);
  const onSvcScroll = () => {
    const el = svcTrackRef.current; const first = el?.firstElementChild as HTMLElement | null;
    if (el && first) setSvcSlide(Math.min(OUR_SERVICES.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 14))));
  };
  const svcGoTo = (i: number) => {
    const el = svcTrackRef.current; const card = el?.children[Math.max(0, Math.min(OUR_SERVICES.length - 1, i))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  };

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
  // paused while the user is hovering the row (or its arrows), and stopped for
  // good once they pick a card themselves (click or arrows) so it stays put to read.
  const [servicesAutoPaused, setServicesAutoPaused] = useState(false);
  const [servicesUserPicked, setServicesUserPicked] = useState(false);
  const pickService = (next: number | ((prev: number) => number)) => {
    setServicesUserPicked(true);
    setActiveService(next);
  };
  useEffect(() => {
    if (servicesAutoPaused || servicesUserPicked) return;
    const id = setInterval(() => {
      setActiveService((prev) => (prev + 1) % OUR_SERVICES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [servicesAutoPaused, servicesUserPicked]);



  const [activeCampaignStep, setActiveCampaignStep] = useState(0);
  // desc / descEn: "|" marks the line break — every step reads as exactly two lines on desktop.
  const CAMPAIGN_STEPS = [
    { img: "/how-we-run-campaigns/plan-campaign-v8.png", title: "กำหนดรายละเอียดบรีฟ", titleEn: "Define the Brief",
      desc: "ทำความเข้าใจโจทย์ของแบรนด์ตั้งแต่ต้นทาง|เพื่อวางทิศทางแคมเปญให้ตรงเป้าหมายที่สุด",
      descEn: "We start by understanding your brand's needs and objectives to set a clear direction for your campaign." },
    { img: "/how-we-run-campaigns/manage-seamlessly-v4.png", title: "วางแผนแคมเปญ", titleEn: "Plan the Campaign",
      desc: "เปลี่ยนเป้าหมายของแบรนด์เป็นกลยุทธ์ที่จับต้องได้|ให้ทุกการสื่อสารไปถึงกลุ่มเป้าหมายได้ตรงจุด",
      descEn: "We turn your business goals into an actionable campaign strategy designed to reach the right audience." },
    { img: "/how-we-run-campaigns/select-influencers-v5.png", title: "คัดสรรอินฟลูเอนเซอร์ที่ใช่", titleEn: "Select the Right Influencers",
      desc: "ผ่านระบบ KOL Discovery จับคู่อินฟลูเอนเซอร์ที่เหมาะสมที่สุด|กับแบรนด์คุณด้วยข้อมูลเชิงลึกที่แม่นยำ",
      descEn: "Our KOL Discovery system uses data-driven insights to identify influencers who align with your brand and campaign goals." },
    { img: "/how-we-run-campaigns/review-drafts-v4.png", title: "จัดการแคมเปญไร้รอยต่อ", titleEn: "Manage Seamlessly",
      desc: "ให้แคมเปญของคุณดำเนินไปอย่างไม่มีสะดุด|ด้วยทีมงานมืออาชีพที่ดูแลทุกขั้นตอน",
      descEn: "Our team handles campaign coordination and execution, keeping every stage organised and on track." },
    { img: "/how-we-run-campaigns/launch-v5.png", title: "เผยแพร่คอนเทนต์ตามแผน", titleEn: "Publish Content as Planned",
      desc: "เผยแพร่คอนเทนต์ตามกำหนด พร้อมดูแลและประสานงานกับ|Creator เพื่อให้ทุกโพสต์เป็นไปตามแผน",
      descEn: "We coordinate with creators to ensure content is published on schedule and aligned with the campaign plan." },
    { img: "/how-we-run-campaigns/report-results-v4.png", title: "รายงานผลแบบเรียลไทม์", titleEn: "Real-Time Reporting",
      desc: "ติดตามทุกความเคลื่อนไหวบนแดชบอร์ด|พร้อมรับรายงานและอินไซต์ที่นำไปใช้ต่อได้จริง",
      descEn: "Monitor campaign performance through our real-time dashboard, with reports and actionable insights to evaluate results and inform future campaigns." },
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
    <div className={`brand-page hero-bg min-h-screen flex flex-col overflow-x-hidden${lang === "th" ? " brand-th" : ""}`} style={{ ...KT }}>
      {/* Thai main headings on this page: Kanit SemiBold (600). English/Pierson parts keep their own weight. */}
      <style>{`.brand-th .th-head, .brand-th .th-head span:not(.th-keep){ font-weight: 600 !important; }`}</style>

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
        className="bh-section flex items-start px-6 relative"
        style={{
          minHeight: "72vh",
          // heading starts at the same distance under the navbar as the influencer hero
          paddingTop: "166px",
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
          display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "72px", alignItems: "start" }}>

          {/* Left: real hero copy, playful stacked layout + underline squiggle + pill CTA.
              Top-aligned with the visual: .bh-copy padding matches the gap above its first card. */}
          <div className="bh-copy" style={{ position: "relative" }}>
            <h1 className="bh-title th-head font-bold" style={{ ...(lang === "th" ? KT : { ...PIERSON, fontWeight: 700 }), color: "#111827", fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.25, margin: "0 0 24px" }}>
              {lang === "th" ? (
                <>
                  <span className="bh-line">วางแผนและดูแล</span>
                  <span className="bh-line th-keep" style={{ ...PIERSON, fontWeight: 800, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Influencer Marketing
                  </span>
                  <span className="bh-line">ครบตั้งแต่ต้นจนจบ</span>
                </>
              ) : (
                <>
                  From Influencer Strategy.<br/>
                  <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    To Campaign Success.
                  </span>
                </>
              )}
            </h1>

            <p className="bh-sub" style={{ ...KT, color: "#111827", fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.75, margin: "32px 0 32px", textWrap: "pretty" }}>
              {lang === "th" ? (
                <>ทีม Buddy Review ดูแลตั้งแต่กลยุทธ์ คัด Influencer <span className="bh-nw">ไปจนถึงบริหารและวัดผล</span> พร้อมใช้ Data และ Technology <span className="bh-nw">ช่วยให้ตัดสินใจได้แม่นขึ้น</span></>
              ) : (
                "Buddy Review brings together expertise, data, and technology to make smarter decisions at every stage."
              )}
            </p>

            <style>{`
              .bh-line{ display: block; white-space: nowrap; }
              .bh-nw{ white-space: nowrap; }
              @media (min-width: 768px){ .bh-copy{ padding-top: clamp(12px, 2vw, 29px); } }
              @media (max-width: 767px){
                .bh-section{ padding-top: 140px !important; }
                /* same 28px hero heading as the Home and Influencer pages */
                .bh-title{ font-size: 28px !important; line-height: 1.3 !important; margin-bottom: 18px !important; }
                .bh-sub{ line-height: 1.7 !important; margin: 18px 0 26px !important; }
              }
            `}</style>

            <a href="#contact" className="btn-glass-purple" style={{ ...KT,
              fontWeight: 600, fontSize: "16px",
              padding: "14px 48px", borderRadius: "50px", textDecoration: "none" }}>
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
            <div className="svc-desk-arrows" style={{ display: "flex", gap: "10px" }}
              onMouseEnter={() => setServicesAutoPaused(true)} onMouseLeave={() => setServicesAutoPaused(false)}>
              <button className="arrow-cta-btn" onClick={() => pickService((prev) => Math.max(0, prev - 1))}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="arrow-cta-btn" onClick={() => pickService((prev) => Math.min(OUR_SERVICES.length - 1, prev + 1))}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Single scrollable row — click any card to expand it (image + description),
              all other cards collapse to just image + title */}
          {/* Phones: swipeable carousel — every card shows image, title and description */}
          <div className="svc-mobile">
            <div ref={svcTrackRef} onScroll={onSvcScroll} className="svc-track">
              {OUR_SERVICES.map((item) => (
                <div key={item.title} className="svc-card">
                  <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                    <Image src={item.img} alt={item.title} fill sizes="85vw"
                      style={{ objectFit: "cover", objectPosition: item.objectPosition || "center" }} />
                  </div>
                  <div style={{ padding: "18px 18px 22px" }}>
                    <h3 style={{ ...KT, fontSize: "19px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#111827", margin: 0 }}>
                      {lang === "th" ? item.desc : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="svc-nav">
              <button type="button" className="arrow-cta-btn" aria-label="Previous" onClick={() => svcGoTo(svcSlide - 1)} disabled={svcSlide === 0}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="svc-progress"><span style={{ width: `${((svcSlide + 1) / OUR_SERVICES.length) * 100}%` }} /></div>
              <span className="svc-count" style={KT}>{String(svcSlide + 1).padStart(2, "0")} / {OUR_SERVICES.length}</span>
              <button type="button" className="arrow-cta-btn" aria-label="Next" onClick={() => svcGoTo(svcSlide + 1)} disabled={svcSlide === OUR_SERVICES.length - 1}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <style>{`
            .svc-mobile{ display: none; }
            @media (max-width: 767px){
              .svc-desk-arrows, .svc-desk-row{ display: none !important; }
              .svc-mobile{ display: block; margin: 0 -24px; }
              .svc-track{ display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 20px; padding: 4px 20px 20px; scrollbar-width: none; align-items: stretch; }
              .svc-track::-webkit-scrollbar{ display: none; }
              .svc-card{ flex: 0 0 84%; scroll-snap-align: start; border-radius: 20px; overflow: hidden;
                background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 8px 24px rgba(95,38,229,0.10); }
              .svc-nav{ display: flex; align-items: center; gap: 12px; padding: 0 20px; }
              .svc-nav button{ width: 40px; height: 40px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; flex-shrink: 0; touch-action: manipulation; }
              .svc-nav button:disabled{ opacity: 0.35; }
              .svc-progress{ flex: 1; height: 4px; border-radius: 99px; background: rgba(95,38,229,0.15); overflow: hidden; }
              .svc-progress span{ display: block; height: 100%; border-radius: 99px; background: linear-gradient(45deg,#5f25e5 0%,#ff0089 100%); transition: width .3s ease; }
              .svc-count{ font-size: 14px; font-weight: 600; color: #5f26e5; min-width: 52px; text-align: right; }
            }
          `}</style>

          <div ref={servicesScrollRef} className="svc-desk-row"
            onMouseEnter={() => setServicesAutoPaused(true)}
            onMouseLeave={() => setServicesAutoPaused(false)}
            style={{
              // Fixed row height = the tallest expanded card (cards are a fixed 380px wide, so
              // this is stable per language). Without it the row grew/shrank by up to ~30px
              // each time the 5s auto-advance expanded a card with a longer description,
              // shoving every section below it up and down — the "page jumps by itself".
              minHeight: lang === "th" ? "555px" : "582px",
              display: "flex", gap: `${SERVICE_CARD_GAP}px`, overflowX: "auto", scrollSnapType: "x mandatory",
              scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
              alignItems: "center", paddingBottom: "8px",
            }}>
            {OUR_SERVICES.map((item, i) => {
              const isActive = activeService === i;
              return (
                <div key={item.title} onClick={() => pickService(i)}
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
                    {/* imgTall: optional portrait artwork made for the narrow collapsed card */}
                    <Image src={!isActive && item.imgTall ? item.imgTall : item.img} alt={item.title} fill sizes={isActive ? "380px" : "220px"}
                      style={{ objectFit: "cover", objectPosition: !isActive && item.imgTall ? "center" : item.objectPosition || "center" }} />
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

      {/* ── Meet Our Creators ── */}
      <section style={{ overflow: "hidden", background: "transparent" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center"
            style={{ ...PIERSON, fontWeight: 700, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2, margin: "0 0 48px" }}>
            Meet Our{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Creators</span>
          </h2>
        </div>

        <CategoriesMarquee />
      </section>

      {/* ── What We Offer ── */}
      <section style={{ background: "transparent" }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", marginBottom: "56px" }}>
            <Badge variant="outline">Why Buddy Review</Badge>
            <h2 className="font-bold section-h2-fixed" style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: 1.2,
              fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: 0 }}>
              Think Smarter,{" "}
              <span className="tse-line2" style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Execute Better
              </span>
              {/* phones: "Execute Better" always on its own second line */}
              <style>{`@media (max-width: 640px){ .tse-line2{ display: block; } }`}</style>
            </h2>
            <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0, maxWidth: "640px" }}>
              {lang === "th"
                ? "เราใช้ Strategy, Creator Intelligence และ Campaign Data เชื่อมทุกขั้นตอนเข้าด้วยกัน ตั้งแต่การเลือก Creator ไปจนถึงการวัดผล เพื่อให้ทุกการตัดสินใจมีเหตุผล และทุกแคมเปญนำไปต่อยอดได้"
                : "We connect Strategy, Creator Intelligence, and Campaign Data across every step — from Creator selection to measurement — so every decision is backed by reason, and every campaign can be built on."}
            </p>
          </div>

          {/* phones: icon sits in the top-right corner, text keeps clear of it */}
          <style>{`
            @media (max-width: 767px){
              .wwo-card{ padding: 22px 20px 24px !important; min-height: 0 !important; }
              .wwo-card > img{ width: 150px !important; right: -6px !important; top: -4px !important; bottom: auto !important; }
              .wwo-card h3{ font-size: 20px !important; padding-right: 96px; }
              .wwo-card p{ font-size: 14.5px !important; }
            }
          `}</style>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {WHAT_WE_OFFER.map((item, i) => {
              // an odd card out is centred on its own row
              const isLast = i === WHAT_WE_OFFER.length - 1 && WHAT_WE_OFFER.length % 2 === 1;
              const card = (
                <GradientCard
                  key={i}
                  gradient={item.gradient}
                  badgeText={item.badgeText}
                  badgeColor={item.badgeColor}
                  title={lang === "th" ? item.title : item.titleEn}
                  description={lang === "th" ? item.desc : item.descEn}
                  imageUrl={item.icon}
                  className="wwo-card"
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
            <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0, textWrap: "balance" }}>
              {lang === "th"
                ? <>ตั้งแต่เริ่มวางแผนจนถึงสรุปผล ทุกขั้นตอนมีทีมงานดูแล<span style={{ whiteSpace: "nowrap" }}>อย่างเป็นระบบ</span> เพื่อให้แคมเปญดำเนินไปตามแผนและเป้าหมายที่วางไว้</>
                : "From planning through to the final report, our team manages every step systematically, so your campaign stays on plan and on target."}
            </p>
          </div>

          <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            {/* Left: image, crossfades to match the hovered step (hidden on phones — shown inline under the active step instead) */}
            <div className="kes-side-img" style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3 / 2" }}>
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
              <div className="kes-track" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", borderRadius: "2px", background: "rgba(95,38,229,0.12)" }} />
              {/* sliding highlight */}
              <motion.div className="kes-track"
                animate={{ top: activeCampaignStep * (CAMPAIGN_ROW_HEIGHT + CAMPAIGN_ROW_GAP) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ position: "absolute", left: 0, width: "4px", height: `${CAMPAIGN_ROW_HEIGHT}px`, borderRadius: "2px",
                  background: "linear-gradient(180deg, #5f25e5 0%, #ff0089 100%)" }} />

              {CAMPAIGN_STEPS.map((step, i) => (
                <div key={step.title}
                  className={`kes-step${i === activeCampaignStep ? " is-active" : ""}`}
                  onMouseEnter={() => setActiveCampaignStep(i)}
                  onClick={() => { setActiveCampaignStep(i); setCampaignAutoPaused(true); }}
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
                      {/* phones: the active step's image appears right under its description */}
                      {i === activeCampaignStep && (
                        <motion.div className="kes-inline-img" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                          style={{ position: "relative", borderRadius: "18px", overflow: "hidden", aspectRatio: "3 / 2", marginTop: "10px" }}>
                          <Image src={step.img} alt={lang === "th" ? step.title : step.titleEn} fill sizes="100vw" style={{ objectFit: "cover" }} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* forced 2-line breaks only where the column is wide enough; narrow screens wrap naturally */}
              <style>{`
                @media (max-width: 1100px){ .kesm-br{ display: none; } }
                .kes-inline-img{ display: none !important; }
                @media (max-width: 767px){
                  .kes-side-img, .kes-track{ display: none !important; }
                  .kes-inline-img{ display: block !important; }
                  .kes-step{ min-height: 0 !important; padding: 14px 0 14px 16px; border-left: 3px solid rgba(95,38,229,0.12); margin-left: -32px; }
                  .kes-step.is-active{ border-left-color: #c026d3; border-image: linear-gradient(180deg, #5f25e5, #ff0089) 1; }
                }
              `}</style>
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

      {/* ── KOL Campaign Packages through Contact — one continuous, soft gradient.
          Starts right where "Keep Every Step Moving" (the last section before the
          Measure/Learn/Improve divider) left off, so the two feel like one gradient
          even though the dark Campaign Learning section sits between them, then settles
          into a light, flat purple tone from KOL Campaign Packages onward instead of
          fading all the way to white. */}
      <div style={{
        background: "linear-gradient(180deg, #dccbee 0%, #ecdef7 20%, #f2e4f9 32%, #e6d2f2 100%)",
      }}>
      {/* ── KOL Campaign Packages ── */}
      <KolPackagesSection lang={lang} />

      {/* ── Industry Insights ── */}
      <NewsroomSection lang={lang} dict={dict} variant="brand" />

      {/* ── FAQs ── */}
      <FAQAccordion faqs={dict?.brandFaqs || dict?.homeFaqs} lang={lang} variant="brand" dict={dict} />

      <div id="contact" className="contact-bg" style={{ padding: "80px 0" }}>
        <Suspense fallback={null}>
          <ContactFormSection lang={lang} dict={dict?.contactForm}
            headingFontFamily={lang === "th" ? undefined : PIERSON.fontFamily}
            headingOverride={lang === "th" ? "มี Brief แล้ว หรือยังไม่แน่ใจว่าควรเริ่มจากอะไร?" : "Have a Brief?|Not Sure Where to Start?"}
            subheadingOverride={lang === "th"
              ? "เล่าเป้าหมายของคุณให้เราฟัง ทีม Buddy Review จะช่วยมองโจทย์ วางแนวทาง และแนะนำ campaign approach ที่เหมาะกับแบรนด์"
              : "Tell us what you want to achieve. Our team will help you explore the possibilities, shape your strategy, and find the right campaign approach for your brand."}
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
