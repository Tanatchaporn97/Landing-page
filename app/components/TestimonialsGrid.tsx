"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const QuoteIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path d="M0 28V17.2C0 14.0267 0.693333 11.16 2.08 8.6C3.46667 6.04 5.42667 3.85333 7.96 2.04L11.44 5C9.65333 6.38667 8.22667 7.97333 7.16 9.76C6.09333 11.5467 5.56 13.5467 5.56 15.76H10.28V28H0ZM19.72 28V17.2C19.72 14.0267 20.4133 11.16 21.8 8.6C23.1867 6.04 25.1467 3.85333 27.68 2.04L31.16 5C29.3733 6.38667 27.9467 7.97333 26.88 9.76C25.8133 11.5467 25.28 13.5467 25.28 15.76H30V28H19.72Z" fill="#5f26e5" opacity="0.7"/>
  </svg>
);

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
      padding: "24px 24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      <QuoteIcon />
      <p style={{ ...KT, fontSize: "15px", color: "#111827", lineHeight: "1.75", margin: 0, flex: 1 }}>{t.text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="44px" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <p style={{ ...KT, fontWeight: 700, fontSize: "16px", color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{t.name}</p>
      </div>
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
