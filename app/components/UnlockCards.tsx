"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Item = { img: string; bg: string; title: string; desc: string };

// Scattered fan layout — position/rotation per card index, matching the reference collage.
const LAYOUT = [
  { left: "0%",  top: "46%", width: "34%", rotate: -6 },
  { left: "13%", top: "54%", width: "27%", rotate: -9 },
  { left: "29%", top: "42%", width: "33%", rotate: -4 },
  { left: "50%", top: "22%", width: "36%", rotate: 5 },
  { left: "56%", top: "42%", width: "38%", rotate: 3 },
  { left: "21%", top: "62%", width: "40%", rotate: -1 },
];

// [reveal-start, reveal-end] scroll-progress window per card — staggered one after another.
const REVEAL = [
  [0,    0.12],
  [0.08, 0.22],
  [0.18, 0.34],
  [0.30, 0.48],
  [0.44, 0.62],
  [0.58, 0.78],
];

function StackCard({ item, index, progress }: { item: Item; index: number; progress: MotionValue<number> }) {
  const pos = LAYOUT[index];
  const [start, end] = REVEAL[index];
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [90, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: pos.width,
        rotate: pos.rotate,
        zIndex: index + 1,
        opacity,
        y,
        scale,
        background: item.bg,
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 20px 44px rgba(17,24,39,0.16)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ ...KT, fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>
        {item.title}
      </h3>
      <p style={{ ...KT, fontSize: "14px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function UnlockCards({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <>
      {/* Desktop/tablet — scroll-driven stacking cascade */}
      <div ref={ref} className="unlock-stack-scroll" style={{ position: "relative", height: "300vh" }}>
        <div className="unlock-stack-sticky" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "1200px", height: "560px", margin: "0 auto" }}>
            {items.map((item, i) => (
              <StackCard key={item.title} item={item} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — plain static stack, no scroll-jacking */}
      <div className="unlock-mobile-list" style={{ display: "none", flexDirection: "column", gap: "16px" }}>
        {items.map((item) => (
          <div key={item.title} style={{ background: item.bg, borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3 style={{ ...KT, fontSize: "20px", fontWeight: 700, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
            <p style={{ ...KT, fontSize: "14px", lineHeight: 1.7, color: "#374151", margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px){
          .unlock-stack-scroll{ display: none; }
          .unlock-mobile-list{ display: flex !important; }
        }
      `}</style>
    </>
  );
}
