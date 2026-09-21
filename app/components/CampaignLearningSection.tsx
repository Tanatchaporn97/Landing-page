"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

const STEPS = [
  { title: "See What Worked", titleTh: "ดูว่าอะไรได้ผล",
    desc: "ดูว่า Creator, Content และจังหวะแบบไหนทำผลงานได้ดีที่สุด",
    descEn: "See which Creators, content, and timing performed best." },
  { title: "Understand the Response", titleTh: "เข้าใจการตอบรับ",
    desc: "ดู Sentiment และ Feedback เพื่อเข้าใจว่าอะไรถึงความสนใจ และอะไรมีผลต่อความรู้สึกต่อแบรนด์",
    descEn: "Review sentiment and feedback to understand what drove interest and how people feel about the brand." },
  { title: "Choose the Next Move", titleTh: "เลือกก้าวต่อไป",
    desc: "สรุปสิ่งที่ควรต่อยอด ปรับ หรือหยุด สำหรับแคมเปญรอบถัดไป",
    descEn: "Summarize what to build on, adjust, or stop for the next campaign." },
];

const SENTIMENT = [
  { label: "Positive", labelTh: "เชิงบวก", value: 78, color: "#ffffff" },
  { label: "Neutral", labelTh: "กลาง ๆ", value: 18, color: "#ffffff" },
  { label: "Negative", labelTh: "เชิงลบ", value: 4, color: "#ffffff" },
];

const ACTIVITY_TILES = [
  { img: "/campaign-activity/activity-05.jpg" },
  { img: "/campaign-activity/activity-03.jpg" },
  { img: "/campaign-activity/activity-01.jpg" },
  { img: "/campaign-activity/activity-06.jpg" },
  { img: "/campaign-activity/activity-04.jpg" },
  { img: "/campaign-activity/activity-02.jpg" },
] as const;

// Floating-panel highlight style shared by every dashboard tile below
function floatStyle(isActive: boolean) {
  return {
    background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    borderRadius: "16px", padding: "16px 18px",
    border: isActive ? "1.5px solid rgba(95,38,229,0.35)" : "1.5px solid transparent",
    boxShadow: isActive ? "0 24px 40px -12px rgba(95,38,229,0.4)" : "0 16px 32px -10px rgba(95,38,229,0.25)",
    opacity: isActive ? 1 : 0.55,
    transform: isActive ? "translateY(-10px) scale(1.32)" : "scale(1.32)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, border-color 0.35s ease",
  };
}

