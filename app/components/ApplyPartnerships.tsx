"use client";
import { useState } from "react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const STEPS = {
  th: [
    { title: "รู้จัก Audience ของคุณ", desc: "ดูว่าผู้ติดตามเป็นใคร สนใจอะไร และคอนเทนต์แบบไหนที่พวกเขาชอบ" },
    { title: "คิดคอนเทนต์ต่อได้ง่ายขึ้น", desc: "ให้ AI ช่วยหา Trend, Hook และแนวทางคอนเทนต์ที่เหมาะกับช่องคุณ" },
    { title: "เห็นจุดแข็งของช่อง", desc: "วิเคราะห์สไตล์คอนเทนต์และ Performance พร้อมเทียบกับ Creator ที่ใกล้เคียง" },
  ],
  en: [
    { title: "Know Your Audience", desc: "See who your followers are, what they're interested in, and what content they love." },
    { title: "Plan Your Next Content Easier", desc: "Let AI help you find trends, hooks, and content directions that fit your channel." },
    { title: "See Your Channel's Strengths", desc: "Analyze your content style and performance, benchmarked against similar creators." },
  ],
};

export default function ApplyPartnerships({ lang, onHoverChange }: { lang: "th" | "en"; onHoverChange?: (index: number | null) => void }) {
  const steps = STEPS[lang];
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="ap-wrap" style={{ maxWidth: "1200px", margin: "64px auto 0" }}>
      <div className="apply-partnerships-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
        {steps.map((s, i) => {
          const isActive = active === i;
          return (
            <div
              key={s.title}
              className={`ap-card${isActive ? " is-active" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => { setActive(i); onHoverChange?.(i); }}
              onMouseEnter={() => { setActive(i); onHoverChange?.(i); }}
              onMouseLeave={() => { setActive((prev) => (prev === i ? null : prev)); onHoverChange?.(null); }}
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)", borderRadius: "24px", padding: "36px 32px",
                boxShadow: isActive ? "0 16px 40px rgba(95,38,229,0.20)" : "0 8px 28px rgba(95,38,229,0.08)",
                display: "flex", flexDirection: "column", gap: "14px",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <span className="ap-num" style={{
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
              <p style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.7, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      <style>{`
        .ap-card{ cursor: pointer; }
        @media (max-width: 860px){
          .ap-wrap{ margin-top: 32px !important; }
          .apply-partnerships-grid{ grid-template-columns: 1fr !important; gap: 10px !important; }
          /* compact tap-to-select rows: number + title on one line, short description below */
          .ap-card{ display: grid !important; grid-template-columns: 34px 1fr; column-gap: 12px; row-gap: 4px !important;
            align-items: center; padding: 14px 16px !important; border-radius: 18px !important; transform: none !important;
            border: 1.5px solid rgba(255,255,255,0.6) !important; }
          .ap-card.is-active{ border-color: #8b5cf6 !important; background: rgba(255,255,255,0.85) !important; }
          .ap-num{ width: 34px !important; height: 34px !important; font-size: 12px !important; }
          .ap-card h3{ font-size: 17px !important; }
          .ap-card p{ grid-column: 2; font-size: 13.5px !important; line-height: 1.55 !important; }
        }
      `}</style>
    </div>
  );
}
