"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

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
  <img
    key={file}
    src={`/logos/${file}`}
    alt={file.replace(".png","")}
    style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }}
  />
));

const LOGOS_ROW2 = LOGO_FILES_ROW2.map((file) => (
  <img
    key={file}
    src={`/logos/${file}`}
    alt={file.replace(".png","")}
    style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }}
  />
));

function LogoMarquee({ logos, direction }: { logos: React.ReactNode[], direction: "left"|"right" }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow:"hidden", width:"100%" }}>
      <motion.div
        style={{ display:"flex", alignItems:"center", gap:"56px", width:"max-content" }}
        animate={{ x: direction === "left" ? ["0%","-50%"] : ["-50%","0%"] }}
        transition={{ duration: 35, ease:"linear", repeat: Infinity }}
      >
        {doubled.map((logo, i) => (
          <div key={i} style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", height:"64px" }}>
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
      <div style={{ width: "62px", height: "62px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
        <img src={cat.photo} alt={cat.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
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
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", overflow: "hidden", width: "100%" }}>
      {/* Row 1 — left */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <motion.div
          style={{ display: "flex", gap: "20px", width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {doubled1.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </motion.div>
      </div>
      {/* Row 2 — right */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <motion.div
          style={{ display: "flex", gap: "20px", width: "max-content" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {doubled2.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </motion.div>
      </div>
    </div>
  );
}

function TestimonialsCarousel({ items }: { items: typeof TESTIMONIALS }) {
  const PER_SLIDE = 3;
  const TOTAL_SLIDES = Math.ceil(items.length / PER_SLIDE);
  const [slide, setSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setSlide(Math.min(Math.floor((el.scrollLeft / max) * TOTAL_SLIDES), TOTAL_SLIDES - 1));
  };

  const CARD_STEP = 380 + 24; // card width + gap
  const prev = () => scrollRef.current?.scrollBy({ left: -CARD_STEP, behavior: "smooth" });
  const next = () => scrollRef.current?.scrollBy({ left: CARD_STEP, behavior: "smooth" });

  const jumpTo = (s: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: TOTAL_SLIDES <= 1 ? 0 : (s / (TOTAL_SLIDES - 1)) * max, behavior: "smooth" });
  };

  return (
    <div>
      <div style={{ position: "relative", paddingLeft: "52px", paddingRight: "52px" }}>
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="marquee-container"
          style={{ overflowX: "auto", width: "100%" }}
        >
          <div style={{ display: "flex", gap: "24px", width: "max-content" }}>
            {items.map((r, i) => (
              <div key={i} style={{
                width: "380px", flexShrink: 0,
                borderRadius: "30px",
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.45)",
                padding: "36px 24px 32px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
              }}>
                <div style={{ width: "140px", height: "140px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <img src={r.photo} alt={r.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <span style={{ color: "#5f26e5", fontSize: "24px", fontWeight: 600, textAlign: "center" }}>{r.name}</span>
                <p style={{ color: "#374151", fontSize: "16px", lineHeight: "1.65", textAlign: "center", fontWeight: 400, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prev arrow */}
        <button onClick={prev}
          style={{ position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)",
            width: "42px", height: "42px", borderRadius: "50%", border: "none",
            background: "#5f26e5", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M15 5L9 11.5L15 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {/* Next arrow */}
        <button onClick={next}
          style={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)",
            width: "42px", height: "42px", borderRadius: "50%", border: "none",
            background: "#5f26e5", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M8 5L14 11.5L8 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dot progress bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px" }}>
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button key={i} onClick={() => jumpTo(i)}
            style={{ height: "10px", width: i === slide ? "28px" : "10px",
              borderRadius: "5px", border: "none", cursor: "pointer",
              background: i === slide ? "#5f26e5" : "rgba(95,38,229,0.25)",
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
    desc: "เคยสงสัยไหมว่า… \"ทำไมบางโพสต์แทบไม่มีคนเห็น แต่บางโพสต์กลับไวรัลขึ้นมาได้?\" ความลับไม่ได้อยู่ที่คอนเทนต์อย่างเดียว แต่ \"เวลา\" ก็เป็นอีกปัจจัยสำคัญที่กำหนดว่าคอนเทนต์ของคุณจะไปโผล่บนฟีดใครบ้าง",
    image: "/blogs/blog-best-time.png",
    categories: ["สำหรับอินฟลูเอนเซอร์"],
  },
  {
    slug: "tiktok-algorithm-9-techniques",
    title: "ถอดรหัสอัลกอริทึม TikTok + 9 เทคนิคทำคลิปให้ดังแบบมืออาชีพ",
    desc: "หลายคนที่เล่น TikTok อาจสงสัยว่า \"ทำไมบางคลิปแทบไม่มีคนดู แต่บางคลิปกลับไวรัล?\"",
    image: "/blogs/blog-2.png",
    categories: ["สำหรับแบรนด์", "สำหรับอินฟลูเอนเซอร์"],
  },
  {
    slug: "influencer-mapping-canvas",
    title: "วิธีเลือกอินฟลูเอนเซอร์ที่ใช่สำหรับแบรนด์ ด้วย Influencer Mapping Canvas",
    desc: "ยุคนี้อินฟลูเอนเซอร์ไม่ได้เป็นเพียงแค่ \"คนดังบนโลกออนไลน์\" แต่คือผู้ทรงอิทธิพล",
    image: "/blogs/blog-influencer-mapping.png",
    categories: ["สำหรับแบรนด์"],
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
  },
  {
    photo: "/influencers/inf-yam.jpg",
    name: "แยม",
    text: "รู้สึกดีใจที่ได้ร่วมงานกับทีมงานที่น่ารัก เป็นกันเองและมืออาชีพมากๆ อย่าง Buddy Review ภายใต้การร่วมงานดังกล่าว ทำให้แยมได้รับโอกาสร่วมงานกับแบรนด์ระดับประเทศที่มีความน่าเชื่อถือ ซึ่งนับว่าเป็นประสบการณ์ทำงานร่วมกันที่คุ้มค่ามากๆ ค่ะ",
  },
  {
    photo: "/influencers/inf-riwago.jpg",
    name: "ริวโกะ",
    text: "ชอบทำงานกับ Buddy Review มากๆเพราะบัดดี้คุยงานง่าย บรีฟเข้าใจ ทำงานไว เป็นระบบ ไม่เอาเปรียบอินฟลูและป้อนงานให้ริวโกะเยอะมากๆๆ🥺💖🙏🏻 รัก Buddy Review และอยากทำด้วยไปนานๆเลยค่ะ",
  },
  {
    photo: "/influencers/inf-maihom.jpg",
    name: "ไม้หอม",
    text: "เราเริ่มต้นรีวิวต่างๆจาก Buddy review เลยค่ะ เพื่อนแนะนำมา จนตอนนี่ผ่านไปหลายปีแล้วเราก็ยังรับงานจาก Buddy review อยู่ มีงานให้เลือกตลอด และได้มีโอกาสทำงานร่วมกับแบรนด์ดังหลายแบรนด์เลย ต้องขอบคุณเพื่อนคนนั้นมากๆที่แนะนำให้เรารู้จักกับที่นี่เพราะมันดีสุดๆ แอดมินก็ดูแลดีมากๆค่ะ",
  },
  {
    photo: "/influencers/inf-puifai.jpg",
    name: "ปุยฝ้าย",
    text: "ชอบทำงานกับ Buddy review ทั้งเรื่องของแบรนด์ที่มาจากช่องทางนี้จะเป็นแบรนด์ที่น่าเชื่อถือและเป็นที่รู้จักค่ะ บรีฟงานและรายละเอียดมักจะชัดเจน และเคารพการตัดสินใจของ influencer ที่สำคัญแอดมินทุกท่านเต็มใจและเข้าใจในการทำงาน ทำให้ทุกอย่างง่ายและ flow ไปในทิศทางเดียวกัน ทำให้การทำงานสนุกมากขึ้นค่ะ",
  },
  {
    photo: "/influencers/inf-may.jpg",
    name: "มาย",
    text: "Buddy Review เป็นช่องทางที่ทำให้เราได้แสดงศักยภาพได้อย่างเต็มที่และอิสระ ทำให้เราได้รู้จักคำว่า การทำงานสามารถทำได้ทุกที่บนโลกใบนี้ นอกจากนี้ก็ยังได้เพื่อน สังคมใหม่ๆ และเข้าใจคำว่าทีม และการซัพพอร์ต",
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
  const [statKey, setStatKey] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", brief: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");


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
        setFormData({ name: "", email: "", phone: "", company: "", budget: "", brief: "" });
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
      <nav style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "100px",
          position: "fixed", top: "20px", left: "40px", right: "40px",
          zIndex: 100,
          paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px" }}
        className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"} alt="Buddy Review" style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      </nav>

      {/* ── Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 relative"
        style={{
          minHeight: "72vh",
          paddingTop: "160px",
          paddingBottom: "80px",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img src="/header-landing-bg3.jpg" alt="" aria-hidden="true" style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }} />
        <div className="relative" style={{ maxWidth: "1100px", zIndex: 2 }}>
          <h1 className="font-bold uppercase mb-6"
            style={{ color: "#ffffff", fontSize: "clamp(28px,3.9vw,56px)", lineHeight: "84px", textAlign: "center",
              fontFeatureSettings: "'pnum' on,'lnum' on",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)" }}>
            {t.headline1}<br/>{t.headline2}
          </h1>
          <h2 className="font-normal mb-12"
            style={{ color: "#ffffff", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: "1.7", textAlign: "center",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 48px" }}>
            {t.subline}
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/influencer" className="btn-hero btn-hero-solid-purple font-semibold"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none" }}>
              {t.imInfluencer}
            </Link>
          </div>
        </div>

      </section>

      {/* ── Brand Logos Marquee ── */}
      <section style={{
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
        <div style={{ height: "32px" }}/>
        {/* Row 2 — scrolls right */}
        <LogoMarquee logos={LOGOS_ROW2} direction="right" />
      </section>

      {/* ── Your Trusted Partner ── */}
      <section style={{ background: DARK_BG, paddingTop: "80px", paddingBottom: "80px" }} className="px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Heading */}
          <div className="text-center mb-12" style={{ maxWidth: "954px", margin: "0 auto 48px" }}>
            <h2 className="font-bold mb-6"
              style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "55px", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Your Trusted Partner in Thailand&apos;s<br/>Influencer Marketing Landscape
            </h2>
            <p className="font-normal"
              style={{ fontSize: "18px", lineHeight: "1.7", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                color: "#111827" }}>
              เอเจนซี่ Influencer Marketing ที่ผสานข้อมูล เทคโนโลยี และทีมผู้เชี่ยวชาญ<br/>
              เพื่อออกแบบแคมเปญที่แม่นยำ วัดผลได้ และสร้างการเติบโตทางธุรกิจอย่างยั่งยืน
            </p>
          </div>

          {/* 4 Photo Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { src: "/card1.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบที่ชัดเจนตามมาตรฐาน" },
              { src: "/card2.jpg", title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจ ทำให้ทุกแคมเปญสำเร็จ" },
              { src: "/card3.png", title: "Data-Driven Precision",      desc: "เทคโนโลยีช่วยให้คุณตัดสินใจง่ายขึ้น" },
              { src: "/card4.png", title: "Success Delivered",          desc: "ทุกแคมเปญ มุ่งสู่ความสำเร็จที่ชัดเจน" },
            ].map((card) => (
              <div key={card.title} className="relative overflow-hidden"
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
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buddy Review Solutions ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-12"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Buddy Review{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "/icon-photo-video.png", title: "Photo / Video Production",
                desc: "การผลิตภาพถ่ายและวิดีโอสำหรับใช้ใน คอนเทนต์หรือการสื่อสารของแบรนด์" },
              { icon: "/icon-onsite.png", title: "On-site Campaign Coordinate & Staff Support",
                desc: "การดูแลและประสานงานแคมเปญในสถานที่จริง พร้อมจัดทีมงานซัพพอร์ต" },
              { icon: "/icon-ondemand.png", title: "On-Demand & Fast-Track Campaigns",
                desc: "แคมเปญที่สามารถเริ่มและดำเนินงานได้อย่างรวดเร็ว ตามความต้องการของแบรนด์ในเวลาจำกัด" },
              { icon: "/icon-network.png", title: "Influencer Network",
                desc: "เครือข่ายของอินฟลูเอนเซอร์ที่แบรนด์หรือเอเจนซี่มีอยู่เพื่อใช้ในการเลือกและเชื่อมต่ออินฟลูเอนเซอร์ให้เหมาะกับแคมเปญ" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-2"
                style={{
                  background: "rgba(95,38,229,0.05)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(95,38,229,0.15)",
                  borderRadius: "24px",
                  boxShadow: "none",
                  padding: "8px 28px 50px",
                }}>
                <div className="mt-6 mb-2">
                  <img src={icon} alt={title} style={{ width: "47px", height: "47px", objectFit: "contain",
                    filter: "brightness(0) saturate(100%) invert(26%) sepia(97%) saturate(3500%) hue-rotate(249deg) brightness(100%) contrast(100%)",
                    opacity: 1 }} />
                </div>
                <h3 className="font-bold" style={{ fontSize: "24px", lineHeight: "1.2", color: "#111827" }}>{title}</h3>
                <p className="font-normal" style={{ fontSize: "16px", lineHeight: "1.5", color: "#111827" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6" onMouseEnter={() => setStatKey(k => k + 1)}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-12"
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

          {/* 3×3 Mosaic Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "280px 280px 280px",
            gap: "16px",
          }}>

            {/* [1,1] — Stat: 1,000,000+ */}
            <div style={{
              gridColumn: "1", gridRow: "1",
              background: "rgba(95,38,229,0.05)",
              backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(95,38,229,0.15)",
              borderRadius: "24px",
              boxShadow: "none",
              padding: "32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px" }}>
              <span className="font-bold"
                style={{ fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#5f26e5" }}>
                <AnimatedCounter key={`stat1-${statKey}`} target={1000000} suffix="+" />
              </span>
              <span className="font-normal"
                style={{ fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "#374151" }}>
                เครือข่ายอินฟลูเอนเซอร์
              </span>
            </div>

            {/* [2, 1–2] — Tall photo spanning rows 1 & 2 */}
            <div style={{
              gridColumn: "2", gridRow: "1 / 3",
              borderRadius: "30px", overflow: "hidden",
            }}>
              <img src="/success-photo.webp" alt="Influencer creators"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>

            {/* [3,1] — NISSIN logo */}
            <Link href="/success/nissin" className="group" style={{
              gridColumn: "3", gridRow: "1",
              borderRadius: "30px", overflow: "hidden",
              background: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
              position: "relative",
              cursor: "pointer", textDecoration: "none",
            }}>
              <img src="/success-nissin.webp" alt="NISSIN"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
                  transition: "opacity 0.3s ease" }}
                className="group-hover:opacity-0" />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "#5f26e5",
                  padding: "16px 20px",
                  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                  transition: "opacity 0.3s ease",
                  boxSizing: "border-box", overflow: "hidden",
                }}>
                {/* Arrow top-right (absolute) */}
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {/* Title + desc */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, color: "#ffffff", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Nissin</h3>
                  <p style={{ ...KT, color: "#ffffff", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>
                    Nissin ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ &quot;ต้มยำกุ้งแซ่บซีส&quot;
                  </p>
                  {/* Stats */}
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "13", label: "Posts" }, { val: "1.86M", label: "Reach" }, { val: "45K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* [1,2] — watsons logo */}
            <Link href="/success/watsons" className="group" style={{
              gridColumn: "1", gridRow: "2",
              borderRadius: "30px", overflow: "hidden",
              background: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px", position: "relative", cursor: "pointer", textDecoration: "none",
            }}>
              <img src="/success-watsons.webp" alt="watsons"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", transition: "opacity 0.3s ease" }}
                className="group-hover:opacity-0" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "#5f26e5",
                  padding: "16px 20px", display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, color: "#ffffff", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Watsons</h3>
                  <p style={{ ...KT, color: "#ffffff", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>
                    House Brand ปังด้วยพลังอินฟลูฯ บน TikTok &amp; Lemon8
                  </p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "220", label: "Posts" }, { val: "1.2M", label: "Reach" }, { val: "12K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* [3,2] — Stat: 1,000+ */}
            <div style={{
              gridColumn: "3", gridRow: "2",
              background: "rgba(95,38,229,0.05)",
              backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(95,38,229,0.15)",
              borderRadius: "24px",
              boxShadow: "none",
              padding: "32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px" }}>
              <span className="font-bold"
                style={{ fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#5f26e5" }}>
                <AnimatedCounter key={`stat2-${statKey}`} target={1000} suffix="+" />
              </span>
              <span className="font-normal"
                style={{ fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "#374151" }}>
                ลูกค้าที่ไว้วางใจ
              </span>
            </div>

            {/* [1,3] — LDC logo */}
            <Link href="/success/ldc-dental" className="group" style={{
              gridColumn: "1", gridRow: "3",
              borderRadius: "30px", overflow: "hidden",
              background: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px", position: "relative", cursor: "pointer", textDecoration: "none",
            }}>
              <img src="/success-ldc.webp" alt="LDC Dental"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", transition: "opacity 0.3s ease" }}
                className="group-hover:opacity-0" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "#5f26e5",
                  padding: "16px 20px", display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, color: "#ffffff", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>LDC Dental</h3>
                  <p style={{ ...KT, color: "#ffffff", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>
                    รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental
                  </p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "4.2K", label: "Reach" }, { val: "4.2K", label: "Engagement" }, { val: "9.8%", label: "Engagement Rate" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(14px,1.2vw,17px)", textAlign: "center" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* [2,3] — Stat: 4,000+ */}
            <div style={{
              gridColumn: "2", gridRow: "3",
              background: "rgba(95,38,229,0.05)",
              backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(95,38,229,0.15)",
              borderRadius: "24px",
              boxShadow: "none",
              padding: "32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px" }}>
              <span className="font-bold"
                style={{ fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#5f26e5" }}>
                <AnimatedCounter key={`stat3-${statKey}`} target={4000} suffix="+" />
              </span>
              <span className="font-normal"
                style={{ fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "#374151" }}>
                แคมเปญที่ส่งมอบ
              </span>
            </div>

            {/* [3,3] — Viu logo */}
            <Link href="/success/viu" className="group" style={{
              gridColumn: "3", gridRow: "3",
              borderRadius: "30px", overflow: "hidden",
              background: "#F5C518", position: "relative", cursor: "pointer", textDecoration: "none",
            }}>
              <img src="/success-viu.webp" alt="Viu"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }}
                className="group-hover:opacity-0" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "#5f26e5",
                  padding: "16px 20px", display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, color: "#ffffff", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Viu</h3>
                  <p style={{ ...KT, color: "#ffffff", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>
                    อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันให้แคมเปญ &quot;อีสานชมวิว&quot;
                  </p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "239K", label: "Reach" }, { val: "4.3K", label: "Engagement" }, { val: "956K", label: "Combined Followers" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#ffffff", fontSize: "clamp(14px,1.2vw,17px)", textAlign: "center" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

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
              ดูเพิ่มเติม
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
          <TestimonialsCarousel items={TESTIMONIALS} />
        </div>
      </section>

      {/* ── Influencer Categories ── */}
      <section style={{ background: DARK_BG, overflow: "hidden" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center font-bold mb-12"
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
          <h2 className="section-title text-center font-bold mb-14"
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", alignItems: "stretch" }}>
            {KOL_PACKAGES.map((pkg) => {
              const featured = pkg.name === "Basic";
              return (
              <div key={pkg.name} style={{
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
                  <span style={{ color: featured ? "#ffffff" : "#111827", fontSize: "36px", fontWeight: 800, letterSpacing: "-1px" }}>
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

                {/* Feature list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {pkg.features.map((f) => (
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
              ติดต่อเรา
            </a>
          </div>
        </div>
      </section>

      {/* ── Industry Insights ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-14"
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
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
                  <img src={post.image} alt={post.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderRadius: "12px" }} />
                </div>

                {/* Content */}
                <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                  {/* Category tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {post.categories.map((cat) => (
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
                  <h3 style={{ color: "#5f26e5", fontSize: "24px", fontWeight: 700, lineHeight: "1.45", margin: 0 }}>
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: "#111827", fontSize: "16px", lineHeight: "1.7", margin: 0,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {post.desc}
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
                      อ่านเพิ่มเติม
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
              ดูเพิ่มเติม
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Us ── */}
      <section id="contact" style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "start" }}>

          {/* ── Left ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Label + heading */}
            <div>
              <p style={{
                ...KT,
                fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, letterSpacing: "2px", margin: "0 0 12px",
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}>
                ติดต่อเรา
              </p>
              <h2 style={{ ...KT, color: "#5f26e5", fontSize: "24px", fontWeight: 800, lineHeight: "1.3", margin: "0 0 16px" }}>
                บริษัท บับเบิลลี จำกัด
              </h2>
            </div>

            {/* Info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "24px", padding: "20px 24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p style={{ ...KT, color: "#111827", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>ที่อยู่</p>
                  <p style={{ ...KT, color: "#374151", fontSize: "16px", lineHeight: "1.7", margin: 0 }}>
                    1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603,<br/>ชั้น 6, ถนนวิภาวดีรังสิต, แขวงจตุจักร<br/>กรุงเทพฯ 10900
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "24px", padding: "20px 24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p style={{ ...KT, color: "#111827", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>เบอร์โทร</p>
                  <p style={{ ...KT, color: "#374151", fontSize: "16px", margin: 0 }}>088-686-1676</p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "24px", padding: "20px 24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p style={{ ...KT, color: "#111827", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>อีเมล</p>
                  <p style={{ ...KT, color: "#374151", fontSize: "16px", margin: 0 }}>info@buddyreview.co</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p style={{ ...KT, color: "#111827", fontSize: "16px", fontWeight: 600, margin: "0 0 12px" }}>ติดตามเราได้ที่ :</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[
                  { icon: "/social/FB.png",    name: "Facebook",  href: "https://www.facebook.com/buddyreview" },
                  { icon: "/social/IG.png",    name: "Instagram", href: "https://www.instagram.com/buddyreview_th/" },
                  { icon: "/social/TT.png",    name: "TikTok",    href: "https://www.tiktok.com/@buddyreview.th?_t=ZS-8t3L41XuOX4&_r=1" },
                  { icon: "/social/Line.png",  name: "Line",      href: "#" },
                  { icon: "/social/YT.png",    name: "YouTube",   href: "https://www.youtube.com/@buddyreview7134" },
                  { icon: "/social/Linkin.png",name: "LinkedIn",  href: "https://th.linkedin.com/company/buddy-review" },
                  { icon: "/social/Lemon8.png",name: "Lemon8",    href: "https://s.lemon8-app.com/s/GgNUhrhUMR" },
                ].map((s) => (
                  <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex" }}>
                    <span style={{
                      display: "inline-block", width: "44px", height: "44px", flexShrink: 0,
                      backgroundColor: "#5f26e5",
                      WebkitMaskImage: `url(${s.icon})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskImage: `url(${s.icon})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                    }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div style={{ background: "rgba(255,255,255,0.40)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "24px", padding: "48px 44px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* ชื่อ + อีเมล */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>ชื่อ-สกุล</label>
                <input className="contact-input" type="text" name="name" placeholder="กรอกชื่อ-สกุล" value={formData.name} onChange={handleFormChange} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>อีเมล</label>
                <input className="contact-input" type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleFormChange} />
              </div>
            </div>

            {/* เบอร์โทร + ชื่อบริษัท */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>เบอร์โทร</label>
                <input className="contact-input" type="tel" name="phone" placeholder="08X-XXX-XXXX" value={formData.phone} onChange={handleFormChange} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>ชื่อบริษัท</label>
                <input className="contact-input" type="text" name="company" placeholder="บริษัท..." value={formData.company} onChange={handleFormChange} />
              </div>
            </div>

            {/* งบประมาณ */}
            <div>
              <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>งบประมาณ</label>
              <input className="contact-input" type="text" name="budget" placeholder="ระบุงบประมาณ" value={formData.budget} onChange={handleFormChange} />
            </div>

            {/* บรีฟ */}
            <div>
              <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600, display: "block", marginBottom: "8px" }}>บรีฟ</label>
              <textarea className="contact-input" rows={4} name="brief" placeholder="รายละเอียดโปรเจกต์..." style={{ resize: "none" }} value={formData.brief} onChange={handleFormChange} />
            </div>

            {/* Consent */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}
              onClick={() => setConsented(c => !c)}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: consented ? "#5f26e5" : "rgba(95,38,229,0.22)",
                border: consented ? "none" : "1.5px solid rgba(95,38,229,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: "1px", transition: "background 0.2s, border 0.2s",
              }}>
                {consented && <IconCheck color="#ffffff" />}
              </div>
              <p style={{ ...KT, color: "#111827", fontSize: "14px", lineHeight: "1.6", margin: 0, userSelect: "none" }}>
                ยินดีให้ Buddy Review เก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล ตามนโยบายความเป็นส่วนตัว{" "}
                <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>อ่านข้อตกลง</a>{" "}
                และ{" "}<a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
              </p>
            </div>

            {/* Success / Error message */}
            {formStatus === "success" && (
              <p style={{ ...KT, color: "#16a34a", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                ✓ ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ ...KT, color: "#dc2626", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
              </p>
            )}

            {/* Submit */}
            <button disabled={!consented || formStatus === "sending"}
              onClick={handleFormSubmit}
              className={consented ? "btn-insight" : ""}
              style={{
                ...KT, padding: "14px 48px", alignSelf: "flex-start",
                background: consented ? undefined : "rgba(95,38,229,0.3)",
                border: "none", borderRadius: "50px",
                fontSize: "16px", fontWeight: 600,
                color: consented ? undefined : "rgba(95,38,229,0.4)",
                cursor: consented && formStatus !== "sending" ? "pointer" : "not-allowed",
                transition: "background 0.2s, color 0.2s",
              }}>
              {formStatus === "sending" ? "กำลังส่ง..." : "ยืนยัน"}
            </button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #ffffff 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10"
          style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Left column */}
          <div className="flex flex-col gap-8" style={{ maxWidth: "515px" }}>
            {/* Logo */}
            <div>
              <img src="/buddy-review-logo.png" alt="Buddy Review" style={{ height: "58px", width: "auto" }} />
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
                  ติดต่อเรา<br/>
                  <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
                  <a href="mailto:Info@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
                  <a href="mailto:Marketing@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
                  <a href="mailto:Recruit@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
                </p>
              </div>
              <p className="font-normal" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
                <a href="tel:+66886861676" style={{ color: "#ffffff", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
                <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>Line: @buddysupport</a>
              </p>
              <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
                FAQs
              </p>
            </div>

            {/* Follow Us */}
            <div>
              <div style={{ display: "flex", gap: "12px" }}>
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
                    <img src={s.icon} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-end justify-between gap-10" style={{ minWidth: "340px" }}>
            {/* Awards */}
            <div className="flex items-center gap-4">
              <img src="/award-mt2025.png" alt="MT Award 2025" style={{ height: "85px", width: "auto", objectFit: "contain" }} />
            </div>

            {/* Location */}
            <div className="flex flex-col items-end gap-4">
<p className="font-normal text-right" style={{ ...KT, fontSize: "16px", lineHeight: "160%", maxWidth: "453px", color: "#ffffff" }}>
                {lang === "th" ? (
                  <>บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900</>
                ) : (
                  <>Bubblely Co., Ltd.<br/>1010, Shinawatra Tower 3, Room 603,<br/>6th floor, Vibhavadi Rangsit Rd,<br/>Chatuchak Bangkok 10900</>
                )}
              </p>
            </div>

            {/* Privacy / Terms */}
            <p className="font-normal text-right"
              style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#ffffff" }}>
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
              &nbsp;|&nbsp;
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>ข้อตกลงการใช้งาน</a>
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
};
