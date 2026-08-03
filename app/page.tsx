"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

/* ── Logo Marquee ── */
const LOGO_FILES_ROW1 = [
  "Clients Logo-03.png",
  "Clients Logo-04.png",
  "Clients Logo-05.png",
  "Clients Logo-06.png",
  "Clients Logo-11.png",
  "Clients Logo-13.png",
  "Clients Logo-14.png",
  "Clients Logo-16.png",
];

const LOGO_FILES_ROW2 = [
  "Clients Logo-07.png",
  "Clients Logo-08.png",
  "Clients Logo-09.png",
  "Clients Logo-12.png",
  "Clients Logo-15.png",
  "Clients Logo-17.png",
  "Clients Logo-18.png",
  "Clients Logo-20.png",
  "Clients Logo-21.png",
  "Clients Logo-31.png",
];

const LOGOS_ROW1 = LOGO_FILES_ROW1.map((file) => (
  <Image
    key={file}
    src={`/logos/${file}`}
    alt={file.replace(".png","")}
    className="logo-marquee-img"
    width={200}
    height={86}
    style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }}
  />
));

const LOGOS_ROW2 = LOGO_FILES_ROW2.map((file) => (
  <Image
    key={file}
    src={`/logos/${file}`}
    alt={file.replace(".png","")}
    className="logo-marquee-img"
    width={200}
    height={86}
    style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }}
  />
));

