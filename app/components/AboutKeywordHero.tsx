"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, animate, useTransform, useReducedMotion, useMotionValue, type MotionValue } from "motion/react";

// About Us hero — dark, typography-led. Three statements; DATA / PEOPLE / RESULTS are the
// oversized anchors. While the section is pinned, scrolling draws the three keywords toward
// the centre, fades their supporting copy, then resolves into the Buddy Review logo with
// "data, people, results." beneath it, held for a beat before the page moves on.

// same type as the rest of the site: Kanit throughout
const DISPLAY = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const SANS = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const EASE = [0.22, 1, 0.36, 1] as const;

// Each keyword sits at an asymmetric spot, expressed as an offset from the screen centre
// (vw / vh) so it can glide back to the centre on scroll. `lead` is the supporting phrase.
const WORDS = [
  { lead: "Better decisions start with", word: "DATA",    x: -22, y: -19, align: "left" as const,  stack: -11 },
  { lead: "Better ideas come from understanding", word: "PEOPLE", x: 17, y: 1, align: "right" as const, stack: 0 },
  { lead: "Better work is proven by", word: "RESULTS", x: -9, y: 21, align: "left" as const,  stack: 11 },
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
const WORDS_MOBILE = [{ x: -16, y: -18 }, { x: 3, y: 0 }, { x: 0, y: 18 }];

function Keyword({ w: base, i, p, still, mobile }: { w: (typeof WORDS)[number]; i: number; p: MotionValue<number>; still: boolean; mobile: boolean }) {
  const w = mobile ? { ...base, ...WORDS_MOBILE[i], stack: base.stack * 0.8 } : base;
  // 0.10 → 0.48: drift to the centre (stacked), shrinking a little
  const x = useTransform(p, [0, 0.04, 0.42], [`${w.x}vw`, `${w.x}vw`, "0vw"]);
  const y = useTransform(p, [0, 0.04, 0.42], [`${w.y}vh`, `${w.y}vh`, `${w.stack}vh`]);
  const scale = useTransform(p, [0.04, 0.42], [1, 0.62]);
  // keywords give way to the logo
  const opacity = useTransform(p, [0.42, 0.54], [1, 0]);
  // supporting copy fades away first, as the keywords start to converge
  const leadOpacity = useTransform(p, [0.04, 0.22], [1, 0]);

  return (
    <motion.div className="akh-word" style={{ position: "absolute", left: "50%", top: "calc(50% + 34px)", x: still ? `${w.x}vw` : x, y: still ? `${w.y}vh` : y,
      scale: still ? 1 : scale, opacity: still ? 1 : opacity, translateX: "-50%", translateY: "-50%",
      textAlign: w.align, willChange: "transform" }}>
      <motion.div className="akh-lead" style={{ ...SANS, opacity: still ? 1 : leadOpacity, fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 500,
        letterSpacing: "0.01em", color: "rgba(255,255,255,0.78)", marginBottom: "0.6em", whiteSpace: "nowrap" }}>
        <Reveal delay={0.35 + i * 0.32} still={still}>{w.lead}</Reveal>
      </motion.div>
      <div className="akh-kw" style={{ ...DISPLAY, fontSize: "clamp(52px, 8.2vw, 146px)", lineHeight: 0.95, letterSpacing: "-0.01em", fontWeight: 800,
        whiteSpace: "nowrap", background: "linear-gradient(90deg,#ffffff 0%,#f1e8ff 45%,#ffb3dd 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        <Reveal delay={0.5 + i * 0.32} still={still}>{w.word}</Reveal>
      </div>
    </motion.div>
  );
}

export default function AboutKeywordHero() {
  const ref = useRef<HTMLElement>(null);
  // A compact hero (the intro copy shows beneath it), so the sequence plays on its own instead of
  // pinning the page: reveal → hold → keywords converge → logo, which then stays.
  const p = useMotionValue(0);

  // read the motion preference only after mount, so server and first client render match
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const reduce = mounted && !!prefersReduced;
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (!mounted || prefersReduced) return;
    const c = animate(p, 0.75, { delay: 4.6, duration: 3.6, ease: [0.45, 0, 0.25, 1] });
    return () => c.stop();
  }, [mounted, prefersReduced, p]);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches); on();
    mq.addEventListener("change", on); return () => mq.removeEventListener("change", on);
  }, []);

  const logoOpacity = useTransform(p, [0.5, 0.62], [0, 1]);
  const logoScale = useTransform(p, [0.5, 0.66], [0.94, 1]);
  const lineOpacity = useTransform(p, [0.58, 0.7], [0, 1]);

  return (
    <section ref={ref} data-dark-hero className="akh" style={{ position: "relative", height: "min(80svh, 820px)", minHeight: "540px", background: "#120a3a url('/backgrounds/dark-blue-bg2.jpg') center / cover no-repeat" }}>
      <div style={{ position: "relative", height: "100%", overflow: "hidden", background: "#120a3a url('/backgrounds/dark-blue-bg2.jpg') center / cover no-repeat" }}>
        {/* atmosphere: pink–purple glow */}
        <div aria-hidden style={{ position: "absolute", inset: "-20%",
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
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 60%, rgba(10,4,40,0.45) 100%)" }} />

        {WORDS.map((w, i) => <Keyword key={w.word} w={w} i={i} p={p} still={reduce} mobile={mobile} />)}

        {/* resolved state: centred logo + final line */}
        {!reduce && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <motion.div style={{ opacity: logoOpacity, scale: logoScale, position: "relative", width: "min(460px, 62vw)", aspectRatio: "3608 / 1258" }}>
              <Image src="/buddy-review-logo.png" alt="Buddy Review" fill sizes="460px" style={{ objectFit: "contain" }} />
            </motion.div>
            <motion.p style={{ ...DISPLAY, opacity: lineOpacity, margin: "28px 0 0", fontSize: "clamp(20px, 2vw, 30px)", fontWeight: 500,
              letterSpacing: "0.04em", color: "rgba(255,255,255,0.88)" }}>
              data, people, results.
            </motion.p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes akh-ripple { 0% { transform: scale(0.6); opacity: 0; } 15% { opacity: 1; } 100% { transform: scale(4.2); opacity: 0; } }
        /* phones: keywords stack down the screen instead of spreading sideways */
        @media (max-width: 767px){
          .akh-kw{ font-size: min(15vw, 96px) !important; }
          .akh-lead{ white-space: normal !important; max-width: 70vw; }
        }
      `}</style>
    </section>
  );
}
