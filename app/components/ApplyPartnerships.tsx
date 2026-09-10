"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const STEPS = {
  th: [
    { title: "รู้จัก Audience ของคุณ", desc: "ดูว่าผู้ติดตามเป็นใคร สนใจอะไร และคอนเทนต์แบบไหนที่พวกเขาชอบ" },
    { title: "เห็นจุดแข็งของช่อง", desc: "วิเคราะห์สไตล์คอนเทนต์และ Performance พร้อมเทียบกับ Creator ที่ใกล้เคียง" },
    { title: "คิดคอนเทนต์ต่อได้ง่ายขึ้น", desc: "ให้ AI ช่วยหา Trend, Hook และแนวทางคอนเทนต์ที่เหมาะกับช่องคุณ" },
  ],
  en: [
    { title: "Know Your Audience", desc: "See who your followers are, what they're interested in, and what content they love." },
    { title: "See Your Channel's Strengths", desc: "Analyze your content style and performance, benchmarked against similar creators." },
    { title: "Plan Your Next Content Easier", desc: "Let AI help you find trends, hooks, and content directions that fit your channel." },
  ],
};

// Mobile mockup(s) that pop up per step, matching each feature's theme.
const STEP_MOCKUPS = [
  ["/buddy-ranks/1-followers-trimmed.png", "/buddy-ranks/2-followers-2-trimmed.png"],
  ["/buddy-ranks/6-profile.png", "/buddy-ranks/5-compare-trimmed.png"],
  ["/buddy-ranks/3-content-ideas-trimmed.png"],
];

export default function ApplyPartnerships({ lang }: { lang: "th" | "en" }) {
  const steps = STEPS[lang];
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: "1200px", margin: "64px auto 0" }}>
      <div className="apply-partnerships-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
        {steps.map((s, i) => {
          const isActive = active === i;
          const mockups = STEP_MOCKUPS[i];
          return (
            <div
              key={s.title}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((prev) => (prev === i ? null : prev))}
              style={{
                position: "relative",
                background: "#ffffff", borderRadius: "24px", padding: "36px 32px",
                boxShadow: isActive ? "0 16px 40px rgba(95,38,229,0.20)" : "0 8px 28px rgba(95,38,229,0.08)",
                display: "flex", flexDirection: "column", gap: "14px",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <span style={{
                ...KT, fontSize: "14px", fontWeight: 700, color: "#5f26e5",
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1.5px solid rgba(95,38,229,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ ...KT, fontSize: "clamp(20px,2vw,26px)", fontWeight: 700, margin: 0, lineHeight: 1.3, color: "#5f26e5" }}>
                {s.title}
              </h3>
              <p style={{ ...KT, fontSize: "16px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                {s.desc}
              </p>

              {/* Popup mockup(s) — bounce up on hover/click, floating below the card */}
              <div
                className="apply-partnerships-popup"
                style={{
                  position: "absolute",
                  top: "calc(100% + 16px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "10px",
                  zIndex: 20,
                }}
              >
                <AnimatePresence>
                  {isActive && mockups.map((src, mi) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 28, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 320, damping: 14, delay: mi * 0.06 }}
                      style={{
                        position: "relative",
                        width: mockups.length > 1 ? "110px" : "150px",
                        aspectRatio: "0.497",
                        borderRadius: "18px",
                        overflow: "hidden",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                        rotate: mockups.length > 1 ? (mi === 0 ? -6 : 6) : 0,
                        background: "#ffffff",
                      }}
                    >
                      <Image src={src} alt={s.title} fill sizes="150px" style={{ objectFit: "cover" }} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 860px){
          .apply-partnerships-grid{ grid-template-columns: 1fr !important; }
          .apply-partnerships-popup{ display: none !important; }
        }
      `}</style>
    </div>
  );
}
