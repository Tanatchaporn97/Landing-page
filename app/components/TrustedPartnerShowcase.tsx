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

      {/* B·U·D·D·Y cards — one row; on narrower screens the row scrolls
          sideways (snap) instead of wrapping, so the word stays intact. */}
      <div className="tps-row">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className="tps-card-wrap"
            variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.03, y: -4 } }}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <div className="tps-card" style={{
              ...KT, position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box",
              display: "flex", flexDirection: "column", padding: "24px 22px", borderRadius: "16px",
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 8px 28px rgba(95,38,229,0.08)",
              transition: "box-shadow 0.3s",
            }}>
              {/* decorative letter — same slot and spring motion as GradientCard's image */}
              <motion.span
                aria-hidden="true"
                variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 3 } }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  ...KT, position: "absolute", right: "-4%", bottom: "-22%", fontSize: "190px", fontWeight: 800, lineHeight: 1,
                  background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  opacity: 0.85, pointerEvents: "none", userSelect: "none", transformOrigin: "70% 70%",
                }}
              >
                {item.letter}
              </motion.span>

              <div style={{ position: "relative", zIndex: 1, maxWidth: "88%" }}>
                <h4 style={{ ...KT, fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 8px", lineHeight: 1.3 }}>
                  {item.title}
                </h4>
                <p style={{ ...KT, fontSize: "14px", lineHeight: 1.6, color: "rgba(55,65,81,0.85)", margin: 0 }}>
                  {lang === "th" ? item.desc : item.descEn}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .tps-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .tps-card-wrap{ min-height: 250px; }
        .tps-card-wrap:hover .tps-card{ box-shadow: 0 16px 36px rgba(95,38,229,0.16) !important; }
        @media (max-width: 1100px){
          .tps-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 8px 24px 20px; scroll-padding-inline: 24px; }
          .tps-row::-webkit-scrollbar{ display: none; }
          .tps-card-wrap{ flex: 0 0 240px; scroll-snap-align: start; }
        }
        @media (max-width: 560px){
          .tps-card-wrap{ flex-basis: 72vw; }
        }
      `}</style>
    </div>
  );
}
