"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PURPLE = "#5B30E0";

// Every case comes from dict.successStories (the same data behind /success/<slug>),
// so the brand name, copy and numbers always match the full case page.
// CLASSIFY assigns each case one industry and one content type (read from the
// case write-ups); VISUAL is the logo/photo shown in the circle (same as /success).
type Story = {
  slug: string; brand: string; industry?: string; tagline?: string;
  paras?: string[]; sections?: { heading: string; body: string }[];
  stats?: { val: string; label: string }[]; heroStats?: { val: string; label: string }[];
};

const INDUSTRIES = ["Food & Beverage", "Beauty & Skincare", "Healthcare", "Pet Care", "Household", "Home Appliances", "Entertainment & Streaming", "Events & Lifestyle"];
const CONTENTS = ["Product Launch", "Product Review", "Niche Community", "Always-on Content", "Event Activation", "New Market Entry"];

const CLASSIFY: Record<string, { industry: string; value: string }> = {
  "nissin":          { industry: "Food & Beverage",          value: "Product Launch" },     // new flavour launch
  "guss-damn-good":  { industry: "Food & Beverage",          value: "Product Launch" },     // new co-created flavour
  "auntie-annes":    { industry: "Food & Beverage",          value: "Always-on Content" },  // 15+ months of TikTok content
  "watsons":         { industry: "Beauty & Skincare",        value: "Product Review" },     // fast-turnaround KOL/KOC reviews
  "ahc":             { industry: "Beauty & Skincare",        value: "Event Activation" },   // Skin Game event
  "boots":           { industry: "Beauty & Skincare",        value: "Product Launch" },     // new scent
  "scotch":          { industry: "Beauty & Skincare",        value: "Product Launch" },     // new bird's-nest mask
  "ldc-dental":      { industry: "Healthcare",               value: "Product Review" },     // clear-aligner service reviews
  "siangpure":       { industry: "Healthcare",               value: "New Market Entry" },   // Indian market
  "truemoney":       { industry: "Healthcare",               value: "Niche Community" },    // highly specific health topic
  "optimum-hi-pro":  { industry: "Pet Care",                 value: "Niche Community" },    // koi keepers
  "smart-heart":     { industry: "Pet Care",                 value: "Niche Community" },    // fandom
  "bobbi-dog":       { industry: "Pet Care",                 value: "Always-on Content" },  // year plan
  "mom-choice":      { industry: "Pet Care",                 value: "Always-on Content" },  // year plan
  "d-nee":           { industry: "Household",                value: "Product Review" },     // mom & family creator reviews
  "fineline":        { industry: "Household",                value: "Product Review" },     // care storytelling → add to cart
  "teepol":          { industry: "Household",                value: "Product Review" },     // single-KOL product integration
  "daikin":          { industry: "Home Appliances",          value: "Product Review" },     // explaining air-con tech
  "viu":             { industry: "Entertainment & Streaming", value: "Niche Community" },   // Isan local audience
  "cp-all":          { industry: "Events & Lifestyle",       value: "Event Activation" },   // education forum
  "mega-bangna":     { industry: "Events & Lifestyle",       value: "Event Activation" },   // Halloween event
};

