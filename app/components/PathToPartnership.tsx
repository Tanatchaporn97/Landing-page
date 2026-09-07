"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

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
  const [active, setActive] = useState(0);
  const current = PTP_STEPS[active];

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

        {/* 2-column: hoverable step list | mockup + description */}
        <div className="ptp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "stretch" }}>

          {/* Left — dark hoverable step list */}
          <div style={{
            background: "linear-gradient(160deg, #1a0f2e 0%, #120a24 100%)",
            borderRadius: "28px",
            padding: "16px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {PTP_STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <div key={s.step}
                  onMouseEnter={() => setActive(i)}
                  style={{ padding: "14px 0", cursor: "pointer", display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span style={{ ...KT, fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", color: isActive ? "#ff8bc7" : "rgba(255,255,255,0.35)", flexShrink: 0, transition: "color 0.3s ease" }}>
                    {s.step}
                  </span>
                  <h3 style={{ ...KT, fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, margin: 0, lineHeight: 1.35,
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)", transition: "color 0.3s ease" }}>
                    {s.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right — mockup crossfade + description */}
          <div style={{
            background: "#ffffff",
            borderRadius: "28px",
            border: "1px solid rgba(95,38,229,0.08)",
            boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "260px", aspectRatio: "468 / 900", marginBottom: "28px" }}>
              <div style={{
                position: "absolute", width: "260px", height: "260px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(160,100,255,0.22) 0%, transparent 68%)",
                top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0,
              }} />
              <AnimatePresence mode="wait">
                <motion.div key={current.img}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                  <Image src={current.img} alt={current.title} fill sizes="260px" style={{ objectFit: "contain" }} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center",
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              borderRadius: "50px", padding: "8px 24px", width: "fit-content", marginBottom: "16px",
            }}>
              <span style={{ ...KT, fontSize: "14px", fontWeight: 700, color: "#F0E8FF", letterSpacing: "0.04em" }}>STEP {current.step}</span>
            </div>
            <h3 style={{ ...KT, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 800, color: "#5f26e5", margin: "0 0 12px", lineHeight: 1.3 }}>{current.title}</h3>
            <p style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.8, margin: 0, maxWidth: "420px" }}>{current.desc}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px){
          .ptp-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
