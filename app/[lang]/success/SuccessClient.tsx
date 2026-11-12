"use client";
import Link from "next/link";
import { CONTENTS, industryOf, contentOf } from "../../components/caseIndustries";
import { HistoryBackLink } from "../../components/NavHistory";
import Image from "next/image";
import { useState, Suspense } from "react";
import SearchParamsSync from "../../components/SearchParamsSync";
import { STORIES_TH, STORIES_EN } from "./stories";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

// same content-type tabs (and per-case classification) as the brand page's "See the Work in Action"
const CATS_TH = ["ทั้งหมด", ...CONTENTS];
const CATS_EN = ["All", ...CONTENTS];

import { type Locale } from "../../../i18n-config";

export default function SuccessClient({ lang }: { lang: Locale }) {
  const CATS = lang === "th" ? CATS_TH : CATS_EN;
  // Newest-added entries are appended to the end of STORIES_TH/EN, so reverse
  // here to always show the most recently uploaded story first.
  const STORIES = [...(lang === "th" ? STORIES_TH : STORIES_EN)].reverse();
  const allLabel = CATS[0];
  const backLabel = lang === "th" ? "ย้อนกลับ" : "Back";

  // ?cat= carries a content type (e.g. "Product Launch"), as linked from each case page
  const catFromParam = (cat: string | null) => (cat && CATS.includes(cat) ? cat : null);
  const [activeCat, setActiveCat] = useState(allLabel);
  const syncParams = (p: URLSearchParams) => { const cat = catFromParam(p.get("cat")); if (cat) setActiveCat(cat); };

  const filtered = activeCat === allLabel ? STORIES : STORIES.filter((s) => contentOf(s.slug) === activeCat);

  return (
    <div className="background" style={{ ...KT }}>
      <Suspense fallback={null}><SearchParamsSync onChange={syncParams} /></Suspense>

      {/* Back button */}
      <div className="success-back-row sg-back" style={{ padding: "140px 48px 28px" }}>
        <HistoryBackLink fallback={`/${lang}`} className="btn-glass-purple" style={{ borderRadius: "50px", padding: "10px 22px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {backLabel}
        </HistoryBackLink>
      </div>

      <div style={{ maxWidth: "1294px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Header */}
        <h1 className="sg-title" style={{ ...KT, background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.2 }}>
          Success Stories
        </h1>

        {/* Category chips */}
        <div className="sg-chips" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
          {CATS.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={activeCat === cat ? "" : "btn-glass-purple"}
              style={{ ...KT,
              ...(activeCat === cat ? { background: "#5f26e5", color: "#ffffff", border: "1px solid #5f26e5" } : {}),
              borderRadius: "50px", fontSize: "14px", fontWeight: 600,
              padding: "7px 20px", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid — identical card markup/styling to the landing page's Success Stories carousel */}
        <div className="sg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 390px)", justifyContent: "center", gap: "28px" }}>
          <AnimatePresence>
            {filtered.map((story) => (
              <motion.div
                key={story.slug}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", visualDuration: 0.4, bounce: 0.18 }}
              >
                <Link href={`/${lang}/success/${story.slug}`} className="cs-card-link" style={{ textDecoration: "none", width: "390px" }}>
                  <div className="cs-card" style={{ borderRadius: "28px", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", height: "520px", ...(story.hoverTint ? { "--cs-hover-tint": story.hoverTint } as React.CSSProperties : {}) }}>
                    <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%", background: story.imgBg || "transparent" }}>
                      <Image src={story.photo} alt={story.brand} className="cs-card-img sg-img" fill sizes="(max-width: 640px) 50vw, 400px"
                        style={{ objectFit: story.imgFit || "cover", padding: story.imgFit === "contain" ? "24px" : 0 }} />
                    </div>
                    <div className="cs-card-overlay" />

                    {/* Arrow button — top right */}
                    <div className="sg-arrow" style={{ position: "absolute", top: "28px", right: "28px", zIndex: 2 }}>
                      <div className="cs-arrow-btn" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>

                    {/* Category pill */}
                    <div className="sg-pill" style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                      <span className="cs-cat-btn" style={{ ...KT, fontSize: "9px", fontWeight: 400, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "5px 12px", letterSpacing: "0.08em", display: "inline-block" }}>
                        {industryOf(story.slug, story.industry).toUpperCase()}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                      {/* long names (e.g. two projects in one case) step down a size so they stay within two lines */}
                      <h3 style={{ ...KT, fontSize: story.brand.length > 44 ? "24px" : "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{story.brand}</h3>
                      <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.tagline}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Closing CTA */}
        <div className="sg-cta" style={{ textAlign: "center", marginTop: "100px" }}>
          <h2 className="sg-cta-title" style={{ ...KT, fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 800, color: "#111827", margin: "0 0 28px", lineHeight: 1.25 }}>
            {lang === "th" ? "อยากได้ผลลัพธ์" : "Want Results "}
            <span style={{ background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {lang === "th" ? "แบบนี้?" : "Like These?"}
            </span>
          </h2>
          <Link href={`/${lang}/contact`} className="btn-glass-purple" style={{
            ...KT,
            borderRadius: "50px", fontSize: "16px", fontWeight: 600,
            padding: "14px 48px", textDecoration: "none",
          }}>
            {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
          </Link>
        </div>

      </div>
      {/* phones: one-row swipeable category chips and a compact 2-column card grid */}
      <style>{`
        @media (max-width: 640px){
          .sg-back{ padding: 108px 16px 16px !important; }
          .sg-title{ font-size: 28px !important; margin-bottom: 16px !important; }
          .sg-chips{ flex-wrap: nowrap !important; overflow-x: auto; scrollbar-width: none; margin: 0 -24px 24px !important; padding: 2px 24px 6px; gap: 8px !important; }
          .sg-chips::-webkit-scrollbar{ display: none; }
          .sg-chips button{ flex-shrink: 0; white-space: nowrap; font-size: 13px !important; padding: 7px 16px !important; }
          .sg-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
          .sg-grid .cs-card-link{ width: 100% !important; display: block; }
          .sg-grid .cs-card{ height: auto !important; aspect-ratio: 3 / 4; border-radius: 18px !important; }
          /* same resting look as desktop (logo in a circle, gradient title, dark text) instead of the
             global touch rule that keeps the hover-revealed purple state on */
          /* a real 1:1 circle sized and placed with width-based units only (padding/margin %):
             Safari can't resolve top:% against a card whose height comes from aspect-ratio.
             margin-top 20% of width = 15% of the 3:4 card's height */
          .sg-grid .cs-card .cs-card-img-clip{ clip-path: none !important; top: 0 !important; left: 22% !important; margin-top: 20%; width: 56% !important; height: 0 !important; padding-bottom: 56%; border-radius: 50%; overflow: hidden; }
          .sg-grid .cs-card .sg-img{ top: -15% !important; left: -15% !important; width: 130% !important; max-width: none !important; height: 130% !important; transform: none !important; padding: 0 !important; } /* image box ~1.3x the circle, as on desktop */
          .sg-grid .cs-card .cs-card-overlay{ opacity: 0 !important; }
          .sg-grid .cs-card .cs-cat-btn{ background: #5f26e5 !important; color: #ffffff !important; }
          .sg-grid .cs-card .cs-arrow-btn{ background: #5f26e5 !important; animation: none !important; }
          .sg-grid .cs-card .cs-arrow-path{ stroke: #ffffff !important; }
          .sg-grid .cs-card .cs-card-title h3{ background: linear-gradient(45deg, #5f25e5 0%, #ff0089 100%) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent !important; }
          .sg-grid .cs-card .cs-card-tagline{ color: #000000 !important; }
          .sg-grid .sg-arrow{ top: 10px !important; right: 10px !important; }
          .sg-grid .sg-arrow .cs-arrow-btn{ width: 24px !important; height: 24px !important; }
          .sg-grid .sg-arrow svg{ width: 10px; height: 10px; }
          .sg-grid .sg-pill{ top: 10px !important; left: 10px !important; right: 40px; }
          .sg-grid .cs-cat-btn{ font-size: 7.5px !important; padding: 4px 8px !important; letter-spacing: 0.04em !important; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .sg-grid .cs-card-title{ left: 12px !important; right: 12px !important; bottom: 12px !important; }
          .sg-grid .cs-card-title h3{ font-size: 15px !important; margin-bottom: 3px !important; line-height: 1.25 !important; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          .sg-grid .cs-card-tagline{ font-size: 11.5px !important; line-height: 1.5 !important; }
          .sg-cta{ margin-top: 56px !important; }
          .sg-cta-title{ font-size: 26px !important; margin-bottom: 20px !important; }
        }
      `}</style>
    </div>
  );
}
