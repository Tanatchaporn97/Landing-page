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
    <div className="tps-wrap">
      {/* Heading, description */}
      <div className="tps-left" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
          margin: 0, lineHeight: 1.15,
          background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Our Standard
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "480px" }}>
          {lang === "th"
            ? "หลักการที่อยู่เบื้องหลังวิธีคิด การทำงาน และการส่งมอบผลลัพธ์ของเรา"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>

      {/* 2x2 grid of soft-gray cards, icon anchored to the bottom-right corner */}
      <div className="tps-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        {ITEMS.map((item) => (
          <motion.div key={item.title} className="tps-card"
            variants={cardAnimation} initial="rest" whileHover="hover" animate="rest"
            style={{
              position: "relative", overflow: "hidden", borderRadius: "20px",
              background: "#f4f3f8", padding: "24px", minHeight: "220px",
              display: "flex", flexDirection: "column", cursor: "pointer",
            }}>
            <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0, position: "relative", zIndex: 1 }}>
              {item.title}
            </h4>
            <p style={{ ...KT, fontSize: "13px", lineHeight: 1.6, color: "#6b7280", margin: "8px 0 0", maxWidth: "60%", position: "relative", zIndex: 1 }}>
              {lang === "th" ? item.desc : item.descEn}
            </p>
            <motion.img
              src={item.src} alt={item.title}
              variants={iconAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ position: "absolute", right: "-8%", bottom: "-10%", width: "58%", pointerEvents: "none" }}
            />
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px){
          .tps-cards-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
