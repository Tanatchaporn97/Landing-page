"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/service/built-on-clarity.svg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/service/teamwork.svg",                title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers." },
  { src: "/service/data-driven-precision.svg",   title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/service/result.svg",                  title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="tps-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "start" }}>
      {/* Left — heading, description */}
      <div className="tps-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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

      {/* Right — row of benefit cards */}
      <div className="tps-cards-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {ITEMS.map((item) => (
          <div key={item.title} className="tps-card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4 / 3", marginBottom: "16px" }}>
              <Image src={item.src} alt={item.title} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </div>
            <h4 style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px", lineHeight: 1.35 }}>
              {item.title}
            </h4>
            <p style={{ ...KT, fontSize: "14px", lineHeight: 1.7, color: "#111827", margin: 0 }}>
              {lang === "th" ? item.desc : item.descEn}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1080px){
          .tps-cards-row{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px){
          .tps-grid{ grid-template-columns: 1fr !important; }
          .tps-left{ max-width: none !important; }
        }
        @media (max-width: 560px){
          .tps-cards-row{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
