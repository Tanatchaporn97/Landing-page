"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

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

const LOGO_FILES_ROW1 = [
  "Clients Logo-03.png","Clients Logo-04.png","Clients Logo-05.png","Clients Logo-06.png",
  "Clients Logo-11.png","Clients Logo-13.png","Clients Logo-14.png","Clients Logo-16.png",
];
const LOGO_FILES_ROW2 = [
  "Clients Logo-07.png","Clients Logo-08.png","Clients Logo-09.png","Clients Logo-12.png",
  "Clients Logo-15.png","Clients Logo-17.png","Clients Logo-18.png","Clients Logo-20.png",
  "Clients Logo-21.png","Clients Logo-31.png",
];
const LOGOS_ROW1 = LOGO_FILES_ROW1.map((f) => (
  <img key={f} src={`/logos/${f}`} alt={f.replace(".png","")} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));
const LOGOS_ROW2 = LOGO_FILES_ROW2.map((f) => (
  <img key={f} src={`/logos/${f}`} alt={f.replace(".png","")} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
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


function TestimonialsCarousel() {
  const PER_SLIDE = 3;
  const TOTAL_SLIDES = Math.ceil(TESTIMONIALS.length / PER_SLIDE);
  const [slide, setSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setSlide(Math.min(Math.floor((el.scrollLeft / max) * TOTAL_SLIDES), TOTAL_SLIDES - 1));
  };

  const CARD_STEP = 380 + 24;
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
            {TESTIMONIALS.map((r, i) => (
              <div key={i} style={{
                width: "380px", flexShrink: 0,
                borderRadius: "30px",
                background: "#ffffff",
                border: "1px solid rgba(95,38,229,0.08)",
                padding: "36px 24px 32px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
              }}>
                <div style={{ width: "140px", height: "140px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <img src={r.photo} alt={r.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <span style={{ ...KT, color: "#5f26e5", fontSize: "24px", fontWeight: 600, textAlign: "center" }}>{r.name}</span>
                <p style={{ ...KT, color: "#000000", fontSize: "16px", lineHeight: "1.65", textAlign: "center", fontWeight: 400, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={prev}
          style={{ position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)",
            width: "42px", height: "42px", borderRadius: "50%", border: "none",
            background: "#5f26e5", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M15 5L9 11.5L15 18" stroke="#F0E8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={next}
          style={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)",
            width: "42px", height: "42px", borderRadius: "50%", border: "none",
            background: "#5f26e5", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M8 5L14 11.5L8 18" stroke="#F0E8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
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

const PTP_STEPS = [
  { step: "01", img: "/path-to-partnership/Step-1.png", title: "สมัครเป็นอินฟลูกับเรา", desc: "สมัครบัญชีอินฟลูเอนเซอร์ง่ายๆ แค่ 5 นาที พร้อมเชื่อมต่อช่องทางโซเชียลมีเดีย ให้เรารู้จักคุณมากขึ้นและเปิดโอกาสในการร่วมงานกับแบรนด์ชั้นนำ" },
  { step: "02", img: "/path-to-partnership/Step-2.png", title: "ค้นหางานที่ใช่", desc: "เลือกดูงานรีวิวจากแบรนด์ดังที่คัดมาให้คุณโดยเฉพาะ เมื่อเจอที่ชอบก็คลิกสมัครได้เลย ไม่ต้องรอช้า!" },
  { step: "03", img: "/path-to-partnership/Step-3.png", title: "คอนเฟิร์มและรับบรีฟ", desc: "เมื่อได้รับการคัดเลือกจากแบรนด์ ทีมงานติดต่อกลับเพื่อคอนเฟิร์มการรับงานและส่งรายละเอียดบรีฟ" },
  { step: "04", img: "/path-to-partnership/Step-4.png", title: "สร้างสรรค์ได้เลย", desc: "สร้างสรรค์คอนเทนต์สุดปังในสไตล์ของคุณได้เต็มที่ จากนั้นส่งดราฟต์ให้เราตรวจสอบผ่านแพลตฟอร์มของเราได้เลยแบบง่ายๆ" },
  { step: "05", img: "/path-to-partnership/Step-5.png", title: "รอตรวจดราฟต์", desc: "ทีมงานจะแจ้งกลับทันทีหากมีการแก้ไข แต่ถ้าคอนเทนต์ของคุณพร้อมแล้ว ก็เตรียมตัวโพสต์ตามกำหนดการได้เลย" },
  { step: "06", img: "/path-to-partnership/Step-6.png", title: "ลงโพสต์", desc: "ได้เวลาไวรัล! โพสต์คอนเทนต์สุดปังของคุณให้กับผู้ติดตามของคุณได้เลย" },
  { step: "07", img: "/path-to-partnership/Step-7.png", title: "รับเงินได้เลย", desc: "โดยจ่ายเป็น Buddy Points ซึ่งสามารถนำพอยท์ไปแลกเป็นเงินสดได้ทันที ไม่มีเบี้ยว" },
];

const FAQS = [
  { q: "สมัครแล้วจะได้งานทันทีไหม?", a: "หลังจากสมัครเรียบร้อย ระบบจะพิจารณาความเหมาะสมของแคมเปญที่เข้ามา หากมีแคมเปญที่ตรงกับโปรไฟล์ของคุณ ระบบจะแจ้งเตือนเพื่อให้คุณเข้าร่วมได้ทันที" },
  { q: "ทำไมสมัครแล้วไม่มีงาน?", a: "งานแต่ละแคมเปญขึ้นอยู่กับกลุ่มเป้าหมายของแบรนด์ หากยังไม่มีงาน แนะนำให้คุณอัปเดตโปรไฟล์และเพิ่มช่องทางโซเชียลให้ครบถ้วน เพื่อเพิ่มโอกาสถูกจับคู่กับแคมเปญที่เหมาะสม" },
  { q: "ต้องเชื่อมบัญชีโซเชียลมีเดียหรือไม่?", a: "แนะนำให้เชื่อมบัญชีโซเชียลให้ครบเพื่อให้ระบบสามารถดึงสถิติ เพื่อจับคู่แคมเปญที่เหมาะสมได้อัตโนมัติ หากพบปัญหาในการเชื่อมต่อบัญชี สามารถติดต่อได้ที่ LINE @buddysupport" },
  { q: "ค่าตอบแทนจ่ายเมื่อไหร่?", a: "ระบบจะจ่ายค่าตอบแทนเป็นระบบแต้ม โดย 10 แต้ม = 1 บาท โดยนักรีวิวต้องทำการถอนเงินด้วยตัวเองพร้อมยื่นเอกสารในการถอนเงิน เปิดให้แลกเงินในช่วงต้นของเดือน และโอนเงินให้ระหว่างวันที่ 15–20 ของเดือนถัดไป (หลังจากตรวจสอบเอกสารเรียบร้อย) โดยจะมี SMS แจ้งเตือนจากธนาคาร ก่อนจะมีเงินเข้าบัญชีก่อน 3 วัน" },
  { q: "ทำไมมีแจ้งเตือนแล้ว เงินยังไม่เข้า?", a: "ก่อนที่เงินจะเข้าบัญชีธนาคารจริง จะมีการแจ้งเตือนล่วงหน้าจากธนาคาร ว่ากำลังจะมีเงินเข้า ซึ่งอาจทำให้เข้าใจว่าได้รับเงินแล้ว แต่เงินจะถูกโอนตามวันและเวลาที่ธนาคารได้ระบุในข้อความ" },
  { q: "ต้องใช้เอกสารอะไรในการรับเงิน?", a: "ใช้สำเนาบัตรประชาชน, เลขบัญชีธนาคารและสำเนาบัญชีธนาคารเพื่อใช้ในการเบิกถอนเงิน" },
  { q: "มีค่าธรรมเนียมการแลกเงินหรือไม่?", a: "มีค่าธรรมเนียมในการโอนเงิน 8 บาทต่อครั้ง และจำเป็นต้องแลกแต้มขึ้นต่ำ 2,000 แต้มขึ้นไป (200 บาท) ตัวอย่าง: สมมติว่ามี 2,500 แต้ม ซึ่งเท่ากับ 250 บาท เมื่อต้องการแลกเงิน ระบบจะหักค่าธรรมเนียมในการโอนเงิน 8 บาท ดังนั้นคุณจะได้รับเงินเข้าบัญชีทั้งสิ้น 242 บาท" },
  { q: "ลืมอีเมลหรือเข้าระบบไม่ได้ ต้องทำยังไง?", a: "ติดต่อทีมซัพพอร์ตได้ทาง LINE: @buddysupport โดยแจ้งชื่อบัญชี เพื่อให้ทีมงานตรวจสอบและทำการรีเซ็ตรหัสผ่าน" },
];

export default function InfluencerPage() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");
  const [ptpIndex, setPtpIndex] = useState(0);
  const [statKey, setStatKey] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [hoveredUnlock, setHoveredUnlock] = useState<number | null>(null);
  const ptpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ptpRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / PTP_STEPS.length));
      setPtpIndex(Math.min(idx, PTP_STEPS.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const ptpScrollTo = (idx: number) => {
    const el = ptpRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setPtpIndex(idx);
  };

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/light-purple-gradient-bg-3.jpg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "top center", overflowX: "hidden" }}>

      {/* ── Navbar ── */}
      <nav style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: scrolled ? "1px solid rgba(95,38,229,0.15)" : "1px solid rgba(255,255,255,0.25)",
        borderRadius: "100px",
        position: "fixed", top: "20px", left: "40px", right: "40px",
        zIndex: 100,
        paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"}
            alt="Buddy Review"
            style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/#contact"
            className="px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", background: "#5f26e5", color: "#ffffff" }}>
            เริ่มต้นใช้งาน
          </Link>
          <a href="https://line.me/ti/p/~@buddyreview"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "8px", background: "#06C755", border: "1.5px solid #06C755", borderRadius: "50px", padding: "12px 22px", color: "#ffffff", textDecoration: "none", fontSize: "16px", fontWeight: 600, transition: "opacity 0.2s", whiteSpace: "nowrap" }}>
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="none"/>
              <path d="M34 18.3C34 12.1 27.7 7 20 7S6 12.1 6 18.3c0 5.6 4.9 10.3 11.6 11.2.5.1 1.1.3 1.2.7.1.4.1.9 0 1.4l-.2 1.2c-.1.4-.3 1.5 1.3.8s8.7-5.1 11.9-8.7c2.2-2.4 3.2-4.8 3.2-7.6z" fill="white"/>
              <path d="M16.8 21.3h-3.2c-.2 0-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.4.2.4.4v4.7h2.8c.2 0 .4.2.4.4s-.2.4-.4.4zM18.2 20.9c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.4.2.4.4v5.1zM24.5 20.9c0 .2-.2.4-.4.4s-.3-.1-.4-.3l-2.8-3.8v3.7c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.3.1.4.3l2.8 3.8v-3.7c0-.2.2-.4.4-.4s.4.2.4.4v5.1zM27.6 17.2h-2.8v1.3h2.8c.2 0 .4.2.4.4s-.2.4-.4.4h-2.8v1.3h2.8c.2 0 .4.2.4.4s-.2.4-.4.4h-3.2c-.2 0-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4h3.2c.2 0 .4.2.4.4s-.2.4-.4.4z" fill="#06C755"/>
            </svg>
            สมัครผ่านไลน์
          </a>
          <button onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="btn-hero px-5 py-3 rounded-full ml-1"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, ...(scrolled ? { color: "#5f26e5" } : {}) }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: "relative", width: "100%", minHeight: "88vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Background image */}
        <img
          src="/success-stories/27983023-01.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            zIndex: 0,
          }}
        />
        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "220px",
          background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
          zIndex: 2,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: "1200px", margin: "0 auto", padding: "160px 64px 120px", width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 style={{
              ...KT,
              color: "#F0E8FF",
              fontSize: "clamp(40px,5.5vw,80px)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 20px",
              maxWidth: "640px",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)",
            }}>
              แมทช์งานที่ใช่<br />ได้งานที่ชอบ
            </h1>
            <h2 style={{
              ...KT,
              color: "rgba(255,255,255,0.88)",
              fontSize: "clamp(18px,1.8vw,28px)",
              fontWeight: 400,
              lineHeight: 1.7,
              margin: "0 0 40px",
              maxWidth: "480px",
            }}>
              จบปัญหาความยุ่งยากในการรีวิวแบบเดิม ๆ
            </h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {/* เริ่มต้นใช้งาน */}
              <a
                href="https://line.me/ti/p/~@buddyreview"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero"
                style={{
                  ...KT,
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  borderRadius: "50px", padding: "14px 28px",
                  textDecoration: "none",
                  fontSize: "16px", fontWeight: 600,
                }}
              >
                เริ่มต้นใช้งาน
              </a>
              {/* สมัครผ่านไลน์ */}
              <a
                href="https://line.me/ti/p/~@buddyreview"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...KT,
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "#06C755",
                  border: "1.5px solid #06C755",
                  borderRadius: "50px", padding: "14px 28px",
                  color: "#F0E8FF", textDecoration: "none",
                  fontSize: "16px", fontWeight: 600,
                  transition: "opacity 0.2s",
                }}
              >
                {/* LINE logo icon */}
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="none"/>
                  <path d="M34 18.3C34 12.1 27.7 7 20 7S6 12.1 6 18.3c0 5.6 4.9 10.3 11.6 11.2.5.1 1.1.3 1.2.7.1.4.1.9 0 1.4l-.2 1.2c-.1.4-.3 1.5 1.3.8s8.7-5.1 11.9-8.7c2.2-2.4 3.2-4.8 3.2-7.6z" fill="white"/>
                  <path d="M16.8 21.3h-3.2c-.2 0-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.4.2.4.4v4.7h2.8c.2 0 .4.2.4.4s-.2.4-.4.4zM18.2 20.9c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.4.2.4.4v5.1zM24.5 20.9c0 .2-.2.4-.4.4s-.3-.1-.4-.3l-2.8-3.8v3.7c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4s.3.1.4.3l2.8 3.8v-3.7c0-.2.2-.4.4-.4s.4.2.4.4v5.1zM27.6 17.2h-2.8v1.3h2.8c.2 0 .4.2.4.4s-.2.4-.4.4h-2.8v1.3h2.8c.2 0 .4.2.4.4s-.2.4-.4.4h-3.2c-.2 0-.4-.2-.4-.4v-5.1c0-.2.2-.4.4-.4h3.2c.2 0 .4.2.4.4s-.2.4-.4.4z" fill="#06C755"/>
                </svg>
                สมัครผ่านไลน์
              </a>
            </div>
          </motion.div>
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
        <LogoMarquee logos={LOGOS_ROW1} direction="left" />
        <div style={{ height: "32px" }} />
        <LogoMarquee logos={LOGOS_ROW2} direction="right" />
      </section>

      {/* ── Opportunity Banner ── */}
      <section style={{
        background: "transparent",
        padding: "100px 48px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{
            ...KT,
            fontSize: "clamp(32px,3.5vw,52px)",
            fontWeight: 800,
            lineHeight: 1.25,
            margin: "0 0 32px",
          }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              โอกาสใหม่
            </span>
            <br />
            <span style={{ color: "#111827" }}>เริ่มต้นได้ที่นี่</span>
          </h2>
          <p style={{
            ...KT,
            color: "#111827",
            fontSize: "18px",
            lineHeight: 1.85,
            margin: 0,
            fontWeight: 400,
          }}>
            Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำ<br />
            พร้อมทีมงานที่ช่วยเหลือในทุกขั้นตอน เพิ่มโอกาสสร้างรายได้จากการรีวิว
          </p>
        </div>
      </section>

      {/* ── Path to Partnership ── */}
      <section style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

        {/* Centered title */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{
            ...KT,
            fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800,
            color: "#111827",
            margin: "0 0 16px", lineHeight: 1.2,
          }}>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Path to </span><span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Partnership</span>
          </h2>
        </div>

        {/* Full-width carousel */}
        <div>
          {/* Track */}
          <div
            ref={ptpRef}
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              overflowY: "visible",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "40px",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.cursor = "grabbing";
              const startX = e.pageX;
              const startScroll = el.scrollLeft;
              const onMove = (me: MouseEvent) => { el.scrollLeft = startScroll - (me.pageX - startX); };
              const onUp = () => {
                el.style.cursor = "grab";
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {PTP_STEPS.map((s) => (
              <div key={s.step} style={{
                flex: "0 0 clamp(420px, 46vw, 600px)",
                scrollSnapAlign: "start",
                userSelect: "none",
                padding: "48px 48px 48px 32px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "36px",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "28px",
                border: "1px solid rgba(95,38,229,0.08)",
              }}>
                  {/* Left — phone mockup image */}
                  <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                      position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(160,100,255,0.22) 0%, transparent 68%)",
                      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    }} />
                    <div style={{
                      position: "absolute", width: "140px", height: "140px", borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,0,137,0.13) 0%, transparent 70%)",
                      bottom: "0px", right: "0px",
                    }} />
                    <img
                      src={s.img}
                      alt={s.title}
                      draggable={false}
                      className="ptp-phone"
                      style={{
                        position: "relative", zIndex: 1,
                        width: "100%", maxWidth: "312px",
                        height: "auto",
                      }}
                    />
                  </div>
                  {/* Right — content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center",
                      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                      borderRadius: "50px", padding: "6px 18px", width: "fit-content",
                    }}>
                      <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#F0E8FF", letterSpacing: "0.04em" }}>STEP {s.step}</span>
                    </div>
                    <h3 style={{ ...KT, fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 800, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.85, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {PTP_STEPS.map((s, i) => (
              <button
                key={s.step}
                onClick={() => ptpScrollTo(i)}
                style={{
                  height: "8px", width: i === ptpIndex ? "28px" : "8px",
                  borderRadius: "4px", border: "none", padding: 0, cursor: "pointer",
                  background: i === ptpIndex ? "#5f26e5" : "rgba(95,38,229,0.2)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── Unlock Exclusive Opportunities ── */}
      <section style={{
        background: "transparent",
        padding: "100px 48px",
      }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Unlock Exclusive </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Opportunities</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", title: "แบรนด์เชื่อถือได้", desc: "ไม่มีแบรนด์เงียบ ไม่มีงานปลอม มีแต่ความโปร" },
              { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", title: "จ่ายตรง ไม่มีเบี้ยว", desc: "งานจบ เงินไม่หาย กดเบิกเองได้ทุกเมื่อ รับตามรอบแบบตรงเวลา" },
              { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", title: "รีวิวได้ครบ", desc: "จบทุกแพลตฟอร์ม ให้คุณสามารถมีโอกาส รับงานรีวิวได้หลากหลายช่องทาง" },
              { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", title: "สิทธิพิเศษเฉพาะคุณ", desc: "ร่วมกิจกรรมและรับรางวัลสุดเอ็กซ์คลูซีฟ" },
              { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", title: "มืออาชีพที่อยู่เคียงข้างคุณ", desc: "ทำงานได้อย่างมั่นใจ ด้วยทีมงานมืออาชีพ และระบบที่ช่วยให้ทุกอย่างง่ายขึ้น" },
              { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", title: "แมทช์งานที่ใช่", desc: "รู้งานใหม่ก่อนใคร ด้วยระบบคัดกรองที่แมทช์งานตรงใจ ให้คุณได้ทำงานที่ใช่จากสิ่งที่ชอบ" },
            ].map((item, i) => (
              <div key={item.title}
                onMouseEnter={() => setHoveredUnlock(i)}
                onMouseLeave={() => setHoveredUnlock(null)}
                style={{
                padding: "32px 28px 28px",
                display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", justifyContent: "space-between",
                background: hoveredUnlock === i ? "#5f26e5" : "#ffffff",
                borderRadius: "24px",
                border: "1px solid rgba(95,38,229,0.08)",
                boxShadow: hoveredUnlock === i ? "0 8px 32px rgba(95,38,229,0.3)" : "0 2px 12px rgba(0,0,0,0.04)",
                minHeight: "280px",
                transition: "background 0.25s, box-shadow 0.25s",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: hoveredUnlock === i ? "rgba(255,255,255,0.2)" : "rgba(95,38,229,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.25s" }}>
                    <img src={item.img} alt={item.title} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                  </div>
                  <div>
                    <h3 style={{ ...KT, fontSize: "22px", fontWeight: 700, color: hoveredUnlock === i ? "#ffffff" : "#5f26e5", margin: "0 0 10px", lineHeight: 1.3, transition: "color 0.25s" }}>{item.title}</h3>
                    <p style={{ ...KT, fontSize: "15px", color: hoveredUnlock === i ? "rgba(255,255,255,0.85)" : "#111827", lineHeight: 1.7, margin: 0, transition: "color 0.25s" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories bento grid ── */}
      <section style={{ background: "transparent", padding: "100px 48px" }} onMouseEnter={() => setStatKey(k => k + 1)}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: 0 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Success </span><span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Stories</span>
            </h2>
          </div>
          {/* 3-column bento grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(5, 280px)",
            gap: "16px",
          }}>
            {/* Row 1 Col 1 — Watsons logo */}
            <Link href="/success/watsons" className="group" style={{ gridRow: "1", gridColumn: "1", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none" }}>
              <img src="/success-stories/Success stories-06.webp" alt="Watsons" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Watsons</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>House Brand ปังด้วยพลังอินฟลูฯ บน TikTok &amp; Lemon8</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "220", label: "Posts" }, { val: "1.2M", label: "Reach" }, { val: "12K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            {/* Row 1 Col 2 — Guss Damn Good */}
            <Link href="/success/guss-damn-good" className="group" style={{ gridRow: "1", gridColumn: "2", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none", display: "block" }}>
              <img src="/success-stories/Success stories-03.webp" alt="Guss Damn Good" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 700, margin: 0 }}>Guss Damn Good x ENO</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)", lineHeight: "1.5", margin: 0 }}>รสชาติที่มีเรื่องเล่า! เมื่อไอศครีมเจอกับผงฟู้คลาย กรดลดแน่นเฟ้อ</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "5.9M", label: "Views" }, { val: "4.4M", label: "Reach" }, { val: "120K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            {/* Row 1-2 Col 3 — Nice.Naphatchw video */}
            <div style={{ gridRow: "1 / 3", gridColumn: "3", borderRadius: "24px", overflow: "hidden" }}>
              <video src="/success-stories/Nice.Naphatchw.mov" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Row 2 Col 1 — Stat 95,000 */}
            <div style={{ gridRow: "2", gridColumn: "1", background: "#5f26e5", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px", padding: "32px" }}>
              <span className="font-bold" style={{ ...KT, fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#ffffff" }}>
                <AnimatedCounter key={`stat1-${statKey}`} target={95000} />
              </span>
              <span className="font-normal" style={{ ...KT, fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "rgba(255,255,255,0.8)" }}>เครือข่ายอินฟลูเอนเซอร์</span>
            </div>
            {/* Row 2-3 Col 2 — Pookkyjdp video */}
            <div style={{ gridRow: "2 / 4", gridColumn: "2", borderRadius: "24px", overflow: "hidden" }}>
              <video src="/success-stories/Pookkyjdp.mov" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Row 3-4 Col 1 — Flukymltp video */}
            <div style={{ gridRow: "3 / 5", gridColumn: "1", borderRadius: "24px", overflow: "hidden" }}>
              <video src="/success-stories/Flukymltp.mov" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Row 3 Col 3 — AHC */}
            <Link href="/success/ahc" className="group" style={{ gridRow: "3", gridColumn: "3", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none", display: "block" }}>
              <img src="/success-stories/Success stories-01.webp" alt="AHC" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>{"AHC 'The Skin Game'"}</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "14M", label: "Views" }, { val: "9.2M", label: "Reach" }, { val: "190K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            {/* Row 4 Col 2 — Ldc logo */}
            <Link href="/success/ldc-dental" className="group" style={{ gridRow: "4", gridColumn: "2", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none" }}>
              <img src="/success-stories/Success stories-04.webp" alt="LDC" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>LDC Dental</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "4.2K", label: "Reach" }, { val: "4.2K", label: "Engagement" }, { val: "9.8%", label: "Engagement Rate" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)", textAlign: "center" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            {/* Row 4 Col 3 — Stat 1,000+ */}
            <div style={{ gridRow: "4", gridColumn: "3", background: "#5f26e5", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px", padding: "32px" }}>
              <span className="font-bold" style={{ ...KT, fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#ffffff" }}>
                <AnimatedCounter key={`stat2-${statKey}`} target={1000} suffix="+" />
              </span>
              <span className="font-normal" style={{ ...KT, fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "rgba(255,255,255,0.8)" }}>ลูกค้าที่ไว้วางใจ</span>
            </div>
            {/* Row 5 Col 1 — Viu logo */}
            <Link href="/success/viu" className="group" style={{ gridRow: "5", gridColumn: "1", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none" }}>
              <img src="/success-stories/Success stories-05.webp" alt="VIU" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Viu</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันให้แคมเปญ &quot;อีสานชมวิว&quot;</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "239K", label: "Reach" }, { val: "4.3K", label: "Engagement" }, { val: "956K", label: "Combined Followers" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)", textAlign: "center" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            {/* Row 5 Col 2 — Stat 4,000+ */}
            <div style={{ gridRow: "5", gridColumn: "2", background: "#5f26e5", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "4px", padding: "32px" }}>
              <span className="font-bold" style={{ ...KT, fontSize: "clamp(32px,3.2vw,52px)", lineHeight: "1.15", color: "#ffffff" }}>
                <AnimatedCounter key={`stat3-${statKey}`} target={4000} suffix="+" />
              </span>
              <span className="font-normal" style={{ ...KT, fontSize: "clamp(16px,1.6vw,26px)", lineHeight: "1.4", color: "rgba(255,255,255,0.8)" }}>แคมเปญที่ส่งมอบ</span>
            </div>
            {/* Row 5 Col 3 — Nissin logo */}
            <Link href="/success/nissin" className="group" style={{ gridRow: "5", gridColumn: "3", borderRadius: "24px", overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none" }}>
              <img src="/success-stories/Success stories-07.webp" alt="Nissin" className="group-hover:opacity-0" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "opacity 0.3s ease", boxSizing: "border-box", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
                  <h3 style={{ ...KT, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "clamp(29px,2.6vw,39px)", fontWeight: 700, margin: 0 }}>Nissin</h3>
                  <p style={{ ...KT, color: "#111827", fontSize: "clamp(16px,1.3vw,18px)", lineHeight: "1.5", margin: 0 }}>Nissin ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ &quot;ต้มยำกุ้งแซ่บซีส&quot;</p>
                  <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "center" }}>
                    {[{ val: "13", label: "Posts" }, { val: "1.86M", label: "Reach" }, { val: "45K", label: "Engagement" }].map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ ...KT, color: "#5f26e5", fontSize: "clamp(21px,1.8vw,29px)", fontWeight: 700 }}>{s.val}</span>
                        <span style={{ ...KT, color: "#111827", fontSize: "clamp(14px,1.2vw,17px)" }}>{s.label}</span>
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

      {/* ── Testimonials ── */}
      <section style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{
              ...KT,
              fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800,
              color: "#111827",
              margin: "0 0 16px", lineHeight: 1.25,
            }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>What </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                They Say
              </span>
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>


      {/* ── FAQs ── */}
      <section style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>

          {/* Left — title area */}
          <div style={{ position: "sticky", top: "120px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.2vw,48px)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Frequently Asked </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Questions
              </span>
            </h2>
          </div>

          {/* Right — accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((item, i) => (
              <div key={i} style={{
                background: "#ffffff",
                border: "1px solid rgba(95,38,229,0.12)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: faqOpen === i ? "0 4px 24px rgba(95,38,229,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.25s",
              }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    ...KT, width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: "16px",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "20px 24px", textAlign: "left",
                  }}
                >
                  <span style={{ ...KT, fontSize: "16px", fontWeight: 600, color: faqOpen === i ? "#111827" : "#374151", lineHeight: 1.5 }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                    background: "#5f26e5", display: "flex", alignItems: "center",
                    justifyContent: "center", transition: "transform 0.25s ease",
                    transform: faqOpen === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {faqOpen === i && (
                  <p style={{ ...KT, fontSize: "15px", color: "#6b7280", lineHeight: 1.85, margin: "0", padding: "0 24px 20px" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #F0E8FF 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10"
          style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Left column */}
          <div className="flex flex-col gap-8" style={{ maxWidth: "515px" }}>
            <div>
              <img src="/buddy-review-logo.png" alt="Buddy Review" style={{ height: "58px", width: "auto" }} />
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}>
                  ติดต่อเรา<br/>
                  <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
                  <a href="mailto:Info@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
                  <a href="mailto:Marketing@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
                  <a href="mailto:Recruit@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
                </p>
              </div>
              <p className="font-normal" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}>
                <a href="tel:+66886861676" style={{ color: "#F0E8FF", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
                <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#F0E8FF", textDecoration: "none" }}>Line: @buddysupport</a>
              </p>
              <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}>FAQs</p>
            </div>
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
            <div className="flex items-center gap-4">
              <img src="/award-mt2025.png" alt="MT Award 2025" style={{ height: "85px", width: "auto", objectFit: "contain" }} />
            </div>
            <div className="flex flex-col items-end gap-4">
              <p className="font-normal text-right" style={{ ...KT, fontSize: "16px", lineHeight: "160%", maxWidth: "453px", color: "#F0E8FF" }}>
                บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
              </p>
            </div>
            <p className="font-normal text-right" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#F0E8FF" }}>
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#F0E8FF", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
              &nbsp;|&nbsp;
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#F0E8FF", textDecoration: "underline" }}>ข้อตกลงการใช้งาน</a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
