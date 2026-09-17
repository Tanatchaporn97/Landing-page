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
  "how-to-start-influencer-campaign": {
    th: "4 ขั้นตอนสำคัญก่อนเริ่ม Influencer Campaign ตั้งแต่การตั้ง Objective, กำหนด Target Audience, วาง Budget ไปจนถึงการคัดเลือก Influencer และทำ Brief",
    en: "4 essential steps before launching an Influencer Campaign — setting the Objective, defining the Target Audience, planning the Budget, and selecting influencers with a clear Brief.",
  },
  "how-to-choose-influencer-marketing-agency": {
    th: "7 เช็กลิสต์สำคัญก่อนเลือก Influencer Marketing Agency ตั้งแต่ Network, Case Study, การใช้ Data, Strategy, ราคาและ Scope งาน ไปจนถึงการรับมือปัญหาและ Report หลังแคมเปญ",
    en: "7 essential checks before choosing an Influencer Marketing Agency — network, case studies, data-driven selection, strategy, pricing and scope, problem handling, and post-campaign reporting.",
  },
  "how-to-find-the-right-influencer": {
    th: "รวมแหล่งค้นหา Influencer ทั้ง TikTok Creator Marketplace, Influencer Platform, Social Media Community และ Keyword Search พร้อม 4 เช็กลิสต์คัดกรองก่อนตัดสินใจร่วมงาน",
    en: "A roundup of where to find influencers — TikTok Creator Marketplace, Influencer Platforms, social media communities, and keyword search — plus 4 checks to run before you partner up.",
  },
  "influencer-marketing-budget-by-objective": {
    th: "สูตรแบ่งสัดส่วน Budget สำหรับ Influencer Marketing ตาม 3 Objective หลัก ยอดขาย ความน่าเชื่อถือ และ Brand Awareness พร้อมสัดส่วน KOC, Micro, Mid-Tier และ Macro ที่แนะนำ",
    en: "A budget-split formula for Influencer Marketing across 3 core objectives — sales, credibility, and brand awareness — with recommended KOC, Micro, Mid-Tier, and Macro ratios.",
  },
  "how-to-choose-influencer-checklist": {
    th: "4 เช็กลิสต์สำคัญก่อนจ้างอินฟลูเอนเซอร์ ตั้งแต่ความเชี่ยวชาญ คุณภาพ Community ความเข้ากันกับแบรนด์ ไปจนถึงความเป็นมืออาชีพ ช่วยแบรนด์เลือกคนที่ใช่ไม่ใช่แค่คนที่ Followers เยอะ",
    en: "4 essential checks before hiring an influencer — expertise, community quality, brand fit, and professionalism — so brands pick the right person, not just the one with the most followers.",
  },
  "instagram-2026-benchmark": {
    th: "สรุป Instagram Benchmark 2026 จาก Socialinsider พร้อม 4 อินไซต์สำคัญเรื่อง Carousel, Reels, Single Image และการเติบโตของ Followers พร้อมวิธีปรับกลยุทธ์",
    en: "A recap of Socialinsider's Instagram Benchmark 2026 report with 4 key insights on Carousels, Reels, Single Images, and follower growth — plus how to adjust your strategy.",
  },
  "content-per-platform-fb-tiktok-ig": {
    th: "ทำไมคอนเทนต์เดียวกันโพสต์ต่างช่องทางถึงได้ยอดต่างกัน? Buddy Review เจาะลึกวิธีปรับ Core Message ให้เข้ากับธรรมชาติของ Facebook, TikTok และ Instagram",
    en: "Why does the same content perform differently across channels? Buddy Review breaks down how to adapt one Core Message to fit Facebook, TikTok, and Instagram.",
  },
  "social-media-insight-2026": {
    th: "สรุปอินไซต์ Social Media ปี 2026 พร้อมแนวทางปรับคอนเทนต์ให้เหมาะกับ Facebook, Instagram, TikTok, YouTube, X และ Lemon8 สำหรับแบรนด์และครีเอเตอร์",
    en: "A 2026 social media insight recap with content guidance tailored to Facebook, Instagram, TikTok, YouTube, X, and Lemon8 for brands and creators.",
  },
  "content-strategy-canvas": {
    th: "รู้จัก Content Strategy Canvas เครื่องมือวางแผนคอนเทนต์แบบหน้าเดียว ที่ช่วยตอบ Purpose, Audience และ Execution ให้ชัดเจน เพิ่ม Reach และ Engagement ได้อย่างแม่นยำ",
    en: "Discover the Content Strategy Canvas — a one-page framework that clarifies Purpose, Audience, and Execution to plan content that actually reaches and engages the right people.",
  },
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
  "6-copywriting-techniques": {
    th: "รวม 6 เทคนิคการเขียน Copywriting ที่ทั้งโดนใจคนอ่านและอัลกอริทึม พร้อมตัวอย่างที่นำไปใช้ได้จริงในทุกแพลตฟอร์มโซเชียลมีเดีย",
    en: "6 copywriting techniques that win over both readers and algorithms, with real examples you can apply across every social media platform.",
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
  <Link href={`/${lang}/blog?cat=${encodeURIComponent(label)}`} style={{ ...KT, background: "#5f26e5", color: "#ffffff",
    borderRadius: "50px",
    fontSize: "14px", fontWeight: 600, padding: "8px 24px",
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

function StartCampaignContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Many people assume Influencer Marketing is just finding an interested influencer to review a product and post it on social media. But running an Influencer Campaign is actually a more complex process — from planning and setting an Objective, defining the Target, and planning the Budget, all the way to selecting influencers and writing a work Brief.</P>
        <P>Because if a brand starts by listing influencer names before knowing what result the campaign needs, you may end up with influencers who look right but don&apos;t actually serve the marketing goal. If you&apos;re about to start an Influencer Campaign, walk through these 4 steps.</P>

        <Divider />
        <H2>1. Set a clear Objective first</H2>
        <P>Before opening the search for influencers, you need to know what this campaign actually needs. Each type of goal leads to a different influencer selection and different KPIs, for example:</P>
        <UL items={[
          <><strong>Brand Awareness:</strong> you want people to know your brand or new product — you may focus on Reach and Views.</>,
          <><strong>Engagement &amp; Trust:</strong> you want to build engagement and credibility — you may look at Engagement, Comments, Shares, or Saves.</>,
          <><strong>Conversion:</strong> you want to drive sales — you may measure Clicks, Code Usage, Orders, or Conversion.</>,
        ]} />

        <H2>2. Define your Target Audience in more detail</H2>
        <P>Once you know what result you want, the next step is answering who you&apos;re actually talking to. Beyond age and gender, look into behavior and interests, such as:</P>
        <UL items={[
          "What are they interested in, or what problem can your product solve for them?",
          "Which Platform do they primarily use?",
          "What type of Content do they like to watch — reviews, How-tos, Entertainment, or Lifestyle?",
        ]} />
        <P>This information sharpens your influencer selection, because the goal isn&apos;t just finding influencers with a lot of followers — it&apos;s finding influencers whose Audience is close to your brand&apos;s actual customers.</P>

        <H2>3. Plan the Budget to align with your Objective</H2>
        <P>Once you know your Objective and Target, take the budget you have and plan what type of influencer to use and how to split the spend.</P>
        <P>If the focus is Conversion, you might spread the budget across several KOCs or Micro Influencers to produce multiple content formats, and use Affiliate or Tracking Links to help measure results.</P>
        <P>But if the focus is Awareness or Brand Image, you might weight the budget toward Macro or Mid-Tier influencers who can generate Reach and produce the campaign&apos;s core content, then use other influencer tiers to help extend the conversation further.</P>
        <P>Beyond influencer fees, don&apos;t forget to budget for other costs too — Production, Paid Media, Usage Rights, Affiliate Commission, and Campaign Management — since all of these can also be part of a campaign&apos;s cost.</P>

        <H2>4. Select influencers and write the Brief</H2>
        <P>Once you have all the information ready, you move into the Select &amp; Brief stage. Start by screening influencers on Audience, Content Performance, Engagement, brand fit, and past work history — you shouldn&apos;t decide based on Follower count alone.</P>
        <P>Then write a clear Brief covering what the brand wants to communicate — including the Key Message, what should be said, what to avoid, Deliverables, Timeline, and Tracking.</P>
        <P>But a good Brief shouldn&apos;t be written in so much detail that the influencer has to repeat every word verbatim — because an influencer&apos;s strength is telling the same story in language that fits their own Audience. So the key principle is: define the Message clearly, but leave room for the influencer to choose how to tell it.</P>

        <Divider />
        <H2>So what happens after these 4 steps?</H2>
        <P>Once the Objective, Target, Budget, and influencers are ready, the work isn&apos;t over — the next step is managing the Campaign so the content comes out according to plan.</P>
        <P>From sending products and Briefs, tracking the Timeline, reviewing Drafts, coordinating revisions, all the way to tracking results after posting and compiling the data into a Report.</P>
        <P>This is why good Influencer Marketing doesn&apos;t start with &quot;finding someone to post for us&quot; — it starts with clearly laying out the Campaign Structure first.</P>
        <P><strong style={{ color: "#5f26e5" }}>Because once you know why you&apos;re doing this, who you&apos;re talking to, how you&apos;re spending the budget, and who you&apos;ve chosen to help communicate, everything left becomes much easier to plan and measure.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>หลายคนอาจคิดว่า Influencer Marketing คือการหา Influencer ที่สนใจมารีวิวสินค้าแล้วโพสต์ลง Social Media แต่จริงๆ แล้ว การทำ Influencer Campaign มีขั้นตอนที่ซับซ้อนกว่านั้น ตั้งแต่วางแผนตั้ง Objective กำหนด Target วาง Budget ไปจนถึงการเลือก Influencer และสร้าง Brief งาน</P>
      <P>เพราะถ้าแบรนด์เริ่มจากการลิสต์ชื่อ Influencer ก่อนโดยยังไม่รู้ว่าแคมเปญต้องการผลลัพธ์อะไร สุดท้ายอาจได้ Influencer ที่ดูเหมาะ แต่ไม่ตอบโจทย์ทางการตลาด ถ้ากำลังจะเริ่มทำ Influencer Campaign ลองไล่ตาม 4 ขั้นตอนนี้ได้เลย</P>

      <Divider />
      <H2>1. ตั้ง Objective ให้ชัดก่อน</H2>
      <P>ก่อนเปิดหา Influencer ต้องรู้ก่อนว่า แคมเปญนี้ต้องการอะไร เป้าหมายแต่ละแบบจะนำไปสู่การเลือก Influencer และ KPI ที่ต่างกัน เช่น</P>
      <UL items={[
        <><strong>Brand Awareness:</strong> ต้องการให้คนรู้จักแบรนด์หรือสินค้าใหม่ อาจเน้น Reach และ Views</>,
        <><strong>Engagement &amp; Trust:</strong> ต้องการสร้างการมีส่วนร่วมและความน่าเชื่อถือ อาจดู Engagement, Comments, Shares หรือ Saves</>,
        <><strong>Conversion:</strong> ต้องการกระตุ้นยอดขาย อาจวัดจาก Clicks, Code Usage, Orders หรือ Conversion</>,
      ]} />

      <H2>2. กำหนด Target Audience ให้ละเอียดขึ้น</H2>
      <P>เมื่อรู้ว่าอยากได้ผลลัพธ์อะไร ขั้นต่อมาคือการตอบให้ได้ว่าเรากำลังสื่อสารกับใคร นอกจากอายุและเพศแล้ว ควรดูไปถึงพฤติกรรมและความสนใจ เช่น</P>
      <UL items={[
        "สนใจเรื่องอะไร หรือมีปัญหาอะไรที่สินค้าของเราช่วยแก้ได้",
        "ใช้ Platform ไหนเป็นหลัก",
        "ชอบดู Content รูปแบบไหน เช่น รีวิว, How-to, Entertainment หรือ Lifestyle",
      ]} />
      <P>ข้อมูลเหล่านี้จะช่วยให้การเลือก Influencer แม่นขึ้น เพราะเป้าหมายไม่ใช่แค่หา Influencer ที่มีคนติดตามเยอะ แต่ต้องหา Influencer ที่มี Audience ใกล้กับลูกค้าของแบรนด์</P>

      <H2>3. วาง Budget ให้สอดคล้องกับ Objective</H2>
      <P>เมื่อรู้ Objective และ Target แล้ว ค่อยนำ Budget ที่มีมาวางแผนว่าควรใช้ Influencer แบบไหน และกระจายงบอย่างไร</P>
      <P>ถ้าเน้น Conversion อาจกระจายไปยัง KOC หรือ Micro Influencer หลายคน เพื่อสร้างคอนเทนต์หลายรูปแบบและใช้ Affiliate หรือ Tracking Link ช่วยวัดผล</P>
      <P>แต่ถ้าเน้น Awareness หรือ Brand Image อาจให้น้ำหนักกับ Macro หรือ Mid-Tier Influencer ที่สามารถสร้าง Reach และผลิตคอนเทนต์หลักของแคมเปญได้ แล้วใช้ Influencer กลุ่มอื่นช่วยขยายการพูดถึงเพิ่มเติม</P>
      <P>นอกจากค่าตัว Influencer อย่าลืมเผื่องบส่วนอื่นด้วย เช่น Production, Paid Media, Usage Rights, Affiliate Commission และ Campaign Management เพราะทั้งหมดนี้อาจเป็นต้นทุนของแคมเปญเช่นกัน</P>

      <H2>4. คัดเลือก Influencer และทำ Brief</H2>
      <P>เมื่อมีข้อมูลพร้อมแล้ว จึงเข้าสู่ขั้นตอน Select &amp; Brief เริ่มจากคัด Influencer โดยดูทั้ง Audience, Content Performance, Engagement, ความเหมาะสมกับ Brand และประวัติการทำงานที่ผ่านมา ไม่ควรตัดสินจาก Followers เพียงตัวเลขเดียว</P>
      <P>จากนั้นทำ Brief ให้ชัดว่าแบรนด์ต้องการสื่อสารอะไร โดยควรมี Key Message, สิ่งที่ต้องพูด, สิ่งที่ควรหลีกเลี่ยง, Deliverables, Timeline และ Tracking ให้ครบ</P>
      <P>แต่ Brief ที่ดีไม่ควรเขียนละเอียดจน Influencer ต้องพูดตามทุกคำ เพราะจุดแข็งของ Influencer คือการนำเรื่องเดียวกันไปเล่าในภาษาที่เข้ากับ Audience ของตัวเอง ดังนั้น หลักคิดที่สำคัญคือกำหนด Message ให้ชัด แต่เปิดพื้นที่ให้ Influencer เลือกวิธีเล่า</P>

      <Divider />
      <H2>แล้วหลังจาก 4 Steps นี้ต้องทำอะไรต่อ?</H2>
      <P>เมื่อ Objective, Target, Budget และ Influencer พร้อมแล้ว งานยังไม่จบ เพราะขั้นต่อไปคือการบริหาร Campaign ให้คอนเทนต์ออกมาตามแผน</P>
      <P>ตั้งแต่การส่งสินค้าและ Brief, ติดตาม Timeline, ตรวจ Draft, ประสานงานแก้ไข ไปจนถึงติดตามผลหลังโพสต์และรวบรวมข้อมูลมาทำ Report</P>
      <P>นี่จึงเป็นเหตุผลว่าทำไม Influencer Marketing ที่ดีไม่ได้เริ่มจากการ &quot;หาคนมาช่วยโพสต์&quot; แต่เริ่มจากการวาง Campaign Structure ให้ชัดก่อน</P>
      <P><strong style={{ color: "#5f26e5" }}>เพราะเมื่อรู้ว่า ทำไปเพื่ออะไร, พูดกับใคร, ใช้งบอย่างไร และเลือกใครมาช่วยสื่อสาร ขั้นตอนที่เหลือก็จะวางแผนและวัดผลได้ง่ายขึ้นมาก</strong></P>
    </>
  );
}

function ChooseAgencyContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>When a campaign involves dozens or hundreds of influencers, sourcing them, reaching out, sending Briefs, chasing deliverables, reviewing Drafts, and pulling together a Report yourself can turn into a much bigger job than your marketing team expected.</P>
        <P>That&apos;s why many brands choose to work with an Influencer Marketing Agency — but choosing an agency isn&apos;t just about &quot;do they have a lot of influencers?&quot; Every agency has a different way of working and a different area of expertise.</P>
        <P>Before deciding to hire one, run through these 7 checks to see how well the agency you&apos;re talking to can actually deliver on your campaign.</P>

        <Divider />
        <H2>7 checklists to review before choosing an Influencer Marketing Agency</H2>

        <H3>1. How diverse is their influencer selection?</H3>
        <P>The first thing to look at is the agency&apos;s Network and Database — what range of influencers do they cover, from Nano and Micro to Macro and Mega — and do they have influencers in categories relevant to your business? A long list of names alone isn&apos;t as important as having people who genuinely match your brand&apos;s Target.</P>

        <H3>2. Have they run campaigns similar to yours?</H3>
        <P>Ask to see past Case Studies, especially work with an Objective, Target, or Industry close to your brand&apos;s. Beyond the Performance numbers, look at how the agency chose influencers and designed the campaign — a good Case Study should show you how the agency solved a marketing problem, not just how many views a campaign got.</P>

        <H3>3. Do they use Data to help select influencers?</H3>
        <P>An agency doing Influencer Marketing shouldn&apos;t pick influencers based on familiarity or follower count alone.</P>
        <P>They should have data that helps analyze Audience, Engagement, Content Performance, and fit with the Target — and check for anomalies in the data, like Audience Quality or Engagement that doesn&apos;t line up with the follower count. Data gives influencer selection a stronger rationale behind it.</P>

        <H3>4. Do they help shape Strategy, or just take the Brief and go find people?</H3>
        <P>This one matters a lot, because an agency&apos;s job shouldn&apos;t end at just receiving a brief. See whether the agency can actually help answer which Platform to use, what tier of influencer, how to split the Budget, and how Content should be designed to serve the campaign&apos;s Objective.</P>
        <P>If an agency can push back on the Brief and offer better alternatives, that reflects that they&apos;re helping solve a marketing problem — not just acting as a middleman to reach influencers.</P>

        <H3>5. Is pricing and scope of work clear?</H3>
        <P>Before starting, get clear details on exactly what the budget covers — Influencer Fee, Management Fee, Production, Usage Rights, or Paid Media.</P>
        <P>You also need to know which steps the agency actually handles — contacting influencers, sending Briefs, reviewing Drafts, tracking posts, and compiling a Report — and whether those are included in the management fee. Seeing a price alone isn&apos;t enough; you need to see what that budget actually gets you.</P>

        <H3>6. If something goes wrong, how do they handle it?</H3>
        <P>Influencer work doesn&apos;t go smoothly on every campaign. Sometimes an influencer misses a deadline, a Draft needs several rounds of revision, or something happens that forces a change of plan.</P>
        <P>An agency should have a process for tracking work and handling issues, along with a backup plan for when an influencer can&apos;t deliver on the Timeline. You may not see this during the Pitch, but it becomes very clear once real work starts.</P>

        <H3>7. What can the post-campaign Report actually tell you?</H3>
        <P>A good Report shouldn&apos;t stop at Follower count, Reach, Views, and Engagement.</P>
        <P>It should also show which influencer or which type of Content performed well, and why — plus KPIs tied to the Objective, such as Cost per Engagement, Cost per View, Clicks, or Conversion, if the campaign has Tracking in place.</P>

        <Divider />
        <P>If it&apos;s a small campaign using only a few influencers and your team has the time, managing it yourself may not be difficult. But once the number of influencers grows, or a campaign needs Strategy, Data, Content Management, and Reporting all at once, bringing in an agency can take a lot of the load off your team.</P>
      </>
    );
  }
  return (
    <>
      <P>เมื่อแคมเปญมี Influencer หลักสิบหรือหลักร้อยคน การค้นหา ติดต่อ ส่ง Brief ตามงาน ตรวจ Draft และรวบรวม Report ด้วยตัวเองอาจกลายเป็นงานใหญ่ที่กินเวลาทีมการตลาดมากกว่าที่คิด</P>
      <P>นี่จึงเป็นเหตุผลที่หลายแบรนด์เลือกทำงานกับ Influencer Marketing Agency แต่การเลือก Agency ก็ไม่ได้ดูแค่ว่า &quot;มี Influencer เยอะไหม&quot; เพราะแต่ละเจ้ามีวิธีทำงานและความเชี่ยวชาญที่แตกต่างกัน</P>
      <P>ก่อนตัดสินใจจ้าง ลองเช็ก 7 เรื่องนี้ เพื่อดูว่า Agency ที่กำลังคุยอยู่สามารถตอบโจทย์แคมเปญของเราได้มากแค่ไหน</P>

      <Divider />
      <H2>7 เช็กลิสต์ที่ควรดู ก่อนเลือก Influencer Marketing Agency</H2>

      <H3>1. มี Influencer ให้เลือกหลากหลายแค่ไหน?</H3>
      <P>สิ่งแรกที่ควรดูคือ Network และ Database ของ Agency ว่าครอบคลุม Influencer แบบไหนบ้าง ตั้งแต่ Nano, Micro ไปจนถึง Macro และ Mega รวมถึงมี Influencer ใน Category ที่เกี่ยวข้องกับธุรกิจของเราหรือไม่ เพราะการมีรายชื่อจำนวนมากอย่างเดียวไม่ได้สำคัญเท่ากับการมีคนที่ตรงกับ Target ของแบรนด์จริงๆ</P>

      <H3>2. เคยทำแคมเปญที่ใกล้เคียงกับเราหรือไม่?</H3>
      <P>ขอดู Case Study ที่ผ่านมา โดยเฉพาะงานที่มี Objective, Target หรือ Industry ใกล้เคียงกับแบรนด์เรา นอกจากดูตัวเลข Performance แล้ว ลองดูด้วยว่า Agency มีวิธีเลือก Influencer และออกแบบ Campaign อย่างไร เพราะ Case Study ที่ดีควรทำให้เราเห็นได้ว่า Agency แก้โจทย์ทางการตลาดอย่างไร ไม่ใช่แค่แคมเปญได้ยอดวิวเท่าไหร่</P>

      <H3>3. ใช้ Data ช่วยเลือก Influencer หรือไม่?</H3>
      <P>Agency ที่ทำ Influencer Marketing ไม่ควรเลือก Influencer จากความคุ้นชื่อหรือจำนวน Followers เพียงอย่างเดียว</P>
      <P>ควรมีข้อมูลที่ช่วยวิเคราะห์ทั้ง Audience, Engagement, Content Performance และความเหมาะสมกับ Target รวมถึงตรวจสอบความผิดปกติของข้อมูล เช่น Audience Quality หรือ Engagement ที่ไม่สอดคล้องกับยอดผู้ติดตาม เพราะ Data ช่วยให้การเลือก Influencer มีเหตุผลรองรับมากขึ้น</P>

      <H3>4. ช่วยคิด Strategy หรือแค่รับ Brief ไปหาคน?</H3>
      <P>ข้อนี้สำคัญมาก เพราะหน้าที่ของ Agency ไม่ควรจบแค่การรับบรีฟ ลองดูว่า Agency สามารถช่วยตอบได้หรือไม่ว่าควรใช้ Platform ไหน, Influencer ระดับไหน, ควรแบ่ง Budget อย่างไร และควรออกแบบ Content ให้ตอบ Objective ของแคมเปญอย่างไร</P>
      <P>ถ้า Agency สามารถช่วยตั้งคำถามกับ Brief และเสนอทางเลือกที่ดีขึ้นได้ นั่นสะท้อนว่าเขาเข้ามาช่วยแก้โจทย์การตลาด ไม่ได้เป็นเพียงคนกลางในการติดต่อ Influencer</P>

      <H3>5. ราคาและ Scope งานชัดเจนหรือไม่?</H3>
      <P>ก่อนเริ่มงานควรขอรายละเอียดค่าใช้จ่ายให้ชัดเจนว่า Budget ครอบคลุมอะไรบ้าง เช่น Influencer Fee, Management Fee, Production, Usage Rights หรือ Paid Media</P>
      <P>รวมถึงต้องรู้ว่า Agency ดูแลถึงขั้นตอนไหน เช่น ติดต่อ Influencer, ส่ง Brief, ตรวจ Draft, ติดตามโพสต์ และสรุป Report รวมอยู่ในค่าบริหารจัดการหรือไม่ การเห็นราคาอย่างเดียวจึงยังไม่พอ ต้องดูด้วยว่า สิ่งที่ได้จาก Budget นั้นมีอะไรบ้าง</P>

      <H3>6. ถ้าเกิดปัญหา มีทีมจัดการอย่างไร?</H3>
      <P>งาน Influencer ไม่ได้ราบรื่นทุกแคมเปญ บางครั้ง Influencer ส่งงานไม่ทัน แก้ Draft หลายรอบ หรือมีเหตุการณ์ที่ทำให้ต้องเปลี่ยนแผน</P>
      <P>Agency จึงควรมี Process สำหรับติดตามงานและจัดการปัญหา รวมถึงมีแผนสำรองเมื่อ Influencer ไม่สามารถทำงานตาม Timeline ได้ เรื่องนี้อาจไม่เห็นในตอน Pitch แต่จะเห็นชัดมากเมื่อเริ่มทำงานจริง</P>

      <H3>7. Report หลังจบแคมเปญบอกอะไรเราได้บ้าง?</H3>
      <P>Report ที่ดีไม่ควรมีแค่ยอด Followers, Reach, Views และ Engagement แล้วจบ</P>
      <P>ควรดูด้วยว่า Influencer คนไหนหรือ Content แบบไหนทำผลงานได้ดี เพราะอะไร รวมถึง KPI ที่เกี่ยวข้องกับ Objective เช่น Cost per Engagement, Cost per View, Clicks หรือ Conversion หากแคมเปญมีการ Tracking</P>

      <Divider />
      <P>ถ้าเป็นแคมเปญเล็กที่ใช้ Influencer ไม่กี่คนและทีมมีเวลา การจัดการเองอาจทำได้ไม่ยาก แต่เมื่อจำนวน Influencer เพิ่มขึ้น หรือแคมเปญต้องใช้ทั้ง Strategy, Data, Content Management และ Reporting การมี Agency เข้ามาช่วยก็สามารถลดภาระของทีมได้มาก</P>
    </>
  );
}

function FindInfluencerContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>When it&apos;s time to run Influencer Marketing, the first question many brands ask isn&apos;t &quot;how much budget do we need?&quot; — it&apos;s &quot;where do we even find an influencer?&quot;</P>
        <P>Because today, influencers are everywhere, but finding someone who makes great content doesn&apos;t always mean they&apos;re the right fit for your brand. Choosing based on follower count or likes alone can leave a campaign with pretty numbers that never actually reach the customers you wanted.</P>
        <P>So finding a good influencer should start with choosing the right sourcing channel, all the way through to screening the data before you decide to hire.</P>

        <Divider />
        <H2>So where can you actually find influencers?</H2>

        <H3>TikTok Creator Marketplace and platform-native tools</H3>
        <P>If you want data straight from the platform, tools like TikTok Creator Marketplace let brands search influencers by Category and view data on Performance and Audience.</P>
        <P>The upside is that your search starts from real data rather than just scrolling the Feed. It suits brands that want to filter influencers by target audience and specific numbers.</P>

        <H3>Influencer Platforms and Agencies</H3>
        <P>If a campaign needs a large number of influencers, or your team doesn&apos;t have time to search and reach out on their own, using an Influencer Platform or Agency is another option.</P>
        <P>Beyond having an influencer database, some services also help with selection, outreach, coordination, content review, and campaign wrap-up reports — so your brand team doesn&apos;t have to manage every step alone. Buddy Review offers this service too — if you&apos;d like us to manage your influencer campaign, feel free to reach out.</P>

        <H3>Social media and communities</H3>
        <P>For finding a large volume of Nano influencers or KOCs, searching Facebook Groups, TikTok, or communities related to your product&apos;s category is still an effective method.</P>
        <P>The upside is a real chance of finding people genuinely within a niche interest group — the trade-off is your team needs to spend more time screening profiles and verifying information themselves.</P>

        <H3>Searching by keyword and hashtag</H3>
        <P>Another method many brands overlook is searching by keywords related to the product. This helps you find influencers already creating content in the same category as your brand — and sometimes you&apos;ll even find someone who&apos;s already talked about your product or brand before.</P>

        <Divider />
        <H2>2. Found some influencers — what should you check next?</H2>
        <P>Having a long list of influencers doesn&apos;t mean you have good options — the real key step is screening for people who match your campaign&apos;s Objective and Target.</P>

        <H3>1. Look at Audience before Followers</H3>
        <P>Followers tell you how famous someone is, but not whether that group is who your brand actually wants. Look into Audience data — age, gender, country or region, and interests. If the platform provides deeper data, factor that into your decision too.</P>

        <H3>2. Look at Engagement and the quality of who&apos;s engaging</H3>
        <P>Don&apos;t just look at Like counts — read the Comments and look at Shares, Saves, or Views as well.</P>
        <P>What matters more than the total numbers is how genuinely engaged viewers are with the influencer — and you shouldn&apos;t rely on a single Engagement Rate figure as your criteria, since each platform, category, and follower size has its own benchmark.</P>

        <H3>3. Check whether their content actually fits your brand</H3>
        <P>Go back through at least 10–20 of their past posts and ask yourself: if you swapped the product in the clip for your brand, would it still feel natural?</P>
        <P>Look at their tone of voice, language, filming style, and storytelling — because an influencer who fits your brand doesn&apos;t need to recite a script perfectly; they should be able to carry your brand&apos;s message in their own style.</P>

        <H3>4. Check their work history and credibility</H3>
        <P>Look into what kinds of brands they&apos;ve worked with before, whether they&apos;ve taken on too many similar/competing jobs, and whether their past Sponsored Content has been consistently good quality.</P>
      </>
    );
  }
  return (
    <>
      <P>เวลาจะทำ Influencer Marketing คำถามแรกที่หลายแบรนด์ตั้งคำถามอาจไม่ใช่จะใช้งบเท่าไหร่? แต่คือ แล้วจะหา Influencer จากไหน?</P>
      <P>เพราะวันนี้มี Influencer อยู่เต็มไปหมด แต่การเจอคนที่ทำคอนเทนต์เก่ง ไม่ได้แปลว่าจะเป็นคนที่เหมาะกับแบรนด์เสมอไป ยิ่งเลือกจากแค่ยอด Followers หรือยอดไลก์ ก็มีโอกาสที่แคมเปญจะได้ตัวเลขสวย แต่ไม่ถึงกลุ่มลูกค้าที่ต้องการ</P>
      <P>ดังนั้น การหา Influencer ที่ดีควรเริ่มตั้งแต่เลือกแหล่งค้นหา ไปจนถึงการคัดกรองข้อมูลก่อนตัดสินใจจ้าง</P>

      <Divider />
      <H2>แล้วเราจะหา Influencer จากที่ไหนได้บ้าง?</H2>

      <H3>TikTok Creator Marketplace และเครื่องมือของแพลตฟอร์ม</H3>
      <P>ถ้าต้องการข้อมูลจาก Platform โดยตรง เครื่องมืออย่าง TikTok Creator Marketplace ช่วยให้แบรนด์ค้นหา Influencer ตาม Category และดูข้อมูลเกี่ยวกับ Performance และ Audience ได้</P>
      <P>ข้อดีคือช่วยให้การค้นหาเริ่มจากข้อมูลมากกว่าการไล่หาจากหน้า Feed เพียงอย่างเดียว เหมาะกับแบรนด์ที่ต้องการคัด Influencer ตามกลุ่มเป้าหมายและตัวเลขที่กำหนดไว้</P>

      <H3>Influencer Platform และ Agency</H3>
      <P>ถ้าแคมเปญต้องใช้ Influencer จำนวนมาก หรือทีมไม่มีเวลาค้นหาและติดต่อเอง การใช้ Influencer Platform หรือ Agency ก็เป็นอีกทางเลือกหนึ่ง</P>
      <P>นอกจากมีฐานข้อมูล Influencer แล้ว บางบริการยังช่วยเรื่องการคัดเลือก ติดต่อ ประสานงาน ตรวจงาน และสรุปผลแคมเปญ ทำให้ทีมแบรนด์ไม่ต้องจัดการทุกขั้นตอนด้วยตัวเอง อย่าง Buddy Review เองก็มีบริการนี้เหมือนกันนะ หากต้องการให้เราจัดการแคมเปญอินฟลูเอนเซอร์ก็ติดต่อเราได้เลย</P>

      <H3>Social Media และ Community</H3>
      <P>สำหรับการหา Nano Influencer หรือ KOC จำนวนมาก การเข้าไปค้นหาจาก Facebook Groups, TikTok หรือ Community ที่เกี่ยวข้องกับ Category ของสินค้า ก็ยังเป็นวิธีที่ใช้ได้</P>
      <P>ข้อดีคือมีโอกาสเจอคนที่อยู่ในกลุ่มความสนใจเฉพาะทางจริงๆ แต่ข้อแลกเปลี่ยนคือทีมต้องใช้เวลาคัดกรองโปรไฟล์และตรวจสอบข้อมูลเองมากขึ้น</P>

      <H3>Search จาก Keyword และ Hashtag</H3>
      <P>อีกวิธีที่หลายแบรนด์มองข้ามคือการค้นหาจาก Keyword ที่เกี่ยวข้องกับสินค้า วิธีนี้ช่วยให้เจอ Influencer ที่กำลังทำคอนเทนต์เกี่ยวกับ Category เดียวกับแบรนด์อยู่แล้ว และบางครั้งอาจเจอคนที่เคยพูดถึงสินค้าหรือแบรนด์มาก่อนด้วย</P>

      <Divider />
      <H2>2. เจอ Influencer แล้ว ต้องเช็กอะไรบ้าง?</H2>
      <P>การมีรายชื่อ Influencer จำนวนมากไม่ได้แปลว่าเรามีตัวเลือกที่ดี เพราะขั้นตอนสำคัญจริงๆ คือการคัดคนที่ตรงกับ Objective และ Target ของแคมเปญ</P>

      <H3>1. ดู Audience ก่อนดู Followers</H3>
      <P>Followers บอกได้ว่าคนๆ นั้นดังแค่ไหน แต่ไม่ได้บอกว่าคนกลุ่มนั้นคือคนที่แบรนด์ต้องการหรือไม่ ลองดูข้อมูล Audience ทั้งอายุ เพศ ประเทศหรือพื้นที่ และความสนใจ หากมีข้อมูลเชิงลึกจาก Platform ให้ใช้ประกอบการตัดสินใจด้วย</P>

      <H3>2. ดู Engagement และคุณภาพของคนที่เข้ามามีส่วนร่วม</H3>
      <P>อย่าดูแค่ยอด Likes แต่ลองอ่าน Comments และดู Shares, Saves หรือ Views ประกอบด้วย</P>
      <P>สิ่งที่น่าสนใจกว่าตัวเลขรวมคือ คนดูมีส่วนร่วมกับ Influencer มากน้อยแค่ไหน และไม่ควรใช้ค่า Engagement Rate ตัวเลขเดียวเป็นเกณฑ์ตัดสิน เพราะแต่ละ Platform หรือ Category และขนาด Followers ต่างมี Benchmark ที่แตกต่างกัน</P>

      <H3>3. ดูว่า Content ของเขาเข้ากับ Brand ไหม</H3>
      <P>ลองย้อนดูคอนเทนต์ที่ผ่านมาอย่างน้อย 10–20 โพสต์ แล้วถามตัวเองว่า ถ้าเปลี่ยนสินค้าในคลิปมาเป็นแบรนด์ของเรามันจะยังดูเป็นธรรมชาติอยู่ไหม</P>
      <P>ดูทั้งวิธีพูด ภาษาที่ใช้ วิธีถ่าย และวิธีเล่าเรื่อง เพราะ Influencer ที่เหมาะกับแบรนด์ไม่จำเป็นต้องพูดตาม Script ได้เป๊ะที่สุด แต่ควรสามารถนำ Message ของแบรนด์ไปเล่าในสไตล์ของตัวเองได้</P>

      <H3>4. เช็กประวัติการรับงานและความน่าเชื่อถือ</H3>
      <P>ลองดูว่าเคยร่วมงานกับแบรนด์ประเภทไหนบ้าง มีการรับงานที่ใกล้เคียงกันมากเกินไปหรือไม่ และที่ผ่านมาโพสต์ Sponsored Content มีคุณภาพสม่ำเสมอหรือเปล่า</P>
    </>
  );
}

function InfluencerBudgetContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>When a brand wants to run an Influencer Marketing campaign, the first question is always: how much budget should we set? In truth, there&apos;s no fixed number, because the right budget depends on the goal, the product, the target audience, and what you want the influencer to actually do.</P>
        <P>So instead of starting with &quot;how much budget do we have?&quot;, start with &quot;what result does this campaign need?&quot; — then work backward to set the Budget and choose influencers that fit the Objective. Buddy Review walks through formulas for splitting your budget so it&apos;s as cost-effective and on-target as possible.</P>

        <Divider />
        <H2>1. If the goal is Conversion &amp; Sales</H2>
        <P>For e-commerce or products that need to drive purchases directly, putting the whole budget into just a few big influencers may not work as well as spreading it across influencers at multiple tiers.</P>
        <Note>Recommended split: KOC &amp; Nano (60%), reserved for Paid ads (30%), Micro (10%)</Note>
        <P>This approach focuses on generating a large volume of content from smaller influencers, which can be run as paid work, Barter, or Affiliate to add extra motivation tied to actual sales.</P>
        <P>The Paid Media budget should go toward amplifying content that&apos;s already performing well — for example, boosting a clip that&apos;s already driving sales or Engagement — rather than spreading spend equally across every piece.</P>

        <H2>2. If the goal is Trust &amp; Engagement</H2>
        <P>Suited to products that need a longer decision time or carry a higher price tag, such as skincare, supplements, clinics, or IT products.</P>
        <Note>Recommended split: Micro (50%), Mid-Tier (40%), content promotion (10%)</Note>
        <P>The key here is choosing influencers with genuine expertise or experience in the product&apos;s category. Even without a huge follower count, if the follower base matches your customers and real conversation is happening, it can build more credibility than a high-Reach influencer with no real connection to the product.</P>
        <P>Another thing not to overlook: give enough time for the influencer to actually try the product, since reviews from real experience tend to feel more natural and detailed than content rushed to match a Brief.</P>

        <H2>3. If the goal is Brand Awareness</H2>
        <P>If you&apos;re launching a new product or want a big campaign that gets the whole city talking, this calls for major influencers to create real Impact.</P>
        <Note>Recommended split: Macro &amp; Mega (60%), Mid-Tier (30%), KOC (10%)</Note>
        <P>Most of the budget goes to top-tier influencers who serve as the Hero Content or Key Voice of the campaign, while Mid-Tier and KOC help extend the conversation from other angles, so the campaign isn&apos;t left resting on just a handful of famous names.</P>
        <P>But the key thing is not to look at follower count alone, because good Awareness isn&apos;t just about a lot of people seeing it — you also need to check whether the people seeing it are actually your brand&apos;s target audience.</P>

        <Divider />
        <P>In summary, there&apos;s no minimum budget for Influencer Marketing that works for every brand, because a campaign using 10 influencers to drive sales naturally has a different budget structure than one using 1–2 influencers to build Awareness.</P>
        <P>If you want sales, you may need to focus on volume and Performance. If you want credibility, you may need to weight toward influencers with genuine expertise. And if you want to build Awareness, you need to budget for influencers who can create real Impact.</P>
        <P><strong style={{ color: "#5f26e5" }}>Because cost-effective Influencer Marketing isn&apos;t about putting your whole budget into the biggest name — it&apos;s about allocating the budget to fit what the brand actually wants to happen.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>เวลาแบรนด์อยากทำแคมเปญ Influencer Marketing คำถามแรกคือ ต้องวางงบเท่าไหร่? จริงๆ แล้วคือไม่มีตัวเลขตายตัว เพราะงบที่เหมาะสมขึ้นอยู่กับทั้งเป้าหมาย สินค้า กลุ่มเป้าหมาย และสิ่งที่ต้องการให้ Influencer ทำ</P>
      <P>ดังนั้นแทนที่จะเริ่มจากคำถามว่ามีงบเท่าไหร่? ลองเริ่มจากแคมเปญนี้ต้องการผลลัพธ์อะไร? แล้วค่อยย้อนกลับมาวาง Budget และเลือก Influencer ให้เหมาะกับ Objective โดย Buddy Review จะพามาดูสูตรการแบ่งสัดส่วน Budget ให้คุ้มค่าและตรงเป้าที่สุดกันครับ</P>

      <Divider />
      <H2>1. ถ้าเป้าหมายเน้นยอดขาย (Conversion &amp; Sales)</H2>
      <P>สำหรับ E-commerce หรือสินค้าที่ต้องการกระตุ้นการซื้อโดยตรง การใช้งบทั้งหมดกับ Influencer รายใหญ่เพียงไม่กี่คน อาจไม่ได้ตอบโจทย์เท่ากับการกระจายงบไปยัง Influencer หลายระดับ</P>
      <Note>สัดส่วนงบแนะนำ: KOC &amp; Nano (60%), กันงบไว้ยิงแอด (30%), Micro (10%)</Note>
      <P>วิธีนี้เน้นสร้างคอนเทนต์จำนวนมากจาก Influencer ไซส์เล็ก ซึ่งสามารถใช้ทั้งการจ้างงาน, Barter หรือ Affiliate เพื่อเพิ่มแรงจูงใจจากยอดขายจริงได้</P>
      <P>ส่วนงบ Paid Media ควรใช้สำหรับนำคอนเทนต์ที่มี Performance ดีอยู่แล้วมาต่อยอด เช่น การนำคลิปที่สร้างยอดขายหรือ Engagement ได้ดีไปทำโฆษณาเพิ่มเติม แทนที่จะกระจายงบเท่ากันทุกชิ้น</P>

      <H2>2. ถ้าเป้าหมายเน้นความน่าเชื่อถือ (Trust &amp; Engagement)</H2>
      <P>เหมาะกับสินค้าที่ต้องใช้เวลาตัดสินใจ หรือมีราคาสูง เช่น สกินแคร์ อาหารเสริม คลินิก หรือสินค้าไอที</P>
      <Note>สัดส่วนงบแนะนำ: Micro (50%), Mid-Tier (40%), โปรโมตคอนเทนต์ (10%)</Note>
      <P>หัวใจสำคัญจึงอยู่ที่การเลือก Influencer ที่มีความเชี่ยวชาญหรือมีประสบการณ์ตรงกับ Category ของสินค้า แม้จะมี Followers ไม่ได้สูงมาก แต่ถ้ากลุ่มผู้ติดตามตรงกับลูกค้าและมีการพูดคุยกันจริง ก็สามารถสร้างความน่าเชื่อถือได้มากกว่า Influencer ที่มี Reach สูงแต่ไม่เกี่ยวข้องกับสินค้า</P>
      <P>อีกเรื่องที่ไม่ควรมองข้ามคือ เวลาในการทดลองใช้สินค้า เพราะรีวิวที่เกิดจากประสบการณ์จริงมักมีรายละเอียดที่เป็นธรรมชาติมากกว่าคอนเทนต์ที่ต้องรีบพูดตาม Brief</P>

      <H2>3. ถ้าเป้าหมายเน้นสร้างภาพจำและสร้างกระแส (Brand Awareness)</H2>
      <P>หากเพิ่งเปิดตัวสินค้าใหม่ หรืออยากทำแคมเปญใหญ่ให้คนพูดถึงทั้งเมือง งานนี้ต้องพึ่งอินฟลูฯ เบอร์ใหญ่เพื่อสร้าง Impact</P>
      <Note>สัดส่วนงบแนะนำ: Macro &amp; Mega (60%), Mid-Tier (30%), KOC (10%)</Note>
      <P>งบส่วนใหญ่จะใช้กับ Influencer ระดับใหญ่เพื่อทำหน้าที่เป็น Hero Content หรือ Key Voice ของแคมเปญ ขณะที่ Mid-Tier และ KOC สามารถช่วยขยายการพูดถึงในมุมอื่นๆ ให้แคมเปญไม่ได้จบอยู่แค่คอนเทนต์จากคนดังเพียงไม่กี่คน</P>
      <P>แต่สิ่งสำคัญคืออย่ามองแค่จำนวน Followers เพราะ Awareness ที่ดีไม่ได้หมายถึงแค่คนเห็นเยอะ แต่ต้องดูด้วยว่า คนที่เห็นคือกลุ่มเป้าหมายของแบรนด์หรือไม่</P>

      <Divider />
      <P>สรุปแล้วการทำ Influencer Marketing ไม่มี Minimum Budget ที่ใช้ได้กับทุกแบรนด์ เพราะแคมเปญที่ใช้ Influencer 10 คนเพื่อสร้างยอดขาย ย่อมมีโครงสร้างงบต่างจากแคมเปญที่ใช้ Influencer 1–2 คนเพื่อสร้าง Awareness</P>
      <P>ถ้าต้องการยอดขาย อาจต้องเน้นจำนวนและ Performance ถ้าต้องการความน่าเชื่อถือ อาจต้องให้น้ำหนักกับ Influencer ที่มีความเชี่ยวชาญ และถ้าต้องการสร้าง Awareness ก็ต้องวางงบสำหรับ Influencer ที่สามารถสร้าง Impact ได้</P>
      <P><strong style={{ color: "#5f26e5" }}>เพราะการทำ Influencer Marketing ที่คุ้มค่า ไม่ใช่การเอางบทั้งหมดไปลงกับคนที่ดังที่สุด แต่คือการวางงบให้เหมาะกับสิ่งที่แบรนด์ต้องการให้เกิดขึ้นจริง</strong></P>
    </>
  );
}

function InfluencerChecklistContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>When choosing an influencer, many brands start by looking at who has the most followers, or who&apos;s trending right now. But those numbers don&apos;t tell you the whole story of whether that influencer actually fits the campaign.</P>
        <P>Because effective Influencer Marketing doesn&apos;t depend on who has the most followers — it depends on <strong style={{ color: "#5f26e5" }}>who has an identity and a following that genuinely matches what the brand wants to communicate</strong>. Before deciding to hire, run through these 4 checks to see which influencer fits your brand best.</P>

        <Divider />
        <H2>1. Expertise and credibility</H2>
        <P>Check whether this influencer actually has expertise in the topic the brand wants to communicate, and how consistently they&apos;ve produced content in that category. Consistency of content helps viewers remember what they&apos;re knowledgeable about, giving people a reason to trust their recommendations.</P>

        <H2>2. Community quality</H2>
        <P>Don&apos;t just look at follower count — look at who&apos;s actually following and engaging with that influencer. For example: are comments relevant to the content, does further conversation happen, and how closely does the follower base match the brand&apos;s target audience? A well-matched community can be worth more than a large follower base with no real connection to the product.</P>

        <H2>3. Brand fit</H2>
        <P>Every influencer has a different personality, image, and storytelling style. Ask yourself: would it feel natural for them to talk about our brand, and does their identity align with the image the brand wants to project? This fit has a direct effect on how credible the content feels.</P>

        <H2>4. Professionalism</H2>
        <P>Beyond the numbers and the content, don&apos;t forget to look at how they work — from responsiveness and delivering on time, to understanding the Brief, receiving feedback, and offering additional ideas. An influencer who works in an organized way helps the campaign move forward smoothly and reduces problems that can come up during the collaboration.</P>

        <Divider />
        <P>Choosing the right influencer for your brand shouldn&apos;t end at &quot;how many followers does this person have?&quot; — it should start from &quot;how well does this person fit what we want to communicate?&quot;</P>
        <P>The influencer&apos;s credibility, the quality of their community, brand fit, and how they work all help brands make a more well-rounded decision.</P>
        <P><strong style={{ color: "#5f26e5" }}>Because in the end, the best influencer may not be the one with the highest numbers — but the one who genuinely reaches your target audience and makes your brand talked about in a way that feels natural.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>การเลือกอินฟลูเอนเซอร์สักคน หลายแบรนด์อาจเริ่มต้นจากการดูว่าใครมี Followers เยอะ หรือใครกำลังเป็นกระแส แต่ตัวเลขเหล่านี้ไม่ได้บอกทั้งหมดว่าอินฟลูเอนเซอร์คนนั้นเหมาะกับแคมเปญหรือไม่</P>
      <P>เพราะ Influencer Marketing ที่ได้ผล ไม่ได้ขึ้นอยู่กับว่าใครมีคนตามเยอะที่สุด แต่คือ <strong style={{ color: "#5f26e5" }}>ใครมีตัวตนและกลุ่มผู้ติดตามที่ตรงกับสิ่งที่แบรนด์ต้องการสื่อสาร</strong> ก่อนตัดสินใจจ้าง ลองเช็ก 4 ข้อนี้ เพื่อดูว่าอินฟลูเอนเซอร์คนไหนเหมาะกับแบรนด์มากที่สุด</P>

      <Divider />
      <H2>1. ความเชี่ยวชาญและความน่าเชื่อถือ</H2>
      <P>ลองดูว่าอินฟลูเอนเซอร์คนนี้มีความเชี่ยวชาญในเรื่องที่แบรนด์ต้องการสื่อสารหรือไม่ และที่ผ่านมาเขาทำคอนเทนต์ในหมวดนั้นอย่างต่อเนื่องมากน้อยแค่ไหน เพราะความสม่ำเสมอของเนื้อหาช่วยให้คนดูจดจำว่าเขาเชี่ยวชาญเรื่องอะไรและมีเหตุผลที่จะเชื่อคำแนะนำของเขา</P>

      <H2>2. คุณภาพของ Community</H2>
      <P>อย่าดูแค่จำนวน Followers แต่ลองดูว่าใครกำลังติดตามและมีส่วนร่วมกับอินฟลูเอนเซอร์คนนั้นจริงๆ เช่น คอมเมนต์มีความเกี่ยวข้องกับคอนเทนต์หรือไม่ มีการพูดคุยต่อหรือเปล่า และกลุ่มผู้ติดตามตรงกับกลุ่มเป้าหมายของแบรนด์มากแค่ไหน เพราะ Community ที่ตรงกลุ่มอาจมีค่ามากกว่าฐานผู้ติดตามที่มีจำนวนมากแต่ไม่ได้มีความเกี่ยวข้องกับสินค้า</P>

      <H2>3. ความเหมาะสมกับแบรนด์</H2>
      <P>อินฟลูเอนเซอร์แต่ละคนมีทั้งบุคลิก ภาพลักษณ์ และสไตล์การเล่าที่แตกต่างกัน ลองถามตัวเองว่าถ้าให้เขาพูดถึงแบรนด์ของเราแล้วจะรู้สึกเป็นธรรมชาติไหม และตัวตนของเขาสอดคล้องกับภาพที่แบรนด์ต้องการสื่อสารหรือไม่ เพราะความเข้ากันตรงนี้มีผลโดยตรงต่อความน่าเชื่อถือของคอนเทนต์</P>

      <H2>4. ความเป็นมืออาชีพ</H2>
      <P>นอกจากตัวเลขและคอนเทนต์แล้ว อย่าลืมดูวิธีทำงานด้วย ตั้งแต่การตอบกลับ การส่งงานตรงเวลา การทำความเข้าใจ Brief ไปจนถึงการรับ Feedback และเสนอไอเดียเพิ่มเติม อินฟลูเอนเซอร์ที่ทำงานเป็นระบบจะช่วยให้แคมเปญเดินหน้าได้ราบรื่น และลดปัญหาที่อาจเกิดขึ้นระหว่างการทำงาน</P>

      <Divider />
      <P>การเลือกอินฟลูเอนเซอร์ที่เหมาะกับแบรนด์จึงไม่ควรจบที่คำถามว่าคนนี้มี Followers เท่าไหร่ แต่ควรตั้งโจทย์ว่า คนนี้เหมาะกับสิ่งที่เราต้องการสื่อสารแค่ไหน</P>
      <P>ทั้งความน่าเชื่อถือของตัวอินฟลูเอนเซอร์ คุณภาพของ Community ความเข้ากันกับแบรนด์ และวิธีการทำงานล้วนเป็นส่วนที่ช่วยให้แบรนด์ตัดสินใจได้รอบด้านมากขึ้น</P>
      <P><strong style={{ color: "#5f26e5" }}>เพราะสุดท้ายแล้วอินฟลูเอนเซอร์ที่ดีที่สุดอาจไม่ใช่คนที่มีตัวเลขสูงที่สุด แต่คือคนที่เข้าถึงกลุ่มเป้าหมายได้ตรง และทำให้แบรนด์ถูกพูดถึงในแบบที่เป็นธรรมชาติ</strong></P>
    </>
  );
}

