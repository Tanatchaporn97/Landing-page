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
  kind: "image" | "notepad" | "icons";
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

// Positions mirror the reference collage exactly (top-left / top-center /
// top-right / mid-right / bottom-left / bottom-center / bottom-right), with
// the two center-column items (top-center, bottom-center) kept clear of the
// heading/paragraph vertically, just like the reference.
const ITEMS_TH: ScatterItem[] = [
  { label: "สตอรี่จากครีเอเตอร์จริง", top: "3%",  left: "30%", width: "150px", rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "รับเงินผ่านมือถือ",      top: "22%", left: "85%", width: "130px", rotate: -4, kind: "image", img: "/buddy-rank-phone.png" },
  { label: "บล็อกให้ความรู้",         top: "64%", left: "17%", width: "150px", rotate: -2, kind: "notepad" },
  { label: "แบรนด์พาร์ทเนอร์ชั้นนำ",   top: "72%", left: "47%", width: "220px", rotate: 1,  kind: "icons" },
];

const ITEMS_EN: ScatterItem[] = [
  { label: "Real Creator Stories",   top: "3%",  left: "30%", width: "150px", rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "Get Paid On Your Phone", top: "22%", left: "85%", width: "130px", rotate: -4, kind: "image", img: "/buddy-rank-phone.png" },
  { label: "The Creator Blog",       top: "64%", left: "17%", width: "150px", rotate: -2, kind: "notepad" },
  { label: "Top Brand Partners",     top: "72%", left: "47%", width: "220px", rotate: 1,  kind: "icons" },
];

// The original 3 stat cards (same size, same hover-animate treatment) —
// placed in the top-left / top-right / bottom-right corners.
const STATS: StatItem[] = [
  { top: "18%", left: "3%",  rotate: -4, emoji: "🤝", value: "1,000+" },
  { top: "6%",  left: "67%", rotate: 2,  emoji: "🎯", value: "4,000+" },
  { top: "65%", left: "82%", rotate: -2, emoji: "🌐", value: "95K+" },
].map((s, i) => ({
  ...s,
  labelTh: ["ลูกค้าที่ไว้วางใจ", "แคมเปญที่ส่งมอบ", "เครือข่ายอินฟลูเอนเซอร์"][i],
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

          {item.kind === "icons" && (
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              {["📸", "🎤", "🎬"].map((emoji, i) => (
                <div key={i} style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 8px 20px rgba(95,38,229,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {emoji}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

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
