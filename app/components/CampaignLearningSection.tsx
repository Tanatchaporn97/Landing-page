"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  { label: "Positive", labelTh: "เชิงบวก", value: 78, color: "linear-gradient(90deg, #5f25e5, #ff0089)" },
  { label: "Neutral", labelTh: "กลาง ๆ", value: 18, color: "#b39cf2" },
  { label: "Negative", labelTh: "เชิงลบ", value: 4, color: "#ff8fb8" },
];

// Step 03 — mirrors the step copy: build on / adjust / stop
const NEXT_MOVES = [
  { key: "keep",   tag: "KEEP",   tagTh: "ต่อยอด", th: "Event Vlog กับครีเอเตอร์",   en: "Event vlogs with creators",  color: "#15803d", bg: "rgba(22,163,74,0.12)" },
  { key: "adjust", tag: "ADJUST", tagTh: "ปรับ",   th: "โพสต์ช่วง 19:00–21:00",       en: "Post at 19:00–21:00",        color: "#5f26e5", bg: "rgba(95,38,229,0.1)" },
  { key: "stop",   tag: "STOP",   tagTh: "หยุด",   th: "คลิป How-to ยาว ๆ",            en: "Long how-to clips",          color: "#d1007a", bg: "rgba(255,0,137,0.1)" },
];

// Step 02 — sample audience comments about the event in the photos
const COMMENTS = [
  { avatar: "/trust-influencers/puifai.jpg", th: "บรรยากาศงานน่ารักมาก อยากไปอีก 💜", en: "Loved the vibe — want to go again 💜" },
  { avatar: "/trust-influencers/cheese.jpg", th: "ของในงานคุ้มสุด ๆ ไปมาแล้ว!",        en: "Great deals at the event, been there!" },
];

const ACTIVITY_TILES = [
  { img: "/campaign-activity/activity-05.jpg" },
  { img: "/campaign-activity/activity-03.jpg" },
  { img: "/campaign-activity/activity-01.jpg" },
  { img: "/campaign-activity/activity-02.jpg" },
  { img: "/campaign-activity/activity-06.jpg" },
  { img: "/campaign-activity/activity-04.jpg" },
] as const;

const GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

// Floating-panel style shared by every dashboard tile below. Idle panels stay
// legible white glass; the panels for the active step turn solid white, lift,
// and get a purple→pink gradient ring so the step ↔ panel link is obvious.
function floatStyle(isActive: boolean) {
  return {
    background: isActive
      ? `linear-gradient(#ffffff, #ffffff) padding-box, ${GRAD} border-box`
      : "rgba(255,255,255,0.8)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    borderRadius: "16px", padding: "14px 16px",
    border: isActive ? "2px solid transparent" : "2px solid rgba(255,255,255,0.6)",
    boxShadow: isActive ? "0 24px 44px -12px rgba(255,0,137,0.35)" : "0 14px 28px -12px rgba(20,4,92,0.45)",
    opacity: isActive ? 1 : 0.72,
    transform: isActive ? "translateY(-10px) scale(1.32)" : "scale(1.32)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
  };
}

