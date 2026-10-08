"use client";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
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

// Likes per month (avg ~1.85K) and the latest 9 posts' likes, for milin.daily
const LIKES_BY_MONTH = [{ m: "Jul", v: 1520 }, { m: "Aug", v: 1610 }, { m: "Sep", v: 1580 }, { m: "Oct", v: 1740 }, { m: "Nov", v: 2260 }, { m: "Dec", v: 2410 }, { m: "Jan", v: 2050 }];
const POSTS = [
  { d: "Sep 24", v: 1820, c: "1.9%" }, { d: "Sep 27", v: 1240, c: "2.1%" }, { d: "Sep 28", v: 3150, c: "1.4%" },
  { d: "Sep 30", v: 1380, c: "2.4%" }, { d: "Oct 1", v: 1460, c: "2.2%" }, { d: "Oct 2", v: 1690, c: "1.8%" },
  { d: "Oct 4", v: 4620, c: "1.1%" }, { d: "Oct 5", v: 1530, c: "2.0%" }, { d: "Oct 7", v: 1710, c: "1.7%" },
];
function LikesChart() {
  const W = 300, H = 120, L = 30, B = 18, max = 3000;
  const x = (i: number) => L + (i * (W - L - 8)) / (LIKES_BY_MONTH.length - 1);
  const y = (v: number) => (H - B) - (v / max) * (H - B - 8);
  const pts = LIKES_BY_MONTH.map((d, i) => `${x(i)},${y(d.v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {[0, 1000, 2000, 3000].map((t) => (
        <g key={t}><line x1={L} x2={W - 4} y1={y(t)} y2={y(t)} stroke="rgba(95,38,229,0.08)" />
          <text x={L - 6} y={y(t) + 3} fontSize="8" fill="#6b7280" textAnchor="end">{t ? `${t / 1000}K` : "0"}</text></g>
      ))}
      <polyline points={pts} fill="none" stroke="#2b7a8c" strokeWidth="2" />
      {LIKES_BY_MONTH.map((d, i) => (
        <g key={d.m}><circle cx={x(i)} cy={y(d.v)} r="3.2" fill="#fff" stroke="#2b7a8c" strokeWidth="1.6" />
          <text x={x(i)} y={H - 4} fontSize="8" fill="#6b7280" textAnchor="middle">{d.m}</text></g>
      ))}
    </svg>
  );
}
function EngagementChart() {
  const W = 380, H = 120, L = 26, B = 18, max = 5000, bw = 13;
  const step = (W - L - 6) / POSTS.length;
  const y = (v: number) => (H - B) - (v / max) * (H - B - 14);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {[0, 2500, 5000].map((t) => (
        <g key={t}><line x1={L} x2={W - 4} y1={y(t)} y2={y(t)} stroke="rgba(95,38,229,0.08)" />
          <text x={L - 5} y={y(t) + 3} fontSize="8" fill="#6b7280" textAnchor="end">{t ? `${t / 1000}K` : "0"}</text></g>
      ))}
      {POSTS.map((p, i) => {
        const cx = L + step * i + step / 2;
        return (
          <g key={p.d}>
            <rect x={cx - bw / 2} y={y(p.v)} width={bw} height={(H - B) - y(p.v)} rx="2" fill="#2b7a8c" />
            <text x={cx} y={y(p.v) - 4} fontSize="6.5" fill="#1e1b8b" textAnchor="middle">• {p.c}</text>
            <text x={cx} y={H - 5} fontSize="7" fill="#6b7280" textAnchor="middle">{p.d}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Lookalikes for milin.daily (photos to be added later — initials for now)
const LOOK_AUDIENCE = [
  { n: "rosie.beauty", l: "3,120", f: "52,840", c: "#f472b6" }, { n: "nudenotes.th", l: "2,410", f: "39,120", c: "#a78bfa" },
  { n: "glowwithpim", l: "4,870", f: "71,300", c: "#fb923c" }, { n: "minnie.makeup", l: "1,960", f: "33,450", c: "#60a5fa" },
  { n: "skinbyfern", l: "2,730", f: "45,210", c: "#34d399" }, { n: "pearyy.daily", l: "1,540", f: "28,960", c: "#f87171" },
];
const LOOK_TOPIC = [
  { n: "lipsbybew", l: "5,210", f: "88,640", c: "#e879f9" }, { n: "cosme.review.th", l: "3,880", f: "64,300", c: "#818cf8" },
  { n: "beautydiary.mook", l: "2,150", f: "41,780", c: "#fbbf24" }, { n: "tintlover.th", l: "1,430", f: "26,510", c: "#2dd4bf" },
  { n: "makeupwithnan", l: "6,940", f: "102,450", c: "#fb7185" }, { n: "softglow.kate", l: "2,620", f: "47,930", c: "#a3e635" },
];
function LookTable({ title, rows }: { title: string; rows: typeof LOOK_AUDIENCE }) {
  return (
    <div style={{ ...panelStyle, padding: "12px 18px 6px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: "8px", marginBottom: "4px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5" }}>{title} <span style={{ fontWeight: 500, color: "#6b7280" }}>(30)</span></span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: "8px", padding: "4px 0", borderBottom: "1px solid rgba(95,38,229,0.12)" }}>
        <span style={TINY}>INFLUENCER</span><span style={TINY}>LIKES</span><span style={TINY}>FOLLOWERS</span>
      </div>
      {rows.slice(0, 5).map((r) => (
        <div key={r.n} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: "8px", alignItems: "center", padding: "3px 0", borderTop: "1px solid rgba(95,38,229,0.06)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", fontWeight: 600, color: "#1e1b4b", minWidth: 0 }}>
            <span style={{ position: "relative", width: "24px", height: "24px", flexShrink: 0, borderRadius: "50%", background: r.c, color: "#fff", fontSize: "11px", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {r.n[0].toUpperCase()}
              <span style={{ position: "absolute", right: "-3px", bottom: "-3px", width: "11px", height: "11px", borderRadius: "50%", background: "#fff", padding: "1.5px" }}>
                <span style={{ position: "relative", display: "block", width: "100%", height: "100%" }}><Image src="/social-icons/instagram.png" alt="" fill sizes="11px" style={{ objectFit: "contain" }} /></span>
              </span>
            </span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.n}</span>
          </span>
          <span style={{ fontSize: "11.5px", color: "#374151" }}>{r.l}</span>
          <span style={{ fontSize: "11.5px", color: "#374151" }}>{r.f}</span>
        </div>
      ))}
    </div>
  );
}

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
  const [tab, setTab] = useState<"Influencer" | "Audience" | "Lookalikes">("Influencer");
  // the sub-tabs cycle on their own every 5s; paused while the visitor is hovering the dashboard
  // or a signal chip, and restarted from the chosen tab after any manual switch
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || hot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const order = ["Influencer", "Audience", "Lookalikes"] as const;
    const id = setInterval(() => setTab((t) => order[(order.indexOf(t) + 1) % order.length]), 5000);
    return () => clearInterval(id);
  }, [paused, hot, tab]);
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
      <div className="cs-dashboard" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{
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
              const live = true;
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

        {/* likes by month + post engagement */}
        <div className="cs-row3" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "12px" }}>
          <div style={panelStyle}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px" }}>Likes <span style={{ fontWeight: 500, color: "#6b7280" }}>(by month)</span></p>
            <LikesChart />
          </div>
          <div style={panelStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "0 0 8px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: 0 }}>Post Engagement</p>
              <span style={{ display: "flex", gap: "10px", fontSize: "10px", color: "#374151" }}>
                <span><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#2b7a8c", marginRight: "4px" }} />Likes 22.6K</span>
                <span><span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#1e1b8b", marginRight: "4px" }} />Comments 418</span>
              </span>
            </div>
            <EngagementChart />
          </div>
        </div>
          </div>
          {/* Lookalikes view */}
          <div className="cs-view" style={{ visibility: tab === "Lookalikes" ? "visible" : "hidden", opacity: tab === "Lookalikes" ? 1 : 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <LookTable title="Lookalikes (by Audience)" rows={LOOK_AUDIENCE} />
            <LookTable title="Lookalikes (by Topic)" rows={LOOK_TOPIC} />
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
        .cs-view{ grid-area: 1 / 1; transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
        .cs-view[style*="hidden"]{ transform: translateY(8px); }
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
