"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// About Us opener on the brand purple background (same as the keyword hero below): faint column
// grid and an oversized one-line "Buddy Review" whose two words slide in from opposite sides.
const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutBrandHero() {
  // motion preference is read after mount so the server and first client render match
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;
  const slide = (from: string, delay: number) =>
    reduce ? {} : { initial: { x: from, opacity: 0 }, animate: { x: "0%", opacity: 1 }, transition: { duration: 1.6, delay, ease: EASE } };

  return (
    <section data-dark-hero className="abh" style={{ position: "relative", height: "min(100svh, 980px)", minHeight: "600px", overflow: "hidden",
      background: "#120a3a url('/backgrounds/dark-blue-bg2.jpg') center / cover no-repeat" }}>
      {/* faint vertical column grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%" }} />

      {/* oversized one-line wordmark: "Buddy" slides in from the left, "Review" from the right */}
      <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "40px", overflow: "hidden" }}>
        <div className="abh-big" style={{ ...KT, display: "flex", gap: "0.18em" }}>
          <motion.span {...slide("-70%", 0.15)} style={{ display: "block" }}>Buddy</motion.span>
          <motion.span {...slide("70%", 0.3)} style={{ display: "block" }}>Review</motion.span>
        </div>
      </div>

      {/* headline on top */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "40px" }}>
        <h1 className="abh-title" style={{ ...KT, margin: 0, textAlign: "center", color: "#ffffff", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
          {["We make influence", "measurable."].map((line, i) => (
            <span key={line} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span style={{ display: "block" }} initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.2, delay: 0.9 + i * 0.18, ease: EASE }}>{line}</motion.span>
            </span>
          ))}
        </h1>
      </div>

      <style>{`
        .abh-big{ font-weight: 800; font-size: clamp(90px, 15vw, 290px); line-height: 1; letter-spacing: -0.04em; white-space: nowrap;
          background: linear-gradient(90deg, rgba(255,255,255,.30) 0%, rgba(232,214,255,.22) 50%, rgba(255,150,215,.30) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .abh-title{ font-size: clamp(32px, 4.2vw, 68px); }
        @media (max-width: 767px){
          .abh-big{ font-size: 15.5vw; }
          .abh-title{ font-size: 8.4vw; }
        }
      `}</style>
    </section>
  );
}
