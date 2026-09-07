"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const STEPS = {
  th: [
    { title: "รู้จัก Audience ของคุณ", desc: "ดูว่าผู้ติดตามเป็นใคร สนใจอะไร และคอนเทนต์แบบไหนที่พวกเขาชอบ", img: "/path-to-partnership/Step-1.png" },
    { title: "เห็นจุดแข็งของช่อง", desc: "วิเคราะห์สไตล์คอนเทนต์และ Performance พร้อมเทียบกับ Creator ที่ใกล้เคียง", img: "/path-to-partnership/Step-2.png" },
    { title: "คิดคอนเทนต์ต่อได้ง่ายขึ้น", desc: "ให้ AI ช่วยหา Trend, Hook และแนวทางคอนเทนต์ที่เหมาะกับช่องคุณ", img: "/path-to-partnership/Step-3.png" },
  ],
  en: [
    { title: "Know Your Audience", desc: "See who your followers are, what they're interested in, and what content they love.", img: "/path-to-partnership/Step-1.png" },
    { title: "See Your Channel's Strengths", desc: "Analyze your content style and performance, benchmarked against similar creators.", img: "/path-to-partnership/Step-2.png" },
    { title: "Plan Your Next Content Easier", desc: "Let AI help you find trends, hooks, and content directions that fit your channel.", img: "/path-to-partnership/Step-3.png" },
  ],
};

export default function ApplyPartnerships({ lang }: { lang: "th" | "en" }) {
  const steps = STEPS[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="inf-section" style={{ background: "#F5F0FC", padding: "100px 48px" }}>
      <div className="apply-partnerships-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
        <div>
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <div key={s.title}
                onMouseEnter={() => setActive(i)}
                style={{ padding: "22px 0", cursor: "pointer" }}>
                <h3 style={{ ...KT, fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3,
                  color: isActive ? "#5f26e5" : "#9ca3af", transition: "color 0.3s ease" }}>
                  {s.title}
                </h3>
                <p style={{ ...KT, fontSize: "16px", color: isActive ? "#374151" : "#b5bcc7", lineHeight: 1.7, margin: "0 0 16px", transition: "color 0.3s ease" }}>
                  {s.desc}
                </p>
                <div style={{
                  height: "1px", borderRadius: "2px",
                  background: "#111827",
                  opacity: isActive ? 1 : 0.15,
                  transition: "opacity 0.35s ease",
                }} />
              </div>
            );
          })}
        </div>

        <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
          <AnimatePresence mode="wait">
            <motion.div key={steps[active].img}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ position: "absolute", inset: "8%" }}>
              <Image src={steps[active].img} alt={steps[active].title} fill sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px){
          .apply-partnerships-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
