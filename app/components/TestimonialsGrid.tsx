"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function TestimonialsGrid({ dict }: { dict?: any }) {
  const TESTIMONIALS = dict?.testimonials || [];
  const col1 = [0, 2, 4].map(i => TESTIMONIALS[i]).filter(Boolean);
  const col2 = [1, 3, 5].map(i => TESTIMONIALS[i]).filter(Boolean);

  const Card = ({ t }: { t: any }) => (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      padding: "20px 22px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{ position: "relative", width: "57px", height: "57px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="57px" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <p style={{ ...KT, fontWeight: 600, fontSize: "24px", color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{t.name}</p>
      </div>
      <p style={{ ...KT, fontSize: "14px", color: "#000000", lineHeight: "1.7", margin: 0 }}>{t.text}</p>
    </div>
  );

  return (
    <div className="testimonials-masonry" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        {col1.map((t, i) => <Card key={i} t={t} />)}
      </div>
      <div className="testimonials-col-2" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", marginTop: "48px" }}>
        {col2.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}
