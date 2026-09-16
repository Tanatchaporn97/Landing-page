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
  { label: "Positive", labelTh: "เชิงบวก", value: 78, color: "#5f26e5" },
  { label: "Neutral", labelTh: "กลาง ๆ", value: 18, color: "#c4b5fd" },
  { label: "Negative", labelTh: "เชิงลบ", value: 4, color: "#ff0089" },
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
            <div key={step.num} className={step.highlight ? "cl-step-hover" : step.num === "02" ? "cl-step-hover-2" : step.num === "03" ? "cl-step-hover-3" : undefined} style={{
              padding: "20px 22px",
              borderRadius: 0,
              background: "transparent",
              border: "none",
              borderBottom: i < STEPS.length - 1 ? "1px solid rgba(95,38,229,0.12)" : "none",
              marginBottom: 0,
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
      <div className="cl-dashboard" style={{ position: "relative", minHeight: "460px" }}>
        {/* Base panel: Campaign activity grid */}
        <div style={{
          position: "relative", borderRadius: "24px", padding: "24px",
          background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 24px 50px -18px rgba(95,38,229,0.25)", backdropFilter: "blur(10px)",
        }}>
          <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#6b7280", margin: "0 0 14px" }}>
            {lang === "th" ? "กิจกรรมแคมเปญ" : "Campaign Activity"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {ACTIVITY_TILES.map((bg, i) => (
              <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: "14px", background: bg }} />
            ))}
          </div>
        </div>

        {/* Floating: Sentiment */}
        <div className="cl-float cl-float-sentiment cl-target-sentiment" style={{
          position: "absolute", top: "-28px", left: "-24px", width: "180px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.25)",
          opacity: 0.55,
          transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#9ca3af", margin: "0 0 10px" }}>
            {lang === "th" ? "ความรู้สึก" : "Sentiment"}
          </p>
          {SENTIMENT.map((s) => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", ...KT, fontSize: "13px" }}>
              <span style={{ color: s.color, fontWeight: 700 }}>{lang === "th" ? s.labelTh : s.label}</span>
              <span style={{ color: "#111827", fontWeight: 700 }}>{s.value}%</span>
            </div>
          ))}
        </div>

        {/* Floating: Campaign result */}
        <div className="cl-float cl-target-result" style={{
          position: "absolute", top: "36%", left: "-32px", width: "210px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.25)",
          opacity: 0.55,
          transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#9ca3af", margin: "0 0 10px" }}>
            {lang === "th" ? "ผลลัพธ์แคมเปญ" : "Campaign Result"}
          </p>
          <div style={{ display: "flex", gap: "14px" }}>
            {[{ v: "161%", l: lang === "th" ? "การเข้าถึง" : "Reach" }, { v: "219%", l: lang === "th" ? "ยอดวิว" : "Views" }, { v: "5.33%", l: "ER" }].map((s) => (
              <div key={s.l}>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 800, color: "#5f26e5", margin: "0 0 2px" }}>{s.v}</p>
                <p style={{ ...KT, fontSize: "10px", color: "#9ca3af", margin: 0 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Next move */}
        <div className="cl-float cl-target-nextmove" style={{
          position: "absolute", top: "-20px", right: "-20px", width: "210px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.25)",
          opacity: 0.55,
          transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#9ca3af" }}>{lang === "th" ? "ก้าวต่อไป" : "Next Move"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", ...KT, fontSize: "10px", fontWeight: 700, color: "#ff0089" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff0089" }} />Live
            </span>
          </div>
          <p style={{ ...KT, fontSize: "13px", lineHeight: 1.6, color: "#111827", margin: 0, fontWeight: 600 }}>
            {lang === "th"
              ? "ลดคลิป How-to และเพิ่ม Creator ที่ทำ Review แบบก่อน-หลัง"
              : "Cut back on how-to clips and add more before-and-after style reviews."}
          </p>
        </div>

        {/* Floating: What people said */}
        <div className="cl-float cl-target-whatsaid" style={{
          position: "absolute", bottom: "-24px", left: "6%", width: "200px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.25)",
          opacity: 0.55,
          transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#9ca3af", margin: "0 0 10px" }}>
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
        <div className="cl-float cl-target-reach" style={{
          position: "absolute", bottom: "-32px", right: "-16px", width: "230px",
          background: "#ffffff", borderRadius: "16px", padding: "16px 18px",
          boxShadow: "0 16px 32px -10px rgba(95,38,229,0.25)",
          opacity: 0.55,
          transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, background 0.35s ease",
        }}>
          <p style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#9ca3af", margin: "0 0 10px" }}>
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
          <p style={{ ...KT, fontSize: "11px", color: "#9ca3af", margin: "6px 0 0" }}>
            {lang === "th" ? "ดูช่วงพีค แล้วทำซ้ำสิ่งที่ได้ผล" : "Watch the spike, then reuse the cue."}
          </p>
        </div>
      </div>

      <style>{`
        .cl-grid:has(.cl-step-hover:hover) .cl-target-result,
        .cl-grid:has(.cl-step-hover:hover) .cl-target-reach,
        .cl-grid:has(.cl-step-hover-2:hover) .cl-target-sentiment,
        .cl-grid:has(.cl-step-hover-2:hover) .cl-target-whatsaid,
        .cl-grid:has(.cl-step-hover-3:hover) .cl-target-nextmove{
          transform: translateY(-10px);
          box-shadow: 0 24px 40px -12px rgba(95,38,229,0.4);
          opacity: 1 !important;
          border: 1.5px solid rgba(95,38,229,0.35);
          background: #ffffff !important;
        }
        .cl-target-result, .cl-target-reach, .cl-target-sentiment, .cl-target-whatsaid, .cl-target-nextmove{
          border: 1.5px solid transparent;
        }
        .cl-step-hover, .cl-step-hover-2, .cl-step-hover-3{
          transition: background 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease;
          cursor: pointer;
        }
        .cl-step-hover:hover, .cl-step-hover-2:hover, .cl-step-hover-3:hover{
          background: #5f26e5 !important;
          border-color: #5f26e5 !important;
          border-radius: 18px !important;
        }
        .cl-step-hover:hover *, .cl-step-hover-2:hover *, .cl-step-hover-3:hover *{
          color: #ffffff !important;
          transition: color 0.35s ease;
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
