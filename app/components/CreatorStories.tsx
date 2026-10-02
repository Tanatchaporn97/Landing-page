"use client";
import { useRef, useState } from "react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const VIDEOS = [
  { src: "/videos/creator-stories/flukymltp.mp4", name: "Flukymltp" },
  { src: "/videos/creator-stories/nice-naphatchw.mp4", name: "Nice.Naphatchw" },
  { src: "/videos/creator-stories/icepapan.mp4", name: "Icepapan" },
  { src: "/videos/creator-stories/pookkyjdp.mp4", name: "Pookkyjdp" },
  { src: "/videos/creator-stories/ducky-jesse.mp4", name: "ducky.jesse" },
  { src: "/videos/creator-stories/ignoreyouuu.mp4", name: "ignoreyouuu" },
  { src: "/videos/creator-stories/suppapitchayas.mp4", name: "suppapitchayas" },
  { src: "/videos/creator-stories/deerboraa.mp4", name: "deerboraa" },
  { src: "/videos/creator-stories/graphic-review.mp4", name: "graphic.review" },
  { src: "/videos/creator-stories/tinnimalist.mp4", name: "tinnimalist" },
  { src: "/videos/creator-stories/tungngern.mp4", name: "ถุงเงิน ณัฐดาภรณ์" },
];

// TikTok player chrome over each video: right-hand rail (creator avatar with
// the red follow "+", like, comment, share) and the bottom-centre create
// button with TikTok's cyan / red edges. Purely decorative.
function TikTokRail() {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", right: "12px", bottom: "96px", zIndex: 1,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "22px",
      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))", pointerEvents: "none",
    }}>
      {/* creator avatar + follow badge */}
      <div style={{ position: "relative", width: "46px", height: "46px", marginBottom: "4px" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#000000", border: "2px solid #ffffff",
          display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.77a5.69 5.69 0 1 0 4.9 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" fill="#25F4EE" transform="translate(-1 -1)" />
            <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.77a5.69 5.69 0 1 0 4.9 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" fill="#FE2C55" transform="translate(1 1)" />
            <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.77a5.69 5.69 0 1 0 4.9 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" fill="#ffffff" />
          </svg>
        </div>
        <span style={{ position: "absolute", left: "50%", bottom: "-9px", transform: "translateX(-50%)", width: "20px", height: "20px", borderRadius: "50%",
          background: "#FE2C55", border: "2px solid #ffffff", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1.5v7M1.5 5h7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </span>
      </div>
      {/* like */}
      <svg width="34" height="34" viewBox="0 0 48 48"><path d="M24 41C24 41 5 30.2 5 17.4 5 10.6 10.2 6 16.3 6c3.4 0 6 1.7 7.7 4.1C25.7 7.7 28.3 6 31.7 6 37.8 6 43 10.6 43 17.4 43 30.2 24 41 24 41z" fill="#ffffff" /></svg>
      {/* comment */}
      <svg width="34" height="34" viewBox="0 0 48 48">
        <path d="M24 6C13.5 6 5 13.2 5 22.1c0 5 2.7 9.5 7 12.4L10.6 42l8.2-4.7c1.7.4 3.4.6 5.2.6 10.5 0 19-7.2 19-16.1S34.5 6 24 6z" fill="#ffffff" />
        <circle cx="15" cy="22" r="2.8" fill="#c9c3d6" /><circle cx="24" cy="22" r="2.8" fill="#c9c3d6" /><circle cx="33" cy="22" r="2.8" fill="#c9c3d6" />
      </svg>
      {/* share */}
      <svg width="34" height="34" viewBox="0 0 48 48"><path d="M27 8l16 15-16 15v-9C15 29 9 33 5 41c1.5-12 7.5-22 22-24V8z" fill="#ffffff" /></svg>
    </div>
  );
}

function TikTokCreateButton() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "26px", transform: "translateX(-50%)", zIndex: 1, width: "48px", height: "32px", pointerEvents: "none" }}>
      <span style={{ position: "absolute", inset: "0 6px 0 -3px", borderRadius: "9px", background: "#25F4EE" }} />
      <span style={{ position: "absolute", inset: "0 -3px 0 6px", borderRadius: "9px", background: "#FE2C55" }} />
      <span style={{ position: "absolute", inset: 0, borderRadius: "8px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="#161823" strokeWidth="2.2" strokeLinecap="round" /></svg>
      </span>
    </div>
  );
}

