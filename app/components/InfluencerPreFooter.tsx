"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";
const APPLY_URL = "https://www.buddyreview.co/app/new-campaigns";

const AVATARS = ["/testimonials/king.jpg", "/testimonials/pond-peoria.jpg", "/testimonials/philipverze.jpg"];

// social bubbles around the phone (positions avoid the other chips)
const SOCIALS = [
  { name: "tiktok",    label: "TikTok",    left: "10%", top: "2%",  size: "46px", delay: "0.4s", hideSm: false },
  { name: "instagram", label: "Instagram", left: "82%", top: "18%", size: "52px", delay: "0.9s", hideSm: false },
  { name: "youtube",   label: "YouTube",   left: "86%", top: "84%", size: "44px", delay: "1.3s", hideSm: false },
  { name: "facebook",  label: "Facebook",  left: "22%", top: "70%", size: "40px", delay: "1.8s", hideSm: true },
];

const Heart = ({ size, style }: { size: number; style: React.CSSProperties }) => (
  <svg aria-hidden="true" className="ipf-heart" width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", ...style }}>
    <path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" fill="#ff5fa8" />
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
      <div className="ipf-copy" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "22px", position: "relative", zIndex: 1 }}>
        <div className="ipf-pill" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px 6px 6px", borderRadius: "999px",
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

        <h3 className="ipf-title" style={{ margin: 0, fontSize: "clamp(34px,4vw,58px)", fontWeight: 700, lineHeight: 1.12, color: "#111827", letterSpacing: "-0.01em" }}>
          {th ? (
            <>อยากเป็น <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Influencer</span><br />แต่ไม่รู้จะเริ่มตรงไหน?</>
          ) : (
            <>Want to be an <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>influencer</span><br />but not sure where to start?</>
          )}
        </h3>

        <p className="ipf-desc" style={{ margin: 0, fontSize: "17px", lineHeight: 1.7, color: "rgba(17,24,39,0.72)", maxWidth: "470px" }}>
          {th
            ? <>เริ่มต้นง่าย ๆ กับ <strong style={{ color: "#5f26e5" }}>Buddy Review</strong> เปิดรับโอกาสใหม่ ๆ และเติบโตไปพร้อมกับเรา <span style={{ whiteSpace: "nowrap" }}>สมัครฟรี ไม่มีค่าใช้จ่าย</span></>
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
          background: "radial-gradient(circle, rgba(167,139,250,0.34) 0%, rgba(255,0,137,0.12) 45%, transparent 70%)" }} />

        {/* phone */}
        <div className="ipf-phone" style={{ position: "absolute", left: "50%", top: "50%", width: "240px", height: "490px", transform: "translate(-50%,-50%) rotate(4deg)",
          borderRadius: "42px", padding: "9px", boxSizing: "border-box",
          background: "linear-gradient(145deg, #4b5563 0%, #111827 40%, #374151 100%)",
          boxShadow: "0 40px 70px -24px rgba(17,24,39,0.55), inset 0 0 0 2px rgba(255,255,255,0.12)" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "34px", overflow: "hidden", background: "#e9e1f7" }}>
            <Image src="/hero-illustrations/influencer-prefooter.jpg" alt={th ? "ครีเอเตอร์ถ่ายเซลฟี่" : "Creator taking a selfie"} fill sizes="240px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            <span aria-hidden="true" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "74px", height: "20px", borderRadius: "12px", background: "#0b0b0f" }} />
            {/* Instagram Reels UI over the clip */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)" }} />
            {/* top bar: "Reels" + camera */}
            <div aria-hidden="true" style={{ position: "absolute", top: "38px", left: "14px", right: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#ffffff" }}>
              <span style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>Reels</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="3.5" /></svg>
            </div>
            {/* right action rail */}
            <div aria-hidden="true" style={{ position: "absolute", right: "10px", bottom: "92px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
              color: "#ffffff", fontSize: "10px", fontWeight: 600, filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))" }}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff3040"><path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" /></svg>12.4K
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"><path d="M20.7 16.4A9 9 0 1 0 17 20l4 1.2z" /></svg>842
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M22 3 9.2 10.1M22 3l-7 18-4.8-10.9L2 7z" /></svg>3.1K
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
            </div>
            {/* bottom: creator, caption, audio */}
            <div aria-hidden="true" style={{ position: "absolute", left: "12px", right: "48px", bottom: "16px", color: "#ffffff", display: "flex", flexDirection: "column", gap: "6px",
              textShadow: "0 1px 3px rgba(0,0,0,0.45)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 0 0 1.5px #ffffff" }}>
                  <Image src="/hero-illustrations/influencer-prefooter.jpg" alt="" fill sizes="24px" style={{ objectFit: "cover", objectPosition: "60% 25%" }} />
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>cafe.with.mint</span>
                <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.85)" }}>Follow</span>
              </div>
              <div style={{ fontSize: "11px", lineHeight: 1.35, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                {th ? "รีวิวคาเฟ่ลับย่านอารีย์ ☕ #BuddyReview" : "Hidden café review ☕ #BuddyReview"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", opacity: 0.92 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff"><path d="M9 18V5l12-2v13" stroke="#ffffff" strokeWidth="2" fill="none" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                Original audio · cafe.with.mint
              </div>
            </div>
          </div>
        </div>

        {/* chips — creator engagement around the phone, in Buddy Review CI purple → pink */}
        {/* social platform bubbles */}
        {SOCIALS.map((sc) => (
          <span key={sc.name} className={`ipf-float${sc.hideSm ? " ipf-hide-sm" : ""}`} style={{ position: "absolute", left: sc.left, top: sc.top, width: sc.size, height: sc.size, borderRadius: "50%",
            background: "#ffffff", boxShadow: "0 12px 26px -10px rgba(95,38,229,0.45)", display: "flex", alignItems: "center", justifyContent: "center",
            animationDelay: sc.delay, zIndex: 3 }}>
            <span style={{ position: "relative", width: "56%", height: "56%" }}><Image src={`/social-icons/${sc.name}.png`} alt={sc.label} fill sizes="32px" style={{ objectFit: "contain" }} /></span>
          </span>
        ))}

        {/* likes counter */}
        <span className="ipf-float" style={{ position: "absolute", left: "6%", top: "16%", display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 16px 9px 10px",
          borderRadius: "999px", background: GRAD, color: "#ffffff", fontSize: "15px", fontWeight: 700, transform: "rotate(-6deg)",
          boxShadow: "0 16px 30px -12px rgba(255,0,137,0.6)", animationDelay: "0.2s", zIndex: 3 }}>
          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.8C19.5 16.4 12 21 12 21z" /></svg>
          </span>
          12.4K
        </span>

        {/* comment bubble */}
        <div className="ipf-float ipf-chip" style={{ position: "absolute", left: "2%", top: "44%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px 8px 8px",
          borderRadius: "16px 16px 16px 4px", background: "#ffffff", boxShadow: "0 16px 32px -14px rgba(95,38,229,0.45)", transform: "rotate(-3deg)", animationDelay: "0.6s", zIndex: 3 }}>
          <span style={{ position: "relative", width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/testimonials/nutty.jpg" alt="" fill sizes="26px" style={{ objectFit: "cover" }} />
          </span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>{th ? "คลิปนี้ปังมาก 🔥" : "This clip is fire 🔥"}</span>
        </div>

        {/* engagement stats card */}
        <div className="ipf-float ipf-chip ipf-hide-sm" style={{ position: "absolute", right: "0%", top: "52%", padding: "14px 16px", borderRadius: "18px",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 18px 36px -16px rgba(95,38,229,0.5)", transform: "rotate(3deg)", animationDelay: "1.1s", zIndex: 3 }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#5f26e5", marginBottom: "8px" }}>{th ? "Engagement วันนี้" : "Today's engagement"}</div>
          <div style={{ display: "flex", gap: "14px" }}>
            {[
              { icon: <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />, v: "128K", l: th ? "วิว" : "Views" },
              { icon: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 20l1.1-4A8.4 8.4 0 1 1 21 11.5z" />, v: "842", l: th ? "คอมเมนต์" : "Comments" },
              { icon: <path d="M13 5l8 7-8 7v-4C7 15 4 17 2 20c1-6 4-10 11-11V5z" />, v: "3.1K", l: th ? "แชร์" : "Shares" },
            ].map((m) => (
              <div key={m.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0089">{m.icon}</svg>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>{m.v}</span>
                <span style={{ fontSize: "10px", color: "#6b7280" }}>{m.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* follower growth */}
        <div className="ipf-float ipf-chip ipf-hide-sm" style={{ position: "absolute", left: "0%", bottom: "4%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px 10px 10px",
          borderRadius: "16px", background: "#ffffff", boxShadow: "0 16px 32px -14px rgba(95,38,229,0.45)", transform: "rotate(2deg)", animationDelay: "1.6s", zIndex: 3 }}>
          <span style={{ width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #8b5cf6, #5f25e5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#111827" }}>+2.3K</span>
            <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>{th ? "ผู้ติดตามใหม่" : "New followers"}</span>
          </span>
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
        @media (max-width: 900px){
          .ipf-grid{ grid-template-columns: 1fr !important; padding: 48px 24px !important; gap: 12px !important; }
          .ipf-visual{ height: 460px !important; }
        }
        /* phones: centred copy, one-line pill, and a smaller phone visual */
        @media (max-width: 640px){
          .ipf-grid{ padding: 44px 20px 28px !important; gap: 4px !important; }
          .ipf-copy{ align-items: center !important; text-align: center; gap: 16px !important; }
          .ipf-pill{ padding: 5px 14px 5px 5px !important; gap: 8px !important; }
          .ipf-pill > span:last-child{ font-size: min(12.5px, 3.15vw) !important; white-space: nowrap; }
          .ipf-title{ font-size: min(32px, 8.4vw) !important; line-height: 1.25 !important; }
          .ipf-desc{ font-size: 15px !important; line-height: 1.65 !important; max-width: 340px !important; }
          .ipf-cta{ padding: 13px 28px !important; font-size: 15px !important; margin-top: 4px; }
        }
        @media (max-width: 480px){
          .ipf-visual{ height: 380px !important; max-width: 340px; width: 100%; margin: 0 auto; }
          .ipf-phone{ transform: translate(-50%,-50%) rotate(4deg) scale(0.72) !important; }
          .ipf-visual > div[aria-hidden]{ width: 300px !important; height: 300px !important; }
          .ipf-float, .ipf-chip{ scale: 0.8; }
          .ipf-hide-sm{ display: none !important; }
        }
        @media (prefers-reduced-motion: reduce){ .ipf-float, .ipf-heart{ animation: none; } }
      `}</style>
    </div>
  );
}
