import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BackButton from "./BackButton";
import Navbar from "../../../components/Navbar";
import BlogFooter from "../BlogFooter";
import ScrollProgressBar from "../../../components/ScrollProgressBar";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";

const BLOG_DESCRIPTIONS: Record<string, Record<string, string>> = {
  "tiktok-algorithm-9-techniques": {
    th: "เจาะลึกอัลกอริทึม TikTok 2025 พร้อม 9 เทคนิคทำคลิปให้ติด For You Page เพิ่ม Engagement และยอดวิวอย่างได้ผล",
    en: "Decode the TikTok Algorithm 2025 with 9 proven techniques to get your videos on the For You Page and grow your reach.",
  },
  "best-time-to-post-2025": {
    th: "รวมเวลาทองในการโพสต์บน Facebook Instagram TikTok YouTube และ Lemon8 ปี 2025 เพื่อเพิ่ม Reach และ Engagement",
    en: "Best times to post on Facebook, Instagram, TikTok, YouTube, and Lemon8 in 2025 — maximize your reach and engagement.",
  },
  "influencer-mapping-canvas": {
    th: "Influencer Mapping Canvas เครื่องมือวิเคราะห์ 5 ปัจจัยเลือกอินฟลูเอนเซอร์ที่ใช่ สำหรับแคมเปญ Influencer Marketing ปี 2025",
    en: "The Influencer Mapping Canvas: a 5-factor framework for choosing the right influencer for your brand in 2025.",
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
  const description = BLOG_DESCRIPTIONS[slug]?.[lang] ?? post.title;
  const canonical = `https://agency.buddyreview.co/${lang}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        th: `https://agency.buddyreview.co/th/blog/${slug}`,
        en: `https://agency.buddyreview.co/en/blog/${slug}`,
        "x-default": `https://agency.buddyreview.co/th/blog/${slug}`,
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
  <Link href={`/${lang}/blog?cat=${encodeURIComponent(label)}`} style={{ ...KT, background: "rgba(255,255,255,0.15)", color: "#111827",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
    fontSize: "13px", fontWeight: 600, padding: "4px 14px",
    display: "inline-block", width: "fit-content", textDecoration: "none", cursor: "pointer" }}>
    {label}
  </Link>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ ...KT, color: "#5f26e5", fontSize: "22px", fontWeight: 700, margin: "32px 0 12px", width: "100%" }}>{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "24px 0 8px", width: "100%" }}>{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...KT, color: "#111827", fontSize: "17px", lineHeight: "1.9", margin: "0 0 16px", width: "100%" }}>{children}</p>
);
const UL = ({ items, noBullet }: { items: React.ReactNode[]; noBullet?: boolean }) => (
  <ul style={{ margin: "0 0 16px", paddingLeft: "0", width: "100%", boxSizing: "border-box", listStyle: "none" }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
        {!noBullet && <span style={{ color: "#111827", fontSize: "14px", flexShrink: 0, marginTop: "4px", lineHeight: "1.9" }}>●</span>}
        <span style={{ ...KT, color: "#111827", fontSize: "17px", lineHeight: "1.9" }}>{item}</span>
      </li>
    ))}
  </ul>
);
const Divider = () => <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "32px 0", width: "100%" }} />;
const Note = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "rgba(95,38,229,0.08)", border: "1px solid rgba(95,38,229,0.25)", borderRadius: "12px", padding: "16px 20px", margin: "0 0 24px" }}>
    <p style={{ ...KT, color: "#111827", fontSize: "15px", lineHeight: "1.8", margin: 0 }}>{children}</p>
  </div>
);
const Tip = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...KT, color: "#111827", fontSize: "16px", lineHeight: "1.8", margin: "0 0 24px" }}>
    <strong style={{ color: "#5f26e5" }}>Tip:</strong> {children}
  </p>
);
const OL = ({ items }: { items: React.ReactNode[] }) => (
  <ol style={{ margin: "0 0 16px", paddingLeft: "0", width: "100%", boxSizing: "border-box", listStyle: "none" }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
        <span style={{ ...KT, color: "#5f26e5", fontSize: "17px", fontWeight: 700, flexShrink: 0, minWidth: "22px" }}>{i + 1}.</span>
        <span style={{ ...KT, color: "#111827", fontSize: "17px", lineHeight: "1.9" }}>{item}</span>
      </li>
    ))}
  </ol>
);

function TikTokContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <H2>What Is the TikTok Algorithm?</H2>
        <P>Many TikTok users wonder, &quot;Why do some clips barely get any views while others go viral?&quot; or &quot;I put real effort into a post and it flopped, but a throwaway clip blew up?&quot;</P>
        <P>This isn&apos;t actually about luck — it&apos;s the TikTok Algorithm at work, an AI system that analyzes user behavior and selects the most relevant clips to show on the For You Page (FYP).</P>

        <H3>1. Analyzing Viewer Behavior</H3>
        <UL items={[
          "Watching to the end vs. scrolling past quickly",
          "Rewatching a clip (a very strong signal)",
          "Scroll speed through the feed",
          "Time spent pausing on a clip — e.g. watching a cooking video, then searching for the recipe afterward",
        ]} />

        <H3>2. Measuring Engagement Across the Board</H3>
        <UL items={[
          "TikTok doesn't just look at likes — it also considers other signals:",
          "Likes = interest",
          "Comments = a desire to interact",
          "Shares = content worth passing on",
          "Saves = wanting to revisit later",
          "Tip: replying to comments thoughtfully can significantly boost engagement",
        ]} />

        <H3>3. Prioritizing What&apos;s Trending</H3>
        <UL items={[
          "Popular songs and sounds",
          "Trending hashtags",
          "Current news and events",
          "New challenges",
        ]} />

        <H3>4. Using Baseline Data to Inform What&apos;s Shown</H3>
        <UL items={[
          "Location (often shows clips from the same country)",
          "Time of app usage",
          "Device type",
          "App language",
        ]} />

        <Divider />
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", margin: "8px 0 32px" }}>
          <Image src="/blogs/blog-9techniques.avif" alt="9 techniques to get on the For You Page" width={800} height={450} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        <H2>9 Techniques to Get Your Clips on the For You Page (FYP)</H2>

        <H3>1. Hook Viewers in the First 3 Seconds</H3>
        <UL items={[
          "Open with a question that sparks curiosity",
          "Use eye-catching visuals or colors",
          "Tell viewers what they'll gain by watching to the end",
        ]} />

        <H3>2. Niche Down Your Content</H3>
        <UL items={[
          "Example: general café reviews → café reviews for the work-from-anywhere crowd",
          "Example: general cooking → microwave meals for dorm dwellers",
        ]} />

        <H3>3. Add Keywords TikTok Can Understand</H3>
        <UL items={[
          "Include search terms in your caption",
          "Use hashtags that match your content",
          "Say key terms out loud in the clip (the system picks it up from audio)",
        ]} />

        <H3>4. Pick the Right Time to Post</H3>
        <UL items={[
          "Recommended times: 9:00–11:00 AM and 7:00–9:00 PM",
          "Check your actual TikTok Analytics data",
        ]} />

        <H3>5. Use Sound to Your Advantage</H3>
        <UL items={[
          "Choose trending sounds",
          "If using your own voice — speak clearly and engagingly",
          "Add subtitles, since many people watch with sound off",
        ]} />

        <H3>6. Encourage Comments</H3>
        <UL items={[
          "Ask a question at the end of the clip",
          "Raise a (constructively) debatable point",
          "Reply to comments with a new clip",
        ]} />

        <H3>7. Make Clip Series</H3>
        <UL items={[
          "\"Part 1, Part 2\"",
          "\"Method 1 of 5\"",
          "\"More coming in the next part...\"",
        ]} />

        <H3>8. Play with Trends (Adapt Them to Yourself)</H3>
        <UL items={[
          "Dance trend → turn it into a cooking challenge",
          "\"Day in my life\" → \"Day in my pet's life\"",
        ]} />

        <H3>9. Analyze Results and Improve</H3>
        <UL items={[
          "Check the Completion Rate of your clips",
          "Identify where viewers drop off",
        ]} />

        <Divider />
        <H2>What to Avoid on TikTok</H2>
        <UL noBullet items={[
          "🚫 Buying likes or followers (risks reduced reach)",
          "🚫 Directly begging for likes/follows (comes across as spam)",
          "🚫 Using irrelevant hashtags",
          "🚫 Overlooking video and audio quality",
        ]} />

        <Divider />
        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
          <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>Summary: TikTok Algorithm 2025</h3>
          <P>Getting your clips onto the FYP isn&apos;t about luck — it&apos;s about understanding the system, using the right strategy, and staying consistent. Most importantly, don&apos;t be afraid to experiment, because TikTok always rewards creativity and originality.</P>
          <P>Great content + the right posting time + understanding the algorithm = a genuinely higher chance of going viral.</P>
        </div>
      </>
    );
  }
  return (
    <>
      <H2>อัลกอริทึม TikTok คืออะไร?</H2>
      <P>หลายคนที่เล่น TikTok อาจสงสัยว่า &quot;ทำไมบางคลิปแทบไม่มีคนดู แต่บางคลิปกลับไวรัล?&quot; หรือ &quot;โพสต์ตั้งใจทำกลับเงียบ แต่คลิปเล่นๆ ดังเฉยเลย&quot;</P>
      <P>จริงๆ แล้วนี่ไม่ใช่เรื่องของโชค แต่คือการทำงานของ อัลกอริทึม TikTok (TikTok Algorithm) ที่ใช้ระบบ AI วิเคราะห์พฤติกรรมผู้ใช้ แล้วเลือกคลิปที่ตรงใจที่สุดมาแสดงบน For You Page (FYP)</P>

      <H3>1. วิเคราะห์พฤติกรรมการดูของผู้ใช้</H3>
      <UL items={[
        "คลิปที่ดูจนจบ vs. เลื่อนผ่านเร็ว",
        "คลิปที่กดดูซ้ำ (ถือเป็นสัญญาณที่แรงมาก)",
        "ความเร็วในการเลื่อนฟีด",
        "เวลาที่หยุดดูแต่ละคลิป เช่น ดูคลิปทำอาหารเสร็จแล้วไปค้นหาสูตรเพิ่ม",
      ]} />

      <H3>2. วัด Engagement รอบด้าน</H3>
      <UL items={[
        "TikTok ไม่ได้ดูแค่ยอดไลก์ แต่พิจารณาสัญญาณอื่นๆ ด้วย:",
        "ไลก์ = ความชอบ",
        "คอมเมนต์ = การอยากโต้ตอบ",
        "แชร์ = คอนเทนต์ที่อยากบอกต่อ",
        "Save = อยากเก็บไว้ดูทีหลัง",
        "เคล็ดลับ: การตอบคอมเมนต์อย่างสร้างสรรค์ช่วยเพิ่ม Engagement ได้มาก",
      ]} />

      <H3>3. ให้ความสำคัญกับสิ่งที่กำลังเป็นเทรนด์</H3>
      <UL items={[
        "เพลงและเสียงที่ฮิต",
        "แฮชแท็กยอดนิยม",
        "ข่าวและเหตุการณ์ปัจจุบัน",
        "ชาเลนจ์ใหม่ๆ",
      ]} />

      <H3>4. ใช้ข้อมูลพื้นฐานประกอบการเลือกแสดงผล</H3>
      <UL items={[
        "Location (มักเห็นคลิปจากประเทศเดียวกัน)",
        "เวลาที่ใช้งานแอป",
        "ประเภทมือถือ",
        "ภาษาในแอป",
      ]} />

      <Divider />
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", margin: "8px 0 32px" }}>
        <Image src="/blogs/blog-9techniques.avif" alt="9 เทคนิคทำคลิปให้ติด For You Page" width={800} height={450} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      <H2>9 เทคนิคทำคลิปให้ติด For You Page (FYP)</H2>

      <H3>1. ดึงดูดใน 3 วินาทีแรก</H3>
      <UL items={[
        "เปิดด้วยคำถามที่ชวนสงสัย",
        "ใช้ภาพหรือสีที่สะดุดตา",
        "บอกประโยชน์ที่จะได้ถ้าดูจนจบ",
      ]} />

      <H3>2. ทำเนื้อหาเจาะ Niche</H3>
      <UL items={[
        "เช่น: รีวิวคาเฟ่ทั่วไป → รีวิวคาเฟ่สำหรับสาย Work from Anywhere",
        "เช่น: ทำอาหารทั่วไป → เมนูไมโครเวฟสำหรับชาวหอ",
      ]} />

      <H3>3. ใส่คีย์เวิร์ดให้ TikTok เข้าใจ</H3>
      <UL items={[
        "ใส่คำค้นหาในแคปชั่น",
        "ใช้แฮชแท็กตรงกับเนื้อหา",
        "พูดคำสำคัญในคลิป (ระบบรู้จากเสียง)",
      ]} />

      <H3>4. เลือกเวลาโพสต์ให้เหมาะสม</H3>
      <UL items={[
        "เวลาแนะนำ: 09:00–11:00 น. และ 19:00–21:00 น.",
        "ดูข้อมูลจริงจาก TikTok Analytics",
      ]} />

      <H3>5. ใช้เสียงให้ได้เปรียบ</H3>
      <UL items={[
        "เลือกเสียงที่กำลังเป็นเทรนด์",
        "ถ้าใช้เสียงพูดเอง → ชัดและน่าฟัง",
        "ใส่ซับไตเติล เพราะหลายคนดูแบบปิดเสียง",
      ]} />

      <H3>6. กระตุ้นให้คนคอมเมนต์</H3>
      <UL items={[
        "ถามคำถามท้ายคลิป",
        "พูดประเด็นที่ชวนถกเถียง (แบบสร้างสรรค์)",
        "ตอบคอมเมนต์ด้วยคลิปใหม่",
      ]} />

      <H3>7. ทำคลิปซีรีส์</H3>
      <UL items={[
        "\"Part 1, Part 2\"",
        "\"วิธีที่ 1 จาก 5 วิธี\"",
        "\"ตอนหน้าเราจะเล่าต่อ...\"",
      ]} />

      <H3>8. เล่นกับเทรนด์ (ดัดแปลงให้เข้ากับตัวเอง)</H3>
      <UL items={[
        "เทรนด์เต้น → ดัดแปลงเป็นชาเลนจ์ทำอาหาร",
        "\"Day in my life\" → \"Day in my pet's life\"",
      ]} />

      <H3>9. วิเคราะห์ผลและปรับปรุง</H3>
      <UL items={[
        "ดู Completion Rate ของคลิป",
        "จุดที่ผู้ชมเลื่อนออก",
      ]} />

      <Divider />
      <H2>สิ่งที่ควรเลี่ยงในการทำ TikTok</H2>
      <UL noBullet items={[
        "🚫 ซื้อไลก์หรือผู้ติดตาม (เสี่ยงโดนลด Reach)",
        "🚫 ขอไลก์/ฟอลตรงๆ (ดูเป็น Spam)",
        "🚫 ใช้แฮชแท็กที่ไม่เกี่ยวข้อง",
        "🚫 มองข้ามคุณภาพวิดีโอและเสียง",
      ]} />

      <Divider />
      <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
        <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>สรุป: TikTok Algorithm 2025</h3>
        <P>การทำคลิปให้ติด FYP ไม่ใช่เรื่องของโชค แต่คือการ เข้าใจระบบ + ใช้กลยุทธ์ที่ถูกต้อง + สม่ำเสมอที่สำคัญ อย่ากลัวที่จะทดลองสิ่งใหม่ๆ เพราะ TikTok ให้รางวัลกับ ความคิดสร้างสรรค์และความแปลกใหม่เสมอ</P>
        <P>คอนเทนต์ที่ดี + เวลาโพสต์ที่เหมาะสม + เข้าใจอัลกอริทึม = โอกาสไวรัลสูงขึ้นแน่นอน</P>
      </div>
    </>
  );
}

function BestTimeContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Ever wondered... &quot;Why do some posts get almost no views while others go viral?&quot; The secret isn&apos;t just the content — &quot;timing&quot; is another key factor that determines whose feed your content lands on.</P>
        <P>Buddy Review has compiled the average &quot;golden posting times&quot; across 5 popular platforms — Facebook, Instagram, TikTok, YouTube, and Lemon8 — so you can apply them to your posting strategy this year.</P>
        <Note>Note: this data reflects average usage trends. We recommend always checking each platform&apos;s own Analytics alongside this to find the &quot;true best time&quot; for your brand.</Note>

        <Divider />
        <H3>Facebook</H3>
        <UL items={[
          <><strong>Recommended days:</strong> Monday, Wednesday, Thursday</>,
          <><strong>Best time to post:</strong> 8:00–10:00 AM (when people check their phones before work / during commutes)</>,
        ]} />
        <Tip>Avoid posting late at night, as reach tends to drop.</Tip>

        <H3>Instagram</H3>
        <UL items={[
          <><strong>Recommended days:</strong> Tuesday, Thursday, Sunday</>,
          <><strong>Best time to post:</strong> 11:00 AM–1:00 PM and 6:00–8:00 PM (lunch break + after work)</>,
        ]} />
        <Tip>Reels tend to get higher engagement in the evening to late night.</Tip>

        <H3>TikTok</H3>
        <UL items={[
          <><strong>Recommended days:</strong> Tuesday, Thursday, Saturday</>,
          <><strong>Best time to post:</strong> 9:00–11:00 AM and 7:00–9:00 PM (before work + before bed)</>,
        ]} />
        <Tip>Use trending music or sounds to boost your chances of catching a trend.</Tip>

        <H3>YouTube</H3>
        <UL items={[
          <><strong>Recommended days:</strong> Friday, Saturday, Sunday</>,
          <><strong>Best time to post:</strong> 12:00–3:00 PM (lets the video build views before the evening peak)</>,
        ]} />
        <Tip>Use Premiere or scheduled posting to build engagement.</Tip>

        <H3>Lemon8</H3>
        <UL items={[
          <><strong>Recommended days:</strong> Wednesday, Friday, Sunday</>,
          <><strong>Best time to post:</strong> 10:00 AM–12:00 PM and 8:00–10:00 PM (lunch break + after dinner)</>,
        ]} />
        <Tip>Use eye-catching visuals with valuable captions, or tell a complete story in a single post.</Tip>

        <Divider />
        <P><strong style={{ color: "#5f26e5" }}>In the end, there&apos;s no one-size-fits-all formula for posting on social media.</strong> There isn&apos;t a single best time, because <strong style={{ color: "#5f26e5" }}>each page/brand&apos;s followers behave differently.</strong> What you should do is:</P>
        <UL items={[
          "Analyze your followers' behavior through Analytics",
          "Test posting at different times",
          "Measure results and continuously adjust your strategy",
        ]} />

        <Divider />
        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
          <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>Summary: Golden Posting Times 2025</h3>
          <P>When great content meets the right posting time, your reach and engagement will noticeably increase.</P>
        </div>
      </>
    );
  }
  return (
    <>
      <P>เคยสงสัยไหมว่า… &quot;ทำไมบางโพสต์แทบไม่มีคนเห็น แต่บางโพสต์กลับไวรัลขึ้นมาได้?&quot; ความลับไม่ได้อยู่ที่คอนเทนต์อย่างเดียว แต่ &quot;เวลา&quot; ก็เป็นอีกปัจจัยสำคัญที่กำหนดว่าคอนเทนต์ของคุณจะไปโผล่บนฟีดใครบ้าง</P>
      <P>Buddy Review ได้สรุปค่าเฉลี่ย &quot;เวลาทองในการโพสต์&quot; ของ 5 แพลตฟอร์มยอดนิยม ทั้ง Facebook, Instagram, TikTok, YouTube และ Lemon8 เพื่อนำไปปรับใช้กับกลยุทธ์การโพสต์ของคุณในปีนี้</P>
      <Note>หมายเหตุ: ข้อมูลนี้เป็นค่าเฉลี่ยจากแนวโน้มการใช้งานทั่วไป แนะนำให้เช็ก Analytics ของแต่ละแพลตฟอร์มควบคู่กันเสมอ เพื่อหา &quot;เวลาที่ใช่จริงๆ&quot; สำหรับแบรนด์ของคุณ</Note>

      <Divider />
      <H3>Facebook</H3>
      <UL items={[
        <><strong>วันที่แนะนำ:</strong> จันทร์, พุธ, พฤหัสบดี</>,
        <><strong>เวลาที่ควรโพสต์:</strong> 08:00 – 10:00 น. (ช่วงคนเช็กมือถือก่อนเริ่มงาน / ระหว่างเดินทาง)</>,
      ]} />
      <Tip>หลีกเลี่ยงช่วงดึก เพราะ Reach มักลดลง</Tip>

      <H3>Instagram</H3>
      <UL items={[
        <><strong>วันที่แนะนำ:</strong> อังคาร, พฤหัสบดี, อาทิตย์</>,
        <><strong>เวลาที่ควรโพสต์:</strong> 11:00 – 13:00 น. และ 18:00 – 20:00 น. (พักเที่ยง + หลังเลิกงาน)</>,
      ]} />
      <Tip>Reels มักได้ Engagement สูงในช่วงเย็นถึงกลางคืน</Tip>

      <H3>TikTok</H3>
      <UL items={[
        <><strong>วันที่แนะนำ:</strong> อังคาร, พฤหัสบดี, เสาร์</>,
        <><strong>เวลาที่ควรโพสต์:</strong> 09:00 – 11:00 น. และ 19:00 – 21:00 น. (ก่อนเริ่มงาน + ก่อนนอน)</>,
      ]} />
      <Tip>ใช้เพลงหรือเสียงที่กำลังเป็นกระแส เพื่อเพิ่มโอกาสติดเทรนด์</Tip>

      <H3>YouTube</H3>
      <UL items={[
        <><strong>วันที่แนะนำ:</strong> ศุกร์, เสาร์, อาทิตย์</>,
        <><strong>เวลาที่ควรโพสต์:</strong> 12:00 – 15:00 น. (ให้คลิปสะสมยอดวิวก่อนช่วงพีคตอนเย็น)</>,
      ]} />
      <Tip>ใช้ Premiere หรือการตั้งเวลาโพสต์ล่วงหน้าเพื่อสร้าง Engagement</Tip>

      <H3>Lemon8</H3>
      <UL items={[
        <><strong>วันที่แนะนำ:</strong> พุธ, ศุกร์, อาทิตย์</>,
        <><strong>เวลาที่ควรโพสต์:</strong> 10:00 – 12:00 น. และ 20:00 – 22:00 น. (พักเที่ยง + หลังมื้อเย็น)</>,
      ]} />
      <Tip>ใช้ภาพที่ดึงดูด พร้อมคำบรรยายที่ให้คุณค่า หรือเล่าเรื่องครบจบในโพสต์เดียว</Tip>

      <Divider />
      <P><strong style={{ color: "#5f26e5" }}>สรุปแล้วการลงโพสต์บนโซเชียลมีเดียนั้นไม่มีสูตรสำเร็จตายตัว</strong> การเลือกเวลาที่ดีที่สุดไม่ได้มีแค่คำตอบเดียว เพราะ <strong style={{ color: "#5f26e5" }}>พฤติกรรมผู้ติดตามแต่ละเพจ/แบรนด์ไม่เหมือนกัน</strong> สิ่งที่ควรทำคือ</P>
      <UL items={[
        "วิเคราะห์พฤติกรรมผู้ติดตามจาก Analytics",
        "ทดลองโพสต์หลายช่วงเวลา",
        "วัดผลและปรับกลยุทธ์อย่างต่อเนื่อง",
      ]} />

      <Divider />
      <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
        <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>สรุป: เวลาทองในการโพสต์ 2025</h3>
        <P>เมื่อคอนเทนต์ดี + เวลาลงเหมาะสม = โอกาสในการเข้าถึงและ Engagement ก็จะพุ่งขึ้นแบบเห็นผลอย่างแน่นอน</P>
      </div>
    </>
  );
}

function InfluencerContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <H2>Why Choosing an Influencer Is More Complicated Than It Seems</H2>
        <P>Nowadays, influencers aren&apos;t just &quot;online celebrities&quot; — they&apos;re powerful voices who can shape image, drive trends, and genuinely influence consumers&apos; purchasing decisions. According to Influencer Marketing Hub (2024), 81% of marketers worldwide view influencer marketing as a strategy with higher ROI than other marketing channels.</P>
        <P>But the problem is, many brands still choose influencers based solely on follower count or engagement rate — numbers that can easily be misleading, such as fake followers, purchased likes, or engagement that doesn&apos;t align with the real target audience. That&apos;s why choosing influencers requires in-depth analysis, not guesswork — and this is where the Influencer Mapping Canvas comes in.</P>

        <Divider />
        <H2>What Is the Influencer Mapping Canvas?</H2>
        <P>The Influencer Mapping Canvas is a tool that helps brands and agencies choose influencers more accurately by analyzing 5 key factors that reflect both the &quot;influencer&apos;s identity&quot; and &quot;fit with the brand&apos;s strategy.&quot;</P>
        <P>This tool doesn&apos;t just look at numbers — it digs into Persona, Content Pillars, Value, Audience, and Brand Fit, so brands find &quot;the right person,&quot; not just &quot;the famous person.&quot;</P>

        <Divider />
        <H2>The 5 Key Factors of the Influencer Mapping Canvas</H2>

        <H3>1. Persona – The Influencer&apos;s Identity</H3>
        <P>Not just external image, but the &quot;identity&quot; followers actually connect with, such as</P>
        <UL items={["Storytelling style", "A clear, memorable image", "A distinct lifestyle"]} />
        <P>Influencers in the same category but with different Personas can attract completely different audiences — for example, a fashion influencer who leans serious and premium vs. one who&apos;s casual and approachable. Both may be in the same category but clearly speak to different groups.</P>

        <H3>2. Content Pillars</H3>
        <P>Every influencer has &quot;core content themes&quot; they repeat consistently, such as</P>
        <UL items={["Beauty → skincare reviews", "Lifestyle → sharing everyday life", "Food → restaurant reviews"]} />
        <P>If a brand picks an influencer whose Content Pillars align with its product/service, the content feels more natural and credible. For example, a health food brand choosing an influencer who already creates health-related content will get results that feel much more authentic than hiring someone who&apos;s never spoken about the topic before.</P>

        <H3>3. Value Alignment</H3>
        <P>Shared &quot;values&quot; are what build trust, such as</P>
        <UL items={[
          "An eco-conscious brand → should choose an influencer who regularly talks about the environment",
          "A premium brand → should choose an influencer who emphasizes quality over price",
        ]} />
        <P>Choosing an influencer with Value Alignment helps followers feel the brand and influencer are a natural fit, not a forced collaboration.</P>

        <H3>4. Audience Behavior</H3>
        <P>Brands need to analyze not just the influencer, but also &quot;their followers,&quot; including</P>
        <UL items={[
          "Demographics: gender, age, location",
          "Activity: when their audience engages the most",
          "Behavior: content-viewing habits and purchase decision patterns",
        ]} />
        <P>Example: a children&apos;s product brand should choose an influencer whose followers are aged 25–34 (new parents), not one whose fanbase is mostly teenagers.</P>

        <H3>5. Brand Fit</H3>
        <P>Last but most important — whether the influencer actually &quot;fits the brand,&quot; such as</P>
        <UL items={[
          "Has previously worked with a competitor",
          "Mood & tone that differs from what the brand wants",
          "An image that doesn't match the brand's positioning",
        ]} />
        <P>Choosing the wrong influencer can hurt the brand more than the results it delivers.</P>

        <Divider />
        <H2>Example: Applying the Influencer Mapping Canvas</H2>
        <Note>
          <strong style={{ color: "#5f26e5" }}>Case Study:</strong> Skincare brand A once chose an influencer based only on engagement rate, and sales barely moved — because the influencer&apos;s fanbase was mostly teenagers, while the product targeted working women aged 25–35. After switching to the Influencer Mapping Canvas for a fresh analysis, they chose an influencer with a credible Persona, skincare-focused Content Pillars, quality-focused Value Alignment, an Audience that matched the real target group, and clear Brand Fit → <strong style={{ color: "#5f26e5" }}>sales more than doubled in the next campaign.</strong>
        </Note>

        <Divider />
        <H2>Tips for Choosing Influencers That Win in 2025</H2>
        <OL items={[
          <>Analyze real data → use Analytics and influencer tools instead of relying on gut feeling</>,
          <>Choose quality over quantity → Micro/Nano influencers can outperform Macro influencers if they fit the target audience</>,
          <>Build long-term relationships → one-off campaigns are less sustainable than building a real partnership</>,
          <>Always measure results → set clear KPIs like engagement, reach, and conversion — not just awareness</>,
        ]} />

        <Divider />
        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
          <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>Summary: Influencer Mapping Canvas 2025</h3>
          <P>Choosing an influencer that actually works isn&apos;t about picking &quot;the most famous person&quot; — it&apos;s about picking &quot;the right person&quot; for the brand. The Influencer Mapping Canvas is an essential tool that analyzes every dimension, from Persona, Content, and Value to Audience and Brand Fit, making influencer marketing campaigns more precise, more cost-effective, and more sustainable in 2025.</P>
          <P>If a brand wants to win at influencer marketing, it shouldn&apos;t choose based on &quot;gut feeling&quot; — it should choose based on &quot;data and fit.&quot;</P>
        </div>
      </>
    );
  }
  return (
    <>
      <H2>ทำไมการเลือกอินฟลูเอนเซอร์ถึงซับซ้อนกว่าที่คิด</H2>
      <P>ยุคนี้อินฟลูเอนเซอร์ไม่ได้เป็นเพียงแค่ &quot;คนดังบนโลกออนไลน์&quot; แต่คือผู้ทรงอิทธิพลที่สามารถสร้างภาพลักษณ์ สร้างกระแสและช่วยโน้มน้าวการตัดสินใจซื้อของผู้บริโภคได้จริง โดยมีสถิติจาก Influencer Marketing Hub (ปี 2024) ระบุว่า 81% ของนักการตลาดทั่วโลกมองว่า Influencer Marketing เป็นกลยุทธ์ที่มี ROI สูงกว่าช่องทางการตลาดอื่นๆ</P>
      <P>แต่ปัญหาคือ หลายแบรนด์ยังคงเลือกอินฟลูเอนเซอร์จาก ยอดผู้ติดตามหรือ Engagement Rate เพียงอย่างเดียว ซึ่งตัวเลขเหล่านี้อาจ &quot;หลอกตา&quot; ได้ง่าย เช่น ผู้ติดตามปลอม ยอดไลก์ที่ซื้อมา หรือ Engagement ที่ไม่สอดคล้องกับกลุ่มเป้าหมายจริง ดังนั้นการเลือกอินฟลูเอนเซอร์จึงต้องอาศัยการวิเคราะห์เชิงลึก ไม่ใช่การคาดเดาและนี่คือจุดที่ Influencer Mapping Canvas เข้ามามีบทบาท</P>

      <Divider />
      <H2>Influencer Mapping Canvas คืออะไร?</H2>
      <P>Influencer Mapping Canvas คือเครื่องมือที่ช่วยให้แบรนด์และเอเจนซี่เลือกอินฟลูเอนเซอร์ได้แม่นยำขึ้นผ่านการวิเคราะห์ 5 ปัจจัยหลักที่สะท้อนทั้ง &quot;ตัวตนของอินฟลูฯ&quot; และ &quot;ความเหมาะสมกับกลยุทธ์แบรนด์&quot;</P>
      <P>เครื่องมือนี้ไม่ได้มองแค่ตัวเลข แต่เจาะลึกทั้ง Persona, Content Pillars, Value, Audience และ Brand Fit เพื่อให้แบรนด์ได้ &quot;คนที่ใช่&quot; ไม่ใช่แค่ &quot;คนที่ดัง&quot;</P>

      <Divider />
      <H2>5 ปัจจัยหลักของ Influencer Mapping Canvas</H2>

      <H3>1. Persona – ตัวตนของอินฟลูฯ</H3>
      <P>ไม่ใช่แค่ภาพลักษณ์ภายนอก แต่คือ &quot;ตัวตน&quot; ที่ผู้ติดตามสัมผัสได้ เช่น</P>
      <UL items={["สไตล์การเล่าเรื่อง", "ภาพลักษณ์ที่ชัดเจนและน่าจดจำ", "ไลฟ์สไตล์เฉพาะตัว"]} />
      <P>อินฟลูฯ ที่อยู่ในหมวดเดียวกัน หาก Persona ต่างกัน ก็สามารถดึงดูดคนละกลุ่มเป้าหมาย เช่น อินฟลูฯ สายแฟชั่นที่จริงจังกับความพรีเมียม vs. อินฟลูฯ สายแฟชั่นที่เล่าเรื่องสบายๆ เข้าถึงง่าย ทั้งสองอาจอยู่ในหมวดเดียวกันแต่สื่อสารกับคนละกลุ่มได้ชัดเจน</P>

      <H3>2. Content Pillars – เสาหลักของคอนเทนต์</H3>
      <P>ทุกอินฟลูฯ จะมี &quot;แนวคอนเทนต์หลัก&quot; ที่ทำซ้ำอย่างต่อเนื่อง เช่น</P>
      <UL items={["บิวตี้ → รีวิวสกินแคร์", "ไลฟ์สไตล์ → แชร์ไลฟ์สไตล์ในชีวิตประจำวัน", "ฟู้ด → รีวิวร้านอาหาร"]} />
      <P>ถ้าแบรนด์เลือกอินฟลูฯ ที่ Content Pillars ตรงกับสินค้า/บริการ จะทำให้คอนเทนต์เป็นธรรมชาติและน่าเชื่อถือมากกว่า ตัวอย่างเช่น แบรนด์อาหารสุขภาพเลือกอินฟลูฯ ที่ทำคอนเทนต์เกี่ยวกับการดูแลสุขภาพอยู่แล้ว ผลลัพธ์จะ &quot;เนียน&quot; กว่าการจ้างคนที่ไม่เคยพูดเรื่องนี้มาก่อน</P>

      <H3>3. Value Alignment – ค่านิยมตรงกัน</H3>
      <P>ความเหมือนกันด้าน &quot;ค่านิยม&quot; คือสิ่งที่สร้างความเชื่อถือ เช่น</P>
      <UL items={[
        "แบรนด์รักษ์โลก → ควรเลือกอินฟลูฯ ที่พูดเรื่องสิ่งแวดล้อมเป็นประจำ",
        "แบรนด์พรีเมียม → ควรเลือกอินฟลูฯ ที่เน้นคุณภาพมากกว่าราคา",
      ]} />
      <P>การเลือกอินฟลูฯ ที่มี Value Alignment จะช่วยให้ผู้ติดตามรู้สึกว่า แบรนด์กับอินฟลูฯ เป็นเนื้อเดียวกัน ไม่ใช่การร่วมงานที่ &quot;ยัดเยียด&quot;</P>

      <H3>4. Audience Behavior – เข้าใจผู้ติดตาม</H3>
      <P>แบรนด์ต้องวิเคราะห์ไม่ใช่แค่อินฟลูฯ แต่รวมถึง &quot;ผู้ติดตามของเขา&quot; ด้วย เช่น</P>
      <UL items={[
        "Demographic: เพศ, อายุ, พื้นที่",
        "Activity: ช่วงเวลาที่ผู้ชม Engage มากที่สุด",
        "Behavior: พฤติกรรมการดูคอนเทนต์และการตัดสินใจซื้อ",
      ]} />
      <P>ตัวอย่าง: แบรนด์สินค้าเด็กควรเลือกอินฟลูฯ ที่มีผู้ติดตามอายุ 25–34 ปี (กลุ่มพ่อแม่มือใหม่) ไม่ใช่อินฟลูฯ ที่ฐานแฟนส่วนใหญ่เป็นวัยรุ่น</P>

      <H3>5. Brand Fit – ความเข้ากันกับแบรนด์</H3>
      <P>สุดท้ายและสำคัญที่สุด คือการดูว่าอินฟลูฯ &quot;เข้ากับแบรนด์&quot; หรือไม่ เช่น</P>
      <UL items={[
        "เคยทำงานกับคู่แข่งมาก่อน",
        "Mood & Tone แตกต่างจากที่แบรนด์ต้องการ",
        "ภาพลักษณ์ไม่ตรงกับ Positioning ของแบรนด์",
      ]} />
      <P>การเลือกอินฟลูฯ ที่ไม่เหมาะ อาจสร้างความเสียหายต่อแบรนด์มากกว่าผลลัพธ์ที่ได้</P>

      <Divider />
      <H2>ตัวอย่างการใช้ Influencer Mapping Canvas</H2>
      <Note>
        <strong style={{ color: "#5f26e5" }}>Case Study:</strong> แบรนด์สกินแคร์ A เคยเลือกอินฟลูเอนเซอร์โดยดูแค่ Engagement Rate ปรากฏว่ายอดขายแทบไม่ขยับ เพราะอินฟลูฯ มีฐานแฟนเป็นวัยรุ่น แต่สินค้าเน้นกลุ่มผู้หญิงวัยทำงาน 25–35 ปี เมื่อปรับมาใช้ Influencer Mapping Canvas วิเคราะห์ใหม่ ผลลัพธ์คือเลือกอินฟลูฯ ที่มี Persona ดูน่าเชื่อถือ, Content Pillars ด้านการดูแลผิว, Value Alignment เรื่องคุณภาพ, Audience ส่วนใหญ่เป็นกลุ่มเป้าหมายจริง และ Brand Fit ชัดเจน → <strong style={{ color: "#5f26e5" }}>ยอดขายเพิ่มขึ้นกว่า 2 เท่าในแคมเปญถัดมา</strong>
      </Note>

      <Divider />
      <H2>เคล็ดลับเลือกอินฟลูเอนเซอร์ให้ปังในปี 2025</H2>
      <OL items={[
        <>วิเคราะห์จาก Data จริง → ใช้ Analytics และ Influencer Tools ไม่พึ่งแค่ความรู้สึก</>,
        <>เลือกคุณภาพมากกว่าปริมาณ → Micro/Nano Influencer อาจให้ผลลัพธ์ดีกว่า Macro ถ้าเข้ากลุ่มเป้าหมาย</>,
        <>สร้างความสัมพันธ์ระยะยาว → การทำงานแบบ Campaign เดียวจบ อาจไม่ยั่งยืนเท่าการสร้าง Partnership</>,
        <>วัดผลเสมอ → ตั้ง KPI ชัดเจน เช่น Engagement, Reach, Conversion ไม่ใช่แค่ Awareness</>,
      ]} />

      <Divider />
      <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
        <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>สรุป: Influencer Mapping Canvas 2025</h3>
        <P>การเลือกอินฟลูเอนเซอร์ที่ได้ผล ไม่ใช่การเลือก &quot;คนที่ดังที่สุด&quot; แต่ต้องเลือก &quot;คนที่ใช่ที่สุด&quot; สำหรับแบรนด์ Influencer Mapping Canvas จึงเป็นเครื่องมือสำคัญที่ช่วยวิเคราะห์ครบทุกมิติตั้งแต่ Persona, Content, Value, Audience จนถึง Brand Fit เพื่อให้แคมเปญ Influencer Marketing แม่นยำขึ้น คุ้มค่าขึ้น และสร้างผลลัพธ์ที่ยั่งยืนในปี 2025</P>
        <P>หากแบรนด์อยากชนะในเกม Influencer Marketing ต้องไม่เลือกตาม &quot;ความรู้สึก&quot; แต่ต้องเลือกตาม &quot;ข้อมูลและความเหมาะสม&quot;</P>
      </div>
    </>
  );
}

const SLUGS = ["best-time-to-post-2025", "tiktok-algorithm-9-techniques", "influencer-mapping-canvas"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = dict?.blogPosts || [];
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
        <Link href={`/${lang}/blog`} style={{
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
          Industry Insights
        </Link>
      </div>

      {/* Article */}
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section label */}
        <div style={{ paddingTop: "0", marginBottom: "28px" }}>
          <span style={{ ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>
            Industry Insights
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

          {post.slug === "tiktok-algorithm-9-techniques" ? (
            <TikTokContent lang={lang as Locale} />
          ) : post.slug === "best-time-to-post-2025" ? (
            <BestTimeContent lang={lang as Locale} />
          ) : post.slug === "influencer-mapping-canvas" ? (
            <InfluencerContent lang={lang as Locale} />
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
          <Link href={`/${lang}/blog/${nextPost.slug}`} style={{
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
    </div>
  );
}
