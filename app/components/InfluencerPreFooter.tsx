"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PLAYFAIR = { fontFamily: "var(--font-playfair),Georgia,serif" };
const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";
const APPLY_URL = "https://www.buddyreview.co/app/new-campaigns";

const AVATARS = ["/testimonials/king.jpg", "/testimonials/pond-peoria.jpg", "/testimonials/philipverze.jpg"];

// Small trend-line tile used inline in the headline
const TrendTile = () => (
  <span aria-hidden="true" style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle",
    width: "1.05em", height: "1.05em", borderRadius: "0.26em", margin: "0 0.16em 0.12em",
    background: "linear-gradient(145deg, #a78bfa 0%, #6d3df2 60%, #5f25e5 100%)",
    boxShadow: "0 10px 24px -8px rgba(95,38,229,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
  }}>
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16l5-5 4 4 8-8" /><path d="M15 7h5v5" />
    </svg>
  </span>
);

const Heart = ({ size, style }: { size: number; style: React.CSSProperties }) => (
  <svg aria-hidden="true" className="ipf-heart" width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", ...style }}>
    <path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" fill="#ff7aa8" />
  </svg>
);

// Influencer page pre-footer: copy + CTA on the left, a creator clip playing
// in a phone mockup on the right with floating stat chips (real network stats).
export default function InfluencerPreFooter({ lang }: { lang: "th" | "en" }) {
  const th = lang === "th";
  const videoRef = useRef<HTMLVideoElement>(null);

  // only download/play the clip while the section is on screen
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ipf-grid" style={{
      ...KT, position: "relative", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", alignItems: "center", gap: "40px",
      padding: "56px 64px", borderRadius: "36px", overflow: "hidden",
      background: "linear-gradient(135deg, #ffffff 0%, #f6f1fd 55%, #efe5fb 100%)",
      border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 20px 60px -24px rgba(95,38,229,0.28)",
    }}>
      {/* ── Left: copy ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "22px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px 6px 6px", borderRadius: "999px",
          background: "#ffffff", border: "1px solid rgba(95,38,229,0.12)", boxShadow: "0 6px 18px -10px rgba(95,38,229,0.35)" }}>
          <span style={{ display: "flex" }}>
            {AVATARS.map((src, i) => (
              <span key={src} style={{ position: "relative", width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", border: "2px solid #ffffff", marginLeft: i ? "-9px" : 0 }}>
                <Image src={src} alt="" fill sizes="28px" style={{ objectFit: "cover" }} />
              </span>
            ))}
          </span>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
            {th ? "ครีเอเตอร์กว่า 1,000,000+ คนเลือก Buddy Review" : "1,000,000+ creators already on Buddy Review"}
          </span>
        </div>

        <h3 style={{ margin: 0, fontSize: "clamp(34px,4vw,58px)", fontWeight: 700, lineHeight: 1.12, color: "#111827", letterSpacing: "-0.01em" }}>
          {th ? (
            <>อยากเป็น Influencer<br />แต่ไม่รู้จะเริ่ม<span style={{ whiteSpace: "nowrap" }}><TrendTile /><span style={{ ...PLAYFAIR, fontStyle: "italic", fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingRight: "0.08em" }}>ตรงไหน?</span></span></>
          ) : (
            <>Want to be an influencer<br />but not sure<span style={{ whiteSpace: "nowrap" }}><TrendTile /><span style={{ ...PLAYFAIR, fontStyle: "italic", fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingRight: "0.08em" }}>where to start?</span></span></>
          )}
        </h3>

        <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.7, color: "rgba(17,24,39,0.72)", maxWidth: "470px" }}>
          {th
            ? <>เริ่มต้นง่าย ๆ กับ <strong style={{ color: "#5f26e5" }}>Buddy Review</strong> เปิดรับโอกาสใหม่ ๆ และเติบโตไปพร้อมกับเรา สมัครฟรี ไม่มีค่าใช้จ่าย</>
            : <>It&apos;s easy with <strong style={{ color: "#5f26e5" }}>Buddy Review</strong> — unlock new opportunities and grow with us. Sign up free, no cost at all.</>}
        </p>

        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="ipf-cta"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", borderRadius: "999px", background: "#111827", color: "#ffffff",
            fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 16px 30px -12px rgba(17,24,39,0.55)" }}>
          {th ? "สมัครฟรีเลย" : "Sign Up Free"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>

      {/* ── Right: phone + floating chips ── */}
      <div className="ipf-visual" style={{ position: "relative", height: "520px" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: "420px", height: "420px", transform: "translate(-50%,-50%)", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(255,0,137,0.12) 45%, transparent 70%)" }} />

        {/* phone */}
        <div className="ipf-phone" style={{ position: "absolute", left: "50%", top: "50%", width: "240px", height: "490px", transform: "translate(-50%,-50%) rotate(4deg)",
          borderRadius: "42px", padding: "9px", boxSizing: "border-box",
          background: "linear-gradient(145deg, #4b5563 0%, #111827 40%, #374151 100%)",
          boxShadow: "0 40px 70px -24px rgba(17,24,39,0.55), inset 0 0 0 2px rgba(255,255,255,0.12)" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "34px", overflow: "hidden", background: "#e9e1f7" }}>
            <video ref={videoRef} data-src="/videos/influencer-header/header-4.mp4" muted loop playsInline preload="none" aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <span aria-hidden="true" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "74px", height: "20px", borderRadius: "12px", background: "#0b0b0f" }} />
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "18px", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 14px", borderRadius: "999px", background: "rgba(255,255,255,0.28)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              color: "#ffffff", fontSize: "12px", fontWeight: 600 }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff2d55", boxShadow: "0 0 0 3px rgba(255,45,85,0.25)" }} />
              Live
            </span>
          </div>
        </div>

        {/* chips */}
        <span className="ipf-float" style={{ position: "absolute", left: "14%", top: "16%", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", borderRadius: "999px",
          background: "linear-gradient(135deg, #8b5cf6, #5f25e5)", color: "#ffffff", fontSize: "14px", fontWeight: 700, transform: "rotate(-8deg)",
          boxShadow: "0 14px 28px -10px rgba(95,38,229,0.7)", animationDelay: "0.2s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
          {th ? "งานใหม่เข้า" : "New Jobs"}
        </span>
        <span className="ipf-float" style={{ position: "absolute", right: "10%", top: "4%", display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "14px",
          background: "#c8f56a", color: "#1a2e05", fontSize: "15px", fontWeight: 800, transform: "rotate(6deg)",
          boxShadow: "0 0 28px rgba(200,245,106,0.75), 0 10px 20px -8px rgba(26,46,5,0.35)", animationDelay: "0.9s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#e11d48"><path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" /></svg>
          {th ? "แมทช์แล้ว" : "Matched"}
        </span>
        <div className="ipf-float ipf-stat" style={{ position: "absolute", left: "4%", top: "46%", width: "118px", padding: "16px 12px", borderRadius: "20px", textAlign: "center",
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(95,38,229,0.45)", animationDelay: "0.5s" }}>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>1M+</div>
          <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "6px" }}>{th ? "เครือข่ายครีเอเตอร์" : "Creator Network"}</div>
        </div>
        <div className="ipf-float ipf-stat" style={{ position: "absolute", right: "2%", top: "58%", width: "128px", padding: "18px 12px", borderRadius: "20px", textAlign: "center",
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(95,38,229,0.45)", animationDelay: "1.3s" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>4,000+</div>
          <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "6px" }}>{th ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered"}</div>
        </div>

        <Heart size={30} style={{ left: "10%", top: "38%", opacity: 0.85 }} />
        <Heart size={18} style={{ left: "22%", bottom: "16%", opacity: 0.55 }} />
        <Heart size={34} style={{ right: "4%", bottom: "6%", opacity: 0.9 }} />
        <Heart size={16} style={{ right: "24%", top: "30%", opacity: 0.5 }} />
      </div>

      <style>{`
        .ipf-cta{ transition: transform 0.2s ease, background 0.2s ease; }
        .ipf-cta:hover{ background: #5f26e5 !important; transform: translateY(-2px); }
        @keyframes ipf-float{ 0%,100%{ translate: 0 0; } 50%{ translate: 0 -8px; } }
        .ipf-float{ animation: ipf-float 4.2s ease-in-out infinite; }
        @keyframes ipf-heart{ 0%,100%{ transform: translateY(0) scale(1); } 50%{ transform: translateY(-10px) scale(1.08); } }
        .ipf-heart{ animation: ipf-heart 3.6s ease-in-out infinite; }
        @media (max-width: 900px){
          .ipf-grid{ grid-template-columns: 1fr !important; padding: 40px 24px !important; gap: 12px !important; }
          .ipf-visual{ height: 460px !important; }
        }
        @media (max-width: 480px){
          .ipf-visual{ height: 420px !important; }
          .ipf-phone{ width: 200px !important; height: 410px !important; }
          .ipf-stat{ transform: scale(0.85); }
        }
        @media (prefers-reduced-motion: reduce){ .ipf-float, .ipf-heart{ animation: none; } }
      `}</style>
    </div>
  );
}
