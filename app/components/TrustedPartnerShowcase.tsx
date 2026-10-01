"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import AppleCardCarousel, { type CardItem } from "@/components/ui/carousel-08";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

// The five principles (B·U·D·D·Y), shown as Apple-style photo cards
// (components/ui/carousel-08) using Buddy Review's own event photos.
const ITEMS = [
  { letter: "B", title: "Built on Clarity",         desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                 descEn: "Clear, systematic work held to a consistent standard.",              src: "/blogs/cp-influencer-trend-08.jpg" },
  { letter: "U", title: "Unified by Insight",       desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",          descEn: "Shared goals, sharpened by insight.",                                src: "/blogs/cp-influencer-trend-07.jpg" },
  { letter: "D", title: "Data-Driven Decisions",    desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",   descEn: "Data guides every call — from choosing creators to measuring results.", src: "/blogs/cp-influencer-trend-04.jpg" },
  { letter: "D", title: "Delivery with Discipline", desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",         descEn: "Systematic management and delivery, from start to finish.",           src: "/blogs/cp-influencer-trend-03.jpg" },
  { letter: "Y", title: "Your Goals Drive Results", desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",            descEn: "Results tied to your brand's real goals.",                            src: "/blogs/cp-influencer-trend-01.jpg" },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  const cards: CardItem[] = ITEMS.map((item, i) => ({
    id: String(i),
    src: item.src,
    alt: item.title,
    href: `/${lang}/brand`,
    category: (
      <span style={{ ...KT, display: "inline-flex", alignItems: "flex-start", gap: "8px", fontWeight: 600, lineHeight: 1.4 }}>
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px", padding: "2px 9px", backdropFilter: "blur(6px)", flexShrink: 0, marginTop: "1px" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        {item.title}
      </span>
    ),
    title: <span style={{ ...KT, fontWeight: 600 }}>{lang === "th" ? item.desc : item.descEn}</span>,
  }));

  const header = (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <Badge variant="outline">How We Work</Badge>
        </div>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15,
          background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          What Goes Into Every Campaign
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {lang === "th"
            ? "วิธีทำงานที่ช่วยให้ทุกแคมเปญชัดเจน เป็นระบบ และเดินไปสู่เป้าหมายเดียวกัน"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>
      <Link href={`/${lang}/brand`}
        className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
        style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 12px 12px 24px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
        {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
        <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </Link>
    </div>
  );

  // Section wrapper already provides the page gutter, so no extra padding here.
  // ≥1280px: all five cards fit side by side (each 1/5 of the row, shorter
  // and with smaller type); below that the strip stays a swipeable carousel.
  return (
    <AppleCardCarousel
      header={header}
      cards={cards}
      gutterClassName="px-0"
      itemClassName="xl:basis-1/5"
      cardClassName="xl:w-full xl:h-[440px] xl:p-6"
      titleClassName="xl:text-xl"
      showArrow={false}
    />
  );
}
