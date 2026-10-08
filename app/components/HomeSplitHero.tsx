"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/animated-shiny-text";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Side = "brand" | "influencer" | null;

// Headline shine: the original navy → purple gradient with a magenta/lavender
// highlight that sweeps back and forth across the text (AnimatedText).
const HEADLINE_SHINE = "linear-gradient(90deg, #14226b 0%, #5f26e5 30%, #c04ad8 50%, #5f26e5 70%, #14226b 100%)";

const COPY = {
  th: {
    eyebrow: "Buddy Review",
    headline1: "Data-Powered",
    headline2: "Influencer Marketing",
    headline3: "For Measurable Growth",
    sublineTop: "From Strategy To Insight,",
    sublineBottom: "We Turn Influence Into Impact.",
    brand: {
      label: "Brand",
      tagline: "เปลี่ยนทุกแคมเปญให้วัดผลได้",
      reveal: "วางแผนแคมเปญ เลือกอินฟลูเอนเซอร์ และดูแลทุกขั้นตอนให้ตรงกับเป้าหมายของแบรนด์",
      mobileDesc: "วางแผนแคมเปญและเลือกอินฟลูเอนเซอร์ให้ตรงเป้าหมายแบรนด์",
      cta: "สำหรับแบรนด์",
    },
    influencer: {
      label: "Influencer",
      tagline: "สร้างงานที่ใช่ จากสิ่งที่คุณรัก",
      reveal: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมข้อมูลและเครื่องมือที่ช่วยให้เข้าใจและพัฒนาโปรไฟล์ของตัวเอง",
      mobileDesc: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมเครื่องมือพัฒนาโปรไฟล์",
      cta: "สำหรับอินฟลูเอนเซอร์",
    },
  },
  en: {
    eyebrow: "Buddy Review",
    headline1: "Data-Powered",
    headline2: "Influencer Marketing",
    headline3: "For Measurable Growth",
    sublineTop: "From Strategy To Insight,",
    sublineBottom: "We Turn Influence Into Impact.",
    brand: {
      label: "Brand",
      tagline: "Turn Every Campaign Into Measurable Results",
      reveal: "Plan campaigns, select influencers, and manage every step to match your brand's goals.",
      mobileDesc: "Plan campaigns and match influencers to your brand's goals.",
      cta: "For Brands",
    },
    influencer: {
      label: "Influencer",
      tagline: "Build Work You Love, From What You're Passionate About",
      reveal: "Discover brand collaboration opportunities, with data and tools to understand and grow your profile.",
      mobileDesc: "Find brand collaborations with tools to grow your profile.",
      cta: "For Influencers",
    },
  },
} as const;

function ArrowIcon() {
  return (
    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  );
}

// Side heading — large colored label, so each half reads at a glance as
// "Brand" vs "Influencer". Plain text (no filled pill) so it isn't mistaken
// for the CTA button below it.
function SideLabel({ side, label, href, size = "desktop" }: { side: "brand" | "influencer"; label: string; href: string; size?: "desktop" | "mobile" }) {
  return (
    <Link href={href} className="split-label" style={{
      fontFamily: "'Pierson','Noto Sans Thai',sans-serif", textDecoration: "none", display: "inline-block",
      color: side === "brand" ? "#5f26e5" : "#ff0089",
      fontWeight: 800, letterSpacing: size === "desktop" ? "0.06em" : "0.02em", lineHeight: 1,
      fontSize: size === "desktop" ? "clamp(24px, 2.4vw, 34px)" : "20px",
      marginBottom: size === "desktop" ? "18px" : 0,
    }}>
      {label}
    </Link>
  );
}

// Shared glass surface — same recipe as BrandHeroVisual on the Brand page
// (translucent white + 20px blur + soft purple drop shadow), a touch more
// opaque here so small text stays legible over the lavender/pink panels.
const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 20px 40px -12px rgba(95,38,229,0.28)",
};

// Both scenes are container-query sized: every length inside is in `cqw`
// (1cqw = 1% of the art's own width), so the whole composition scales as one
// piece — through the hover width animation and down to the small mobile cards.
const SCENE: React.CSSProperties = { position: "relative", width: "100%", aspectRatio: "1341 / 1017", containerType: "inline-size" };

