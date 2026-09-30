"use client";
import { motion } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

// Impact stats strip — shared by Home and Brand so both show the same
// animated counters, hover pop, and sizing. Responsive rules live in
// globals.css under .hero-stats-strip / .hero-stat-item.
export default function ImpactStats({ lang, background = "#ffffff", style }: { lang: "th" | "en"; background?: string; style?: React.CSSProperties }) {
  return (
    <div className="hero-stats-strip" style={{
      display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
      position: "relative", marginTop: "8px", paddingTop: "60px", paddingBottom: "80px", zIndex: 6,
      background,
      ...style,
    }}>
      {[
        { target: 1000000, startValue: 900000, suffix: "+", label: lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network" },
        { target: 1000, startValue: 900, suffix: "+", label: lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients" },
        { target: 4000, startValue: 3000, suffix: "+", label: lang === "th" ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered" },
      ].map((s) => (
        <motion.div key={s.label} className="hero-stat-item" style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "6px",
          padding: "10px 20px",
          width: "320px",
          boxSizing: "border-box",
        }}
        whileHover={{
          scale: [null, 1.05, 1.08],
          transition: { duration: 0.5, times: [0, 0.6, 1], ease: ["easeInOut", "easeOut"] },
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3, ease: "easeOut" }}>
          <span style={{
            ...KT, fontSize: "44px", fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap",
            background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            <AnimatedCounter target={s.target} startValue={s.startValue} suffix={s.suffix} />
          </span>
          <span style={{ ...KT, fontSize: "18px", fontWeight: 700, color: "#111827", lineHeight: 1.35, whiteSpace: "nowrap" }}>
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
