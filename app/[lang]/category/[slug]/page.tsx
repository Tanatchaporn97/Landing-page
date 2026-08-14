import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getDictionary } from "../../../../get-dictionary";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const STORIES_TH = [
  { slug: "nissin",         catSlug: "food-beverage", brand: "Nissin",           image: "/success-stories-2/Success stories-08.jpg", desc: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",              industry: "Food & Beverage" },
  { slug: "ldc-dental",     catSlug: "dental-care",   brand: "LDC Dental",       image: "/success-stories-2/Success stories-09.jpg", desc: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental",  industry: "Dental Care" },
  { slug: "watsons",        catSlug: "health-beauty", brand: "Watsons",          image: "/success-stories-2/Success stories-10.jpg", desc: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",                   industry: "Health & Beauty" },
  { slug: "viu",            catSlug: "entertainment", brand: "Viu",              image: "/success-stories-2/Success stories-11.jpg", desc: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",             industry: "Entertainment" },
  { slug: "ahc",            catSlug: "skincare",      brand: "AHC",              image: "/success-stories-2/Success stories-12.jpg", desc: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",        industry: "Skincare" },
  { slug: "guss-damn-good", catSlug: "food-beverage", brand: "Guss Damn Good",   image: "/success-stories-2/Success stories-13.jpg", desc: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",     industry: "Food & Beverage" },
];

const STORIES_EN = [
  { slug: "nissin",         catSlug: "food-beverage", brand: "Nissin",           image: "/success-stories-2/Success stories-08.jpg", desc: "Sparking social media food cravings with a bold new flavor: spicy Tom Yum Kung cheese.", industry: "Food & Beverage" },
  { slug: "ldc-dental",     catSlug: "dental-care",   brand: "LDC Dental",       image: "/success-stories-2/Success stories-09.jpg", desc: "Clear-aligner reviews from influencers, leading into an exclusive event with LDC Dental.", industry: "Dental Care" },
  { slug: "watsons",        catSlug: "health-beauty", brand: "Watsons",          image: "/success-stories-2/Success stories-10.jpg", desc: "House-brand products taking off with influencer power on TikTok & Lemon8.", industry: "Health & Beauty" },
  { slug: "viu",            catSlug: "entertainment", brand: "Viu",              image: "/success-stories-2/Success stories-11.jpg", desc: "Local-powered influencers bringing the \"Isan Chom Wiew\" campaign to life.", industry: "Entertainment" },
  { slug: "ahc",            catSlug: "skincare",      brand: "AHC",              image: "/success-stories-2/Success stories-12.jpg", desc: "Igniting brand buzz with an event inspired by the viral series \"AHC Skin Game.\"", industry: "Skincare" },
  { slug: "guss-damn-good", catSlug: "food-beverage", brand: "Guss Damn Good",   image: "/success-stories-2/Success stories-13.jpg", desc: "A flavor with a story: when ice cream meets antacid powder.", industry: "Food & Beverage" },
];

const CHIPS_TH = [
  { label: "ทั้งหมด",            href: "/success",                  slug: "" },
  { label: "Food & Beverage",    href: "/category/food-beverage",   slug: "food-beverage" },
  { label: "Health & Beauty",    href: "/category/health-beauty",   slug: "health-beauty" },
  { label: "Dental Care",        href: "/category/dental-care",     slug: "dental-care" },
  { label: "Entertainment",      href: "/category/entertainment",   slug: "entertainment" },
  { label: "Skincare",           href: "/category/skincare",        slug: "skincare" },
];

const CHIPS_EN = [
  { label: "All",                href: "/success",                  slug: "" },
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

import { type Locale } from "../../../../i18n-config";

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();
  const dict = await getDictionary(lang as Locale);

  const STORIES = lang === "th" ? STORIES_TH : STORIES_EN;
  const CHIPS = lang === "th" ? CHIPS_TH : CHIPS_EN;
  const filtered = STORIES.filter((s) => s.catSlug === slug);

  return (
    <div className="background" style={{ ...KT }}>
      <Navbar lang={lang as Locale} />

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
              <Link key={chip.slug} href={`/${lang}${chip.href}`} style={{
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
          {filtered.map((story) => (
            <Link key={story.slug} href={`/${lang}/success/${story.slug}`} className="cs-card-link" style={{ textDecoration: "none", display: "block", width: "100%", flexShrink: "unset" as React.CSSProperties["flexShrink"] }}>
              <div className="cs-card" style={{
                height: "520px",
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                boxSizing: "border-box" as React.CSSProperties["boxSizing"],
              }}>
                <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image src={story.image} alt={story.brand} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                </div>
                <div className="cs-card-overlay" />
                {/* Arrow — top right */}
                <div style={{ position: "absolute", top: "28px", right: "28px", zIndex: 2 }}>
                  <div className="cs-arrow-btn" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                {/* Category pill — top left */}
                <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                  <span className="cs-cat-btn" style={{ ...KT, fontSize: "13px", fontWeight: 600, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", display: "inline-block" }}>
                    {story.industry}
                  </span>
                </div>
                {/* Bottom info */}
                <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                  <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{story.brand}</h3>
                  <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>{story.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <Footer lang={lang as Locale} dict={dict} />
    </div>
  );
}
