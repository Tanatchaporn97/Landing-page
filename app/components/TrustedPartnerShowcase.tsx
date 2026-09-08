"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/card1.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/card2.jpg", title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers." },
  { src: "/card3.png", title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/card4.png", title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  const [active, setActive] = useState(0);
  const current = ITEMS[active];

  return (
    <div className="tps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "stretch" }}>
      {/* Left — numbered hoverable list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <div key={item.title}>
              <div
                onMouseEnter={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "16px",
                  padding: "28px 0 28px 20px", cursor: "pointer",
                  borderLeft: isActive ? "3px solid #5f26e5" : "3px solid transparent",
                  transition: "border-color 0.3s ease",
                }}
              >
                <span style={{ ...KT, fontSize: "14px", fontWeight: 700, color: isActive ? "#5f26e5" : "#9ca3af", paddingTop: "6px", transition: "color 0.3s ease" }}>
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <div>
                  <h3 style={{ ...KT, fontSize: "clamp(24px,2.4vw,32px)", fontWeight: 700, margin: 0, lineHeight: 1.3,
                    color: isActive ? "#111827" : "#9ca3af", transition: "color 0.3s ease" }}>
                    {item.title}
                  </h3>
                  <p style={{
                    ...KT, fontSize: "16px", lineHeight: 1.7, color: "#6b7280",
                    margin: 0, maxWidth: "420px", overflow: "hidden",
                    maxHeight: isActive ? "80px" : "0px",
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? "10px" : "0px",
                    transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease",
                  }}>
                    {lang === "th" ? item.desc : item.descEn}
                  </p>
                </div>
              </div>
              {i < ITEMS.length - 1 && <div style={{ height: "1px", background: "rgba(17,24,39,0.10)" }} />}
            </div>
          );
        })}
      </div>

      {/* Right — crossfading image */}
      <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", minHeight: "420px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={current.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0 }}>
            <Image src={current.src} alt={current.title} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px){
          .tps-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
