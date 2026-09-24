import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BackButton from "../../blog/[slug]/BackButton";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
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
  "peerpower-interview-buddy-review": {
    th: "PeerPower ชวน 3 ผู้ก่อตั้ง Buddy Review พูดคุยถึงจุดเริ่มต้นของธุรกิจ แนวคิดเบื้องหลังการสร้างแพลตฟอร์ม Influencer Marketing และเส้นทางการเติบโตสู่เอเจนซี่ที่ทำงานร่วมกับแบรนด์ชั้นนำ",
    en: "PeerPower sat down with Buddy Review's three co-founders to talk about how the business started, the thinking behind the Influencer Marketing platform, and the journey to becoming an agency working with leading brands.",
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

const Tag = ({ label }: { label: string }) => (
  <span style={{ ...KT, background: "#5f26e5", color: "#ffffff",
    borderRadius: "50px",
    fontSize: "14px", fontWeight: 600, padding: "8px 24px",
    display: "inline-block", width: "fit-content" }}>
    {label}
  </span>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...KT, color: "#111827", fontSize: "17px", lineHeight: "1.9", margin: "0 0 16px", width: "100%" }}>{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ ...KT, color: "#5f26e5", fontSize: "22px", fontWeight: 700, margin: "32px 0 12px", width: "100%" }}>{children}</h2>
);
const Quote = ({ children, cite }: { children: React.ReactNode; cite?: string }) => (
  <blockquote style={{
    margin: "24px 0", padding: "4px 0 4px 20px", borderLeft: "3px solid #5f26e5",
    width: "100%", boxSizing: "border-box",
  }}>
    <p style={{ ...KT, color: "#111827", fontSize: "18px", fontStyle: "italic", lineHeight: "1.8", margin: "0 0 8px" }}>{children}</p>
    {cite && <cite style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, fontStyle: "normal" }}>— {cite}</cite>}
  </blockquote>
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

const PEERPOWER_GALLERY = [
  "/blogs/peerpower-interview-02.jpg",
  "/blogs/peerpower-interview-03.jpg",
  "/blogs/peerpower-interview-04.jpg",
  "/blogs/peerpower-interview-05.jpg",
  "/blogs/peerpower-interview-06.jpg",
  "/blogs/peerpower-interview-07.jpg",
  "/blogs/peerpower-interview-08.jpg",
  "/blogs/peerpower-interview-09.jpg",
];

