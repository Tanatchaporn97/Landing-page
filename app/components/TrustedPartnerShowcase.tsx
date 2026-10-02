"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
// light gradient so the headline reads on the dark-blue section background
const GRAD = "linear-gradient(45deg, #d9ccff 0%, #ff8fd0 100%)";

// The five principles (B·U·D·D·Y) as award-style cards: title on top, a soft
// clay-3D icon (glossy purple + matte white, public/how-we-work) in the middle,
// description at the bottom over a faint white fade.
const ITEMS = [
  { title: "Built on Clarity",         desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                 descEn: "Clear, systematic work held to a consistent standard.",              src: "/how-we-work/clarity.webp" },
  { title: "Unified by Insight",       desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",          descEn: "Shared goals, sharpened by insight.",                                src: "/how-we-work/insight.webp" },
  { title: "Data-Driven Decisions",    desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",   descEn: "Data guides every call — from choosing creators to measuring results.", src: "/how-we-work/data.webp" },
  { title: "Delivery with Discipline", desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",         descEn: "Systematic management and delivery, from start to finish.",           src: "/how-we-work/delivery.webp" },
  { title: "Your Goals Drive Results", desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",            descEn: "Results tied to your brand's real goals.",                            src: "/how-we-work/goals.webp" },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  const header = (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-md">How We Work</Badge>
        </div>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15,
          background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          What Goes Into Every Campaign
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", margin: 0 }}>
          {lang === "th"
            ? "วิธีทำงานที่ช่วยให้ทุกแคมเปญชัดเจน เป็นระบบ และเดินไปสู่เป้าหมายเดียวกัน"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>
      <Link href={`/${lang}/brand`}
        className="btn-hero rounded-full whitespace-nowrap"
        style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 12px 12px 24px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
        {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
        <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </Link>
    </div>
  );

  // Section wrapper already provides the page gutter, so no extra padding here.
  return (
    <div className="py-5 sm:py-10">
      <div className="mb-8 sm:mb-12">{header}</div>

      {/* five cards in one row (≥1280px); narrower screens scroll sideways with snap */}
      <div className="hww-row">
        {ITEMS.map((item) => (
          <Link key={item.title} href={`/${lang}/brand`} className="hww-card group">
            <h4 style={{ ...KT, margin: 0, fontSize: "clamp(18px,1.5vw,21px)", fontWeight: 700, lineHeight: 1.3, color: "#ffffff", textAlign: "center", position: "relative", zIndex: 2 }}>
              {item.title}
            </h4>
            <div className="hww-art">
              <Image src={item.src} alt="" fill sizes="(max-width: 1279px) 260px, 20vw" style={{ objectFit: "contain", objectPosition: "center 70%" }} />
            </div>
            <p style={{ ...KT, margin: 0, fontSize: "14px", fontWeight: 500, lineHeight: 1.55, color: "rgba(255,255,255,0.88)", textAlign: "center", position: "relative", zIndex: 2 }}>
              {lang === "th" ? item.desc : item.descEn}
            </p>
          </Link>
        ))}
      </div>

      <style>{`
        .hww-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .hww-card{
          position: relative; overflow: hidden; isolation: isolate; text-decoration: none;
          display: flex; flex-direction: column; justify-content: space-between; gap: 12px;
          min-height: 400px; padding: 32px 22px 28px; border-radius: 28px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.28); box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
          transition: transform 0.3s ease;
        }
        /* faint white fade rising from the bottom; the icon dissolves into it */
        .hww-card::after{
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 55%; z-index: 1; pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.3) 100%);
        }
        .hww-art{ position: relative; flex: 1; min-height: 200px; margin: 0 -14px -6px; transition: transform 0.7s ease; }
        /* same hover motion as before: card grows slightly, artwork zooms */
        .hww-card:hover{ transform: scale(1.02); }
        .hww-card:hover .hww-art{ transform: scale(1.06); }
        .hww-card:focus-visible{ outline: 2px solid #ffffff; outline-offset: 3px; }
        @media (max-width: 1279px){
          .hww-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 6px 24px 16px; scroll-padding-inline: 24px; }
          .hww-row::-webkit-scrollbar{ display: none; }
          .hww-card{ flex: 0 0 260px; scroll-snap-align: start; }
        }
        @media (max-width: 560px){ .hww-card{ flex-basis: 72vw; min-height: 380px; } }
        @media (prefers-reduced-motion: reduce){ .hww-card, .hww-art{ transition: none; } }
      `}</style>
    </div>
  );
}
