"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));
const LOGOS_ROW2 = LOGO_FILES_ROW2.map((f) => (
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
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
          <div key={i} className="logo-marquee-item" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", height:"64px" }}>
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


function TestimonialsGrid() {
  const col1 = [0, 2, 4].map(i => TESTIMONIALS[i]);
  const col2 = [1, 3, 5].map(i => TESTIMONIALS[i]);

  const Card = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      padding: "20px 22px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{ position: "relative", width: "57px", height: "57px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="57px" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <p style={{ ...KT, fontWeight: 600, fontSize: "24px", color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{t.name}</p>
      </div>
      <p style={{ ...KT, fontSize: "14px", color: "#000000", lineHeight: "1.7", margin: 0 }}>{t.text}</p>
    </div>
  );

  return (
    <div className="testimonials-masonry" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        {col1.map((t, i) => <Card key={i} t={t} />)}
      </div>
      <div className="testimonials-col-2" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", marginTop: "48px" }}>
        {col2.map((t, i) => <Card key={i} t={t} />)}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");
  const [ptpIndex, setPtpIndex] = useState(0);
  const [statKey, setStatKey] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [hoveredUnlock, setHoveredUnlock] = useState<number | null>(null);
  const ptpRef = useRef<HTMLDivElement>(null);
  const csRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const catSlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

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
      <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
        <nav style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "100px",
          paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px",
        }}
          className="flex items-center justify-between nav-landing">
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"}
              alt="Buddy Review"
              className="nav-logo"
              width={138}
              height={48}
              style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }}
            />
          </Link>
          {/* Desktop buttons */}
          <div className="desktop-nav-btns flex items-center gap-3">
            <Link href="https://www.buddyreview.co/app/new-campaigns"
              className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
              สมัครเลย
            </Link>
            <a href="https://line.me/ti/p/~@buddyreview"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: "#5f26e5" }}>
              สมัครผ่านไลน์
            </a>
            <button onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="btn-hero px-5 py-3 rounded-full ml-1"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, color: "#5f26e5" }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
          {/* Hamburger button — mobile only */}
          <button type="button" className="hamburger-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", width: "44px", height: "44px", flexShrink: 0, flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}>
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#5f26e5", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}) }} />
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#5f26e5", borderRadius: "2px", transition: "opacity 0.25s", ...(menuOpen ? { opacity: 0 } : {}) }} />
            <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: "#5f26e5", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}) }} />
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
            <Link href="https://www.buddyreview.co/app/new-campaigns" onClick={() => setMenuOpen(false)}
              className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
              สมัครเลย
            </Link>
            <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              className="btn-hero rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center", color: "#ffffff" }}>
              สมัครผ่านไลน์
            </a>
            <button onClick={() => { setLang(lang === "th" ? "en" : "th"); setMenuOpen(false); }}
              className="btn-hero rounded-full"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", color: "#ffffff" }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
        )}
      </div>

      {/* ── Hero ── */}
      <section className="hero-section-inf" style={{ padding: "120px 64px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #f3eeff 0%, #fdf0fb 60%, #f3eeff 100%)" }}>

        {/* Background glow blobs */}
        <div style={{ position: "absolute", top: "-140px", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "-150px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,137,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid-inf" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* ── LEFT: title + desc + stat cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="hero-h1-inf" style={{ ...KT, fontWeight: 900, lineHeight: 1.06, margin: "0 0 24px", fontSize: "clamp(48px,5.2vw,80px)", color: "#111827" }}>
              แมทช์งานที่ใช่<br />
              <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ได้งานที่ชอบ
              </span>
            </h1>
            <h2 style={{ ...KT, color: "#111827", fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, lineHeight: 1.55, margin: "0 0 32px", maxWidth: "460px" }}>
              จบปัญหาความยุ่งยากในการรีวิวแบบเดิม ๆ เชื่อมต่อกับแบรนด์ชั้นนำและสร้างรายได้จากสิ่งที่คุณรัก
            </h2>

            <div className="hero-cta-row-inf" style={{ display: "flex", gap: "14px", marginBottom: "52px", flexWrap: "wrap" }}>
              <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
                className="btn-hero-solid-purple hero-cta-btn-inf"
                style={{ ...KT, display: "inline-flex", alignItems: "center", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
                สมัครเลย
              </a>
              <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer"
                className="btn-line hero-cta-btn-inf"
                style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "50px", padding: "14px 28px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
                สมัครผ่านไลน์
              </a>
            </div>

            {/* Stat cards — scattered overlay (text side always exposed) */}
            <div className="hero-stat-cards" style={{ position: "relative", height: "260px" }}>
              {/* Card 1 — leftmost, lowest z */}
              <motion.div
                className="hero-stat-card"
                animate={{ rotate: -4 }}
                whileHover={{ rotate: -4, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{ position: "absolute", left: 0, top: "36px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 1, cursor: "pointer" }}
              >
                <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🤝</span>
                <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>1,000+</p>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>ลูกค้าที่ไว้วางใจ</p>
              </motion.div>
              {/* Card 2 — on top of card 1's blank right edge */}
              <motion.div
                className="hero-stat-card"
                animate={{ rotate: 2 }}
                whileHover={{ rotate: 2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{ position: "absolute", left: "169px", top: "62px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 2, cursor: "pointer" }}
              >
                <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🎯</span>
                <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>4,000+</p>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>แคมเปญที่ส่งมอบ</p>
              </motion.div>
              {/* Card 3 — highest z, on top of card 2's blank right edge */}
              <motion.div
                className="hero-stat-card"
                animate={{ rotate: -2 }}
                whileHover={{ rotate: -2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{ position: "absolute", left: "325px", top: "10px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 3, cursor: "pointer" }}
              >
                <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🌐</span>
                <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>95K+</p>
                <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>เครือข่ายอินฟลูเอนเซอร์</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: phone + pill list ── */}
          <motion.div
            className="hero-right-col"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", transform: "translateX(-10%)" }}
          >
            {/* Phone image */}
            <div className="hero-phone-wrap" style={{ position: "relative", flexShrink: 0 }}>
              {/* Purple glow — top */}
              <div style={{
                position: "absolute",
                left: "40%",
                top: "30%",
                transform: "translate(-50%, -50%)",
                width: "110%",
                height: "55%",
                background: "#5f25e5",
                borderRadius: "50%",
                filter: "blur(60px)",
                opacity: 0.22,
                zIndex: 0,
                pointerEvents: "none",
              }} />
              {/* Pink glow — bottom */}
              <div style={{
                position: "absolute",
                left: "60%",
                top: "70%",
                transform: "translate(-50%, -50%)",
                width: "110%",
                height: "55%",
                background: "#ff0089",
                borderRadius: "50%",
                filter: "blur(60px)",
                opacity: 0.20,
                zIndex: 0,
                pointerEvents: "none",
              }} />
              <motion.img
                className="hero-phone-img"
                src="/path-to-partnership/Step-2.png"
                alt="Buddy Review app"
                whileHover={{ y: -14, scale: 1.04, rotate: 1.5 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                style={{ height: "520px", width: "auto", display: "block", objectFit: "contain", position: "relative", zIndex: 1, cursor: "pointer" }}
              />
            </div>

            {/* Pill scroll — beside phone */}
            {(() => {
              const PILLS = [
                { icon: "💪", label: "Sporty & Healthy" },
                { icon: "🎵", label: "TikTok Stars" },
                { icon: "💄", label: "Beauty Blogger" },
                { icon: "🍜", label: "Foodie" },
                { icon: "🎬", label: "Youtuber" },
                { icon: "🩺", label: "Doctor & Nurse" },
                { icon: "🦷", label: "Dentist" },
              ];
              const renderPill = (pill: { icon: string; label: string }, key: string) => (
                <div key={key} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.88)",
                  border: "1.5px solid rgba(255,255,255,0.95)",
                  borderRadius: "50px",
                  padding: "7px 12px 7px 7px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  whiteSpace: "nowrap" as const,
                  marginBottom: "9px",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                    {pill.icon}
                  </div>
                  <span style={{ ...KT, fontSize: "11px", fontWeight: 600, color: "#111827" }}>{pill.label}</span>
                </div>
              );
              return (
                <div className="pill-scroll-area hero-pills-col" style={{
                  width: "215px",
                  height: "442px",
                  background: "transparent",
                  border: "none",
                  padding: "4px 0",
                  flexShrink: 0,
                  transform: "translateX(-30%)",
                }}>
                  <div className="pill-scroll-track">
                    {[...PILLS, ...PILLS].map((pill, i) => renderPill(pill, `${i}`))}
                  </div>
                </div>
              );
            })()}
          </motion.div>

        </div>
      </section>

      {/* ── Hero → Logos fade overlay ── */}
      <div style={{ height: "80px", marginTop: "-80px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 6, pointerEvents: "none" }} />

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
        <LogoMarquee logos={LOGOS_ROW1} direction="left" />
        <div className="logo-marquee-row-gap" style={{ height: "32px" }} />
        <LogoMarquee logos={LOGOS_ROW2} direction="right" />
      </section>

      {/* ── Opportunity Banner ── */}
      <section className="inf-section" style={{
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
          <p className="desc-text" style={{
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
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
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
            className="ptp-track"
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
              <div key={s.step} className="ptp-card" style={{
                flex: "0 0 clamp(630px, 69vw, 900px)",
                scrollSnapAlign: "start",
                userSelect: "none",
                padding: "64px 64px 64px 48px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "54px",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "28px",
                border: "1px solid rgba(95,38,229,0.08)",
              }}>
                  {/* Left — phone mockup image */}
                  <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                      position: "absolute", width: "450px", height: "450px", borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(160,100,255,0.22) 0%, transparent 68%)",
                      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    }} />
                    <div style={{
                      position: "absolute", width: "210px", height: "210px", borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,0,137,0.13) 0%, transparent 70%)",
                      bottom: "0px", right: "0px",
                    }} />
                    <Image
                      src={s.img}
                      alt={s.title}
                      draggable={false}
                      className="ptp-phone"
                      width={468}
                      height={900}
                      style={{
                        position: "relative", zIndex: 1,
                        width: "100%", maxWidth: "468px",
                        height: "auto",
                      }}
                    />
                  </div>
                  {/* Right — content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center",
                      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                      borderRadius: "50px", padding: "8px 24px", width: "fit-content",
                    }}>
                      <span style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#F0E8FF", letterSpacing: "0.04em" }}>STEP {s.step}</span>
                    </div>
                    <h3 style={{ ...KT, fontSize: "clamp(22px,2vw,30px)", fontWeight: 800, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                    <p className="ptp-desc" style={{ ...KT, fontSize: "17px", color: "#111827", lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
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
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Unlock Exclusive </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Opportunities</span>
            </h2>
          </div>

          {/* 3-column: left features | phone | right features */}
          <div className="unlock-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "2px", alignItems: "center" }}>

            {/* Left features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", title: "แบรนด์เชื่อถือได้", desc: "ไม่มีแบรนด์เงียบ ไม่มีงานปลอม\nมีแต่ความโปร" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", title: "จ่ายตรง ไม่มีเบี้ยว", desc: "งานจบ เงินไม่หาย กดเบิกเองได้ทุกเมื่อ รับตามรอบแบบตรงเวลา" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", title: "รีวิวได้ครบ", desc: "จบทุกแพลตฟอร์ม ให้คุณสามารถมีโอกาส รับงานรีวิวได้หลากหลายช่องทาง" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center — phone */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
              <Image
                className="unlock-phone-img"
                src="/buddy-rank-phone.png"
                alt="Buddy Rank"
                width={608}
                height={1200}
                style={{ width: "608px", height: "auto", display: "block", position: "relative", zIndex: 1 }}
              />
            </div>

            {/* Right features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", title: "สิทธิพิเศษเฉพาะคุณ", desc: "ร่วมกิจกรรมและรับรางวัลสุดเอ็กซ์คลูซีฟ" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", title: "มืออาชีพที่อยู่เคียงข้างคุณ", desc: "ทำงานได้อย่างมั่นใจ ด้วยทีมงานมืออาชีพ และระบบที่ช่วยให้ทุกอย่างง่ายขึ้น" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", title: "แมทช์งานที่ใช่", desc: "รู้งานใหม่ก่อนใคร ด้วยระบบคัดกรองที่แมทช์งานตรงใจ ให้คุณได้ทำงานที่ใช่จากสิ่งที่ชอบ" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── Case Studies ── */}
      <section className="inf-section" style={{ background: "transparent", padding: "100px 64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header row */}
          <div className="cs-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: "0 0 10px", lineHeight: 1.2 }}>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Success </span><span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Stories</span>
              </h2>
              <p style={{ ...KT, fontSize: "16px", color: "#374151", margin: 0 }}>ผลลัพธ์จริงจากแคมเปญอินฟลูเอนเซอร์ที่เราภูมิใจ</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => csRef.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(95,38,229,0.10)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#5f26e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => csRef.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Cards scroll row */}
          <div ref={csRef} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], paddingBottom: "8px" }}>

            {/* ── Cards ── */}
            {[
              { href: "/success/nissin",         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          stats: [{ val: "13",    label: "Posts" }, { val: "1.86M", label: "Reach" }, { val: "45K",  label: "Engagement" }] },
              { href: "/success/ldc-dental",     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", stats: [{ val: "43K",   label: "Reach" },  { val: "4.2K",  label: "Engagement" }, { val: "9.8%", label: "Eng. Rate" }] },
              { href: "/success/watsons",        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               stats: [{ val: "220",   label: "Posts" }, { val: "1.2M",  label: "Reach" }, { val: "12K",  label: "Engagement" }] },
              { href: "/success/viu",            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          stats: [{ val: "239K",  label: "Reach" },  { val: "4.3K",  label: "Engagement" }, { val: "956K", label: "Followers" }] },
              { href: "/success/ahc",            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   stats: [{ val: "14M",   label: "Views" }, { val: "9.2M",  label: "Reach" }, { val: "190K", label: "Engagement" }] },
              { href: "/success/guss-damn-good", img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   stats: [{ val: "5.9M",  label: "Views" }, { val: "4.4M",  label: "Reach" }, { val: "120K", label: "Engagement" }] },
            ].map(card => (
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
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/category/${catSlug(card.cat)}`); }}
                      className="cs-cat-btn" style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
                    >
                      {card.cat}
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
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
        <div className="testimonials-outer" style={{ maxWidth: "1294px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "flex-start" }}>
          {/* Left: title */}
          <div className="testimonials-title" style={{ flex: "0 0 320px", paddingTop: "160px" }}>
            <h2 style={{
              ...KT,
              fontSize: "clamp(36px,4vw,58px)", fontWeight: 800,
              color: "#111827",
              margin: "0 0 20px", lineHeight: 1.15,
            }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>What </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", whiteSpace: "nowrap" }}>
                They Say
              </span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
              เสียงจริงจากอินฟลูเอนเซอร์ที่ร่วมงานกับ Buddy Review
            </p>
          </div>
          {/* Right: masonry grid */}
          <div style={{ flex: 1 }}>
            <TestimonialsGrid />
          </div>
        </div>
      </section>


      {/* ── FAQs ── */}
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Centered title */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ ...KT, fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Frequently Asked </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions</span>
            </h2>
          </div>

          {/* 2-column accordion grid */}
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>

            {/* Left column — items 0–3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQS.slice(0, 4).map((item, i) => (
                <div key={i} style={{
                  background: faqOpen === i ? "#5f26e5" : "#ffffff",
                  border: faqOpen === i ? "none" : "1px solid rgba(0,0,0,0.10)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "background 0.25s",
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
                    <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === i ? "#ffffff" : "#111827", lineHeight: 1.5 }}>
                      {item.q}
                    </span>
                    <span style={{
                      flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                      background: faqOpen === i ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                      justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                      transform: faqOpen === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {faqOpen === i && (
                    <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right column — items 4–7 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQS.slice(4).map((item, i) => {
                const idx = i + 4;
                return (
                  <div key={idx} style={{
                    background: faqOpen === idx ? "#5f26e5" : "#ffffff",
                    border: faqOpen === idx ? "none" : "1px solid rgba(0,0,0,0.10)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "background 0.25s",
                  }}>
                    <button
                      onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                      style={{
                        ...KT, width: "100%", display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: "16px",
                        background: "none", border: "none", cursor: "pointer",
                        padding: "20px 24px", textAlign: "left",
                      }}
                    >
                      <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === idx ? "#ffffff" : "#111827", lineHeight: 1.5 }}>
                        {item.q}
                      </span>
                      <span style={{
                        flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                        background: faqOpen === idx ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                        justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                        transform: faqOpen === idx ? "rotate(180deg)" : "rotate(0deg)",
                      }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                    {faqOpen === idx && (
                      <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Still have a question */}
          <div style={{ textAlign: "center", marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <h3 style={{ ...KT, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 800, color: "#111827", margin: 0 }}>
              มีคำถามเพิ่มเติมไหม?
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/faq?from=influencer"
                className="btn-insight"
                style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 48px", textDecoration: "none", display: "inline-block" }}>
                ดูเพิ่มเติม
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #F0E8FF 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
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
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}>
              ติดต่อเรา<br/>
              <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
              <a href="mailto:Info@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
              <a href="mailto:Marketing@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
              <a href="mailto:Recruit@buddyreview.co" style={{ color: "#F0E8FF", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
            </p>
            <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}>
              <a href="tel:+66886861676" style={{ color: "#F0E8FF", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
              <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#F0E8FF", textDecoration: "none" }}>Line: @buddysupport</a>
            </p>
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#F0E8FF" }}><a href="/faq?from=influencer" style={{ color: "#F0E8FF", textDecoration: "none" }}>FAQs</a></p>
          </div>

          {/* 4 — Address */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="font-normal text-right footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", maxWidth: "453px", color: "#F0E8FF" }}>
              บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
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
            <p className="font-normal text-right footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#F0E8FF" }}>
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