// Brand side — "find the right creators, backed by audience data": a creator
// search bar, a cut-out person on a purple disc, audience insight cards (age,
// gender, engagement) and a recommended-creators card with a fit score.
const AVATARS = ["/trust-influencers/cheese.jpg", "/trust-influencers/ryoko.jpg", "/trust-influencers/puifai.jpg", "/influencers/inf-maihom.jpg", "/influencers/inf-may.jpg"];

function BrandMockArt({ lang }: { lang: "th" | "en" }) {
  const th = lang === "th";
  return (
    <div style={SCENE}>
      {/* purple disc + dotted orbit behind the person */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "4%", top: "13%", width: "64cqw", aspectRatio: "1", borderRadius: "50%",
        border: "0.3cqw dashed rgba(95,38,229,0.32)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", left: "10%", top: "21%", width: "52cqw", aspectRatio: "1", borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, #cdbdf7 0%, #b39cf2 55%, #9d82ec 100%)",
        boxShadow: "inset 0 -4cqw 8cqw rgba(95,38,229,0.18)",
      }} />

      {/* cut-out person working on a laptop, fading out at the waist under the recommendation card */}
      <div style={{
        // larger, with her torso centred on the purple disc (disc centre ≈ 36cqw, 42cqw)
        position: "absolute", left: "18%", top: "20%", width: "58cqw", aspectRatio: "640 / 647",
        WebkitMaskImage: "linear-gradient(180deg, #000 74%, transparent 96%)", maskImage: "linear-gradient(180deg, #000 74%, transparent 96%)",
      }}>
        <Image src="/hero-illustrations/brand-hero.webp" alt={th ? "ทีมแบรนด์วางแผนแคมเปญ" : "Brand team planning a campaign"} fill sizes="(max-width: 899px) 34vw, 260px" style={{ objectFit: "contain", objectPosition: "bottom" }} />
      </div>

      {/* creator search bar */}
      <div className="hsh-float" style={{
        ...GLASS, position: "absolute", left: "0", top: "0", width: "50%", zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw",
        borderRadius: "3.4cqw", padding: "1.4cqw 1.4cqw 1.4cqw 3.4cqw", "--rot": "0deg",
      } as React.CSSProperties}>
        <span style={{ ...KT, fontSize: "2.6cqw", fontWeight: 500, color: "#6b7280", whiteSpace: "nowrap" }}>
          {th ? "ค้นหาครีเอเตอร์ที่ใช่..." : "Find the right creator..."}
        </span>
        <span style={{ width: "7cqw", height: "7cqw", borderRadius: "2.2cqw", background: "#5f26e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="48%" height="48%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </span>
      </div>

      {/* audience age distribution */}
      <div className="hsh-wiggle" style={{
        ...GLASS, position: "absolute", left: "56%", top: "6%", width: "27%", zIndex: 3,
        borderRadius: "3.4cqw", padding: "2.6cqw 2.8cqw 2cqw", "--rot": "1deg", animationDelay: "0.3s",
      } as React.CSSProperties}>
        <p style={{ ...KT, margin: 0, fontSize: "2.3cqw", fontWeight: 800, color: "#5f26e5" }}>{th ? "กลุ่มผู้ชม" : "Audience"}</p>
        <p style={{ ...KT, margin: "0.2cqw 0 1.8cqw", fontSize: "1.8cqw", fontWeight: 600, color: "#9ca3af" }}>{th ? "การกระจายอายุ" : "Age distribution"}</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.4cqw", height: "9cqw" }}>
          {[32, 100, 50, 30, 14].map((h, i) => (
            <div key={i} className="hsh-bar" style={{
              flex: 1, height: `${h}%`, borderRadius: "1cqw", animationDelay: `${0.15 * i}s`,
              background: i === 1 ? "linear-gradient(180deg, #ff0089 0%, #5f26e5 100%)" : "rgba(95,38,229,0.16)",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "1.4cqw", marginTop: "1cqw" }}>
          {["18", "25", "35", "45", "55+"].map((l) => (
            <span key={l} style={{ ...KT, flex: 1, textAlign: "center", fontSize: "1.5cqw", fontWeight: 600, color: "#6b7280" }}>{l}</span>
          ))}
        </div>
      </div>

      {/* gender split donut */}
      <div className="hsh-wiggle" style={{
        ...GLASS, position: "absolute", left: "-2%", top: "37%", width: "25%", zIndex: 3,
        borderRadius: "3.4cqw", padding: "2.4cqw 2.4cqw 2cqw", "--rot": "-1deg", animationDelay: "0.9s",
      } as React.CSSProperties}>
        <p style={{ ...KT, margin: "0 0 1.4cqw", fontSize: "2.2cqw", fontWeight: 800, color: "#5f26e5" }}>{th ? "สัดส่วนเพศ" : "Gender split"}</p>
        <div style={{ position: "relative", width: "13cqw", height: "13cqw", margin: "0 auto" }}>
          <svg viewBox="0 0 36 36" width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}>
            <defs><linearGradient id="hsh-donut" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff0089" /><stop offset="100%" stopColor="#b01ad1" /></linearGradient></defs>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#5f26e5" strokeWidth="5" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="url(#hsh-donut)" strokeWidth="5" strokeDasharray={`${0.72 * 87.96} 87.96`} strokeLinecap="round" />
          </svg>
          <span style={{ ...KT, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.6cqw", fontWeight: 800, color: "#1f1447" }}>72%</span>
        </div>
        <div style={{ ...KT, display: "flex", justifyContent: "center", gap: "1.6cqw", marginTop: "1.4cqw", fontSize: "1.5cqw", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>
          <span><span style={{ color: "#ff0089" }}>●</span> {th ? "หญิง" : "F"} 72%</span>
          <span><span style={{ color: "#5f26e5" }}>●</span> {th ? "ชาย" : "M"} 28%</span>
        </div>
      </div>

      {/* engagement trend */}
      <div className="hsh-wiggle" style={{
        ...GLASS, position: "absolute", left: "58%", top: "43%", width: "24%", zIndex: 3,
        borderRadius: "3.4cqw", padding: "2.4cqw 2.6cqw", "--rot": "-1deg", animationDelay: "1.4s",
      } as React.CSSProperties}>
        <p style={{ ...KT, margin: 0, fontSize: "2.2cqw", fontWeight: 800, color: "#5f26e5" }}>Engagement</p>
        <p style={{ ...KT, margin: "0.2cqw 0 1cqw", fontSize: "1.7cqw", fontWeight: 600, color: "#9ca3af" }}>{th ? "แนวโน้มล่าสุด" : "Latest trend"}</p>
        <svg viewBox="0 0 100 34" width="100%" style={{ display: "block" }}>
          <path d="M2,26 C12,8 22,8 32,20 C42,32 52,30 60,18 C68,6 80,4 98,14" fill="none" stroke="#ff0089" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
        <p style={{ ...KT, margin: "0.8cqw 0 0", fontSize: "2cqw", fontWeight: 800, color: "#16a34a" }}>▲ 18%</p>
      </div>

      {/* recommended creators */}
      <div className="hsh-float" style={{
        ...GLASS, position: "absolute", left: "20%", bottom: "0", width: "62%", zIndex: 4,
        borderRadius: "3.6cqw", padding: "2.8cqw 3cqw", "--rot": "0deg", animationDelay: "0.6s",
        boxShadow: "0 24px 48px -16px rgba(95,38,229,0.35)",
      } as React.CSSProperties}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2cqw", marginBottom: "2cqw" }}>
          <p style={{ ...KT, margin: 0, fontSize: "2.4cqw", fontWeight: 800, color: "#111827", whiteSpace: "nowrap" }}>
            {th ? "ครีเอเตอร์ที่แนะนำสำหรับแบรนด์" : "Recommended creators for your brand"}
          </p>
          <span style={{ ...KT, fontSize: "2.1cqw", fontWeight: 800, color: "#ff0089", whiteSpace: "nowrap" }}>Fit 96%</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {AVATARS.map((src, i) => (
              <span key={src} style={{ position: "relative", width: "6.4cqw", height: "6.4cqw", borderRadius: "50%", overflow: "hidden", border: "0.5cqw solid #ffffff", marginLeft: i ? "-1.8cqw" : 0, flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
                <Image src={src} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
              </span>
            ))}
            <span style={{ ...KT, width: "6.4cqw", height: "6.4cqw", borderRadius: "50%", marginLeft: "-1.8cqw", border: "0.5cqw solid #ffffff", background: "#ede7fd", color: "#5f26e5", fontSize: "1.8cqw", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+12</span>
          </div>
          <span style={{ ...KT, fontSize: "2.1cqw", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "2cqw", padding: "1.4cqw 3cqw", whiteSpace: "nowrap", boxShadow: "0 6px 14px -4px rgba(95,38,229,0.5)" }}>
            {th ? "ดูรายชื่อ" : "View list"}
          </span>
        </div>
      </div>

    </div>
  );
}

const JOBS = [
  { brand: "A", catTh: "สกินแคร์", catEn: "Skincare", deliverable: "TikTok 1 คลิป", deliverableEn: "TikTok · 1 clip", tag: "new" },
  { brand: "B", catTh: "อาหาร", catEn: "Food", deliverable: "IG Reels 1 · Story 2", deliverableEn: "IG Reels 1 · Story 2", tag: "detail" },
  { brand: "C", catTh: "ไลฟ์สไตล์", catEn: "Lifestyle", deliverable: "YouTube 1 คลิป", deliverableEn: "YouTube · 1 video", tag: "" },
] as const;

// Positions avoid the phone (right), creator photo and notification card.
const SOCIAL_BUBBLES = [
  { name: "tiktok",    label: "TikTok",    left: "7%",  top: "6%",  size: "9cqw", rot: -6, delay: "0.2s" },
  { name: "instagram", label: "Instagram", left: "91%", top: "20%", size: "8cqw", rot: 5,  delay: "1.0s" },
  { name: "facebook",  label: "Facebook",  left: "36%", top: "84%", size: "8cqw", rot: -4, delay: "0.6s" },
  { name: "youtube",   label: "YouTube",   left: "12%", top: "86%", size: "7cqw", rot: 6,  delay: "1.4s" },
] as const;

// Influencer side — "find jobs that fit you": a phone showing matched brand
// jobs, a floating creator photo, a new-jobs notification and a like bubble.
function InfluencerMockArt({ lang }: { lang: "th" | "en" }) {
  return (
    <div style={SCENE}>
      {/* phone */}
      <div className="hsh-float" style={{
        position: "absolute", right: "4%", top: "0", width: "48%", height: "100%",
        borderRadius: "7cqw", background: "#1f1447", padding: "1.6cqw",
        boxShadow: "0 30px 60px -16px rgba(120,20,90,0.45)", "--rot": "0deg",
      } as React.CSSProperties}>
        <div style={{
          position: "relative", width: "100%", height: "100%", borderRadius: "5.6cqw", overflow: "hidden",
          background: "linear-gradient(180deg, #fff5fa 0%, #fde7f3 100%)", padding: "4cqw 3.2cqw", boxSizing: "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.8cqw", marginBottom: "2.6cqw" }}>
            <div style={{ position: "relative", width: "6.4cqw", height: "6.4cqw", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "0.4cqw solid #ffffff" }}>
              <Image src="/trust-influencers/ryoko.jpg" alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ ...KT, margin: 0, fontSize: "1.9cqw", fontWeight: 600, color: "#9ca3af", lineHeight: 1.2 }}>{lang === "th" ? "สวัสดี" : "Hello"}</p>
              <p style={{ ...KT, margin: 0, fontSize: "2.4cqw", fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>@creator.name</p>
            </div>
          </div>
          <p style={{ ...KT, margin: "0 0 2cqw", fontSize: "2.8cqw", fontWeight: 800, color: "#111827" }}>
            {lang === "th" ? "งานที่ตรงกับคุณ" : "Jobs matched for you"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8cqw" }}>
            {JOBS.map((j) => (
              <div key={j.brand} style={{ background: "#ffffff", borderRadius: "2.8cqw", padding: "2.2cqw 2.4cqw", boxShadow: "0 4px 12px rgba(255,0,137,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1cqw" }}>
                  <p style={{ ...KT, margin: 0, fontSize: "2.2cqw", fontWeight: 800, color: "#111827", whiteSpace: "nowrap" }}>
                    [{lang === "th" ? "แบรนด์" : "Brand"} {j.brand}] · {lang === "th" ? j.catTh : j.catEn}
                  </p>
                  {j.tag === "new" && (
                    <span style={{ ...KT, fontSize: "1.7cqw", fontWeight: 700, color: "#ff0089", background: "rgba(255,0,137,0.1)", borderRadius: "50px", padding: "0.3cqw 1.4cqw", flexShrink: 0 }}>
                      {lang === "th" ? "ใหม่" : "New"}
                    </span>
                  )}
                </div>
                <p style={{ ...KT, margin: "0.6cqw 0 0", fontSize: "1.8cqw", fontWeight: 600, color: "#6b7280" }}>
                  {lang === "th" ? j.deliverable : j.deliverableEn}
                </p>
                {j.tag === "new" && (
                  <div style={{ ...KT, marginTop: "1.6cqw", textAlign: "center", fontSize: "2cqw", fontWeight: 700, color: "#ffffff", background: "linear-gradient(45deg, #ff5fb3 0%, #ff0089 100%)", borderRadius: "50px", padding: "1cqw 0" }}>
                    {lang === "th" ? "สมัครงาน" : "Apply"}
                  </div>
                )}
                {j.tag === "detail" && (
                  <div style={{ ...KT, marginTop: "1.6cqw", textAlign: "center", fontSize: "2cqw", fontWeight: 700, color: "#ff0089", border: "0.3cqw solid #ff0089", borderRadius: "50px", padding: "0.8cqw 0" }}>
                    {lang === "th" ? "ดูรายละเอียด" : "View details"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating creator photo, overlapping the phone's left edge */}
      <div className="hsh-wiggle" style={{
        position: "absolute", left: "22%", top: "12%", width: "25%", aspectRatio: "3 / 4",
        borderRadius: "4cqw", overflow: "hidden", border: "1cqw solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 40px -12px rgba(120,20,90,0.4)", "--rot": "-6deg", zIndex: 2,
      } as React.CSSProperties}>
        <Image src="/trust-influencers/ryoko.jpg" alt={lang === "th" ? "ครีเอเตอร์" : "Creator"} fill sizes="(max-width: 899px) 20vw, 130px" style={{ objectFit: "cover" }} />
      </div>

      {/* new jobs notification */}
      <div className="hsh-wiggle" style={{
        ...GLASS, position: "absolute", left: "20%", top: "62%", zIndex: 4,
        display: "flex", alignItems: "center", gap: "2cqw", borderRadius: "3.6cqw", padding: "2.2cqw 3cqw 2.2cqw 2.2cqw",
        boxShadow: "0 20px 40px -12px rgba(120,20,90,0.3)", "--rot": "1deg", animationDelay: "0.8s",
      } as React.CSSProperties}>
        <span style={{ width: "6cqw", height: "6cqw", borderRadius: "50%", background: "#ff0089", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </span>
        <div style={{ ...KT, fontSize: "2.2cqw", fontWeight: 700, color: "#111827", lineHeight: 1.35, whiteSpace: "nowrap" }}>
          {lang === "th" ? <>มีงานใหม่ 3 งาน<br />ที่ตรงกับสไตล์คุณ</> : <>3 new jobs<br />that match your style</>}
        </div>
      </div>

      {/* floating social-platform bubbles — the channels creators earn on */}
      {SOCIAL_BUBBLES.map((b) => (
        <div key={b.name} className="hsh-wiggle" style={{
          position: "absolute", left: b.left, top: b.top, width: b.size, height: b.size, zIndex: 3,
          borderRadius: "50%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 12px 24px -8px rgba(120,20,90,0.32)",
          display: "flex", alignItems: "center", justifyContent: "center",
          "--rot": `${b.rot}deg`, animationDelay: b.delay,
        } as React.CSSProperties}>
          <div style={{ position: "relative", width: "58%", height: "58%" }}>
            <Image src={`/social-icons/${b.name}.png`} alt={b.label} fill sizes="40px" style={{ objectFit: "contain" }} />
          </div>
        </div>
      ))}

      {/* like bubble */}
      <div className="hsh-pulse" style={{
        position: "absolute", right: "-3%", top: "58%", width: "10cqw", height: "10cqw", borderRadius: "50%", zIndex: 3,
        background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 12px 24px -6px rgba(255,0,137,0.4)",
      }}>
        <svg width="46%" height="46%" viewBox="0 0 24 24" fill="#ff0089"><path d="M12 21s-7.5-4.7-10-9.3C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.7C19.5 16.3 12 21 12 21z" /></svg>
      </div>
    </div>
  );
}

export default function HomeSplitHero({ lang }: { lang: "th" | "en" }) {
  const t = COPY[lang];
  const [active, setActive] = useState<Side>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enter = useCallback((side: Side) => { if (canHover) setActive(side); }, [canHover]);
  const leave = useCallback(() => { if (canHover) setActive(null); }, [canHover]);

  const brandWidth = active === "brand" ? "67%" : active === "influencer" ? "33%" : "50%";
  const infWidth = active === "influencer" ? "67%" : active === "brand" ? "33%" : "50%";

  return (
    <section
      className="split-hero"
      style={{ position: "relative", background: "transparent", overflow: "visible" }}
    >
      {/* ══ Desktop split hero (hover-driven) ══ */}
      <div
        className="split-hero-desktop"
        style={{
          position: "relative",
          minHeight: "868px",
          display: "flex",
          alignItems: "stretch",
          overflow: "visible",
        }}
      >
        {/* Brand side */}
        <motion.div
          className="split-panel"
          onMouseEnter={() => enter("brand")}
          onMouseLeave={leave}
          animate={{ width: brandWidth }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", minWidth: 0, display: "flex", flexDirection: "column" }}
        >
          {/* background layer — clipped, lowest z — original light lavender
              base kept (so it doesn't clash with the rest of the site), but
              layered with richer purple + blue radial fades for more depth
              and a "premium" feel, instead of going fully dark */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: 0,
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
          }}>
            <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.30) 0%, transparent 72%)" }} />
            {/* bottom fade — blends into the stats strip below, no hard seam */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "160px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }} />
          </div>

          {/* mock art — above background, never clipped */}
          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "190px 6% 0" }}>
            <div className="split-art-inner" style={{ position: "relative", width: "72%", maxWidth: "500px" }}>
              <BrandMockArt lang={lang} />
            </div>
          </div>

          {/* typography — above art */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "left", padding: "0 6% 52px", marginTop: "20px" }}>
            <div><SideLabel side="brand" label={t.brand.label} href={`/${lang}/brand`} /></div>
            <p className="split-tagline" style={{ ...KT, fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 800, letterSpacing: "0.02em", color: "#111827", lineHeight: 1.2, margin: "0 0 14px", maxWidth: "420px" }}>
              {t.brand.tagline}
            </p>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0",
              opacity: active === "brand" ? 1 : 0,
              transform: active === "brand" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
              pointerEvents: active === "brand" ? "auto" : "none",
            }}>
              <p style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#111827", margin: "0 0 18px" }}>
                {t.brand.reveal}
              </p>
              <Link href={`/${lang}/brand`} className="split-cta" style={{
                ...KT, position: "relative", zIndex: 3, display: "inline-flex", alignItems: "center", gap: "10px",
                background: "#5f26e5", color: "#ffffff", borderRadius: "50px", padding: "13px 12px 13px 26px",
                fontSize: "15px", fontWeight: 600, textDecoration: "none",
                boxShadow: "0 10px 24px rgba(95,38,229,0.35)",
              }}>
                {t.brand.cta}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Influencer side */}
        <motion.div
          className="split-panel"
          onMouseEnter={() => enter("influencer")}
          onMouseLeave={leave}
          animate={{ width: infWidth }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", minWidth: 0, display: "flex", flexDirection: "column" }}
        >
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: 0,
            background: "linear-gradient(200deg, #fdeef6 0%, #f9dced 45%, #f2c9e2 100%)",
          }}>
            <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,137,0.18) 0%, transparent 70%)" }} />
            {/* bottom fade — blends into the stats strip below, no hard seam */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "160px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }} />
          </div>

          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "190px 6% 0" }}>
            <div className="split-art-inner" style={{ position: "relative", width: "72%", maxWidth: "480px" }}>
              <InfluencerMockArt lang={lang} />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, textAlign: "right", padding: "0 6% 52px", marginTop: "20px" }}>
            <div><SideLabel side="influencer" label={t.influencer.label} href={`/${lang}/influencer`} /></div>
            <p className="split-tagline" style={{ ...KT, fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 800, letterSpacing: "0.02em", color: "#111827", lineHeight: 1.2, margin: "0 0 14px", maxWidth: "420px", marginLeft: "auto" }}>
              {t.influencer.tagline}
            </p>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0 0 0 auto",
              opacity: active === "influencer" ? 1 : 0,
              transform: active === "influencer" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
              pointerEvents: active === "influencer" ? "auto" : "none",
            }}>
              <p style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#111827", margin: "0 0 18px" }}>
                {t.influencer.reveal}
              </p>
              <Link href={`/${lang}/influencer`} className="split-cta" style={{
                ...KT, position: "relative", zIndex: 3, display: "inline-flex", alignItems: "center", gap: "10px",
                background: "#ff0089", color: "#ffffff", borderRadius: "50px", padding: "13px 12px 13px 26px",
                fontSize: "15px", fontWeight: 600, textDecoration: "none",
                boxShadow: "0 10px 24px rgba(255,0,137,0.32)",
              }}>
                {t.influencer.cta}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Center main message — stays visible while a side is hovered, and
            slides a little toward the narrowed side so the widened side's art
            never runs into it */}
        <div className="split-hero-center" style={{
          position: "absolute", top: 0, left: "50%", zIndex: 5,
          transform: `translateX(calc(-50% + ${active === "brand" ? "5vw" : active === "influencer" ? "-5vw" : "0px"}))`,
          transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          width: "min(760px, 44vw)", textAlign: "center", paddingTop: "210px",
          pointerEvents: "none",
        }}>
          <span style={{ ...KT, fontSize: "16px", fontWeight: 800, letterSpacing: "0.01em", color: "#111827" }}>
            {t.eyebrow}
          </span>
          <AnimatedText
            className="p-0"
            text={<>{t.headline1}<br />{t.headline2}<br />{t.headline3}</>}
            gradientColors={HEADLINE_SHINE}
            gradientAnimationDuration={3}
            textStyle={{ ...KT, fontWeight: 800, fontSize: "clamp(28px, 3.3vw, 48px)", lineHeight: 1.2, margin: "14px 0" }}
          />
          <p style={{ ...KT, color: "#3a3350", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, margin: 0 }}>
            {t.sublineTop}<br />{t.sublineBottom}
          </p>
        </div>
      </div>

      {/* ══ Mobile / tablet static split (no hover, no active state) ══ */}
      <div className="split-hero-mobile" style={{ display: "none", position: "relative" }}>
        <div style={{ textAlign: "center", padding: "128px 20px 12px" }}>
          <span style={{ ...KT, fontSize: "13px", fontWeight: 800, letterSpacing: "0.01em", color: "#111827" }}>
            {t.eyebrow}
          </span>
          <AnimatedText
            className="p-0"
            text={<>{t.headline1}<br />{t.headline2}<br />{t.headline3}</>}
            gradientColors={HEADLINE_SHINE}
            gradientAnimationDuration={3}
            textStyle={{ ...KT, fontWeight: 800, fontSize: "28px", lineHeight: 1.2, margin: "8px 0" }}
          />
          <p style={{ ...KT, color: "#3a3350", fontSize: "13.5px", lineHeight: 1.55, margin: "0 auto", maxWidth: "460px" }}>
            {t.sublineTop}<br />{t.sublineBottom}
          </p>
        </div>

        {/* the two cards share one subgrid, so art / label / tagline / description / CTA sit on the same rows */}
        <div className="hsm-grid" style={{ padding: "20px 12px 32px" }}>
          {/* Brand mobile side */}
          <div style={{
            flex: 1, minWidth: 0, borderRadius: "20px", overflow: "hidden", position: "relative",
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
            padding: "18px 12px 22px",
          }} className="hsm-card">
            <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.18) 0%, transparent 72%)" }} />
            <div className="hsm-art"><div style={{ width: "78%", position: "relative" }}>
              <BrandMockArt lang={lang} />
            </div></div>
            <div style={{ marginTop: "12px", position: "relative" }}>
              <SideLabel side="brand" label={t.brand.label} href={`/${lang}/brand`} size="mobile" />
            </div>
            <p style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#111827", textAlign: "center", margin: "6px 0 0", position: "relative" }}>
              {t.brand.tagline}
            </p>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#111827", textAlign: "center", margin: "10px 0 0", position: "relative" }}>
              {t.brand.mobileDesc}
            </p>
            <Link href={`/${lang}/brand`} style={{
              ...KT, display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#5f26e5", color: "#ffffff", borderRadius: "50px", padding: "10px 10px 10px 18px",
              fontSize: "13px", fontWeight: 600, textDecoration: "none", marginTop: "16px",
              boxShadow: "0 8px 18px rgba(95,38,229,0.32)", justifySelf: "center", alignSelf: "start",
            }}>
              {t.brand.cta}
              <ArrowIcon />
            </Link>
          </div>

          {/* Influencer mobile side */}
          <div style={{
            flex: 1, minWidth: 0, borderRadius: "20px", overflow: "hidden", position: "relative",
            background: "linear-gradient(200deg, #fdeef6 0%, #f9dced 45%, #f2c9e2 100%)",
            padding: "18px 12px 22px",
          }} className="hsm-card">
            <div className="hsm-art"><div style={{ width: "70%" }}>
              <InfluencerMockArt lang={lang} />
            </div></div>
            <div style={{ marginTop: "12px" }}>
              <SideLabel side="influencer" label={t.influencer.label} href={`/${lang}/influencer`} size="mobile" />
            </div>
            <p style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#111827", textAlign: "center", margin: "6px 0 0" }}>
              {t.influencer.tagline}
            </p>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#111827", textAlign: "center", margin: "10px 0 0" }}>
              {t.influencer.mobileDesc}
            </p>
            <Link href={`/${lang}/influencer`} style={{
              ...KT, display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#ff0089", color: "#ffffff", borderRadius: "50px", padding: "10px 10px 10px 18px",
              fontSize: "13px", fontWeight: 600, textDecoration: "none", marginTop: "16px",
              boxShadow: "0 8px 18px rgba(255,0,137,0.3)", justifySelf: "center", alignSelf: "start",
            }}>
              {t.influencer.cta}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .hsm-grid{ display: grid; grid-template-columns: 1fr 1fr; column-gap: 10px; }
        .hsm-card{ display: grid; grid-row: span 5; grid-template-rows: subgrid; row-gap: 0; justify-items: center; align-items: start; }
        .hsm-art{ width: 100%; display: flex; align-items: center; justify-content: center; align-self: center; }
        @keyframes hsh-float { 0%,100% { transform: translateY(0) rotate(var(--rot, 0deg)); } 50% { transform: translateY(-1.2cqw) rotate(var(--rot, 0deg)); } }
        @keyframes hsh-wiggle { 0%,100% { transform: translateY(0) rotate(var(--rot, 0deg)); } 50% { transform: translateY(-1.8cqw) rotate(calc(var(--rot, 0deg) * -1)); } }
        @keyframes hsh-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes hsh-bar { from { transform: scaleY(0.7); } to { transform: scaleY(1); } }
        .hsh-float { transform: rotate(var(--rot, 0deg)); animation: hsh-float 5s ease-in-out infinite; }
        .hsh-wiggle { transform: rotate(var(--rot, 0deg)); animation: hsh-wiggle 3.6s ease-in-out infinite; }
        .hsh-pulse { animation: hsh-pulse 2.2s ease-in-out infinite; }
        .hsh-bar { transform-origin: bottom; animation: hsh-bar 1.6s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .hsh-float, .hsh-wiggle, .hsh-pulse, .hsh-bar { animation: none; }
        }
        /* Layout switch is purely a width breakpoint — never gated on hover
           capability — so the mobile static structure is guaranteed on small
           screens regardless of pointer/hover support. */
        @media (max-width: 899px) {
          .split-hero-desktop { display: none !important; }
          .split-hero-mobile { display: block !important; }
        }
        @media (min-width: 900px) {
          .split-hero-mobile { display: none !important; }
        }
        /* Narrow desktop (small MacBook widths, or the browser window just
           resized down before hitting the 900px mobile breakpoint): the
           absolutely-centered hero heading and each side panel's own
           label/tagline text used to have no built-in clearance from each
           other, so as the window narrowed the panel taglines could reach
           in far enough to visually collide with the centered heading.
           Give the center block less width and push the panel text further
           toward its own outer edge so there's always a clear gap between
           them at these widths. */
        @media (min-width: 900px) and (max-width: 1280px) {
          .split-hero-center { width: min(460px, 34vw) !important; padding-top: 180px !important; }
          .split-hero-center h1 { font-size: clamp(28px, 3.3vw, 48px) !important; }
          .split-art, .split-panel > div:last-child { padding-left: 8% !important; padding-right: 8% !important; }
          /* The art illustration (and the small badge icons floating on it)
             was still reaching in far enough at this width to collide with
             the shrunk headline — shrinking the headline's font alone
             wasn't enough since the art's own width didn't change. Pull the
             art in too so its badges stay clear of the center column. */
          .split-art-inner { width: 56% !important; }
          .split-tagline { font-size: clamp(24px, 3.2vw, 38px) !important; }
        }
        /* Interaction (width expand / reveal / fade) is additionally gated to
           fine-pointer hover devices so a touch device that somehow renders
           the desktop tree (e.g. a touch laptop at wide viewport) never gets
           a sticky-hover state from a tap. */
        @media not all and (hover: hover) and (pointer: fine) {
          .split-hero-desktop .split-panel { pointer-events: auto; }
        }
      `}</style>
    </section>
  );
}
