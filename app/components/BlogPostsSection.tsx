"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const CATEGORY_LABEL: Record<"influencer" | "brand", Record<"th" | "en", string>> = {
  influencer: { th: "สำหรับอินฟลูเอนเซอร์", en: "For Influencers" },
  brand: { th: "สำหรับแบรนด์", en: "For Brands" },
};

export default function BlogPostsSection({ lang = "th", dict, filterCategory, variant = "home" }: { lang?: "th" | "en"; dict?: any; filterCategory?: "influencer" | "brand"; variant?: "home" | "influencer" }) {
  const router = useRouter();
  const t = lang === "th" ? { readMore: "อ่านเพิ่มเติม", viewMore: "ดูเพิ่มเติม" } : { readMore: "Read More", viewMore: "View More" };

  const allPosts: Array<{ slug: string; title: string; desc: string; image: string; categories: string[] }> = dict?.blogPosts || [];
  const categoryLabel = filterCategory ? CATEGORY_LABEL[filterCategory][lang] : null;
  const posts = categoryLabel
    ? allPosts.filter((p) => p.categories.includes(categoryLabel))
    : allPosts.slice(0, 3);
  const viewMoreHref = categoryLabel ? `/${lang}/blog?cat=${encodeURIComponent(categoryLabel)}` : `/${lang}/blog`;

  return (
    <section className="py-20 px-6 blog-bg">
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
        <h2 className="section-title text-center font-bold mb-14 section-h2-fixed"
          style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on" }}>
          Industry{" "}
          <span style={{
            background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Insights</span>
        </h2>

        <div className="grid-3-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
          {posts.map((post) => (
            <a key={post.slug} href={`/${lang}/blog/${post.slug}`} style={variant === "influencer" ? {
              background: "#ffffff",
              boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              textDecoration: "none",
            } : {
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              textDecoration: "none",
            }}>
              {/* Banner */}
              <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover", display: "block", borderRadius: "12px" }} />
                </div>
              </div>

              {/* Content */}
              <div className="blog-card-content" style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                {/* Category tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {post.categories.map((cat) => (
                    <button key={cat}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/${lang}/blog?cat=${encodeURIComponent(cat)}`); }}
                      style={variant === "influencer" ? {
                        ...KT, background: "rgba(95,38,229,0.08)", color: "#5f26e5",
                        border: "1px solid rgba(95,38,229,0.18)", borderRadius: "50px",
                        fontSize: "13px", fontWeight: 600, padding: "4px 14px",
                        display: "inline-block", cursor: "pointer",
                      } : {
                        ...KT, background: "rgba(255,255,255,0.15)", color: "#111827",
                        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
                        fontSize: "13px", fontWeight: 600, padding: "4px 14px",
                        display: "inline-block", cursor: "pointer",
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
                {/* Title */}
                <h3 className="card-h3" style={{ color: "#5f26e5", fontSize: "24px", fontWeight: 700, lineHeight: "1.45", margin: 0 }}>
                  {post.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: "#111827", fontSize: "16px", lineHeight: "1.7", margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.desc}
                </p>

                {/* CTA */}
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "auto", paddingTop: "4px" }}>
                  <span className="btn-insight" style={{
                    ...KT,
                    borderRadius: "50px",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "8px 24px",
                    display: "inline-block",
                  }}>
                    {t.readMore}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ดูเพิ่มเติม CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <Link href={viewMoreHref} className="btn-insight" style={{
            ...KT,
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: 600,
            padding: "14px 48px",
            textDecoration: "none",
            display: "inline-block",
          }}>
            {t.viewMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
