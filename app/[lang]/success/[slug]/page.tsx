import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BackButton from "./BackButton";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";

const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

export async function generateStaticParams() {
  const dict = await getDictionary("th");
  return dict.successStories.map((s: any) => ({ slug: s.slug }));
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const SUCCESS_STORIES = dict.successStories;
  const idx = SUCCESS_STORIES.findIndex((s: any) => s.slug === slug);
  if (idx === -1) notFound();
  const story = SUCCESS_STORIES[idx];
  const nextStory = SUCCESS_STORIES[idx + 1] ?? null;

  return (
    <div className="background" style={{ ...KT }}>

      {/* Top-left CTA */}
      <div className="success-back-row" style={{ padding: "130px 48px 28px" }}>
        <Link href={`/${lang}/success`} style={{
          ...KT,
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "50px", padding: "10px 22px",
          color: "#5f26e5", textDecoration: "none",
          fontSize: "15px", fontWeight: 500,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Success Stories
        </Link>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section title */}
        <div style={{ paddingTop: "48px", marginBottom: "28px" }}>
          <span style={{
            ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700,
            letterSpacing: "0.5px",
          }}>
            Success Stories
          </span>
        </div>

        {/* Hero image */}
        <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", marginBottom: "40px" }}>
          <Image src={story.logo} alt={story.brand} width={1200} height={420}
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} />
        </div>

        {/* Industry tag */}
        <div style={{ marginBottom: "16px" }}>
          <Link href={`/${lang}/success?cat=${encodeURIComponent(story.industry)}`} style={{
            ...KT,
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "50px", fontSize: "13px", fontWeight: 600,
            padding: "5px 16px", display: "inline-block", color: "#111827",
            textDecoration: "none",
          }}>
            {story.industry}
          </Link>
        </div>

        {/* Brand name */}
        <h1 style={{
          ...KT,
          background: PINK_GRAD,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "clamp(32px,4vw,52px)", fontWeight: 800,
          margin: "0 0 16px", lineHeight: 1.2,
        }}>
          {story.brand}
        </h1>

        {/* Tagline */}
        <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.5vw,20px)", fontWeight: 600, lineHeight: 1.6, margin: "0 0 40px" }}>
          {story.tagline}
        </p>

        {/* Description paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "72px" }}>
          {story.paras.map((para, i) => (
            <p key={i} style={{ ...KT, color: "#111827", fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.85, margin: 0 }}>
              {para}
            </p>
          ))}
        </div>

        {/* Results */}
        <h2 style={{ ...KT, color: "#111827", fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 800, margin: "0 0 32px", textAlign: "center" }}>
          {lang === "th" ? "ผลลัพธ์" : "Results"}
        </h2>
        <div className="success-stats-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${story.stats.length}, 1fr)`, gap: "24px" }}>
          {story.stats.map((s) => (
            <div key={s.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "20px", padding: "28px 24px",
            }}>
              <span style={{
                ...KT, background: PINK_GRAD,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "clamp(34px,3.7vw,54px)", fontWeight: 800, lineHeight: 1,
              }}>
                {s.val}
              </span>
              <span style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,19px)", fontWeight: 700 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav — back + next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", padding: "48px 24px 80px" }}>
        <BackButton lang={lang as Locale} />
        {nextStory && (
          <Link href={`/${lang}/success/${nextStory.slug}`} style={{
            ...KT,
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#5f26e5",
            border: "1px solid #5f26e5",
            borderRadius: "50px", padding: "10px 22px",
            color: "#ffffff", textDecoration: "none",
            fontSize: "15px", fontWeight: 500,
          }}>
            {lang === "th" ? "หน้าต่อไป" : "Next"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        )}
      </div>

    </div>
  );
}
