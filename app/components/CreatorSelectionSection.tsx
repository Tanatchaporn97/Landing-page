"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

const TAGS = ["Location", "Demographic", "Content Category", "Occupation", "Persona", "Storytelling"];
// Mock KOL Discovery profile of a micro creator (10K–100K followers) (mirrors the real report: profile, stats strip, Insight tabs,
// 6 Pillars and Audience) for one fictional creator.
const STATS = [
  { k: "Followers", v: "48,600" },
  { k: "Avg. Likes", v: "1,850" },
  { k: "ER", v: "3.81%" },
  { k: "Avg. Views", v: "-" },
  { k: "Total Post", v: "614" },
];
const PILLARS = [
  { t: "Demographic", tags: ["ผู้หญิง", "อายุ 20–30 ปี", "คนไทย"] },
  { t: "Content Category", tags: ["ความงาม", "สกินแคร์", "Lifestyle", "ดูแลผิว"] },
  { t: "Persona", tags: ["สายบิวตี้", "ผิวขาว", "ลุคน่ารัก", "Good looking"] },
  { t: "Location", tags: ["ประเทศไทย", "กรุงเทพมหานคร", "ภาคกลาง"] },
  { t: "Occupation", tags: ["คอนเทนต์ครีเอเตอร์", "Beauty Blogger", "นักศึกษา"] },
  { t: "Storytelling", tags: ["รีวิวสินค้า", "Before–After", "get ready with me"] },
];
const AGES = [
  { r: "13–17", v: 5 }, { r: "18–24", v: 31 }, { r: "25–34", v: 52 }, { r: "35–44", v: 10 }, { r: "45+", v: 2 },
];
const CITIES = [
  { c: "Bangkok", v: 46 }, { c: "Chiang Mai", v: 7 }, { c: "Chon Buri", v: 4 },
];
// Audience tab (48,600 followers)
const AUD_GENDER = [{ k: "Female", v: "40.8K", p: 84.0, c: "#f472b6" }, { k: "Male", v: "7.8K", p: 16.0, c: "#1e1b6b" }];
const AUD_AGES = [
  { r: "13–17", n: "2.4K", v: 5 }, { r: "18–24", n: "15.1K", v: 31 }, { r: "25–34", n: "25.3K", v: 52 }, { r: "35–44", n: "4.9K", v: 10 }, { r: "45–64", n: "0.9K", v: 2 },
];
const AUD_TYPE = [
  { k: "Real People", v: "25.3K", p: 52, c: "#2b7a8c" }, { k: "Influencers", v: "4.4K", p: 9, c: "#1e1b8b" },
  { k: "Mass Followers", v: "15.1K", p: 31, c: "#f28c38" }, { k: "Suspicious", v: "3.8K", p: 8, c: "#e0458b" },
];
const AUD_COUNTRY = [
  { c: "Thailand", n: "44.3K", v: 91.2 }, { c: "Laos", n: "0.7K", v: 1.4 }, { c: "Myanmar", n: "0.5K", v: 1.1 }, { c: "Cambodia", n: "0.4K", v: 0.9 }, { c: "Japan", n: "0.3K", v: 0.6 },
];
const AUD_CITY = [
  { c: "Bangkok", n: "22.4K", v: 46.1 }, { c: "Chiang Mai Province", n: "3.4K", v: 7.0 }, { c: "Chon Buri Province", n: "1.9K", v: 4.0 }, { c: "Nonthaburi Province", n: "1.7K", v: 3.6 }, { c: "Khon Kaen Province", n: "1.0K", v: 2.1 },
];
const donut = (parts: { p: number; c: string }[]) => {
  let acc = 0;
  return `conic-gradient(${parts.map((x) => { const a = acc; acc += x.p; return `${x.c} ${a}% ${acc}%`; }).join(", ")})`;
};
const Bar = ({ label, num, pct, scale, color }: { label: string; num: string; pct: number; scale: number; color: string }) => (
  <div style={{ marginBottom: "6px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#374151" }}>
      <span style={{ color: "#6b7280" }}>{label}</span><span>{num} ({pct.toFixed(pct < 10 ? 1 : 0)}%)</span>
    </div>
    <span style={{ display: "block", height: "5px", borderRadius: "5px", background: "rgba(95,38,229,0.1)", marginTop: "3px" }}>
      <span style={{ display: "block", height: "100%", width: `${Math.min(100, pct * scale)}%`, borderRadius: "5px", background: color }} />
    </span>
  </div>
);

const TINY: CSSProperties = { ...KT, fontSize: "10px", fontWeight: 600, color: "#6b7280", letterSpacing: ".02em" };

