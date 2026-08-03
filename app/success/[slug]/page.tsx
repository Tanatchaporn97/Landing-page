import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BackButton from "./BackButton";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const SUCCESS_STORIES = [
  {
    slug: "nissin",
    brand: "Nissin",
    logo: "/success-nissin.webp",
    logoOnWhite: false,
    tagline: `จากสายกินถึงสายเกม Buddy Review ปั้นต้มยำกุ้งซีสให้ Nissin ติดใจทุกเจน`,
    industry: `Food & Beverage`,
    paras: [
      `Nissin ปล่อยแคมเปญออนไลน์สุดสนุก ดึงอินฟลูเอนเซอร์หลากสไตล์ สร้างคอนเทนต์กระตุ้นความหิวจนไวรัล`,
      `Nissin เปิดตัวรสชาติใหม่ "ต้มยำกุ้งแซ่บซีส" ผสมผสานความจัดจ้านของต้มยำกุ้งแบบไทยกับความนัวละมุนของซีส สร้างประสบการณ์รสชาติที่แปลกใหม่และชวนลอง โดย Buddy Review ออกแบบและวางแผนแคมเปญให้เข้าถึงทุกกลุ่ม ไล่ตั้งแต่สายดูหนัง เกมเมอร์ นักชิม ไปจนถึงสายไลฟ์สไตล์ เลือกใช้อินฟลูเอนเซอร์หลากหลายระดับ ตั้งแต่ Nano ถึง Mega KOL ในกลุ่ม Foodie, Gamer และ Lifestyle พร้อมสร้าง Snackable Content ที่ดูง่าย อร่อยเร็ว และมีภาพจำอย่างซีสเยิ้ม ยืดเบิร์นไฟ และคลุกไข่ออนเซ็น เพื่อกระตุ้นความอยากกินแบบทันที`,
    ],
    stats: [
      { val: "13", label: "Posts" },
      { val: "1.86M", label: "Reach" },
      { val: "45K", label: "Engagement" },
    ],
  },
  {
    slug: "watsons",
    brand: "Watsons",
    logo: "/success-watsons.webp",
    logoOnWhite: false,
    tagline: `ปั้นคอนเทนต์ 'งบ 500 ช้อปสินค้าวัตสัน' สร้างกระแสคอนเทนต์ความคุ้มค่าโซเชียล`,
    industry: `Beauty`,
    paras: [
      `Watsons ต้องการตอกย้ำภาพลักษณ์แบรนด์ในฐานะแหล่งรวมสินค้าคุณภาพคุ้มราคา และผลักดัน House Brand Buddy Review จึงวางแคมเปญบน TikTok และ Lemon8 ชวนอินฟลูเอนเซอร์ทำคอนเทนต์ภายใต้โจทย์ "งบ 500 บาท ซื้อสินค้า 'ตราวัตสัน' ได้กี่ชิ้น" เพื่อสร้างบรรยากาศการช้อปที่สนุกและบอกต่อคุ้มค่า`,
      `Buddy Review ใช้กลยุทธ์เน้นการเล่าเรื่องแบบ "เพื่อนแนะนำเพื่อน" โดยให้ครีเอเตอร์โชว์การช้อปปิ้งจริงในร้านและการใช้งานสินค้าอย่างเป็นธรรมชาติ ใช้ TikTok สำหรับวิดีโอสั้นรีวิวที่สดใส และ Lemon8 สำหรับภาพสวยงามพร้อมคำแนะนำละเอียด`,
    ],
    stats: [
      { val: "220", label: "Posts" },
      { val: "1.2M", label: "Reach" },
      { val: "12K", label: "Engagement" },
    ],
  },
  {
    slug: "ldc-dental",
    brand: "LDC Dental",
    logo: "/success-ldc.webp",
    logoOnWhite: false,
    tagline: `โปรโมทบริการจัดฟันใส LDC จนกระแสแรง พร้อมกิจกรรมลุ้นบินอังกฤษ`,
    industry: `Healthcare`,
    paras: [
      `LDC Dental คลินิกทันตกรรมชั้นนำของไทย จับมือกับ Buddy Review เพื่อโปรโมทบริการจัดฟันใส (Invisalign) พร้อมสร้างแคมเปญที่ผสานการตลาดสร้างสรรค์และการส่งต่อคุณค่าทางสังคม ผ่านอินฟลูเอนเซอร์ที่คัดสรรมาอย่างเหมาะสม`,
      `Buddy Review คัดเลือกอินฟลูเอนเซอร์ที่เข้ากันกับแบรนด์ทั้งสายสุขภาพและครอบครัว มาสร้างคอนเทนต์รีวิวบริการที่เข้าถึงง่าย และออกแบบกิจกรรมพร้อมของรางวัลตั๋วไปเชียร์บอลที่อังกฤษ เพื่อกระตุ้นการมีส่วนร่วมของผู้ชม`,
    ],
    stats: [
      { val: "43K", label: "Reach" },
      { val: "4.2K", label: "Engagement" },
      { val: "9.8%", label: "Engagement Rate" },
    ],
  },
  {
    slug: "viu",
    brand: "Viu",
    logo: "/success-viu.webp",
    logoOnWhite: false,
    tagline: `ผสานอินฟลูเอนเซอร์และคอนเทนต์ท้องถิ่น ยกระดับ Viu ในใจชาวอีสาน`,
    industry: `Entertainment & Streaming`,
    paras: [
      `Viu แพลตฟอร์มสตรีมมิงซีรีส์เอเชียชั้นนำ ร่วมกับ Buddy Review สร้างแคมเปญ "อีสานชมวิว" นำประสบการณ์หนังกลางแปลงสุดคลาสสิกสู่ภาคอีสาน พร้อมแนะนำซีรีส์ยอดนิยมพากย์อีสาน เพื่อเข้าถึงและสร้างความผูกพันกับกลุ่มเป้าหมายท้องถิ่น แคมเปญนี้ไม่เพียงมอบความบันเทิง แต่ยังเป็นเครื่องมือสื่อสารแบรนด์ที่ทรงพลัง`,
      `Buddy Review เน้นการใช้อินฟลูเอนเซอร์ท้องถิ่น เพื่อสร้างความน่าเชื่อถือและถ่ายทอดประสบการณ์จากงานผ่านวิดีโอคอนเทนต์ที่กระตุ้นความสนใจ และสนับสนุนการสร้างคอนเทนต์ที่แชร์ง่ายในสไตล์ของอินฟลูเอนเซอร์แต่ละคน`,
    ],
    stats: [
      { val: "239K", label: "Reach" },
      { val: "4.3K", label: "Engagement" },
      { val: "956K", label: "Combined Followers" },
    ],
  },
  {
    slug: "guss-damn-good",
    brand: "Guss Damn Good x ENO",
    logo: "/success-stories/Success stories-03.webp",
    logoOnWhite: false,
    tagline: `ENO และ Guss Damn Good ร่วมกันสร้างสรรค์ไอศกรีมรสชาติใหม่ชื่อ "After Meal"`,
    industry: `Food & Beverage`,
    paras: [
      `ENO ผงฟู้คู่ใจหลังมื้ออาหารของใครหลายคน ก้าวข้ามข้อจำกัดเดิมๆ สู่แคมเปญสุดซ่า ครั้งนี้ ENO ไม่ได้มาแค่ในซอง แต่มาพร้อมกับรสชาติที่มีเรื่องราว และประสบการณ์ที่ใครก็อยากลองและเล่าต่อ`,
      `แคมเปญนี้ใช้กลยุทธ์ Influencer Marketing ร่วมกับ Buddy Review โดยคัดเลือกอินฟลูเอนเซอร์สายกิน สายฮา และสายครีเอทีฟ ทำให้คอนเทนต์สนุก น่าสนใจ และเล่าเรื่องรสชาติได้แบบไม่ซ้ำใคร สร้าง Talkability บนโซเชียลได้อย่างดี`,
    ],
    stats: [
      { val: "5.9M", label: "Views" },
      { val: "4.4M", label: "Reach" },
      { val: "120K", label: "Engagement" },
    ],
  },
  {
    slug: "ahc",
    brand: "AHC 'The Skin Game'",
    logo: "/success-stories/Success stories-01.webp",
    logoOnWhite: false,
    tagline: `ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล`,
    industry: `Beauty & Skincare`,
    paras: [
      `AHC แบรนด์สกินแคร์เกาหลี จัดอีเวนต์สุดสร้างสรรค์ 'AHC Skin Game THE T-SHOT' ที่ได้แรงบันดาลใจจากซีรีส์ดังบน Netflix อย่าง 'Squid Game' สร้างประสบการณ์โปรโมทแบรนด์แบบใหม่ เพื่อดึงดูดกลุ่มคนรุ่นใหม่และแฟนซีรีส์โดยเฉพาะ`,
      `Buddy Review วางแผนโดยดึง อินฟลูเอนเซอร์ตัวท็อป เสริมด้วย ข่าวประชาสัมพันธ์ จากสื่อชั้นนำ และ ปรับแต่งคอนเทนต์ให้เหมาะสมกับแต่ละแพลตฟอร์ม พร้อมทั้ง ติดตามผลแบบเรียลไทม์ เพื่อให้แคมเปญประสบความสำเร็จและเกิดกระแสไวรัล`,
    ],
    stats: [
      { val: "14M", label: "Views" },
      { val: "9.2M", label: "Reach" },
      { val: "190K", label: "Engagement" },
    ],
  },
];