// Small "01 · Title" tag at the top of each floating panel, tying it to a step.
function StepTag({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
      <span style={{
        ...KT, fontSize: "9px", fontWeight: 800, letterSpacing: "0.04em", borderRadius: "50px", padding: "2px 7px",
        color: active ? "#ffffff" : "#5f26e5", background: active ? GRAD : "rgba(95,38,229,0.1)",
        transition: "background 0.35s ease, color 0.35s ease",
      }}>
        {String(n).padStart(2, "0")}
      </span>
      <span style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#5f26e5" }}>{label}</span>
    </div>
  );
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
                backdropFilter: isActive ? "blur(16px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(16px)" : undefined,
                cursor: "pointer",
                transition: "background 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{
                    ...KT, flexShrink: 0, fontSize: "12px", fontWeight: 800, borderRadius: "50px", padding: "3px 10px",
                    color: isActive ? "#5f26e5" : "#ffffff", background: isActive ? "#ffffff" : "rgba(255,255,255,0.16)",
                    border: isActive ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.4)",
                    transition: "background 0.35s ease, border-color 0.35s ease, color 0.35s ease",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
          <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 14px" }}>
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

        {/* Floating: Sentiment — step 02 */}
        <div className="cl-float" style={{ position: "absolute", top: "-28px", left: "-24px", width: "190px", ...floatStyle(sentimentActive) }}>
          <StepTag n={2} label={lang === "th" ? "ความรู้สึกต่อแคมเปญ" : "Sentiment"} active={sentimentActive} />
          {SENTIMENT.map((s) => (
            <div key={s.label} style={{ marginBottom: "7px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", ...KT, fontSize: "11px", marginBottom: "3px" }}>
                <span style={{ color: "#111827", fontWeight: 700 }}>{lang === "th" ? s.labelTh : s.label}</span>
                <span style={{ color: "#5f26e5", fontWeight: 800 }}>{s.value}%</span>
              </div>
              <div style={{ height: "6px", borderRadius: "6px", background: "rgba(95,38,229,0.1)", overflow: "hidden" }}>
                <div style={{ width: `${s.value}%`, height: "100%", borderRadius: "6px", background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Floating: Campaign result vs target — step 01 */}
        <div className="cl-float" style={{ position: "absolute", top: "36%", left: "-32px", width: "214px", ...floatStyle(resultActive) }}>
          <StepTag n={1} label={lang === "th" ? "ผลลัพธ์เทียบเป้า" : "Result vs Target"} active={resultActive} />
          <div style={{ display: "flex", gap: "12px" }}>
            {[{ v: "161%", l: lang === "th" ? "การเข้าถึง" : "Reach" }, { v: "219%", l: lang === "th" ? "ยอดวิว" : "Views" }, { v: "5.33%", l: "ER" }].map((st) => (
              <div key={st.l}>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 800, margin: "0 0 2px", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{st.v}</p>
                <p style={{ ...KT, fontSize: "10px", color: "#374151", margin: 0, fontWeight: 600 }}>{st.l}</p>
              </div>
            ))}
          </div>
          <p style={{ ...KT, fontSize: "10px", fontWeight: 700, color: "#16a34a", margin: "8px 0 0" }}>
            ▲ {lang === "th" ? "เกินเป้าทุกตัวชี้วัด" : "Above target on every KPI"}
          </p>
        </div>

        {/* Floating: Next move — step 03: build on / adjust / stop */}
        <div className="cl-float" style={{ position: "absolute", top: "-20px", right: "-20px", width: "232px", ...floatStyle(nextmoveActive) }}>
          <StepTag n={3} label={lang === "th" ? "แผนรอบถัดไป" : "Next Campaign Plan"} active={nextmoveActive} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {NEXT_MOVES.map((m) => (
              <div key={m.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ ...KT, flexShrink: 0, width: "44px", textAlign: "center", fontSize: "9px", fontWeight: 800, borderRadius: "6px", padding: "3px 0", color: m.color, background: m.bg }}>
                  {lang === "th" ? m.tagTh : m.tag}
                </span>
                <span style={{ ...KT, fontSize: "11px", fontWeight: 600, color: "#111827", lineHeight: 1.35 }}>{lang === "th" ? m.th : m.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: What people said — step 02 */}
        <div className="cl-float" style={{ position: "absolute", bottom: "-24px", left: "6%", width: "214px", ...floatStyle(whatsaidActive) }}>
          <StepTag n={2} label={lang === "th" ? "คนพูดถึงงานว่า" : "What People Said"} active={whatsaidActive} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {COMMENTS.map((c) => (
              <div key={c.en} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                <span style={{ position: "relative", width: "20px", height: "20px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={c.avatar} alt="" fill sizes="20px" style={{ objectFit: "cover" }} />
                </span>
                <span style={{ ...KT, fontSize: "11px", fontWeight: 600, color: "#111827", background: "rgba(95,38,229,0.07)", borderRadius: "4px 10px 10px 10px", padding: "5px 8px", lineHeight: 1.35 }}>
                  {lang === "th" ? c.th : c.en}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Reach by day with the event-day peak — step 01 */}
        <div className="cl-float" style={{ position: "absolute", bottom: "-32px", right: "-16px", width: "232px", ...floatStyle(reachActive) }}>
          <StepTag n={1} label={lang === "th" ? "การเข้าถึงรายวัน" : "Reach by Day"} active={reachActive} />
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 200 50" width="100%" height="44" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cl-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0089" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#5f25e5" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="cl-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5f25e5" /><stop offset="100%" stopColor="#ff0089" />
                </linearGradient>
              </defs>
              <path d="M0,40 C20,38 35,34 50,32 C65,30 72,8 85,6 C98,4 104,26 118,30 C135,34 150,26 165,24 C180,22 190,25 200,24 L200,50 L0,50 Z" fill="url(#cl-area)" />
              <path d="M0,40 C20,38 35,34 50,32 C65,30 72,8 85,6 C98,4 104,26 118,30 C135,34 150,26 165,24 C180,22 190,25 200,24" fill="none" stroke="url(#cl-line)" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* event-day peak marker */}
            <span style={{ position: "absolute", left: "42%", top: "2px", width: "8px", height: "8px", borderRadius: "50%", background: "#ff0089", border: "2px solid #fff", boxShadow: "0 0 0 3px rgba(255,0,137,0.2)" }} />
            <span style={{ ...KT, position: "absolute", left: "48%", top: "-4px", fontSize: "9px", fontWeight: 800, color: "#ff0089", whiteSpace: "nowrap" }}>
              {lang === "th" ? "วันจัดงาน" : "Event day"}
            </span>
          </div>
          <p style={{ ...KT, fontSize: "11px", color: "#374151", margin: "6px 0 0", fontWeight: 600 }}>
            {lang === "th" ? "พีคตรงวันอีเวนต์ — ทำซ้ำจังหวะนี้" : "Peaked on event day — repeat that timing."}
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
        @media (max-width: 900px){
          .cl-grid{ grid-template-columns: 1fr !important; gap: 40px !important; }
          .cl-left{ max-width: none !important; }
          .cl-dashboard{ margin-top: 40px; }
        }
        @media (max-width: 640px){
          /* Keep the dashboard as one compact composition (floating panels
             stay absolutely positioned, same as desktop) instead of
             unstacking it into a tall list of full-width cards — just zoom
             the whole thing down so it fits the viewport. zoom shrinks the
             layout box itself (unlike transform: scale), so surrounding
             spacing shrinks along with it instead of leaving dead space. */
          .cl-dashboard{ zoom: 0.62; margin: 40px auto 0; }
        }
        @media (max-width: 420px){
          .cl-dashboard{ zoom: 0.52; }
        }
      `}</style>
    </div>
  );
}
