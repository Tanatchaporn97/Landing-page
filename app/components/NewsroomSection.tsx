"use client";
import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Post = { slug: string; title: string; desc: string; image: string; categories: string[] };

function readingTime(desc: string) {
  const words = desc.trim().split(/\s+/).length;
  return Math.max(3, Math.round(words / 150));
}

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      ...KT, display: "inline-block", background: "rgba(95,38,229,0.08)", color: "#5f26e5",
      border: "1px solid rgba(95,38,229,0.18)", borderRadius: "50px",
      fontSize: "13px", fontWeight: 600, padding: "5px 16px",
    }}>
      {children}
    </span>
  );
}

export default function NewsroomSection({ lang = "th", dict, variant = "home" }: { lang?: "th" | "en"; dict?: any; variant?: "home" | "brand" | "influencer" }) {
  const t = lang === "th"
    ? { viewMore: "ดูเพิ่มเติม", minRead: "นาทีในการอ่าน", by: "โดย Buddy Review" }
    : { viewMore: "View More", minRead: "min read", by: "by Buddy Review" };

  const catAll = lang === "th" ? "ข่าวสาร" : "News";
  const catBrand = lang === "th" ? "สำหรับแบรนด์" : "For Brands";
  const catInf = lang === "th" ? "สำหรับอินฟลูเอนเซอร์" : "For Influencers";

  const activeCat = variant === "brand" ? catBrand : variant === "influencer" ? catInf : catAll;
  const basePath = variant === "brand" || variant === "influencer" ? "blog" : "newsroom";

  const allPosts: Post[] = dict?.blogPosts || [];
  if (allPosts.length === 0) return null;
  const posts = (activeCat === catAll ? allPosts : allPosts.filter((p) => p.categories.includes(activeCat))).slice(0, 4);
  const [featured, ...rest] = posts;

  return (
    <section className="py-20 px-6">
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
        {/* Heading row */}
        <div className="newsroom-header-row" style={{ marginBottom: "56px" }}>
          <h2 style={{
            ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
            margin: 0, lineHeight: 1.15,
            background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {variant === "brand" ? "Blog" : "Newsroom"}
          </h2>
        </div>

        {!featured && (
          <p style={{ ...KT, color: "#111827", fontSize: "16px" }}>
            {lang === "th" ? "ไม่มีบทความในหมวดนี้" : "No articles in this category"}
          </p>
        )}

        {featured && (
        <>
        {/* Featured post */}
        <Link href={`/${lang}/${basePath}/${featured.slug}`} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0",
          background: "#ffffff", borderRadius: "28px", overflow: "hidden",
          boxShadow: "0 12px 40px rgba(95,38,229,0.10)", textDecoration: "none",
          marginBottom: "28px",
        }} className="newsroom-featured">
          <div style={{ position: "relative", minHeight: "360px" }}>
            <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ padding: "48px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <CategoryPill>{featured.categories[0]}</CategoryPill>
            </div>
            <h3 style={{ ...KT, fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 700, lineHeight: 1.35, color: "#111827", margin: 0 }}>
              {featured.title}
            </h3>
            <p style={{
              ...KT, fontSize: "16px", lineHeight: 1.75, color: "#6b7280", margin: 0,
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {featured.desc}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "16px" }}>
              <span style={{ ...KT, fontSize: "14px", color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5f26e5", display: "inline-block" }} />
                {readingTime(featured.desc)} {t.minRead}
              </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: "15px", color: "#111827" }}>
                {t.by}
              </span>
            </div>
          </div>
        </Link>

        {/* Grid of remaining posts */}
        <div className="newsroom-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {rest.map((post) => (
            <Link key={post.slug} href={`/${lang}/${basePath}/${post.slug}`} style={{
              background: "#ffffff", borderRadius: "20px", overflow: "hidden",
              boxShadow: "0 8px 28px rgba(95,38,229,0.08)", textDecoration: "none",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ position: "relative", height: "200px" }}>
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                  <span style={{
                    ...KT, background: "rgba(255,255,255,0.92)", color: "#111827",
                    borderRadius: "50px", fontSize: "12px", fontWeight: 600, padding: "4px 12px",
                  }}>
                    {post.categories[0]}
                  </span>
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3 style={{ ...KT, fontSize: "18px", fontWeight: 700, lineHeight: 1.4, color: "#111827", margin: 0 }}>
                  {post.title}
                </h3>
                <p style={{
                  ...KT, fontSize: "14px", lineHeight: 1.7, color: "#6b7280", margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
        </>
        )}

        {/* View more CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <Link href={`/${lang}/${basePath}`} className="btn-insight" style={{
            ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600,
            padding: "14px 48px", textDecoration: "none", display: "inline-block",
          }}>
            {t.viewMore}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px){
          .newsroom-featured{ grid-template-columns: 1fr !important; }
          .newsroom-grid{ grid-template-columns: 1fr !important; }
          .newsroom-header-row{ justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
