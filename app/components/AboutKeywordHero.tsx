"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, type MotionValue } from "motion/react";

// About Us hero — dark, typography-led. Three statements; DATA / PEOPLE / RESULTS are the
// oversized anchors. While the section is pinned, scrolling draws the three keywords toward
// the centre, fades their supporting copy, then resolves into the Buddy Review logo with
// "data, people, results." beneath it, held for a beat before the page moves on.

const DISPLAY = { fontFamily: "'Pierson','Playfair Display',Georgia,serif" };
const SANS = { fontFamily: "var(--font-inter),'Inter',system-ui,sans-serif" };
const EASE = [0.22, 1, 0.36, 1] as const;

// Each keyword sits at an asymmetric spot, expressed as an offset from the screen centre
// (vw / vh) so it can glide back to the centre on scroll. `lead` is the supporting phrase.
const WORDS = [
  { lead: "Better decisions start with", word: "DATA",    x: -24, y: -25, align: "left" as const,  stack: -15 },
  { lead: "Better ideas come from understanding", word: "PEOPLE", x: 18, y: 2, align: "right" as const, stack: 0 },
  { lead: "Better work is proven by", word: "RESULTS", x: -10, y: 27, align: "left" as const,  stack: 15 },
];

function Reveal({ children, delay, still }: { children: React.ReactNode; delay: number; still: boolean }) {
  // mask reveal: the line rises out of an overflow-hidden slot
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
      <motion.span style={{ display: "block" }}
        initial={still ? false : { y: "110%" }} animate={{ y: "0%" }}
        transition={{ duration: 1.4, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

// phones: tighter positions so the oversized words stay on screen
const WORDS_MOBILE = [{ x: -16, y: -24 }, { x: 3, y: 0 }, { x: 0, y: 24 }];

function Keyword({ w: base, i, p, still, mobile }: { w: (typeof WORDS)[number]; i: number; p: MotionValue<number>; still: boolean; mobile: boolean }) {
  const w = mobile ? { ...base, ...WORDS_MOBILE[i], stack: base.stack * 0.8 } : base;
  // 0.10 → 0.48: drift to the centre (stacked), shrinking a little
  const x = useTransform(p, [0, 0.1, 0.48], [`${w.x}vw`, `${w.x}vw`, "0vw"]);
  const y = useTransform(p, [0, 0.1, 0.48], [`${w.y}vh`, `${w.y}vh`, `${w.stack}vh`]);
  const scale = useTransform(p, [0.1, 0.48], [1, 0.62]);
  // keywords give way to the logo
  const opacity = useTransform(p, [0.5, 0.6], [1, 0]);
  const blur = useTransform(p, [0.5, 0.6], ["blur(0px)", "blur(10px)"]);
  // supporting copy fades away first, as the keywords start to converge
  const leadOpacity = useTransform(p, [0.1, 0.28], [1, 0]);

  return (
    <motion.div className="akh-word" style={{ position: "absolute", left: "50%", top: "50%", x: still ? `${w.x}vw` : x, y: still ? `${w.y}vh` : y,
      scale: still ? 1 : scale, opacity: still ? 1 : opacity, filter: still ? "none" : blur, translateX: "-50%", translateY: "-50%",
      textAlign: w.align, willChange: "transform" }}>
      <motion.div className="akh-lead" style={{ ...SANS, opacity: still ? 1 : leadOpacity, fontSize: "clamp(14px, 1.25vw, 19px)", fontWeight: 400,
        letterSpacing: "0.01em", color: "rgba(244,239,255,0.62)", marginBottom: "0.6em", whiteSpace: "nowrap" }}>
        <Reveal delay={0.35 + i * 0.32} still={still}>{w.lead}</Reveal>
      </motion.div>
      <div className="akh-kw" style={{ ...DISPLAY, fontSize: "clamp(72px, 12.5vw, 220px)", lineHeight: 0.86, letterSpacing: "-0.02em", fontWeight: 400,
        whiteSpace: "nowrap", background: "linear-gradient(180deg,#ffffff 0%,#efe6ff 55%,#d9c6ff 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        <Reveal delay={0.5 + i * 0.32} still={still}>{w.word}</Reveal>
      </div>
    </motion.div>
  );
}

export default function AboutKeywordHero() {
  const ref = useRef<HTMLElement>(null);
  // read the motion preference only after mount, so server and first client render match
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const reduce = mounted && !!prefersReduced;
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches); on();
    mq.addEventListener("change", on); return () => mq.removeEventListener("change", on);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Mirror the progress into a plain motion value: opacity driven straight off scrollYProgress
  // gets handed to the browser's native scroll-timeline, which mis-measures this pinned section.
  const p = useMotionValue(0);
  useEffect(() => { p.set(scrollYProgress.get()); return scrollYProgress.on("change", (v) => p.set(v)); }, [scrollYProgress, p]);

  const logoOpacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const logoScale = useTransform(p, [0.56, 0.72], [0.94, 1]);
  const lineOpacity = useTransform(p, [0.64, 0.76], [0, 1]);
  const glow = useTransform(p, [0, 0.6, 1], [1, 1.25, 1.1]);

  return (
    // Tall section = scroll runway: ~1 screen to converge, ~1 to resolve, ~1.4 held on the logo
    <section ref={ref} data-dark-hero className="akh" style={{ position: "relative", height: reduce ? "100svh" : "420vh", background: "#07060b" }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        {/* atmosphere: pink–purple glow */}
        <motion.div aria-hidden style={{ position: "absolute", inset: "-20%", scale: reduce ? 1 : glow,
          background: "radial-gradient(42% 38% at 30% 32%, rgba(124,58,237,0.30) 0%, transparent 70%), radial-gradient(36% 34% at 72% 70%, rgba(255,0,137,0.20) 0%, transparent 72%), radial-gradient(60% 60% at 50% 50%, rgba(95,37,229,0.10) 0%, transparent 80%)" }} />
        {/* faint structural grid */}
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.5,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "calc(100vw / 12) calc(100vw / 12)", backgroundPosition: "center center",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 78%)", maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 78%)" }} />
        {/* barely-there signal ripples */}
        <svg aria-hidden className="akh-ripple" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx="500" cy="500" r="120" fill="none" stroke="rgba(214,190,255,0.10)" strokeWidth="0.8"
              style={{ transformOrigin: "500px 500px", animation: reduce ? "none" : `akh-ripple 14s linear ${k * 3.5}s infinite` }} />
          ))}
        </svg>
        {/* subtle grain-free vignette */}
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />

        {WORDS.map((w, i) => <Keyword key={w.word} w={w} i={i} p={p} still={reduce} mobile={mobile} />)}

        {/* resolved state: centred logo + final line */}
        {!reduce && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <motion.div style={{ opacity: logoOpacity, scale: logoScale, position: "relative", width: "min(460px, 62vw)", aspectRatio: "3608 / 1258" }}>
              <Image src="/buddy-review-logo.png" alt="Buddy Review" fill sizes="460px" style={{ objectFit: "contain" }} />
            </motion.div>
            <motion.p style={{ ...DISPLAY, opacity: lineOpacity, margin: "28px 0 0", fontSize: "clamp(20px, 2vw, 30px)", fontStyle: "italic",
              letterSpacing: "0.02em", color: "rgba(244,239,255,0.82)" }}>
              data, people, results.
            </motion.p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes akh-ripple { 0% { transform: scale(0.6); opacity: 0; } 15% { opacity: 1; } 100% { transform: scale(4.2); opacity: 0; } }
        /* phones: keywords stack down the screen instead of spreading sideways */
        @media (max-width: 767px){
          .akh-kw{ font-size: min(18.5vw, 120px) !important; }
          .akh-lead{ white-space: normal !important; max-width: 70vw; }
        }
      `}</style>
    </section>
  );
}
