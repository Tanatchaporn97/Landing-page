"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PURPLE = "#5B30E0";

// Case data — the Selected Campaigns shown on /brand. `industry` and `value`
// (content type) drive the two filter modes; `slug` links to /success/<slug>.
const CASES = [
  { industry: "Healthcare", value: "New Market Entry", slug: "siangpure",      img: "/success-stories-2/siangpure-logo.jpg", cat: "HEALTHCARE",     title: "Siangpure",
    overview: "แคมเปญที่พา Siangpure บุกตลาดใหม่ผ่านครีเอเตอร์ชาวอินเดียบน Instagram เพื่อสร้างการรับรู้ในกลุ่มผู้บริโภคที่ไม่เคยเข้าถึงมาก่อน",
    overviewEn: "A campaign that brought Siangpure into a new market through Indian Creators on Instagram, building awareness with an audience never reached before.",
    approach: "Buddy Review คัดเลือก Indian Influencers ที่มี Audience ตรงกับตลาด พร้อมพัฒนาคอนเทนต์ภายใต้แนวคิด “มาเที่ยวไทย อะไรคือของที่ต้องซื้อกลับ?” เปลี่ยน Siangpure ให้กลายเป็น Thai Travel Essential ที่คนอินเดียจดจำและอยากซื้อกลับ",
    approachEn: "Buddy Review selected Indian influencers whose audiences matched the target market, building content around \"Visiting Thailand — what's the must-buy souvenir?\" and repositioning Siangpure as a memorable Thai Travel Essential.",
    stats: [{ label: "Reach", labelTh: "การเข้าถึง", value: "1.2M" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "15" }, { label: "Engagement Rate", labelTh: "อัตรามีส่วนร่วม", value: "4.8%" }],
    imgFit: "contain" as const, imgBg: "#ffffff" },
  { industry: "Pet Care", value: "Niche Community",  slug: "optimum-hi-pro", img: "/success-stories-2/optimum-hi-pro-logo.jpg", cat: "PET CARE",       title: "Optimum Hi Pro",
    overview: "เจาะกลุ่มคนเลี้ยงปลาคาร์พที่มีความเฉพาะทางสูง ผ่านครีเอเตอร์ที่เข้าใจ community นี้จริงๆ พร้อมขยายการรับรู้ในวงกว้าง",
    overviewEn: "Reaching the highly specialized koi-keeper community through Creators who truly understand it, while expanding awareness at scale.",
    approach: "ผสานอินฟลูเอนเซอร์เฉพาะทางที่เข้าถึง Community คนเลี้ยงปลาคาร์พโดยตรง กับ Lifestyle Influencer ที่ช่วยขยายการรับรู้ในวงกว้าง ทำให้แคมเปญได้ทั้งความน่าเชื่อถือและ Reach ไปพร้อมกัน",
    approachEn: "Blended specialist influencers who reached the koi-keeping community directly with lifestyle influencers who extended awareness at scale — giving the campaign both credibility and reach.",
    stats: [{ label: "Reach", labelTh: "การเข้าถึง", value: "850K" }, { label: "Community Engagement", labelTh: "การมีส่วนร่วม", value: "+65%" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "10" }],
    imgFit: "contain" as const, imgBg: "#05176e" },
  { industry: "Food & Beverage", value: "Always-on Content", slug: "auntie-annes",  img: "/success-stories-2/auntie-annes-logo.jpg", cat: "FOOD & BEVERAGE", title: "Auntie Anne's",
    overview: "สร้าง Always-on Content Engine บน TikTok ที่ผลิตคอนเทนต์ต่อเนื่องกว่า 15 เดือน รักษาการมองเห็นแบรนด์ได้ตลอดปี",
    overviewEn: "Built an always-on TikTok content engine producing content continuously for 15+ months, keeping the brand visible year-round.",
    approach: "สร้าง Always-on Content Engine ที่ผสาน Storyboard, Talent และทีม Production เข้าด้วยกัน ผลิตคอนเทนต์ต่อเนื่องราว 15 ชิ้นต่อเดือน พร้อมปรับ Format ให้ทันเทรนด์ TikTok อยู่เสมอ",
    approachEn: "Built an Always-on Content Engine combining storyboarding, talent, and production — producing around 15 pieces of content a month while continuously adapting formats to TikTok trends.",
    stats: [{ label: "Duration", labelTh: "ระยะเวลา", value: "15+ mo." }, { label: "Content Pieces", labelTh: "ชิ้นคอนเทนต์", value: "200+" }, { label: "Avg. Views", labelTh: "ยอดวิวเฉลี่ย", value: "500K" }],
    imgFit: "contain" as const, imgBg: "#ffffff", imgPosition: "center 40%" },
  { industry: "Skincare", value: "Event Activation", slug: "ahc",           img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",       title: "AHC",
    overview: "จุดกระแสด้วยอีเวนต์ที่ต่อยอดจากซีรีส์ไวรัล AHC Skin Game สร้างการพูดถึงบนโซเชียลอย่างต่อเนื่อง",
    overviewEn: "Sparked buzz with an event built on the viral series \"AHC Skin Game,\" driving continuous social conversation.",
    approach: "ดึงอินฟลูเอนเซอร์ตัวท็อปมาร่วมงานอีเวนต์ เสริมด้วยข่าวประชาสัมพันธ์จากสื่อชั้นนำ และปรับคอนเทนต์ให้เหมาะกับแต่ละแพลตฟอร์ม พร้อมติดตามผลแบบเรียลไทม์เพื่อดันให้เกิดกระแสไวรัล",
    approachEn: "Brought in top-tier influencers for the event, amplified with PR from leading media, tailored content per platform, and tracked results in real time to drive viral reach.",
    stats: [{ label: "Event Reach", labelTh: "การเข้าถึงอีเวนต์", value: "2M" }, { label: "Media Mentions", labelTh: "การพูดถึง", value: "120+" }, { label: "Engagement Rate", labelTh: "อัตรามีส่วนร่วม", value: "6.2%" }] },
  { industry: "Health & Beauty", value: "Shoppable Content", slug: "watsons",      img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY", title: "Watsons",
    overview: "ดัน House Brand ให้ปังบน TikTok และ Lemon8 ด้วยคอนเทนต์ที่พาไปสู่การตัดสินใจซื้อโดยตรง",
    overviewEn: "Boosted House Brand products on TikTok and Lemon8 with content designed to drive direct purchase decisions.",
    approach: "ใช้กลยุทธ์ \"เพื่อนแนะนำเพื่อน\" ให้ครีเอเตอร์โชว์การช้อปจริงในร้านผ่านโจทย์ \"งบ 500 บาท ซื้อได้กี่ชิ้น\" บน TikTok และ Lemon8 เพื่อกระตุ้นให้อยากช้อปตามทันที",
    approachEn: "Used a \"friend-recommending-friend\" strategy, having creators show real in-store shopping under the challenge \"How many items with a 500 THB budget?\" across TikTok and Lemon8 to spark immediate purchase intent.",
    stats: [{ label: "Sales Uplift", labelTh: "ยอดขายเพิ่มขึ้น", value: "+40%" }, { label: "Reach", labelTh: "การเข้าถึง", value: "1.5M" }, { label: "Creators", labelTh: "ครีเอเตอร์", value: "25" }] }
];

