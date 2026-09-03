"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function SuccessStoriesSlider({ lang = "th" }: { lang?: "th" | "en" }) {
  const csRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const catSlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

  const subheading = lang === "th" ? "ผลลัพธ์จริงจากแคมเปญอินฟลูเอนเซอร์ที่เราภูมิใจ" : "Real results from influencer campaigns we're proud of";
  const viewMore = lang === "th" ? "ดูเพิ่มเติม" : "View More";

  const stories = lang === "th" ? [
    { href: `/${lang}/success/nissin`,         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          stats: [{ val: "13",    label: "Posts" }, { val: "1.86M", label: "Reach" }, { val: "45K",  label: "Engagement" }] },
    { href: `/${lang}/success/ldc-dental`,     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", stats: [{ val: "43K",   label: "Reach" },  { val: "4.2K",  label: "Engagement" }, { val: "9.8%", label: "Eng. Rate" }] },
    { href: `/${lang}/success/watsons`,        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               stats: [{ val: "220",   label: "Posts" }, { val: "1.2M",  label: "Reach" }, { val: "12K",  label: "Engagement" }] },
    { href: `/${lang}/success/viu`,            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          stats: [{ val: "239K",  label: "Reach" },  { val: "4.3K",  label: "Engagement" }, { val: "956K", label: "Followers" }] },
    { href: `/${lang}/success/ahc`,            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   stats: [{ val: "14M",   label: "Views" }, { val: "9.2M",  label: "Reach" }, { val: "190K", label: "Engagement" }] },
    { href: `/${lang}/success/guss-damn-good`, img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   stats: [{ val: "5.9M",  label: "Views" }, { val: "4.4M",  label: "Reach" }, { val: "120K", label: "Engagement" }] },
  ] : [
    { href: `/${lang}/success/nissin`,         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "Sparking social media buzz with a bold new flavor — spicy Tom Yum Goong cheese",          stats: [{ val: "13",    label: "Posts" }, { val: "1.86M", label: "Reach" }, { val: "45K",  label: "Engagement" }] },
    { href: `/${lang}/success/ldc-dental`,     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "From influencer clear-braces reviews to an exclusive event by LDC Dental", stats: [{ val: "43K",   label: "Reach" },  { val: "4.2K",  label: "Engagement" }, { val: "9.8%", label: "Eng. Rate" }] },
    { href: `/${lang}/success/watsons`,        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House brand goes viral with influencer power on TikTok & Lemon8",               stats: [{ val: "220",   label: "Posts" }, { val: "1.2M",  label: "Reach" }, { val: "12K",  label: "Engagement" }] },
    { href: `/${lang}/success/viu`,            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "Local influencer power brings the \"Isan Charm View\" campaign to life",          stats: [{ val: "239K",  label: "Reach" },  { val: "4.3K",  label: "Engagement" }, { val: "956K", label: "Followers" }] },
    { href: `/${lang}/success/ahc`,            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "Sparking brand buzz with an event inspired by the viral series \"AHC Skin Game\"",   stats: [{ val: "14M",   label: "Views" }, { val: "9.2M",  label: "Reach" }, { val: "190K", label: "Engagement" }] },
    { href: `/${lang}/success/guss-damn-good`, img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "A flavor with a story — when ice cream meets antacid powder",   stats: [{ val: "5.9M",  label: "Views" }, { val: "4.4M",  label: "Reach" }, { val: "120K", label: "Engagement" }] },
  ];

  return (
    <section className="inf-section" style={{ background: "linear-gradient(180deg, #F1EBFA 0%, #EDE5F9 100%)", padding: "100px 64px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header row */}
        <div className="cs-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>
          <div>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: "0 0 10px", lineHeight: 1.2 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Success </span><span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Stories</span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", color: "#374151", margin: 0 }}>{subheading}</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="arrow-cta-btn" onClick={() => csRef.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="arrow-cta-btn" onClick={() => csRef.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Cards scroll row */}
        <div ref={csRef} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: "8px" }}>

          {/* ── Cards ── */}
          {stories.map(card => (
            <Link key={card.href} href={card.href} className="cs-card-link" style={{ textDecoration: "none", flexShrink: 0, width: "390px", scrollSnapAlign: "start" }}>
              <div className="cs-card" style={{ borderRadius: "28px", background: "#ffffff", height: "520px" }}>
                <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image src={card.img} alt={card.title} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                </div>
                <div className="cs-card-overlay" />
                {/* Arrow button — top right */}
                <div style={{ position: "absolute", top: "28px", right: "28px", zIndex: 2 }}>
                  <div className="cs-arrow-btn" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                {/* Category pill */}
                <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/${lang}/category/${catSlug(card.cat)}`); }}
                    className="cs-cat-btn" style={{ ...KT, fontSize: "13px", fontWeight: 600, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
                  >
                    {card.cat.charAt(0) + card.cat.slice(1).toLowerCase()}
                  </button>
                </div>
                {/* Bottom info */}
                <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                  <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{card.title}</h3>
                  <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>{card.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
          {/* dummy spacer so last card doesn't stick to edge */}
          <div style={{ flexShrink: 0, width: "1px" }} />
        </div>

        {/* ดูเพิ่มเติม CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <Link href={`/${lang}/success`} className="btn-insight" style={{
            ...KT,
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: 600,
            padding: "14px 48px",
            textDecoration: "none",
            display: "inline-block",
          }}>
            {viewMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
