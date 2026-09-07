"use client";
import { useState } from "react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Item = { img: string; bg: string; title: string; desc: string };

export default function UnlockCards({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="unlock-cards-row" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "8px" }}>
      {items.map((item, i) => {
        const isOpen = active === i;
        return (
          <div key={item.title}
            className={`unlock-card${isOpen ? " unlock-card-open" : ""}`}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={() => setActive(isOpen ? null : i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(isOpen ? null : i); } }}
          >
            <div className="unlock-card-top" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
              <div className="icon-wrap-lg" style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(17,24,39,0.08)" }}>
                <Image className="unlock-icon-img" src={item.img} alt={item.title} width={120} height={120} style={{ width: "120px", height: "120px", objectFit: "contain" }} />
              </div>
              <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 700, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
            </div>

            <p className="unlock-desc" style={{ ...KT, fontSize: "16px", color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>

            <div className="unlock-readmore-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#111827" }}>Read More</span>
              <span className="unlock-arrow-chip" style={{ width: "32px", height: "32px", borderRadius: "50%", background: isOpen ? "#5f26e5" : "transparent", border: isOpen ? "none" : "1px solid rgba(17,24,39,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s ease, border-color 0.3s ease" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke={isOpen ? "#ffffff" : "#111827"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        );
      })}

      <style>{`
        .unlock-cards-row::-webkit-scrollbar{ display: none; }
        .unlock-card{
          position: relative;
          flex: 0 0 210px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: 24px;
          padding: 24px;
          background: #ffffff;
          box-shadow: 0 4px 24px rgba(17,24,39,0.06);
          cursor: pointer;
          transition: flex-basis 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .unlock-card-top h3{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .unlock-card .unlock-desc{
          max-height: 0;
          opacity: 0;
          margin: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .unlock-card-open{ flex-basis: 400px; }
        .unlock-card-open .unlock-desc{
          max-height: 140px;
          opacity: 1;
        }
        .unlock-readmore-row{ margin-top: auto; }
        @media (max-width: 760px){
          .unlock-card{ flex-basis: 260px; }
          .unlock-card-open{ flex-basis: 300px; }
        }
      `}</style>
    </div>
  );
}
