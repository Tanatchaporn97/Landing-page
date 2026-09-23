"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const CATS_TH = ["ทั้งหมด", "Food & Beverage", "Beauty", "Healthcare", "Entertainment & Streaming", "Pet Care", "เครื่องใช้ไฟฟ้า", "อีเวนต์และไลฟ์สไตล์", "ของใช้ในบ้าน"];
const CATS_EN = ["All", "Food & Beverage", "Beauty", "Healthcare", "Entertainment & Streaming", "Pet Care", "Home Appliances", "Events & Lifestyle", "Household"];

const STORIES_TH = [
  {
    slug: "nissin",
    brand: "Nissin",
    photo: "/success-stories-2/Success stories-08.jpg",
    tagline: `ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส`,
    industry: `Food & Beverage`,
    stats: [
      { val: "13", label: "Posts" },
      { val: "1.86M", label: "Reach" },
      { val: "45K", label: "Engagement" },
    ],
  },
  {
    slug: "watsons",
    brand: "Watsons — DAP Double Booster",
    photo: "/success-stories-2/Success stories-10.jpg",
    tagline: `ทำงานเร็ว ทันแคมเปญ ด้วย KOL และ KOC`,
    industry: `Beauty`,
    stats: [
      { val: "141,200", label: "Reach (Main KOL Content)" },
      { val: "8.5K", label: "Engagement (Main KOL Content)" },
      { val: "6.03%", label: "Engagement Rate (Main KOL Content)" },
    ],
  },
  {
    slug: "ldc-dental",
    brand: "LDC Dental",
    photo: "/success-stories-2/Success stories-09.jpg",
    tagline: `รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental`,
    industry: `Healthcare`,
    stats: [
      { val: "43K", label: "Reach" },
      { val: "4.2K", label: "Engagement" },
      { val: "9.8%", label: "Engagement Rate" },
    ],
  },
  {
    slug: "viu",
    brand: "Viu",
    photo: "/success-stories-2/Success stories-11.jpg",
    tagline: `อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว`,
    industry: `Entertainment & Streaming`,
    stats: [
      { val: "239K", label: "Reach" },
      { val: "4.3K", label: "Engagement" },
      { val: "956K", label: "Combined Followers" },
    ],
  },
  {
    slug: "guss-damn-good",
    brand: "Guss Damn Good x ENO",
    photo: "/success-stories-2/Success stories-13.jpg",
    tagline: `รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ`,
    industry: `Food & Beverage`,
    stats: [
      { val: "5.9M", label: "Views" },
      { val: "4.4M", label: "Reach" },
      { val: "120K", label: "Engagement" },
    ],
  },
  {
    slug: "ahc",
    brand: "AHC 'The Skin Game'",
    photo: "/success-stories-2/Success stories-12.jpg",
    tagline: `ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'`,
    industry: `Beauty`,
    stats: [
      { val: "14M", label: "Views" },
      { val: "9.2M", label: "Reach" },
      { val: "190K", label: "Engagement" },
    ],
  },
  {
    slug: "optimum-hi-pro",
    brand: "Optimum Hi Pro",
    photo: "/success-stories-2/optimum-hi-pro-logo.jpg", imgFit: "contain" as const, imgBg: "#05176e", hoverTint: "#05176e",
    tagline: `เข้าถึงคนเลี้ยงปลาคาร์พอย่างตรงกลุ่ม พร้อมขยายการรับรู้ในวงกว้าง`,
    industry: `Pet Care`,
    stats: [
      { val: "5.78M", label: "Reach" },
      { val: "10.9K", label: "Engagement" },
      { val: "37", label: "Contents" },
    ],
  },
  {
    slug: "auntie-annes",
    brand: "Auntie Anne's",
    photo: "/success-stories-2/auntie-annes-logo.jpg", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `สร้าง Always-on TikTok Content Engine ที่ผลิตต่อเนื่องกว่า 15 เดือน`,
    industry: `Food & Beverage`,
    stats: [
      { val: "225+", label: "Contents" },
      { val: "15", label: "Contents/Month" },
      { val: "760K", label: "Top Content Views" },
    ],
  },
  {
    slug: "siangpure",
    brand: "Siangpure",
    photo: "/success-stories-2/siangpure-logo.jpg", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `เข้าถึงผู้บริโภคชาวอินเดียผ่าน Indian Influencers บน Instagram`,
    industry: `Healthcare`,
    stats: [
      { val: "3", label: "Influencers" },
      { val: "333,535", label: "Reach" },
      { val: "5.8%", label: "Engagement Rate" },
    ],
  },
  {
    slug: "bobbi-dog",
    brand: "Bobbi Dog",
    photo: "/success-stories-2/bobbi-dog-logo.png", imgFit: "contain" as const, imgBg: "#452b1c", hoverTint: "#452b1c",
    tagline: `วางแผน KOL และ Friend of Brand ต่อเนื่องตลอดปี`,
    industry: `Pet Care`,
    stats: [
      { val: "81", label: "Dog-focused KOLs" },
      { val: "1", label: "Friend of Brand" },
      { val: "1", label: "Event Activation" },
    ],
  },
  {
    slug: "boots",
    brand: "Boots — S&G Let’s Get Tropical",
    photo: "/success-stories-2/boots-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `สร้างกระแสให้กลิ่นใหม่ ผ่าน KOL ที่ใช่`,
    industry: `Beauty`,
    stats: [
      { val: "2,109,846", label: "Reach" },
      { val: "10.7K", label: "Engagement" },
    ],
  },
  {
    slug: "cp-all",
    brand: "CP ALL Education Forum 2026",
    photo: "/success-stories-2/cp-all-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `วางบทบาท KOL ให้เชื่อมกับทุกช่วงของ Event`,
    industry: `อีเวนต์และไลฟ์สไตล์`,
    stats: [],
  },
  {
    slug: "d-nee",
    brand: "D-nee Mild & Care 2026",
    photo: "/success-stories-2/d-nee-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `เข้าถึงกลุ่มแม่และครอบครัวผ่าน Macro–Celebrity Creator`,
    industry: `Household`,
    stats: [
      { val: "18", label: "Influencers" },
      { val: "10.4M+", label: "Total Followers" },
      { val: "3.81M+", label: "Reach" },
      { val: "35.9K", label: "Engagements" },
    ],
  },
  {
    slug: "daikin",
    brand: "Daikin",
    photo: "/success-stories-2/daikin-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `ทำให้คอนเทนต์เรื่องแอร์เข้าใจง่ายและใกล้ตัวคนดูมากขึ้น`,
    industry: `เครื่องใช้ไฟฟ้า`,
    stats: [
      { val: "8,438,762", label: "Reach" },
      { val: "275.1K", label: "Engagement" },
      { val: "26", label: "Contents" },
    ],
  },
  {
    slug: "fineline",
    brand: "Fineline Mild & Care",
    photo: "/success-stories-2/fineline-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `เปลี่ยนคุณสมบัติสินค้าให้เป็นเรื่องราวของความใส่ใจ`,
    industry: `ของใช้ในบ้าน`,
    stats: [
      { val: "7,118,563", label: "Reach" },
      { val: "120.6K", label: "Engagement" },
      { val: "14", label: "Contents" },
    ],
  },
  {
    slug: "mega-bangna",
    brand: "Mega Halloween 2025",
    photo: "/success-stories-2/mega-bangna-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `ปั้นกระแสจากทีเซอร์ สู่การพูดถึงบนโซเชียล`,
    industry: `อีเวนต์และไลฟ์สไตล์`,
    stats: [
      { val: "2.8M", label: "Reach (KOL Campaign)" },
      { val: "0.1", label: "CPR" },
    ],
  },
  {
    slug: "mom-choice",
    brand: "Mom Choice",
    photo: "/success-stories-2/mom-choice-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `วางแผน Creator ต่อเนื่องตลอดปีในหลาย Platform`,
    industry: `Pet Care`,
    stats: [
      { val: "169", label: "Creators" },
    ],
  },
  {
    slug: "scotch",
    brand: "SCOTCH Bird’s Nest Mask",
    photo: "/success-stories-2/scotch-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `เปลี่ยนแบรนด์ที่คุ้นเคย ให้เป็นเรื่องราวความงามใหม่`,
    industry: `Beauty`,
    stats: [
      { val: "6,380,184", label: "Reported Reach (2 Campaign Waves)" },
      { val: "18.6K", label: "Engagement" },
      { val: "11", label: "Contents" },
    ],
  },
  {
    slug: "smart-heart",
    brand: "SmartHeart x PROXIE",
    photo: "/success-stories-2/smart-heart-logo.png", imgFit: "contain" as const, imgBg: "#0d3a7e", hoverTint: "#0d3a7e",
    tagline: `พลังแฟนด้อม สู่การรับรู้ของแคมเปญ`,
    industry: `Pet Care`,
    stats: [
      { val: "408,163", label: "Reach" },
      { val: "1.3K", label: "Engagement" },
      { val: "3", label: "Contents" },
    ],
  },
  {
    slug: "teepol",
    brand: "Teepol x My Material World",
    photo: "/success-stories-2/teepol-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `หนึ่ง KOL หลายจุดแข็งในแต่ละ Platform`,
    industry: `ของใช้ในบ้าน`,
    stats: [
      { val: "47,449", label: "Reach" },
      { val: "3", label: "Contents" },
      { val: "806K", label: "Followers" },
      { val: "1.6K", label: "Engagements" },
    ],
  },
  {
    slug: "truemoney",
    brand: "TrueMoney",
    photo: "/success-stories-2/truemoney-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `เลือก Creator ให้ใช่ เพื่อเรื่องสุขภาพที่เข้าถึงคนดู`,
    industry: `Healthcare`,
    stats: [
      { val: "315,768", label: "Reach" },
      { val: "6", label: "Contents" },
      { val: "370.2K", label: "Followers" },
      { val: "3K", label: "Engagements" },
    ],
  },
];