export default function CampaignLearningSection({ lang }: { lang: "th" | "en" }) {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);

  // Cycle through the 3 steps (and their matching dashboard panels) every 5s,
  // pausing while the user is hovering the step list.
  useEffect(() => {
    if (autoPaused) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [autoPaused]);

  const resultActive = activeStep === 0;
  const reachActive = activeStep === 0;
  const sentimentActive = activeStep === 1;
  const whatsaidActive = activeStep === 1;
  const nextmoveActive = activeStep === 2;

  return (
    <div className="cl-grid" style={{ display: "grid", gridTemplateColumns: "0.72fr 1.28fr", gap: "56px", alignItems: "center" }}>
      {/* Left — eyebrow, heading, description, 3-step list */}
      <div className="cl-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <Badge variant="outline" className="border-white/40 text-white">Campaign Learning</Badge>
        </div>
        <h3 style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          <span style={{ color: "#ffffff" }}>Measure, Learn,</span>
          <br />
          <span style={{ color: "#ffffff" }}>
            Improve
          </span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: "380px" }}>
          {lang === "th"
            ? "เราไม่ได้ดูแค่ตัวเลข แต่สรุปให้ชัดว่าอะไรได้ผล คนสนใจอะไร และรอบต่อไปควรทำอะไรต่อ"
            : "We don't just look at the numbers — we summarize what worked, what resonated, and what to do next."}
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}
          onMouseEnter={() => setAutoPaused(true)}
          onMouseLeave={() => setAutoPaused(false)}
        >
          {STEPS.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div key={step.title} className="cl-step-item" onClick={() => setActiveStep(i)} style={{
                padding: "20px 22px",
                borderRadius: isActive ? "18px" : 0,
                background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                border: isActive ? "1.5px solid rgba(255,255,255,0.55)" : "1.5px solid transparent",
                borderBottom: i < STEPS.length - 1 && !isActive ? "1px solid rgba(255,255,255,0.18)" : undefined,
                backdropFilter: isActive ? "blur(16px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(16px)" : undefined,
                cursor: "pointer",
                transition: "background 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <CheckCircle2 size={20} stroke="#ffffff" strokeWidth={2} style={{ flexShrink: 0, transition: "stroke 0.35s ease" }} />
                  <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: 0, color: "#ffffff", transition: "color 0.35s ease" }}>
                    {step.title}
                  </h4>
                </div>
                <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)", margin: 0, transition: "color 0.35s ease" }}>
                  {lang === "th" ? step.desc : step.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right — reporting dashboard mockup */}
      <div className="cl-dashboard" style={{ position: "relative", minHeight: "322px", transform: "scale(0.7)", transformOrigin: "center" }}>
        {/* Base panel: Campaign activity grid */}
        <div style={{
          position: "relative", borderRadius: "24px", padding: "24px",
          background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 16px 32px -18px rgba(95,38,229,0.15)", backdropFilter: "blur(10px)",
          transform: "scale(0.8)",
        }}>
          <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: "0 0 14px" }}>
            {lang === "th" ? "กิจกรรมแคมเปญ" : "Campaign Activity"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {ACTIVITY_TILES.map((tile, i) => (
              <div key={i} style={{
                position: "relative", aspectRatio: "1 / 1", borderRadius: "14px",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Image src={tile.img} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Sentiment */}
        <div className="cl-float" style={{
          position: "absolute", top: "-28px", left: "-24px", width: "180px",
          ...floatStyle(sentimentActive),
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
            {lang === "th" ? "ความรู้สึก" : "Sentiment"}
          </p>
          {SENTIMENT.map((s) => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", ...KT, fontSize: "13px" }}>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>{lang === "th" ? s.labelTh : s.label}</span>
              <span style={{ color: "#5f26e5", fontWeight: 700 }}>{s.value}%</span>
            </div>
          ))}
        </div>

        {/* Floating: Campaign result */}
        <div className="cl-float" style={{
          position: "absolute", top: "36%", left: "-32px", width: "210px",
          ...floatStyle(resultActive),
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
            {lang === "th" ? "ผลลัพธ์แคมเปญ" : "Campaign Result"}
          </p>
          <div style={{ display: "flex", gap: "14px" }}>
            {[{ v: "161%", l: lang === "th" ? "การเข้าถึง" : "Reach" }, { v: "219%", l: lang === "th" ? "ยอดวิว" : "Views" }, { v: "5.33%", l: "ER" }].map((s) => (
              <div key={s.l}>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 800, color: "#5f26e5", margin: "0 0 2px" }}>{s.v}</p>
                <p style={{ ...KT, fontSize: "10px", color: "#ffffff", margin: 0 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Next move */}
        <div className="cl-float" style={{
          position: "absolute", top: "-20px", right: "-20px", width: "210px",
          ...floatStyle(nextmoveActive),
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{lang === "th" ? "ก้าวต่อไป" : "Next Move"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", ...KT, fontSize: "10px", fontWeight: 700, color: "#5f26e5" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5f26e5" }} />Live
            </span>
          </div>
          <p style={{ ...KT, fontSize: "13px", lineHeight: 1.6, color: "#ffffff", margin: 0, fontWeight: 600 }}>
            {lang === "th"
              ? "ลดคลิป How-to และเพิ่ม Creator ที่ทำ Review แบบก่อน-หลัง"
              : "Cut back on how-to clips and add more before-and-after style reviews."}
          </p>
        </div>

        {/* Floating: What people said */}
        <div className="cl-float" style={{
          position: "absolute", bottom: "-24px", left: "6%", width: "200px",
          ...floatStyle(whatsaidActive),
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
            {lang === "th" ? "คนพูดว่ายังไง" : "What People Said"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              lang === "th" ? "คอมเมนต์เชิงบวก" : "Positive comments",
              lang === "th" ? "คำถามที่ต้องตอบ" : "Questions to answer",
              lang === "th" ? "จุดที่ทำซ้ำได้" : "Repeatable content cues",
            ].map((txt) => (
              <span key={txt} style={{ ...KT, fontSize: "12px", fontWeight: 600, color: "#5f26e5",
                background: "rgba(95,38,229,0.06)", borderRadius: "8px", padding: "6px 10px" }}>
                {txt}
              </span>
            ))}
          </div>
        </div>

        {/* Floating: Reach by day */}
        <div className="cl-float" style={{
          position: "absolute", bottom: "-32px", right: "-16px", width: "230px",
          ...floatStyle(reachActive),
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
            {lang === "th" ? "การเข้าถึงรายวัน" : "Reach by Day"}
          </p>
          <svg viewBox="0 0 200 50" width="100%" height="44" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cl-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5f25e5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5f25e5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,35 C15,33 25,10 40,15 C55,20 60,40 75,38 C90,36 95,15 110,18 C125,21 130,33 145,30 C160,27 165,18 180,20 L200,22 L200,50 L0,50 Z" fill="url(#cl-area)" />
            <path d="M0,35 C15,33 25,10 40,15 C55,20 60,40 75,38 C90,36 95,15 110,18 C125,21 130,33 145,30 C160,27 165,18 180,20 L200,22" fill="none" stroke="#5f25e5" strokeWidth="2" />
          </svg>
          <p style={{ ...KT, fontSize: "11px", color: "#ffffff", margin: "6px 0 0" }}>
            {lang === "th" ? "ดูช่วงพีค แล้วทำซ้ำสิ่งที่ได้ผล" : "Watch the spike, then reuse the cue."}
          </p>
        </div>
      </div>

      {/* Shared gradient definition used by every step icon above (purple → pink, matches site CI) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="clStepIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5f25e5" />
            <stop offset="100%" stopColor="#ff0089" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        .cl-step-item:hover{
          background: rgba(255,255,255,0.18) !important;
          border-color: rgba(255,255,255,0.55) !important;
          border-radius: 18px !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        @media (max-width: 900px){
          .cl-grid{ grid-template-columns: 1fr !important; gap: 40px !important; }
          .cl-left{ max-width: none !important; }
          .cl-dashboard{ margin-top: 40px; }
        }
        @media (max-width: 640px){
          .cl-float{ position: static !important; width: 100% !important; margin-bottom: 12px; }
          .cl-dashboard{ display: flex; flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
