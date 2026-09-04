"use client";
import { useRef, useLayoutEffect, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CARD_GAP = 16;
const VIEW_H  = 720;
const BG_TOP  = "#F1EBFA";
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "12px", marginTop: "auto" }}>
        <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="44px"
            style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <span style={{ ...KT, fontWeight: 700, fontSize: "16px", color: "#5f26e5" }}>{t.name}</span>
      </div>
    </div>
  );
}

// ── MarqueeColumn ────────────────────────────────────────────────────────────
// - Auto-scrolls in `direction` at `duration` seconds per loop.
// - Mouse wheel over the column scrolls it manually (page scroll is not stolen
//   unless the pointer is actually inside the column).
// - Drag (touch / mouse drag) also works; releases resume auto-scroll.
function MarqueeColumn({
  items,
  direction,
  duration,
  style,
  className,
}: {
  items: { photo: string; name: string; text: string }[];
  direction: "up" | "down";
  duration: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const origRef    = useRef<HTMLDivElement>(null);
  const stepRef    = useRef(0);          // always-current step, safe for closures
  const [step, setStep] = useState(0);  // for dragConstraints render
  const y          = useMotionValue(0);
  const loopRef    = useRef<ReturnType<typeof animate> | null>(null);

  // Start (or restart) the infinite loop from currentY.
  const runLoop = useCallback((currentY: number, s: number) => {
    const target    = direction === "up" ? -s : 0;
    const loopStart = direction === "up" ?  0 : -s;

    // Normalise into one loop range to prevent backward animation.
    let from = currentY;
    if (direction === "up") {
      from = ((from % s) - s) % s;
      if (from > 0) from -= s;
    } else {
      from = ((from + s) % s) - s;
      if (from > 0) from -= s;
    }
    y.set(from);

    const dist = Math.abs(from - target);
    const dur  = (dist / s) * duration;

    loopRef.current?.stop();
    loopRef.current = animate(y, target, {
      duration: dur,
      ease: "linear",
      onComplete: () => {
        y.set(loopStart);
        runLoop(loopStart, s);
      },
    });
  }, [direction, duration, y]);

  // Measure on first paint and kick off auto-scroll.
  useLayoutEffect(() => {
    const h = origRef.current?.offsetHeight ?? 0;
    if (!h) return;
    const s = h + CARD_GAP;
    stepRef.current = s;
    setStep(s);
    const initial = direction === "up" ? 0 : -s;
    y.set(initial);
    runLoop(initial, s);
    return () => loopRef.current?.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Non-passive wheel listener so we can preventDefault (prevent page scroll)
  // while the pointer is inside this column.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let wheelTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      const s = stepRef.current;
      if (!s) return;
      e.preventDefault();            // stop page from scrolling
      loopRef.current?.stop();
      y.set(y.get() - e.deltaY * 0.8);

      // Resume auto-scroll ~900 ms after the user stops wheeling.
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => runLoop(y.get(), s), 900);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimer);
    };
  }, [runLoop, y]);

  const pause  = useCallback(() => { loopRef.current?.stop(); }, []);
  const resume = useCallback(() => {
    const s = stepRef.current;
    if (s) runLoop(y.get(), s);
  }, [runLoop, y]);

  const colStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: `${CARD_GAP}px` };

  return (
    <div ref={wrapperRef} className={className} style={{ flex: 1, overflow: "hidden", ...style }}>
      <motion.div
        style={{ y, cursor: "grab", userSelect: "none" }}
        drag="y"
        dragConstraints={{ top: -(step * 3), bottom: step * 2 }}
        dragElastic={0.08}
        onDragStart={pause}
        onDragEnd={resume}
        whileDrag={{ cursor: "grabbing" }}
      >
        {direction === "down" && (
          <div style={colStyle}>
            {items.map((t, i) => <Card key={`dup-${i}`} t={t} />)}
            <div style={{ height: CARD_GAP }} />
          </div>
        )}

        <div ref={origRef} style={colStyle}>
          {items.map((t, i) => <Card key={i} t={t} />)}
        </div>

        {direction === "up" && (
          <div style={{ ...colStyle, marginTop: CARD_GAP }}>
            {items.map((t, i) => <Card key={`dup-${i}`} t={t} />)}
          </div>
        )}
      </motion.div>
    </div>
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
  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 !== 0);

  return (
    <div className="tss-outer" style={{
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

        {/* ── Desktop/Tablet: 2 independent marquee columns ── */}
        <div
          className="tss-viewport-multi"
          style={{
            flex: 1, display: "flex", gap: `${CARD_GAP}px`,
            height: `${VIEW_H}px`,
            position: "relative",
          }}
        >
          <MarqueeColumn items={col1} direction="up" duration={30} className="tss-col1" />
          <MarqueeColumn items={col2} direction="down" duration={38} style={{ marginTop: "48px" }} className="tss-col2" />
          <div className="tss-fade-bot" style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
            background: `linear-gradient(to top, ${BG_BOT} 0%, transparent 100%)`,
            pointerEvents: "none", zIndex: 2,
          }} />
        </div>

        {/* ── Mobile: single merged column (hidden on desktop/tablet via CSS) ── */}
        <div
          className="tss-viewport-single"
          style={{ display: "none", width: "100%", height: `${VIEW_H}px`, position: "relative", overflow: "hidden" }}
        >
          <MarqueeColumn items={items} direction="up" duration={35} />
          <div className="tss-fade-bot" style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
            background: `linear-gradient(to top, ${BG_BOT} 0%, transparent 100%)`,
            pointerEvents: "none", zIndex: 2,
          }} />
        </div>
      </div>
    </div>
  );
}
