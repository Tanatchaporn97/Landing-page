"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const CATS = ["ทั้งหมด", "Food & Beverage", "Beauty", "Healthcare", "Entertainment & Streaming"];

const STORIES = [
  {
    slug: "nissin",
    brand: "Nissin",
    image: "/success-nissin.webp",
    tagline: `จากสายกินถึงสายเกม Buddy Review ปั้นต้มยำกุ้งซีสให้ Nissin ติดใจทุกเจน`,
    desc: `Nissin ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ "ต้มยำกุ้งแซ่บซีส"`,
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
    image: "/success-watsons.webp",
    tagline: `ปั้นคอนเทนต์ 'งบ 500 ช้อปสินค้าวัตสัน' สร้างกระแสคอนเทนต์ความคุ้มค่าโซเชียล`,
    desc: `House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8`,
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
    image: "/success-ldc.webp",
    tagline: `โปรโมทบริการจัดฟันใส LDC จนกระแสแรง พร้อมกิจกรรมลุ้นบินอังกฤษ`,
    desc: `รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental`,
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
    image: "/success-viu.webp",
    tagline: `ผสานอินฟลูเอนเซอร์และคอนเทนต์ท้องถิ่น ยกระดับ Viu ในใจชาวอีสาน`,
    desc: `อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันให้แคมเปญ "อีสานชมวิว"`,
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
    image: "/success-stories/Success stories-03.webp",
    tagline: `ENO และ Guss Damn Good ร่วมกันสร้างสรรค์ไอศกรีมรสชาติใหม่ชื่อ "After Meal"`,
    desc: `รสชาติที่มีเรื่องเล่า! เมื่อไอศครีมเจอกับผงฟู้คลาย กรดลดแน่นเฟ้อ`,
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
    image: "/success-stories/Success stories-01.webp",
    tagline: `ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล`,
    desc: `AHC จัดอีเวนต์ 'AHC Skin Game THE T-SHOT' แรงบันดาลใจจาก 'Squid Game' สร้างกระแสไวรัลในกลุ่มคนรุ่นใหม่`,
    industry: `Beauty`,
    stats: [
      { val: "14M", label: "Views" },
      { val: "9.2M", label: "Reach" },
      { val: "190K", label: "Engagement" },
    ],
  },
];

import { type Locale } from "../../../i18n-config";

function SuccessPageContent({ lang }: { lang: Locale }) {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState(() => {
    const cat = searchParams.get("cat");
    return cat && CATS.includes(cat) ? cat : "ทั้งหมด";
  });

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATS.includes(cat)) setActiveCat(cat);
  }, [searchParams]);

  const filtered = activeCat === "ทั้งหมด" ? STORIES : STORIES.filter((s) => s.industry === activeCat);

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/landing-bg6.jpg')", backgroundSize: "100% 100%", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}>

      {/* Back button */}
      <div className="success-back-row" style={{ padding: "130px 48px 28px" }}>
        <Link href={`/${lang}/influencer`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50px", padding: "10px 22px", color: "#5f26e5", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>

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

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {filtered.map((story) => (
            <Link key={story.slug} href={`/${lang}/success/${story.slug}`} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "24px", textDecoration: "none", cursor: "pointer" }}>

              <div style={{ position: "relative", padding: "20px 20px 0", flexShrink: 0 }}>
                <Image src={story.image} alt={story.brand} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
              </div>

              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>

                <span style={{ ...KT, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px", fontSize: "13px", fontWeight: 600, padding: "4px 14px", display: "inline-block", width: "fit-content", color: "#111827" }}>
                  {story.industry}
                </span>

                <h2 style={{ ...KT, color: "#5f26e5", fontSize: "19px", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                  {story.brand}
                </h2>

                <p style={{ ...KT, color: "#111827", fontSize: "14px", lineHeight: 1.7, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {story.desc}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ ...KT, background: "#5f26e5", color: "#ffffff", borderRadius: "50px", fontSize: "14px", fontWeight: 600, padding: "8px 24px", display: "inline-block" }}>
                    อ่านเพิ่มเติม
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <SuccessPageContent lang={lang as Locale} />
    </Suspense>
  );
}
