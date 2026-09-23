"use client";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

const TAGS = ["Location", "Demographic", "Content Category", "Occupation", "Persona", "Storytelling"];
const KEYWORDS = ["Influencer Marketing", "KOL Matching", "Buddy Review", "Data-Driven"];
const CONTENT_TYPES = ["Review", "UGC", "Live", "Reels"];
const SIMILAR_CREATORS = [
  { name: "Creator A", img: "/creator-mockup/cheese.jpg" },
  { name: "Creator B", img: "/creator-mockup/puifai.jpg" },
  { name: "Creator C", img: "/creator-mockup/yam.jpg" },
  { name: "Creator D", img: "/creator-mockup/may.jpg" },
];
const AGE_BARS = [28, 62, 48, 20, 10];

const panelStyle: CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 8px 20px -8px rgba(95,38,229,0.15)",
  padding: "20px",
};

export default function CreatorSelectionSection({ lang }: { lang: "th" | "en" }) {
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
            <span key={tag} style={{
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
            ? "ลูกค้าเห็น Creator ที่เราแนะนำ พร้อมข้อมูลสำคัญประกอบการตัดสินใจก่อนเริ่มแคมเปญ"
            : "Clients see our recommended Creators along with the key data behind every decision — before the campaign even starts."}
        </p>
      </div>

      {/* Right — KOL discovery dashboard mockup */}
      <div className="cs-dashboard" style={{
        position: "relative", borderRadius: "28px", padding: "28px 32px",
        background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 30px 60px -20px rgba(95,38,229,0.28), 0 10px 24px -12px rgba(255,0,137,0.12)",
        backdropFilter: "blur(14px)", overflow: "hidden",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ffffff", padding: "6px 14px",
            borderRadius: "50px", boxShadow: "0 4px 10px -4px rgba(95,38,229,0.2)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #5f25e5, #ff0089)", flexShrink: 0 }} />
            <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", color: "#5f26e5" }}>KOL DISCOVERY</span>
          </div>
        </div>

        {/* Profile row — Buddy Review's own agency profile */}
        <div style={{ ...panelStyle, display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", flexShrink: 0, overflow: "hidden",
            boxShadow: "0 4px 12px -2px rgba(95,38,229,0.35)", border: "2px solid #ffffff", background: "#5f26e5",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src="/bd-mark.svg" alt="Buddy Review" width={30} height={30} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ ...KT, fontSize: "20px", fontWeight: 800, color: "#5f26e5", margin: "0 0 2px" }}>Buddy Review</p>
            <p style={{ ...KT, fontSize: "13px", color: "#4b5563", margin: 0 }}>
              {lang === "th" ? "เอเจนซี่การตลาดอินฟลูเอนเซอร์ · กรุงเทพฯ" : "Influencer Marketing Agency · Bangkok"}
            </p>
          </div>
          <div className="cs-stats-inline" style={{ display: "flex", gap: "18px", ...KT, fontSize: "13px", color: "#4b5563" }}>
            <span><strong style={{ color: "#5f26e5" }}>1M+</strong> {lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network"}</span>
            <span><strong style={{ color: "#5f26e5" }}>1,000+</strong> {lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients"}</span>
            <span><strong style={{ color: "#5f26e5" }}>4,000+</strong> {lang === "th" ? "แคมเปญ" : "Campaigns"}</span>
          </div>
        </div>

        {/* Charts row — 3 balanced panels so no single box carries empty space */}
        <div className="cs-charts-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>

          <div style={{ ...panelStyle, display: "flex", flexDirection: "column" }}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 4px" }}>
              {lang === "th" ? "กลุ่มผู้ชม" : "Audience Demographic"}
            </p>
            <p style={{ ...KT, fontSize: "11px", color: "#4b5563", margin: "0 0 18px" }}>
              {lang === "th" ? "การกระจายอายุ" : "Age Distribution"}
            </p>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px", minHeight: "76px" }}>
              {AGE_BARS.map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px",
                  background: i === 1 ? "linear-gradient(180deg, #ff0089 0%, #5f25e5 100%)" : "rgba(95,38,229,0.15)",
                  boxShadow: i === 1 ? "0 3px 8px -2px rgba(255,0,137,0.4)" : "none" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", ...KT, fontSize: "10px", color: "#4b5563", marginTop: "8px" }}>
              {["18-24","25-34","35-44","45-54","55+"].map((a) => <span key={a}>{a}</span>)}
            </div>
          </div>

          <div style={{ ...panelStyle, display: "flex", flexDirection: "column" }}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 4px" }}>
              {lang === "th" ? "สัดส่วนเพศ" : "Gender Split"}
            </p>
            <p style={{ ...KT, fontSize: "11px", color: "#4b5563", margin: "0 0 18px" }}>
              {lang === "th" ? "ตามเพศของผู้ชม" : "By audience gender"}
            </p>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <div style={{
                width: "88px", height: "88px", borderRadius: "50%", flexShrink: 0,
                background: "conic-gradient(#ff0089 0% 72%, #5f25e5 72% 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 16px -4px rgba(95,38,229,0.35)",
              }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center", ...KT, fontSize: "16px", fontWeight: 800, color: "#5f26e5" }}>
                  72%
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", ...KT, fontSize: "12px", color: "#4b5563" }}>
                <span><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#ff0089", marginRight: "6px" }} />{lang === "th" ? "หญิง 72%" : "Female 72%"}</span>
                <span><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#5f25e5", marginRight: "6px" }} />{lang === "th" ? "ชาย 28%" : "Male 28%"}</span>
              </div>
            </div>
          </div>

          <div style={{ ...panelStyle, display: "flex", flexDirection: "column" }}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 4px" }}>
              {lang === "th" ? "Engagement รายสัปดาห์" : "Engagement by Week"}
            </p>
            <p style={{ ...KT, fontSize: "11px", color: "#4b5563", margin: "0 0 18px" }}>
              {lang === "th" ? "แนวโน้มล่าสุด" : "Recent engagement trend"}
            </p>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <svg viewBox="0 0 220 70" width="100%" height="100%" preserveAspectRatio="none" style={{ minHeight: "76px" }}>
                <defs>
                  <linearGradient id="cs-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5f25e5" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5f25e5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,50 C20,45 30,20 50,25 C70,30 80,55 100,50 C120,45 130,15 150,18 C170,21 180,40 200,35 C210,32 215,30 220,28 L220,70 L0,70 Z" fill="url(#cs-area)" />
                <path d="M0,50 C20,45 30,20 50,25 C70,30 80,55 100,50 C120,45 130,15 150,18 C170,21 180,40 200,35 C210,32 215,30 220,28" fill="none" stroke="#ff0089" strokeWidth="2.5" />
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", ...KT, fontSize: "10px", color: "#4b5563", marginTop: "8px" }}>
                {["W1","W2","W3","W4","W5","W6","W7"].map((w) => <span key={w}>{w}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Keywords + content type row */}
        <div className="cs-tags-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div style={panelStyle}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px" }}>
              {lang === "th" ? "คีย์เวิร์ดที่เกี่ยวข้อง" : "Related Keywords"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {KEYWORDS.map((k) => (
                <span key={k} style={{ ...KT, fontSize: "12px", color: "#5f26e5", padding: "6px 12px",
                  borderRadius: "50px", background: "rgba(95,38,229,0.06)", border: "1px solid rgba(95,38,229,0.15)" }}>
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div style={panelStyle}>
            <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 10px" }}>
              {lang === "th" ? "ประเภทคอนเทนต์" : "Content Type"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CONTENT_TYPES.map((c) => (
                <span key={c} style={{ ...KT, fontSize: "12px", color: "#5f26e5", padding: "6px 12px",
                  borderRadius: "50px", background: "rgba(95,38,229,0.06)", border: "1px solid rgba(95,38,229,0.15)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Similar creators */}
        <div style={panelStyle}>
          <p style={{ ...KT, fontSize: "12px", fontWeight: 700, color: "#5f26e5", margin: "0 0 12px" }}>
            {lang === "th" ? "ครีเอเตอร์ที่คล้ายกัน" : "Similar Creators"}
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {SIMILAR_CREATORS.map((creator) => (
              <div key={creator.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ position: "relative", width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                  background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#4b5563" aria-hidden="true">
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12Zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v1.4a1 1 0 0 0 1 1h17.6a1 1 0 0 0 1-1v-1.4c0-3.3-6.5-4.9-9.8-4.9Z" />
                  </svg>
                </div>
                <span style={{ ...KT, fontSize: "13px", color: "#4b5563" }}>{creator.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cs-dashboard:hover{
          transform: translateY(-10px);
          box-shadow: 0 40px 70px -20px rgba(95,38,229,0.35), 0 14px 28px -12px rgba(255,0,137,0.18);
        }
        @media (max-width: 900px){
          .cs-grid{ grid-template-columns: 1fr !important; }
          .cs-left{ max-width: none !important; }
        }
        @media (max-width: 720px){
          .cs-stats-inline{ display: none !important; }
          .cs-charts-row{ grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px){
          .cs-tags{ grid-template-columns: repeat(2, auto) !important; }
          .cs-charts-row, .cs-tags-row{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
