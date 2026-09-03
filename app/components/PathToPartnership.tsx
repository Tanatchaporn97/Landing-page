"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const PTP_STEPS_TH = [
  { step: "01", img: "/path-to-partnership/Step-1.png", title: "สมัครเป็นอินฟลูกับเรา", desc: "สมัครบัญชีอินฟลูเอนเซอร์ง่ายๆ แค่ 5 นาที พร้อมเชื่อมต่อช่องทางโซเชียลมีเดีย ให้เรารู้จักคุณมากขึ้นและเปิดโอกาสในการร่วมงานกับแบรนด์ชั้นนำ" },
  { step: "02", img: "/path-to-partnership/Step-2.png", title: "ค้นหางานที่ใช่", desc: "เลือกดูงานรีวิวจากแบรนด์ดังที่คัดมาให้คุณโดยเฉพาะ เมื่อเจอที่ชอบก็คลิกสมัครได้เลย ไม่ต้องรอช้า!" },
  { step: "03", img: "/path-to-partnership/Step-3.png", title: "คอนเฟิร์มและรับบรีฟ", desc: "เมื่อได้รับการคัดเลือกจากแบรนด์ ทีมงานติดต่อกลับเพื่อคอนเฟิร์มการรับงานและส่งรายละเอียดบรีฟ" },
  { step: "04", img: "/path-to-partnership/Step-4.png", title: "สร้างสรรค์ได้เลย", desc: "สร้างสรรค์คอนเทนต์สุดปังในสไตล์ของคุณได้เต็มที่ จากนั้นส่งดราฟต์ให้เราตรวจสอบผ่านแพลตฟอร์มของเราได้เลยแบบง่ายๆ" },
  { step: "05", img: "/path-to-partnership/Step-5.png", title: "รอตรวจดราฟต์", desc: "ทีมงานจะแจ้งกลับทันทีหากมีการแก้ไข แต่ถ้าคอนเทนต์ของคุณพร้อมแล้ว ก็เตรียมตัวโพสต์ตามกำหนดการได้เลย" },
  { step: "06", img: "/path-to-partnership/Step-6.png", title: "ลงโพสต์", desc: "ได้เวลาไวรัล! โพสต์คอนเทนต์สุดปังของคุณให้กับผู้ติดตามของคุณได้เลย" },
  { step: "07", img: "/path-to-partnership/Step-7.png", title: "รับเงินได้เลย", desc: "โดยจ่ายเป็น Buddy Points ซึ่งสามารถนำพอยท์ไปแลกเป็นเงินสดได้ทันที ไม่มีเบี้ยว" },
];

const PTP_STEPS_EN = [
  { step: "01", img: "/path-to-partnership/Step-1.png", title: "Sign Up as Our Influencer", desc: "Create an influencer account in just 5 minutes and connect your social channels — so we can get to know you and open the door to work with top brands." },
  { step: "02", img: "/path-to-partnership/Step-2.png", title: "Find the Right Job", desc: "Browse review jobs from top brands curated just for you. Found one you like? Apply with one click — no need to wait!" },
  { step: "03", img: "/path-to-partnership/Step-3.png", title: "Confirm & Get Briefed", desc: "Once a brand selects you, our team will reach out to confirm the job and send over the campaign brief." },
  { step: "04", img: "/path-to-partnership/Step-4.png", title: "Create Freely", desc: "Create standout content in your own style, then submit your draft for review through our platform — quick and simple." },
  { step: "05", img: "/path-to-partnership/Step-5.png", title: "Await Draft Review", desc: "Our team will notify you right away if any edits are needed. If your content is ready, get set to post on schedule." },
  { step: "06", img: "/path-to-partnership/Step-6.png", title: "Post It Live", desc: "Time to go viral! Share your standout content with your followers." },
  { step: "07", img: "/path-to-partnership/Step-7.png", title: "Get Paid", desc: "Earn Buddy Points, which you can redeem for cash instantly — no delays, guaranteed." },
];

export default function PathToPartnership({ lang = "th" }: { lang?: "th" | "en" }) {
  const PTP_STEPS = lang === "th" ? PTP_STEPS_TH : PTP_STEPS_EN;
  const [ptpIndex, setPtpIndex] = useState(0);
  const ptpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ptpRef.current;
    if (!el) return;
    
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / PTP_STEPS.length));
      setPtpIndex(Math.min(idx, PTP_STEPS.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
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
    <section className="inf-section" style={{ background: "linear-gradient(180deg, #F9F6FE 0%, #F5F0FC 100%)", padding: "100px 48px" }}>
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
      <div style={{ position: "relative" }}>
        {/* Prev arrow */}
        <button onClick={() => ptpScrollTo(Math.max(0, ptpIndex - 1))} className="tc-arrow ptp-arrow arrow-cta-btn"
          style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 5L7.5 10L12.5 15" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Next arrow */}
        <button onClick={() => ptpScrollTo(Math.min(PTP_STEPS.length - 1, ptpIndex + 1))} className="tc-arrow ptp-arrow arrow-cta-btn"
          style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%", border: "none",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

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
              boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
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
  );
}
