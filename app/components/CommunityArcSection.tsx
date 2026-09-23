"use client";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const FEATURES = [
  { emoji: "🎯", labelTh: "มีงานให้เลือก", labelEn: "More Jobs to Choose From", descTh: "จากหลากหลายแบรนด์", descEn: "From a wide range of brands" },
  { emoji: "🤝", labelTh: "รู้ก่อนรับงาน", labelEn: "Know Before You Accept", descTh: "เห็นรายละเอียดและค่าตอบแทน", descEn: "See details and pay upfront" },
  { emoji: "📊", labelTh: "วิเคราะห์ช่องฟรี", labelEn: "Free Channel Analysis", descTh: "รู้ว่าอะไรไวรัล", descEn: "Know what's trending, for free" },
  { emoji: "🌟", labelTh: "โปรไฟล์ชัดขึ้น", labelEn: "A Sharper Profile", descTh: "ให้แบรนด์รู้จักคุณมากขึ้น", descEn: "Help brands get to know you" },
];

// Category chips distributed across 3 genuinely parallel arcs (70px apart,
// see the SVG paths below). Each chip's top/left is computed so its center
// sits on its assigned line; positions were solved to guarantee zero
// overlap between any two chips (verified against real rendered chip sizes).
// Two chips per line sit near the horizontal center (x≈40-60%) so the middle
// of the composition reads as filled rather than a sparse gap between the
// left/right clusters.
type ArcChip = { label: string; icon: string; top: string; left: string; rotate: number };
const ARC_NODES: ArcChip[] = [
  // Outer line (topmost arc) — 6 chips
  { label: "TikTok Creator",icon: "🎵", top: "48.668%", left: "1.57%",  rotate: 2 },
  { label: "Family",        icon: "🧸", top: "38.973%", left: "19.79%", rotate: -1 },
  { label: "Tech",          icon: "📱", top: "33.979%", left: "36.42%", rotate: 1 },
  { label: "Beauty",        icon: "💄", top: "33.979%", left: "53.68%", rotate: -1 },
  { label: "Food & Travel", icon: "🍜", top: "39.441%", left: "68.89%", rotate: 2 },
  { label: "Lifestyle",     icon: "✨", top: "49.430%", left: "86.26%", rotate: -2 },
  // Middle line — 6 chips
  { label: "Gaming",        icon: "🎮", top: "63.155%", left: "2.54%",  rotate: -1 },
  { label: "Fitness",       icon: "🏋️", top: "53.653%", left: "17.70%", rotate: -2 },
  { label: "Skincare",      icon: "🧴", top: "47.879%", left: "34.26%", rotate: -2 },
  { label: "Home & Living", icon: "🪴", top: "47.879%", left: "52.65%", rotate: 2 },
  { label: "Fashion",       icon: "👗", top: "52.248%", left: "68.46%", rotate: 1 },
  { label: "Finance",       icon: "💰", top: "61.649%", left: "84.49%", rotate: 2 },
  // Inner line (bottommost arc) — 4 chips
  { label: "Education",     icon: "📚", top: "73.254%", left: "6.83%",  rotate: 1 },
  { label: "Sports",        icon: "⚽", top: "63.340%", left: "27.87%", rotate: -2 },
  { label: "Entertainment", icon: "🎬", top: "61.136%", left: "49.60%", rotate: -1 },
  { label: "Health & Wellness",icon: "🧘", top: "74.650%", left: "80.68%", rotate: 1 },
];

function ArcNodeCard({ node }: { node: ArcChip }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
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
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>

        {/* Arc + floating nodes */}
        <div className="community-arc-area" style={{ position: "relative", height: "510px", marginBottom: "8px" }} aria-hidden="true">
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              style={{ position: "absolute", top: node.top, left: node.left, transform: `rotate(${node.rotate}deg)` }}
            >
              <ArcNodeCard node={node} />
            </motion.div>
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
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
          {FEATURES.map((f) => (
            <div key={f.labelEn} style={{
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
          <a href="https://rank.buddyreview.co/" target="_blank" rel="noopener noreferrer" className="btn-glass-purple"
            style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 32px", textDecoration: "none" }}>
            {lang === "th" ? "สมัครฟรี" : "Sign Up Free"} →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px){
          .community-arc-area{ display: none; }
        }
      `}</style>
    </section>
  );
}