type Mode = "industry" | "content";
const INDUSTRIES = ["Healthcare", "Pet Care", "Food & Beverage", "Skincare", "Health & Beauty"];
const CONTENTS = ["New Market Entry", "Niche Community", "Always-on Content", "Event Activation", "Shoppable Content"];

const IconIndustry = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>
);
const IconContent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);

// "See the Work in Action" case explorer: switch between browsing by industry
// or by content type, filter with count chips, pick a case from the list on
// the left, read its overview / strategy / results on the right.
export default function CaseExplorer({ lang }: { lang: "th" | "en" }) {
  const th = lang === "th";
  const [mode, setMode] = useState<Mode>("industry");
  const [filter, setFilter] = useState<string>("all");
  const [selSlug, setSelSlug] = useState<string>(CASES[0].slug);

  const key = mode === "industry" ? "industry" : "value";
  const other = mode === "industry" ? "value" : "industry";
  const values = mode === "industry" ? INDUSTRIES : CONTENTS;

  const filtered = useMemo(
    () => (filter === "all" ? CASES : CASES.filter((c) => c[key] === filter)),
    [filter, key],
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

      {/* filter chips with counts */}
      <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {["all", ...values].map((v) => {
          const on = v === filter;
          const count = v === "all" ? CASES.length : CASES.filter((c) => c[key] === v).length;
          return (
            <button key={v} type="button" onClick={() => setFilter(v)} aria-pressed={on}
              style={{ ...KT, display: "flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${on ? "#1B1733" : "#D3C5EF"}`, background: on ? "#1B1733" : "#F4EFFB", color: on ? "#FFFFFF" : "#2A2540",
                fontSize: "15px", fontWeight: 500, transition: "background 0.2s, color 0.2s" }}>
              {v === "all" ? (th ? "ทั้งหมด" : "All") : v}
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px",
                background: on ? "rgba(255,255,255,0.18)" : "#E3D9F4", color: on ? "#FFFFFF" : "#5E5878" }}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="cx-grid" style={{ marginTop: "44px", width: "100%", display: "grid", gridTemplateColumns: "380px minmax(0, 1fr)", gap: "32px", alignItems: "start" }}>
        {/* case list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
            <div style={{ fontSize: "14px", color: "#5E5878" }}>{th ? `แสดง ${filtered.length} เคส` : `Showing ${filtered.length} ${filtered.length === 1 ? "case" : "cases"}`}</div>
            {filtered.length > 9 && <div style={{ fontSize: "13px", color: PURPLE, fontWeight: 500 }}>{th ? "เลื่อนดูเพิ่ม ↓" : "Scroll for more ↓"}</div>}
          </div>
          <div className="cx-list" style={{ maxHeight: "588px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "8px", boxSizing: "border-box" }}>
            {filtered.map((c) => {
              const on = c.slug === sel?.slug;
              return (
                <button key={c.slug} type="button" onClick={() => setSelSlug(c.slug)} aria-pressed={on}
                  style={{ ...KT, flexShrink: 0, display: "flex", alignItems: "center", gap: "14px", textAlign: "left", padding: "12px 16px", borderRadius: "16px", cursor: "pointer",
                    border: `1px solid ${on ? PURPLE : "#DCD0F2"}`, background: on ? PURPLE : "#F3EEFB", transition: "background 0.2s, border-color 0.2s" }}>
                  <span style={{ width: "40px", height: "40px", flexShrink: 0, borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 700, color: PURPLE }}>
                    {c.title.charAt(0).toUpperCase()}
                  </span>
                  <span style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "17px", fontWeight: 600, color: on ? "#FFFFFF" : "#1B1733", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</span>
                    <span style={{ fontSize: "13px", color: on ? "#E4DAFF" : "#5E5878" }}>{c[other]}</span>
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#E4DAFF" : "#5E5878"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: "24px", borderRadius: "20px", border: "1px dashed #B9A6E8", color: "#5E5878", fontSize: "15px" }}>{th ? "ยังไม่มีเคสในหมวดนี้" : "No cases in this category yet"}</div>
            )}
          </div>
        </div>

        {/* selected case */}
        {sel && (
          <div key={sel.slug} className="cx-detail" style={{ display: "flex", gap: "40px", alignItems: "center", padding: "48px 52px", borderRadius: "32px", background: "#F3EEFB", border: "1px solid #DCD0F2" }}>
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "18px", minWidth: 0 }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ padding: "6px 14px", borderRadius: "999px", background: "#FFFFFF", color: PURPLE, fontSize: "13px", fontWeight: 600 }}>{sel.industry}</span>
                <span style={{ padding: "6px 14px", borderRadius: "999px", background: PURPLE, color: "#FFFFFF", fontSize: "13px", fontWeight: 600 }}>{sel.value}</span>
              </div>
              <div style={{ fontSize: "clamp(34px,3.6vw,52px)", fontWeight: 700, lineHeight: 1.1, color: PURPLE }}>{sel.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#6A2BD0" }}>{th ? "ภาพรวม" : "Overview"}</div>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65, color: "#2A2540" }}>{th ? sel.overview : sel.overviewEn}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#6A2BD0" }}>{th ? "กลยุทธ์" : "Strategy"}</div>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65, color: "#2A2540" }}>{th ? sel.approach : sel.approachEn}</p>
              </div>
              <div className="cx-stats" style={{ display: "flex", gap: "44px", flexWrap: "wrap", marginTop: "6px" }}>
                {sel.stats.map((st) => (
                  <div key={st.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ fontSize: "32px", fontWeight: 700, color: "#7A2BD8" }}>{st.value}</div>
                    <div style={{ fontSize: "15px", color: "#2A2540" }}>{th ? st.labelTh : st.label}</div>
                  </div>
                ))}
              </div>
              <Link href={`/${lang}/success/${sel.slug}`} style={{ marginTop: "6px", fontSize: "17px", fontWeight: 700, textDecoration: "none", color: "#1B1733", width: "fit-content" }} className="cx-more">
                {th ? "อ่านเพิ่มเติม" : "Read More"} →
              </Link>
            </div>
            <div className="cx-logo" style={{ position: "relative", flexShrink: 0, width: "220px", height: "220px", borderRadius: "999px", overflow: "hidden",
              background: sel.imgBg || "#FFFFFF", boxShadow: "0 20px 50px rgba(91, 48, 224, 0.12)" }}>
              <Image src={sel.img} alt={sel.title} fill sizes="220px"
                style={{ objectFit: sel.imgFit || "cover", objectPosition: sel.imgPosition || "center", padding: sel.imgFit === "contain" ? "24px" : 0 }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cx-more:hover{ color: ${PURPLE} !important; }
        .cx-detail{ animation: cx-in 0.35s ease; }
        @keyframes cx-in{ from{ opacity: 0; transform: translateY(8px); } to{ opacity: 1; transform: none; } }
        @media (max-width: 1100px){
          .cx-grid{ grid-template-columns: minmax(0, 1fr) !important; }
          .cx-grid > *{ min-width: 0; }
          .cx-list{ flex-direction: row !important; overflow-x: auto !important; overflow-y: hidden !important; max-height: none !important; padding: 0 0 6px !important; scrollbar-width: none; }
          .cx-list::-webkit-scrollbar{ display: none; }
          .cx-list > button{ width: 260px; }
        }
        @media (max-width: 760px){
          .cx-detail{ flex-direction: column-reverse !important; align-items: flex-start !important; padding: 28px 22px !important; gap: 24px !important; }
          .cx-logo{ width: 140px !important; height: 140px !important; }
          .cx-stats{ gap: 22px !important; }
          .cx-stats > div > div:first-child{ font-size: 26px !important; }
          .cx-mode button{ padding: 0 16px !important; font-size: 15px !important; white-space: nowrap; }
        }
        @media (prefers-reduced-motion: reduce){ .cx-detail{ animation: none; } }
      `}</style>
    </div>
  );
}
