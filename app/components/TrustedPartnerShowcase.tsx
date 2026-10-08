"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/ui/service-card";

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

// white glassmorphism cards over the dark-blue section background
const VARIANTS = ["glass", "glass", "glass", "glass", "glass"] as const;

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

      {/* five cards in one row (≥1280px); narrower screens scroll sideways with snap.
          Style follows the brand page's "Think Smarter, Execute Better" cards: light card,
          bold title, muted copy, 3D art bleeding off the bottom-right corner. */}
      {/* five ServiceCards in one row (≥1280px); narrower screens scroll sideways with snap */}
      <div className="hww-row">
        {ITEMS.map((item, i) => (
          <ServiceCard
            key={item.title}
            title={item.title}
            description={lang === "th" ? item.desc : item.descEn}
            href={`/${lang}/brand`}
            imgSrc={item.src}
            imgAlt=""
            showCta={false}
            variant={VARIANTS[i]}
            className="hww-card min-h-[320px] rounded-3xl"
            imgClassName="w-36 h-36 -right-4 -bottom-3"
            style={KT}
          />
        ))}
      </div>

      <style>{`
        .hww-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .hww-row h3{ font-size: clamp(19px,1.5vw,22px); line-height: 1.25; }
        .hww-row .hww-card a{ position: relative; z-index: 2; }
        @media (max-width: 1279px){
          .hww-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 6px 24px 16px; scroll-padding-inline: 24px; }
          .hww-row::-webkit-scrollbar{ display: none; }
          .hww-card{ flex: 0 0 260px; scroll-snap-align: start; }
        }
        /* phones: stacked full-width list cards — text left, icon right — instead of a swipe row of tall cards */
        @media (max-width: 640px){
          .hww-row{ display: grid !important; grid-template-columns: 1fr; gap: 12px; overflow: visible; margin: 0; padding: 0; }
          .hww-card{ flex: none; min-height: 0 !important; padding: 18px 112px 18px 20px !important; border-radius: 20px !important; }
          .hww-card h3{ font-size: 18px !important; }
          .hww-card p{ font-size: 13.5px !important; margin-top: 4px !important; }
          .hww-card img{ width: 88px !important; height: 88px !important; right: 14px !important; top: 50% !important; bottom: auto !important; margin-top: -44px; }
        }
      `}</style>
    </div>
  );
}
