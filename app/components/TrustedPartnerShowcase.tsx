"use client";
import { GradientCard } from "@/components/ui/gradient-card";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/service/built-on-clarity.svg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/service/teamwork.svg",                title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers." },
  { src: "/service/data-driven-precision.svg",   title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/service/result.svg",                  title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="tps-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "center" }}>
      {/* Left — heading, description */}
      <div className="tps-left" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <Badge variant="outline">How We Work</Badge>
        </div>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
          margin: 0, lineHeight: 1.15,
          background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Built Into Every Campaign
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "320px" }}>
          {lang === "th"
            ? "มาตรฐานที่ทำให้ทุกความร่วมมือชัดเจน รอบคอบ และพาไปถึงผลลัพธ์"
            : "The principles behind how we think, work, and deliver."}
        </p>
      </div>

      {/* Right — 2x2 grid, same GradientCard used by Brand's "Think Smarter, Execute Better" */}
      <div className="tps-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {ITEMS.map((item) => (
          <GradientCard
            key={item.title}
            gradient="purple"
            title={item.title}
            description={lang === "th" ? item.desc : item.descEn}
            imageUrl={item.src}
            style={{
              ...KT, minHeight: "180px", padding: "20px",
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 8px 28px rgba(95,38,229,0.08)",
            }}
          />
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
