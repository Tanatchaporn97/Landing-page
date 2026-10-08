"use client";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const FEATURES = [
  { emoji: "🎯", labelTh: "มีงานให้เลือก", labelEn: "More Jobs to Choose From", descTh: "จากหลากหลายแบรนด์", descEn: "From a wide range of brands" },
  { emoji: "🤝", labelTh: "รู้ก่อนรับงาน", labelEn: "Know Before You Accept", descTh: "เห็นรายละเอียดและค่าตอบแทน", descEn: "See details and pay upfront" },
  { emoji: "📊", labelTh: "วิเคราะห์ช่องฟรี", labelEn: "Free Channel Analysis", descTh: "รู้ว่าอะไรไวรัล", descEn: "Know what's trending, for free" },
  { emoji: "🌟", labelTh: "โปรไฟล์ชัดขึ้น", labelEn: "A Sharper Profile", descTh: "ให้แบรนด์รู้จักคุณมากขึ้น", descEn: "Help brands get to know you" },
];

// Category chips loosely scattered along the 3 parallel arcs (SVG paths
// below). x/y are chip CENTERS (placed with translate(-50%,-50%)), each
// within ~10px of its arc. Positions came from a randomized search scored for
// balance rather than symmetry: 8 chips per side, similar visual weight and
// long-label count left vs right, even coverage along each arc, no chip
// stacked in a column above another, no overlaps, and a clear zone for the
// headline under the inner arc's apex. Tilts are mixed so nothing reads as
// a grid.
type ArcChip = { label: string; icon: string; x: string; y: string; rotate: number };
const ARC_NODES: ArcChip[] = [
  // Outer arc
  { label: "Education",         icon: "📚", x: "20.96%", y: "44.51%", rotate: -2.6 },
  { label: "Home & Living",     icon: "🪴", x: "37.01%", y: "39.00%", rotate: 1.8 },
  { label: "Skincare",          icon: "🧴", x: "53.40%", y: "36.49%", rotate: -1.2 },
  { label: "TikTok Creator",    icon: "🎵", x: "69.43%", y: "40.99%", rotate: 2.4 },
  { label: "Tech",              icon: "📱", x: "88.98%", y: "50.84%", rotate: -3.2 },
  // Middle arc
  { label: "Sports",            icon: "⚽", x: "11.82%", y: "63.13%", rotate: 2.8 },
  { label: "Entertainment",     icon: "🎬", x: "26.54%", y: "57.33%", rotate: -1.6 },
  { label: "Fashion",           icon: "👗", x: "42.39%", y: "51.00%", rotate: 3.0 },
  { label: "Fitness",           icon: "🏋️", x: "58.76%", y: "53.23%", rotate: -2.2 },
  { label: "Gaming",            icon: "🎮", x: "75.59%", y: "56.23%", rotate: 1.2 },
  { label: "Family",            icon: "🧸", x: "90.46%", y: "65.07%", rotate: -3.4 },
  // Inner arc — center chip rides the apex; headline sits just below it
  { label: "Lifestyle",         icon: "✨", x: "6.65%", y: "81.81%", rotate: 2.0 },
  { label: "Health & Wellness", icon: "🧘", x: "31.72%", y: "69.25%", rotate: -1.8 },
  { label: "Beauty",            icon: "💄", x: "47.81%", y: "66.81%", rotate: 3.2 },
  { label: "Food & Travel",     icon: "🍜", x: "64.11%", y: "69.14%", rotate: -2.6 },
  { label: "Finance",           icon: "💰", x: "83.65%", y: "77.08%", rotate: 1.4 },
];

function ArcNodeCard({ node }: { node: ArcChip }) {
  return (
    <div className="arc-chip" style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minWidth: "118px", boxSizing: "border-box",
      background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "50px",
      padding: "8px 16px 8px 8px",
      boxShadow: "0 12px 28px rgba(95,38,229,0.14)",
      whiteSpace: "nowrap",
    }}>
      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
        {node.icon}
      </div>
      <span style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#111827" }}>{node.label}</span>
    </div>
  );
}