const STORIES_EN = [
  {
    slug: "nissin",
    brand: "Nissin",
    photo: "/success-stories-2/Success stories-08.jpg",
    tagline: `Sparking social media buzz with a bold new flavor — spicy Tom Yum Goong cheese`,
    industry: `Food & Beverage`,
    stats: [
      { val: "13", label: "Posts" },
      { val: "1.86M", label: "Reach" },
      { val: "45K", label: "Engagement" },
    ],
  },
  {
    slug: "watsons",
    brand: "Watsons — DAP Double Booster",
    photo: "/success-stories-2/Success stories-10.jpg",
    tagline: `Fast-turnaround KOL & KOC Campaign`,
    industry: `Beauty`,
    stats: [
      { val: "141,200", label: "Reach (Main KOL Content)" },
      { val: "8.5K", label: "Engagement (Main KOL Content)" },
      { val: "6.03%", label: "Engagement Rate (Main KOL Content)" },
    ],
  },
  {
    slug: "ldc-dental",
    brand: "LDC Dental",
    photo: "/success-stories-2/Success stories-09.jpg",
    tagline: `From influencer clear-braces reviews to an exclusive event by LDC Dental`,
    industry: `Healthcare`,
    stats: [
      { val: "43K", label: "Reach" },
      { val: "4.2K", label: "Engagement" },
      { val: "9.8%", label: "Engagement Rate" },
    ],
  },
  {
    slug: "viu",
    brand: "Viu",
    photo: "/success-stories-2/Success stories-11.jpg",
    tagline: `Local influencer power brings the "Isan Charm View" campaign to life`,
    industry: `Entertainment & Streaming`,
    stats: [
      { val: "239K", label: "Reach" },
      { val: "4.3K", label: "Engagement" },
      { val: "956K", label: "Combined Followers" },
    ],
  },
  {
    slug: "guss-damn-good",
    brand: "Guss Damn Good x ENO",
    photo: "/success-stories-2/Success stories-13.jpg",
    tagline: `A flavor with a story — when ice cream meets antacid powder`,
    industry: `Food & Beverage`,
    stats: [
      { val: "5.9M", label: "Views" },
      { val: "4.4M", label: "Reach" },
      { val: "120K", label: "Engagement" },
    ],
  },
  {
    slug: "ahc",
    brand: "AHC 'The Skin Game'",
    photo: "/success-stories-2/Success stories-12.jpg",
    tagline: `Sparking brand buzz with an event inspired by the viral series "AHC Skin Game"`,
    industry: `Beauty`,
    stats: [
      { val: "14M", label: "Views" },
      { val: "9.2M", label: "Reach" },
      { val: "190K", label: "Engagement" },
    ],
  },
  {
    slug: "optimum-hi-pro",
    brand: "Optimum Hi Pro",
    photo: "/success-stories-2/optimum-hi-pro-logo.jpg", imgFit: "contain" as const, imgBg: "#05176e", hoverTint: "#05176e",
    tagline: `Reaching koi keepers with precision, while expanding awareness at scale.`,
    industry: `Pet Care`,
    stats: [
      { val: "5.78M", label: "Reach" },
      { val: "10.9K", label: "Engagement" },
      { val: "37", label: "Contents" },
    ],
  },
  {
    slug: "auntie-annes",
    brand: "Auntie Anne's",
    photo: "/success-stories-2/auntie-annes-logo.jpg", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Building an Always-on TikTok Content Engine`,
    industry: `Food & Beverage`,
    stats: [
      { val: "225+", label: "Contents" },
      { val: "15", label: "Contents/Month" },
      { val: "760K", label: "Top Content Views" },
    ],
  },
  {
    slug: "siangpure",
    brand: "Siangpure",
    photo: "/success-stories-2/siangpure-logo.jpg", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `India Influencer Campaign`,
    industry: `Healthcare`,
    stats: [
      { val: "3", label: "Influencers" },
      { val: "333,535", label: "Reach" },
      { val: "5.8%", label: "Engagement Rate" },
    ],
  },
  {
    slug: "bobbi-dog",
    brand: "Bobbi Dog",
    photo: "/success-stories-2/bobbi-dog-logo.png", imgFit: "contain" as const, imgBg: "#452b1c", hoverTint: "#452b1c",
    tagline: `Building a Year-round KOL & Friend of Brand Strategy`,
    industry: `Pet Care`,
    stats: [
      { val: "81", label: "Dog-focused KOLs" },
      { val: "1", label: "Friend of Brand" },
      { val: "1", label: "Event Activation" },
    ],
  },
  {
    slug: "boots",
    brand: "Boots — S&G Let’s Get Tropical",
    photo: "/success-stories-2/boots-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Creating Buzz for a New Scent Through the Right KOLs`,
    industry: `Beauty`,
    stats: [
      { val: "2,109,846", label: "Reach" },
      { val: "10.7K", label: "Engagement" },
    ],
  },
  {
    slug: "cp-all",
    brand: "CP ALL Education Forum 2026",
    photo: "/success-stories-2/cp-all-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `KOL Planning Across the Event Journey`,
    industry: `Events & Lifestyle`,
    stats: [],
  },
  {
    slug: "d-nee",
    brand: "D-nee Mild & Care 2026",
    photo: "/success-stories-2/d-nee-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Reaching Mom & Family Audiences Through Macro–Celebrity Creators`,
    industry: `Household`,
    stats: [
      { val: "18", label: "Influencers" },
      { val: "10.4M+", label: "Total Followers" },
      { val: "3.81M+", label: "Reach" },
      { val: "35.9K", label: "Engagements" },
    ],
  },
  {
    slug: "daikin",
    brand: "Daikin",
    photo: "/success-stories-2/daikin-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Making Air-con Content Easier to Relate To`,
    industry: `Home Appliances`,
    stats: [
      { val: "8,438,762", label: "Reach" },
      { val: "275.1K", label: "Engagement" },
      { val: "26", label: "Contents" },
    ],
  },
  {
    slug: "fineline",
    brand: "Fineline Mild & Care",
    photo: "/success-stories-2/fineline-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Turning Product Benefits into Stories of Care`,
    industry: `Household`,
    stats: [
      { val: "7,118,563", label: "Reach" },
      { val: "120.6K", label: "Engagement" },
      { val: "14", label: "Contents" },
    ],
  },
  {
    slug: "mega-bangna",
    brand: "Mega Halloween 2025",
    photo: "/success-stories-2/mega-bangna-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Turning a Teaser into Social Buzz`,
    industry: `Events & Lifestyle`,
    stats: [
      { val: "2.8M", label: "Reach (KOL Campaign)" },
      { val: "0.1", label: "CPR" },
    ],
  },
  {
    slug: "mom-choice",
    brand: "Mom Choice",
    photo: "/success-stories-2/mom-choice-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Building a Year-round Creator Strategy Across Platforms`,
    industry: `Pet Care`,
    stats: [
      { val: "169", label: "Creators" },
    ],
  },
  {
    slug: "scotch",
    brand: "SCOTCH Bird’s Nest Mask",
    photo: "/success-stories-2/scotch-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Turning a Familiar Brand into a New Beauty Story`,
    industry: `Beauty`,
    stats: [
      { val: "6,380,184", label: "Reported Reach (2 Campaign Waves)" },
      { val: "18.6K", label: "Engagement" },
      { val: "11", label: "Contents" },
    ],
  },
  {
    slug: "smart-heart",
    brand: "SmartHeart x PROXIE",
    photo: "/success-stories-2/smart-heart-logo.png", imgFit: "contain" as const, imgBg: "#0d3a7e", hoverTint: "#0d3a7e",
    tagline: `Turning Fandom into Campaign Awareness`,
    industry: `Pet Care`,
    stats: [
      { val: "408,163", label: "Reach" },
      { val: "1.3K", label: "Engagement" },
      { val: "3", label: "Contents" },
    ],
  },
  {
    slug: "teepol",
    brand: "Teepol x My Material World",
    photo: "/success-stories-2/teepol-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `One KOL, Different Platform Strengths`,
    industry: `Household`,
    stats: [
      { val: "47,449", label: "Reach" },
      { val: "3", label: "Contents" },
      { val: "806K", label: "Followers" },
      { val: "1.6K", label: "Engagements" },
    ],
  },
  {
    slug: "truemoney",
    brand: "TrueMoney",
    photo: "/success-stories-2/truemoney-logo.png", imgFit: "contain" as const, imgBg: "#ffffff",
    tagline: `Making Health Conversations More Relevant Through the Right Creators`,
    industry: `Healthcare`,
    stats: [
      { val: "315,768", label: "Reach" },
      { val: "6", label: "Contents" },
      { val: "370.2K", label: "Followers" },
      { val: "3K", label: "Engagements" },
    ],
  },
];

