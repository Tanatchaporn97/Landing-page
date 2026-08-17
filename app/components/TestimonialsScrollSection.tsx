"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

// Estimated average card height + gap for scroll distance calculation.
// Cards have variable text length; this sets the "pace" of the animation.
const CARD_H = 300;
const CARD_GAP = 16;
const VISIBLE = 2; // cards fully shown at once
const PEEK = 80;   // px of next card peeking at bottom edge

const BG_TOP = "#EDE5F9";
const BG_BOT = "#E9DFF7";

const QuoteIcon = () => (
  <svg width="32" height="25" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path
      d="M0 28V17.2C0 14.0267 0.693333 11.16 2.08 8.6C3.46667 6.04 5.42667 3.85333 7.96 2.04L11.44 5C9.65333 6.38667 8.22667 7.97333 7.16 9.76C6.09333 11.5467 5.56 13.5467 5.56 15.76H10.28V28H0ZM19.72 28V17.2C19.72 14.0267 20.4133 11.16 21.8 8.6C23.1867 6.04 25.1467 3.85333 27.68 2.04L31.16 5C29.3733 6.38667 27.9467 7.97333 26.88 9.76C25.8133 11.5467 25.28 13.5467 25.28 15.76H30V28H19.72Z"
      fill="#5f26e5"
      opacity="0.65"
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
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      boxSizing: "border-box" as const,
    }}>
      <QuoteIcon />
      <p style={{ ...KT, fontSize: "15px", color: "#111827", lineHeight: "1.8", margin: 0 }}>
        {t.text}
      </p>
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.06)",
        marginTop: "auto",
      }}>
        <div style={{
          position: "relative", width: "44px", height: "44px",
          borderRadius: "50%", overflow: "hidden", flexShrink: 0,
        }}>
          <Image
            src={t.photo} alt={t.name} fill sizes="44px"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <span style={{ ...KT, fontWeight: 700, fontSize: "16px", color: "#5f26e5" }}>
          {t.name}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialsScrollSection({
  dict,
  lang,
}: {
  dict?: any;
  lang: string;
}) {
  const items: { photo: string; name: string; text: string }[] = dict?.testimonials ?? [];
  const n = items.length;

  // Only enable scroll-jacking on desktop (> 1080px)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1081px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Total distance the card track travels on desktop
  const scrollDist = isDesktop ? Math.max(0, n - VISIBLE) * (CARD_H + CARD_GAP) : 0;

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -scrollDist]);
  // Spring makes the scroll feel smooth and weighty
  const y = useSpring(rawY, { stiffness: 70, damping: 22, mass: 0.7 });

  // Viewport height: 2 full cards + gap + bottom peek
  const viewH = VISIBLE * CARD_H + (VISIBLE - 1) * CARD_GAP + PEEK;

  return (
    <div
      ref={sectionRef}
      className="tss-outer"
      style={{
        // CSS !important in the tablet/mobile media query will override this
        height: isDesktop ? `calc(100vh + ${scrollDist}px)` : "auto",
        background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOT} 100%)`,
        position: "relative",
      }}
    >
      {/* ── Sticky container ── */}
      <div
        className="tss-sticky"
        style={{
          position: isDesktop ? "sticky" : "static",
          top: 0,
          height: isDesktop ? "100vh" : "auto",
          display: "flex",
          alignItems: "center",
          padding: "80px 48px",
          overflow: isDesktop ? "hidden" : "visible",
        }}
      >
        <div
          className="tss-layout"
          style={{
            maxWidth: "1294px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* ── Left: title panel ── */}
          <div className="tss-title" style={{ flex: "0 0 320px" }}>
            <div style={{
              display: "inline-block",
              border: "1.5px solid rgba(95,38,229,0.35)",
              borderRadius: "50px",
              padding: "6px 18px",
              marginBottom: "20px",
              background: "rgba(95,38,229,0.06)",
            }}>
              <span style={{ ...KT, fontSize: "14px", fontWeight: 600, color: "#5f26e5" }}>
                / Testimonial
              </span>
            </div>
            <h2 style={{
              ...KT,
              fontSize: "clamp(36px,4vw,58px)",
              fontWeight: 800,
              color: "#111827",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>What </span>
              <span style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700, fontStyle: "italic",
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

          {/* ── Right: card viewport ── */}
          <div
            className="tss-viewport"
            style={{
              flex: 1,
              position: "relative",
              height: isDesktop ? `${viewH}px` : "auto",
              overflow: isDesktop ? "hidden" : "visible",
            }}
          >
            <motion.div style={isDesktop ? { y } : {}}>
              <div style={{ display: "flex", flexDirection: "column", gap: `${CARD_GAP}px` }}>
                {items.map((t, i) => (
                  <Card key={i} t={t} />
                ))}
              </div>
            </motion.div>

            {/* Fade — top (hides partially scrolled-off card) */}
            {isDesktop && (
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "90px",
                background: `linear-gradient(to bottom, ${BG_TOP} 0%, transparent 100%)`,
                pointerEvents: "none", zIndex: 2,
              }} />
            )}
            {/* Fade — bottom (hides peeking next card) */}
            {isDesktop && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
                background: `linear-gradient(to top, ${BG_BOT} 0%, transparent 100%)`,
                pointerEvents: "none", zIndex: 2,
              }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
