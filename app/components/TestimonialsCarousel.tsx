"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

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

export default function TestimonialsCarousel({ lang = "th" }: { lang?: "th" | "en" }) {
  const items = TESTIMONIALS;
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

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const TCCard = ({ item, active }: { item: typeof TESTIMONIALS[0]; active: boolean }) => (
    <div className={active ? "tc-card tc-card-active" : "tc-card tc-card-side"} style={{
      width: active ? "420px" : "380px",
      flexShrink: 0,
      borderRadius: "20px",
      background: "rgba(255,255,255,0.22)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.45)",
      boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
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
      <div className="tc-wrap" onWheel={onWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", padding: "20px 70px" }}>
        {/* Prev arrow */}
        <button onClick={() => go(-1)} className="tc-arrow arrow-cta-btn"
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3, touchAction: "manipulation" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 5L7.5 10L12.5 15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
        <button onClick={() => go(1)} className="tc-arrow arrow-cta-btn"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3, touchAction: "manipulation" }}>
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
              transition: "width 0.3s ease, background 0.3s ease", padding: 0,
              touchAction: "manipulation" }} />
        ))}
      </div>
    </div>
  );
}
