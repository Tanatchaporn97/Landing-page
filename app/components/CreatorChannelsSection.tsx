"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CHANNELS = [
  { name: "TikTok", icon: "/social-icons/tiktok.png" },
  { name: "Facebook", icon: "/social-icons/facebook.png" },
  { name: "Instagram", icon: "/social-icons/instagram.png" },
  { name: "YouTube", icon: "/social-icons/youtube.png" },
  { name: "Lemon8", icon: "/social-icons/lemon8.png" },
  { name: "X", icon: "/social-icons/x.png" },
];

export default function CreatorChannelsSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="cc2-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "56px", alignItems: "center" }}>
      <div className="cc2-left">
        <Badge variant="outline" style={{ ...KT }}>One Creator, Many Channels</Badge>
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
              width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              <Image src={ch.icon} alt={ch.name} width={38} height={38} style={{ objectFit: "contain" }} />
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
