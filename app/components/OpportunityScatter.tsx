"use client";
import Image from "next/image";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ScatterItem = {
  label: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  kind: "image" | "notepad" | "categories";
  img?: string;
};

const CATEGORY_PILLS = [
  { icon: "💪", label: "Sporty & Healthy" },
  { icon: "🎵", label: "TikTok Stars" },
  { icon: "💄", label: "Beauty Blogger" },
  { icon: "🍜", label: "Foodie" },
  { icon: "🎬", label: "Youtuber" },
  { icon: "🩺", label: "Doctor & Nurse" },
  { icon: "🦷", label: "Dentist" },
];

type StatItem = {
  top: string;
  left: string;
  rotate: number;
  emoji: string;
  value: string;
  labelTh: string;
  labelEn: string;
};

// Positions mirror the reference collage exactly (top-left / top-center /
// top-right / mid-right / bottom-left / bottom-center / bottom-right), with
// the two center-column items (top-center, bottom-center) kept clear of the
// heading/paragraph vertically, just like the reference. Widths are % of the
// container so they reflow with it (desktop/tablet only — mobile renders a
// separate stacked-pairs layout further down this file).
const ITEMS_TH: ScatterItem[] = [
  { label: "สตอรี่จากครีเอเตอร์จริง", top: "3%",  left: "30%", width: "9.4%",   rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "รับเงินผ่านมือถือ",      top: "22%", left: "85%", width: "8.1%",   rotate: -4, kind: "image", img: "/buddy-rank-phone.png" },
  { label: "บล็อกให้ความรู้",         top: "64%", left: "17%", width: "9.4%",   rotate: -2, kind: "notepad" },
  { label: "ครีเอเตอร์ทุกวงการ",      top: "72%", left: "47%", width: "190px", rotate: 1,  kind: "categories" },
];

const ITEMS_EN: ScatterItem[] = [
  { label: "Real Creator Stories",   top: "3%",  left: "30%", width: "9.4%",   rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "Get Paid On Your Phone", top: "22%", left: "85%", width: "8.1%",   rotate: -4, kind: "image", img: "/buddy-rank-phone.png" },
  { label: "The Creator Blog",       top: "64%", left: "17%", width: "9.4%",   rotate: -2, kind: "notepad" },
  { label: "Every Kind of Creator",  top: "72%", left: "47%", width: "190px", rotate: 1,  kind: "categories" },
];

// The original 3 stat cards (same hover-animate treatment) — placed in the
// top-left / top-right / bottom-right corners on desktop.
const STATS: StatItem[] = [
  { top: "18%", left: "3%",  rotate: -4, emoji: "🤝", value: "1,000+" },
  { top: "6%",  left: "67%", rotate: 2,  emoji: "🎯", value: "4,000+" },
  { top: "65%", left: "82%", rotate: -2, emoji: "🌐", value: "95K+" },
].map((s, i) => ({
  ...s,
  labelTh: ["ลูกค้าที่ไว้วางใจ", "แคมเปญที่ส่งมอบ", "เครือข่ายอินฟลูเอนเซอร์"][i],
  labelEn: ["Trusted Clients", "Campaigns Delivered", "Influencer Network"][i],
}));

function Label({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <p style={{
      ...KT, fontSize: small ? "11px" : "clamp(9px, 0.75vw, 12px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      textAlign: "center", margin: small ? "0 0 8px" : "0 0 clamp(4px, 0.6vw, 10px)",
      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </p>
  );
}

function ImageCard({ img }: { img: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "14px", overflow: "hidden", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", background: "#ffffff" }}>
      <Image src={img} alt="" fill sizes="190px" style={{ objectFit: "cover" }} />
    </div>
  );
}

function NotepadCard() {
  return (
    <div style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", padding: "16px 14px" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ height: "1px", background: "rgba(17,24,39,0.15)", margin: "9px 0" }} />
      ))}
    </div>
  );
}

