"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// About Us opener: light page with a faint column grid, a slow sunburst, and an oversized
// two-line "Buddy / Review" that slides in from opposite sides behind the headline.
const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const EASE = [0.22, 1, 0.36, 1] as const;
const RAYS = 96;

export default function AboutBrandHero() {
  // motion preference is read after mount so the server and first client render match
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;
  const slide = (from: string, delay: number) =>
    reduce ? {} : { initial: { x: from, opacity: 0 }, animate: { x: "0%", opacity: 1 }, transition: { duration: 1.6, delay, ease: EASE } };

  return (
    <section className="abh" style={{ position: "relative", height: "min(100svh, 980px)", minHeight: "600px", overflow: "hidden", background: "#ffffff" }}>
      {/* faint vertical column grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(90deg, rgba(95,38,229,0.07) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%" }} />

      {/* sunburst behind everything */}
      <motion.svg aria-hidden className="abh-burst" viewBox="-100 -100 200 200"
        initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
        style={{ position: "absolute", left: "50%", top: "54%", width: "min(820px, 92vw)", height: "min(820px, 92vw)", translateX: "-50%", translateY: "-50%" }}>
        <g className="abh-spin">
          {Array.from({ length: RAYS }).map((_, i) => {
            const a = (i / RAYS) * Math.PI * 2;
            // rounded so server and browser print identical attribute values
            const r = (v: number) => Math.round(v * 100) / 100;
            return <line key={i} x1={r(Math.cos(a) * 34)} y1={r(Math.sin(a) * 34)} x2={r(Math.cos(a) * 98)} y2={r(Math.sin(a) * 98)}
              stroke="url(#abhRay)" strokeWidth="0.45" strokeLinecap="round" />;
          })}
        </g>
        <defs><linearGradient id="abhRay" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8b5cf6" /><stop offset="1" stopColor="#ff0089" /></linearGradient></defs>
      </motion.svg>

      {/* oversized wordmark: "Buddy" in from the left, "Review" in from the right */}
      <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "40px" }}>
        <motion.div {...slide("-60%", 0.15)} className="abh-big" style={{ ...KT, alignSelf: "flex-start", marginLeft: "-1vw" }}>Buddy</motion.div>
        <motion.div {...slide("60%", 0.3)} className="abh-big" style={{ ...KT, alignSelf: "flex-end", marginRight: "-1vw" }}>Review</motion.div>
      </div>

      {/* headline on top */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "40px" }}>
        <h1 className="abh-title" style={{ ...KT, margin: 0, textAlign: "center", color: "#140b33", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
          {["We make influence", "measurable."].map((line, i) => (
            <span key={line} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span style={{ display: "block" }} initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.2, delay: 0.9 + i * 0.18, ease: EASE }}>{line}</motion.span>
            </span>
          ))}
        </h1>
      </div>

      <style>{`
        .abh-big{ font-weight: 800; font-size: clamp(120px, 23vw, 440px); line-height: 0.82; letter-spacing: -0.04em; white-space: nowrap;
          background: linear-gradient(45deg, #5f25e5 0%, #a855f7 50%, #ff0089 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; opacity: .9; }
        .abh-title{ font-size: clamp(40px, 6.2vw, 108px); }
        .abh-spin{ transform-origin: 0 0; animation: abh-spin 120s linear infinite; }
        @keyframes abh-spin{ to{ transform: rotate(360deg); } }
        @media (max-width: 767px){
          .abh-big{ font-size: 31vw; }
          .abh-title{ font-size: 10.5vw; }
        }
        @media (prefers-reduced-motion: reduce){ .abh-spin{ animation: none; } }
      `}</style>
    </section>
  );
}
