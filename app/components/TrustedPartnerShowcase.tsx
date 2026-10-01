"use client";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

// The five principles spell B·U·D·D·Y. Letter tint alternates purple / magenta
// (and the soft blob behind it alternates to match) so the word reads as one
// lockup across the row.
const PURPLE = "linear-gradient(160deg, #4b1fc9 0%, #6a2bd8 100%)";
const MAGENTA = "linear-gradient(160deg, #7a24b8 0%, #a3208f 100%)";
const BLOB_PURPLE = "rgba(124,92,255,0.16)";
const BLOB_PINK = "rgba(236,72,153,0.13)";

const ITEMS = [
  { letter: "B", title: "Built on Clarity",          desc: "ทำงานเป็นระบบ ชัดเจน และมีมาตรฐาน",                    descEn: "Clear, systematic work held to a consistent standard.",              tone: "purple" },
  { letter: "U", title: "Unified by Insight",        desc: "เข้าใจเป้าหมายร่วมกัน และต่อยอดด้วย Insight",             descEn: "Shared goals, sharpened by insight.",                                tone: "magenta" },
  { letter: "D", title: "Data-Driven Decisions",     desc: "ใช้ข้อมูลช่วยตัดสินใจ ตั้งแต่เลือก Creator จนถึงวัดผล",      descEn: "Data guides every call — from choosing creators to measuring results.", tone: "purple" },
  { letter: "D", title: "Delivery with Discipline",  desc: "บริหารและส่งมอบงานอย่างเป็นระบบ ตั้งแต่ต้นจนจบ",            descEn: "Systematic management and delivery, from start to finish.",           tone: "magenta" },
  { letter: "Y", title: "Your Goals Drive Results",  desc: "มุ่งผลลัพธ์ที่เชื่อมกับเป้าหมายของแบรนด์จริง",               descEn: "Results tied to your brand's real goals.",                            tone: "purple" },
] as const;

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div>
      {/* Header — eyebrow, serif headline, subtitle; brand CTA on the right */}
      <div className="tps-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "56px" }}>
        <div>
          <p style={{ ...KT, margin: "0 0 14px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.22em", color: "#5f26e5" }}>
            THE BUDDY STANDARD
          </p>
          <h3 style={{ ...PIERSON, margin: 0, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(36px,4.4vw,64px)", lineHeight: 1.08, color: "#1a1036" }}>
            What Goes Into Every
            <br />
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Campaign
            </span>
          </h3>
          <p style={{ ...KT, margin: "18px 0 0", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
            {lang === "th"
              ? "วิธีทำงานที่ช่วยให้ทุกแคมเปญชัดเจน เป็นระบบ และเดินไปสู่เป้าหมายเดียวกัน"
              : "The principles behind how we think, work, and deliver."}
          </p>
        </div>
        <Link href={`/${lang}/brand`}
          className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
          style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 12px 12px 24px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
          {lang === "th" ? "สำหรับแบรนด์" : "For Brands"}
          <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </Link>
      </div>

      {/* B·U·D·D·Y cards — one row; on narrower screens the row scrolls
          sideways (snap) instead of wrapping, so the word stays intact. */}
      <div className="tps-row">
        {ITEMS.map((item, i) => {
          const purple = item.tone === "purple";
          return (
            <div key={i} className="tps-card">
              {/* soft blob behind the letter */}
              <div aria-hidden="true" className="tps-blob" style={{ background: `radial-gradient(circle, ${purple ? BLOB_PURPLE : BLOB_PINK} 0%, ${purple ? BLOB_PURPLE : BLOB_PINK} 55%, transparent 72%)` }} />
              <span aria-hidden="true" className="tps-letter" style={{ ...PIERSON, background: purple ? PURPLE : MAGENTA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {item.letter}
              </span>
              <div style={{ position: "relative", marginTop: "auto" }}>
                <p style={{ ...PIERSON, margin: "0 0 12px", fontWeight: 800, letterSpacing: "-0.02em", fontSize: "clamp(22px,1.9vw,27px)", lineHeight: 1.15, color: "#1a1036" }}>
                  {item.title}
                </p>
                <p style={{ ...KT, margin: 0, fontSize: "15px", fontWeight: 500, lineHeight: 1.6, color: "#374151" }}>
                  {lang === "th" ? item.desc : item.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .tps-row{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
        .tps-card{
          position: relative; overflow: hidden; container-type: inline-size;
          display: flex; flex-direction: column; min-height: 460px; padding: 0 28px 36px;
          border-radius: 28px; box-sizing: border-box;
          background: linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.5) 100%);
          border: 1px solid rgba(95,38,229,0.12);
          box-shadow: 0 18px 44px -24px rgba(95,38,229,0.35);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
        }
        .tps-card:hover{ transform: translateY(-6px); box-shadow: 0 26px 54px -24px rgba(95,38,229,0.45); }
        .tps-blob{ position: absolute; right: -28%; top: 8%; width: 95%; aspect-ratio: 1; border-radius: 50%; pointer-events: none; transition: transform 0.6s cubic-bezier(.22,1,.36,1); }
        .tps-card:hover .tps-blob{ transform: scale(1.08) translate(-4%, 3%); }
        /* Big letter sized to the card's own width (cqw), with its cap sitting
           close to the card's top edge. */
        .tps-letter{
          position: relative; display: block; width: fit-content;
          font-size: 86cqw; font-weight: 800; line-height: 0.82; margin: 0 0 0 -0.03em; padding-top: 0.02em;
          filter: drop-shadow(0 14px 18px rgba(95,38,229,0.22));
          transition: transform 0.45s cubic-bezier(.22,1,.36,1);
        }
        .tps-card:hover .tps-letter{ transform: translateY(4px); }
        @media (max-width: 1100px){
          .tps-row{ display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
            margin: 0 -24px; padding: 8px 24px 24px; }
          .tps-row::-webkit-scrollbar{ display: none; }
          .tps-card{ flex: 0 0 260px; scroll-snap-align: start; min-height: 400px; }
        }
        @media (max-width: 560px){
          .tps-card{ flex-basis: 74vw; }
        }
        @media (prefers-reduced-motion: reduce){
          .tps-card, .tps-blob, .tps-letter{ transition: none; }
        }
      `}</style>
    </div>
  );
}
