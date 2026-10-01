"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

import { type Locale } from "../../../i18n-config";

export default function BlogClient({ lang, dict }: { lang: Locale, dict: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catBrand = lang === "th" ? "สำหรับแบรนด์" : "For Brands";
  const catInf = lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Influencers";
  const catAll = lang === "th" ? "ทั้งหมด" : "All";
  const TOPICS = ["Knowledge", "How-to", "Insight", "Update", "Case", "Other"];
  const CATS = [catAll, ...TOPICS];

  const BLOG_POSTS = (dict?.blogPosts || []).filter((p: any) => p.categories.includes(catBrand) || p.categories.includes(catInf));

  const [activeCat, setActiveCat] = useState(() => {
    const cat = searchParams.get("cat");
    return cat && CATS.includes(cat) ? cat : catAll;
  });
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATS.includes(cat)) setActiveCat(cat);
  }, [searchParams]);

  // Audience filter — separate from the topic chips, combined with them.
  const AUDIENCES = [
    { key: "all", label: lang === "th" ? "ทุกกลุ่ม" : "All audiences" },
    { key: "brand", label: catBrand },
    { key: "influencer", label: catInf },
  ] as const;
  type AudKey = typeof AUDIENCES[number]["key"];
  const parseAud = (v: string | null): AudKey => (v === "brand" || v === "influencer" ? v : "all");
  const [activeAud, setActiveAud] = useState<AudKey>(() => parseAud(searchParams.get("aud")));
  useEffect(() => { setActiveAud(parseAud(searchParams.get("aud"))); }, [searchParams]);

  const [audOpen, setAudOpen] = useState(false);
  const audRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!audOpen) return;
    const onDown = (e: MouseEvent) => { if (!audRef.current?.contains(e.target as Node)) setAudOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAudOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [audOpen]);

  const chooseAud = (key: AudKey) => {
    setActiveAud(key);
    setAudOpen(false);
    // Keep the choice in the URL so a filtered list can be shared/bookmarked.
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") params.delete("aud"); else params.set("aud", key);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };

  const filtered = BLOG_POSTS
    .filter((p: any) => activeCat === catAll || (p.topics || []).includes(activeCat))
    .filter((p: any) => activeAud === "all" || p.categories.includes(activeAud === "brand" ? catBrand : catInf));

  return (
    <div className="background" style={{ ...KT }}>

      <Navbar lang={lang} variant="home" />

      {/* Back button */}
      <div className="blog-back-row" style={{ padding: "140px 48px 28px" }}>
        <button
          onClick={() => router.back()}
          className="btn-glass-purple"
          style={{ ...KT, borderRadius: "50px", padding: "10px 22px", fontSize: "15px", fontWeight: 500 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {lang === "th" ? "ย้อนกลับ" : "Back"}
        </button>
      </div>

      <div style={{ maxWidth: "1294px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Header */}
        <h1 style={{ ...KT, background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(32px,4.2vw,56px)", fontWeight: 800, letterSpacing: "0.02em", margin: "0 0 24px", lineHeight: 1.15 }}>
          Blog
        </h1>

        {/* Topic chips (left) + audience dropdown (right) */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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

          <div ref={audRef} style={{ position: "relative", marginLeft: "auto", zIndex: 20 }}>
            <button
              type="button"
              onClick={() => setAudOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={audOpen}
              aria-label={lang === "th" ? "เลือกบทความตามกลุ่มผู้อ่าน" : "Filter articles by audience"}
              className="btn-glass-purple"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "50px",
                fontSize: "14px", fontWeight: 600, padding: "7px 16px 7px 20px", cursor: "pointer", whiteSpace: "nowrap",
                ...(activeAud !== "all" ? { border: "1px solid #5f26e5" } : {}) }}>
              <span style={{ color: "#6b7280", fontWeight: 500 }}>{lang === "th" ? "สำหรับ:" : "For:"}</span>
              {AUDIENCES.find((a) => a.key === activeAud)?.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform 0.2s", transform: audOpen ? "rotate(180deg)" : "none" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {audOpen && (
              <ul role="listbox" aria-label={lang === "th" ? "กลุ่มผู้อ่าน" : "Audience"}
                style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", minWidth: "100%", margin: 0, padding: "6px",
                  listStyle: "none", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.8)", borderRadius: "16px", boxShadow: "0 16px 40px -12px rgba(95,38,229,0.3)" }}>
                {AUDIENCES.map((a) => {
                  const selected = a.key === activeAud;
                  return (
                    <li key={a.key} role="option" aria-selected={selected}>
                      <button type="button" onClick={() => chooseAud(a.key)} className={selected ? undefined : "blog-aud-opt"}
                        style={{ ...KT, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", width: "100%",
                          padding: "9px 14px", border: "none", borderRadius: "10px", cursor: "pointer", whiteSpace: "nowrap", textAlign: "left",
                          fontSize: "14px", fontWeight: 600, color: selected ? "#5f26e5" : "#111827",
                          background: selected ? "rgba(95,38,229,0.08)" : "transparent" }}>
                        {a.label}
                        {selected && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f26e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {filtered.length === 0 && (
          <p style={{ ...KT, color: "#111827", fontSize: "16px" }}>{lang === "th" ? "ไม่มีบทความในหมวดนี้" : "No articles in this category"}</p>
        )}

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 390px)", justifyContent: "center", gap: "28px" }}>
          {filtered.map((post: any) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", width: "390px", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "24px", textDecoration: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(95,38,229,0.08)" }}>

              <div style={{ position: "relative", padding: "20px 20px 0", flexShrink: 0 }}>
                <Image src={post.image} alt={post.title} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
              </div>

              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(post.topics || []).map((cat: any) => (
                    <span key={cat} style={{ ...KT, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", color: "#5f26e5", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "50px", fontSize: "13px", fontWeight: 600, padding: "4px 14px", display: "inline-block", width: "fit-content" }}>
                      {cat}
                    </span>
                  ))}
                </div>

                <h2 style={{ ...KT, color: "#5f26e5", fontSize: "19px", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                  {post.title}
                </h2>

                <p style={{ ...KT, color: "#111827", fontSize: "16px", lineHeight: 1.7, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.desc}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                  <span className="btn-text-arrow" style={{ ...KT, fontSize: "16px", fontWeight: 700 }}>
                    {lang === "th" ? "อ่านเพิ่มเติม" : "Read More"}
                    <span className="btn-text-arrow-icon">→</span>
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`.blog-aud-opt:hover{ background: rgba(95,38,229,0.06) !important; }`}</style>

      <Footer variant="home" lang={lang} dict={dict} />
    </div>
  );
}
