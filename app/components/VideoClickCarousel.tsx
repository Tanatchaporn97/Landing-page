"use client";
import { useRef } from "react";

export interface FanVideo {
  src: string;
  name: string;
}

export default function VideoClickCarousel({ videos }: { videos: FanVideo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".vcc-card");
    const step = card ? card.getBoundingClientRect().width + 18 : 260;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
    background: "#ffffff", border: "1px solid rgba(17,24,39,0.12)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)", cursor: "pointer",
    color: "#111827",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 4vw" }}>
      <button aria-label="Previous" onClick={() => scrollByCard(-1)} style={arrowStyle} className="vcc-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="vcc-track"
        style={{
          display: "flex", gap: "18px", overflowX: "auto",
          scrollBehavior: "smooth", scrollbarWidth: "none",
          padding: "12px 0",
        }}
      >
        {videos.map((v, i) => (
          <div
            key={v.src + i}
            className="vcc-card"
            style={{
              flex: "0 0 auto", width: "clamp(150px, 16vw, 220px)", aspectRatio: "9 / 16",
              borderRadius: "24px", overflow: "hidden", position: "relative",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            }}
          >
            <video
              src={v.src}
              muted loop playsInline preload="metadata"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      <button aria-label="Next" onClick={() => scrollByCard(1)} style={arrowStyle} className="vcc-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <style>{`
        .vcc-track::-webkit-scrollbar{ display: none; }
        .vcc-arrow{ transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .vcc-arrow:hover{ transform: scale(1.08); box-shadow: 0 10px 28px rgba(0,0,0,0.14); }
      `}</style>
    </div>
  );
}
