"use client";
import { useRef, useState } from "react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const VIDEOS = [
  { src: "/videos/influencer-header/header-1.mp4", name: "Flukymltp" },
  { src: "/videos/influencer-header/header-4.mp4", name: "Nice.Naphatchw" },
  { src: "/videos/influencer-header/header-2.mp4", name: "Icepapan" },
  { src: "/videos/influencer-header/header-3.mp4", name: "Pookkyjdp" },
  { src: "/videos/influencer-header/header-5.mp4", name: "ducky.jesse" },
  { src: "/videos/influencer-header/header-6.mp4", name: "ignoreyouuu" },
  { src: "/videos/influencer-header/header-7.mp4", name: "suppapitchayas" },
  { src: "/videos/influencer-header/header-8.mp4", name: "deerboraa" },
  { src: "/videos/influencer-header/header-9.mp4", name: "graphic.review" },
  { src: "/videos/influencer-header/header-10.mp4", name: "tinnimalist" },
  { src: "/videos/influencer-header/header-11.mp4", name: "ถุงเงิน ณัฐดาภรณ์" },
];

// A believable TikTok action-bar mockup: like/comment/bookmark/share icons
// (outline style, matching TikTok's real icon weight) — no counts under any icon.
function EngagementBar() {
  return (
    <div style={{
      position: "absolute", right: "12px", bottom: "76px", zIndex: 1,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
      filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
    }}>
      {/* Like */}
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <path d="M24 40.5C24 40.5 6 30 6 17.5C6 10.6 11.2 6 17 6C20.3 6 22.8 7.7 24 10C25.2 7.7 27.7 6 31 6C36.8 6 42 10.6 42 17.5C42 30 24 40.5 24 40.5Z"
          fill="#ffffff" />
      </svg>
      {/* Comment */}
      <svg width="30" height="30" viewBox="0 0 48 48" fill="#ffffff">
        <path d="M6 10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H19l-9 8v-8a4 4 0 0 1-4-4z" />
      </svg>
      {/* Bookmark */}
      <svg width="28" height="28" viewBox="0 0 48 48" fill="#ffffff">
        <path d="M12 4h24a2 2 0 0 1 2 2v38l-14-10-14 10V6a2 2 0 0 1 2-2z" />
      </svg>
      {/* Share */}
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}>
        <path d="M20 8L6 22l14 14" />
        <path d="M6 22h20a14 14 0 0 1 14 14v2" />
      </svg>
    </div>
  );
}

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
      position: "relative", flex: "0 0 300px", width: "300px", aspectRatio: "9 / 16",
      borderRadius: "28px", overflow: "hidden", background: "#000000",
      boxShadow: "0 12px 32px rgba(95,38,229,0.16)", cursor: "pointer",
      scrollSnapAlign: "start",
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

      <div style={{ position: "absolute", left: "16px", bottom: "16px" }}>
        <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{name}</span>
      </div>

      <EngagementBar />
    </div>
  );
}

export default function CreatorStories() {
  return (
    <div className="creator-stories-row" style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingBottom: "8px", paddingLeft: "48px", paddingRight: "48px", width: "100%", boxSizing: "border-box" }}>
      {VIDEOS.map((v) => <StoryCard key={v.src} src={v.src} name={v.name} />)}
      <style>{`
        .creator-stories-row::-webkit-scrollbar{ display: none; }
        @media (max-width: 768px){
          .creator-stories-row{ padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}
