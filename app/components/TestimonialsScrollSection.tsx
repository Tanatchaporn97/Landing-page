"use client";
import { useRef, useLayoutEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CARD_GAP = 16;
const VIEW_H  = 720;  // visible window height (px) — shows ~2 cards per column
const BG_TOP  = "#EDE5F9";
const BG_BOT  = "#E9DFF7";

const QuoteIcon = () => (
  <svg width="32" height="25" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path
      d="M0 28V17.2C0 14.0267 0.693333 11.16 2.08 8.6C3.46667 6.04 5.42667 3.85333 7.96 2.04L11.44 5C9.65333 6.38667 8.22667 7.97333 7.16 9.76C6.09333 11.5467 5.56 13.5467 5.56 15.76H10.28V28H0ZM19.72 28V17.2C19.72 14.0267 20.4133 11.16 21.8 8.6C23.1867 6.04 25.1467 3.85333 27.68 2.04L31.16 5C29.3733 6.38667 27.9467 7.97333 26.88 9.76C25.8133 11.5467 25.28 13.5467 25.28 15.76H30V28H19.72Z"
      fill="#5f26e5" opacity="0.65"
    />
  </svg>
);

function Card({ t }: { t: { photo: string; name: string; text: string } }) {
  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 20px rgba(95,38,229,0.07)",
      padding: "24px 24px 20px",
      display: "flex", flexDirection: "column", gap: "14px",
      boxSizing: "border-box" as const,
    }}>
      <QuoteIcon />
      <p style={{ ...KT, fontSize: "15px", color: "#111827", lineHeight: "1.8", margin: 0 }}>
        {t.text}
      </p>
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        paddingTop: "12px", marginTop: "auto",
      }}>
        <div style={{
          position: "relative", width: "44px", height: "44px",
          borderRadius: "50%", overflow: "hidden", flexShrink: 0,
        }}>
          <Image src={t.photo} alt={t.name} fill sizes="44px"
            style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <span style={{ ...KT, fontWeight: 700, fontSize: "16px", color: "#5f26e5" }}>{t.name}</span>
      </div>
    </div>
  );
}

// ── Infinite auto-scroll marquee for one column ──────────────────────────────
// direction "up"  → col scrolls upward   (DOM: [original][dup])
// direction "down"→ col scrolls downward (DOM: [dup][original])
function MarqueeColumn({
  items,
  direction,
  duration,
}: {
  items: { photo: string; name: string; text: string }[];
  direction: "up" | "down";
  duration: number;
}) {
  const origRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useLayoutEffect(() => {
    const origH = origRef.current?.offsetHeight ?? 0;
    if (!origH) return;

    // "step" = height of one set + gap between sets for seamless seam
    const step = origH + CARD_GAP;

    if (direction === "up") {
      // start at 0, scroll to -step, then loop
      controls.set({ y: 0 });
      controls.start({
        y: -step,
        transition: { duration, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    } else {
      // start at -step (showing original), scroll to 0 (showing dup = same), loop
      controls.set({ y: -step });
      controls.start({
        y: 0,
        transition: { duration, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colStyle: React.CSSProperties = {
    display: "flex", flexDirection: "column", gap: `${CARD_GAP}px`,
  };

  return (
    <motion.div animate={controls}>
      {/* "down" direction needs duplicate FIRST so original comes into view from below */}
      {direction === "down" && (
        <div style={colStyle}>
          {items.map((t, i) => <Card key={`dup-${i}`} t={t} />)}
          <div style={{ height: CARD_GAP }} />
        </div>
      )}

      {/* Original track — measured for loop distance */}
      <div ref={origRef} style={colStyle}>
        {items.map((t, i) => <Card key={i} t={t} />)}
      </div>

      {/* "up" direction needs duplicate AFTER original */}
      {direction === "up" && (
        <div style={{ ...colStyle, marginTop: CARD_GAP }}>
          {items.map((t, i) => <Card key={`dup-${i}`} t={t} />)}
        </div>
      )}
    </motion.div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function TestimonialsScrollSection({
  dict,
  lang,
}: {
  dict?: any;
  lang: string;
}) {
  const items: { photo: string; name: string; text: string }[] = dict?.testimonials ?? [];

  // Even indices → col1 (scrolls up), odd indices → col2 (scrolls down)
  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 !== 0);

  return (
    <div style={{
      background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOT} 100%)`,
      padding: "80px 48px",
    }}>
      <div
        className="tss-layout"
        style={{
          maxWidth: "1294px", margin: "0 auto", width: "100%",
          display: "flex", gap: "80px", alignItems: "center",
        }}
      >
        {/* ── Left: title panel ── */}
        <div className="tss-title" style={{ flex: "0 0 320px" }}>
          <div style={{
            display: "inline-block",
            border: "1.5px solid rgba(95,38,229,0.35)",
            borderRadius: "50px",
            padding: "6px 18px", marginBottom: "20px",
            background: "rgba(95,38,229,0.06)",
          }}>
            <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#5f26e5" }}>
              / Testimonial
            </span>
          </div>
          <h2 style={{
            ...KT, fontSize: "clamp(36px,4vw,58px)", fontWeight: 800,
            color: "#111827", margin: "0 0 20px", lineHeight: 1.15,
          }}>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>What </span>
            <span style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic",
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", whiteSpace: "nowrap",
            }}>
              They Say
            </span>
          </h2>
          <p style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
            {lang === "th"
              ? "เสียงจริงจากอินฟลูเอนเซอร์ที่ร่วมงานกับ Buddy Review"
              : "Real voices from influencers who've worked with Buddy Review"}
          </p>
        </div>

        {/* ── Right: 2 independent marquee columns ── */}
        <div
          className="tss-viewport"
          style={{
            flex: 1, display: "flex", gap: `${CARD_GAP}px`,
            height: `${VIEW_H}px`, overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Col1 — scrolls up */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <MarqueeColumn items={col1} direction="up" duration={30} />
          </div>

          {/* Col2 — scrolls down, staggered start */}
          <div style={{ flex: 1, overflow: "hidden", marginTop: "48px" }}>
            <MarqueeColumn items={col2} direction="down" duration={38} />
          </div>

          {/* Fade — bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "100px",
            background: `linear-gradient(to top, ${BG_BOT} 0%, transparent 100%)`,
            pointerEvents: "none", zIndex: 2,
          }} />
        </div>
      </div>
    </div>
  );
}
