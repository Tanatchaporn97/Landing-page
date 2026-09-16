"use client";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const STEPS = [
  { num: "01", title: "See What Worked", titleTh: "ดูว่าอะไรได้ผล",
    desc: "ดูว่า Creator, Content และจังหวะแบบไหนทำผลงานได้ดีที่สุด",
    descEn: "See which Creators, content, and timing performed best.", highlight: true },
  { num: "02", title: "Understand the Response", titleTh: "เข้าใจการตอบรับ",
    desc: "ดู Sentiment และ Feedback เพื่อเข้าใจว่าอะไรถึงความสนใจ และอะไรมีผลต่อความรู้สึกต่อแบรนด์",
    descEn: "Review sentiment and feedback to understand what drove interest and how people feel about the brand." },
  { num: "03", title: "Choose the Next Move", titleTh: "เลือกก้าวต่อไป",
    desc: "สรุปสิ่งที่ควรต่อยอด ปรับ หรือหยุด สำหรับแคมเปญรอบถัดไป",
    descEn: "Summarize what to build on, adjust, or stop for the next campaign." },
];

const SENTIMENT = [
  { label: "Positive", labelTh: "เชิงบวก", value: "78%" },
  { label: "Neutral", labelTh: "กลาง ๆ", value: "18%" },
  { label: "Negative", labelTh: "เชิงลบ", value: "4%" },
];

const RESULT_STATS = [
  { v: "161%", l: "Reach" },
  { v: "219%", l: "Views" },
  { v: "5.33%", l: "ER" },
];

const COMMENT_RIBBONS = [
  { label: "Positive Comments", labelTh: "คอมเมนต์เชิงบวก", bg: "#5f26e5" },
  { label: "Neutral Comments", labelTh: "คอมเมนต์กลาง ๆ", bg: "#8b6fe8" },
  { label: "Negative Comments", labelTh: "คอมเมนต์เชิงลบ", bg: "#c4b5fd" },
];

const ACTIVITY_TILES = [
  "linear-gradient(135deg, #f6b88a 0%, #b78ce0 100%)",
  "linear-gradient(135deg, #ffb3d9 0%, #d9a8ff 100%)",
  "linear-gradient(135deg, #93b8ff 0%, #5f6fd9 100%)",
  "linear-gradient(135deg, #ffb3d9 0%, #ff8fc7 100%)",
  "linear-gradient(135deg, #ffcf8f 0%, #ff9f7a 100%)",
  "linear-gradient(135deg, #8fe8d0 0%, #6fc6c0 100%)",
];

