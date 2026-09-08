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
  kind: "image" | "notepad";
  img?: string;
};

type StatItem = {
  top: string;
  left: string;
  rotate: number;
  emoji: string;
  value: string;
  labelTh: string;
  labelEn: string;
};

// Kept strictly in the left/right margins (outside the ~900px centered
// text column) so nothing ever overlaps the heading/paragraph/stat cards.
const ITEMS_TH: ScatterItem[] = [
  { label: "แพลนคอนเทนต์ล่วงหน้า", top: "2%",  left: "1%", width: "190px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "บล็อกให้ความรู้",       top: "38%", left: "1%", width: "170px", rotate: 3,  kind: "notepad" },
  { label: "แคมเปญไลฟ์สด",         top: "72%", left: "1%", width: "190px", rotate: -3, kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
];

const ITEMS_EN: ScatterItem[] = [
  { label: "Plan Content Ahead", top: "2%",  left: "1%", width: "190px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "The Creator Blog",   top: "38%", left: "1%", width: "170px", rotate: 3,  kind: "notepad" },
  { label: "Live Campaigns",     top: "72%", left: "1%", width: "190px", rotate: -3, kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
];

// The original 3 stat cards (same size, same hover-animate treatment) —
// moved out of the center column and grouped in the right margin.
const STATS: StatItem[] = [
  { top: "4%",  left: "83%", rotate: -4, emoji: "🤝", value: "1,000+" },
  { top: "37%", left: "83%", rotate: 2,  emoji: "🎯", value: "4,000+" },
  { top: "70%", left: "83%", rotate: -2, emoji: "🌐", value: "95K+" },
].map((s, i) => ({
  ...s,
  labelTh: [" ลูกค้าที่ไว้วางใจ", "แคมเปญที่ส่งมอบ", "เครือข่ายอินฟลูเอนเซอร์"][i],
  labelEn: ["Trusted Clients", "Campaigns Delivered", "Influencer Network"][i],
}));

function ScatterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      textAlign: "center", margin: "0 0 10px",
      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </p>
  );
}

export default function OpportunityScatter({ lang }: { lang: "th" | "en" }) {
  const items = lang === "th" ? ITEMS_TH : ITEMS_EN;

  return (
    <div className="opportunity-scatter" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((item) => (
        <div key={item.label} style={{
          position: "absolute", top: item.top, left: item.left, width: item.width,
          transform: `rotate(${item.rotate}deg)`,
        }}>
          <ScatterLabel>{item.label}</ScatterLabel>

          {item.kind === "image" && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "14px", overflow: "hidden", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", background: "#ffffff" }}>
              <Image src={item.img!} alt="" fill sizes="190px" style={{ objectFit: "cover" }} />
            </div>
          )}

          {item.kind === "notepad" && (
            <div style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", padding: "18px 16px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: "1px", background: "rgba(17,24,39,0.15)", margin: "10px 0" }} />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Same 3 stat cards, same size + hover animation as before — now grouped in the right margin */}
      {STATS.map((s) => (
        <motion.div
          key={s.value}
          animate={{ rotate: s.rotate }}
          whileHover={{ rotate: s.rotate, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{
            position: "absolute", top: s.top, left: s.left,
            background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px",
            pointerEvents: "auto", cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>{s.emoji}</span>
          <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {s.value}
          </p>
          <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
            {lang === "th" ? s.labelTh : s.labelEn}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