function LogoMarquee({ logos, direction }: { logos: React.ReactNode[], direction: "left"|"right" }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow:"hidden", width:"100%" }}>
      <motion.div
        className="logo-marquee-track"
        style={{ display:"flex", alignItems:"center", gap:"56px", width:"max-content" }}
        animate={{ x: direction === "left" ? ["0%","-50%"] : ["-50%","0%"] }}
        transition={{ duration: 35, ease:"linear", repeat: Infinity }}
      >
        {doubled.map((logo, i) => (
          <div key={i} className="logo-marquee-item" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", height:"86px" }}>
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function CatCard({ cat }: { cat: typeof INF_CATEGORIES[0] }) {
  return (
    <div style={{
      width: "300px", flexShrink: 0,
      display: "flex", flexDirection: "row", alignItems: "center", gap: "16px",
      padding: "18px 22px",
      background: "rgba(255,255,255,0.22)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.45)",
      borderRadius: "20px", boxSizing: "border-box",
    }}>
      <div style={{ position: "relative", width: "62px", height: "62px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
        <Image src={cat.photo} alt={cat.label} fill sizes="62px"
          style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
        <span style={{ color: "#111827", fontWeight: 700, fontSize: "18px", lineHeight: "1.2",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {cat.label}
        </span>
        <span style={{
          color: "#5f26e5", fontSize: "13px", fontWeight: 500,
          padding: "4px 12px", borderRadius: "20px",
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)",
          display: "inline-block", width: "fit-content", whiteSpace: "nowrap",
        }}>
          {cat.category} {cat.emoji}
        </span>
      </div>
    </div>
  );
}

function CategoriesMarquee({ categories }: { categories: typeof INF_CATEGORIES }) {
  const mid = Math.ceil(categories.length / 2);
  const row1 = categories.slice(0, mid);
  const row2 = categories.slice(mid);
  // Triple each row so the base half is always wider than any viewport,
  // then double for the seamless -50% loop.
  const base1 = [...row1, ...row1, ...row1];
  const base2 = [...row2, ...row2, ...row2];
  const looped1 = [...base1, ...base1];
  const looped2 = [...base2, ...base2];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", overflow: "hidden", width: "100%" }}>
      {/* Row 1 — scrolls left */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="marquee-track-slow" style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {looped1.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </div>
      </div>
      {/* Row 2 — scrolls right */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="marquee-track-slow-reverse" style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {looped2.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </div>
      </div>
    </div>
  );
}

function TestimonialsCarousel({ items, lang }: { items: typeof TESTIMONIALS; lang: "th" | "en" }) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const at = (offset: number) => items[(index + offset + total) % total];

  const wheelLocked = useRef(false);
  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 12) return;
    e.preventDefault();
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    go(delta > 0 ? 1 : -1);
    setTimeout(() => { wheelLocked.current = false; }, 500);
  };

  const TCCard = ({ item, active }: { item: typeof TESTIMONIALS[0]; active: boolean }) => (
    <div className={active ? "tc-card tc-card-active" : "tc-card tc-card-side"} style={{
      width: active ? "420px" : "380px",
      flexShrink: 0,
      borderRadius: "20px",
      background: "rgba(255,255,255,0.22)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.45)",
      padding: active ? "40px 32px" : "32px 24px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
      boxSizing: "border-box",
      opacity: active ? 1 : 0.45,
      transform: active ? "scale(1)" : "scale(0.9)",
      filter: active ? "none" : "blur(0.5px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      <div style={{ position: "relative", width: active ? "88px" : "72px", height: active ? "88px" : "72px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, transition: "width 0.4s ease, height 0.4s ease" }}>
        <Image src={item.photo} alt={item.name} fill sizes="88px" style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ ...KT, color: "#5f26e5", fontSize: active ? "20px" : "17px", fontWeight: 700, margin: 0 }}>{item.name}</p>
      </div>
      <p style={{
        ...KT, color: active ? "#374151" : "#9ca3af", fontSize: active ? "16px" : "14px", lineHeight: "1.65",
        textAlign: "center", fontWeight: 400, margin: 0, display: "-webkit-box",
        WebkitLineClamp: active ? 4 : 3, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden",
      }}>{lang === "th" ? item.text : item.textEn}</p>
    </div>
  );

  return (
    <div>
      <div className="tc-wrap" onWheel={onWheel} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", padding: "20px 70px" }}>
        {/* Prev arrow */}
        <button onClick={() => go(-1)} className="tc-arrow"
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            background: "rgba(95,38,229,0.10)", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 5L7.5 10L12.5 15" stroke="#5f26e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="tc-side">
          <TCCard item={at(-1)} active={false} />
        </div>
        <div className="tc-center">
          <TCCard item={at(0)} active={true} />
        </div>
        <div className="tc-side">
          <TCCard item={at(1)} active={false} />
        </div>

        {/* Next arrow */}
        <button onClick={() => go(1)} className="tc-arrow"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            background: "#5f26e5", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dot progress bar */}
      <div className="carousel-dots" style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px" }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            style={{ height: "10px", width: i === index ? "28px" : "10px",
              borderRadius: "5px", border: "none", cursor: "pointer",
              background: i === index ? "#5f26e5" : "rgba(95,38,229,0.25)",
              transition: "width 0.3s ease, background 0.3s ease", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Icons ── */



const BLOG_POSTS = [
  {
    slug: "best-time-to-post-2025",
    title: "รวมวันและเวลาที่ดีที่สุดในการโพสต์บนโซเชียลมีเดีย ปี 2025",
    titleEn: "The Best Days and Times to Post on Social Media in 2025",
    desc: "เคยสงสัยไหมว่า… \"ทำไมบางโพสต์แทบไม่มีคนเห็น แต่บางโพสต์กลับไวรัลขึ้นมาได้?\" ความลับไม่ได้อยู่ที่คอนเทนต์อย่างเดียว แต่ \"เวลา\" ก็เป็นอีกปัจจัยสำคัญที่กำหนดว่าคอนเทนต์ของคุณจะไปโผล่บนฟีดใครบ้าง",
    descEn: "Ever wondered... \"why do some posts barely get seen while others go viral?\" The secret isn't just the content — \"timing\" is another key factor that determines whose feed your content lands on.",
    image: "/blogs/blog-best-time.png",
    categories: ["สำหรับอินฟลูเอนเซอร์"],
    categoriesEn: ["For Influencers"],
  },
  {
    slug: "tiktok-algorithm-9-techniques",
    title: "ถอดรหัสอัลกอริทึม TikTok + 9 เทคนิคทำคลิปให้ดังแบบมืออาชีพ",
    titleEn: "Decoding the TikTok Algorithm + 9 Techniques for Making Clips Go Big Like a Pro",
    desc: "หลายคนที่เล่น TikTok อาจสงสัยว่า \"ทำไมบางคลิปแทบไม่มีคนดู แต่บางคลิปกลับไวรัล?\"",
    descEn: "Many TikTok users wonder... \"why do some clips barely get views while others go viral?\"",
    image: "/blogs/blog-2.png",
    categories: ["สำหรับแบรนด์", "สำหรับอินฟลูเอนเซอร์"],
    categoriesEn: ["For Brands", "For Influencers"],
  },
  {
    slug: "influencer-mapping-canvas",
    title: "วิธีเลือกอินฟลูเอนเซอร์ที่ใช่สำหรับแบรนด์ ด้วย Influencer Mapping Canvas",
    titleEn: "How to Pick the Right Influencer for Your Brand With an Influencer Mapping Canvas",
    desc: "ยุคนี้อินฟลูเอนเซอร์ไม่ได้เป็นเพียงแค่ \"คนดังบนโลกออนไลน์\" แต่คือผู้ทรงอิทธิพล",
    descEn: "Today, influencers aren't just \"online celebrities\" — they're people who genuinely shape opinion.",
    image: "/blogs/blog-influencer-mapping.png",
    categories: ["สำหรับแบรนด์"],
    categoriesEn: ["For Brands"],
  },
];

const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const KOL_PACKAGES = [
  {
    name: "Start",
    price: "50,000",
    cta: "Get Start",
    features: ["Proposal", "KOL List", "Campaign Timeline", "Campaign Performance"],
  },
  {
    name: "Basic",
    price: "100,000",
    cta: "Go Basic",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Campaign Performance"],
  },
  {
    name: "Pro",
    price: "300,000",
    cta: "Go Pro",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Campaign Performance", "Campaign Summary & Recommend", "Sentiment Analysis on Campaign Dashboard"],
  },
  {
    name: "Premium",
    price: "500,000",
    cta: "Go Premium",
    features: ["Proposal", "KOL Category Suggestion", "Content Idea", "KOL List", "Campaign Timeline", "Market Research", "Competitor Analysis", "Audience Analysis", "Communication Strategy", "Campaign Performance", "Campaign Summary & Recommend", "Sentiment Analysis on Campaign Dashboard"],
  },
];

const TESTIMONIALS = [
  {
    photo: "/influencers/inf-cheese.jpg",
    name: "ชีส",
    text: "ได้ร่วมงานกับ Buddy Review มาหลายปีแล้ว มีโอกาสได้รับงานที่หลากหลายและทีมงานน่ารักและใส่ใจทุกคน หวังว่าจะได้ร่วมงานกันไปนานๆ นะ ครับ Buddy Review Fighting!!",
    textEn: "I've worked with Buddy Review for several years now. I've had the chance to take on all kinds of jobs, and the team is lovely and attentive to everyone. Hoping we keep working together for a long time — Buddy Review, fighting!!",
  },
  {
    photo: "/influencers/inf-yam.jpg",
    name: "แยม",
    text: "รู้สึกดีใจที่ได้ร่วมงานกับทีมงานที่น่ารัก เป็นกันเองและมืออาชีพมากๆ อย่าง Buddy Review ภายใต้การร่วมงานดังกล่าว ทำให้แยมได้รับโอกาสร่วมงานกับแบรนด์ระดับประเทศที่มีความน่าเชื่อถือ ซึ่งนับว่าเป็นประสบการณ์ทำงานร่วมกันที่คุ้มค่ามากๆ ค่ะ",
    textEn: "I'm so glad to work with a team as warm, friendly, and professional as Buddy Review. Through this partnership, I've gotten the chance to work with trusted, national-level brands — a truly rewarding experience.",
  },
  {
    photo: "/influencers/inf-riwago.jpg",
    name: "ริวโกะ",
    text: "ชอบทำงานกับ Buddy Review มากๆเพราะบัดดี้คุยงานง่าย บรีฟเข้าใจ ทำงานไว เป็นระบบ ไม่เอาเปรียบอินฟลูและป้อนงานให้ริวโกะเยอะมากๆๆ🥺💖🙏🏻 รัก Buddy Review และอยากทำด้วยไปนานๆเลยค่ะ",
    textEn: "I really love working with Buddy Review — the team is easy to talk to, briefs are clear, work moves fast, and everything's systematic. They never shortchange influencers and send me tons of work 🥺💖🙏🏻 Love Buddy Review, want to keep working with them for a long time.",
  },
  {
    photo: "/influencers/inf-maihom.jpg",
    name: "ไม้หอม",
    text: "เราเริ่มต้นรีวิวต่างๆจาก Buddy review เลยค่ะ เพื่อนแนะนำมา จนตอนนี่ผ่านไปหลายปีแล้วเราก็ยังรับงานจาก Buddy review อยู่ มีงานให้เลือกตลอด และได้มีโอกาสทำงานร่วมกับแบรนด์ดังหลายแบรนด์เลย ต้องขอบคุณเพื่อนคนนั้นมากๆที่แนะนำให้เรารู้จักกับที่นี่เพราะมันดีสุดๆ แอดมินก็ดูแลดีมากๆค่ะ",
    textEn: "Buddy Review is where I started doing reviews — a friend recommended it. Years later, I'm still taking on jobs from them. There's always work to choose from, and I've had the chance to work with many well-known brands. Huge thanks to that friend for the introduction — it's been great, and the admins take excellent care of us.",
  },
  {
    photo: "/influencers/inf-puifai.jpg",
    name: "ปุยฝ้าย",
    text: "ชอบทำงานกับ Buddy review ทั้งเรื่องของแบรนด์ที่มาจากช่องทางนี้จะเป็นแบรนด์ที่น่าเชื่อถือและเป็นที่รู้จักค่ะ บรีฟงานและรายละเอียดมักจะชัดเจน และเคารพการตัดสินใจของ influencer ที่สำคัญแอดมินทุกท่านเต็มใจและเข้าใจในการทำงาน ทำให้ทุกอย่างง่ายและ flow ไปในทิศทางเดียวกัน ทำให้การทำงานสนุกมากขึ้นค่ะ",
    textEn: "I love working with Buddy Review — the brands that come through this channel are trusted and well-known. Briefs and details are always clear, and they respect the influencer's decisions. Most importantly, every admin is genuinely willing and understanding, which makes everything flow smoothly and makes the work more enjoyable.",
  },
  {
    photo: "/influencers/inf-may.jpg",
    name: "มาย",
    text: "Buddy Review เป็นช่องทางที่ทำให้เราได้แสดงศักยภาพได้อย่างเต็มที่และอิสระ ทำให้เราได้รู้จักคำว่า การทำงานสามารถทำได้ทุกที่บนโลกใบนี้ นอกจากนี้ก็ยังได้เพื่อน สังคมใหม่ๆ และเข้าใจคำว่าทีม และการซัพพอร์ต",
    textEn: "Buddy Review is the channel that let me show my full potential, freely. It taught me that work can happen anywhere in the world. On top of that, I've gained new friends, a new community, and a real understanding of teamwork and support.",
  },
];

const INF_CATEGORIES = [
  { label: "thisisbebe",                   category: "Sporty & Healthy",  emoji: "💪",  color: "#4caf50",  initial: "T",  photo: "/inf-categories/cat-thisisbebe.jpeg" },
  { label: "ออมมิ่วคิ้วขมวด",              category: "TikTok Stars",      emoji: "🎵",  color: "#e91e8c",  initial: "อ",  photo: "/inf-categories/cat-ommiew.jpeg" },
  { label: "soundtiss",                    category: "Beauty Blogger",    emoji: "💄",  color: "#9c27b0",  initial: "S",  photo: "/inf-categories/cat-soundtiss.jpeg" },
  { label: "อาชิมีลูกชายหรือหญิง",          category: "Beauty Blogger",    emoji: "💄",  color: "#9c27b0",  initial: "อ",  photo: "/inf-categories/cat-archi.jpeg" },
  { label: "Mawinn Taweephol",             category: "Foodie",            emoji: "🍜",  color: "#ff9800",  initial: "M",  photo: "/inf-categories/cat-mawinn.jpeg" },
  { label: "pigkaploy",                    category: "Youtuber",          emoji: "🎬",  color: "#f44336",  initial: "P",  photo: "/inf-categories/cat-pigkaploy.jpeg" },
  { label: "frungnarikunn",               category: "Doctor & Nurse",    emoji: "🩺",  color: "#2196f3",  initial: "F",  photo: "/inf-categories/cat-frungnarikunn.jpeg" },
  { label: "Toeyprim เตยพริมเป็นหมอฟัน",  category: "Dentist",           emoji: "🦷",  color: "#00bcd4",  initial: "T",  photo: "/inf-categories/cat-toeyprim.jpeg" },
];

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const t = lang === "th" ? th : en;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  const [consented, setConsented] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedKol, setExpandedKol] = useState<Set<string>>(new Set());
  const csRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const catSlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    if (!consented) return;
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
        setConsented(false);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{
      ...KT,
      backgroundImage: "url('/light-gradient-landing-bg.jpg')",
      backgroundSize: "100% 100%",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
    }}>

      {/* ── Navbar ── */}
      <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
        <nav style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "100px",
            paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px" }}
          className="flex items-center justify-between nav-landing">
          <div className="flex items-center gap-3">
            <Image src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"} alt="Buddy Review" className="nav-logo" width={138} height={48} style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }} />
          </div>
          {/* Desktop buttons */}
          <div className="desktop-nav-btns flex items-center gap-3">
            <a href="#contact"
              className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
              {t.contactUs}
            </a>
            <Link href="/influencer"
              className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", ...(scrolled ? { color: "#5f26e5" } : {}) }}>
              {t.imInfluencer}
            </Link>
            <button onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="btn-hero px-5 py-3 rounded-full ml-1" style={{ ...KT, fontSize: "16px", fontWeight: 600, ...(scrolled ? { color: "#5f26e5" } : {}) }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
          {/* Hamburger button — mobile only */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}>
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#ffffff", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}) }} />
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#ffffff", borderRadius: "2px", transition: "opacity 0.25s", ...(menuOpen ? { opacity: 0 } : {}) }} />
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#ffffff", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}) }} />
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div style={{
            marginTop: "10px",
            background: "rgba(15,10,40,0.92)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "24px",
            padding: "20px 24px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
              {t.contactUs}
            </a>
            <Link href="/influencer" onClick={() => setMenuOpen(false)}
              className="btn-hero rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
              {t.imInfluencer}
            </Link>
            <button onClick={() => { setLang(lang === "th" ? "en" : "th"); setMenuOpen(false); }}
              className="btn-hero rounded-full"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
        )}
      </div>

      {/* ── Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 relative hero-section"
        style={{
          minHeight: "72vh",
          paddingTop: "128px",
          paddingBottom: "64px",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Background image */}
        <Image src="/header-landing-bg3.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" style={{
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }} />
        <div className="relative" style={{ maxWidth: "1100px", zIndex: 2 }}>
          <h1 className="font-bold uppercase mb-6 hero-h1"
            style={{ color: "#ffffff", fontSize: "clamp(28px,3.9vw,56px)", lineHeight: "84px", textAlign: "center",
              fontFeatureSettings: "'pnum' on,'lnum' on",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)" }}>
            {t.headline1}<br/>{t.headline2}
          </h1>
          <h2 className="font-normal mb-12"
            style={{ color: "#ffffff", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: "1.7", textAlign: "center",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 48px" }}>
            From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#solutions" className="btn-hero font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none", color: "#5f26e5" }}>
              {t.imBrand}
            </a>
            <Link href="/influencer" className="btn-hero btn-hero-solid-purple font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none" }}>
              {t.imInfluencer}
            </Link>
          </div>

          {/* Impact Stats — static figures from Success Stories section */}
          <div className="hero-stats-strip" style={{
            display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
            marginTop: "76px",
          }}>
            {[
              { value: "1,000,000+", label: lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network" },
              { value: "1,000+", label: lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients" },
              { value: "4,000+", label: lang === "th" ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered" },
            ].map((s) => (
              <div key={s.label} className="hero-stat-item" style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "6px",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                borderRadius: "20px",
                padding: "26px 20px",
                width: "280px",
                boxSizing: "border-box",
              }}>
                <span style={{
                  ...KT, fontSize: "clamp(20px,2.7vw,39px)", fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap",
                  background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {s.value}
                </span>
                <span style={{ ...KT, fontSize: "clamp(13px,1.3vw,20px)", fontWeight: 500, color: "#111827", lineHeight: 1.35, whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── Hero → Logos fade overlay ── */}
      <div style={{ height: "120px", marginTop: "-120px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 11, pointerEvents: "none" }} />

      {/* ── Brand Logos Marquee ── */}
      <section className="brand-logos-section" style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 5%, rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.42) 15%, rgba(255,255,255,0.64) 20%, rgba(255,255,255,0.82) 25%, rgba(255,255,255,0.93) 30%, rgba(255,255,255,0.98) 35%, #ffffff 40%, #ffffff 55%, rgba(255,255,255,0.97) 60%, rgba(255,255,255,0.88) 66%, rgba(255,255,255,0.72) 73%, rgba(255,255,255,0.52) 80%, rgba(255,255,255,0.3) 87%, rgba(255,255,255,0.1) 94%, rgba(255,255,255,0) 100%)",
        padding: "120px 0 120px",
        overflow: "hidden",
        marginTop: "-90px",
        position: "relative",
        zIndex: 5,
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}>
        {/* Row 1 — scrolls left */}
        <LogoMarquee logos={LOGOS_ROW1} direction="left" />
        <div className="logo-marquee-row-gap" style={{ height: "32px" }}/>
        {/* Row 2 — scrolls right */}
        <LogoMarquee logos={LOGOS_ROW2} direction="right" />
      </section>

      {/* ── Your Trusted Partner ── */}
      <section style={{ background: DARK_BG, paddingTop: "80px", paddingBottom: "80px" }} className="px-6 trusted-section">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Heading */}
          <div className="text-center mb-12" style={{ maxWidth: "954px", margin: "0 auto 48px" }}>
            <h2 className="font-bold mb-6 heading-lh-55"
              style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "55px", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Your Trusted Partner in Thailand&apos;s<br/>Influencer Marketing Landscape
            </h2>
            <p className="font-normal desc-text"
              style={{ fontSize: "18px", lineHeight: "1.7", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                color: "#111827" }}>
              {lang === "th" ? (
                <>เอเจนซี่ Influencer Marketing ที่ผสานข้อมูล เทคโนโลยี และทีมผู้เชี่ยวชาญ<br/>
                เพื่อออกแบบแคมเปญที่แม่นยำ วัดผลได้ และสร้างการเติบโตทางธุรกิจอย่างยั่งยืน</>
              ) : (
                <>An Influencer Marketing agency blending data, technology, and expert teams<br/>
                to craft precise, measurable campaigns that drive sustainable business growth.</>
              )}
            </p>
          </div>

          {/* 4 Photo Cards */}
          <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { src: "/card1.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบที่ชัดเจนตามมาตรฐาน",       descEn: "Working within a clear, standardized system." },
              { src: "/card2.jpg", title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจ ทำให้ทุกแคมเปญสำเร็จ",       descEn: "A team that understands you, making every campaign succeed." },
              { src: "/card3.png", title: "Data-Driven Precision",      desc: "เทคโนโลยีช่วยให้คุณตัดสินใจง่ายขึ้น",     descEn: "Technology that makes your decisions easier." },
              { src: "/card4.png", title: "Success Delivered",          desc: "ทุกแคมเปญ มุ่งสู่ความสำเร็จที่ชัดเจน",     descEn: "Every campaign, driven toward clear, measurable success." },
            ].map((card) => (
              <div key={card.title} className="relative overflow-hidden photo-card-h"
                style={{ height: "403px", borderRadius: "24px" }}>
                <Image src={card.src} alt={card.title} fill className="object-cover object-top" sizes="280px"/>
                <div className="absolute bottom-0 left-0 right-0"
                  style={{ background: "linear-gradient(to top,rgba(95,38,229,1) 0%,rgba(95,38,229,0) 100%)",
                    padding: "29px 18px" }}>
                  <h3 className="text-white font-medium text-center"
                    style={{ fontSize: "24px", lineHeight: "1.2", textTransform: "capitalize",
                      fontFeatureSettings: "'pnum' on,'lnum' on", marginBottom: "8px" }}>
                    {card.title}
                  </h3>
                  <p className="text-white font-normal text-center"
                    style={{ fontSize: "16px", lineHeight: "1.5" }}>
                    {lang === "th" ? card.desc : card.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buddy Review Solutions ── */}
      <section id="solutions" style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Heading */}
          <h2 className="text-center font-bold mb-14 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: "0 0 56px" }}>
            Buddy Review{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Solutions
            </span>
          </h2>

          {/* 4 services in 2×2 grid */}
          <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "32px 24px" }}>
              {[
                { icon: "/icon-photo-video.png", title: "Photo / Video Production",
                  desc: "การผลิตภาพถ่ายและวิดีโอสำหรับใช้ในคอนเทนต์และการสื่อสารของแบรนด์",
                  descEn: "Photo and video production for your brand's content and communications." },
                { icon: "/icon-onsite.png", title: "On-site Campaign & Staff Support",
                  desc: "การดูแลและประสานงานแคมเปญในสถานที่จริง พร้อมจัดทีมงานซัพพอร์ต",
                  descEn: "On-the-ground campaign management and coordination, with staff support included." },
                { icon: "/icon-ondemand.png", title: "On-Demand & Fast-Track Campaigns",
                  desc: "แคมเปญที่เริ่มและดำเนินงานได้รวดเร็ว ตอบโจทย์แบรนด์ในเวลาจำกัด",
                  descEn: "Campaigns that launch and run fast, built for brands working against the clock." },
                { icon: "/icon-network.png", title: "Influencer Network",
                  desc: "เครือข่ายอินฟลูเอนเซอร์ที่หลากหลาย เชื่อมต่อให้เหมาะกับแบรนด์ของคุณ",
                  descEn: "A diverse influencer network, matched to fit your brand." },
              ].map(({ icon, title, desc, descEn }) => (
                <div key={title} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="icon-wrap-lg" style={{ background: "#ede9f8", borderRadius: "50%",
                    width: "68px", height: "68px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "flex-start" }}>
                    <span style={{ display: "inline-block", width: "40px", height: "40px",
                      backgroundColor: "#5f26e5",
                      WebkitMaskImage: `url(${icon})`, WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
                      maskImage: `url(${icon})`, maskSize: "contain",
                      maskRepeat: "no-repeat", maskPosition: "center" }} />
                  </div>
                  <h3 className="card-h3" style={{ ...KT, fontSize: "24px", fontWeight: 700, color: "#111827",
                    lineHeight: "1.3", margin: 0 }}>{title}</h3>
                  <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: 0 }}>{lang === "th" ? desc : descEn}</p>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* ── Success Stories (card carousel, reference: ฉันคืออินฟลูเอนเซอร์ page) ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Heading — matches site-standard section heading style */}
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Success{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Stories</span>
          </h2>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button onClick={() => csRef.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(95,38,229,0.10)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#5f26e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => csRef.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Cards scroll row */}
          <div ref={csRef} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], paddingBottom: "8px" }}>

            {/* ── Cards ── */}
            {[
              { href: "/success/nissin",         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          taglineEn: "Sparking social media food cravings with a bold new flavor: spicy Tom Yum Kung cheese." },
              { href: "/success/ldc-dental",     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", taglineEn: "Clear-aligner reviews from influencers, leading into an exclusive event with LDC Dental." },
              { href: "/success/watsons",        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               taglineEn: "House-brand products taking off with influencer power on TikTok & Lemon8." },
              { href: "/success/viu",            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          taglineEn: "Local-powered influencers bringing the \"Isan Chom Wiew\" campaign to life." },
              { href: "/success/ahc",            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   taglineEn: "Igniting brand buzz with an event inspired by the viral series \"AHC Skin Game.\"" },
              { href: "/success/guss-damn-good", img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   taglineEn: "A flavor with a story: when ice cream meets antacid powder." },
            ].map(card => (
              <Link key={card.href} href={card.href} className="cs-card-link" style={{ textDecoration: "none", flexShrink: 0, width: "390px", scrollSnapAlign: "start" }}>
                <div className="cs-card" style={{
                  borderRadius: "28px", height: "520px",
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxSizing: "border-box",
                }}>
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
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/category/${catSlug(card.cat)}`); }}
                      className="cs-cat-btn" style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
                    >
                      {card.cat}
                    </button>
                  </div>
                  {/* Bottom info */}
                  <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                    <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>{lang === "th" ? card.tagline : card.taglineEn}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* dummy spacer so last card doesn't stick to edge */}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>

          {/* ดูเพิ่มเติม CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <Link href="/success" className="btn-insight" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {t.viewMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Influencers ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-12"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "85px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Trust{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Influencers</span>
          </h2>

          {/* Infinite marquee — auto-slides right to left */}
          <TestimonialsCarousel items={TESTIMONIALS} lang={lang} />
        </div>
      </section>

      {/* ── Influencer Categories ── */}
      <section style={{ background: DARK_BG, overflow: "hidden" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Influencer{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Categories</span>
          </h2>
        </div>

        <CategoriesMarquee categories={INF_CATEGORIES} />
      </section>

      {/* ── KOL Campaign Packages ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-14 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            KOL Campaign{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Packages</span>
          </h2>

          <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", alignItems: "stretch" }}>
            {KOL_PACKAGES.map((pkg) => {
              const featured = pkg.name === "Basic";
              const isExpanded = expandedKol.has(pkg.name);
              const visibleFeatures = pkg.features.slice(0, 4);
              const hiddenFeatures = pkg.features.slice(4);
              return (
              <div key={pkg.name} className="kol-card" style={{
                background: featured ? "#5f26e5" : "rgba(255,255,255,0.22)",
                backdropFilter: featured ? "none" : "blur(18px)",
                WebkitBackdropFilter: featured ? "none" : "blur(18px)",
                border: featured ? "none" : "1px solid rgba(255,255,255,0.45)",
                borderRadius: "24px",
                padding: "36px 28px 32px",
                display: "flex", flexDirection: "column", gap: "0",
              }}>
                {/* Plan name */}
                <h3 style={{ color: featured ? "#ffffff" : "#5f26e5", fontSize: "24px", fontWeight: 600, textAlign: "center", margin: "0 0 20px" }}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <span style={{ color: featured ? "rgba(255,255,255,0.8)" : "#111827", fontSize: "18px", fontWeight: 400 }}>THB </span>
                  <span className="kol-price-text" style={{ color: featured ? "#ffffff" : "#111827", fontSize: "36px", fontWeight: 800, letterSpacing: "-1px" }}>
                    {pkg.price}
                  </span>
                </div>

                {/* CTA button */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                  <button style={{
                    ...KT,
                    background: featured ? "#ffffff" : "rgba(255,255,255,0.18)",
                    backdropFilter: featured ? "none" : "blur(12px)",
                    WebkitBackdropFilter: featured ? "none" : "blur(12px)",
                    border: featured ? "none" : "1px solid rgba(255,255,255,0.35)",
                    borderRadius: "50px",
                    color: "#5f26e5",
                    fontSize: "16px", fontWeight: 600,
                    padding: "10px 28px", cursor: "pointer",
                  }}>
                    {pkg.cta}
                  </button>
                </div>

                {/* Feature list — first 4 always visible */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {visibleFeatures.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        background: featured ? "rgba(255,255,255,0.25)" : "rgba(95,38,229,0.22)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: "1px",
                      }}>
                        <IconCheck color={featured ? "#ffffff" : "#5f26e5"} />
                      </div>
                      <span style={{ color: featured ? "rgba(255,255,255,0.92)" : "#111827", fontSize: "16px", fontWeight: 400, lineHeight: "1.5" }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Extra features — always visible desktop, toggle on mobile */}
                {hiddenFeatures.length > 0 && (
                  <div className="kol-extra-features" data-expanded={isExpanded} style={{ flexDirection: "column", gap: "14px", marginTop: "14px" }}>
                    {hiddenFeatures.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{
                          width: "26px", height: "26px", borderRadius: "50%",
                          background: featured ? "rgba(255,255,255,0.25)" : "rgba(95,38,229,0.22)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: "1px",
                        }}>
                          <IconCheck color={featured ? "#ffffff" : "#5f26e5"} />
                        </div>
                        <span style={{ color: featured ? "rgba(255,255,255,0.92)" : "#111827", fontSize: "16px", fontWeight: 400, lineHeight: "1.5" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ดูเพิ่มเติม — mobile only */}
                {hiddenFeatures.length > 0 && (
                  <button className="kol-show-more-btn"
                  onClick={() => setExpandedKol(prev => {
                    const next = new Set(prev);
                    next.has(pkg.name) ? next.delete(pkg.name) : next.add(pkg.name);
                    return next;
                  })}
                  onTouchEnd={(e) => { e.preventDefault(); setExpandedKol(prev => { const next = new Set(prev); next.has(pkg.name) ? next.delete(pkg.name) : next.add(pkg.name); return next; }); }}
                  style={{
                    ...KT, marginTop: "16px", background: "none", border: `1px solid ${featured ? "rgba(255,255,255,0.5)" : "rgba(95,38,229,0.4)"}`,
                    borderRadius: "50px", color: featured ? "#ffffff" : "#5f26e5",
                    fontSize: "14px", fontWeight: 600, padding: "8px 20px", cursor: "pointer",
                    alignSelf: "center", width: "fit-content", touchAction: "manipulation", position: "relative", zIndex: 1,
                  }}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                      {isExpanded ? t.showLess : t.viewMore}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        style={{ transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                        <path d="M3 5l4 4 4-4" stroke={featured ? "#ffffff" : "#5f26e5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                )}
              </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <a href="#contact" className="btn-insight" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {t.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* ── Industry Insights ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-14 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Industry{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Insights</span>
          </h2>

          <div className="grid-3-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {BLOG_POSTS.map((post) => (
              <a key={post.title} href={`/blog/${post.slug}`} style={{
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "none",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                textDecoration: "none",
              }}>
                {/* Banner */}
                <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image src={post.image} alt={lang === "th" ? post.title : post.titleEn} fill sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover", display: "block", borderRadius: "12px" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="blog-card-content" style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                  {/* Category tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(lang === "th" ? post.categories : post.categoriesEn).map((cat) => (
                      <span key={cat} style={{ ...KT, background: "rgba(255,255,255,0.15)", color: "#111827",
                        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
                        fontSize: "13px", fontWeight: 600, padding: "4px 14px",
                        display: "inline-block" }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  {/* Title */}
                  <h3 className="card-h3" style={{ color: "#5f26e5", fontSize: "24px", fontWeight: 700, lineHeight: "1.45", margin: 0 }}>
                    {lang === "th" ? post.title : post.titleEn}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: "#111827", fontSize: "16px", lineHeight: "1.7", margin: 0,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {lang === "th" ? post.desc : post.descEn}
                  </p>

                  {/* CTA */}
                  <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "4px" }}>
                    <span className="btn-insight" style={{
                      ...KT,
                      borderRadius: "50px",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 24px",
                      display: "inline-block",
                    }}>
                      {t.readMore}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <Link href="/blog" className="btn-insight" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {t.viewMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {(() => {
        const FAQS_LANDING = [
          { q: "Buddy Review ให้บริการอะไรบ้าง", a: "เราให้บริการทำ Influencer Marketing แบบครบวงจร ตั้งแต่การวางกลยุทธ์ เลือกอินฟลูเอนเซอร์ที่เหมาะสม ติดต่อประสานงาน ตรวจสอบงาน และวัดผลสัมฤทธิ์แคมเปญ",
            qEn: "What services does Buddy Review offer?", aEn: "We provide full-service influencer marketing — from strategy planning and selecting the right influencers, to coordination, content review, and campaign performance measurement." },
          { q: "บริการของเราดีกว่าทำเองยังไง?", a: "การใช้บริการของเราช่วยให้คุณประหยัดเวลาและลดความยุ่งยากในการค้นหา คัดเลือก เจรจา และบริหารจัดการอินฟลูเอนเซอร์จำนวนมาก เรามีเครื่องมือและฐานข้อมูลที่แม่นยำ รวมถึงทีมงานมืออาชีพที่ดูแลให้คุณครบทุกขั้นตอน ตั้งแต่การวางแผนไปจนถึงการวัดผล ทำให้คุณมั่นใจได้ว่าจะได้อินฟลูเอนเซอร์ที่เหมาะสมและแคมเปญที่มีประสิทธิภาพสูงสุด",
            qEn: "How is your service better than doing it yourself?", aEn: "Using our service saves you time and removes the hassle of searching, vetting, negotiating with, and managing large numbers of influencers. We have precise tools and databases, plus a professional team handling every step from planning to measurement — so you can be confident you'll get the right influencers and the most effective campaign." },
          { q: "คิดค่าบริการอย่างไร?", a: "ค่าบริการขึ้นกับขนาดแคมเปญ จำนวนอินฟลูเอนเซอร์ และบริการที่คุณต้องการ โดยเรามีขั้นต่ำในการทำแคมเปญอยู่ที่ 100,000 บาทต่อแคมเปญ",
            qEn: "How is pricing calculated?", aEn: "Pricing depends on campaign size, number of influencers, and the services you need. Our minimum campaign budget is 100,000 THB per campaign." },
          { q: "ต้องเตรียมอะไรบ้างก่อนเริ่มแคมเปญ?", a: "แจ้งวัตถุประสงค์แคมเปญ งบประมาณ กลุ่มเป้าหมาย และรายละเอียดสินค้า/บริการ ส่วนที่เหลือเราจะดูแลให้ทั้งหมด",
            qEn: "What do I need to prepare before starting a campaign?", aEn: "Just share your campaign objective, budget, target audience, and product/service details — we'll take care of the rest." },
          { q: "ใช้อะไรในการคัดเลือกอินฟลูเอนเซอร์?", a: "เราใช้ระบบวิเคราะห์ข้อมูลเชิงลึก (Data-Driven Matching) ที่สามารถดูได้ทั้ง Demographic, Engagement, Unique Follower Overlap และประวัติการทำแคมเปญ เพื่อคัดเลือกอินฟลูเอนเซอร์ตรงกับเป้าหมายของแบรนด์และแมทช์กับกลุ่มผู้ติดตามของอินฟลูเอนเซอร์มากที่สุด",
            qEn: "How do you select influencers?", aEn: "We use a data-driven matching system that analyzes demographics, engagement, unique follower overlap, and campaign history — selecting influencers that align with your brand goals and best match their followers' audience." },
          { q: "สามารถขอรีพอร์ตเมื่อจบแคมเปญได้หรือไม่?", a: "คุณจะได้รับรายงานผลแคมเปญที่ครอบคลุม เช่น ยอด Reach, Engagement, ROI, อินฟลูเอนเซอร์ที่ทำผลงานดีสุด และข้อมูลเชิงลึกสำหรับพัฒนาในการทำแคมเปญถัดไป",
            qEn: "Can I get a report after the campaign ends?", aEn: "You'll receive a comprehensive campaign report covering Reach, Engagement, ROI, top-performing influencers, and insights to improve your next campaign." },
          { q: "สามารถเลือกอินฟลูเอนเซอร์เองได้ไหม?", a: "หากคุณมีอินฟลูเอนเซอร์ที่สนใจเป็นพิเศษ สามารถให้เราติดต่อหรือแนะนำอินฟลูเอนเซอร์ที่คล้ายคลึงกันได้ โดยเราจะเป็นคนติดต่อให้กับคุณเองทั้งหมด",
            qEn: "Can I choose my own influencers?", aEn: "If there's a specific influencer you're interested in, we can reach out on your behalf or recommend similar ones — we'll handle all the outreach for you." },
          { q: "แคมเปญสามารถลงได้บนแพลตฟอร์มไหนบ้าง?", a: "เรารองรับทุกแพลตฟอร์มหลัก เช่น Instagram, Facebook, TikTok, YouTube, X (Twitter), และ Lemon8 โดยเราสามารถแนะนำความเหมาะสมกับกลุ่มเป้าหมาย คอนเทนต์และจุดประสงค์แคมเปญ",
            qEn: "Which platforms can campaigns run on?", aEn: "We support all major platforms including Instagram, Facebook, TikTok, YouTube, X (Twitter), and Lemon8 — and can recommend the best fit based on your target audience, content, and campaign goals." },
        ];
        return (
          <section style={{ background: DARK_BG }} className="py-20 px-6">
            <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
              {/* Centered title */}
              <div className="mb-section" style={{ textAlign: "center", marginBottom: "64px" }}>
                <h2 className="section-title text-center font-bold mb-14 section-h2-fixed"
                  style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
                  Frequently Asked{" "}
                  <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions</span>
                </h2>
              </div>
              {/* 2-column accordion grid */}
              <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>
                {/* Left column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {FAQS_LANDING.slice(0, 4).map((item, i) => (
                    <div key={i} className="faq-item" style={{ background: faqOpen === i ? "#5f26e5" : "rgba(255,255,255,0.22)", backdropFilter: faqOpen === i ? "none" : "blur(18px)", WebkitBackdropFilter: faqOpen === i ? "none" : "blur(18px)", border: faqOpen === i ? "none" : "1px solid rgba(255,255,255,0.45)", borderRadius: "24px", overflow: "hidden", transition: "background 0.25s" }}>
                      <button className="faq-toggle-btn"
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        onTouchEnd={(e) => { e.preventDefault(); setFaqOpen(prev => prev === i ? null : i); }}
                        style={{ ...KT, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", textAlign: "left", touchAction: "manipulation", position: "relative", zIndex: 1 }}>
                        <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === i ? "#ffffff" : "#111827", lineHeight: 1.5 }}>{lang === "th" ? item.q : item.qEn}</span>
                        <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", background: faqOpen === i ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease", transform: faqOpen === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </button>
                      {faqOpen === i && <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>{lang === "th" ? item.a : item.aEn}</p>}
                    </div>
                  ))}
                </div>
                {/* Right column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {FAQS_LANDING.slice(4).map((item, i) => {
                    const idx = i + 4;
                    return (
                      <div key={idx} className="faq-item" style={{ background: faqOpen === idx ? "#5f26e5" : "rgba(255,255,255,0.22)", backdropFilter: faqOpen === idx ? "none" : "blur(18px)", WebkitBackdropFilter: faqOpen === idx ? "none" : "blur(18px)", border: faqOpen === idx ? "none" : "1px solid rgba(255,255,255,0.45)", borderRadius: "24px", overflow: "hidden", transition: "background 0.25s" }}>
                        <button className="faq-toggle-btn"
                          onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                          onTouchEnd={(e) => { e.preventDefault(); setFaqOpen(prev => prev === idx ? null : idx); }}
                          style={{ ...KT, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", textAlign: "left", touchAction: "manipulation", position: "relative", zIndex: 1 }}>
                          <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === idx ? "#ffffff" : "#111827", lineHeight: 1.5 }}>{lang === "th" ? item.q : item.qEn}</span>
                          <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", background: faqOpen === idx ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease", transform: faqOpen === idx ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </button>
                        {faqOpen === idx && <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>{lang === "th" ? item.a : item.aEn}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ดูเพิ่มเติม */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "48px" }}>
                <h3 style={{ ...KT, fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 800, color: "#111827", margin: 0 }}>
                  {t.stillHaveQuestions}
                </h3>
                <Link href="/faq" className="btn-insight" style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 48px", textDecoration: "none", display: "inline-block" }}>
                  {t.viewMore}
                </Link>

              </div>

            </div>
          </section>
        );
      })()}

      {/* ── Contact Us ── */}
      <section id="contact" style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* ── Top heading row ── */}
          <div className="contact-title-wrap" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
            gap: "40px", marginBottom: "56px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 900,
                margin: 0, lineHeight: "72px",
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                display: "inline-block" }}>
                {t.contactUs}
              </h2>
            </div>
          </div>

          {/* ── Form + Image row ── */}
          <div className="contact-outer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "48px",
            alignItems: "stretch", marginBottom: "44px" }}>

            {/* Left: Form */}
            <div className="contact-form-panel" style={{ display: "flex", flexDirection: "column", gap: "20px",
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.30)",
              borderRadius: "24px", padding: "36px 40px" }}>

              {/* ชื่อ-สกุล + อีเมล */}
              <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "ชื่อ-สกุล *" : "Full Name *"}</label>
                  <input type="text" name="name" placeholder={lang === "th" ? "ชื่อ-นามสกุล" : "First and last name"} value={formData.name} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "อีเมล *" : "Email *"}</label>
                  <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* เบอร์โทร + ชื่อบริษัท */}
              <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "เบอร์โทรศัพท์ *" : "Phone Number *"}</label>
                  <input type="tel" name="phone" placeholder="08X-XXX-XXXX" value={formData.phone} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "ชื่อบริษัท *" : "Company Name *"}</label>
                  <input type="text" name="company" placeholder={lang === "th" ? "บริษัท..." : "Company..."} value={formData.company} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* งบประมาณ + note */}
              <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "งบประมาณ" : "Budget"}</label>
                  <input type="text" name="budget" placeholder={lang === "th" ? "ระบุงบประมาณ" : "Enter your budget"} value={formData.budget} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                    display: "block", marginBottom: "8px" }}>{lang === "th" ? "ตำแหน่งงาน *" : "Job Title *"}</label>
                  <input type="text" name="position" placeholder={lang === "th" ? "ระบุตำแหน่งงาน" : "Enter your job title"} value={formData.position} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                      borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                      outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* บรีฟ */}
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "รายละเอียด / บรีฟ" : "Details / Brief"}</label>
                <textarea rows={5} name="brief" placeholder={lang === "th" ? "รายละเอียดโปรเจกต์ที่ต้องการให้เราช่วย..." : "Details of the project you'd like help with..."} value={formData.brief} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", resize: "none", boxSizing: "border-box", display: "block" }} />
              </div>

              {/* Consent */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
                onClick={() => setConsented(c => !c)}>
                <div style={{ width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                  background: consented ? "#5f26e5" : "transparent",
                  border: consented ? "none" : "1.5px solid #9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, border 0.2s" }}>
                  {consented && <IconCheck color="#ffffff" />}
                </div>
                <p style={{ ...KT, color: "#6b7280", fontSize: "13px", lineHeight: "1.6", margin: 0, userSelect: "none" }}>
                  {lang === "th" ? (
                    <>
                      ยินดีให้ Buddy Review เก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล ตามนโยบายความเป็นส่วนตัว{" "}
                      <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf"
                        target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>อ่านข้อตกลง</a>{" "}
                      และ{" "}
                      <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf"
                        target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
                    </>
                  ) : (
                    <>
                      I consent to Buddy Review collecting, using, and disclosing my personal data in accordance with the{" "}
                      <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf"
                        target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>Terms and Conditions</a>{" "}
                      and{" "}
                      <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf"
                        target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>Privacy Policy</a>
                    </>
                  )}
                </p>
              </div>

              {/* Status messages */}
              {formStatus === "success" && (
                <p style={{ ...KT, color: "#16a34a", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                  {lang === "th" ? "✓ ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว" : "✓ Submitted successfully — our team will contact you soon."}
                </p>
              )}
              {formStatus === "error" && (
                <p style={{ ...KT, color: "#dc2626", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                  {lang === "th" ? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" : "Something went wrong. Please try again."}
                </p>
              )}

              {/* Submit: pill button + circle arrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button disabled={!consented || formStatus === "sending"}
                  onClick={handleFormSubmit}
                  className="cta-submit"
                  style={{ ...KT, background: consented ? "#5f26e5" : "#d1d5db",
                    border: "none", borderRadius: "50px", color: "#ffffff",
                    fontSize: "16px", fontWeight: 600, padding: "16px 36px",
                    cursor: consented && formStatus !== "sending" ? "pointer" : "not-allowed",
                    transition: "background 0.2s" }}>
                  {formStatus === "sending" ? (lang === "th" ? "กำลังส่ง..." : "Sending...") : (lang === "th" ? "ยืนยัน" : "Submit")}
                </button>
              </div>

            </div>

            {/* Right: Info boxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch",
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.30)", borderRadius: "24px", padding: "24px" }}>
              {[
                {
                  icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-location.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-location.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                  title: lang === "th" ? "ที่อยู่" : "Address",
                  lines: lang === "th"
                    ? ["1010, อาคารชินวัตรทาวเวอร์ 3,", "ห้อง 603, ชั้น 6,", "ถนนวิภาวดีรังสิต, แขวงจตุจักร กรุงเทพฯ 10900"]
                    : ["1010, Shinawatra Tower 3,", "Room 603, 6th Floor,", "Vibhavadi Rangsit Rd, Chatuchak, Bangkok 10900"],
                },
                {
                  icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-call.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-call.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                  title: lang === "th" ? "เบอร์โทร" : "Phone",
                  lines: ["088-686-1676"],
                },
                {
                  icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-email.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-email.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                  title: lang === "th" ? "อีเมล" : "Email",
                  lines: ["info@buddyreview.co"],
                },
              ].map((col) => (
                <div key={col.title} style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: "16px",
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.32)",
                  borderRadius: "16px", padding: "20px 24px" }}>
                  <div className="contact-icon-circle" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#5f26e5",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {col.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{ ...KT, color: "#5f26e5", fontSize: "13px", fontWeight: 600, margin: 0 }}>{col.title}</p>
                    {col.lines.map((line) => (
                      <p key={line} style={{ ...KT, color: "#111827", fontSize: "15px", fontWeight: 700, margin: 0 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Divider + Social */}
              <div style={{ borderTop: "1px solid #5f26e5", paddingTop: "20px" }}>
                <p style={{ ...KT, color: "#5f26e5", fontSize: "13px", fontWeight: 600, margin: "0 0 12px" }}>Follow us</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { icon: "/social/FB.png",     name: "Facebook",      href: "https://www.facebook.com/buddyreview" },
                    { icon: "/social/IG.png",     name: "Instagram",     href: "https://www.instagram.com/buddyreview_th/" },
                    { icon: "/social/TT.png",     name: "TikTok",        href: "https://www.tiktok.com/@buddyreview.th?_t=ZS-8t3L41XuOX4&_r=1" },
                    { icon: "/social/Line.png",   name: "Line Official", href: "https://line.me/R/ti/p/@buddysupport" },
                    { icon: "/social/YT.png",     name: "YouTube",       href: "https://www.youtube.com/@buddyreview7134" },
                    { icon: "/social/Linkin.png", name: "LinkedIn",      href: "https://th.linkedin.com/company/buddy-review" },
                    { icon: "/social/Lemon8.png", name: "Lemon8",        href: "https://s.lemon8-app.com/s/GgNUhrhUMR" },
                  ].map((s) => (
                    <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer"
                      style={{ width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ display: "inline-block", width: "31px", height: "31px",
                        backgroundColor: "#5f26e5",
                        WebkitMaskImage: `url(${s.icon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
                        maskImage: `url(${s.icon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #ffffff 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
        {/* Flat 6-item grid: 2-col desktop, 1-col mobile (order: Logo,Award,Contact,Address,Social,Legal) */}
        <div className="footer-grid">

          {/* 1 — Logo */}
          <div>
            <Image src="/buddy-review-logo.png" alt="Buddy Review" className="footer-logo-img" width={166} height={58} style={{ height: "58px", width: "auto" }} />
          </div>

          {/* 2 — Award */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Image src="/award-mt2025.png" alt="MT Award 2025" width={75} height={85} style={{ height: "85px", width: "auto", objectFit: "contain" }} />
          </div>

          {/* 3 — Contact info */}
          <div className="flex flex-col gap-8 footer-contact-col">
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              {t.contactUs}<br/>
              <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
              <a href="mailto:Info@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
              <a href="mailto:Marketing@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
              <a href="mailto:Recruit@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
            </p>
            <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              <a href="tel:+66886861676" style={{ color: "#ffffff", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
              <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>Line: @buddysupport</a>
            </p>
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              <a href="/faq?from=influencer" style={{ color: "#ffffff", textDecoration: "none" }}>FAQs</a>
            </p>
          </div>

          {/* 4 — Address */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="font-normal text-right footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              {lang === "th" ? (
                <>บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900</>
              ) : (
                <>Bubblely Co., Ltd.<br/>1010, Shinawatra Tower 3, Room 603,<br/>6th floor, Vibhavadi Rangsit Rd,<br/>Chatuchak Bangkok 10900</>
              )}
            </p>
          </div>

          {/* 5 — Social icons */}
          <div className="footer-social-row" style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: "/social/FB.png",     name: "Facebook",      href: "https://www.facebook.com/buddyreview" },
              { icon: "/social/IG.png",     name: "Instagram",     href: "https://www.instagram.com/buddyreview_th/" },
              { icon: "/social/TT.png",     name: "TikTok",        href: "https://www.tiktok.com/@buddyreview.th?_t=ZS-8t3L41XuOX4&_r=1" },
              { icon: "/social/Line.png",   name: "Line Official", href: "https://line.me/R/ti/p/@buddysupport" },
              { icon: "/social/YT.png",     name: "YouTube",       href: "https://www.youtube.com/@buddyreview7134" },
              { icon: "/social/Linkin.png", name: "LinkedIn",      href: "https://th.linkedin.com/company/buddy-review" },
              { icon: "/social/Lemon8.png", name: "Lemon8",        href: "https://s.lemon8-app.com/s/GgNUhrhUMR" },
            ].map((s) => (
              <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer"
                style={{ position: "relative", width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src={s.icon} alt={s.name} fill sizes="31px" style={{ objectFit: "contain" }} />
              </a>
            ))}
          </div>

          {/* 6 — Legal */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="font-normal text-right footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#ffffff" }}>
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>{lang === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy"}</a>
              &nbsp;|&nbsp;
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>{lang === "th" ? "ข้อตกลงการใช้งาน" : "Terms of Use"}</a>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}

const th = {
  contactUs:    "ติดต่อเรา",
  imInfluencer: "ฉันคืออินฟลูเอนเซอร์",
  imBrand:      "ฉันคือแบรนด์",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "พร้อมเริ่มต้นแล้วหรือยัง?",
  ctaSub:       "เข้าร่วมกับแบรนด์และอินฟลูเอนเซอร์หลายร้อยรายที่เติบโตกับ Buddy Review",
  viewMore:     "ดูเพิ่มเติม",
  readMore:     "อ่านเพิ่มเติม",
  showLess:     "ดูน้อยลง",
  stillHaveQuestions: "มีคำถามเพิ่มเติมไหม?",
};

const en = {
  contactUs:    "Contact Us",
  imInfluencer: "I'm an Influencer",
  imBrand:      "I'm a Brand",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "Ready to get started?",
  ctaSub:       "Join hundreds of brands and influencers already growing with Buddy Review.",
  viewMore:     "View More",
  readMore:     "Read More",
  showLess:     "Show Less",
  stillHaveQuestions: "Still have questions?",
};
