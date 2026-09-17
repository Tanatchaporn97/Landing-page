"use client";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/service/built-on-clarity.svg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/service/teamwork.svg",                title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers." },
  { src: "/service/data-driven-precision.svg",   title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/service/result.svg",                  title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

// Same hover-animation approach as components/ui/gradient-card.tsx's GradientCard
// (Brand page "Think Smarter, Execute Better" section): the card lifts/scales as
// a whole while its icon independently zooms and tilts, on a spring.
const cardAnimation = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -4 },
};

const iconAnimation = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 3 },
};

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="tps-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "center" }}>
      {/* Left — heading, description */}
      <div className="tps-left" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
          margin: 0, lineHeight: 1.15,
          background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Our Standard
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "320px" }}>
          {lang === "th"
            ? "หลักการที่อยู่เบื้องหลังวิธีคิด การทำงาน และการส่งมอบผลลัพธ์ของเรา"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>

      {/* Right — 2x2 grid of soft-gray cards, icon anchored to the bottom-right corner */}
      <div className="tps-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {ITEMS.map((item) => (
          <motion.div key={item.title} className="tps-card"
            variants={cardAnimation} initial="rest" whileHover="hover" animate="rest"
            style={{
              position: "relative", overflow: "hidden", borderRadius: "16px",
              background: "#f4f3f8", padding: "16px", minHeight: "140px",
              display: "flex", flexDirection: "column", cursor: "pointer",
            }}>
            <h4 style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#111827", margin: 0, position: "relative", zIndex: 1 }}>
              {item.title}
            </h4>
            <p style={{ ...KT, fontSize: "11px", lineHeight: 1.5, color: "#6b7280", margin: "6px 0 0", maxWidth: "62%", position: "relative", zIndex: 1 }}>
              {lang === "th" ? item.desc : item.descEn}
            </p>
            <motion.img
              src={item.src} alt={item.title}
              variants={iconAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ position: "absolute", right: "-6%", bottom: "-8%", width: "44%", pointerEvents: "none" }}
            />
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px){
          .tps-grid{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px){
          .tps-cards-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