function CategoryPillsCard() {
  const renderPill = (pill: { icon: string; label: string }, key: string) => (
    <div key={key} style={{
      display: "flex", alignItems: "center", gap: "8px",
      background: "rgba(255,255,255,0.88)",
      border: "1.5px solid rgba(255,255,255,0.95)",
      borderRadius: "50px",
      padding: "7px 12px 7px 7px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      whiteSpace: "nowrap" as const,
      marginBottom: "9px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}>
      <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
        {pill.icon}
      </div>
      <span style={{ ...KT, fontSize: "11px", fontWeight: 600, color: "#111827" }}>{pill.label}</span>
    </div>
  );

  return (
    <div className="pill-scroll-area" style={{ width: "190px", height: "240px", padding: "4px 0" }}>
      <div className="pill-scroll-track">
        {[...CATEGORY_PILLS, ...CATEGORY_PILLS].map((pill, i) => renderPill(pill, `${i}`))}
      </div>
    </div>
  );
}

function StatCard({ s, lang, compact }: { s: StatItem; lang: "th" | "en"; compact?: boolean }) {
  return (
    <motion.div
      animate={{ rotate: compact ? 0 : s.rotate }}
      whileHover={compact ? undefined : { rotate: s.rotate, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        position: "relative",
        background: "#ffffff", borderRadius: "18px", padding: "18px 18px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        pointerEvents: "auto", cursor: "pointer",
      }}
    >
      <span style={{ fontSize: "18px", position: "absolute", top: "12px", right: "14px" }}>{s.emoji}</span>
      <p style={{ ...KT, fontSize: "24px", fontWeight: 800, margin: "0 0 4px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {s.value}
      </p>
      <p style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0 }}>
        {lang === "th" ? s.labelTh : s.labelEn}
      </p>
    </motion.div>
  );
}

export default function OpportunityScatter({ lang }: { lang: "th" | "en" }) {
  const items = lang === "th" ? ITEMS_TH : ITEMS_EN;

  return (
    <div className="opportunity-scatter opportunity-scatter-desktop" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((item) => (
        <div key={item.label} style={{
          position: "absolute", top: item.top, left: item.left, width: item.width,
          transform: `rotate(${item.rotate}deg)`,
        }}>
          <Label>{item.label}</Label>
          {item.kind === "image" && <ImageCard img={item.img!} />}
          {item.kind === "notepad" && <NotepadCard />}
          {item.kind === "categories" && <CategoryPillsCard />}
        </div>
      ))}

      {STATS.map((s) => (
        <div key={s.value} style={{ position: "absolute", top: s.top, left: s.left, width: "14.25%", minWidth: "150px" }}>
          <StatCard s={s} lang={lang} />
        </div>
      ))}
    </div>
  );
}

// ── Mobile — same 7 elements as loose scattered pairs stacked in normal
// document flow, straddling the heading/paragraph (rendered between the two
// halves in page.tsx), matching the reference collage's portrait layout.
function MobileCell({ item, lang, rotate }: { item: ScatterItem | { kind: "stat"; stat: StatItem }; lang: "th" | "en"; rotate: number }) {
  if ("stat" in item) {
    return (
      <div style={{ flex: "1 1 0", transform: `rotate(${rotate}deg)` }}>
        <StatCard s={item.stat} lang={lang} compact />
      </div>
    );
  }
  return (
    <div style={{ flex: "1 1 0", transform: `rotate(${rotate}deg)` }}>
      <Label small>{item.label}</Label>
      {item.kind === "image" && <ImageCard img={item.img!} />}
      {item.kind === "notepad" && <NotepadCard />}
      {item.kind === "icons" && <IconsCard />}
    </div>
  );
}

export function OpportunityScatterMobileTop({ lang }: { lang: "th" | "en" }) {
  const items = lang === "th" ? ITEMS_TH : ITEMS_EN;
  return (
    <div className="opportunity-scatter-mobile" style={{ display: "none", flexDirection: "column", gap: "20px", width: "100%", boxSizing: "border-box", marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={items[0]} lang={lang} rotate={-3} />
        <MobileCell item={items[1]} lang={lang} rotate={3} />
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={{ kind: "stat", stat: STATS[0] }} lang={lang} rotate={-2} />
        <MobileCell item={{ kind: "stat", stat: STATS[1] }} lang={lang} rotate={2} />
      </div>
    </div>
  );
}

export function OpportunityScatterMobileBottom({ lang }: { lang: "th" | "en" }) {
  const items = lang === "th" ? ITEMS_TH : ITEMS_EN;
  return (
    <div className="opportunity-scatter-mobile" style={{ display: "none", flexDirection: "column", gap: "20px", width: "100%", boxSizing: "border-box", marginTop: "24px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={items[2]} lang={lang} rotate={2} />
        <MobileCell item={{ kind: "stat", stat: STATS[2] }} lang={lang} rotate={-2} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%" }}>
          <MobileCell item={items[3]} lang={lang} rotate={1} />
        </div>
      </div>
    </div>
  );
}
