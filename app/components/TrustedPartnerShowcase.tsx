"use client";
import { useState } from "react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/service/built-on-clarity.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/service/teamwork.jpg",                title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers.", objectPosition: "35% center" },
  { src: "/service/data-driven-precision.jpg",   title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/service/result.jpg",                  title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

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
          Benefit
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "320px" }}>
          {lang === "th"
            ? "ข้อดีที่ทำให้แบรนด์ไว้วางใจ Buddy Review ในการทำ Influencer Marketing"
            : "The advantages that make brands trust Buddy Review for their influencer marketing."}
        </p>
      </div>

      {/* Right — row of benefit cards */}
      <div className="tps-cards-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {ITEMS.map((item, i) => {
          const isOpen = !!expanded[i];
          return (
            <div key={item.title} className="tps-card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4 / 3", marginBottom: "16px" }}>
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: item.objectPosition || "top" }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <h4 style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: 0, lineHeight: 1.35 }}>
                  {item.title}
                </h4>
                <button
                  onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                  aria-expanded={isOpen}
                  aria-label={lang === "th" ? "แสดงรายละเอียดเพิ่มเติม" : "Show more details"}
                  style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    border: "1px solid rgba(17,24,39,0.15)", background: isOpen ? "#5f26e5" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    cursor: "pointer", transition: "background 0.25s ease, transform 0.25s ease",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#ffffff" : "#111827"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease, stroke 0.25s ease" }}>
                    <path d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </button>
              </div>
              <p style={{
                ...KT, fontSize: "14px", lineHeight: 1.7, color: "#111827",
                margin: 0, overflow: "hidden",
                maxHeight: isOpen ? "80px" : "0px",
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? "10px" : "0px",
                transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease",
              }}>
                {lang === "th" ? item.desc : item.descEn}
              </p>
            </div>
          );
        })}
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
