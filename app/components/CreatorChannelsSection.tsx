"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ChannelBadge = {
  name: string;
  icon: string;
  size: "sm" | "md" | "lg";
  rotation: number;
  zIndex: number;
  offsetXPct: number; // % of container width — scales with the column instead of overflowing narrow ones
  offsetY: number;
  gridX: number; // scattered-state position: a neat 3-per-row grid — fixed px so column
  gridY: number; // spacing never shrinks (and starts overlapping) on a narrower container
};

const CHANNELS: ChannelBadge[] = [
  { name: "TikTok", icon: "/social-icons/tiktok.png", size: "lg", rotation: -4, zIndex: 1, offsetXPct: -22, offsetY: -100, gridX: -190, gridY: -120 },
  { name: "Facebook", icon: "/social-icons/facebook.png", size: "md", rotation: 3, zIndex: 2, offsetXPct: 13, offsetY: -140, gridX: 0, gridY: -120 },
  { name: "Instagram", icon: "/social-icons/instagram.png", size: "lg", rotation: -2, zIndex: 3, offsetXPct: 25, offsetY: -10, gridX: 190, gridY: -120 },
  { name: "YouTube", icon: "/social-icons/youtube.png", size: "md", rotation: 2, zIndex: 4, offsetXPct: -27, offsetY: 45, gridX: -190, gridY: 120 },
  { name: "Lemon8", icon: "/social-icons/lemon8.png", size: "lg", rotation: -3, zIndex: 5, offsetXPct: 1, offsetY: 100, gridX: 190, gridY: 120 },
  { name: "X", icon: "/social-icons/x.png", size: "sm", rotation: 4, zIndex: 6, offsetXPct: 24, offsetY: 140, gridX: 0, gridY: 120 },
];

const SIZE_STYLES = {
  sm: { padding: "10px 20px 10px 10px", iconSize: 30, fontSize: "13px" },
  md: { padding: "13px 24px 13px 12px", iconSize: 36, fontSize: "15px" },
  lg: { padding: "16px 28px 16px 14px", iconSize: 42, fontSize: "16px" },
};

export default function CreatorChannelsSection({ lang }: { lang: "th" | "en" }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  // Scatter the badges apart, then regroup — alternating every 5s, looping forever.
  const [scattered, setScattered] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setScattered((prev) => !prev), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cc2-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "56px", alignItems: "center" }}>
      <div className="cc2-left">
        <Badge variant="outline" style={{ ...KT }}>One Creator, Many Channels</Badge>
        <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: "16px 0 0", lineHeight: 1.25 }}>
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

      <div className="cc2-right" style={{ position: "relative", height: "380px" }}>
        {CHANNELS.map((ch) => {
          const isHovered = hoveredId === ch.name;
          const isClicked = clickedId === ch.name;
          const isOtherHovered = hoveredId !== null && hoveredId !== ch.name;
          const s = SIZE_STYLES[ch.size];
          const scatterX = scattered ? `${ch.gridX}px` : `${ch.offsetXPct}%`;
          const scatterY = scattered ? ch.gridY : ch.offsetY;
          const scatterRotation = scattered ? 0 : ch.rotation;
          return (
            <div
              key={ch.name}
              className="cc2-badge"
              onMouseEnter={() => setHoveredId(ch.name)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setClickedId(clickedId === ch.name ? null : ch.name)}
              style={{
                position: "absolute", top: "50%", left: "50%",
                display: "flex", alignItems: "center", gap: "12px",
                background: "#ffffff", borderRadius: "50px", padding: s.padding,
                height: "62px", boxSizing: "border-box",
                cursor: "pointer", userSelect: "none",
                transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease-out",
                transform: `translate(-50%,-50%) translate(${scatterX}, ${scatterY}px) rotate(${isHovered ? 0 : scatterRotation}deg) scale(${isClicked ? 1.12 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1}) translateY(${isHovered ? -8 : 0}px)`,
                zIndex: isHovered || isClicked ? 100 : ch.zIndex,
                boxShadow: isHovered
                  ? "0 20px 40px -10px rgba(95,38,229,0.35)"
                  : isClicked
                    ? "0 24px 48px -12px rgba(95,38,229,0.4)"
                    : "0 10px 24px -14px rgba(95,38,229,0.18)",
              }}>
              <div style={{
                width: s.iconSize, height: s.iconSize, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              }}>
                <Image src={ch.icon} alt={ch.name} width={s.iconSize} height={s.iconSize} style={{ objectFit: "contain" }} />
              </div>
              <span style={{ ...KT, fontSize: s.fontSize, fontWeight: 700, color: "#111827", whiteSpace: "nowrap" }}>{ch.name}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px){
          .cc2-grid{ grid-template-columns: 1fr !important; gap: 32px !important; }
          .cc2-left{ text-align: center; }
        }
        @media (max-width: 560px){
          .cc2-right{ height: 320px !important; }
        }
      `}</style>
    </div>
  );
}