function StoryCard({ src, name }: { src: string; name: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);

  // `playing` follows the element's own play/pause events (below), so the UI
  // never shows "playing" for a video that failed to start. If the browser
  // refuses to start with sound (e.g. Safari/iOS policies), retry muted so the
  // clip still plays; the viewer can unmute with the speaker button.
  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!el.paused) { el.pause(); return; }
    if (el.readyState === 0) el.load();
    el.play().catch(() => {
      el.muted = true;
      setMuted(true);
      el.play().catch(() => {});
    });
  };

  return (
    <div className="creator-story-card" style={{
      position: "relative", flex: "0 0 300px", width: "300px", aspectRatio: "9 / 16",
      borderRadius: "40px", overflow: "hidden", background: "#000000",
      border: "3px solid #ffffff", boxSizing: "border-box",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.5), 0 0 44px 8px rgba(255,255,255,0.9), 0 22px 44px -14px rgba(95,38,229,0.4)", cursor: "pointer",
      scrollSnapAlign: "start",
    }} onClick={toggle}>
      <video ref={videoRef} playsInline loop preload="metadata" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onPlay={() => setPlaying(true)} onPause={() => { setPlaying(false); setBuffering(false); }} onEnded={() => setPlaying(false)}
        onWaiting={() => setBuffering(true)} onPlaying={() => setBuffering(false)} onCanPlay={() => setBuffering(false)}>
        {/* #t=0.1 makes the browser paint the first frame as the cover without downloading the whole file */}
        <source src={`${src}#t=0.1`} type="video/mp4" />
      </video>

      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827" style={{ marginLeft: "3px" }}><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      )}

      {/* loading ring while the clip buffers after a tap */}
      {buffering && (
        <div aria-label="Loading" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
          <span className="cs-spin" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "4px solid rgba(255,255,255,0.35)", borderTopColor: "#ffffff" }} />
        </div>
      )}

      {playing && muted && (
        <button
          onClick={(e) => { e.stopPropagation(); const el = videoRef.current; if (el) { el.muted = false; setMuted(false); } }}
          aria-label="Unmute"
          style={{ position: "absolute", top: "16px", left: "16px", height: "36px", padding: "0 12px", borderRadius: "18px", background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", zIndex: 2, color: "#ffffff", ...KT, fontSize: "12px", fontWeight: 600 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8l5 8M21 8l-5 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" /></svg>
          Tap to unmute
        </button>
      )}

      {playing && (
        <button
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          aria-label="Pause"
          style={{ position: "absolute", top: "16px", right: "16px", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        </button>
      )}

      {/* soft white fades top and bottom, like the player chrome */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.38) 100%)" }} />

      <div style={{ position: "absolute", left: "18px", bottom: "74px", zIndex: 1 }}>
        <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{name}</span>
      </div>

      <TikTokRail />
      <TikTokCreateButton />
    </div>
  );
}

export default function CreatorStories() {
  return (
    <div className="creator-stories-row" style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollPaddingInline: "56px", scrollbarWidth: "none", paddingTop: "48px", paddingBottom: "56px", paddingLeft: "56px", paddingRight: "56px", width: "100%", boxSizing: "border-box" }}>
      {VIDEOS.map((v) => <StoryCard key={v.src} src={v.src} name={v.name} />)}
      <style>{`
        .creator-stories-row::-webkit-scrollbar{ display: none; }
        @keyframes cs-spin{ to{ transform: rotate(360deg); } }
        .cs-spin{ animation: cs-spin 0.8s linear infinite; }
        @media (max-width: 768px){
          .creator-stories-row{ padding-left: 24px !important; padding-right: 24px !important; scroll-padding-inline: 24px !important; }
        }
      `}</style>
    </div>
  );
}
