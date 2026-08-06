"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const CATS_TH = ["ทั้งหมด", "Food & Beverage", "Beauty", "Healthcare", "Entertainment & Streaming"];
const CATS_EN = ["All", "Food & Beverage", "Beauty", "Healthcare", "Entertainment & Streaming"];

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
    brand: "Watsons",
    photo: "/success-stories-2/Success stories-10.jpg",
    tagline: `House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8`,
    industry: `Beauty`,
    stats: [
      { val: "220", label: "Posts" },
      { val: "1.2M", label: "Reach" },
      { val: "12K", label: "Engagement" },
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
    brand: "Watsons",
    photo: "/success-stories-2/Success stories-10.jpg",
    tagline: `House brand goes viral with influencer power on TikTok & Lemon8`,
    industry: `Beauty`,
    stats: [
      { val: "220", label: "Posts" },
      { val: "1.2M", label: "Reach" },
      { val: "12K", label: "Engagement" },
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
];

import { type Locale } from "../../../i18n-config";

export default function SuccessClient({ lang }: { lang: Locale }) {
  const searchParams = useSearchParams();
  const CATS = lang === "th" ? CATS_TH : CATS_EN;
  const STORIES = lang === "th" ? STORIES_TH : STORIES_EN;
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
      <div className="success-back-row" style={{ padding: "130px 48px 28px" }}>
        <Link href={`/${lang}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50px", padding: "10px 22px", color: "#5f26e5", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>
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
            <button key={cat} onClick={() => setActiveCat(cat)} style={{ ...KT,
              background: activeCat === cat ? "#5f26e5" : "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              color: activeCat === cat ? "#ffffff" : "#5f26e5",
              border: activeCat === cat ? "1px solid #5f26e5" : "1px solid rgba(255,255,255,0.35)",
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
                  <div className="cs-card" style={{ borderRadius: "28px", background: "#ffffff", height: "520px" }}>
                    <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image src={story.photo} alt={story.brand} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
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
                      <span className="cs-cat-btn" style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", display: "inline-block" }}>
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
