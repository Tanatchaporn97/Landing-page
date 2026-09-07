"use client";
import { useRef, useState } from "react";

const VIDEOS = [
  { src: "/videos/influencer-header/header-1.mp4", name: "Flukymltp" },
  { src: "/videos/influencer-header/header-4.mp4", name: "Nice.Naphatchw" },
  { src: "/videos/influencer-header/header-2.mp4", name: "Icepapan" },
  { src: "/videos/influencer-header/header-3.mp4", name: "Pookkyjdp" },
];

function StoryCard({ src, name }: { src: string; name: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play();
      setPlaying(true);
    }
  };

  return (
    <div className="creator-story-card" style={{
      position: "relative", flex: "1 1 0", minWidth: "200px", aspectRatio: "9 / 16",
      borderRadius: "28px", overflow: "hidden", background: "#000000",
      boxShadow: "0 12px 32px rgba(95,38,229,0.16)", cursor: "pointer",
    }} onClick={toggle}>
      <video ref={videoRef} playsInline loop style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onEnded={() => setPlaying(false)}>
        <source src={src} type="video/mp4" />
      </video>

      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827" style={{ marginLeft: "3px" }}><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      )}

      {playing && (
        <button
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          aria-label="Pause"
          style={{ position: "absolute", top: "16px", right: "16px", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        </button>
      )}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "20px" }}>
        <span style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(22px,3vw,32px)", color: "#ffffff", lineHeight: 1.1, display: "block" }}>
          {name}
        </span>
      </div>
    </div>
  );
}

export default function CreatorStories() {
  return (
    <div className="creator-stories-row" style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "8px" }}>
      {VIDEOS.map((v) => <StoryCard key={v.src} src={v.src} name={v.name} />)}
      <style>{`
        .creator-stories-row::-webkit-scrollbar{ display: none; }
      `}</style>
    </div>
  );
}