const VISUAL: Record<string, { img: string; fit?: "contain"; bg?: string }> = {
  "nissin": { img: "/success-stories-2/Success stories-08.jpg" },
  "watsons": { img: "/success-stories-2/Success stories-10.jpg" },
  "ldc-dental": { img: "/success-stories-2/Success stories-09.jpg" },
  "viu": { img: "/success-stories-2/Success stories-11.jpg" },
  "guss-damn-good": { img: "/success-stories-2/Success stories-13.jpg" },
  "ahc": { img: "/success-stories-2/Success stories-12.jpg" },
  "optimum-hi-pro": { img: "/success-stories-2/optimum-hi-pro-logo.jpg", fit: "contain", bg: "#05176e" },
  "auntie-annes": { img: "/success-stories-2/auntie-annes-logo.jpg", fit: "contain", bg: "#ffffff" },
  "siangpure": { img: "/success-stories-2/siangpure-logo.jpg", fit: "contain", bg: "#ffffff" },
  "bobbi-dog": { img: "/success-stories-2/bobbi-dog-logo.png", fit: "contain", bg: "#452b1c" },
  "boots": { img: "/success-stories-2/boots-logo.png", fit: "contain", bg: "#ffffff" },
  "cp-all": { img: "/success-stories-2/cp-all-logo.png", fit: "contain", bg: "#ffffff" },
  "d-nee": { img: "/success-stories-2/d-nee-logo.png", fit: "contain", bg: "#ffffff" },
  "daikin": { img: "/success-stories-2/daikin-logo.png", fit: "contain", bg: "#ffffff" },
  "fineline": { img: "/success-stories-2/fineline-logo.png", fit: "contain", bg: "#ffffff" },
  "mega-bangna": { img: "/success-stories-2/mega-bangna-logo.png", fit: "contain", bg: "#ffffff" },
  "mom-choice": { img: "/success-stories-2/mom-choice-logo.png", fit: "contain", bg: "#ffffff" },
  "scotch": { img: "/success-stories-2/scotch-logo.png", fit: "contain", bg: "#ffffff" },
  "smart-heart": { img: "/success-stories-2/smart-heart-logo.png", fit: "contain", bg: "#0d3a7e" },
  "teepol": { img: "/success-stories-2/teepol-logo.png", fit: "contain", bg: "#ffffff" },
  "truemoney": { img: "/success-stories-2/truemoney-logo.png", fit: "contain", bg: "#ffffff" },
};

// The section that explains *how* Buddy Review approached the case
const NOT_STRATEGY = /^(overview|campaign overview|challenge|the challenge|result|results|campaign results|key results)/i;
const firstPara = (t?: string) => (t ?? "").split("\n")[0].trim();

function toCase(s: Story) {
  const sec = s.sections ?? [];
  const overview = firstPara(sec[0]?.body) || firstPara(s.paras?.[0]) || s.tagline || "";
  const strat = sec.find((x, i) => i > 0 && !NOT_STRATEGY.test(x.heading.trim()));
  const strategy = firstPara(strat?.body) || firstPara(s.paras?.[1]) || "";
  const stats = (s.heroStats?.length ? s.heroStats : s.stats ?? []).slice(0, 3);
  return { slug: s.slug, title: s.brand, ...CLASSIFY[s.slug], overview, strategy, stats, ...VISUAL[s.slug] };
}

type Mode = "industry" | "content";

const IconIndustry = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>
);
const IconContent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);

