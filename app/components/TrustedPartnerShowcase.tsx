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
          <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-md">How We Work</Badge>
        </div>
        <h3 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15, color: "#ffffff" }}>
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

      {/* B · U · D · D · Y — each principle's first letter spells BUDDY. The letter is the hero of
          the card; the title repeats it in gradient so the word and its meaning read together. */}
      <div className="hww-row">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="hww-card" style={{ ...KT, animationDelay: `${i * 0.08}s` }}>
            <div className="hww-top">
              <span className="hww-letter" aria-hidden="true">{item.title[0]}</span>
              <span className="hww-num" aria-hidden="true">0{i + 1}</span>
            </div>
            <h3 className="hww-title">
              <span className="hww-first">{item.title[0]}</span>{item.title.slice(1)}
            </h3>
            <p className="hww-desc">{lang === "th" ? item.desc : item.descEn}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" className="hww-icon" />
          </div>
        ))}
      </div>

      <style>{`
        .hww-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .hww-card{ position: relative; overflow: hidden; min-height: 340px; padding: 26px 24px 24px; border-radius: 26px; color: #fff;
          background: linear-gradient(160deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 100%);
          border: 1px solid rgba(255,255,255,0.32); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 18px 40px -22px rgba(10,0,60,0.6);
          transition: transform .35s ease, border-color .35s ease, background .35s ease; }
        .hww-card:hover{ transform: translateY(-6px); border-color: rgba(255,255,255,0.6);
          background: linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 100%); }
        .hww-top{ display: flex; align-items: flex-start; justify-content: space-between; }
        .hww-letter{ font-size: 112px; font-weight: 800; line-height: 0.82; letter-spacing: -0.04em;
          background: linear-gradient(160deg, #ffffff 10%, #f3e8ff 45%, #ff8fd2 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 8px 18px rgba(255,0,137,0.25)); transition: transform .45s cubic-bezier(.22,1,.36,1); transform-origin: left bottom; }
        .hww-card:hover .hww-letter{ transform: scale(1.08) rotate(-3deg); }
        .hww-num{ font-size: 13px; font-weight: 600; letter-spacing: .12em; color: rgba(255,255,255,0.55); padding-top: 6px; }
        .hww-title{ margin: 22px 0 8px; font-size: clamp(18px,1.4vw,21px); font-weight: 700; line-height: 1.25; }
        .hww-first{ background: linear-gradient(45deg,#ffd1ec,#ff5fb8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .hww-desc{ margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.82); max-width: 92%; }
        .hww-icon{ position: absolute; right: -14px; bottom: -14px; width: 120px; height: 120px; object-fit: contain; opacity: .9; pointer-events: none;
          transition: transform .45s ease, opacity .45s ease; }
        .hww-card:hover .hww-icon{ transform: translate(-4px,-4px) scale(1.06); opacity: 1; }
        @media (max-width: 1279px){
          .hww-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 6px 24px 16px; scroll-padding-inline: 24px; }
          .hww-row::-webkit-scrollbar{ display: none; }
          .hww-card{ flex: 0 0 260px; scroll-snap-align: start; }
        }
        /* phones: stacked list — big letter on the left, copy beside it, icon tucked bottom-right */
        @media (max-width: 640px){
          .hww-row{ display: grid !important; grid-template-columns: 1fr; gap: 12px; overflow: visible; margin: 0; padding: 0; }
          .hww-card{ flex: none; min-height: 0; display: grid; grid-template-columns: 64px 1fr; column-gap: 14px; align-items: start;
            padding: 18px 76px 18px 16px; border-radius: 20px; }
          .hww-top{ grid-row: 1 / span 2; }
          .hww-letter{ font-size: 64px; }
          .hww-num{ display: none; }
          .hww-title{ margin: 2px 0 4px; font-size: 17px; }
          .hww-desc{ font-size: 13.5px; max-width: none; }
          .hww-icon{ width: 72px; height: 72px; right: 6px; bottom: 6px; }
        }
        @media (prefers-reduced-motion: reduce){ .hww-card, .hww-letter, .hww-icon{ transition: none; } }
      `}</style>
    </div>
  );
}
