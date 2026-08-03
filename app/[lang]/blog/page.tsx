"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogNavbar from "./BlogNavbar";
import BlogFooter from "./BlogFooter";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const BLOG_POSTS = [
  {
    slug: "best-time-to-post-2025",
    title: "รวมวันและเวลาที่ดีที่สุดในการโพสต์บนโซเชียลมีเดีย ปี 2025",
    desc: "เคยสงสัยไหมว่า… \"ทำไมบางโพสต์แทบไม่มีคนเห็น แต่บางโพสต์กลับไวรัลขึ้นมาได้?\" ความลับไม่ได้อยู่ที่คอนเทนต์อย่างเดียว แต่ \"เวลา\" ก็เป็นอีกปัจจัยสำคัญที่กำหนดว่าคอนเทนต์ของคุณจะไปโผล่บนฟีดใครบ้าง",
    image: "/blogs/blog-best-time.png",
    categories: ["สำหรับอินฟลูเอนเซอร์"],
  },
  {
    slug: "tiktok-algorithm-9-techniques",
    title: "ถอดรหัสอัลกอริทึม TikTok + 9 เทคนิคทำคลิปให้ดังแบบมืออาชีพ",
    desc: "หลายคนที่เล่น TikTok อาจสงสัยว่า \"ทำไมบางคลิปแทบไม่มีคนดู แต่บางคลิปกลับไวรัล?\" จริงๆ แล้วนี่ไม่ใช่เรื่องของโชค แต่คือการทำงานของอัลกอริทึม",
    image: "/blogs/blog-2.png",
    categories: ["สำหรับแบรนด์", "สำหรับอินฟลูเอนเซอร์"],
  },
  {
    slug: "influencer-mapping-canvas",
    title: "วิธีเลือกอินฟลูเอนเซอร์ที่ใช่สำหรับแบรนด์ ด้วย Influencer Mapping Canvas",
    desc: "ยุคนี้อินฟลูเอนเซอร์ไม่ได้เป็นเพียงแค่ \"คนดังบนโลกออนไลน์\" แต่คือผู้ทรงอิทธิพลที่สามารถเปลี่ยนการตัดสินใจซื้อของผู้บริโภคได้จริง",
    image: "/blogs/blog-influencer-mapping.png",
    categories: ["สำหรับแบรนด์"],
  },
];

const CATS = ["ทั้งหมด", "สำหรับแบรนด์", "สำหรับอินฟลูเอนเซอร์"];

import { type Locale } from "../../../i18n-config";

function BlogPageContent({ lang }: { lang: Locale }) {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState(() => {
    const cat = searchParams.get("cat");
    return cat && CATS.includes(cat) ? cat : "ทั้งหมด";
  });
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATS.includes(cat)) setActiveCat(cat);
  }, [searchParams]);

  const filtered = activeCat === "ทั้งหมด"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.categories.includes(activeCat));

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/landing-bg6.jpg')", backgroundSize: "100% 100%", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}>

      <BlogNavbar lang={lang} />

      {/* Back button */}
      <div className="blog-back-row" style={{ padding: "140px 48px 28px" }}>
        <Link href={`/${lang}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50px", padding: "10px 22px", color: "#5f26e5", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Header */}
        <h1 style={{ ...KT, background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.2 }}>
          Industry Insights
        </h1>

        {/* Category chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}>
          {CATS.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{ ...KT,
              background: activeCat === cat ? "#5f26e5" : "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              color: activeCat === cat ? "#ffffff" : "#5f26e5",
              border: activeCat === cat ? "1px solid #5f26e5" : "1px solid rgba(255,255,255,0.35)",
              borderRadius: "50px", fontSize: "14px", fontWeight: 600,
              padding: "7px 20px", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ ...KT, color: "#111827", fontSize: "16px" }}>ไม่มีบทความในหมวดนี้</p>
        )}

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {filtered.map((post) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "24px", textDecoration: "none", cursor: "pointer" }}>

              <div style={{ position: "relative", padding: "20px 20px 0", flexShrink: 0 }}>
                <Image src={post.image} alt={post.title} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
              </div>

              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {post.categories.map((cat) => (
                    <span key={cat} style={{ ...KT, background: "rgba(255,255,255,0.15)", color: "#111827", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px", fontSize: "13px", fontWeight: 600, padding: "4px 14px", display: "inline-block", width: "fit-content" }}>
                      {cat}
                    </span>
                  ))}
                </div>

                <h2 style={{ ...KT, color: "#5f26e5", fontSize: "19px", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                  {post.title}
                </h2>

                <p style={{ ...KT, color: "#111827", fontSize: "14px", lineHeight: 1.7, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.desc}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ ...KT, background: "#5f26e5", color: "#ffffff", borderRadius: "50px", fontSize: "14px", fontWeight: 600, padding: "8px 24px", display: "inline-block" }}>
                    อ่านเพิ่มเติม
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

      <BlogFooter lang={lang} />
    </div>
  );
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <BlogPageContent lang={lang as Locale} />
    </Suspense>
  );
}
