"use client";
import { useRef, useLayoutEffect, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CARD_GAP = 16;
const VIEW_H  = 720;

const HeartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

function Card({ t }: { t: { photo: string; name: string; text: string; time?: string } }) {
  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 20px rgba(95,38,229,0.07)",
      padding: "20px 22px",
      display: "flex", flexDirection: "column", gap: "10px",
      boxSizing: "border-box" as const,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative", width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="36px"
            style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <span style={{ ...KT, fontWeight: 700, fontSize: "15px", color: "#5f26e5" }}>{t.name}</span>
        <span style={{ ...KT, fontSize: "13px", color: "#9ca3af" }}>· {t.time ?? "2d"}</span>
      </div>
      <p style={{ ...KT, fontSize: "14.5px", color: "#111827", lineHeight: "1.75", margin: 0 }}>
        {t.text}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "4px" }}>
        <span style={{ ...KT, display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 600, color: "#9ca3af" }}>
          <HeartIcon /> Reply
        </span>
        <span style={{ ...KT, fontSize: "13px", fontWeight: 600, color: "#9ca3af" }}>Like</span>
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
    <div ref={wrapperRef} className={className} style={{ flex: 1, overflow: "hidden", ...style }}
      onMouseEnter={pause} onMouseLeave={resume}>
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
      background: "transparent",
      padding: "80px 48px",
    }}>
      <div
        className="tss-layout"
        style={{ maxWidth: "1120px", margin: "0 auto", width: "100%" }}
      >
        {/* ── Centered title panel ── */}
        <div className="tss-title" style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            ...KT, fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800,
            color: "#111827", margin: "0 0 16px", lineHeight: 1.25,
          }}>
            {lang === "th" ? "เสียงจากอินฟลูเอนเซอร์" : "Voices From Creators"}
            <br />
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {lang === "th" ? "ที่เคยร่วมงานกับเรา" : "Who've Worked With Us"}
            </span>
          </h2>
          <p style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
            {lang === "th"
              ? "ประสบการณ์จริงจากการทำงานกับแบรนด์ ผ่าน Buddy Review"
              : "Real experiences working with brands, through Buddy Review"}
          </p>
        </div>

        {/* ── Browser-window frame wrapping the testimonial columns ── */}
        <div className="tss-window" style={{
          background: "#ffffff", borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 30px 60px -20px rgba(95,38,229,0.25)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", padding: "14px 20px",
            background: "#f4f2fb", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "relative",
          }}>
            <div style={{ display: "flex", gap: "7px" }}>
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            <span style={{
              ...KT, position: "absolute", left: "50%", transform: "translateX(-50%)",
              fontSize: "13px", fontWeight: 700, color: "#374151",
            }}>
              {lang === "th" ? "บทสนทนาของครีเอเตอร์" : "Creator conversations"}
            </span>
          </div>

          <div style={{ padding: "32px 28px" }}>
            {/* ── Desktop/Tablet: 2 independent marquee columns ── */}
            <div
              className="tss-viewport-multi"
              style={{
                display: "flex", gap: `${CARD_GAP}px`,
                height: `${VIEW_H}px`,
                position: "relative",
              }}
            >
              <MarqueeColumn items={col1} direction="up" duration={30} className="tss-col1" />
              <MarqueeColumn items={col2} direction="down" duration={38} style={{ marginTop: "48px" }} className="tss-col2" />
              <div className="tss-fade-bot" style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
                background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
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
                background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
                pointerEvents: "none", zIndex: 2,
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