function PeerPowerGallery() {
  return (
    <div className="newsroom-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", margin: "8px 0 32px" }}>
      {PEERPOWER_GALLERY.map((src) => (
        <div key={src} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1" }}>
          <Image src={src} alt="PeerPower x Buddy Review" fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

function PeerPowerContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>This interview was first published in the Peer Story column by PeerPower, featuring a conversation with Buddy Review&apos;s three co-founders — Phat (Napat Rattanathavornkiti), Nick (Nattadanai Raktaprachit), and Boss (Setthaporn Sriwilai) — about the origins of Buddy Review and the thinking behind its growth.</P>

        <H2>From &quot;Everyday People&quot; to the Power of Influencer Marketing</H2>
        <P>One of the biggest shifts in marketing came the day influence over purchasing decisions stopped being limited to celebrities. Social media opened up space for everyday people to create content, share real experiences, and build their own communities — and trust began coming from relatability, expertise, and communication styles that consumers could genuinely connect with.</P>
        <P>This was one of the opportunities Buddy Review saw early on. Buddy Review started as a group of three friends who had been building a platform together since 2012, testing business models across several industries before arriving at a platform that connects brands with influencers and reviewers.</P>
        <P>The core idea was never just &quot;finding people to review products&quot; — it was building a system that lets both sides work together more easily and fairly.</P>

        <H2>When Influencer Marketing Needs to Be About More Than Follower Count</H2>
        <P>As influencer marketing grew, one of the biggest challenges was that the industry still lacked clear systems — for setting compensation, matching creators to brands, tracking deliverables, and evaluating campaign results. Both influencers and brands were learning these things together as they went.</P>
        <P>Buddy Review evolved its role from a review platform into an Influencer Marketing Agency that blends technology, creator data, and campaign management. Data from working with creators lets the team look beyond follower counts — engagement, reach, content format, and fit for each campaign&apos;s brief.</P>
        <P>At the same time, the team handles everything from planning and selecting influencers to managing content, tracking, and measuring campaign results.</P>

        <Quote cite="Boss, Co-founder of Buddy Review">
          &quot;We act as the connector, so we have to understand what both sides need and recommend what fits best.&quot;
        </Quote>
        <P>That thinking is still central to how Buddy Review works today — building campaigns that deliver for brands while forming the right partnerships for creators at the same time.</P>

        <H2>Growth That Needs a Strong Backend to Match</H2>
        <P>Beyond influencers and technology, the interview also touched on a side of the business that doesn&apos;t get talked about as often: running the business itself — controlling project costs, preparing working capital, and building systems that can keep up with a growing number of campaigns.</P>
        <P>In 2023, Buddy Review raised 8 million baht through PeerPower via a Basic Bond, used as working capital to support the company&apos;s expansion. Buddy Review&apos;s journey has also been recognized regionally, ranking on the Financial Times&apos; High-Growth Companies Asia-Pacific 2024 list in the Advertising &amp; Marketing category.</P>
        <P>From a small platform that started with the belief that &quot;everyone can be influential to someone,&quot; to building technology and influencer marketing systems that help brands and creators work together more effectively — this is part of Buddy Review&apos;s journey, as told by PeerPower in Peer Story.</P>
        <Divider />
        <PeerPowerGallery />
      </>
    );
  }
  return (
    <>
      <P>บทสัมภาษณ์นี้เผยแพร่ครั้งแรกในคอลัมน์ Peer Story โดย PeerPower โดยพูดคุยกับ 3 ผู้ร่วมก่อตั้ง Buddy Review ได้แก่ คุณพัชร-ณพัชร รัตนถาวรกิติ คุณนิค-ณัฏ์ฐดนัย รักตประจิต และคุณบอส-เศรษฐพร ศรีวิไล ถึงที่มาของ Buddy Review และแนวคิดที่อยู่เบื้องหลังการเติบโตของธุรกิจ</P>

      <H2>จาก &quot;คนธรรมดา&quot; สู่พลังของ Influencer Marketing</H2>
      <P>หนึ่งในจุดเปลี่ยนสำคัญของโลกการตลาด คือวันที่อิทธิพลต่อการตัดสินใจไม่ได้จำกัดอยู่แค่ดาราหรือคนดังอีกต่อไป เมื่อ Social Media เปิดพื้นที่ให้คนทั่วไปสามารถสร้างคอนเทนต์ ถ่ายทอดประสบการณ์ และสร้าง Community ของตัวเองขึ้นมาได้ ความน่าเชื่อถือจึงเริ่มเกิดจากความใกล้ตัว ความเชี่ยวชาญ และรูปแบบการสื่อสารที่ผู้บริโภครู้สึกเชื่อมโยงได้จริง</P>
      <P>นี่คือหนึ่งในโอกาสที่ Buddy Review มองเห็นตั้งแต่ช่วงแรก Buddy Review เริ่มต้นจากกลุ่มเพื่อน 3 คนที่พัฒนาแพลตฟอร์มร่วมกันมาตั้งแต่ปี 2012 ผ่านการทดลองโมเดลธุรกิจในหลายอุตสาหกรรม ก่อนพัฒนามาสู่แพลตฟอร์มที่เชื่อมต่อแบรนด์กับ Influencer และ Reviewer</P>
      <P>แนวคิดสำคัญไม่ใช่เพียงการ &quot;หาคนมารีวิวสินค้า&quot; แต่คือการสร้างระบบที่ช่วยให้ทั้งสองฝ่ายทำงานร่วมกันได้ง่ายและเป็นธรรมมากขึ้น</P>

      <H2>เมื่อ Influencer Marketing ต้องมีมากกว่าแค่จำนวน Followers</H2>
      <P>ในช่วงที่ Influencer Marketing เริ่มเติบโต ความท้าทายสำคัญคืออุตสาหกรรมยังไม่มีระบบการจัดการที่ชัดเจน ทั้งการกำหนดค่าตอบแทน การเลือก Creator ให้เหมาะกับแบรนด์ การติดตามผลงาน ไปจนถึงการประเมินผลของแคมเปญ ล้วนเป็นโจทย์ที่ทั้ง Influencer และแบรนด์ต้องเรียนรู้ไปพร้อมกัน</P>
      <P>Buddy Review จึงพัฒนาบทบาทจากแพลตฟอร์มรีวิว ไปสู่การเป็น Influencer Marketing Agency ที่ผสาน Technology, Creator Data และ Campaign Management เข้าด้วยกัน ข้อมูลจากการทำงานร่วมกับ Creator ช่วยให้ทีมสามารถมองได้มากกว่าจำนวนผู้ติดตาม ไม่ว่าจะเป็น Engagement, Reach, รูปแบบคอนเทนต์ หรือความเหมาะสมกับโจทย์ของแต่ละแคมเปญ</P>
      <P>ขณะเดียวกัน ทีมงานยังทำหน้าที่ตั้งแต่การวางแผน คัดเลือก Influencer ดูแล Content ไปจนถึงติดตามและวัดผลของแคมเปญ</P>

      <Quote cite="คุณบอส, ผู้ร่วมก่อตั้ง Buddy Review">
        &quot;เรามีหน้าที่เป็นตัวกลางประสานงาน ดังนั้นเราต้องเข้าใจความต้องการของทั้งสองฝ่ายและแนะนำได้ว่าอะไรเหมาะสมที่สุด&quot;
      </Quote>
      <P>แนวคิดนี้ยังคงเป็นส่วนสำคัญของวิธีการทำงานของ Buddy Review — การสร้างแคมเปญที่ตอบโจทย์แบรนด์ พร้อมสร้างความร่วมมือที่เหมาะสมกับ Creator ไปพร้อมกัน</P>

      <H2>การเติบโตที่ต้องมาพร้อมระบบหลังบ้านที่แข็งแรง</H2>
      <P>นอกจากเรื่อง Influencer และ Technology แล้ว บทสัมภาษณ์ยังพูดถึงอีกด้านที่มักไม่ถูกพูดถึงมากนัก นั่นคือการบริหารธุรกิจ ตั้งแต่การควบคุมต้นทุนของแต่ละโปรเจกต์ การเตรียมเงินทุนหมุนเวียน ไปจนถึงการสร้างระบบที่รองรับจำนวนแคมเปญที่เพิ่มขึ้น</P>
      <P>ในปี 2023 Buddy Review ระดมทุนผ่าน PeerPower จำนวน 8 ล้านบาท ในรูปแบบ Basic Bond เพื่อนำมาเป็นเงินทุนหมุนเวียนและรองรับการขยายงานของบริษัท เส้นทางของ Buddy Review ยังได้รับการพูดถึงในระดับภูมิภาค โดยบริษัทได้รับการจัดอันดับใน Financial Times – High-Growth Companies Asia-Pacific 2024 ในกลุ่มธุรกิจ Advertising &amp; Marketing</P>
      <P>จากแพลตฟอร์มเล็ก ๆ ที่เริ่มต้นจากความเชื่อว่า &quot;ทุกคนสามารถมีอิทธิพลต่อใครบางคนได้&quot; สู่การพัฒนาระบบ Technology และ Influencer Marketing ที่ช่วยให้แบรนด์และ Creator ทำงานร่วมกันได้อย่างมีประสิทธิภาพมากขึ้น นี่คือส่วนหนึ่งของเส้นทาง Buddy Review ที่ PeerPower นำมาเล่าไว้ใน Peer Story</P>
      <Divider />
      <PeerPowerGallery />
    </>
  );
}

