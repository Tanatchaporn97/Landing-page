"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Side = "brand" | "influencer" | null;

const COPY = {
  th: {
    eyebrow: "Buddy Review Connects",
    headline1: "DATA-POWERED",
    headline2: "INFLUENCER MARKETING",
    headline3: "FOR MEASURABLE GROWTH",
    sublineTop: "From Strategy To Insight,",
    sublineBottom: "We Turn Influence Into Impact.",
    brand: {
      label: "BRAND",
      tagline: "เปลี่ยนทุกแคมเปญให้วัดผลได้",
      reveal: "วางแผนแคมเปญ เลือกอินฟลูเอนเซอร์ และดูแลทุกขั้นตอนให้ตรงกับเป้าหมายของแบรนด์",
      mobileDesc: "วางแผนแคมเปญและเลือกอินฟลูเอนเซอร์ให้ตรงเป้าหมายแบรนด์",
      cta: "สำหรับแบรนด์",
    },
    influencer: {
      label: "INFLUENCER",
      tagline: "สร้างงานที่ใช่ จากสิ่งที่คุณรัก",
      reveal: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมข้อมูลและเครื่องมือที่ช่วยให้เข้าใจและพัฒนาโปรไฟล์ของตัวเอง",
      mobileDesc: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมเครื่องมือพัฒนาโปรไฟล์",
      cta: "สำหรับอินฟลูเอนเซอร์",
    },
  },
  en: {
    eyebrow: "Buddy Review Connects",
    headline1: "DATA-POWERED",
    headline2: "INFLUENCER MARKETING",
    headline3: "FOR MEASURABLE GROWTH",
    sublineTop: "From Strategy To Insight,",
    sublineBottom: "We Turn Influence Into Impact.",
    brand: {
      label: "BRAND",
      tagline: "Turn Every Campaign Into Measurable Results",
      reveal: "Plan campaigns, select influencers, and manage every step to match your brand's goals.",
      mobileDesc: "Plan campaigns and match influencers to your brand's goals.",
      cta: "For Brands",
    },
    influencer: {
      label: "INFLUENCER",
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

// Brand-side mock art — built from CSS/SVG (no image asset), matching a
// glassmorphic "data-insight poster" reference: a tilted glass panel holding
// a performance chart, with a floating alert card and a checkmark badge,
// framed by a purple/pink gradient blob and a magnifying-glass accent.
function BrandMockArt() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1341 / 1017" }}>
      {/* soft ambient ground-shadow — wide, low, heavily blurred ellipse so it
          reads as natural falloff under the panel rather than a glowing orb */}
      <div style={{
        position: "absolute", right: "-10%", bottom: "-14%", width: "92%", height: "52%", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(95,38,229,0.30) 0%, rgba(95,38,229,0.14) 50%, transparent 78%)",
        filter: "blur(46px)",
      }} />

      {/* the tilted glass panel */}
      <div style={{
        position: "absolute", right: "4%", top: "10%", width: "62%", height: "72%",
        borderRadius: "28px", transform: "rotate(6deg)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(216,203,247,0.85) 100%)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        border: "2px solid rgba(95,38,229,0.30)",
        boxShadow: "0 30px 60px -12px rgba(56,20,120,0.42)",
      }}>
        {/* chart line + dots */}
        <svg viewBox="0 0 220 160" width="100%" height="100%" style={{ position: "absolute", inset: 0, padding: "22px", boxSizing: "border-box" }}>
          <polyline points="20,120 60,95 100,130 140,80 180,55 200,35" fill="none" stroke="#5f26e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7" opacity="0.65" />
          <polyline points="20,120 60,95 100,130 140,80 180,55 200,35" fill="none" stroke="#5f26e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {[[20,120],[60,95],[100,130],[140,80],[180,55],[200,35]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5.5" fill="#5f26e5" stroke="#fff" strokeWidth="2.5" />
          ))}
        </svg>
      </div>

      {/* floating alert card, top-left of the panel */}
      <div style={{
        position: "absolute", left: "2%", top: "6%", width: "38%",
        display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px",
        borderRadius: "16px", background: "rgba(255,255,255,0.9)",
        boxShadow: "0 16px 32px -10px rgba(56,20,120,0.28)",
      }}>
        <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#5f26e5", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
        </span>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <span style={{ height: "6px", borderRadius: "3px", background: "#9186c4", width: "80%" }} />
          <span style={{ height: "6px", borderRadius: "3px", background: "#b3a9d6", width: "55%" }} />
        </div>
      </div>

      {/* checkmark badge, top-right — glassmorphism */}
      <div style={{
        position: "absolute", right: "0%", top: "2%", width: "15%", aspectRatio: "1/1", borderRadius: "50%",
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 12px 24px -6px rgba(56,20,120,0.35)", border: "1.5px solid rgba(255,255,255,0.7)",
      }}>
        <svg width="42%" height="42%" viewBox="0 0 24 24" fill="none" stroke="#5f26e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </div>

      {/* magnifying glass, bottom-left — glassmorphism lens */}
      <div style={{ position: "absolute", left: "0%", bottom: "4%", width: "30%", aspectRatio: "1/1", filter: "drop-shadow(0 14px 20px rgba(56,20,120,0.35))" }}>
        <div style={{
          position: "absolute", left: "14%", top: "14%", width: "53%", height: "53%", borderRadius: "50%",
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "3px solid rgba(95,38,229,0.85)",
        }} />
        <div style={{
          position: "absolute", left: "59%", top: "55%", width: "40%", height: "9%",
          background: "#5f26e5", borderRadius: "50px",
          transform: "rotate(45deg)", transformOrigin: "left center",
        }} />
      </div>
    </div>
  );
}

