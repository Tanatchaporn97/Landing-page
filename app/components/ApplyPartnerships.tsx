"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const STEPS = {
  th: [
    { title: "สมัครเป็นพาร์ทเนอร์กับเรา", img: "/path-to-partnership/Step-1.png" },
    { title: "รับสินค้าฟรี (เก็บได้เลย!)", img: "/path-to-partnership/Step-2.png" },
    { title: "สร้างคอนเทนต์ อัปโหลด รับเงิน", img: "/path-to-partnership/Step-3.png" },
  ],
  en: [
    { title: "Apply For Partnerships", img: "/path-to-partnership/Step-1.png" },
    { title: "Receive Products (To Keep!)", img: "/path-to-partnership/Step-2.png" },
    { title: "Create, Upload, Get Paid", img: "/path-to-partnership/Step-3.png" },
  ],
};

export default function ApplyPartnerships({ lang }: { lang: "th" | "en" }) {
  const steps = STEPS[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="inf-section" style={{ background: "#F5F0FC", padding: "100px 48px" }}>
      <div className="apply-partnerships-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
        <div>
          {steps.map((s, i) => (
            <div key={s.title}
              onMouseEnter={() => setActive(i)}
              style={{ padding: "22px 0", borderBottom: "1px solid rgba(17,24,39,0.12)", cursor: "pointer" }}>
              <h3 style={{ ...KT, fontSize: "clamp(24px,2.4vw,34px)", fontWeight: 700, margin: 0, lineHeight: 1.3,
                color: i === active ? "#111827" : "#9ca3af", transition: "color 0.3s ease" }}>
                {s.title}
              </h3>
            </div>
          ))}
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
