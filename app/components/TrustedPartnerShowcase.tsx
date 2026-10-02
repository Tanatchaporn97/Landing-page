"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
// light gradient so the headline reads on the dark-blue section background
const GRAD = "linear-gradient(45deg, #d9ccff 0%, #ff8fd0 100%)";

// The five principles as cards spelling B·U·D·D·Y: tag pill, title and copy
// on top, with a 3D letter (public/how-we-work/letter-*.webp) in the corner.
const ITEMS = [
  { tag: "Clarity", dot: "#5f26e5", title: "Built on Clarity",         desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                 descEn: "Clear, systematic work held to a consistent standard.",              src: "/how-we-work/letter-b.webp" },
  { tag: "Insight", dot: "#ec4899", title: "Unified by Insight",       desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",          descEn: "Shared goals, sharpened by insight.",                                src: "/how-we-work/letter-u.webp" },
  { tag: "Data-Driven", dot: "#2e1a7a", title: "Data-Driven Decisions",    desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",   descEn: "Data guides every call — from choosing creators to measuring results.", src: "/how-we-work/letter-d.webp" },
  { tag: "Delivery", dot: "#b0206a", title: "Delivery with Discipline", desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",         descEn: "Systematic management and delivery, from start to finish.",           src: "/how-we-work/letter-d.webp" },
  { tag: "Goal-Focused", dot: "#7c3aed", title: "Your Goals Drive Results", desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",            descEn: "Results tied to your brand's real goals.",                            src: "/how-we-work/letter-y.webp" },
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

      {/* five cards in one row (≥1280px); narrower screens scroll sideways with snap.
          Style follows the brand page's "Think Smarter, Execute Better" cards: light card,
          dot tag pill, bold title, muted copy, 3D art bleeding off the bottom-right corner. */}
      <div className="hww-row">
        {ITEMS.map((item) => (
          <Link key={item.title} href={`/${lang}/brand`} className="hww-card group">
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", width: "fit-content", padding: "6px 14px", borderRadius: "999px",
                background: "#ffffff", fontSize: "13px", fontWeight: 600, color: "#374151", boxShadow: "0 2px 8px -4px rgba(95,38,229,0.25)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.dot }} />
                {item.tag}
              </span>
              <h4 style={{ ...KT, margin: 0, fontSize: "clamp(20px,1.6vw,24px)", fontWeight: 700, lineHeight: 1.25, color: "#111827" }}>
                {item.title}
              </h4>
              <p style={{ ...KT, margin: 0, fontSize: "15px", fontWeight: 400, lineHeight: 1.6, color: "#4b5563" }}>
                {lang === "th" ? item.desc : item.descEn}
              </p>
            </div>
            <div className="hww-art" aria-hidden="true">
              <Image src={item.src} alt="" fill unoptimized sizes="(max-width: 1279px) 280px, 18vw" style={{ objectFit: "contain", objectPosition: "right bottom" }} />
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .hww-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .hww-card{
          position: relative; overflow: hidden; isolation: isolate; text-decoration: none;
          display: flex; flex-direction: column; min-height: 400px; padding: 28px 24px; border-radius: 24px;
          background: linear-gradient(160deg, #f7f3fd 0%, #efe8fb 100%);
          border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 40px -22px rgba(20,4,92,0.55);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        /* 3D letter anchored to the bottom-right corner, partly cropped by the card edge */
        .hww-art{ position: absolute; right: -12%; bottom: -8%; width: 86%; aspect-ratio: 1; z-index: 1; pointer-events: none;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1); transform-origin: right bottom; }
        .hww-card:hover{ transform: translateY(-6px); box-shadow: 0 26px 48px -22px rgba(20,4,92,0.7); }
        .hww-card:hover .hww-art{ transform: scale(1.06) rotate(-3deg); }
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