const panelStyle: CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 8px 20px -8px rgba(95,38,229,0.15)",
  padding: "16px 18px",
};

export default function CreatorSelectionSection({ lang }: { lang: "th" | "en" }) {
  // hovering / tapping a signal chip highlights it and pops the matching pillar box in the dashboard
  const [hot, setHot] = useState<string | null>(null);
  // Influencer tab = the 6 pillars + headline audience (9 boxes); Audience tab = the full audience breakdown
  const [tab, setTab] = useState<"Influencer" | "Audience">("Influencer");
  return (
    <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "center" }}>
      {/* Left — eyebrow, heading, description, filter tags */}
      <div className="cs-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <Badge variant="outline" className="border-white/40 text-white">Creator Selection</Badge>
        </div>
        <h3 style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: 0, lineHeight: 1.15 }}>
          <span style={{ color: "#ffffff" }}>Find the Right </span>
          <span style={{ color: "#ffffff" }}>
            Creator
          </span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.92)", margin: 0, maxWidth: "340px" }}>
          {lang === "th"
            ? "เราเลือก Creator จากทั้งข้อมูลและรูปแบบการสื่อสาร เพื่อหาคนที่เหมาะกับแบรนด์ กลุ่มเป้าหมาย และโจทย์ของแคมเปญ"
            : "We select Creators using both data and communication style, to find the right fit for your brand, audience, and campaign goals."}
        </p>

        <div className="cs-tags" style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "10px", marginTop: "4px" }}>
          {TAGS.map((tag) => (
            <span key={tag} role="button" tabIndex={0}
              className={`cs-chip${hot === tag ? " is-hot" : ""}`}
              onMouseEnter={() => { setHot(tag); setTab("Influencer"); }} onMouseLeave={() => setHot(null)}
              onFocus={() => { setHot(tag); setTab("Influencer"); }} onBlur={() => setHot(null)}
              onClick={() => { setTab("Influencer"); setHot((h) => (h === tag ? null : tag)); }}
              style={{
              ...KT, fontSize: "13px", fontWeight: 600, color: "#5f26e5",
              padding: "9px 16px", borderRadius: "50px",
              border: "1px solid rgba(95,38,229,0.2)", background: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap", textAlign: "center",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#ffffff", margin: "4px 0 0", maxWidth: "340px" }}>
          {lang === "th"
            ? "เราไม่ได้ดู 6 Signal นี้แยกเป็นข้อ ๆ แต่นำมาประกอบกัน เพื่อให้เข้าใจว่า Creator คนนั้นเป็นใคร สื่อสารกับใคร และเล่าเรื่องแบบไหน ก่อนตัดสินว่าเหมาะกับแบรนด์และโจทย์ของแคมเปญจริงหรือไม่"
            : "We don't read these 6 signals one by one — we put them together to understand who a Creator is, who they speak to, and how they tell stories, before deciding whether they truly fit the brand and the campaign brief."}
        </p>
      </div>

      {/* Right — KOL Discovery creator profile mockup */}
      <div className="cs-dashboard" style={{
        position: "relative", borderRadius: "28px", padding: "22px 24px",
        background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 30px 60px -20px rgba(95,38,229,0.28), 0 10px 24px -12px rgba(255,0,137,0.12)",
        backdropFilter: "blur(14px)", overflow: "hidden",
        transition: "transform 0.35s ease, box-shadow 0.35s ease", ...KT,
      }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ffffff", padding: "6px 14px", borderRadius: "50px", boxShadow: "0 4px 12px -6px rgba(95,38,229,0.3)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "linear-gradient(135deg,#5f25e5,#ff0089)" }} />
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#5f26e5", letterSpacing: ".06em" }}>KOL DISCOVERY</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#111827", padding: "6px 12px", borderRadius: "8px", background: "#fff", border: "1px solid rgba(255,0,137,0.35)" }}>⤓ Download Report (.pdf)</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#111827", padding: "6px 12px", borderRadius: "8px", background: "#fff", border: "1px solid rgba(95,38,229,0.35)" }}>☆ Save</span>
          </div>
        </div>

        {/* profile + stats strip */}
        <div style={{ ...panelStyle, display: "grid", gridTemplateColumns: "auto 1fr", gap: "16px", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ position: "relative", width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 0 0 2px #fff" }}>
                <Image src="/creator-mockup/milin-avatar.jpg" alt="" fill sizes="36px" style={{ objectFit: "cover" }} />
              </span>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>milin.daily</span>
              <span style={{ position: "relative", width: "14px", height: "14px" }}><Image src="/social-icons/instagram.png" alt="Instagram" fill sizes="14px" style={{ objectFit: "contain" }} /></span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[1, 2, 3].map((n) => (
                <span key={n} style={{ position: "relative", width: "58px", height: "58px", borderRadius: "8px", overflow: "hidden" }}>
                  <Image src={`/creator-mockup/milin-post-${n}.jpg`} alt="" fill sizes="58px" style={{ objectFit: "cover" }} />
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: "12px", border: "1.5px solid rgba(17,24,39,0.7)", background: "#fff", padding: "12px 14px", display: "grid", gridTemplateColumns: "1.4fr repeat(5, 1fr)", gap: "8px" }}>
            <div>
              <div style={TINY}>Raw Cost (THB)</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginTop: "4px" }}>15,000</div>
              <div style={{ fontSize: "9.5px", color: "#6b7280", marginTop: "2px" }}>(8,000 – 25,000)</div>
            </div>
            {STATS.map((x) => (
              <div key={x.k}>
                <div style={TINY}>{x.k}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginTop: "4px" }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "12px" }}>
          <div style={{ display: "inline-flex", padding: "3px", borderRadius: "50px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(95,38,229,0.12)" }}>
            {["Insight", "Rate Card", "Budget", "Contact"].map((t, i) => (
              <span key={t} style={{ fontSize: "11.5px", fontWeight: 600, padding: "6px 14px", borderRadius: "50px", color: i ? "#4b5563" : "#5f26e5", background: i ? "transparent" : "#fff", boxShadow: i ? "none" : "0 2px 8px -3px rgba(95,38,229,0.35)" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            {(["Influencer", "Audience", "Lookalikes"] as const).map((t) => {
              const live = t !== "Lookalikes";
              const on = t === tab;
              return (
                <span key={t} role={live ? "tab" : undefined} aria-selected={live ? on : undefined} tabIndex={live ? 0 : -1}
                  className={live ? "cs-subtab" : undefined}
                  onMouseEnter={live ? () => setTab(t) : undefined} onClick={live ? () => setTab(t) : undefined}
                  onFocus={live ? () => setTab(t) : undefined}
                  style={{ fontSize: "11.5px", fontWeight: 600, paddingBottom: "4px", color: on ? "#5f26e5" : "#4b5563", borderBottom: on ? "2px solid #5f26e5" : "2px solid transparent", cursor: live ? "pointer" : "default", transition: "color .25s, border-color .25s" }}>{t}</span>
              );
            })}
          </div>
        </div>

        {/* both views share one grid cell, so switching tabs never changes the dashboard height */}
        <div style={{ display: "grid" }}>
          {/* Influencer view: 6 pillars + headline audience */}
          <div className="cs-view" style={{ visibility: tab === "Influencer" ? "visible" : "hidden", opacity: tab === "Influencer" ? 1 : 0 }}>
        {/* 6 pillars */}
        <div className="cs-row3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "12px" }}>
          {PILLARS.map((pl) => (
            <div key={pl.t} className={`cs-pillar${hot === pl.t ? " is-hot" : ""}`} style={panelStyle}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>{pl.t}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {pl.tags.map((t) => <span key={t} style={{ fontSize: "11px", color: "#5f26e5", padding: "4px 10px", borderRadius: "50px", border: "1px solid rgba(95,38,229,0.25)", background: "rgba(255,255,255,0.7)" }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* audience */}
        <div className="cs-row3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          <div style={panelStyle}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px" }}>Gender</p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "92px", height: "92px", borderRadius: "50%", flexShrink: 0, background: "conic-gradient(#f472b6 0 84%, #1e1b6b 84% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#fff" }} />
              </div>
              <div style={{ fontSize: "11px", color: "#374151", lineHeight: 1.7 }}>
                <div><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#f472b6", marginRight: "6px" }} />Female <b>84%</b></div>
                <div><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#1e1b6b", marginRight: "6px" }} />Male <b>16%</b></div>
              </div>
            </div>
          </div>
          <div style={panelStyle}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Age</p>
            {AGES.map((a) => (
              <div key={a.r} style={{ display: "grid", gridTemplateColumns: "38px 1fr 30px", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ fontSize: "10px", color: "#6b7280" }}>{a.r}</span>
                <span style={{ height: "5px", borderRadius: "5px", background: "rgba(95,38,229,0.1)" }}><span style={{ display: "block", height: "100%", width: `${a.v * 1.25}%`, borderRadius: "5px", background: "linear-gradient(90deg,#5f25e5,#ff0089)" }} /></span>
                <span style={{ fontSize: "10px", color: "#374151", textAlign: "right" }}>{a.v}%</span>
              </div>
            ))}
          </div>
          <div style={panelStyle}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Location by City</p>
            {CITIES.map((c) => (
              <div key={c.c} style={{ marginBottom: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#374151" }}><span>{c.c}</span><span>{c.v}%</span></div>
                <span style={{ display: "block", height: "5px", borderRadius: "5px", background: "rgba(95,38,229,0.1)", marginTop: "3px" }}><span style={{ display: "block", height: "100%", width: `${c.v * 2}%`, borderRadius: "5px", background: "#2b7a8c" }} /></span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "8px" }}>
              <span style={TINY}>Audience Credibility</span><span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>78.4%</span>
            </div>
          </div>
        </div>
          </div>
          {/* Audience view */}
          <div className="cs-view" style={{ visibility: tab === "Audience" ? "visible" : "hidden", opacity: tab === "Audience" ? 1 : 0 }}>
            <div className="cs-row3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "12px" }}>
              <div style={panelStyle}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px" }}>Gender</p>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                  <div style={{ width: "86px", height: "86px", borderRadius: "50%", background: donut(AUD_GENDER), display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff" }} />
                  </div>
                </div>
                {AUD_GENDER.map((g) => (
                  <div key={g.k} style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#374151", marginTop: "3px" }}>
                    <span><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: g.c, marginRight: "6px" }} />{g.k}</span><span>{g.v} ({g.p.toFixed(2)}%)</span>
                  </div>
                ))}
              </div>
              <div style={panelStyle}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Age</p>
                {AUD_AGES.map((a) => <Bar key={a.r} label={a.r} num={a.n} pct={a.v} scale={1.25} color="#2b7a8c" />)}
              </div>
              <div style={panelStyle}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px" }}>Audience Type</p>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                  <div style={{ width: "86px", height: "86px", borderRadius: "50%", background: donut(AUD_TYPE), display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff" }} />
                  </div>
                </div>
                {AUD_TYPE.map((x) => (
                  <div key={x.k} style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#374151", marginTop: "3px" }}>
                    <span><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: x.c, marginRight: "6px" }} />{x.k}</span><span>{x.v} ({x.p}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="cs-row3" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              <div style={panelStyle}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Location by Country (5)</p>
                {AUD_COUNTRY.map((c) => <Bar key={c.c} label={c.c} num={c.n} pct={c.v} scale={1} color="#2b7a8c" />)}
              </div>
              <div style={panelStyle}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Location by City (5)</p>
                {AUD_CITY.map((c) => <Bar key={c.c} label={c.c} num={c.n} pct={c.v} scale={1.8} color="#2b7a8c" />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cs-chip{ cursor: pointer; user-select: none; transition: background .3s ease, color .3s ease, transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease; }
        .cs-chip.is-hot, .cs-chip:active{ background: #ffffff !important; color: #5f26e5 !important; border-color: #ffffff !important;
          transform: translateY(-3px); box-shadow: 0 12px 24px -10px rgba(20,6,80,.55); }
        .cs-pillar{ transition: background .35s ease; }
        .cs-view{ grid-area: 1 / 1; transition: opacity .3s ease; }
        .cs-subtab:hover{ color: #5f26e5 !important; }
        .cs-pillar.is-hot{ background: #ffffff !important; }
        @media (prefers-reduced-motion: reduce){ .cs-chip, .cs-pillar{ transition: none; } .cs-chip.is-hot{ transform: none; } }
        .cs-dashboard:hover{
          box-shadow: 0 40px 70px -20px rgba(95,38,229,0.35), 0 14px 28px -12px rgba(255,0,137,0.18);
        }
        @media (max-width: 900px){
          .cs-grid{ grid-template-columns: 1fr !important; }
          .cs-left{ max-width: none !important; }
        }
        @media (max-width: 720px){
          .cs-stats-inline{ display: none !important; }
        }
        @media (max-width: 640px){
          .cs-tags{ grid-template-columns: repeat(2, auto) !important; }
          /* Keep the dashboard mockup as one compact composition (same
             3-across charts row, same 2-across tags row as desktop) instead
             of unstacking every row to full-width — just zoom the whole
             card down so it fits the viewport. zoom shrinks the layout box
             itself (unlike transform: scale), so the section's height
             shrinks along with it instead of leaving dead space. */
          .cs-dashboard{ zoom: 0.62; }
        }
        @media (max-width: 420px){
          .cs-dashboard{ zoom: 0.5; }
        }
      `}</style>
    </div>
  );
}
