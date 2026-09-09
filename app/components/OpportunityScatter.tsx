"use client";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ScatterCategoryItem = {
  label: string;
  icon: string;
  top: string;
  left: string;
  rotate: number;
};

// Individual category pills scattered around the heading (desktop/tablet —
// mobile renders a separate stacked-pairs layout further down this file).
// Category names stay in English regardless of site language, matching the
// convention already used by CategoriesMarquee / InfluencerHero.
const ITEMS: ScatterCategoryItem[] = [
  { label: "Beauty Blogger", icon: "💄", top: "3%",  left: "30%", rotate: 3 },
  { label: "Foodie",         icon: "🍜", top: "22%", left: "85%", rotate: -4 },
  { label: "Youtuber",       icon: "🎬", top: "64%", left: "17%", rotate: -2 },
  { label: "TikTok Stars",   icon: "🎵", top: "72%", left: "47%", rotate: 1 },
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

// Playful floating reaction emoji — sits small/still at rest and pops up
// (scales, lifts, gains a shadow) on hover, like a little reaction bubble.
const REACTIONS = [
  { emoji: "🔥", top: "38%", left: "5%",  rotate: -8 },
  { emoji: "🤩", top: "42%", left: "91%", rotate: 6 },
  { emoji: "💗", top: "86%", left: "64%", rotate: -5 },
];

function ReactionEmoji({ emoji, rotate }: { emoji: string; rotate: number }) {
  return (
    <motion.div
      initial={{ scale: 1, rotate }}
      whileHover={{ scale: 1.5, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px",
        cursor: "pointer", pointerEvents: "auto",
      }}
    >
      {emoji}
    </motion.div>
  );
}

function CategoryPillCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      background: "#ffffff", borderRadius: "50px",
      padding: "10px 20px 10px 10px",
      boxShadow: "0 12px 28px rgba(95,38,229,0.14)",
      whiteSpace: "nowrap",
    }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#111827" }}>{label}</span>
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
  return (
    <div className="opportunity-scatter opportunity-scatter-desktop" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {ITEMS.map((item) => (
        <div key={item.label} style={{
          position: "absolute", top: item.top, left: item.left,
          transform: `rotate(${item.rotate}deg)`,
        }}>
          <CategoryPillCard icon={item.icon} label={item.label} />
        </div>
      ))}

      {STATS.map((s) => (
        <div key={s.value} style={{ position: "absolute", top: s.top, left: s.left, width: "14.25%", minWidth: "150px" }}>
          <StatCard s={s} lang={lang} />
        </div>
      ))}

      {REACTIONS.map((r) => (
        <div key={r.emoji} style={{ position: "absolute", top: r.top, left: r.left }}>
          <ReactionEmoji emoji={r.emoji} rotate={r.rotate} />
        </div>
      ))}
    </div>
  );
}

// ── Mobile — same 7 elements as loose scattered pairs stacked in normal
// document flow, straddling the heading/paragraph (rendered between the two
// halves in page.tsx), matching the reference collage's portrait layout.
function MobileCell({ item, lang, rotate }: { item: ScatterCategoryItem | { kind: "stat"; stat: StatItem }; lang: "th" | "en"; rotate: number }) {
  if ("stat" in item) {
    return (
      <div style={{ flex: "1 1 0", transform: `rotate(${rotate}deg)` }}>
        <StatCard s={item.stat} lang={lang} compact />
      </div>
    );
  }
  return (
    <div style={{ flex: "1 1 0", display: "flex", justifyContent: "center", transform: `rotate(${rotate}deg)` }}>
      <CategoryPillCard icon={item.icon} label={item.label} />
    </div>
  );
}

export function OpportunityScatterMobileTop({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="opportunity-scatter-mobile" style={{ display: "none", flexDirection: "column", gap: "20px", width: "100%", boxSizing: "border-box", marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={ITEMS[0]} lang={lang} rotate={-3} />
        <MobileCell item={ITEMS[1]} lang={lang} rotate={3} />
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={{ kind: "stat", stat: STATS[0] }} lang={lang} rotate={-2} />
        <MobileCell item={{ kind: "stat", stat: STATS[1] }} lang={lang} rotate={2} />
      </div>
    </div>
  );
}

export function OpportunityScatterMobileBottom({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="opportunity-scatter-mobile" style={{ display: "none", flexDirection: "column", gap: "20px", width: "100%", boxSizing: "border-box", marginTop: "24px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <MobileCell item={ITEMS[2]} lang={lang} rotate={2} />
        <MobileCell item={{ kind: "stat", stat: STATS[2] }} lang={lang} rotate={-2} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%" }}>
          <MobileCell item={ITEMS[3]} lang={lang} rotate={1} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        {REACTIONS.map((r) => <ReactionEmoji key={r.emoji} emoji={r.emoji} rotate={r.rotate} />)}
      </div>
    </div>
  );
}
