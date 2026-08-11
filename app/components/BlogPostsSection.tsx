import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const BLOG_POSTS = [
  {
    slug: "best-time-to-post-2025",
    title: "รวมวันและเวลาที่ดีที่สุดในการโพสต์บนโซเชียลมีเดีย ปี 2025",
    titleEn: "The Best Days and Times to Post on Social Media in 2025",
    desc: "เคยสงสัยไหมว่า… \"ทำไมบางโพสต์แทบไม่มีคนเห็น แต่บางโพสต์กลับไวรัลขึ้นมาได้?\" ความลับไม่ได้อยู่ที่คอนเทนต์อย่างเดียว แต่ \"เวลา\" ก็เป็นอีกปัจจัยสำคัญที่กำหนดว่าคอนเทนต์ของคุณจะไปโผล่บนฟีดใครบ้าง",
    descEn: "Ever wondered... \"why do some posts barely get seen while others go viral?\" The secret isn't just the content — \"timing\" is another key factor that determines whose feed your content lands on.",
    image: "/blogs/blog-best-time.png",
    categories: ["สำหรับอินฟลูเอนเซอร์"],
    categoriesEn: ["For Influencers"],
  },
  {
    slug: "tiktok-algorithm-9-techniques",
    title: "ถอดรหัสอัลกอริทึม TikTok + 9 เทคนิคทำคลิปให้ดังแบบมืออาชีพ",
    titleEn: "Decoding the TikTok Algorithm + 9 Techniques for Making Clips Go Big Like a Pro",
    desc: "หลายคนที่เล่น TikTok อาจสงสัยว่า \"ทำไมบางคลิปแทบไม่มีคนดู แต่บางคลิปกลับไวรัล?\"",
    descEn: "Many TikTok users wonder... \"why do some clips barely get views while others go viral?\"",
    image: "/blogs/blog-2.png",
    categories: ["สำหรับแบรนด์", "สำหรับอินฟลูเอนเซอร์"],
    categoriesEn: ["For Brands", "For Influencers"],
  },
  {
    slug: "influencer-mapping-canvas",
    title: "วิธีเลือกอินฟลูเอนเซอร์ที่ใช่สำหรับแบรนด์ ด้วย Influencer Mapping Canvas",
    titleEn: "How to Pick the Right Influencer for Your Brand With an Influencer Mapping Canvas",
    desc: "ยุคนี้อินฟลูเอนเซอร์ไม่ได้เป็นเพียงแค่ \"คนดังบนโลกออนไลน์\" แต่คือผู้ทรงอิทธิพล",
    descEn: "Today, influencers aren't just \"online celebrities\" — they're people who genuinely shape opinion.",
    image: "/blogs/blog-influencer-mapping.png",
    categories: ["สำหรับแบรนด์"],
    categoriesEn: ["For Brands"],
  },
];

export default function BlogPostsSection({ lang = "th" }: { lang?: "th" | "en" }) {
  const t = lang === "th" ? { readMore: "อ่านเพิ่มเติม", viewMore: "ดูเพิ่มเติม" } : { readMore: "Read More", viewMore: "View More" };

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
          {BLOG_POSTS.map((post) => (
            <a key={post.title} href={`/${lang}/blog/${post.slug}`} style={{
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "none",
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
                  <Image src={post.image} alt={lang === "th" ? post.title : post.titleEn} fill sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover", display: "block", borderRadius: "12px" }} />
                </div>
              </div>

              {/* Content */}
              <div className="blog-card-content" style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                {/* Category tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(lang === "th" ? post.categories : post.categoriesEn).map((cat) => (
                    <span key={cat} style={{ ...KT, background: "rgba(255,255,255,0.15)", color: "#111827",
                      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
                      fontSize: "13px", fontWeight: 600, padding: "4px 14px",
                      display: "inline-block" }}>
                      {cat}
                    </span>
                  ))}
                </div>
                {/* Title */}
                <h3 className="card-h3" style={{ color: "#5f26e5", fontSize: "24px", fontWeight: 700, lineHeight: "1.45", margin: 0 }}>
                  {lang === "th" ? post.title : post.titleEn}
                </h3>

                {/* Description */}
                <p style={{
                  color: "#111827", fontSize: "16px", lineHeight: "1.7", margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {lang === "th" ? post.desc : post.descEn}
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
          <Link href={`/${lang}/blog`} className="btn-insight" style={{
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
