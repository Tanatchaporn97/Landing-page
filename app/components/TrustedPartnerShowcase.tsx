"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

// The five principles, each with a 3D icon for its idea (public/how-we-work/icon-*.webp,
// cropped from the brand page's What We Offer set): system dashboard, people/insight,
// analytics, growth, target.
const ITEMS = [
  { title: "Built on Clarity",         desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                 descEn: "Clear, systematic work held to a consistent standard.",              src: "/how-we-work/icon-clarity.webp" },
  { title: "Unified by Insight",       desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",          descEn: "Shared goals, sharpened by insight.",                                src: "/how-we-work/icon-insight.webp" },
  { title: "Data-Driven Decisions",    desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",   descEn: "Data guides every call — from choosing creators to measuring results.", src: "/how-we-work/icon-data.webp" },
  { title: "Delivery with Discipline", desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",         descEn: "Systematic management and delivery, from start to finish.",           src: "/how-we-work/icon-delivery.webp" },
  { title: "Your Goals Drive Results", desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",            descEn: "Results tied to your brand's real goals.",                            src: "/how-we-work/icon-goals.webp" },
];


export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  const header = (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <Badge variant="outline">How We Work</Badge>
        </div>
        <h3 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15, color: "#111827" }}>
          What Goes Into Every{" "}
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Campaign</span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {lang === "th"
            ? "วิธีทำงานที่ช่วยให้ทุกแคมเปญชัดเจน เป็นระบบ และเดินไปสู่เป้าหมายเดียวกัน"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>
      <Link href={`/${lang}/brand`}
        className="btn-glass-purple rounded-full whitespace-nowrap"
        style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 12px 12px 24px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
        {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
        <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(95,38,229,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </Link>
    </div>
  );

  // Section wrapper already provides the page gutter, so no extra padding here.
  return (
    <div className="py-5 sm:py-10">
      <div className="mb-8 sm:mb-12">{header}</div>

      {/* B · U · D · D · Y — each principle's first letter spells BUDDY, set as a big drop cap
          leading straight into the rest of its title. */}
      <div className="hww-row">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="hww-card" style={{ ...KT, animationDelay: `${i * 0.08}s` }}>
            {/* drop-cap title: the oversized first letter (B·U·D·D·Y) runs straight into the rest of the title */}
            <h3 className="hww-title">
              <span className="hww-first">{item.title[0]}</span><span className="hww-rest">{item.title.slice(1)}</span>
            </h3>
            <p className="hww-desc">{lang === "th" ? item.desc : item.descEn}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" className="hww-icon" />
          </div>
        ))}
      </div>

      <style>{`
        .hww-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        /* light dashboard-tile style (like the KOL Discovery panel): near-white card, brand purple
           heading, dark copy, pink→purple initial */
        .hww-card{ position: relative; overflow: hidden; min-height: 340px; padding: 26px 24px 24px; border-radius: 28px; color: #2a2346;
          background: rgba(244,241,252,0.94); border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 18px 40px -22px rgba(20,6,80,0.55);
          transition: transform .35s ease, box-shadow .35s ease; }
        .hww-card:hover{ transform: translateY(-6px); box-shadow: 0 26px 50px -22px rgba(20,6,80,0.65); }
        .hww-title{ margin: 0 0 14px; font-weight: 700; line-height: 1.15; color: #5f26e5; }
        .hww-first{ display: inline-block; font-size: 84px; font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; margin-right: 2px;
          background: linear-gradient(180deg, #ec3a8c 0%, #5f26e5 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          transition: transform .45s cubic-bezier(.22,1,.36,1); transform-origin: left bottom; }
        .hww-card:hover .hww-first{ transform: scale(1.06) rotate(-3deg); }
        .hww-rest{ font-size: clamp(18px,1.4vw,21px); }
        .hww-desc{ margin: 0; font-size: 16px; line-height: 1.7; color: #111827; max-width: 92%; }
        .hww-icon{ position: absolute; right: -14px; bottom: -14px; width: 120px; height: 120px; object-fit: contain; pointer-events: none;
          transition: transform .45s ease; }
        .hww-card:hover .hww-icon{ transform: translate(-4px,-4px) scale(1.06); }
        @media (max-width: 1279px){
          .hww-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 6px 24px 16px; scroll-padding-inline: 24px; }
          .hww-row::-webkit-scrollbar{ display: none; }
          .hww-card{ flex: 0 0 260px; scroll-snap-align: start; }
        }
        /* phones: stacked list — big letter on the left, copy beside it, icon tucked bottom-right */
        @media (max-width: 640px){
          .hww-row{ display: grid !important; grid-template-columns: 1fr; gap: 12px; overflow: visible; margin: 0; padding: 0; }
          .hww-card{ flex: none; min-height: 0; padding: 18px 88px 18px 18px; border-radius: 20px; }
          .hww-first{ font-size: 56px; }
          .hww-title{ margin: 0 0 6px; }
          .hww-rest{ font-size: 17px; }
          .hww-desc{ font-size: 15px; max-width: none; }
          .hww-icon{ width: 72px; height: 72px; right: 6px; bottom: 6px; }
        }
        @media (prefers-reduced-motion: reduce){ .hww-card, .hww-first, .hww-icon{ transition: none; } }
      `}</style>
    </div>
  );
}
