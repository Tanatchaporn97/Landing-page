"use client";
import { useState } from "react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const KOL_PACKAGES = [
  {
    name: "Start",
    price: "50,000",
    cta: "Get Start",
    features: ["Proposal", "KOL List", "Campaign Timeline", "Campaign Performance"],
  },
  {
    name: "Basic",
    price: "100,000",
    cta: "Go Basic",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Campaign Performance"],
  },
  {
    name: "Pro",
    price: "300,000",
    cta: "Go Pro",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Campaign Performance", "Campaign Summary & Recommend", "Sentiment Analysis on Campaign Dashboard"],
  },
  {
    name: "Premium",
    price: "500,000",
    cta: "Go Premium",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Market Research", "Competitor Analysis", "Audience Analysis", "Communication Strategy", "Campaign Performance", "Campaign Summary & Recommend", "Sentiment Analysis on Campaign Dashboard"],
  },
];

const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function KolPackagesSection({ lang = "th" }: { lang?: "th" | "en" }) {
  const [expandedKol, setExpandedKol] = useState<Set<string>>(new Set());
  const t = lang === "th" ? { contactUs: "ติดต่อเรา", showLess: "ดูน้อยลง", viewMore: "ดูเพิ่มเติม" } : { contactUs: "Contact Us", showLess: "Show Less", viewMore: "View More" };

  return (
    <section className="py-20 px-6 package-bg">
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
        <h2 className="section-title text-center font-bold mb-14 section-h2-fixed"
          style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on" }}>
          KOL Campaign{" "}
          <span style={{
            background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Packages</span>
        </h2>

        <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", alignItems: "stretch" }}>
          {KOL_PACKAGES.map((pkg) => {
            const featured = pkg.name === "Basic";
            const isExpanded = expandedKol.has(pkg.name);
            const visibleFeatures = pkg.features.slice(0, 4);
            const hiddenFeatures = pkg.features.slice(4);
            return (
            <div key={pkg.name} className="kol-card" style={{
              background: featured ? "#5f26e5" : "rgba(255,255,255,0.22)",
              backdropFilter: featured ? "none" : "blur(18px)",
              WebkitBackdropFilter: featured ? "none" : "blur(18px)",
              border: featured ? "none" : "1px solid rgba(255,255,255,0.45)",
              borderRadius: "24px",
              padding: "36px 28px 32px",
              display: "flex", flexDirection: "column", gap: "0",
            }}>
              {/* Plan name */}
              <h3 style={{ color: featured ? "#ffffff" : "#5f26e5", fontSize: "24px", fontWeight: 600, textAlign: "center", margin: "0 0 20px" }}>
                {pkg.name}
              </h3>

              {/* Price */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <span style={{ color: featured ? "rgba(255,255,255,0.8)" : "#111827", fontSize: "18px", fontWeight: 400 }}>THB </span>
                <span className="kol-price-text" style={{ color: featured ? "#ffffff" : "#111827", fontSize: "36px", fontWeight: 800, letterSpacing: "-1px" }}>
                  {pkg.price}
                </span>
              </div>

              {/* CTA button */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                <button style={{
                  ...KT,
                  background: featured ? "#ffffff" : "rgba(255,255,255,0.18)",
                  backdropFilter: featured ? "none" : "blur(12px)",
                  WebkitBackdropFilter: featured ? "none" : "blur(12px)",
                  border: featured ? "none" : "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "50px",
                  color: "#5f26e5",
                  fontSize: "16px", fontWeight: 600,
                  padding: "10px 28px", cursor: "pointer",
                }}>
                  {pkg.cta}
                </button>
              </div>

              {/* Feature list — first 4 always visible */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {visibleFeatures.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: featured ? "rgba(255,255,255,0.25)" : "rgba(95,38,229,0.22)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <IconCheck color={featured ? "#ffffff" : "#5f26e5"} />
                    </div>
                    <span style={{ color: featured ? "rgba(255,255,255,0.92)" : "#111827", fontSize: "16px", fontWeight: 400, lineHeight: "1.5" }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Extra features — always visible desktop, toggle on mobile */}
              {hiddenFeatures.length > 0 && (
                <div className="kol-extra-features" data-expanded={isExpanded} style={{ flexDirection: "column", gap: "14px", marginTop: "14px", display: isExpanded ? "flex" : "none" }}>
                  {hiddenFeatures.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        background: featured ? "rgba(255,255,255,0.25)" : "rgba(95,38,229,0.22)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: "1px",
                      }}>
                        <IconCheck color={featured ? "#ffffff" : "#5f26e5"} />
                      </div>
                      <span style={{ color: featured ? "rgba(255,255,255,0.92)" : "#111827", fontSize: "16px", fontWeight: 400, lineHeight: "1.5" }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ดูเพิ่มเติม — mobile only */}
              {hiddenFeatures.length > 0 && (
                <button className="kol-show-more-btn"
                onClick={() => setExpandedKol(prev => {
                  const next = new Set(prev);
                  next.has(pkg.name) ? next.delete(pkg.name) : next.add(pkg.name);
                  return next;
                })}
                onTouchEnd={(e) => { e.preventDefault(); setExpandedKol(prev => { const next = new Set(prev); next.has(pkg.name) ? next.delete(pkg.name) : next.add(pkg.name); return next; }); }}
                style={{
                  ...KT, marginTop: "16px", background: "none", border: `1px solid ${featured ? "rgba(255,255,255,0.5)" : "rgba(95,38,229,0.4)"}`,
                  borderRadius: "50px", color: featured ? "#ffffff" : "#5f26e5",
                  fontSize: "14px", fontWeight: 600, padding: "8px 20px", cursor: "pointer",
                  alignSelf: "center", width: "fit-content", touchAction: "manipulation", position: "relative", zIndex: 1,
                }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    {isExpanded ? t.showLess : t.viewMore}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <path d="M3 5l4 4 4-4" stroke={featured ? "#ffffff" : "#5f26e5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              )}
            </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <a href="#contact" className="btn-insight" style={{
            ...KT,
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: 600,
            padding: "14px 48px",
            textDecoration: "none",
            display: "inline-block",
          }}>
            {t.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
}
