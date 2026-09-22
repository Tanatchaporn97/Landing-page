"use client";

import { ShieldCheck, Sparkles, UtensilsCrossed, HeartPulse, Users, PawPrint,
  Gamepad2, MapPin, Briefcase, Clapperboard, ShoppingBag, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

const CATEGORIES = [
  { Icon: ShieldCheck, title: "KOC & Product Reviewer", titleTh: "KOC & Product Reviewer",
    desc: "รีวิวจากประสบการณ์จริง เพื่อสร้างความน่าเชื่อถือและ social proof",
    descEn: "Reviews from real experience, building trust and social proof." },
  { Icon: Sparkles, title: "Beauty & Skincare", titleTh: "Beauty & Skincare",
    desc: "Creator ที่เข้าใจ routine ผลิตภัณฑ์ และการเล่าเรื่องความงาม",
    descEn: "Creators who understand product routines and beauty storytelling." },
  { Icon: UtensilsCrossed, title: "Food & Lifestyle", titleTh: "Food & Lifestyle",
    desc: "เปลี่ยนสินค้าให้เข้าไปอยู่ในโมเมนต์การใช้ชีวิตประจำวัน",
    descEn: "Weaving products into everyday lifestyle moments." },
  { Icon: HeartPulse, title: "Health & Wellness", titleTh: "Health & Wellness",
    desc: "สื่อสารหมวดสุขภาพอย่างเหมาะกับความรู้และความสนใจของคนดู",
    descEn: "Communicating health topics with the right knowledge and audience interest." },
  { Icon: Users, title: "Family & Parenting", titleTh: "Family & Parenting",
    desc: "เข้าถึงพ่อแม่และครอบครัวผ่านประสบการณ์ที่ relatable",
    descEn: "Reaching parents and families through relatable experiences." },
  { Icon: PawPrint, title: "Pet & Hobby", titleTh: "Pet & Hobby",
    desc: "หาเสียงที่มีความน่าเชื่อถือใน community ที่สนใจเฉพาะเรื่อง",
    descEn: "Finding credible voices within niche-interest communities." },
  { Icon: Gamepad2, title: "Gaming & Tech", titleTh: "Gaming & Tech",
    desc: "จับกลุ่ม early adopter และ community ที่ตามเทคโนโลยีจริงจัง",
    descEn: "Reaching early adopters and communities that closely follow tech." },
  { Icon: MapPin, title: "Travel & Local", titleTh: "Travel & Local",
    desc: "เล่าเรื่องให้ตรงกับเมือง พื้นที่ และวัฒนธรรมของคนในพื้นที่",
    descEn: "Storytelling tuned to a city, area, and local culture." },
  { Icon: Briefcase, title: "Business & Expert", titleTh: "Business & Expert",
    desc: "เพิ่มน้ำหนักให้แคมเปญที่ต้องการความรู้หรือมุมมองเฉพาะทาง",
    descEn: "Adding credibility to campaigns that need expertise or specialist perspective." },
  { Icon: Clapperboard, title: "Entertainment & Fandom", titleTh: "Entertainment & Fandom",
    desc: "สร้างบทสนทนากับ community ที่มี passion ร่วมกัน",
    descEn: "Sparking conversation with communities that share a passion." },
  { Icon: ShoppingBag, title: "Live Seller & Affiliate", titleTh: "Live Seller & Affiliate",
    desc: "เชื่อมจากคอนเทนต์ไปสู่การตัดสินใจซื้อและ conversion",
    descEn: "Connecting content directly to purchase decisions and conversion." },
  { Icon: Globe, title: "International Creator", titleTh: "International Creator",
    desc: "เข้าตลาดใหม่ผ่าน Creator ที่เข้าใจภาษาและพฤติกรรมท้องถิ่น",
    descEn: "Entering new markets through Creators who understand local language and behavior." },
];

export default function CreatorCategoriesSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div>
      <div className="cc-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", marginBottom: "40px", flexWrap: "wrap" }}>
        <div>
          <Badge variant="outline">Creator Categories</Badge>
          <h3 style={{ ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800, margin: "10px 0 0", lineHeight: 1.15 }}>
            <span style={{ color: "#111827" }}>Explore Every Creator</span>
            <br />
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Category
            </span>
          </h3>
        </div>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#111827", margin: 0, maxWidth: "420px" }}>
          {lang === "th"
            ? "Creator หลากหลายสาย สำหรับโจทย์และกลุ่มเป้าหมายที่ต่างกัน"
            : "A wide range of Creators, matched to different goals and audiences."}
        </p>
      </div>

      <div className="cc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {CATEGORIES.map((cat, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          return (
            <div key={cat.title} className="cc-cell" style={{
              padding: "28px 24px",
              borderTop: row === 0 ? "1px solid rgba(95,38,229,0.12)" : "none",
              borderBottom: "1px solid rgba(95,38,229,0.12)",
              borderLeft: col === 0 ? "none" : "1px solid rgba(95,38,229,0.12)",
              position: "relative",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-radius 0.3s ease",
              cursor: "pointer",
            }}>
              <div className="cc-cell-icon" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "56px", height: "56px", borderRadius: "18px", flexShrink: 0,
                background: "#ffffff", boxShadow: "0 8px 24px rgba(95,38,229,0.16)",
                marginBottom: "18px", transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}>
                <cat.Icon size={24} stroke="url(#categoryIconGradient)" strokeWidth={2} />
              </div>
              <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3, color: "#5f26e5" }}>
                {cat.title}
              </h4>
              <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, margin: 0, color: "#111827" }}>
                {lang === "th" ? cat.desc : cat.descEn}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <span style={{ ...KT, fontSize: "18px", fontWeight: 700, color: "#111827" }}>
          and more 100+
        </span>
      </div>

      {/* Shared gradient definition used by every category icon above (purple → pink, matches site CI) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="categoryIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5f25e5" />
            <stop offset="100%" stopColor="#ff0089" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        .cc-cell:hover{
          background: rgba(255,255,255,0.55) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px !important;
          border: 1px solid rgba(255,255,255,0.6) !important;
          box-shadow: 0 20px 40px -16px rgba(95,38,229,0.25) !important;
          transform: translateY(-6px);
          z-index: 2;
        }
        .cc-cell:hover .cc-cell-icon{
          box-shadow: 0 12px 28px rgba(95,38,229,0.3);
          transform: scale(1.08) rotate(-4deg);
        }
        @media (max-width: 1080px){
          .cc-grid{ grid-template-columns: repeat(2, 1fr) !important; }
          .cc-cell{ border-left: none !important; }
          .cc-cell:nth-child(odd){ border-left: none !important; }
        }
        @media (max-width: 640px){
          .cc-header-row{ align-items: flex-start !important; }
          .cc-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
