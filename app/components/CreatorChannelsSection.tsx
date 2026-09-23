"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ChannelBadge = { name: string; icon: string };

const CHANNELS: ChannelBadge[] = [
  { name: "TikTok", icon: "/social-icons/tiktok.png" },
  { name: "Facebook", icon: "/social-icons/facebook.png" },
  { name: "Instagram", icon: "/social-icons/instagram.png" },
  { name: "YouTube", icon: "/social-icons/youtube.png" },
  { name: "Lemon8", icon: "/social-icons/lemon8.png" },
  { name: "X", icon: "/social-icons/x.png" },
];

// All badges use the same size as "X" (the smallest of the old variants).
const CIRCLE_SIZE = 88;
const ICON_SIZE = 40;
const FONT_SIZE = "clamp(17px,1.6vw,21px)"; // matches the bento card title size ("แบรนด์เชื่อถือได้")

export default function CreatorChannelsSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="cc2-grid" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "40px" }}>
      <div className="cc2-left">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Badge variant="outline" style={{ ...KT }}>One Creator, Many Channels</Badge>
        </div>
        <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: "16px 0 0", lineHeight: 1.25 }}>
          <span style={{ color: "#111827" }}>
            {lang === "th" ? "ไม่ว่าคุณจะอยู่แพลตฟอร์มไหน " : "No matter which platform you're on, "}
          </span>
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {lang === "th" ? "ก็มีพื้นที่ที่นี่" : "there's a place for you here."}
          </span>
        </h2>
      </div>

      <div className="cc2-right" style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", gap: "16px 44px" }}>
        {CHANNELS.map((ch) => (
          <div key={ch.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              boxShadow: "0 10px 24px -14px rgba(95,38,229,0.18)",
            }}>
              <Image src={ch.icon} alt={ch.name} width={ICON_SIZE} height={ICON_SIZE} style={{ objectFit: "contain" }} />
            </div>
            <span style={{ ...KT, fontSize: FONT_SIZE, fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>{ch.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