// Influencer-side mock art — same glassmorphic poster structure as
// BrandMockArt (soft pink primary with a touch of purple instead of
// purple-led), themed around "sign up as a reviewer/influencer easily":
// a profile/application card with a star rating and an "apply" pill,
// a floating new-creator card, a heart badge, and a sparkle accent.
function InfluencerMockArt() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1341 / 1017" }}>
      {/* soft ambient ground-shadow — wide, low, heavily blurred ellipse so it
          reads as natural falloff under the panel rather than a glowing orb */}
      <div style={{
        position: "absolute", right: "-10%", bottom: "-14%", width: "92%", height: "52%", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,0,137,0.26) 0%, rgba(255,0,137,0.12) 50%, transparent 78%)",
        filter: "blur(46px)",
      }} />

      {/* the tilted glass panel — a creator profile/application card */}
      <div style={{
        position: "absolute", right: "4%", top: "10%", width: "62%", height: "72%",
        borderRadius: "28px", transform: "rotate(6deg)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(247,205,232,0.85) 100%)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        border: "2px solid rgba(255,0,137,0.28)",
        boxShadow: "0 30px 60px -12px rgba(120,20,90,0.40)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10%",
        padding: "10%", boxSizing: "border-box",
      }}>
        <span style={{
          width: "34%", aspectRatio: "1/1", borderRadius: "50%",
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          border: "1.5px solid rgba(255,255,255,0.7)", boxShadow: "0 10px 20px -6px rgba(255,0,137,0.35)",
        }}>
          <svg width="46%" height="46%" viewBox="0 0 24 24" fill="none" stroke="#ff0089" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {[0,1,2,3,4].map((i) => (
            <svg key={i} width="11%" viewBox="0 0 24 24" fill="#ff0089"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6L12 2z" /></svg>
          ))}
        </div>
        <span style={{
          ...KT, fontSize: "12px", fontWeight: 700, color: "#fff",
          background: "linear-gradient(45deg, #ff5fb3 0%, #ff0089 100%)", borderRadius: "50px", padding: "6% 14%",
        }}>
          {"Apply Now"}
        </span>
      </div>

      {/* floating "new creator" card, top-left of the panel — glassmorphism */}
      <div style={{
        position: "absolute", left: "2%", top: "6%", width: "38%",
        display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px",
        borderRadius: "16px", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 16px 32px -10px rgba(120,20,90,0.24)",
      }}>
        <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#ff0089", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6" /></svg>
        </span>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <span style={{ height: "6px", borderRadius: "3px", background: "#d6559f", width: "80%" }} />
          <span style={{ height: "6px", borderRadius: "3px", background: "#e58ebc", width: "55%" }} />
        </div>
      </div>

      {/* heart badge, top-right — glassmorphism */}
      <div style={{
        position: "absolute", right: "0%", top: "2%", width: "15%", aspectRatio: "1/1", borderRadius: "50%",
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 12px 24px -6px rgba(255,0,137,0.35)", border: "1.5px solid rgba(255,255,255,0.7)",
      }}>
        <svg width="46%" height="46%" viewBox="0 0 24 24" fill="#ff0089"><path d="M12 21s-7.5-4.7-10-9.3C.4 8 2 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c4 0 5.6 4 4 7.7C19.5 16.3 12 21 12 21z" /></svg>
      </div>

      {/* sparkle accent, bottom-left — glassmorphism */}
      <div style={{ position: "absolute", left: "0%", bottom: "4%", width: "30%" }}>
        <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ filter: "drop-shadow(0 14px 20px rgba(120,20,90,0.3))" }}>
          <circle cx="32" cy="32" r="22" fill="rgba(255,255,255,0.55)" stroke="rgba(255,0,137,0.85)" strokeWidth="4" style={{ backdropFilter: "blur(20px)" }} />
          <path d="M32 20l3.2 8.8L44 32l-8.8 3.2L32 44l-3.2-8.8L20 32l8.8-3.2L32 20z" fill="#ff0089" />
        </svg>
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
            position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: "0 28px 28px 0",
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
          }}>
            <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.30) 0%, transparent 72%)" }} />
            {/* bottom fade — blends into the stats strip below, no hard seam */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "160px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }} />
          </div>

          {/* mock art — above background, never clipped */}
          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "190px 6% 0" }}>
            <div style={{ position: "relative", width: "72%", maxWidth: "500px" }}>
              <BrandMockArt />
            </div>
          </div>

          {/* typography — above art */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "left", padding: "0 6% 52px" }}>
            <Link href={`/${lang}/brand`} className="split-label" style={{
              ...KT, textDecoration: "none", display: "inline-block", fontWeight: 700,
              fontSize: "13px", letterSpacing: "0.08em", color: "#5f26e5",
              border: "1.5px solid rgba(95,38,229,0.4)", borderRadius: "50px", padding: "6px 16px",
              marginBottom: "16px",
            }}>
              {t.brand.label}
            </Link>
            <p style={{ ...KT, fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 800, letterSpacing: "0.02em", color: "#1f1447", lineHeight: 1.2, margin: "0 0 14px" }}>
              {t.brand.tagline}
            </p>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0",
              opacity: active === "brand" ? 1 : 0,
              transform: active === "brand" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
              pointerEvents: active === "brand" ? "auto" : "none",
            }}>
              <p style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#3a2f61", margin: "0 0 18px" }}>
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
            position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: "28px 0 0 28px",
            background: "linear-gradient(200deg, #fdeef6 0%, #f9dced 45%, #f2c9e2 100%)",
          }}>
            <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,137,0.18) 0%, transparent 70%)" }} />
            {/* bottom fade — blends into the stats strip below, no hard seam */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "160px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }} />
          </div>

          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "190px 6% 0" }}>
            <div style={{ position: "relative", width: "72%", maxWidth: "480px" }}>
              <InfluencerMockArt />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, textAlign: "right", padding: "0 6% 52px" }}>
            <Link href={`/${lang}/influencer`} className="split-label" style={{
              ...KT, textDecoration: "none", display: "inline-block", fontWeight: 700,
              fontSize: "13px", letterSpacing: "0.08em", color: "#ff0089",
              border: "1.5px solid rgba(255,0,137,0.4)", borderRadius: "50px", padding: "6px 16px",
              marginBottom: "16px",
            }}>
              {t.influencer.label}
            </Link>
            <p style={{ ...KT, fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 800, letterSpacing: "0.02em", color: "#4a1338", lineHeight: 1.2, margin: "0 0 14px" }}>
              {t.influencer.tagline}
            </p>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0 0 0 auto",
              opacity: active === "influencer" ? 1 : 0,
              transform: active === "influencer" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
              pointerEvents: active === "influencer" ? "auto" : "none",
            }}>
              <p style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#5c2a4d", margin: "0 0 18px" }}>
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

        {/* Center main message — fades fully out on hover, never has its own box/panel */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 5,
          width: "min(760px, 44vw)", textAlign: "center", paddingTop: "180px",
          opacity: active ? 0 : 1,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}>
          <span style={{ ...KT, fontSize: "16px", fontWeight: 800, letterSpacing: "0.01em", color: "#111827" }}>
            {t.eyebrow}
          </span>
          <h1 className="uppercase" style={{
            ...KT, fontWeight: 800,
            background: "linear-gradient(45deg, #14226b 0%, #5f26e5 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            fontSize: "clamp(24px, 3.6vw, 44px)", lineHeight: 1.25, margin: "14px 0",
          }}>
            {t.headline1}<br />{t.headline2}<br />{t.headline3}
          </h1>
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
          <h1 className="uppercase" style={{
            ...KT, fontWeight: 800,
            background: "linear-gradient(45deg, #14226b 0%, #5f26e5 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            fontSize: "clamp(18px, 5.2vw, 24px)", lineHeight: 1.3, margin: "8px 0",
          }}>
            {t.headline1}<br />{t.headline2}<br />{t.headline3}
          </h1>
          <p style={{ ...KT, color: "#3a3350", fontSize: "13.5px", lineHeight: 1.55, margin: "0 auto", maxWidth: "460px" }}>
            {t.sublineTop}<br />{t.sublineBottom}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: "10px", padding: "20px 12px 32px" }}>
          {/* Brand mobile side */}
          <div style={{
            flex: 1, minWidth: 0, borderRadius: "20px", overflow: "hidden", position: "relative",
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 12px 22px",
          }}>
            <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.18) 0%, transparent 72%)" }} />
            <div style={{ width: "78%", position: "relative" }}>
              <BrandMockArt />
            </div>
            <Link href={`/${lang}/brand`} style={{
              ...KT, textDecoration: "none", fontWeight: 800, color: "#1f1447",
              fontSize: "20px", marginTop: "12px", position: "relative",
            }}>
              {t.brand.label}
            </Link>
            <p style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#5f26e5", textAlign: "center", margin: "6px 0 0", position: "relative" }}>
              {t.brand.tagline}
            </p>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#3a2f61", textAlign: "center", margin: "10px 0 0", position: "relative" }}>
              {t.brand.mobileDesc}
            </p>
            <Link href={`/${lang}/brand`} style={{
              ...KT, display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#5f26e5", color: "#ffffff", borderRadius: "50px", padding: "10px 10px 10px 18px",
              fontSize: "13px", fontWeight: 600, textDecoration: "none", marginTop: "16px",
              boxShadow: "0 8px 18px rgba(95,38,229,0.32)",
            }}>
              {t.brand.cta}
              <ArrowIcon />
            </Link>
          </div>

          {/* Influencer mobile side */}
          <div style={{
            flex: 1, minWidth: 0, borderRadius: "20px", overflow: "hidden", position: "relative",
            background: "linear-gradient(200deg, #fdeef6 0%, #f9dced 45%, #f2c9e2 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 12px 22px",
          }}>
            <div style={{ width: "70%" }}>
              <InfluencerMockArt />
            </div>
            <Link href={`/${lang}/influencer`} style={{
              ...KT, textDecoration: "none", fontWeight: 800, color: "#4a1338",
              fontSize: "20px", marginTop: "12px",
            }}>
              {t.influencer.label}
            </Link>
            <p style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#ff0089", textAlign: "center", margin: "6px 0 0" }}>
              {t.influencer.tagline}
            </p>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#5c2a4d", textAlign: "center", margin: "10px 0 0" }}>
              {t.influencer.mobileDesc}
            </p>
            <Link href={`/${lang}/influencer`} style={{
              ...KT, display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#ff0089", color: "#ffffff", borderRadius: "50px", padding: "10px 10px 10px 18px",
              fontSize: "13px", fontWeight: 600, textDecoration: "none", marginTop: "16px",
              boxShadow: "0 8px 18px rgba(255,0,137,0.3)",
            }}>
              {t.influencer.cta}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
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
