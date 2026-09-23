"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Side = "brand" | "influencer" | null;

const GRADIENT_TEXT: React.CSSProperties = {
  background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const COPY = {
  th: {
    eyebrow: "BUDDY REVIEW",
    headline: "DATA-DRIVEN INFLUENCER MARKETING AGENCY",
    subline: "วางแผนแคมเปญและเลือกอินฟลูเอนเซอร์ให้เหมาะกับเป้าหมายของแบรนด์ ด้วยข้อมูลและกลยุทธ์ที่ชัดเจน",
    brand: {
      label: "BRAND",
      reveal: "วางแผนแคมเปญ เลือกอินฟลูเอนเซอร์ และดูแลทุกขั้นตอนให้ตรงกับเป้าหมายของแบรนด์",
      mobileDesc: "วางแผนแคมเปญและเลือกอินฟลูเอนเซอร์ให้ตรงเป้าหมายแบรนด์",
      cta: "สำหรับแบรนด์",
    },
    influencer: {
      label: "INFLUENCER",
      reveal: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมข้อมูลและเครื่องมือที่ช่วยให้เข้าใจและพัฒนาโปรไฟล์ของตัวเอง",
      mobileDesc: "ค้นหาโอกาสร่วมงานกับแบรนด์ พร้อมเครื่องมือพัฒนาโปรไฟล์",
      cta: "สำหรับอินฟลูเอนเซอร์",
    },
  },
  en: {
    eyebrow: "BUDDY REVIEW",
    headline: "DATA-DRIVEN INFLUENCER MARKETING AGENCY",
    subline: "We plan campaigns and match influencers to your brand's goals, backed by clear data and strategy.",
    brand: {
      label: "BRAND",
      reveal: "Plan campaigns, select influencers, and manage every step to match your brand's goals.",
      mobileDesc: "Plan campaigns and match influencers to your brand's goals.",
      cta: "For Brands",
    },
    influencer: {
      label: "INFLUENCER",
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
          minHeight: "700px",
          display: "flex",
          alignItems: "stretch",
          paddingTop: "168px",
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
          {/* background layer — clipped, lowest z */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", borderRadius: "0 28px 28px 0",
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
          }}>
            <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.22) 0%, transparent 70%)" }} />
          </div>

          {/* mock art — above background, never clipped */}
          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "112px 6% 0" }}>
            <div style={{ position: "relative", width: "72%", maxWidth: "500px" }}>
              <Image src="/hero-illustrations/brand-campaign-mockup.png" alt="" width={1341} height={1017} priority
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 24px 48px rgba(31,20,74,0.28))" }} />
            </div>
          </div>

          {/* typography — above art */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 6% 52px" }}>
            <Link href={`/${lang}/brand`} className="split-label" style={{
              ...KT, textDecoration: "none", display: "inline-block", fontWeight: 800,
              fontSize: "clamp(30px, 3.6vw, 46px)", letterSpacing: "0.02em", color: "#1f1447",
              marginBottom: "14px",
            }}>
              {t.brand.label}
            </Link>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0 auto",
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
          </div>

          <div className="split-art" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "112px 6% 0" }}>
            <div style={{ position: "relative", width: "72%", maxWidth: "480px" }}>
              <Image src="/hero-illustrations/influencer-content-mockup.png" alt="" width={1092} height={1190} priority
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 24px 48px rgba(120,20,80,0.26))" }} />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 6% 52px" }}>
            <Link href={`/${lang}/influencer`} className="split-label" style={{
              ...KT, textDecoration: "none", display: "inline-block", fontWeight: 800,
              fontSize: "clamp(30px, 3.6vw, 46px)", letterSpacing: "0.02em", color: "#4a1338",
              marginBottom: "14px",
            }}>
              {t.influencer.label}
            </Link>
            <div className="split-reveal" style={{
              maxWidth: "420px", margin: "0 auto",
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
          width: "min(600px, 88%)", textAlign: "center", paddingTop: "132px",
          opacity: active ? 0 : 1,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}>
          <span style={{ ...KT, fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", color: "#5f26e5" }}>
            {t.eyebrow}
          </span>
          <h1 className="uppercase" style={{
            ...KT, ...GRADIENT_TEXT, fontWeight: 800,
            fontSize: "clamp(20px, 2.6vw, 32px)", lineHeight: 1.35, margin: "14px 0",
          }}>
            {t.headline}
          </h1>
          <p style={{ ...KT, color: "#3a3350", fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.65, margin: 0 }}>
            {t.subline}
          </p>
        </div>
      </div>

      {/* ══ Mobile / tablet static split (no hover, no active state) ══ */}
      <div className="split-hero-mobile" style={{ display: "none", position: "relative" }}>
        <div style={{ textAlign: "center", padding: "128px 20px 12px" }}>
          <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.16em", color: "#5f26e5" }}>
            {t.eyebrow}
          </span>
          <h1 className="uppercase" style={{
            ...KT, ...GRADIENT_TEXT, fontWeight: 800,
            fontSize: "clamp(18px, 5.2vw, 24px)", lineHeight: 1.35, margin: "8px 0",
          }}>
            {t.headline}
          </h1>
          <p style={{ ...KT, color: "#3a3350", fontSize: "13.5px", lineHeight: 1.55, margin: "0 auto", maxWidth: "460px" }}>
            {t.subline}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: "10px", padding: "20px 12px 32px" }}>
          {/* Brand mobile side */}
          <div style={{
            flex: 1, minWidth: 0, borderRadius: "20px", overflow: "hidden", position: "relative",
            background: "linear-gradient(160deg, #eef0fd 0%, #e2e2fa 45%, #d3d4f4 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 12px 22px",
          }}>
            <div style={{ width: "78%" }}>
              <Image src="/hero-illustrations/brand-campaign-mockup.png" alt="" width={1341} height={1017}
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 14px 26px rgba(31,20,74,0.26))" }} />
            </div>
            <Link href={`/${lang}/brand`} style={{
              ...KT, textDecoration: "none", fontWeight: 800, color: "#1f1447",
              fontSize: "20px", marginTop: "12px",
            }}>
              {t.brand.label}
            </Link>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#3a2f61", textAlign: "center", margin: "16px 0 0" }}>
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
              <Image src="/hero-illustrations/influencer-content-mockup.png" alt="" width={1092} height={1190}
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 14px 26px rgba(120,20,80,0.24))" }} />
            </div>
            <Link href={`/${lang}/influencer`} style={{
              ...KT, textDecoration: "none", fontWeight: 800, color: "#4a1338",
              fontSize: "20px", marginTop: "12px",
            }}>
              {t.influencer.label}
            </Link>
            <p style={{ ...KT, fontSize: "12.5px", lineHeight: 1.5, color: "#5c2a4d", textAlign: "center", margin: "16px 0 0" }}>
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