const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

export function generateStaticParams() {
  return SUCCESS_STORIES.map((s) => ({ slug: s.slug }));
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = SUCCESS_STORIES.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();
  const story = SUCCESS_STORIES[idx];
  const nextStory = SUCCESS_STORIES[idx + 1] ?? null;

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/landing-bg6.jpg')", backgroundSize: "100% 100%", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}>

      {/* Top-left CTA */}
      <div className="success-back-row" style={{ padding: "130px 48px 28px" }}>
        <Link href="/influencer" style={{
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
          Success Stories
        </Link>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section title */}
        <div style={{ paddingTop: "48px", marginBottom: "28px" }}>
          <span style={{
            ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700,
            letterSpacing: "0.5px",
          }}>
            Success Stories
          </span>
        </div>

        {/* Hero image */}
        <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", marginBottom: "40px" }}>
          <Image src={story.logo} alt={story.brand} width={1200} height={420}
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} />
        </div>

        {/* Industry tag */}
        <div style={{ marginBottom: "16px" }}>
          <Link href={`/success?cat=${encodeURIComponent(story.industry)}`} style={{
            ...KT,
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "50px", fontSize: "13px", fontWeight: 600,
            padding: "5px 16px", display: "inline-block", color: "#111827",
            textDecoration: "none",
          }}>
            {story.industry}
          </Link>
        </div>

        {/* Brand name */}
        <h1 style={{
          ...KT,
          background: PINK_GRAD,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "clamp(32px,4vw,52px)", fontWeight: 800,
          margin: "0 0 16px", lineHeight: 1.2,
        }}>
          {story.brand}
        </h1>

        {/* Tagline */}
        <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.5vw,20px)", fontWeight: 600, lineHeight: 1.6, margin: "0 0 40px" }}>
          {story.tagline}
        </p>

        {/* Description paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "72px" }}>
          {story.paras.map((para, i) => (
            <p key={i} style={{ ...KT, color: "#111827", fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.85, margin: 0 }}>
              {para}
            </p>
          ))}
        </div>

        {/* Results */}
        <h2 style={{ ...KT, color: "#111827", fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 800, margin: "0 0 32px", textAlign: "center" }}>
          ผลลัพธ์
        </h2>
        <div className="success-stats-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${story.stats.length}, 1fr)`, gap: "24px" }}>
          {story.stats.map((s) => (
            <div key={s.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "20px", padding: "28px 24px",
            }}>
              <span style={{
                ...KT, background: PINK_GRAD,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "clamp(34px,3.7vw,54px)", fontWeight: 800, lineHeight: 1,
              }}>
                {s.val}
              </span>
              <span style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,19px)", fontWeight: 700 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav — ย้อนกลับ + หน้าต่อไป */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", padding: "48px 24px 80px" }}>
        <BackButton />
        {nextStory && (
          <Link href={`/success/${nextStory.slug}`} style={{
            ...KT,
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#5f26e5",
            border: "1px solid #5f26e5",
            borderRadius: "50px", padding: "10px 22px",
            color: "#ffffff", textDecoration: "none",
            fontSize: "15px", fontWeight: 500,
          }}>
            หน้าต่อไป
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        )}
      </div>

    </div>
  );
}