export default function CampaignLearningSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="cl-grid" style={{ display: "grid", gridTemplateColumns: "0.72fr 1.28fr", gap: "56px", alignItems: "center" }}>
      {/* Left — eyebrow, heading, description, 3-step list */}
      <div className="cl-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "#5f26e5", textTransform: "uppercase" }}>
          {lang === "th" ? "การเรียนรู้จากแคมเปญ" : "Campaign Learning"}
        </span>
        <h3 style={{ ...KT, fontSize: "clamp(28px,3.3vw,44px)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          <span style={{ color: "#111827" }}>{lang === "th" ? "วัดผล เรียนรู้" : "Measure, Learn,"}</span>
          <br />
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {lang === "th" ? "และพัฒนาต่อ" : "Improve"}
          </span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#4b5563", margin: 0, maxWidth: "380px" }}>
          {lang === "th"
            ? "เราไม่ได้ดูแค่ตัวเลข แต่สรุปให้ชัดว่าอะไรได้ผล คนสนใจอะไร และรอบต่อไปควรทำอะไรต่อ"
            : "We don't just look at the numbers — we summarize what worked, what resonated, and what to do next."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{
              padding: "20px 22px",
              borderRadius: step.highlight ? "18px" : 0,
              background: step.highlight ? "rgba(95,38,229,0.06)" : "transparent",
              border: step.highlight ? "1px solid rgba(95,38,229,0.15)" : "none",
              borderBottom: !step.highlight && i < STEPS.length - 1 ? "1px solid rgba(95,38,229,0.12)" : (!step.highlight ? "none" : undefined),
              marginBottom: step.highlight ? "4px" : 0,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                <span style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#9ca3af" }}>{step.num}</span>
                <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: 0, color: "#111827" }}>
                  {lang === "th" ? step.titleTh : step.title}
                </h4>
              </div>
              <p style={{ ...KT, fontSize: "14px", lineHeight: 1.7, color: "#6b7280", margin: 0 }}>
                {lang === "th" ? step.desc : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — reporting dashboard mockup */}
      <div className="cl-dashboard" style={{ position: "relative", minHeight: "480px" }}>
        {/* Base panel: browser/device frame showing campaign activity */}
        <div style={{
          position: "relative", borderRadius: "18px", overflow: "hidden",
          background: "#ffffff", border: "1px solid rgba(95,38,229,0.12)",
          boxShadow: "0 24px 50px -18px rgba(95,38,229,0.3)",
        }}>
          {/* browser chrome bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", background: "#f4f2fb", borderBottom: "1px solid rgba(95,38,229,0.1)" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff8fb3" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ffd08f" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#8fe8b8" }} />
            <span style={{ ...KT, fontSize: "11px", color: "#9ca3af", marginLeft: "10px" }}>
              {lang === "th" ? "รายงานแคมเปญ" : "Campaign Report"}
            </span>
          </div>
          <div style={{ padding: "20px" }}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#6b7280", margin: "0 0 14px" }}>
              {lang === "th" ? "กิจกรรมแคมเปญ" : "Campaign Activity"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {ACTIVITY_TILES.map((bg, i) => (
                <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: "14px", background: bg }} />
              ))}
            </div>
          </div>
        </div>

        {/* Floating: Sentiment — solid purple header table */}
        <div className="cl-float" style={{
          position: "absolute", top: "-32px", left: "-28px", width: "190px",
          background: "#ffffff", borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.3)",
        }}>
          <div style={{ background: "#5f26e5", padding: "10px 16px" }}>
            <p style={{ ...KT, fontSize: "14px", fontWeight: 800, color: "#ffffff", margin: 0, textAlign: "center" }}>
              {lang === "th" ? "ความรู้สึก" : "Sentiment"}
            </p>
          </div>
          <div>
            {SENTIMENT.map((s, i) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px",
                borderBottom: i < SENTIMENT.length - 1 ? "1px solid rgba(95,38,229,0.1)" : "none", ...KT, fontSize: "13px" }}>
                <span style={{ color: "#5f26e5", fontWeight: 700 }}>{lang === "th" ? s.labelTh : s.label}</span>
                <span style={{ color: "#111827", fontWeight: 700 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Campaign result — 3-column stat table */}
        <div className="cl-float" style={{
          position: "absolute", top: "22%", left: "-40px", width: "230px",
          background: "#ffffff", borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.3)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "#5f26e5" }}>
            {RESULT_STATS.map((s) => (
              <p key={s.l} style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#ffffff", margin: 0, padding: "8px 6px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                {s.l}
              </p>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {RESULT_STATS.map((s) => (
              <p key={s.v} style={{ ...KT, fontSize: "15px", fontWeight: 800, color: "#111827", margin: 0, padding: "10px 6px", textAlign: "center" }}>
                {s.v}
              </p>
            ))}
          </div>
        </div>

        {/* Floating: Do Better / Did Good — glowing circle pair */}
        <div className="cl-float cl-circles" style={{ position: "absolute", top: "-24px", right: "-32px", display: "flex" }}>
          <div style={{
            width: "108px", height: "108px", borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #5f25e5 0%, #7c3aed 100%)",
            boxShadow: "0 0 40px rgba(95,38,229,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8px",
          }}>
            <span style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>
              {lang === "th" ? "ทำได้ดีขึ้น" : "Do Better"}
            </span>
          </div>
          <div style={{
            width: "108px", height: "108px", borderRadius: "50%", flexShrink: 0, marginLeft: "-24px",
            background: "linear-gradient(135deg, #b794f6 0%, #ff8fc7 100%)",
            boxShadow: "0 0 40px rgba(255,143,199,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8px",
          }}>
            <span style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>
              {lang === "th" ? "ทำได้ดีแล้ว" : "Did Good"}
            </span>
          </div>
        </div>

        {/* Floating: What people said — ribbon-style tags */}
        <div className="cl-float" style={{ position: "absolute", bottom: "-30px", left: "4%", display: "flex", flexDirection: "column" }}>
          {COMMENT_RIBBONS.map((r, i) => (
            <span key={r.label} style={{
              ...KT, fontSize: "13px", fontWeight: 800, color: "#ffffff",
              background: r.bg, padding: "10px 26px 10px 18px",
              clipPath: "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)",
              marginTop: i === 0 ? 0 : "-10px", marginLeft: `${i * 26}px`,
              boxShadow: "0 8px 16px -6px rgba(95,38,229,0.35)",
              position: "relative", zIndex: COMMENT_RIBBONS.length - i,
            }}>
              {lang === "th" ? r.labelTh : r.label}
            </span>
          ))}
        </div>

        {/* Floating: Reach by day — fuller chart with axis + legend */}
        <div className="cl-float" style={{
          position: "absolute", bottom: "-36px", right: "-20px", width: "270px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.3)",
        }}>
          <p style={{ ...KT, fontSize: "12px", fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>
            {lang === "th" ? "การเข้าถึงรายวัน" : "Reach by Day"}
          </p>
          <svg viewBox="0 0 240 70" width="100%" height="60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cl-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5f25e5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5f25e5" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[10, 25, 40, 55].map((y) => (
              <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#eee7fb" strokeWidth="1" />
            ))}
            <path d="M0,45 C18,43 30,12 48,18 C66,24 72,50 90,47 C108,44 114,18 132,22 C150,26 156,42 174,38 C192,34 198,22 216,25 L240,27 L240,60 L0,60 Z" fill="url(#cl-area)" />
            <path d="M0,45 C18,43 30,12 48,18 C66,24 72,50 90,47 C108,44 114,18 132,22 C150,26 156,42 174,38 C192,34 198,22 216,25 L240,27" fill="none" stroke="#5f25e5" strokeWidth="2.5" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", ...KT, fontSize: "9px", color: "#9ca3af", marginTop: "4px" }}>
            {["12 Feb","18 Feb","24 Feb","03 Mar"].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <span style={{ width: "18px", height: "2px", background: "#5f25e5", display: "inline-block" }} />
            <span style={{ ...KT, fontSize: "11px", color: "#6b7280" }}>{lang === "th" ? "การเข้าถึง" : "Reach"}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px){
          .cl-grid{ grid-template-columns: 1fr !important; gap: 40px !important; }
          .cl-left{ max-width: none !important; }
          .cl-dashboard{ margin-top: 40px; }
        }
        @media (max-width: 640px){
          .cl-float{ position: static !important; width: 100% !important; margin: 0 0 12px !important; }
          .cl-circles{ justify-content: center; }
          .cl-dashboard{ display: flex; flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
