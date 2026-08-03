import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const STORIES = [
  {
    slug: "nissin",
    catSlug: "food-beverage",
    brand: "Nissin",
    image: "/success-nissin.webp",
    desc: `Nissin ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ "ต้มยำกุ้งแซ่บซีส"`,
    industry: "Food & Beverage",
  },
  {
    slug: "watsons",
    catSlug: "health-beauty",
    brand: "Watsons",
    image: "/success-watsons.webp",
    desc: `House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8`,
    industry: "Health & Beauty",
  },
  {
    slug: "ldc-dental",
    catSlug: "dental-care",
    brand: "LDC Dental",
    image: "/success-ldc.webp",
    desc: `รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental`,
    industry: "Dental Care",
  },
  {
    slug: "viu",
    catSlug: "entertainment",
    brand: "Viu",
    image: "/success-viu.webp",
    desc: `อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันให้แคมเปญ "อีสานชมวิว"`,
    industry: "Entertainment",
  },
  {
    slug: "guss-damn-good",
    catSlug: "food-beverage",
    brand: "Guss Damn Good x ENO",
    image: "/success-stories/Success stories-03.webp",
    desc: `รสชาติที่มีเรื่องเล่า! เมื่อไอศครีมเจอกับผงฟู้คลาย กรดลดแน่นเฟ้อ`,
    industry: "Food & Beverage",
  },
  {
    slug: "ahc",
    catSlug: "skincare",
    brand: "AHC 'The Skin Game'",
    image: "/success-stories/Success stories-01.webp",
    desc: `ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game THE T-SHOT'`,
    industry: "Skincare",
  },
];

const CHIPS = [
  { label: "ทั้งหมด",            href: "/success",                  slug: "" },
  { label: "Food & Beverage",    href: "/category/food-beverage",   slug: "food-beverage" },
  { label: "Health & Beauty",    href: "/category/health-beauty",   slug: "health-beauty" },
  { label: "Dental Care",        href: "/category/dental-care",     slug: "dental-care" },
  { label: "Entertainment",      href: "/category/entertainment",   slug: "entertainment" },
  { label: "Skincare",           href: "/category/skincare",        slug: "skincare" },
];

const VALID_SLUGS = ["food-beverage", "health-beauty", "dental-care", "entertainment", "skincare"];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();

  const filtered = STORIES.filter((s) => s.catSlug === slug);

  return (
    <div style={{
      ...KT,
      minHeight: "100vh",
      backgroundImage: "url('/landing-bg6.jpg')",
      backgroundSize: "100% 100%",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
    }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "160px 24px 80px" }}>

        {/* Title */}
        <h1 style={{
          ...KT,
          background: PINK_GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "clamp(32px,4vw,56px)",
          fontWeight: 800,
          margin: "0 0 24px",
          lineHeight: 1.2,
        }}>
          Success Stories
        </h1>

        {/* Category chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as React.CSSProperties["flexWrap"], marginBottom: "48px" }}>
          {CHIPS.map((chip) => {
            const active = chip.slug === slug;
            return (
              <Link key={chip.slug} href={chip.href} style={{
                ...KT,
                background: active ? "#5f26e5" : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: active ? "#ffffff" : "#5f26e5",
                border: active ? "1px solid #5f26e5" : "1px solid rgba(255,255,255,0.35)",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 600,
                padding: "7px 20px",
                textDecoration: "none",
                display: "inline-block",
              }}>
                {chip.label}
              </Link>
            );
          })}
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {filtered.map((story) => (
            <Link key={story.slug} href={`/success/${story.slug}`} style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "24px",
              textDecoration: "none",
              cursor: "pointer",
            }}>
              <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
                <img src={story.image} alt={story.brand} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
              </div>
              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <span style={{ ...KT, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px", fontSize: "13px", fontWeight: 600, padding: "4px 14px", display: "inline-block", width: "fit-content", color: "#111827" }}>
                  {story.industry}
                </span>
                <h2 style={{ ...KT, color: "#5f26e5", fontSize: "19px", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                  {story.brand}
                </h2>
                <p style={{ ...KT, color: "#111827", fontSize: "14px", lineHeight: 1.7, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>
                  {story.desc}
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

      <Footer />
    </div>
  );
}