export default function CommunityArcSection({ lang }: { lang: "th" | "en" }) {
  return (
    <section className="community-arc-section" style={{ position: "relative", padding: "100px 48px", overflow: "hidden" }}>
      {/* No panel/frame — the section reads as one unit because the headline
          sits inside the arc's curve (see the arc area's negative bottom
          margin) and a single large glow spans both. */}
      <div aria-hidden="true" className="community-arc-glow" style={{
        position: "absolute", left: "50%", top: "120px", width: "min(1100px, 100%)", height: "620px", transform: "translateX(-50%)",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(closest-side, rgba(95,38,229,0.09) 0%, rgba(255,0,137,0.045) 50%, transparent 100%)",
      }} />
      <div style={{ position: "relative", maxWidth: "980px", margin: "0 auto" }}>

        {/* Arc + floating nodes — top ~30% of this area is empty sky above the
            outer arc, so pull it up (clipped by the section). The large negative
            bottom margin lifts the headline into the empty space under the inner
            arc's apex, between the Education and Health & Wellness chips. */}
        {/* Wider than the 980px text column (up to 1180px, centered) so the chips
            have room to spread out instead of crowding the middle. */}
        <div className="community-arc-area" style={{
          position: "relative", height: "510px", marginTop: "-110px", marginBottom: "-108px",
          width: "min(1180px, calc(100vw - 96px))", left: "50%", transform: "translateX(-50%)",
        }} aria-hidden="true">
          <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcFadeOuter" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(95,38,229,0)" />
                <stop offset="15%" stopColor="rgba(95,38,229,0.45)" />
                <stop offset="85%" stopColor="rgba(95,38,229,0.45)" />
                <stop offset="100%" stopColor="rgba(95,38,229,0)" />
              </linearGradient>
              <linearGradient id="arcFadeMiddle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,0,137,0)" />
                <stop offset="15%" stopColor="rgba(255,0,137,0.35)" />
                <stop offset="85%" stopColor="rgba(255,0,137,0.35)" />
                <stop offset="100%" stopColor="rgba(255,0,137,0)" />
              </linearGradient>
              <linearGradient id="arcFadeInner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(95,38,229,0)" />
                <stop offset="15%" stopColor="rgba(95,38,229,0.28)" />
                <stop offset="85%" stopColor="rgba(95,38,229,0.28)" />
                <stop offset="100%" stopColor="rgba(95,38,229,0)" />
              </linearGradient>
            </defs>
            {/* 3 concentric arcs, each a pure vertical translate of the last —
                70px apart (510px tall area -> 70/510*100 = 13.725 viewBox units)
                so the gap between any two lines is constant everywhere, not just at the apex. */}
            <path d="M-8,68.824 Q50,7.059 108,68.824" fill="none" stroke="url(#arcFadeOuter)" strokeWidth="1" strokeDasharray="1.4 1.6" vectorEffect="non-scaling-stroke" />
            <path d="M-8,82.549 Q50,20.784 108,82.549" fill="none" stroke="url(#arcFadeMiddle)" strokeWidth="1" strokeDasharray="1.4 1.6" vectorEffect="non-scaling-stroke" />
            <path d="M-8,96.275 Q50,34.510 108,96.275" fill="none" stroke="url(#arcFadeInner)" strokeWidth="1" strokeDasharray="1.4 1.6" vectorEffect="non-scaling-stroke" />
          </svg>

          {ARC_NODES.map((node, i) => (
            // Outer div owns placement (center on the arc + tilt); inner
            // motion.div owns the entrance animation, so motion's transform
            // never overrides the positioning transform.
            <div key={node.label} style={{ position: "absolute", left: node.x, top: node.y, transform: `translate(-50%, -50%) rotate(${node.rotate}deg)` }}>
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <ArcNodeCard node={node} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* phones: the arc can't fit, so show the same chips as a compact, gently tilted cloud */}
        <div className="community-arc-mobile" aria-hidden="true">
          {ARC_NODES.map((node) => (
            <span key={node.label} className="cam-chip" style={{ transform: `rotate(${node.rotate * 0.6}deg)` }}>
              <span className="cam-icon">{node.icon}</span>{node.label}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h2 style={{
          ...KT, textAlign: "center", fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700,
          color: "#111827", margin: "0 0 16px", lineHeight: 1.2,
        }}>
          Grow as a{" "}
          <span style={{
            background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Creator
          </span>
        </h2>

        {/* Subhead */}
        <p style={{
          ...KT, textAlign: "center", fontSize: "16px", fontWeight: 400,
          color: "#111827", margin: "0 0 40px", lineHeight: 1.7,
        }}>
          {lang === "th"
            ? <>Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น<br />ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำและทีมงานที่ช่วยเหลือทุกขั้นตอน</>
            : <>Buddy Review makes being an influencer easier<br />with a system that connects you to leading brands and a team that supports every step.</>}
        </p>

        {/* 4-box row */}
        <div className="cas-features" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
          {FEATURES.map((f) => (
            <div key={f.labelEn} className="cas-feature" style={{
              position: "relative", width: "220px",
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)", borderRadius: "18px",
              padding: "18px 18px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            }}>
              <span style={{ fontSize: "18px", position: "absolute", top: "12px", right: "14px" }}>{f.emoji}</span>
              <p style={{ ...KT, fontSize: "20px", fontWeight: 800, margin: "0 0 4px", lineHeight: 1.25, color: "#5f26e5", maxWidth: "150px" }}>
                {lang === "th" ? f.labelTh : f.labelEn}
              </p>
              <p style={{ ...KT, fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0 }}>
                {lang === "th" ? f.descTh : f.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <a href="https://rank.buddyreview.co/" target="_blank" rel="noopener noreferrer" className="inf-cta" style={KT}>
            {lang === "th" ? "สมัครฟรี" : "Sign Up Free"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>

      <style>{`
        /* Narrow desktop/tablet: the arc area is only ~700-900px wide, so
           shrink the chips a little to keep clear gaps between columns. */
        @media (min-width: 761px) and (max-width: 1000px){
          .arc-chip{ zoom: 0.86; }
        }
        .community-arc-mobile{ display: none; }
        @media (max-width: 760px){
          .community-arc-area{ display: none; }
          .community-arc-mobile{ display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 6px; margin: 0 0 28px; }
          .cam-chip{ display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px 4px 4px; border-radius: 999px; white-space: nowrap;
            background: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 6px 14px rgba(95,38,229,0.12);
            font-family: var(--font-kanit),'Noto Sans Thai',sans-serif; font-size: 11px; font-weight: 700; color: #111827; }
          .cam-icon{ width: 20px; height: 20px; border-radius: 50%; background: #f3f4f6; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; }
          /* 4 feature boxes → 2 columns × 2 rows */
          .cas-features{ display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px !important; }
          .cas-feature{ width: auto !important; padding: 14px 12px 12px !important; border-radius: 16px !important; }
          .cas-feature p:first-of-type{ font-size: 16px !important; max-width: 82% !important; }
          .cas-feature p:last-of-type{ font-size: 12px !important; }
          .cas-feature > span{ font-size: 15px !important; top: 10px !important; right: 10px !important; }
          .community-arc-section{ padding-left: 16px !important; padding-right: 16px !important; }
          .community-arc-glow{ top: 0 !important; height: 100% !important; }
        }
      `}</style>
    </section>
  );
}
