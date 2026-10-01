"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

// The five principles spell B·U·D·D·Y. Each card keeps the site's original
// GradientCard look (white glass, Kanit type) and its hover motion — the card
// springs up while the big letter (in the decorative-graphic slot, bottom
// right) scales and tilts, like the old icon images did.
const ITEMS = [
  { letter: "B", title: "Built on Clarity",         desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                 descEn: "Clear, systematic work held to a consistent standard." },
  { letter: "U", title: "Unified by Insight",       desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",          descEn: "Shared goals, sharpened by insight." },
  { letter: "D", title: "Data-Driven Decisions",    desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",   descEn: "Data guides every call — from choosing creators to measuring results." },
  { letter: "D", title: "Delivery with Discipline", desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",         descEn: "Systematic management and delivery, from start to finish." },
  { letter: "Y", title: "Your Goals Drive Results", desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",            descEn: "Results tied to your brand's real goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div>
      {/* Header — badge, gradient Kanit headline, subtitle; brand CTA on the right */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <Badge variant="outline">How We Work</Badge>
          </div>
          <h3 style={{
            ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15,
            background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            What Goes Into Every Campaign
          </h3>
          <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
            {lang === "th"
              ? "วิธีทำงานที่ช่วยให้ทุกแคมเปญชัดเจน เป็นระบบ และเดินไปสู่เป้าหมายเดียวกัน"
              : "The principles behind how we think, work, and deliver."}
          </p>
        </div>
        <Link href={`/${lang}/brand`}
          className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
          style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 12px 12px 24px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
          {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
          <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </Link>
      </div>

      {/* B·U·D·D·Y cards — one row with a gentle wave offset on desktop; on
          narrower screens the row scrolls sideways (snap) so the word stays
          intact. Each big letter starts as an outline and fills with the
          brand gradient from the bottom when the row scrolls into view,
          staggered B → U → D → D → Y so the word "spells itself". */}
      <div className="tps-row">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className="tps-card-wrap"
            // The card drives the reveal (children inherit "hidden"/"show"),
            // so the letter fill starts as soon as the card itself is in view.
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <div className="tps-card" style={KT}>
              <div aria-hidden="true" className="tps-glow" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", color: "#5f26e5", background: "rgba(95,38,229,0.08)", borderRadius: "50px", padding: "4px 10px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="tps-dot" />
              </div>

              {/* outline letter + gradient fill overlay revealed bottom-up */}
              <div aria-hidden="true" className="tps-letter-box">
                <span className="tps-letter tps-letter-outline">{item.letter}</span>
                <motion.span
                  className="tps-letter tps-letter-fill"
                  variants={{
                    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                    show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, delay: 0.35 + i * 0.18, ease: [0.65, 0, 0.35, 1] } },
                  }}
                >
                  {item.letter}
                </motion.span>
              </div>

              <div style={{ position: "relative", zIndex: 1, marginTop: "auto" }}>
                <h4 style={{ ...KT, fontSize: "19px", fontWeight: 700, color: "#111827", margin: "0 0 8px", lineHeight: 1.3 }}>
                  {item.title}
                </h4>
                <p style={{ ...KT, fontSize: "14px", lineHeight: 1.6, color: "rgba(55,65,81,0.85)", margin: 0 }}>
                  {lang === "th" ? item.desc : item.descEn}
                </p>
              </div>

              <span aria-hidden="true" className="tps-bar" />
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .tps-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; align-items: start; padding-bottom: 32px; }
        /* wave: 2nd and 4th cards sit lower */
        @media (min-width: 1101px){ .tps-card-wrap:nth-child(even){ margin-top: 32px; } }
        .tps-card{
          position: relative; overflow: hidden; box-sizing: border-box; min-height: 330px;
          display: flex; flex-direction: column; gap: 6px; padding: 20px 22px 24px; border-radius: 20px;
          background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 8px 28px rgba(95,38,229,0.08);
          transition: transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s ease, background 0.45s ease;
        }
        .tps-card:hover{ transform: translateY(-8px); background: rgba(255,255,255,0.75); box-shadow: 0 22px 44px -16px rgba(95,38,229,0.32); }
        .tps-glow{
          position: absolute; left: 50%; top: 34%; width: 220px; height: 220px; transform: translate(-50%,-50%) scale(0.6);
          border-radius: 50%; pointer-events: none; opacity: 0;
          background: radial-gradient(circle, rgba(255,0,137,0.22) 0%, rgba(95,38,229,0.16) 45%, transparent 70%);
          transition: opacity 0.45s ease, transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .tps-card:hover .tps-glow{ opacity: 1; transform: translate(-50%,-50%) scale(1); }
        .tps-dot{ width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(45deg, #5f25e5, #ff0089); opacity: 0.35; transition: opacity 0.3s, transform 0.3s; }
        .tps-card:hover .tps-dot{ opacity: 1; transform: scale(1.4); }
        .tps-letter-box{ position: relative; z-index: 1; height: 150px; margin: 4px 0 8px; transition: transform 0.5s cubic-bezier(.22,1,.36,1); transform-origin: left bottom; }
        .tps-card:hover .tps-letter-box{ transform: scale(1.06) rotate(-2deg); }
        .tps-letter{
          position: absolute; left: -4px; top: 0; font-family: var(--font-kanit),'Noto Sans Thai',sans-serif;
          font-size: 150px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; user-select: none;
        }
        .tps-letter-outline{ color: transparent; -webkit-text-stroke: 2px rgba(95,38,229,0.28); }
        .tps-letter-fill{
          background: linear-gradient(160deg, #5f25e5 0%, #b21fb8 55%, #ff0089 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .tps-bar{
          position: absolute; left: 0; bottom: 0; height: 4px; width: 100%;
          background: linear-gradient(90deg, #5f25e5, #ff0089);
          transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .tps-card:hover .tps-bar{ transform: scaleX(1); }
        @media (max-width: 1100px){
          .tps-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 8px 24px 24px; scroll-padding-inline: 24px; }
          .tps-row::-webkit-scrollbar{ display: none; }
          .tps-card-wrap{ flex: 0 0 240px; scroll-snap-align: start; }
        }
        @media (max-width: 560px){
          .tps-card-wrap{ flex-basis: 72vw; }
        }
        @media (prefers-reduced-motion: reduce){
          .tps-card, .tps-glow, .tps-letter-box, .tps-bar, .tps-dot{ transition: none; }
        }
      `}</style>
    </div>
  );
}