// "See the Work in Action" case explorer: switch between browsing by industry
// or by content type, filter with count chips, pick a case from the list on
// the left, read its overview / strategy / results on the right.
export default function CaseExplorer({ lang, stories }: { lang: "th" | "en"; stories: Story[] }) {
  const th = lang === "th";
  const CASES = useMemo(() => (stories ?? []).filter((s) => CLASSIFY[s.slug] && VISUAL[s.slug]).map(toCase), [stories]);
  const [mode, setMode] = useState<Mode>("industry");
  const [filter, setFilter] = useState<string>("all");
  const [selSlug, setSelSlug] = useState<string>("siangpure");

  const key = mode === "industry" ? "industry" : "value";
  const other = mode === "industry" ? "value" : "industry";
  const values = mode === "industry" ? INDUSTRIES : CONTENTS;

  const filtered = useMemo(
    () => (filter === "all" ? CASES : CASES.filter((c) => c[key] === filter)),
    [filter, key, CASES],
  );
  const sel = filtered.find((c) => c.slug === selSlug) ?? filtered[0];

  const switchMode = (m: Mode) => { setMode(m); setFilter("all"); };

  return (
    <div className="cx-root" style={{ ...KT, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* mode switch */}
      <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "#5E5878" }}>{th ? "เลือกดูเคสตาม" : "Browse cases by"}</div>
        <div role="group" className="cx-mode" style={{ display: "flex", gap: "4px", padding: "6px", background: "#F4EFFB", border: "1px solid #D3C5EF", borderRadius: "999px" }}>
          {([["industry", th ? "อุตสาหกรรม" : "Industry", <IconIndustry key="i" />], ["content", th ? "ประเภทคอนเทนต์" : "Content Type", <IconContent key="c" />]] as const).map(([m, label, icon]) => {
            const on = mode === m;
            return (
              <button key={m} type="button" onClick={() => switchMode(m)} aria-pressed={on}
                style={{ ...KT, display: "flex", alignItems: "center", gap: "10px", minHeight: "48px", padding: "0 26px", border: 0, borderRadius: "999px",
                  fontSize: "16px", fontWeight: 600, cursor: "pointer", background: on ? PURPLE : "transparent", color: on ? "#FFFFFF" : "#2A2540",
                  transition: "background 0.2s, color 0.2s" }}>
                {icon}{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* sub-category filters — borderless text tabs with an underline on the active one */}
      <div className="cx-filters" role="tablist" style={{ marginTop: "28px", width: "100%", maxWidth: "100%", display: "flex", flexWrap: "nowrap", justifyContent: "safe center", gap: "24px",
        overflowX: "auto", scrollbarWidth: "none", borderBottom: "1px solid rgba(91,48,224,0.14)", padding: "0 8px", boxSizing: "border-box" }}>
        {["all", ...values].map((v) => {
          const on = v === filter;
          const count = v === "all" ? CASES.length : CASES.filter((c) => c[key] === v).length;
          return (
            <button key={v} type="button" role="tab" onClick={() => setFilter(v)} aria-selected={on} className="cx-filter"
              style={{ ...KT, display: "flex", alignItems: "center", gap: "6px", padding: "10px 2px 12px", marginBottom: "-1px", cursor: "pointer",
                border: 0, borderBottom: `2px solid ${on ? PURPLE : "transparent"}`, borderRadius: 0, background: "transparent",
                color: on ? PURPLE : "#5E5878", fontSize: "15px", fontWeight: on ? 600 : 500, whiteSpace: "nowrap",
                transition: "color 0.2s, border-color 0.2s" }}>
              {v === "all" ? (th ? "ทั้งหมด" : "All") : v}
              <span style={{ fontSize: "12px", fontWeight: 600, color: on ? PURPLE : "#9A93B0" }}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="cx-grid" style={{ marginTop: "44px", width: "100%", display: "grid", gridTemplateColumns: "380px minmax(0, 1fr)", gap: "32px", alignItems: "start" }}>
        {/* case list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
            <div style={{ fontSize: "14px", color: "#5E5878" }}>{th ? `แสดง ${filtered.length} เคส` : `Showing ${filtered.length} ${filtered.length === 1 ? "case" : "cases"}`}</div>
            {filtered.length > 12 && <div className="cx-hint" style={{ fontSize: "13px", color: PURPLE, fontWeight: 500 }}>{th ? "เลื่อนดูเพิ่ม ↓" : "Scroll for more ↓"}</div>}
          </div>
          {/* each case is shown by its brand logo (same artwork as /success) */}
          <div className="cx-list" style={{ maxHeight: "588px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px",
            padding: "4px 8px 4px 4px", boxSizing: "border-box", alignContent: "start" }}>
            {filtered.map((c) => {
              const on = c.slug === sel?.slug;
              return (
                <button key={c.slug} type="button" onClick={() => setSelSlug(c.slug)} aria-pressed={on} aria-label={c.title} title={c.title}
                  className="cx-tile"
                  style={{ position: "relative", height: "92px", padding: 0, borderRadius: "16px", overflow: "hidden", cursor: "pointer",
                    background: c.bg || "#FFFFFF", border: 0,
                    boxShadow: on ? `0 0 0 3px ${PURPLE}, 0 12px 24px -10px rgba(91,48,224,0.5)` : "0 0 0 1px #DCD0F2",
                    opacity: on ? 1 : 0.82, transform: on ? "translateY(-2px)" : "none",
                    transition: "box-shadow 0.2s, opacity 0.2s, transform 0.2s" }}>
                  <Image src={c.img} alt={c.title} fill sizes="180px"
                    style={{ objectFit: c.fit || "cover", objectPosition: "center", padding: c.fit === "contain" ? "12px 16px" : 0 }} />
                  {on && (
                    <span aria-hidden="true" style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", borderRadius: "50%", background: PURPLE,
                      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2px #ffffff" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: "24px", borderRadius: "20px", border: "1px dashed #B9A6E8", color: "#5E5878", fontSize: "15px" }}>{th ? "ยังไม่มีเคสในหมวดนี้" : "No cases in this category yet"}</div>
            )}
          </div>
        </div>

        {/* selected case */}
        {sel && (
          <div key={sel.slug} className="cx-detail" style={{ display: "flex", gap: "40px", alignItems: "flex-start", padding: "48px 52px", borderRadius: "32px", background: "#F3EEFB", border: "1px solid #DCD0F2" }}>
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "18px", minWidth: 0 }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ padding: "6px 14px", borderRadius: "999px", background: "#FFFFFF", color: PURPLE, fontSize: "13px", fontWeight: 600 }}>{sel.industry}</span>
                <span style={{ padding: "6px 14px", borderRadius: "999px", background: PURPLE, color: "#FFFFFF", fontSize: "13px", fontWeight: 600 }}>{sel.value}</span>
              </div>
              <div style={{ fontSize: "clamp(34px,3.6vw,52px)", fontWeight: 700, lineHeight: 1.1, color: PURPLE }}>{sel.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#6A2BD0" }}>{th ? "ภาพรวม" : "Overview"}</div>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65, color: "#2A2540" }}>{sel.overview}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#6A2BD0" }}>{th ? "กลยุทธ์" : "Strategy"}</div>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65, color: "#2A2540" }}>{sel.strategy}</p>
              </div>
              {sel.stats.length > 0 && <div className="cx-stats" style={{ display: "flex", gap: "44px", flexWrap: "wrap", marginTop: "6px" }}>
                {sel.stats.map((st) => (
                  <div key={st.label} style={{ display: "flex", flexDirection: "column", gap: "2px", maxWidth: "180px" }}>
                    <div style={{ fontSize: "32px", fontWeight: 700, color: "#7A2BD8" }}>{st.val}</div>
                    <div style={{ fontSize: "15px", color: "#2A2540", lineHeight: 1.35 }}>{st.label}</div>
                  </div>
                ))}
              </div>}
              <Link href={`/${lang}/success/${sel.slug}`} style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700, textDecoration: "none", color: "#1B1733", width: "fit-content" }} className="cx-more">
                {th ? "อ่านเพิ่มเติม" : "Read More"} →
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cx-more:hover{ color: ${PURPLE} !important; }
        .cx-filter:hover{ color: ${PURPLE} !important; }
        .cx-tile:hover{ opacity: 1 !important; }
        .cx-filters::-webkit-scrollbar{ display: none; }
        .cx-filter{ flex-shrink: 0; }
        .cx-detail{ animation: cx-in 0.35s ease; }
        @keyframes cx-in{ from{ opacity: 0; transform: translateY(8px); } to{ opacity: 1; transform: none; } }
        @media (max-width: 1100px){
          .cx-grid{ grid-template-columns: minmax(0, 1fr) !important; }
          .cx-grid > *{ min-width: 0; }
          .cx-list{ display: flex !important; overflow-x: auto !important; overflow-y: hidden !important; max-height: none !important; padding: 4px 4px 8px !important; scrollbar-width: none; }
          .cx-list::-webkit-scrollbar{ display: none; }
          .cx-hint{ display: none; }
          .cx-list > button{ flex: 0 0 150px; height: 80px !important; }
        }
        @media (max-width: 760px){
          .cx-detail{ flex-direction: column !important; align-items: flex-start !important; padding: 28px 22px !important; gap: 24px !important; }
          .cx-stats{ gap: 22px !important; }
          .cx-stats > div > div:first-child{ font-size: 26px !important; }
          .cx-mode button{ padding: 0 16px !important; font-size: 15px !important; white-space: nowrap; }
        }
        @media (prefers-reduced-motion: reduce){ .cx-detail{ animation: none; } }
      `}</style>
    </div>
  );
}