const SLUGS = ["outing-trip-2025", "ais-infinite-smes-2026", "cp-all-influencer-trend-ep8", "peerpower-interview-buddy-review"];

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

      {/* Top-left CTA — returns to whichever page linked here */}
      <div className="blog-back-row" style={{ padding: "140px 48px 28px" }}>
        <BackButton lang={lang as Locale} />
      </div>

      {/* Article */}
      <article style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section label */}
        <div style={{ paddingTop: "0", marginBottom: "28px" }}>
          <span style={{ ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>
            Newsroom
          </span>
        </div>

        {/* Cover image */}
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", marginBottom: "40px" }}>
          <Image src={post.image} alt={post.title} width={1200} height={640} style={{ width: "100%", height: "auto", aspectRatio: "1200 / 640", objectFit: "cover" }} />
        </div>

        {/* Content card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          borderRadius: "24px", padding: "48px",
          wordBreak: "break-word", overflowWrap: "break-word",
          boxSizing: "border-box", width: "100%",
        }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {post.categories.map((cat: string) => <Tag key={cat} label={cat} />)}
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
          ) : post.slug === "peerpower-interview-buddy-review" ? (
            <PeerPowerContent lang={lang as Locale} />
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

      <Footer variant="home" lang={lang as Locale} dict={dict} />

      <style>{`
        @media (max-width: 767px){
          .newsroom-gallery{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