function Instagram2026BenchmarkContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>If you&apos;ve been trying to grow Reach by posting on Instagram more often, it might be time to take a step back and ask whether what you&apos;re posting — and the Format you&apos;re choosing — actually fits the content.</P>
        <P>Socialinsider&apos;s Instagram Benchmark 2026 report, which analyzed over 35 million posts worldwide, shows that overall Engagement is declining, while each Format delivers clearly different results.</P>
        <P>So in 2026, doing well on Instagram may not be about posting as much as possible — it&apos;s about choosing the Format and content that fit what you want viewers to do next.</P>

        <Divider />
        <H2>4 Key Instagram Insights for 2026</H2>

        <H3>1. Carousels still stand out for Engagement</H3>
        <P>Even though overall Instagram Engagement has dropped by about 24%, Carousels remain the highest-Engagement Format in the report, at around 0.55%.</P>
        <P>The strength of Carousels is being able to tell several points within a single post, making them well suited to How-tos, checklists, tips, or step-by-step storytelling — especially content people want to Save and revisit later.</P>

        <H3>2. Reels are still key for reaching new people</H3>
        <P>Reels have Engagement close to Carousels, at around 0.52%, and remain an important Format for building Reach and introducing your channel to people who don&apos;t yet follow you.</P>
        <P>That doesn&apos;t mean every piece of content needs to be a Reel, though — if the content needs room for detailed explanation or for people to come back and re-read it, a Carousel may be the better fit.</P>

        <H3>3. Single images are playing a smaller role</H3>
        <P>The number of Single Image posts brands publish has been trending down, from an average of around 10 to 7 posts a month, while this Format&apos;s Engagement sits at around 0.37% — lower than both Carousels and Reels.</P>
        <P>That said, it doesn&apos;t mean single images no longer work — there just needs to be a clear reason to use one, such as a visual strong enough to stand alone, or a message that can be fully communicated within a single image.</P>

        <H3>4. Follower growth is slowing down</H3>
        <P>Organic follower growth has slowed across many account sizes — for example, accounts with 1K–5K followers saw growth drop from 38% to 22%.</P>
        <P>As finding new followers gets harder, brands should place more importance on maintaining relationships with people who already follow them — whether through useful content, opening up engagement, or making people want to keep coming back to the channel.</P>

        <Divider />
        <H2>So how should you adjust your Instagram strategy?</H2>
        <OL items={[
          <><strong>Want people to Save content and spend time with it?</strong> Choose Carousels for How-tos, tips, checklists, or content with several points.</>,
          <><strong>Want to grow Reach and reach new people?</strong> Use Reels to tell a story or create content that grabs the attention of people who don&apos;t yet know your channel.</>,
          <><strong>Use Single Images when there&apos;s a reason to.</strong> You don&apos;t need to stop using single images — just choose them for content with a strong visual or a clear message.</>,
          <><strong>Don&apos;t measure Instagram by Followers alone.</strong> Beyond follower count, look at Reach, Engagement, Saves, Shares, and each Format&apos;s performance to understand what content genuinely fits your target audience.</>,
        ]} />

        <Divider />
        <P>In summary, Instagram in 2026 doesn&apos;t mean posting less is automatically better, or that you must only do Carousels — what&apos;s become clearer is that each Format has its own strengths.</P>
        <P>Carousels suit telling content and creating value people want to keep, Reels suit building visibility and reaching new people, while Single Images still work when the visual or message is strong enough.</P>
        <P><strong style={{ color: "#5f26e5" }}>Because on a day when viewers have more content to choose from than ever, making Instagram work may not be about posting more than before — it&apos;s about choosing what&apos;s worth posting and telling it in the way that actually fits your viewers.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>ถ้าคุณกำลังพยายามเพิ่ม Reach ด้วยการโพสต์ Instagram ให้ถี่ขึ้น อาจถึงเวลาต้องกลับมาดูว่า เราโพสต์อะไร และเลือก Format ได้เหมาะกับคอนเทนต์หรือยัง</P>
      <P>รายงาน Instagram Benchmark 2026 จาก Socialinsider ซึ่งวิเคราะห์ข้อมูลกว่า 35 ล้านโพสต์ทั่วโลก สะท้อนให้เห็นว่า Engagement โดยรวมกำลังลดลง ขณะที่แต่ละ Format ก็ให้ผลลัพธ์แตกต่างกันอย่างชัดเจน</P>
      <P>ดังนั้น ในปี 2026 การทำ Instagram อาจไม่ใช่เรื่องของการโพสต์ให้มากที่สุด แต่คือการเลือก Format และเนื้อหาให้เหมาะกับสิ่งที่ต้องการให้คนดูทำต่อ</P>

      <Divider />
      <H2>4 อินไซต์สำคัญบน Instagram ปี 2026</H2>

      <H3>1. Carousel ยังโดดเด่นเรื่อง Engagement</H3>
      <P>แม้ภาพรวม Engagement บน Instagram จะลดลงประมาณ 24% แต่ Carousel ยังคงเป็น Format ที่ทำ Engagement ได้สูงที่สุดในรายงาน โดยอยู่ที่ประมาณ 0.55%</P>
      <P>จุดแข็งของ Carousel คือสามารถเล่าข้อมูลได้หลายประเด็นในโพสต์เดียว จึงเหมาะกับคอนเทนต์อย่าง How-to, Checklist, Tips หรือการเล่าเรื่องเป็นลำดับ โดยเฉพาะเนื้อหาที่คนอยาก Save ไว้กลับมาอ่านภายหลัง</P>

      <H3>2. Reels ยังสำคัญสำหรับการเข้าถึงคนใหม่</H3>
      <P>Reels มี Engagement ใกล้เคียงกับ Carousel ที่ประมาณ 0.52% และยังเป็น Format สำคัญสำหรับการสร้าง Reach และดึงคนที่ยังไม่ได้ติดตามเข้ามารู้จักช่อง</P>
      <P>แต่ไม่ได้หมายความว่าทุกคอนเทนต์ต้องทำเป็น Reels เพราะถ้าเนื้อหาต้องการพื้นที่สำหรับอธิบายรายละเอียดหรือให้คนกลับมาอ่านซ้ำ Carousel อาจเหมาะกว่า</P>

      <H3>3. ภาพเดี่ยวมีบทบาทลดลง</H3>
      <P>จำนวนการโพสต์ Single Image ของแบรนด์มีแนวโน้มลดลง จากเฉลี่ยประมาณ 10 เหลือ 7 โพสต์ต่อเดือน ขณะที่ Engagement ของ Format นี้อยู่ที่ประมาณ 0.37% ซึ่งต่ำกว่า Carousel และ Reels</P>
      <P>อย่างไรก็ตาม ไม่ได้แปลว่าภาพเดี่ยวใช้ไม่ได้ แต่ควรมีเหตุผลในการเลือกใช้ เช่น ภาพที่โดดเด่นมากพอ หรือมี Message ที่สามารถสื่อสารได้จบภายในภาพเดียว</P>

      <H3>4. ยอด Followers โตช้าลง</H3>
      <P>การเติบโตของ Followers แบบ Organic ชะลอตัวลงในหลายขนาดของบัญชี เช่น บัญชีที่มี 1K–5K Followers มีอัตราการเติบโตลดลงจาก 38% เหลือ 22%</P>
      <P>เมื่อการหาผู้ติดตามใหม่ทำได้ยากขึ้น แบรนด์จึงควรให้ความสำคัญกับการรักษาความสัมพันธ์กับคนที่ติดตามอยู่แล้วด้วย ไม่ว่าจะเป็นการสร้างคอนเทนต์ที่มีประโยชน์ เปิดให้มีส่วนร่วม หรือทำให้คนรู้สึกว่าอยากกลับมาดูคอนเทนต์ของช่องต่อ</P>

      <Divider />
      <H2>แล้วควรปรับ Instagram Strategy ยังไง?</H2>
      <OL items={[
        <><strong>อยากให้คน Save และใช้เวลากับเนื้อหา</strong> — เลือก Carousel สำหรับ How-to, Tips, Checklist หรือเนื้อหาที่มีหลายประเด็น</>,
        <><strong>อยากเพิ่ม Reach และเข้าถึงคนใหม่</strong> — ใช้ Reels เพื่อเล่าเรื่องหรือสร้างคอนเทนต์ที่ดึงความสนใจจากคนที่ยังไม่รู้จักช่อง</>,
        <><strong>ใช้ Single Image เมื่อมีเหตุผล</strong> — ไม่จำเป็นต้องเลิกใช้ภาพเดี่ยว แต่ควรเลือกใช้กับคอนเทนต์ที่ Visual แข็งแรงหรือมี Message ที่ชัดเจน</>,
        <><strong>อย่าวัด Instagram จาก Followers อย่างเดียว</strong> — นอกจากยอดผู้ติดตาม ควรดูทั้ง Reach, Engagement, Saves, Shares และ Performance ของแต่ละ Format เพื่อรู้ว่าคอนเทนต์แบบไหนเหมาะกับกลุ่มเป้าหมายของเราจริงๆ</>,
      ]} />

      <Divider />
      <P>สรุป Instagram ในปี 2026 นี้ไม่ได้หมายความว่าโพสต์น้อยแล้วจะดี หรือต้องทำ Carousel เท่านั้น แต่สิ่งที่เห็นชัดขึ้นคือแต่ละ Format มีจุดแข็งต่างกัน</P>
      <P>Carousel เหมาะกับการเล่าเนื้อหาและสร้างคุณค่าที่คนอยากเก็บไว้ ส่วน Reels เหมาะกับการสร้างการมองเห็นและเข้าถึงคนใหม่ ขณะที่ Single Image ยังใช้ได้เมื่อมี Visual หรือ Message ที่แข็งแรงพอ</P>
      <P><strong style={{ color: "#5f26e5" }}>เพราะในวันที่คนดูมีคอนเทนต์ให้เลือกมากขึ้น การทำ Instagram ให้ได้ผลอาจไม่ได้อยู่ที่การโพสต์ให้เยอะกว่าเดิม แต่อยู่ที่การเลือกสิ่งที่ควรโพสต์และเลือกวิธีเล่าให้ถูกกับคนดูมากกว่าเดิม</strong></P>
    </>
  );
}

function ContentPerPlatformContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Ever notice this? The same content posted on one channel does great, but posted on another it goes completely silent — even though it&apos;s the exact same story.</P>
        <P>The real problem usually isn&apos;t the content itself — it&apos;s that people on each platform have different content-consumption habits. Making one piece of content and posting it identically everywhere isn&apos;t necessarily the most effective approach.</P>
        <P>What you should do instead is keep the same Core Message, but adapt how you tell it to fit the nature of each platform. Let&apos;s look at how Facebook, TikTok, and Instagram should each be communicated differently.</P>
        <P>Here&apos;s a guide for adapting your communication style to fit these 3 popular platforms, so brands and creators can create more on-target content.</P>

        <Divider />
        <H2>Facebook: Tell it in detail, and invite people to keep talking</H2>
        <UL items={[
          <><strong>How to communicate:</strong> Facebook users tend to spend time reading detailed content. Brands should use this space to explain information, tell in-depth stories, break down an issue, or give clear, illustrative examples.</>,
          <><strong>Goal:</strong> Build community. Content should end with an open-ended question to spark comments and an exchange of opinions.</>,
        ]} />

        <H2>TikTok: Get to the point fast, and keep it real</H2>
        <UL items={[
          <><strong>How to communicate:</strong> TikTok&apos;s nature is scrolling through clip after clip, so content needs a strong &quot;Hook&quot; to keep people watching from the very start — maybe opening with a problem or an issue that resonates with the viewer.</>,
          <><strong>Goal:</strong> Make the content feel natural, not overly like an ad. Telling it from real experience, a review, or a hands-on trial makes it easier for people to feel connected to the content.</>,
        ]} />

        <H2>Instagram: Tell the story through images, and make people want to share</H2>
        <UL items={[
          <><strong>How to communicate:</strong> Instagram is a space where images and visuals play a huge role, so content needs to be planned around both the story and how it&apos;s presented — whether that&apos;s product shots, outfit ideas, a café, or a lifestyle moment people can draw inspiration from.</>,
          <><strong>Goal:</strong> Build an image. The brand needs to show how the product can fit into a user&apos;s everyday life — through outfit ideas, atmosphere, or a mood in the image that makes people want to remember and save it.</>,
        ]} />

        <Divider />
        <P>A single piece of content doesn&apos;t need a new Core Message every time you switch platforms — what should change is <strong style={{ color: "#5f26e5" }}>how you tell it</strong>.</P>
        <P>People on Facebook might want to read a story and join the conversation, people on TikTok might want content that gets to the point fast and feels natural, while Instagram might suit storytelling through images and lifestyle more.</P>
        <P><strong style={{ color: "#5f26e5" }}>So making social media work isn&apos;t about making identical content for every channel — it&apos;s about understanding what people on each platform are looking for, then telling the same story in a way that fits that platform.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>เคยไหม? คอนเทนต์เดียวกัน โพสต์ลงช่องหนึ่งยอดดี แต่พอเอาไปลงอีกช่องกลับเงียบสนิท ทั้งที่เป็นเรื่องเดียวกัน</P>
      <P>จริงๆ แล้วปัญหาอาจไม่ได้อยู่ที่คอนเทนต์ แต่เป็นเพราะคนแต่ละแพลตฟอร์มมีพฤติกรรมการเสพคอนเทนต์ต่างกัน การทำคอนเทนต์ชิ้นเดียวแล้วนำไปโพสต์เหมือนกันทุกช่องทาง จึงอาจไม่ใช่วิธีที่ได้ผลที่สุด</P>
      <P>สิ่งที่ควรทำคือเก็บ Core Message เดิมไว้ แต่ปรับวิธีเล่าให้เข้ากับธรรมชาติของแต่ละแพลตฟอร์ม มาดูกันว่า Facebook, TikTok และ Instagram ควรสื่อสารต่างกันอย่างไร</P>
      <P>นี่คือแนวทางการปรับวิธีสื่อสารให้เข้ากับรูปแบบของ 3 แพลตฟอร์มยอดฮิต เพื่อให้แบรนด์และครีเอเตอร์ทำคอนเทนต์ได้ตรงจุดมากขึ้น</P>

      <Divider />
      <H2>Facebook: เล่าให้ละเอียด และชวนคนคุยต่อ</H2>
      <UL items={[
        <><strong>วิธีสื่อสาร:</strong> ผู้ใช้ Facebook มักให้เวลากับการอ่านเนื้อหาที่มีรายละเอียด แบรนด์ควรใช้พื้นที่นี้อธิบายข้อมูล เล่าเรื่องราวเชิงลึก วิเคราะห์ประเด็น หรือยกตัวอย่างประกอบให้ชัดเจน</>,
        <><strong>เป้าหมาย:</strong> สร้างคอมมูนิตี้ คอนเทนต์ควรจบด้วยการตั้งคำถามปลายเปิด เพื่อกระตุ้นให้เกิดการคอมเมนต์และการแลกเปลี่ยนความคิดเห็น</>,
      ]} />

      <H2>TikTok: เข้าเรื่องไว และเล่าให้เรียล</H2>
      <UL items={[
        <><strong>วิธีสื่อสาร:</strong> ธรรมชาติของ TikTok คือการไถฟีดดูคลิปไปเรื่อยๆ คอนเทนต์จึงต้องมี &quot;Hook&quot; ที่แข็งแรงเพื่อดึงคนให้อยู่ตั้งแต่ช่วงแรกที่เปิดคลิป อาจเริ่มด้วยปัญหา หรือประเด็นที่ตรงใจผู้ชม</>,
        <><strong>เป้าหมาย:</strong> ทำให้คอนเทนต์ดูเป็นธรรมชาติและไม่รู้สึกเหมือนโฆษณาเกินไป การเล่าจากประสบการณ์จริง รีวิว หรือทดลองใช้ให้ดู จึงเป็นวิธีที่ช่วยให้คนรู้สึกเชื่อมโยงกับคอนเทนต์ได้ง่ายขึ้น</>,
      ]} />

      <H2>Instagram: เล่าเรื่องผ่านภาพและทำให้คนอยากแชร์</H2>
      <UL items={[
        <><strong>วิธีสื่อสาร:</strong> Instagram เป็นพื้นที่ที่ภาพและ Visual มีบทบาทสูง คอนเทนต์จึงควรคิดไปพร้อมกันทั้งเรื่องที่จะเล่าและวิธีนำเสนอ ไม่ว่าจะเป็นภาพสินค้า ไอเดียแต่งตัว คาเฟ่ หรือ Lifestyle ที่คนสามารถนำไปเป็นแรงบันดาลใจได้</>,
        <><strong>เป้าหมาย:</strong> สร้างภาพลักษณ์ แบรนด์ต้องทำให้เห็นว่าสินค้าสามารถเข้าไปอยู่ในชีวิตประจำวันของผู้ใช้งานได้ยังไง ไม่ว่าจะผ่านไอเดียการแต่งตัว บรรยากาศ หรือมู้ดของภาพที่กระตุ้นให้อยากจดจำและบันทึกเก็บไว้</>,
      ]} />

      <Divider />
      <P>คอนเทนต์หนึ่งเรื่องไม่จำเป็นต้องเปลี่ยน Core Message ทุกครั้งที่เปลี่ยนแพลตฟอร์ม แต่สิ่งที่ควรเปลี่ยนคือ <strong style={{ color: "#5f26e5" }}>วิธีเล่า</strong></P>
      <P>เพราะคนบน Facebook อาจอยากอ่านเรื่องราวและเข้ามาพูดคุย คนบน TikTok อาจอยากได้คอนเทนต์ที่เข้าเรื่องไวและเป็นธรรมชาติ ส่วน Instagram อาจเหมาะกับการเล่าผ่านภาพและ Lifestyle มากกว่า</P>
      <P><strong style={{ color: "#5f26e5" }}>ดังนั้นการทำ Social Media ให้ได้ผลจึงไม่ใช่การทำคอนเทนต์ให้เหมือนกันทุกช่องทาง แต่คือการเข้าใจว่าคนแต่ละที่กำลังมองหาอะไร แล้วนำเรื่องเดียวกันไปเล่าในแบบที่เข้ากับแพลตฟอร์มนั้นๆ</strong></P>
    </>
  );
}

function SocialMediaInsight2026Content({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>These days, the social media world isn&apos;t measured by &quot;mass appeal&quot; alone anymore. Doing social media in 2026 is no longer about pumping out as much content as possible, or using the same approach across every platform — because each channel has its own audience behavior and content style.</P>
        <P>What matters more and more is understanding what people on each platform are actually looking for, and what kind of content makes them want to keep watching, engage, or share.</P>
        <P>Buddy Review wants to share key insights for brands and creators on planning content strategy for each platform.</P>

        <Divider />
        <H3>Facebook | Content that invites conversation</H3>
        <P>Facebook is still a space where conversational, discussion-driving content matters. Posts that open up a topic, ask a question, or invite people to share their opinion have a better chance of driving Engagement than one-way informational posts. And when a brand steps in to reply or chat in the comments, that helps build a relationship with the community too.</P>

        <H3>Instagram | Make people want to share it</H3>
        <P>This year is all about &quot;Emotion-first&quot; — content needs to touch the viewer&apos;s emotions, whether that&apos;s humor, sentimentality, or a relatable meme, because the algorithm values DM shares more than regular likes. As for Reels, 15–30 seconds is the sweet spot for length — you don&apos;t need to post very often, but prioritize quality and a strong visual look.</P>

        <H3>TikTok | Realness and storytelling</H3>
        <P>TikTok is still a platform where storytelling and authenticity matter a great deal. Content that feels like someone sharing a real experience or telling a story to a friend can spark more interest than a clip that tries to sell from the very first second. What still matters is grabbing attention early and telling a story people want to watch all the way through.</P>

        <H3>YouTube | Where depth and expertise live</H3>
        <P>YouTube suits content that needs to tell a story or share information in depth, from video podcasts to niche content that answers viewers&apos; questions or interests. Making people want to keep watching matters just as much as getting them to click in the first place — meanwhile, the Title and Thumbnail are still the critical gate that decides whether someone clicks at all.</P>

        <H3>X (Twitter) | Speed needs a point of view</H3>
        <P>Speed is still essential, but going viral now also requires layering in real analysis. Posts with a fresh perspective that invite further discussion tend to do very well in the feed — and it&apos;s crucial to always fact-check, because the X community verifies information fast.</P>

        <H3>Lemon8 | Easy-to-digest, useful content</H3>
        <P>Lemon8 still suits How-to, review, and lifestyle content — especially content people can save to reference later. So beyond an eye-catching cover, the content itself should be easy to read, broken into clear sections, with details people can actually put to use. Useful content doesn&apos;t end once someone reads it — it also has a chance of being saved and revisited.</P>

        <Divider />
        <P>Social media in 2026 doesn&apos;t have one single formula that works across every platform, because the same story might need to be told differently on each channel.</P>
        <P><strong style={{ color: "#5f26e5" }}>Once you understand the nature of each channel, you don&apos;t need to create entirely new content for every platform — you can take the same idea and adapt the way it&apos;s told, the format, and where you want people to engage, to fit each channel.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>ทุกวันนี้โลกโซเชียลไม่ได้วัดกันแค่ &quot;ความแมส&quot; อีกต่อไป เพราะการทำ Social Media ในปี 2026 อาจไม่ใช่เรื่องของการทำคอนเทนต์ให้เยอะที่สุด หรือพยายามทำทุกแพลตฟอร์มด้วยวิธีเดียวกันอีกต่อไป เพราะแต่ละช่องทางมีทั้งพฤติกรรมของคนดูและรูปแบบคอนเทนต์ที่แตกต่างกัน</P>
      <P>สิ่งที่สำคัญขึ้นเรื่อยๆ คือการเข้าใจว่าคนบนแต่ละแพลตฟอร์มกำลังมองหาอะไร และคอนเทนต์แบบไหนที่ทำให้พวกเขาอยากดูต่อ มีส่วนร่วม หรือส่งต่อ</P>
      <P>Buddy Review เลยอยากจะมาแชร์อินไซต์สำคัญสำหรับแบรนด์และครีเอเตอร์ ในการวางกลยุทธ์คอนเทนต์ในแต่ละแพลตฟอร์ม</P>

      <Divider />
      <H3>Facebook | คอนเทนต์ที่ชวนคนเข้ามาคุย</H3>
      <P>Facebook ยังคงเป็นพื้นที่ที่คอนเทนต์แบบพูดคุยและสร้างบทสนทนามีความสำคัญ โพสต์ที่เปิดประเด็น ตั้งคำถาม หรือชวนให้คนแชร์ความคิดเห็น จึงมีโอกาสสร้าง Engagement ได้มากกว่าการโพสต์ข้อมูลแบบทางเดียว และการที่แบรนด์เข้ามาตอบหรือพูดคุยกับคนในคอมเมนต์ก็ช่วยสร้างความสัมพันธ์กับ Community ได้ด้วย</P>

      <H3>Instagram | ทำให้คนอยากส่งต่อ</H3>
      <P>ปีนี้เน้นแนวคิด Emotion-first คอนเทนต์ต้องแตะอารมณ์คนดู ไม่ว่าจะขำ ซึ้ง หรือมีมโดนใจ เพราะอัลกอริทึมจะให้ค่ายอด Share ต่อใน DM มากกว่ายอดไลก์ทั่วไป ส่วน Reels ความยาวกำลังดีอยู่ที่ 15-30 วินาที โพสต์ไม่ต้องถี่มาก แต่เน้นคุณภาพและภาพลักษณ์ที่ดีไว้ก่อน</P>

      <H3>TikTok | ความเรียลและ Storytelling</H3>
      <P>TikTok ยังคงเป็นแพลตฟอร์มที่การเล่าเรื่องและความเป็นธรรมชาติสำคัญมาก คอนเทนต์ที่ดูเหมือนคนกำลังแชร์ประสบการณ์จริงหรือเล่าเรื่องให้เพื่อนฟัง อาจสร้างความสนใจได้มากกว่าคลิปที่พยายามขายสินค้าตั้งแต่ต้น สิ่งที่ยังสำคัญคือการดึงความสนใจตั้งแต่ช่วงแรกและเล่าเรื่องให้คนอยากดูต่อจนจบ</P>

      <H3>YouTube | แหล่งรวมความลึกและผู้เชี่ยวชาญ</H3>
      <P>YouTube เหมาะกับคอนเทนต์ที่ต้องการเล่าเรื่องหรือให้ข้อมูลแบบลงลึก ตั้งแต่ Video Podcast ไปจนถึงคอนเทนต์เฉพาะทางที่ตอบคำถามหรือความสนใจของคนดู การทำให้คนอยากดูต่อจึงสำคัญไม่แพ้การดึงคนให้กดเข้ามาดูตั้งแต่แรก ขณะเดียวกัน Title และ Thumbnail ก็ยังเป็นด่านสำคัญในการทำให้คนตัดสินใจคลิก</P>

      <H3>X (Twitter) | ความเร็วต้องมาพร้อมมุมมอง</H3>
      <P>ความไวยังจำเป็น แต่ถ้าจะให้ไวรัลต้องบวกการวิเคราะห์เชิงลึกเข้าไปด้วย โพสต์ที่มีมุมมองใหม่ๆ ชวนคุยต่อ จะติดฟีดได้ดีมาก และที่สำคัญคือต้องเช็กความถูกต้องของข้อมูลเสมอ เพราะสังคมใน X ตรวจสอบไวมาก</P>

      <H3>Lemon8 | คอนเทนต์ที่ย่อยง่ายและมีประโยชน์</H3>
      <P>Lemon8 ยังคงเหมาะกับคอนเทนต์แนว How-to, รีวิว และ Lifestyle โดยเฉพาะเนื้อหาที่คนสามารถเก็บไว้อ้างอิงภายหลังได้ ดังนั้นนอกจากภาพปกที่ต้องดึงดูดแล้ว เนื้อหาควรอ่านง่าย แบ่งข้อมูลเป็นส่วนๆ และมีรายละเอียดที่นำไปใช้ได้จริง เพราะคอนเทนต์ที่มีประโยชน์ไม่ได้จบแค่ตอนคนอ่าน แต่ยังมีโอกาสถูก Save กลับมาดูอีกครั้ง</P>

      <Divider />
      <P>Social Media ในปี 2026 จึงไม่ได้มีสูตรเดียวที่ใช้ได้กับทุกแพลตฟอร์ม เพราะคอนเทนต์เรื่องเดียวกันอาจต้องเล่าคนละแบบในแต่ละช่องทาง</P>
      <P><strong style={{ color: "#5f26e5" }}>เมื่อเข้าใจธรรมชาติของแต่ละช่องทางแล้ว เราก็ไม่จำเป็นต้องทำคอนเทนต์ใหม่ทั้งหมดสำหรับทุกแพลตฟอร์ม แต่สามารถนำไอเดียเดียวกันมาปรับวิธีเล่า Format และจุดที่ต้องการให้คนมีส่วนร่วมให้เหมาะกับแต่ละช่องทางได้</strong></P>
    </>
  );
}

function ContentStrategyCanvasContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>A common complaint among marketers and creators: producing tons of content, yet likes stay quiet and sales stay flat, with no clear idea what to fix. This usually happens when the content is &quot;good, but aimed at the wrong audience&quot; — because in this era, &quot;volume&quot; matters far less than &quot;precision.&quot;</P>
        <P>Buddy Review wants to introduce a tool that can rescue your Reach and sharpen your content planning: the <strong style={{ color: "#5f26e5" }}>Content Strategy Canvas</strong>.</P>

        <Divider />
        <H2>What Is the Content Strategy Canvas?</H2>
        <P>The Content Strategy Canvas is a one-page framework that summarizes the full picture of a content plan, helping you and your team answer three key questions with total clarity:</P>
        <UL items={[
          <><strong>Purpose:</strong> Why are we making this content?</>,
          <><strong>Audience:</strong> Who are we talking to?</>,
          <><strong>Execution:</strong> What approach will actually achieve the goal?</>,
        ]} />

        <P>The Content Strategy Canvas has 8 key components:</P>
        <OL items={[
          <><strong>Business Goal</strong> — Start with what the brand actually needs, such as boosting sales or reaching Gen Z. We recommend focusing on just 1–2 goals per campaign so the scope doesn&apos;t get so wide you lose focus.</>,
          <><strong>Content Goal</strong> — Translate the business goal into an action, e.g. turning &quot;boost sales&quot; into &quot;create reviews that build trust.&quot;</>,
          <><strong>Audience</strong> — No need for a long persona write-up; focus on data you can actually use, like what they enjoy watching and their pain points. This sharpens your communication direction.</>,
          <><strong>Core Message</strong> — What do you want people to remember from this content? E.g. &quot;flawless skin from one jar,&quot; then branch that message into multiple content angles while staying consistent.</>,
          <><strong>Content Pillars</strong> — Define 3–5 core topics the brand wants to communicate, e.g. education, product reviews, lifestyle, or tips — making it easier for the team to ideate while keeping the content from becoming scattered.</>,
          <><strong>Formats</strong> — Choose formats that fit both the content and the audience. Don&apos;t pick a format just because everyone else is using it.</>,
          <><strong>Distribution</strong> — Decide where the content will live, e.g. TikTok, Instagram, or Facebook, and plan which content will be Paid vs. Organic to reach the target audience more precisely.</>,
          <><strong>KPI</strong> — Metrics should always align with the goal, for example:
            <UL noBullet items={[
              "Want more visibility (Awareness) → focus on Reach or Views",
              "Want more sales (Conversion) → focus on Add to Cart or purchase volume",
            ]} />
          </>,
        ]} />

        <P>In the end, underperforming content isn&apos;t always about &quot;bad content&quot; — it&apos;s often because the Content Strategy was never clearly defined: why we&apos;re doing it, who we&apos;re talking to, and how we&apos;ll measure it.</P>
        <P>The Content Strategy Canvas is a framework that gets the whole team aligned on one picture — from the goal, audience, and message, all the way to format, distribution, and KPIs — so content doesn&apos;t rely purely on trial and error, but can be planned and adjusted using real data.</P>
        <P><strong style={{ color: "#5f26e5" }}>Because great content isn&apos;t just about reaching a lot of people — it&apos;s about reaching the right people and driving them toward the goal the brand actually wants.</strong></P>
      </>
    );
  }
  return (
    <>
      <P>ปัญหายอดฮิตของนักการตลาดและครีเอเตอร์คือ ทำคอนเทนต์ออกมาเยอะมาก แต่ยอดไลก์เงียบ ยอดขายนิ่ง ไม่รู้จะแก้ตรงไหน ปัญหานี้มักเกิดจากการทำ &quot;คอนเทนต์ดี แต่ผิดกลุ่ม&quot; เพราะในยุคนี้การเน้น &quot;ปริมาณ&quot; ไม่สำคัญเท่า &quot;ความแม่นยำ&quot;</P>
      <P>Buddy Review เลยอยากชวนมาทำความรู้จักเครื่องมือที่จะช่วยกู้ยอด Reach และทำให้เราวางแผนคอนเทนต์ได้เฉียบคมขึ้น นั่นคือ <strong style={{ color: "#5f26e5" }}>Content Strategy Canvas</strong> ครับ</P>

      <Divider />
      <H2>Content Strategy Canvas คืออะไร?</H2>
      <P>Content Strategy Canvas คือ แผนภาพหน้าเดียวที่สรุปทุกภาพรวมของการทำคอนเทนต์ เพื่อช่วยให้เราและทีมตอบคำถามสำคัญ 3 ข้อนี้ได้เคลียร์ที่สุด</P>
      <UL items={[
        <><strong>Purpose:</strong> เราทำคอนเทนต์นี้ไปเพื่ออะไร?</>,
        <><strong>Audience:</strong> เรากำลังคุยอยู่กับใคร?</>,
        <><strong>Execution:</strong> ต้องนำเสนอแบบไหนถึงจะบรรลุเป้าหมาย?</>,
      ]} />

      <P>โดย Content Strategy Canvas มี 8 องค์ประกอบสำคัญดังนี้</P>
      <OL items={[
        <><strong>Business Goal (เป้าหมายธุรกิจ)</strong> — เริ่มที่แบรนด์ต้องการอะไร เช่น เพิ่มยอดขาย หรือเจาะกลุ่ม Gen Z ตรงนี้เราแนะนำให้โฟกัสแค่ 1-2 เป้าหมายต่อแคมเปญ เพื่อไม่ให้ตีกรอบกว้างเกินไป จนไม่รู้จะโฟกัสกับอะไร</>,
        <><strong>Content Goal (เป้าหมายคอนเทนต์)</strong> — แปลงเป้าธุรกิจมาเป็นการกระทำ เช่น จาก &quot;เพิ่มยอดขาย&quot; เปลี่ยนเป็น &quot;ทำรีวิวเพื่อสร้างความน่าเชื่อถือ&quot;</>,
        <><strong>Audience (กลุ่มเป้าหมาย)</strong> — ไม่จำเป็นต้องเขียน Persona ยาวๆ แต่เน้นเจาะข้อมูลที่ใช้ได้จริง เช่น เขาชอบดูอะไรและมี Pain Point อะไร ข้อมูลนี้จะช่วยกำหนดทิศทางวิธีการสื่อสารได้ชัดเจนยิ่งขึ้น</>,
        <><strong>Core Message (แก่นสารหลัก)</strong> — อยากให้คนจำอะไรจากคอนเทนต์นี้? เช่น สวยจบในกระปุกเดียว แล้วนำ Message นี้ไปแตกเป็นคอนเทนต์หลายมุม โดยยังสื่อสารไปในทิศทางเดียวกัน</>,
        <><strong>Content Pillars (แกนหลักของเนื้อหา)</strong> — กำหนดหัวข้อหลัก 3-5 เรื่องที่แบรนด์ต้องการสื่อสาร เช่น ความรู้ รีวิวสินค้า Lifestyle หรือ Tips เพื่อช่วยให้ทีมคิดคอนเทนต์ได้ง่ายขึ้น และคุมทิศทางไม่ให้เนื้อหาสะเปะสะปะ</>,
        <><strong>Formats (รูปแบบการนำเสนอ)</strong> — เลือกรูปแบบให้เหมาะกับทั้งเนื้อหาและกลุ่มเป้าหมาย อย่าเลือก Format เพียงเพราะคนอื่นกำลังทำ</>,
        <><strong>Distribution (ช่องทางเผยแพร่)</strong> — กำหนดว่าคอนเทนต์จะไปอยู่ที่ไหน เช่น TikTok, Instagram หรือ Facebook รวมถึงวางแผนว่า Content ไหนจะใช้ Paid และ Content ไหนจะเน้น Organic เพื่อให้ไปถึงกลุ่มเป้าหมายได้ตรงขึ้น</>,
        <><strong>KPI (วิธีวัดผล)</strong> — ตัวเลขต้องสอดคล้องไปกับเป้าหมายเสมอ เช่น
          <UL noBullet items={[
            "อยากให้คนเห็นเยอะ (Awareness) เน้นดูที่ Reach หรือ Views",
            "อยากเน้นยอดขาย (Conversion) เน้นดูที่ Add to Cart หรือ ยอดการสั่งซื้อ",
          ]} />
        </>,
      ]} />

      <P>สุดท้ายแล้วปัญหาของคอนเทนต์ที่ไม่เวิร์ก อาจไม่ได้อยู่ที่คอนเทนต์ไม่ดี แต่อาจเป็นเพราะเรายังวาง Content Strategy ไม่ชัดพอว่า ทำไปเพื่ออะไร กำลังสื่อสารกับใคร และจะวัดผลจากอะไร</P>
      <P>Content Strategy Canvas จึงเป็นอีกหนึ่ง Framework ที่ช่วยให้ทีมเห็นภาพเดียวกันตั้งแต่เป้าหมาย กลุ่มเป้าหมาย Message ไปจนถึง Format, ช่องทางเผยแพร่ และ KPI ทำให้การทำคอนเทนต์ไม่ต้องอาศัยการลองผิดลองถูกอย่างเดียว แต่สามารถวางแผนและปรับจากข้อมูลที่เกิดขึ้นจริงได้</P>
      <P><strong style={{ color: "#5f26e5" }}>เพราะคอนเทนต์ที่ดีไม่จำเป็นต้องมีแค่คนเห็นเยอะ แต่ต้องไปถึงคนที่ใช่และพาไปสู่เป้าหมายที่แบรนด์ต้องการด้วยนั่นเองครับ</strong></P>
    </>
  );
}

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

