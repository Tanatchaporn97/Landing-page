"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";
const APPLY_URL = "https://www.buddyreview.co/app/new-campaigns";

const AVATARS = ["/testimonials/king.jpg", "/testimonials/pond-peoria.jpg", "/testimonials/philipverze.jpg"];

const Heart = ({ size, style }: { size: number; style: React.CSSProperties }) => (
  <svg aria-hidden="true" className="ipf-heart" width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", ...style }}>
    <path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" fill="#e9a6ae" />
  </svg>
);

// Influencer page pre-footer: copy + CTA on the left, a creator
// photo in a phone mockup on the right with floating stat chips (real network stats).
export default function InfluencerPreFooter({ lang }: { lang: "th" | "en" }) {
  const th = lang === "th";

  return (
    // full-bleed background band; content stays in the 1294px column
    <div className="ipf-band" style={{ ...KT, position: "relative", width: "100%", overflow: "hidden",
      background: "linear-gradient(135deg, #ffffff 0%, #f6f1fd 55%, #efe5fb 100%)" }}>
    <div className="ipf-grid" style={{
      position: "relative", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", alignItems: "center", gap: "40px",
      maxWidth: "1294px", margin: "0 auto", padding: "72px 48px", boxSizing: "border-box",
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
            <>อยากเป็น <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Influencer</span><br />แต่ไม่รู้จะเริ่มตรงไหน?</>
          ) : (
            <>Want to be an <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>influencer</span><br />but not sure where to start?</>
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
          {th ? "สมัครเลย!" : "Sign Up Now!"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>

      {/* ── Right: phone + floating chips ── */}
      <div className="ipf-visual" style={{ position: "relative", height: "520px" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: "420px", height: "420px", transform: "translate(-50%,-50%)", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214,180,140,0.32) 0%, rgba(196,170,214,0.16) 45%, transparent 70%)" }} />

        {/* phone */}
        <div className="ipf-phone" style={{ position: "absolute", left: "50%", top: "50%", width: "240px", height: "490px", transform: "translate(-50%,-50%) rotate(4deg)",
          borderRadius: "42px", padding: "9px", boxSizing: "border-box",
          background: "linear-gradient(145deg, #4b5563 0%, #111827 40%, #374151 100%)",
          boxShadow: "0 40px 70px -24px rgba(17,24,39,0.55), inset 0 0 0 2px rgba(255,255,255,0.12)" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "34px", overflow: "hidden", background: "#e9e1f7" }}>
            <Image src="/hero-illustrations/influencer-prefooter.jpg" alt={th ? "ครีเอเตอร์ถ่ายเซลฟี่" : "Creator taking a selfie"} fill sizes="240px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            <span aria-hidden="true" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "74px", height: "20px", borderRadius: "12px", background: "#0b0b0f" }} />
            {/* camera UI — she's filming a review, so the screen reads as a recording */}
            <span aria-hidden="true" style={{ position: "absolute", top: "40px", left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 10px", borderRadius: "999px", background: "rgba(17,24,39,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              color: "#ffffff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>
              <span className="ipf-rec" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e5484d" }} />
              REC 00:15
            </span>
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "18px", transform: "translateX(-50%)", width: "54px", height: "54px", borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.9)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#e5484d" }} />
            </span>
          </div>
        </div>

        {/* chips — the creator journey around the photo: get a brief → film → post → get paid */}
        {/* brief card (café review fits the photo) */}
        <div className="ipf-float ipf-chip" style={{ position: "absolute", left: "2%", top: "10%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px 10px 10px",
          borderRadius: "18px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(60,40,25,0.35)", transform: "rotate(-4deg)", animationDelay: "0.2s" }}>
          <span style={{ width: "36px", height: "36px", borderRadius: "11px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #b0835a, #7a4f30)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" /><path d="M7 2v2M11 2v2M15 2v2" /></svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#8b5e3c", letterSpacing: "0.04em" }}>{th ? "งานใหม่เข้า" : "NEW JOB"}</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#2d2118", whiteSpace: "nowrap" }}>{th ? "รีวิวคาเฟ่ · บรีฟชัดเจน" : "Café review · clear brief"}</span>
          </span>
        </div>

        {/* platform pill — where the clip goes */}
        <span className="ipf-float" style={{ position: "absolute", right: "6%", top: "3%", display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "999px",
          background: "#ffffff", boxShadow: "0 12px 26px -12px rgba(17,24,39,0.45)", transform: "rotate(5deg)", animationDelay: "0.9s" }}>
          <span style={{ position: "relative", width: "18px", height: "18px" }}><Image src="/social-icons/tiktok.png" alt="" fill sizes="18px" style={{ objectFit: "contain" }} /></span>
          <span style={{ position: "relative", width: "18px", height: "18px" }}><Image src="/social-icons/instagram.png" alt="" fill sizes="18px" style={{ objectFit: "contain" }} /></span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{th ? "พร้อมโพสต์" : "Ready to post"}</span>
        </span>

        {/* viewer comment on her café post */}
        <div className="ipf-float ipf-chip" style={{ position: "absolute", left: "8%", top: "44%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px 8px 8px",
          borderRadius: "999px", background: "rgba(255,255,255,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 14px 30px -14px rgba(60,40,25,0.4)", transform: "rotate(-4deg)", animationDelay: "0.5s" }}>
          <span style={{ position: "relative", width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/testimonials/nutty.jpg" alt="" fill sizes="26px" style={{ objectFit: "cover" }} />
          </span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#3b2a1e", whiteSpace: "nowrap" }}>{th ? "ร้านน่านั่งมาก ☕" : "Love this café ☕"}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#d9707f"><path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" /></svg>
        </div>

        {/* payout card — the outcome */}
        <div className="ipf-float ipf-chip" style={{ position: "absolute", right: "0%", top: "60%", display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px 12px 12px",
          borderRadius: "18px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(60,40,25,0.35)", transform: "rotate(3deg)", animationDelay: "1.3s" }}>
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#e8efe2" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b8a4f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#2d2118", whiteSpace: "nowrap" }}>{th ? "รับเงินแล้ว" : "Payment received"}</span>
            <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>{th ? "จ่ายตรงตามรอบ" : "Paid on schedule"}</span>
          </span>
        </div>

        {/* creator-network stat */}
        <div className="ipf-float ipf-stat" style={{ position: "absolute", left: "6%", bottom: "8%", width: "132px", padding: "12px 10px", borderRadius: "18px", textAlign: "center",
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(60,40,25,0.35)", animationDelay: "1.7s" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>1M+</div>
          <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "4px", whiteSpace: "nowrap" }}>{th ? "ครีเอเตอร์ในเครือข่าย" : "Creators in network"}</div>
        </div>

        <Heart size={22} style={{ left: "26%", top: "30%", opacity: 0.7 }} />
        <Heart size={30} style={{ right: "3%", bottom: "8%", opacity: 0.85 }} />
        <Heart size={14} style={{ right: "22%", top: "26%", opacity: 0.5 }} />
      </div>

      </div>
      <style>{`
        .ipf-cta{ transition: transform 0.2s ease, background 0.2s ease; }
        .ipf-cta:hover{ background: #5f26e5 !important; transform: translateY(-2px); }
        @keyframes ipf-float{ 0%,100%{ translate: 0 0; } 50%{ translate: 0 -8px; } }
        .ipf-float{ animation: ipf-float 4.2s ease-in-out infinite; }
        @keyframes ipf-heart{ 0%,100%{ transform: translateY(0) scale(1); } 50%{ transform: translateY(-10px) scale(1.08); } }
        .ipf-heart{ animation: ipf-heart 3.6s ease-in-out infinite; }
        @keyframes ipf-rec{ 50%{ opacity: 0.25; } }
        .ipf-rec{ animation: ipf-rec 1.2s steps(1) infinite; }
        @media (max-width: 900px){
          .ipf-grid{ grid-template-columns: 1fr !important; padding: 48px 24px !important; gap: 12px !important; }
          .ipf-visual{ height: 460px !important; }
        }
        @media (max-width: 480px){
          .ipf-visual{ height: 420px !important; }
          .ipf-phone{ width: 200px !important; height: 410px !important; }
          .ipf-stat, .ipf-chip{ scale: 0.86; }
        }
        @media (prefers-reduced-motion: reduce){ .ipf-float, .ipf-heart, .ipf-rec{ animation: none; } }
      `}</style>
    </div>
  );
}
