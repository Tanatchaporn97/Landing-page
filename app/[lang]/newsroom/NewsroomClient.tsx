"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

import { type Locale } from "../../../i18n-config";

export default function NewsroomClient({ lang, dict }: { lang: Locale, dict: any }) {
  const router = useRouter();
  const catNews = lang === "th" ? "ข่าวสาร" : "News";

  const allPosts = dict?.blogPosts || [];
  const posts = allPosts.filter((p: any) => p.categories.includes(catNews));

  return (
    <div className="background" style={{ ...KT }}>

      <Navbar lang={lang} variant="home" />

      {/* Back button */}
      <div className="blog-back-row" style={{ padding: "140px 48px 28px" }}>
        <button
          onClick={() => router.back()}
          style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50px", padding: "10px 22px", color: "#5f26e5", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {lang === "th" ? "ย้อนกลับ" : "Back"}
        </button>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>

        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ ...KT, background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(32px,4.2vw,56px)", fontWeight: 800, margin: 0, lineHeight: 1.15 }}>
            Newsroom
          </h1>
        </div>

        {posts.length === 0 && (
          <p style={{ ...KT, color: "#111827", fontSize: "16px" }}>{lang === "th" ? "ไม่มีข่าวสารในขณะนี้" : "No news right now"}</p>
        )}

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/${lang}/newsroom/${post.slug}`} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "24px", textDecoration: "none", cursor: "pointer" }}>

              <div style={{ position: "relative", padding: "20px 20px 0", flexShrink: 0 }}>
                <Image src={post.image} alt={post.title} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
              </div>

              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {post.categories.map((cat: any) => (
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
                    {lang === "th" ? "อ่านเพิ่มเติม" : "Read More"}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

      <Footer variant="home" lang={lang} dict={dict} />
    </div>
  );
}
