"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "motion/react";

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

type Step = { title: string; desc: string; img: string };

function ScrollStepText({ step, index, total, progress }: { step: Step; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const pad = 0.5 / total;
  const titleColor = useTransform(progress, [start - pad, start, end, end + pad], ["#9ca3af", "#5f26e5", "#5f26e5", "#9ca3af"]);
  const descColor = useTransform(progress, [start - pad, start, end, end + pad], ["#b5bcc7", "#374151", "#374151", "#b5bcc7"]);
  const lineOpacity = useTransform(progress, [start - pad, start, end, end + pad], [0.15, 1, 1, 0.15]);

  return (
    <div style={{ padding: "22px 0" }}>
      <motion.h3 style={{ ...KT, fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3, color: titleColor }}>
        {step.title}
      </motion.h3>
      <motion.p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, margin: "0 0 16px", color: descColor }}>
        {step.desc}
      </motion.p>
      <motion.div style={{ height: "1px", borderRadius: "2px", background: "#111827", opacity: lineOpacity }} />
    </div>
  );
}

export default function ApplyPartnerships({ lang }: { lang: "th" | "en" }) {
  const steps = STEPS[lang];

  // Desktop/tablet — scroll-driven: sticky panel, image gallery slides as you scroll.
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(steps.length - 1) * 100}%`]);

  // Mobile — original hover-to-switch behavior (scroll-jacking is a poor fit on touch).
  const [active, setActive] = useState(0);

  return (
    <section className="inf-section" style={{ background: "#F5F0FC" }}>
      {/* Desktop/tablet */}
      <div ref={containerRef} className="ap-scroll-container" style={{ position: "relative", height: "300vh" }}>
        <div className="ap-sticky-wrapper" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", padding: "0 48px" }}>
          <div className="ap-grid" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              {steps.map((s, i) => (
                <ScrollStepText key={s.title} step={s} index={i} total={steps.length} progress={scrollYProgress} />
              ))}
            </div>

            <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "20px" }}>
              <motion.div style={{ display: "flex", width: `${steps.length * 100}%`, height: "100%", x }}>
                {steps.map((s) => (
                  <div key={s.img} style={{ position: "relative", width: `${100 / steps.length}%`, height: "100%", flexShrink: 0 }}>
                    <Image src={s.img} alt={s.title} fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: "contain" }} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="ap-mobile" style={{ display: "none", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }}>
          <div>
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <div key={s.title}
                  onClick={() => setActive(i)}
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
                <Image src={steps[active].img} alt={steps[active].title} fill sizes="100vw"
                  style={{ objectFit: "contain" }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px){
          .ap-scroll-container{ display: none; }
          .ap-mobile{ display: block !important; }
        }
      `}</style>
    </section>
  );
}
