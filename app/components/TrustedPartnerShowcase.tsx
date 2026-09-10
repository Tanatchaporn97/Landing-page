import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ITEMS = [
  { src: "/service/built-on-clarity.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบชัดเจนตามมาตรฐาน",         descEn: "Working within a clear, standardized system." },
  { src: "/service/teamwork.jpg",                title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจทั้งแบรนด์และอินฟลูเอนเซอร์", descEn: "A team that understands both brands and influencers.", objectPosition: "35% center" },
  { src: "/service/data-driven-precision.jpg",   title: "Data-Driven Precision",      desc: "ใช้ข้อมูลช่วยตัดสินใจได้แม่นขึ้น",       descEn: "Data that helps you make sharper decisions." },
  { src: "/service/result.jpg",                  title: "Results That Matter",        desc: "วัดผลให้สอดคล้องกับเป้าหมายของแบรนด์",   descEn: "Measuring results that align with your brand's goals." },
];

export default function TrustedPartnerShowcase({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="tps-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "start" }}>
      {/* Left — heading, description, CTA */}
      <div className="tps-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h3 style={{ ...KT, fontSize: "clamp(26px,2.6vw,34px)", fontWeight: 800, margin: 0, lineHeight: 1.25, color: "#111827" }}>
          Benefit
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "320px" }}>
          {lang === "th"
            ? "ข้อดีที่ทำให้แบรนด์ไว้วางใจ Buddy Review ในการทำ Influencer Marketing"
            : "The advantages that make brands trust Buddy Review for their influencer marketing."}
        </p>
        <Link href={`/${lang}/about`} style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 700, color: "#5f26e5", textDecoration: "none" }}>
          {lang === "th" ? "ดูเพิ่มเติม" : "Learn More"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Right — row of benefit cards */}
      <div className="tps-cards-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {ITEMS.map((item, i) => (
          <div key={item.title} className="tps-card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4 / 3", marginBottom: "16px" }}>
              <Image src={item.src} alt={item.title} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: item.objectPosition || "top" }} />
            </div>
            <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.04em", marginBottom: "6px" }}>
              ({String(i + 1).padStart(2, "0")})
            </span>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
              <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.35 }}>
                {item.title}
              </h4>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1px solid rgba(17,24,39,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1080px){
          .tps-cards-row{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px){
          .tps-grid{ grid-template-columns: 1fr !important; }
          .tps-left{ max-width: none !important; }
        }
        @media (max-width: 560px){
          .tps-cards-row{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