function CopywritingContent({ lang }: { lang: Locale }) {
  if (lang === "en") {
    return (
      <>
        <P>Copywriting — the art of writing persuasive marketing copy — is one of the most essential skills in the digital age. In a world overflowing with content, people scroll past thousands of ads and posts every day. Good copywriting has to &quot;grab attention&quot; instantly, and more importantly, &quot;drive conversion&quot; — whether that means a purchase, a sign-up, or a share.</P>
        <P>In this article, Buddy Review takes a deep dive into 6 copywriting techniques that are not just &quot;good&quot; but truly &quot;land&quot; with both readers and algorithms — plus tips you can apply right away across every social media platform. Let&apos;s take a look.</P>

        <Divider />
        <H2>1. Understand Your Audience Deeply Before You Write</H2>
        <P>Writing copy that resonates starts with truly knowing the people you&apos;re talking to. The better you understand them, the more precisely you can choose your words, tone, and storytelling approach. Always ask yourself first:</P>
        <UL items={[
          "Who are they? (Teens? Working professionals? Stay-at-home parents?)",
          "What problem can you solve for them?",
          "What kind of language do they use? (Casual and playful, or serious and business-like?)",
        ]} />
        <Note>Example: If your target is Gen Z, who love speed and fun, keep the tone light and playful — like &quot;Want glowing skin without a filter? You need to try this!&quot;</Note>

        <Divider />
        <H2>2. Your Headline Must Grab Attention Instantly</H2>
        <P>The headline is the first thing people see, and it&apos;s usually what decides whether they&apos;ll &quot;read on or scroll away.&quot;</P>
        <P>Techniques for a killer headline:</P>
        <UL items={[
          "Use attention-grabbing words like “secret,” “the reason why,” or “here’s why”",
          "Keep it short, sharp, and to the point",
          "Highlight the outcome or benefit the reader will get",
        ]} />
        <Note>Example: &quot;5 Benefits of Marketing&quot; vs. &quot;Your Marketing Isn&apos;t Working Because You&apos;re Missing These 5 Things!&quot;</Note>

        <Divider />
        <H2>3. Sell the &quot;Benefit,&quot; Not Just the Feature</H2>
        <P>Customers don&apos;t care what your product &quot;has&quot; — they care what it &quot;does&quot; for them. Instead of saying &quot;48-megapixel camera,&quot; try &quot;A camera sharp enough to capture every moment, even in low light.&quot;</P>

        <Divider />
        <H2>4. Your Call to Action Must Be Clear and Compelling</H2>
        <P>A CTA tells the reader what to &quot;do next&quot; — click, sign up, or place an order. Use these techniques:</P>
        <UL items={[
          "Keep it short and to the point",
          "Create a sense that “you need to act right now”",
        ]} />
        <P>Example:</P>
        <UL items={[
          "Sign up free — click now",
          "Order now and get an exclusive deal!",
          "Just for you — only 3 days left!",
        ]} />

        <Divider />
        <H2>5. Add a Touch of Psychology</H2>
        <P>Certain words hold real power to trigger emotion and decisions, such as</P>
        <UL items={[
          <>&quot;Just for you&quot; → makes people feel special</>,
          <>&quot;Today only&quot; → creates urgency</>,
          <>&quot;Only 5 left&quot; → triggers FOMO</>,
        ]} />

        <Divider />
        <H2>6. Adapt Your Style to Each Platform</H2>
        <P>Not every channel calls for the same writing style — you also need to understand user behavior and each platform&apos;s algorithm.</P>
        <UL items={[
          <><strong>Facebook &amp; Instagram:</strong> Keep it punchy and high-energy, with visuals that grab attention and are easy to share.</>,
          <><strong>Website or blog:</strong> Go in-depth, with a clear structure (H1, H2, bullet points) and strong SEO.</>,
          <><strong>Email &amp; LINE:</strong> Make it personalized, warm, and paired with a clear call to action.</>,
          <><strong>TikTok &amp; YouTube:</strong> Focus on pacing and storytelling flow that keeps viewers hooked.</>,
        ]} />

        <Divider />
        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
          <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>In Short: Copywriting Is Art + Psychology + Marketing</h3>
          <P>Great copywriting blends customer understanding, creativity, and communication techniques tailored to the platform. Master all three at once, and you can turn &quot;ordinary words&quot; into &quot;powerful words&quot; that genuinely drive sales and business results.</P>
        </div>
      </>
    );
  }
  return (
    <>
      <P>Copywriting หรือการเขียนข้อความเชิงโฆษณา ถือว่าเป็นทักษะที่สำคัญมากในยุคดิจิทัล โดยเฉพาะในปัจจุบันที่โลกเต็มไปด้วยคอนเทนต์ ผู้คนต่างเลื่อนฟีดผ่านโฆษณาและโพสต์นับพันต่อวัน การเขียน Copywriting ที่ดีจึงต้อง &quot;ดึงดูด&quot; ให้เกิดความสนใจได้ทันทีและที่สำคัญคือ &quot;ชวนให้เกิด Conversion&quot; ไม่ว่าจะเป็นการซื้อสินค้า สมัครสมาชิกหรือกดแชร์ต่อ</P>
      <P>บทความนี้ Buddy Review จะพาคุณไปเจาะลึกกับ 6 เทคนิคการเขียน Copywriting ที่ไม่เพียงแค่ &quot;ดี&quot; แต่ยัง &quot;โดน&quot; ทั้งใจคนอ่านและใจอัลกอริธึม พร้อมเคล็ดลับที่คุณนำไปใช้ได้จริงในทุกแพลตฟอร์มโซเชียลมีเดีย... จะมีอะไรบ้างมาดูกันเลย</P>

      <Divider />
      <H2>1. เข้าใจกลุ่มเป้าหมายให้ลึกก่อนลงมือเขียน</H2>
      <P>การเขียนให้โดนใจเริ่มจากการ &quot;รู้จักคนที่เราจะสื่อสารด้วยจริงๆ&quot; เพราะถ้าเราเข้าใจเขาลึกพอ จะเลือกคำ พูดโทนและวิธีเล่าเรื่องได้ตรงใจมากขึ้น ดังนั้นควรลองถามตัวเองก่อนเสมอว่า</P>
      <UL items={[
        "เขาเป็นใคร? (วัยรุ่น? คนทำงาน? หรือคุณแม่บ้าน?)",
        "เขามีปัญหาอะไรที่เราช่วยแก้ได้?",
        "เขาใช้ภาษาแบบไหน? (ชิลๆ คุยเล่นหรือจริงจังแบบนักธุรกิจ?)",
      ]} />
      <Note>ตัวอย่าง: ถ้าเป้าหมายคือ Gen Z ที่ชอบความเร็วและความสนุก คำพูดก็ควรสบายๆ เช่น &quot;อยากผิวใส ไม่ต้องง้อฟิลเตอร์ ต้องลองสิ่งนี้เลย!&quot;</Note>

      <Divider />
      <H2>2. หัวข้อ (Headline) ต้องดึงดูดตั้งแต่แรกเห็น</H2>
      <P>หัวข้อคือสิ่งแรกที่คนเห็น และมักเป็นจุดตัดสินใจว่าจะ &quot;อ่านต่อหรือปิดไป&quot;</P>
      <P>เทคนิคเขียนหัวข้อให้ปัง:</P>
      <UL items={[
        "ใช้คำกระตุ้นความสนใจ เช่น \"ความลับ\", \"เหตุผลที่\", \"เพราะอะไร\"",
        "สั้น กระชับ ตรงประเด็น",
        "เน้นผลลัพธ์หรือประโยชน์ที่คนจะได้",
      ]} />
      <Note>ตัวอย่าง: &quot;5 ข้อดีของการทำการตลาด&quot; หรือ &quot;ทำการตลาดไม่ปังเพราะยังไม่รู้ 5 สิ่งนี้!&quot;</Note>

      <Divider />
      <H2>3. ขาย &quot;ประโยชน์&quot; มากกว่าคุณสมบัติ</H2>
      <P>ลูกค้าไม่สนว่าของเรามี &quot;อะไร&quot; แต่สนว่ามัน &quot;ช่วยอะไร&quot; ได้บ้าง เช่น จากที่จะพูดว่า &quot;กล้องคมชัด 48 ล้านพิกเซล&quot; ก็อาจเปลี่ยนเป็น &quot;กล้องถ่ายรูปคมชัด เก็บได้ทุกโมเมนต์ได้แม้ในที่แสงน้อย&quot;</P>

      <Divider />
      <H2>4. Call to Action ต้องชัดและเร้าใจ</H2>
      <P>CTA คือประโยคที่บอกให้ผู้อ่าน &quot;ลงมือทำ&quot; ต่อ เช่น คลิก สมัครหรือกดสั่งซื้อ ด้วยการใช้เทคนิค</P>
      <UL items={[
        "ใช้คำสั้นๆ ที่ตรงประเด็น",
        "สื่อให้รู้สึกว่า \"ต้องทำตอนนี้เดี๋ยวนี้\"",
      ]} />
      <P>ตัวอย่าง:</P>
      <UL items={[
        "สมัครฟรี คลิกเลย",
        "สั่งซื้อตอนนี้ รับโปรฯ พิเศษ!",
        "พิเศษเฉพาะคุณ จำกัดแค่ 3 วัน!",
      ]} />

      <Divider />
      <H2>5. ใส่หลักจิตวิทยาเล็กๆ ลงไป</H2>
      <P>คำบางคำมีพลังในการกระตุ้นอารมณ์และการตัดสินใจ เช่น</P>
      <UL items={[
        <>&quot;เฉพาะคุณ&quot; → ทำให้รู้สึกพิเศษ</>,
        <>&quot;วันนี้เท่านั้น&quot; → กระตุ้นให้เร่งมือ</>,
        <>&quot;เหลือเพียง 5 ชิ้นสุดท้าย&quot; → เพื่อกระตุ้นการเกิด FOMO</>,
      ]} />

      <Divider />
      <H2>6. ปรับสไตล์ให้เข้ากับแต่ละแพลตฟอร์ม</H2>
      <P>ไม่ใช่ทุกช่องทางจะใช้วิธีเขียนแบบเดียวกัน จำเป็นต้องเรียนรู้พฤติกรรมของผู้ใช้และอัลกอริทึมของแพลตฟอร์มเช่นกัน</P>
      <UL items={[
        <><strong>Facebook และ Instagram:</strong> กระชับ มีพลัง ภาพที่ใช้ต้องดึงดูดและสร้างการแชร์ต่อง่าย</>,
        <><strong>เว็บไซต์หรือบล็อก:</strong> รายละเอียดครบ โครงสร้างอ่านง่าย (H1, H2, Bullet) และมี SEO ที่ดี</>,
        <><strong>อีเมลและ LINE:</strong> มีความ Personalized อบอุ่นและมี Call To Action ชัดเจน</>,
        <><strong>Tiktok และ YouTube:</strong> เน้นจังหวะการเล่าเรื่อง ให้ฟังแล้วลื่น น่าติดตาม</>,
      ]} />

      <Divider />
      <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "16px", padding: "24px 28px" }}>
        <h3 style={{ ...KT, color: "#5f26e5", fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>สรุป: Copywriting คือศิลปะ + จิตวิทยา + การตลาด</h3>
        <P>การเขียน Copywriting ที่ดีต้องผสมผสานระหว่างความเข้าใจลูกค้า + ความคิดสร้างสรรค์ + เทคนิคการสื่อสาร ที่เหมาะกับแพลตฟอร์ม ใครที่สามารถใช้ 3 สิ่งนี้ได้พร้อมกันก็จะสามารถเปลี่ยน &quot;คำธรรมดา&quot; ให้กลายเป็น &quot;คำที่ทรงพลัง&quot; ที่สร้างยอดขายและผลลัพธ์ทางธุรกิจได้จริงอย่างแน่นอน</P>
      </div>
    </>
  );
}

const SLUGS = ["how-to-start-influencer-campaign", "how-to-choose-influencer-marketing-agency", "how-to-find-the-right-influencer", "influencer-marketing-budget-by-objective", "how-to-choose-influencer-checklist", "instagram-2026-benchmark", "content-per-platform-fb-tiktok-ig", "social-media-insight-2026", "content-strategy-canvas", "best-time-to-post-2025", "tiktok-algorithm-9-techniques", "influencer-mapping-canvas", "6-copywriting-techniques"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
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
      <article style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 0" }}>
        {/* Section label */}
        <div style={{ paddingTop: "0", marginBottom: "28px" }}>
          <span style={{ ...KT, color: "#5f26e5", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>
            Industry Insights
          </span>
        </div>

        {/* Cover image */}
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", marginBottom: "40px" }}>
          <Image src={post.detailImage || post.image} alt={post.title} width={800} height={420} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
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
            {post.categories.map((cat: string) => <Tag key={cat} label={cat} lang={lang} />)}
          </div>
          <h1 style={{ ...KT, color: "#5f26e5", fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, lineHeight: "1.4", margin: "0 0 24px", textAlign: "left" }}>
            {post.title}
          </h1>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", marginBottom: "32px" }} />

          {post.slug === "how-to-start-influencer-campaign" ? (
            <StartCampaignContent lang={lang as Locale} />
          ) : post.slug === "how-to-choose-influencer-marketing-agency" ? (
            <ChooseAgencyContent lang={lang as Locale} />
          ) : post.slug === "how-to-find-the-right-influencer" ? (
            <FindInfluencerContent lang={lang as Locale} />
          ) : post.slug === "influencer-marketing-budget-by-objective" ? (
            <InfluencerBudgetContent lang={lang as Locale} />
          ) : post.slug === "how-to-choose-influencer-checklist" ? (
            <InfluencerChecklistContent lang={lang as Locale} />
          ) : post.slug === "instagram-2026-benchmark" ? (
            <Instagram2026BenchmarkContent lang={lang as Locale} />
          ) : post.slug === "content-per-platform-fb-tiktok-ig" ? (
            <ContentPerPlatformContent lang={lang as Locale} />
          ) : post.slug === "social-media-insight-2026" ? (
            <SocialMediaInsight2026Content lang={lang as Locale} />
          ) : post.slug === "content-strategy-canvas" ? (
            <ContentStrategyCanvasContent lang={lang as Locale} />
          ) : post.slug === "tiktok-algorithm-9-techniques" ? (
            <TikTokContent lang={lang as Locale} />
          ) : post.slug === "best-time-to-post-2025" ? (
            <BestTimeContent lang={lang as Locale} />
          ) : post.slug === "influencer-mapping-canvas" ? (
            <InfluencerContent lang={lang as Locale} />
          ) : post.slug === "6-copywriting-techniques" ? (
            <CopywritingContent lang={lang as Locale} />
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
