"use client";

import { FaTiktok, FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CHANNELS = [
  { name: "TikTok", icon: FaTiktok, bg: "#000000", iconColor: "#ffffff" },
  { name: "Facebook", icon: FaFacebookF, bg: "#1877F2", iconColor: "#ffffff" },
  { name: "Instagram", icon: FaInstagram, bg: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)", iconColor: "#ffffff" },
  { name: "YouTube", icon: FaYoutube, bg: "#FF0000", iconColor: "#ffffff" },
  { name: "Lemon8", icon: null, bg: "#000000", iconColor: "#ffffff", label: "L8" },
  { name: "X", icon: FaXTwitter, bg: "#000000", iconColor: "#ffffff" },
];

export default function CreatorChannelsSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="cc2-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "56px", alignItems: "center" }}>
      <div className="cc2-left">
        <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "#5f26e5", textTransform: "uppercase" }}>
          {lang === "th" ? "หนึ่งครีเอเตอร์ หลายช่องทาง" : "One Creator, Many Channels"}
        </span>
        <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,44px)", fontWeight: 800, margin: "16px 0 0", lineHeight: 1.25 }}>
          <span style={{ color: "#111827" }}>
            {lang === "th" ? "คอนเทนต์ของคุณอยู่ที่ไหน" : "Wherever your content lives,"}
          </span>
          <br />
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {lang === "th" ? "เราก็พร้อมไปด้วย" : "we're right there with you."}
          </span>
        </h2>
      </div>

      <div className="cc2-right" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {CHANNELS.map((ch) => (
          <div key={ch.name} className="cc2-card" style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "#ffffff", borderRadius: "16px", padding: "18px 16px",
            border: "1px solid rgba(95,38,229,0.08)",
            boxShadow: "0 10px 24px -14px rgba(95,38,229,0.18)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
              background: ch.bg, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {ch.icon ? (
                <ch.icon size={18} color={ch.iconColor} />
              ) : (
                <span style={{ ...KT, fontSize: "12px", fontWeight: 800, color: ch.iconColor }}>{ch.label}</span>
              )}
            </div>
            <span style={{ ...KT, fontSize: "15px", fontWeight: 700, color: "#111827" }}>{ch.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .cc2-card:hover{
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -14px rgba(95,38,229,0.3);
        }
        @media (max-width: 900px){
          .cc2-grid{ grid-template-columns: 1fr !important; gap: 32px !important; }
          .cc2-left{ text-align: center; }
        }
        @media (max-width: 560px){
          .cc2-right{ grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
