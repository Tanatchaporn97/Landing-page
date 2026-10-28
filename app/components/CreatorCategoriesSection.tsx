"use client";

import { ShieldCheck, Sparkles, UtensilsCrossed, HeartPulse, Users, PawPrint,
  Gamepad2, MapPin, Briefcase, Clapperboard, ShoppingBag, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

// Thai words the browser's line breaker splits in the wrong place (e.g. "ผ่า|นอินฟลูเอนเซอร์").
// Word-joiners go only between whole grapheme clusters, never before a vowel/tone mark.
const KEEP_TOGETHER = ["ผ่าน", "อินฟลูเอนเซอร์", "คอนเทนต์", "ตัวเอง", "ต่างประเทศ", "ผู้เชี่ยวชาญ", "น่าเชื่อถือ",
  "ความงาม", "ร่วมกัน", "ประสบการณ์", "ไลฟ์สไตล์", "แฟนคลับ", "เทคโนโลยี", "ท่องเที่ยว", "เดินทาง",
  "ดูแล", "สนใจ", "ผู้บริโภค", "แต่งหน้า"];
const joinWord = (w: string) => {
  const Seg = (Intl as unknown as { Segmenter?: new (l?: string, o?: { granularity: string }) => { segment: (t: string) => Iterable<{ segment: string }> } }).Segmenter;
  const parts = Seg ? Array.from(new Seg("th", { granularity: "grapheme" }).segment(w), (x) => x.segment) : [w];
  return parts.join("\u2060");
};
const thWrap = (t: string) => KEEP_TOGETHER.reduce((acc, w) => acc.split(w).join("\u200B" + joinWord(w) + "\u200B"), t);

const CATEGORIES = [
  { Icon: ShieldCheck, title: "KOC & Product Reviewer", titleTh: "KOC & Product Reviewer",
    desc: "รีวิวสินค้าจากประสบการณ์ใช้งานจริง ช่วยเพิ่มความน่าเชื่อถือและความมั่นใจก่อนตัดสินใจซื้อ",
    descEn: "Reviews from real hands-on use that build credibility and confidence before people decide to buy." },
  { Icon: Sparkles, title: "Beauty & Skincare", titleTh: "Beauty & Skincare",
    desc: "แนะนำสินค้าและแบรนด์ให้เป็นที่รู้จักในกลุ่มคนรักความงาม ผ่านรีวิว การแต่งหน้า และการดูแลผิว",
    descEn: "Introducing products and brands to beauty lovers through reviews, makeup, and skincare content." },
  { Icon: UtensilsCrossed, title: "Food & Lifestyle", titleTh: "Food & Lifestyle",
    desc: "เชื่อมโยงสินค้าและบริการกับเรื่องกิน เที่ยว และไลฟ์สไตล์ เพื่อให้แบรนด์เป็นส่วนหนึ่งของชีวิตประจำวัน",
    descEn: "Linking products and services to food, travel, and lifestyle so the brand becomes part of everyday life." },
  { Icon: HeartPulse, title: "Health & Wellness", titleTh: "Health & Wellness",
    desc: "สื่อสารกับกลุ่มคนรักสุขภาพ ผ่านเรื่องการออกกำลังกาย โภชนาการ และการดูแลตัวเอง",
    descEn: "Speaking to health-conscious audiences through exercise, nutrition, and self-care." },
  { Icon: Users, title: "Family & Parenting", titleTh: "Family & Parenting",
    desc: "สร้างความไว้วางใจในกลุ่มพ่อแม่และครอบครัว ผ่านประสบการณ์เลี้ยงลูกและการใช้สินค้าในชีวิตจริง",
    descEn: "Building trust with parents and families through real parenting experiences and everyday product use." },
  { Icon: PawPrint, title: "Pet & Hobby", titleTh: "Pet & Hobby",
    desc: "เข้าถึงกลุ่มคนรักสัตว์และผู้ที่มีความสนใจเฉพาะทาง ผ่านอินฟลูเอนเซอร์ในแต่ละกลุ่ม",
    descEn: "Reaching pet lovers and niche-interest audiences through influencers in each community." },
  { Icon: Gamepad2, title: "Gaming & Tech", titleTh: "Gaming & Tech",
    desc: "แนะนำสินค้าและเทคโนโลยีให้กลุ่มเกมเมอร์และคนรักไอทีรู้จัก ผ่านรีวิวและการทดลองใช้งานจริง",
    descEn: "Introducing products and technology to gamers and tech lovers through reviews and hands-on trials." },
  { Icon: MapPin, title: "Travel & Local", titleTh: "Travel & Local",
    desc: "โปรโมตสินค้า บริการ และสถานที่ ผ่านคอนเทนต์ท่องเที่ยว รีวิวของใช้ระหว่างเดินทาง และประสบการณ์ในแต่ละพื้นที่",
    descEn: "Promoting products, services, and places through travel content, travel-gear reviews, and local experiences." },
  { Icon: Briefcase, title: "Business & Expert", titleTh: "Business & Expert",
    desc: "เพิ่มความน่าเชื่อถือให้สินค้าและบริการ ด้วยความรู้และประสบการณ์จากผู้เชี่ยวชาญเฉพาะด้าน",
    descEn: "Adding credibility to products and services with the knowledge and experience of specialists." },
  { Icon: Clapperboard, title: "Entertainment & Fandom", titleTh: "Entertainment & Fandom",
    desc: "สร้างกระแสและการพูดถึงแบรนด์ในกลุ่มแฟนคลับ ผ่านอินฟลูเอนเซอร์สายบันเทิงและกลุ่มที่มีความสนใจร่วมกัน",
    descEn: "Creating buzz and brand conversation among fan communities through entertainment influencers and shared-interest groups." },
  { Icon: ShoppingBag, title: "Live Seller & Affiliate", titleTh: "Live Seller & Affiliate",
    desc: "เพิ่มโอกาสในการขายผ่านไลฟ์สด รีวิวสินค้า และการแนะนำช่องทางสั่งซื้อโดยตรง",
    descEn: "Driving sales through live selling, product reviews, and direct links to buy." },
  { Icon: Globe, title: "International Creator", titleTh: "International Creator",
    desc: "ขยายการรับรู้แบรนด์ในต่างประเทศ ผ่านอินฟลูเอนเซอร์ที่เข้าใจภาษา วัฒนธรรม และผู้บริโภคในแต่ละตลาด",
    descEn: "Expanding brand awareness abroad through influencers who understand each market's language, culture, and consumers." },
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
                {lang === "th" ? thWrap(cat.desc) : cat.descEn}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <span style={{ ...KT, fontSize: "18px", fontWeight: 700, color: "#111827" }}>
          and 100+ more
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
        /* phones: compact 2-column tiles (icon beside title, full description below)
           instead of one tall full-width row per category — ~⅓ of the height */
        @media (max-width: 640px){
          .cc-header-row{ align-items: flex-start !important; margin-bottom: 24px !important; gap: 12px !important; }
          .cc-grid{ grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
          .cc-cell{ padding: 14px 12px !important; border: 1px solid rgba(95,38,229,0.12) !important; border-radius: 16px;
            background: rgba(255,255,255,0.45); display: grid; grid-template-columns: 34px 1fr; column-gap: 10px; align-items: center; }
          .cc-cell-icon{ width: 34px !important; height: 34px !important; border-radius: 11px !important; margin-bottom: 0 !important; }
          .cc-cell-icon svg{ width: 17px; height: 17px; }
          .cc-cell h4{ font-size: 13.5px !important; line-height: 1.25 !important; margin: 0 !important; }
          .cc-cell p{ grid-column: 1 / -1; margin-top: 8px !important; font-size: 12.5px !important; line-height: 1.5 !important; color: #4b5563 !important;
            }
          .cc-cell:hover{ transform: none; }
        }
      `}</style>
    </div>
  );
}
