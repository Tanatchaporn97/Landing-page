"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import BackgroundShader from "@/components/ui/background-shader";

// mesh-gradient palettes per side, matched to the pastel lilac / blush tones of the panels
const MESH = {
  brand: ["#f7f5ff", "#e4dafc", "#f1ecff", "#cdbef9"],
  influencer: ["#fff4f9", "#f8cbe2", "#ffe3ef", "#f2acd0"],
};
import { COPY, BrandMockArt, InfluencerMockArt, ArrowIcon, HEADLINE_SHINE } from "./HomeSplitHero";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
type Side = "brand" | "influencer" | null;
const EASE = [0.22, 1, 0.36, 1] as const;

// Homepage hero, "focus" layout (desktop). The Data-Powered message is a compact band across the
// top. At rest each half shows only a big Brand / Influencer word and its CTA; hovering a half
// widens it and reveals its tagline, description and mock-up, while the other half keeps just its
// word + CTA, dimmed.
export default function HomeHeroFocus({ lang }: { lang: "th" | "en" }) {
  const t = COPY[lang];
  const [active, setActive] = useState<Side>(null);
  const width = (side: "brand" | "influencer") => (active === null ? "50%" : active === side ? "64%" : "36%");

  // a render helper (not a nested component) so hovering never remounts the panels
  const renderPanel = (side: "brand" | "influencer") => {
    const c = side === "brand" ? t.brand : t.influencer;
    const isBrand = side === "brand";
    const on = active === side;
    const off = active !== null && !on;
    const rest = active === null;
    const accent = isBrand ? "#5f26e5" : "#ff0089";
    const L = { duration: 0.55, ease: EASE };
    // copy sits on top along the outer edge (word, details when focused, CTA); the mock-up fills the
    // space beneath it toward the centre. The inner side keeps room for the centre message, which
    // rides the seam between the two halves.

    return (
      <motion.div key={side} className="hf-panel" onMouseEnter={() => setActive(side)} onMouseLeave={() => setActive(null)}
        initial={false} animate={{ width: width(side) }} transition={L}
        style={{ position: "relative", minWidth: 0, display: "flex", alignItems: "flex-start" }}>
        {/* layered background (pastel tones as on the live preview): tinted base + animated mesh gradient
            + a soft aurora ribbon + light grain + sheen; the focused side's colours glow stronger */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden",
          background: isBrand ? "linear-gradient(170deg, #f5f3ff 0%, #e8e1fd 40%, #dcd2f8 75%, #d6cbf5 100%)" : "linear-gradient(190deg, #fff4f9 0%, #fde3f0 40%, #f8d3e7 75%, #f4cbe1 100%)" }}>
          {/* same tilted pattern on both halves, the influencer one mirrored, so the flows meet head-on at the seam */}
          <div style={{ position: "absolute", inset: 0, opacity: (on ? 1 : off ? 0.5 : 0.8) * (isBrand ? 0.7 : 1), transition: "opacity .6s ease",
            transform: isBrand ? "none" : "scaleX(-1)" }}>
            <BackgroundShader colors={isBrand ? MESH.brand : MESH.influencer} distortion={0.8} swirl={0.1} speed={0.5} rotation={35} offsetX={0.22} />
          </div>
          <div className={`hf-aurora ${isBrand ? "hf-aurora-brand" : "hf-aurora-inf"}`} style={{ opacity: on ? 0.9 : off ? 0.4 : 0.7, transition: "opacity .6s ease" }} />
          <div className="hf-grain" />
          <div style={{ position: "absolute", inset: 0, background: isBrand
            ? "radial-gradient(70% 55% at 60% 35%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%), linear-gradient(90deg, rgba(70,40,170,0.07) 0%, rgba(70,40,170,0) 35%)"
            : "radial-gradient(70% 55% at 40% 35%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%), linear-gradient(270deg, rgba(190,30,120,0.06) 0%, rgba(190,30,120,0) 35%)" }} />
        </div>

        {/* rest: copy above, art below. focused: copy and art side by side on one row (the centre
            message hides, so the inner gutter can close up and nothing waits empty at the top) */}
        <div className="hf-content" style={{ position: "relative", zIndex: 1, width: "100%", height: on ? "auto" : "100%", display: "flex",
          flexDirection: on ? (isBrand ? "row" : "row-reverse") : "column",
          alignItems: on ? "center" : "stretch", justifyContent: "center", gap: on ? "clamp(40px, calc(2.2vw + 20px), 56px)" : "clamp(10px, 2svh, 22px)", boxSizing: "border-box",
          // focused: the row hugs its content and sits right under the navbar instead of floating mid-height
          padding: on ? "var(--hf-focus-top) var(--hf-outer) var(--hf-bottom)"
            : isBrand ? "var(--hf-top) var(--hf-inner) var(--hf-bottom) var(--hf-outer)" : "var(--hf-top) var(--hf-outer) var(--hf-bottom) var(--hf-inner)" }}>

          <motion.div layout transition={L} className="hf-text" style={{ minWidth: 0, flex: on ? "0 0 auto" : undefined, display: "flex", flexDirection: "column", alignItems: isBrand ? "flex-start" : "flex-end",
            textAlign: isBrand ? "left" : "right", opacity: off ? 0.55 : 1, transition: "opacity .45s ease" }}>
            <motion.div layout="position" transition={L}>
              <Link href={`/${lang}/${side}`} className="split-label" style={{ fontFamily: "'Pierson','Noto Sans Thai',sans-serif", textDecoration: "none",
                display: "inline-block", color: accent, fontWeight: 800, letterSpacing: "0.03em", lineHeight: 1,
                fontSize: on ? "var(--hf-word-on)" : rest ? "var(--hf-word-rest)" : "var(--hf-word-off)",
                marginBottom: on ? "14px" : "clamp(12px, 2svh, 20px)", transition: "font-size .55s cubic-bezier(.22,1,.36,1), margin .55s ease" }}>
                {c.label}
              </Link>
            </motion.div>
            {/* details: 0 height unless focused; slide / fade in on hover */}
            <div style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", transition: "grid-template-rows .55s cubic-bezier(.22,1,.36,1)" }}>
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(14px)",
                  transition: on ? "opacity .45s ease .15s, transform .55s cubic-bezier(.22,1,.36,1) .1s" : "opacity .2s ease, transform .3s ease" }}>
                  <p className="hf-tagline" style={{ ...KT, fontWeight: 600, color: "#111827", lineHeight: 1.18, margin: "0 0 14px", letterSpacing: "0.01em" }}>
                    {c.tagline.split("|").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
                  </p>
                  <p className="hf-reveal" style={{ ...KT, fontSize: "15px", lineHeight: 1.65, color: "#111827", margin: isBrand ? "0 0 18px" : "0 0 18px auto", maxWidth: "none" }}>{c.reveal.split("|").map((line, i) => <span key={i} style={{ display: "block", whiteSpace: "nowrap" }}>{line}</span>)}</p>
                </div>
              </div>
            </div>
            <motion.div layout="position" transition={L}>
              <Link href={`/${lang}/${side}`} className={`split-cta hf-cta ${isBrand ? "hf-cta-brand" : "hf-cta-inf"}`} style={{
                ...KT, display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "50px",
                padding: "13px 12px 13px 26px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                {c.cta}<ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div layout transition={L} className="hf-art" style={{ minWidth: 0, flex: on ? "0 0 auto" : undefined, display: "flex", justifyContent: isBrand ? "flex-end" : "flex-start", opacity: off ? 0.55 : 1, transition: "opacity .45s ease" }}>
            <motion.div layout transition={L} style={{ width: on ? "var(--hf-art-on)" : off ? "var(--hf-art-off)" : "var(--hf-art-rest)" }}>
              {isBrand ? <BrandMockArt lang={lang} /> : <InfluencerMockArt lang={lang} glass />}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    );
  };

  return (
    <section className="hf-hero" style={{ position: "relative" }}>
      <div className="hf-row" style={{ display: "flex", alignItems: "stretch" }}>
        {renderPanel("brand")}
        {renderPanel("influencer")}
      </div>

      {/* bottom: both halves melt into one lavender→pink band, which the stats section continues */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "min(160px, 26%)", zIndex: 0, pointerEvents: "none",
        background: "var(--hf-blend)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 100%)" }} />

      {/* Data-Powered message — vertically centred, riding the seam between the two halves */}
      <motion.div className="hf-band" initial={false} animate={{ left: width("brand"), opacity: active ? 0 : 1, scale: active ? 0.94 : 1 }}
        transition={{ duration: 0.55, ease: EASE, opacity: { duration: active ? 0.25 : 0.45, delay: active ? 0 : 0.15 } }}
        style={{ position: "absolute", top: "calc(50% + var(--hf-top) / 2 - var(--hf-bottom) / 2)", x: "-50%", y: "-50%", zIndex: 5,
          width: "var(--hf-mid-w)", textAlign: "center", pointerEvents: "none" }}>
        <span style={{ ...KT, fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em", color: "#4b4560" }}>{t.eyebrow}</span>
        <AnimatedText className="p-0"
          text={<>{t.headline1}<br />{t.headline2}<br />{t.headline3}</>}
          gradientColors={HEADLINE_SHINE} gradientAnimationDuration={3}
          textStyle={{ ...KT, fontWeight: 600, fontSize: "clamp(20px, 1.9vw, 30px)", lineHeight: 1.25, margin: "8px 0" }} />
        <p style={{ ...KT, color: "#4b4560", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.55, margin: 0 }}>
          {t.sublineTop}<br />{t.sublineBottom}
        </p>
      </motion.div>

      <style>{`
        :root{ --hf-blend: linear-gradient(90deg, #ddd4f8 0%, #e7dbf6 45%, #f3d6ea 60%, #f6d0e5 100%); }
        .hf-hero{
          --hf-top: clamp(108px, 13.5svh, 140px); --hf-bottom: clamp(28px, 5svh, 64px);
          --hf-focus-top: clamp(150px, calc(17svh + 20px), 196px);
          --hf-mid-w: clamp(250px, 22vw, 360px); --hf-inner: calc(var(--hf-mid-w) / 2 + 2vw); --hf-outer: 3vw;
          /* one fixed hero height for rest and hover (the focused row's height), so the stats never move */
          --hf-h: clamp(480px, calc(55svh + 126px), 760px);
          --hf-avail-h: calc(var(--hf-h) - var(--hf-top) - var(--hf-bottom));
          --hf-avail-on: calc(var(--hf-h) - var(--hf-focus-top) - var(--hf-bottom) - 16px);
          /* mock-up widths per state, bounded by the half's free width and by the height left for the copy */
          --hf-art-rest: min(520px, calc(50vw - var(--hf-inner) - var(--hf-outer)), calc((var(--hf-avail-h) - 190px) * 1.32));
          /* focused: art shares the row with the copy, so it is bounded by ~60% of the row and by the full height */
          --hf-art-on: min(600px, calc((64vw - 2 * var(--hf-outer) - 3vw) * 0.6), calc(var(--hf-avail-on) * 1.26));
          --hf-art-off: min(calc(var(--hf-art-rest) * 0.7), calc(36vw - var(--hf-inner) - var(--hf-outer)));
          --hf-word-rest: clamp(48px, min(5.2vw, 8svh), 86px); --hf-word-on: clamp(36px, min(3.6vw, 6svh), 58px); --hf-word-off: clamp(32px, min(3.4vw, 5.5svh), 54px); }
        .hf-row{ height: var(--hf-h); }
        .hf-tagline{ font-size: clamp(26px, min(2.6vw, 4.6svh), 40px); }
        .hf-tagline > span{ white-space: nowrap; }
        .hf-panel .hf-reveal{ max-width: 380px; }
        @media (max-width: 1180px), (max-height: 820px){ .hf-hero .hf-reveal{ display: none; } }
        /* aurora ribbons: wide, low-contrast and heavily blurred so they stay behind the art and copy */
        .hf-aurora{ position: absolute; width: 140%; height: 46%; left: -20%; top: 30%; border-radius: 50%; filter: blur(70px);
          pointer-events: none; animation: hf-sway 30s ease-in-out infinite alternate; }
        .hf-aurora-brand{ transform: rotate(-16deg);
          background: linear-gradient(90deg, rgba(150,120,255,0) 0%, rgba(150,120,255,0.38) 30%, rgba(255,150,210,0.22) 62%, rgba(255,150,210,0) 100%); }
        .hf-aurora-inf{ transform: rotate(16deg); animation-delay: -15s;
          background: linear-gradient(270deg, rgba(255,140,190,0) 0%, rgba(255,140,190,0.36) 30%, rgba(190,150,255,0.24) 62%, rgba(190,150,255,0) 100%); }
        @keyframes hf-sway{ 0%{ translate: 0 0; } 100%{ translate: 4% -5%; } }
        @media (prefers-reduced-motion: reduce){ .hf-aurora{ animation: none; } }
        /* CTA: white glass at rest; on hover / press it fills with the side's colour (the old solid pill) */
        .hf-cta{ background: rgba(255,255,255,0.55); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.75); box-shadow: 0 8px 24px -10px rgba(60,30,120,0.25), inset 0 1px 0 rgba(255,255,255,0.8);
          transition: background-color .3s ease, color .3s ease, box-shadow .3s ease, border-color .3s ease, transform .3s cubic-bezier(.22,1,.36,1); }
        .hf-cta-brand{ color: #5f26e5; } .hf-cta-inf{ color: #ff0089; }
        .hf-cta > span{ transition: background-color .3s ease, transform .3s ease; }
        .hf-cta-brand > span{ background: rgba(95,38,229,0.12) !important; } .hf-cta-inf > span{ background: rgba(255,0,137,0.12) !important; }
        .hf-cta:hover, .hf-cta:focus-visible, .hf-cta:active{ color: #ffffff; transform: translateY(-2px); }
        .hf-cta:active{ transform: translateY(0) scale(.97); }
        .hf-cta-brand:hover, .hf-cta-brand:focus-visible, .hf-cta-brand:active{ background: #5f26e5; border-color: #5f26e5; box-shadow: 0 10px 24px rgba(95,38,229,0.35); }
        .hf-cta-inf:hover, .hf-cta-inf:focus-visible, .hf-cta-inf:active{ background: #ff0089; border-color: #ff0089; box-shadow: 0 10px 24px rgba(255,0,137,0.32); }
        .hf-cta:hover > span, .hf-cta:focus-visible > span{ background: rgba(255,255,255,0.22) !important; }
        .hf-cta:hover svg{ transform: translateX(3px); }
        /* film grain (SVG noise), very light, overlay-blended so it adds texture, not dirt */
        .hf-grain{ position: absolute; inset: 0; pointer-events: none; opacity: 0.12; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          background-size: 160px 160px; }
              `}</style>
    </section>
  );
}