import { type Locale } from "../../../i18n-config";

export default function SuccessClient({ lang }: { lang: Locale }) {
  const searchParams = useSearchParams();
  const CATS = lang === "th" ? CATS_TH : CATS_EN;
  // Newest-added entries are appended to the end of STORIES_TH/EN, so reverse
  // here to always show the most recently uploaded story first.
  const STORIES = [...(lang === "th" ? STORIES_TH : STORIES_EN)].reverse();
  const allLabel = CATS[0];
  const backLabel = lang === "th" ? "กลับหน้าหลัก" : "Back to Home";

  const [activeCat, setActiveCat] = useState(() => {
    const cat = searchParams.get("cat");
    return cat && CATS.includes(cat) ? cat : allLabel;
  });

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATS.includes(cat)) setActiveCat(cat);
  }, [searchParams]);

  const filtered = activeCat === allLabel ? STORIES : STORIES.filter((s) => s.industry === activeCat);

  return (
    <div className="background" style={{ ...KT }}>

      {/* Back button */}
      <div className="success-back-row" style={{ padding: "140px 48px 28px" }}>
        <Link href={`/${lang}`} className="btn-glass-purple" style={{ borderRadius: "50px", padding: "10px 22px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {backLabel}
        </Link>
      </div>

      <div style={{ maxWidth: "1294px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Header */}
        <h1 style={{ ...KT, background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.2 }}>
          Success Stories
        </h1>

        {/* Category chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
          {CATS.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={activeCat === cat ? "" : "btn-glass-purple"}
              style={{ ...KT,
              ...(activeCat === cat ? { background: "#5f26e5", color: "#ffffff", border: "1px solid #5f26e5" } : {}),
              borderRadius: "50px", fontSize: "14px", fontWeight: 600,
              padding: "7px 20px", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid — identical card markup/styling to the landing page's Success Stories carousel */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 390px)", justifyContent: "center", gap: "28px" }}>
          <AnimatePresence>
            {filtered.map((story) => (
              <motion.div
                key={story.slug}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", visualDuration: 0.4, bounce: 0.18 }}
              >
                <Link href={`/${lang}/success/${story.slug}`} className="cs-card-link" style={{ textDecoration: "none", width: "390px" }}>
                  <div className="cs-card" style={{ borderRadius: "28px", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", height: "520px", ...(story.hoverTint ? { "--cs-hover-tint": story.hoverTint } as React.CSSProperties : {}) }}>
                    <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%", background: story.imgBg || "transparent" }}>
                      <Image src={story.photo} alt={story.brand} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px"
                        style={{ objectFit: story.imgFit || "cover", padding: story.imgFit === "contain" ? "24px" : 0 }} />
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
                      <span className="cs-cat-btn" style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "5px 12px", letterSpacing: "0.08em", display: "inline-block" }}>
                        {story.industry.toUpperCase()}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                      <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{story.brand}</h3>
                      <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.tagline}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
