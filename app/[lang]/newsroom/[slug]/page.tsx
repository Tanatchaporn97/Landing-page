import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BackButton from "../../blog/[slug]/BackButton";
import Navbar from "../../../components/Navbar";
import BlogFooter from "../../blog/BlogFooter";
import ScrollProgressBar from "../../../components/ScrollProgressBar";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";

const NEWS_DESCRIPTIONS: Record<string, Record<string, string>> = {
  "outing-trip-2025": {
    th: "Buddy Review พาทีมไปเอาท์ติ้ง Outing Trip 2025 แบ่งปันเสียงหัวเราะ ความสุข และการทำงานเป็นทีมที่ลงตัว",
    en: "Buddy Review's Outing Trip 2025 — laughs, joys, and perfect teamwork as we connect and recharge together.",
  },
  "ais-infinite-smes-2026": {
    th: "Buddy Review เข้าร่วมโครงการ Transformative Infinite SMEs 2026 โดย AIS Infinite SMEs แลกเปลี่ยนมุมมอง Technology, AI และการ Scale Up ธุรกิจ",
    en: "Buddy Review joined the Transformative Infinite SMEs 2026 program by AIS Infinite SMEs, exchanging perspectives on Technology, AI, and scaling up a business.",
  },
  "cp-all-influencer-trend-ep8": {
    th: "Buddy Review ร่วมเป็น Speaker แชร์ประสบการณ์และอินไซต์ให้ครีเอเตอร์ในงาน CPALL Influencer Trend EP.8",
    en: "Buddy Review joined CP ALL as a speaker, sharing experience and insights with creators at Influencer Trend EP.8.",
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const post = (dict?.blogPosts || []).find((p: any) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | Buddy Review`;
  const description = NEWS_DESCRIPTIONS[slug]?.[lang] ?? post.title;
  const canonical = `https://agency.buddyreview.co/${lang}/newsroom/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        th: `https://agency.buddyreview.co/th/newsroom/${slug}`,
        en: `https://agency.buddyreview.co/en/newsroom/${slug}`,
        "x-default": `https://agency.buddyreview.co/th/newsroom/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      type: "article",
      locale: lang === "th" ? "th_TH" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://agency.buddyreview.co/og-image.jpg"],
    },
  };
}

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const Tag = ({ label, lang }: { label: string; lang: string }) => (
  <span style={{ ...KT, background: "rgba(255,255,255,0.15)", color: "#111827",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
    fontSize: "13px", fontWeight: 600, padding: "4px 14px",
    display: "inline-block", width: "fit-content" }}>
    {label}
  </span>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...KT, color: "#111827", fontSize: "17px", lineHeight: "1.9", margin: "0 0 16px", width: "100%" }}>{children}</p>
);
const Divider = () => <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "32px 0", width: "100%" }} />;

const OUTING_GALLERY = [
  "/blogs/outing-2025-03.jpg",
  "/blogs/outing-2025-04.jpg",
  "/blogs/outing-2025-05.jpg",
  "/blogs/outing-2025-06.jpg",
  "/blogs/outing-2025-07.jpg",
  "/blogs/outing-2025-08.jpg",
  "/blogs/outing-2025-09.jpg",
  "/blogs/outing-2025-10.jpg",
];

function OutingGallery() {
  return (
    <div className="newsroom-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", margin: "8px 0 32px" }}>
      {OUTING_GALLERY.map((src) => (
        <div key={src} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1" }}>
          <Image src={src} alt="Buddy Review Outing Trip 2025" fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

function OutingTripContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>We share laughs, joys, and perfect teamwork.</P>
        <P>It&apos;s not just an outing — it&apos;s the moment we connect, recharge, and come back stronger together.</P>
        <P>Grateful for every smile and every memory we created.</P>
        <Divider />
        <OutingGallery />
      </>
    );
  }
  return (
    <>
      <P>เราแบ่งปันเสียงหัวเราะ ความสุข และการทำงานเป็นทีมที่ลงตัว</P>
      <P>นี่ไม่ใช่แค่ทริปเอาท์ติ้ง แต่คือช่วงเวลาที่เราได้เชื่อมสัมพันธ์ ชาร์จพลัง และกลับมาแข็งแกร่งไปด้วยกัน</P>
      <P>ขอบคุณทุกรอยยิ้มและทุกความทรงจำที่เราสร้างขึ้นด้วยกัน</P>
      <Divider />
      <OutingGallery />
    </>
  );
}

const AIS_GALLERY = [
  "/blogs/ais-infinite-smes-02.jpg",
  "/blogs/ais-infinite-smes-03.jpg",
  "/blogs/ais-infinite-smes-04.jpg",
  "/blogs/ais-infinite-smes-05.jpg",
];

function AISGallery() {
  return (
    <div className="newsroom-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", margin: "8px 0 32px" }}>
      {AIS_GALLERY.map((src) => (
        <div key={src} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1" }}>
          <Image src={src} alt="AIS Infinite SMEs 2026" fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

function AISInfiniteSMEsContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Buddy Review had the opportunity to join the Transformative Infinite SMEs 2026 program — a space bringing together Tech SMEs and professionals from many fields to exchange perspectives on business growth in the digital age.</P>
        <P>Throughout the program, we got fresh perspectives on Technology, AI, and scaling up a business, and got to know and exchange experiences with many partners and entrepreneurs. A big thank you to AIS Infinite SMEs for this great opportunity 💜</P>
        <Divider />
        <AISGallery />
      </>
    );
  }
  return (
    <>
      <P>Buddy Review ได้โอกาสเข้าร่วมโครงการ Transformative Infinite SMEs 2026 อีกหนึ่งพื้นที่ที่รวม Tech SMEs และคนทำงานจากหลากหลายสายมาแลกเปลี่ยนมุมมองเรื่องการเติบโตของธุรกิจในยุคดิจิทัล</P>
      <P>ตลอดโครงการ Buddy Review ได้ทั้งอัปเดตมุมมองด้าน Technology, AI และการ Scale Up ธุรกิจ รวมถึงได้รู้จักและแลกเปลี่ยนประสบการณ์กับพาร์ตเนอร์และผู้ประกอบการอีกหลายท่าน ต้องขอขอบคุณ AIS Infinite SMEs สำหรับโอกาสดีๆ ในครั้งนี้ครับ💜</P>
      <Divider />
      <AISGallery />
    </>
  );
}

const CP_GALLERY = [
  "/blogs/cp-influencer-trend-02.jpg",
  "/blogs/cp-influencer-trend-03.jpg",
  "/blogs/cp-influencer-trend-04.jpg",
  "/blogs/cp-influencer-trend-05.jpg",
  "/blogs/cp-influencer-trend-06.jpg",
  "/blogs/cp-influencer-trend-07.jpg",
  "/blogs/cp-influencer-trend-08.jpg",
];

function Gallery() {
  return (
    <div className="newsroom-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", margin: "8px 0 32px" }}>
      {CP_GALLERY.map((src) => (
        <div key={src} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1" }}>
          <Image src={src} alt="CPALL Influencer Trend EP.8" fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

function CPAllEventContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Buddy Review would like to thank CP ALL for inviting us to join as a Speaker, sharing our experience and insights with fellow creators at #CPALLInfluencerTrendEP8.</P>
        <P>We&apos;d also like to thank every creator who stopped by our booth to say hi and exchange ideas with us. We hope everyone walked away with great tips and inspiration to bring back into their own content.</P>
        <Divider />
        <Gallery />
      </>
    );
  }
  return (
    <>
      <P>Buddy Review ขอขอบคุณทาง CP ALL ที่ชวนพวกเรามาร่วมเป็น Speaker แชร์ประสบการณ์และอินไซต์ให้กับเพื่อนๆ ครีเอเตอร์ในงาน #CPALLInfluencerTrendEP8</P>
      <P>รวมถึงขอบคุณครีเอเตอร์ทุกคนที่แวะมาทักทาย แลกเปลี่ยนไอเดียกันที่บูธของเรา หวังว่าทุกคนจะได้ทริคและแรงบันดาลใจดีๆ กลับไปต่อยอดการทำคอนเทนต์กันนะครับ</P>
      <Divider />
      <Gallery />
    </>
  );
}

const SLUGS = ["outing-trip-2025", "ais-infinite-smes-2026", "cp-all-influencer-trend-ep8"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function NewsroomPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = (dict?.blogPosts || []).filter((p: any) => SLUGS.includes(p.slug));
  const idx = posts.findIndex((p: any) => p.slug === slug);
  if (idx === -1) notFound();
  const post = posts[idx];
  const nextPost = posts[idx + 1] ?? null;

  return (
    <div className="background" style={{ ...KT }}>
      <ScrollProgressBar />
      <Navbar lang={lang as Locale} variant="home" />

      {/* Top-left CTA */}
      <div className="blog-back-row" style={{ padding: "140px 48px 28px" }}>
        <Link href={`/${lang}/newsroom`} style={{
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
          Newsroom
        </Link>
      </div>

      {/* Article */}
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section label */}
        <div style={{ paddingTop: "0", marginBottom: "28px" }}>
          <span style={{ ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>
            Newsroom
          </span>
        </div>

        {/* Cover image */}
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", marginBottom: "40px" }}>
          <Image src={post.image} alt={post.title} width={800} height={420} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
        </div>

        {/* Content card */}
        <div style={{
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "24px", padding: "48px",
          wordBreak: "break-word", overflowWrap: "break-word",
          boxSizing: "border-box", width: "100%",
        }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {post.categories.map((cat: string) => <Tag key={cat} label={cat} lang={lang} />)}
          </div>
          <h1 style={{ ...KT, color: "#5f26e5", fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, lineHeight: "1.4", margin: "0 0 24px", textAlign: "left" }}>
            {post.title}
          </h1>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", marginBottom: "32px" }} />

          {post.slug === "outing-trip-2025" ? (
            <OutingTripContent lang={lang as Locale} />
          ) : post.slug === "ais-infinite-smes-2026" ? (
            <AISInfiniteSMEsContent lang={lang as Locale} />
          ) : post.slug === "cp-all-influencer-trend-ep8" ? (
            <CPAllEventContent lang={lang as Locale} />
          ) : (
            <div style={{ marginTop: "40px", padding: "20px 24px", borderRadius: "12px", background: "rgba(95,38,229,0.2)", border: "1px solid rgba(95,38,229,0.4)" }}>
              <p style={{ ...KT, color: "#111827", fontSize: "15px", margin: 0 }}>
                {lang === "th" ? "🚧 เนื้อหาฉบับเต็มกำลังจะมาเร็วๆ นี้" : "🚧 Full content coming soon"}
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Bottom nav — back + next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", padding: "48px 24px 80px" }}>
        <BackButton lang={lang as Locale} />
        {nextPost && (
          <Link href={`/${lang}/newsroom/${nextPost.slug}`} style={{
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

      <BlogFooter lang={lang as Locale} />

      <style>{`
        @media (max-width: 767px){
          .newsroom-gallery{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
