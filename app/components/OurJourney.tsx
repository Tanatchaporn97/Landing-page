"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { type Locale } from "../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const ROW_HEIGHT = 72;
const ROW_GAP = 16;

const JOURNEY_STEPS = [
  { year: "2015 - 2017", img: "/about-us/2015-2017.png", title: "จุดเริ่มต้น", titleEn: "The Beginning",
    desc: "เริ่มต้นธุรกิจ Influencer Marketing ด้วยทีมงานเล็กๆ ที่เชื่อมั่นในพลังของอินฟลูเอนเซอร์ในการสร้างการเปลี่ยนแปลงให้แบรนด์",
    descEn: "Started our influencer marketing business with a small team that believed in the power of influencers to drive real change for brands." },
  { year: "2018", img: "/about-us/2018.webp", title: "ขยายเครือข่าย", titleEn: "Growing the Network",
    desc: "เติบโตเครือข่ายอินฟลูเอนเซอร์และพาร์ทเนอร์แบรนด์ พร้อมวางรากฐานระบบจับคู่แคมเปญ",
    descEn: "Grew our influencer and brand-partner network while laying the foundation for our campaign-matching system." },
  { year: "2019", img: "/about-us/2019.webp", title: "พัฒนาแพลตฟอร์ม", titleEn: "Building the Platform",
    desc: "เปิดตัวระบบจัดการแคมเปญที่ช่วยให้แบรนด์และอินฟลูเอนเซอร์ทำงานร่วมกันได้ง่ายและมีประสิทธิภาพมากขึ้น",
    descEn: "Launched our campaign management system, making collaboration between brands and influencers easier and more effective." },
  { year: "2020", img: "/about-us/2020.webp", title: "ก้าวสู่ดิจิทัลเต็มรูปแบบ", titleEn: "Going Fully Digital",
    desc: "ปรับตัวสู่การทำงานแบบดิจิทัลเต็มรูปแบบ รองรับความต้องการที่เปลี่ยนแปลงอย่างรวดเร็ว",
    descEn: "Shifted to a fully digital way of working to keep up with rapidly changing demands." },
  { year: "2022", img: "/about-us/2022.png", title: "ขับเคลื่อนด้วยดาต้า", titleEn: "Powered by Data",
    desc: "นำเทคโนโลยีและข้อมูลเชิงลึกมาใช้วิเคราะห์และเพิ่มประสิทธิภาพแคมเปญอย่างแม่นยำ",
    descEn: "Adopted technology and data insights to analyze and fine-tune campaign performance with precision." },
  { year: "2024", img: "/about-us/2024.png", title: "ผู้นำในตลาด", titleEn: "A Market Leader",
    desc: "ก้าวขึ้นเป็นหนึ่งในผู้นำด้าน Influencer Marketing ในไทย ด้วยเครือข่ายอินฟลูเอนเซอร์กว่า 1,000,000+ ราย",
    descEn: "Rose to become one of Thailand's leading influencer marketing agencies, with a network of over 1,000,000+ influencers." },
  { year: "2025", img: "/about-us/2025.png", title: "นวัตกรรมใหม่", titleEn: "New Innovations",
    desc: "พัฒนาโซลูชันและฟีเจอร์ใหม่ๆ อย่างต่อเนื่อง เพื่อตอบโจทย์ทุกความต้องการของแบรนด์",
    descEn: "Continuously developing new solutions and features to meet every brand's needs." },
  { year: "2026", img: null, title: "ก้าวต่อไป", titleEn: "What's Next",
    desc: "มุ่งสู่การเป็นศูนย์กลาง Influencer Marketing ที่ขับเคลื่อนด้วยเทคโนโลยีชั้นนำในภูมิภาค",
    descEn: "Moving toward becoming the region's leading technology-driven influencer marketing hub." },
];

export default function OurJourney({ lang }: { lang: Locale }) {
  const [active, setActive] = useState(0);
  const step = JOURNEY_STEPS[active];

  return (
    <div style={{ maxWidth: "1294px", margin: "80px auto 0", padding: "0 48px" }}>
      <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 56px" }}>
        <h2 className="section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: 0 }}>
          Our{" "}
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Journey
          </span>
        </h2>
      </div>

      <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
        {/* Left: placeholder crossfades to match the hovered year */}
        <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3 / 2" }}>
          <AnimatePresence mode="wait">
            <motion.div key={step.year}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ position: "absolute", inset: 0 }}>
              {step.img ? (
                <Image src={step.img} alt={step.year} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #5f25e5 0%, #ff0089 100%)" }}>
                  <span style={{ ...KT, fontSize: "clamp(40px,5vw,64px)", fontWeight: 800, color: "#ffffff" }}>{step.year}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: hoverable year list with a sliding progress bar */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, paddingLeft: "32px" }}>
          {/* track */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", borderRadius: "2px", background: "rgba(95,38,229,0.12)" }} />
          {/* sliding highlight */}
          <motion.div
            animate={{ top: active * (ROW_HEIGHT + ROW_GAP) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ position: "absolute", left: 0, width: "4px", height: `${ROW_HEIGHT}px`, borderRadius: "2px",
              background: "linear-gradient(180deg, #5f25e5 0%, #ff0089 100%)" }} />

          {JOURNEY_STEPS.map((s, i) => (
            <div key={s.year}
              onMouseEnter={() => setActive(i)}
              style={{ minHeight: `${ROW_HEIGHT}px`, display: "flex", flexDirection: "column", justifyContent: "center",
                cursor: "pointer", opacity: i === active ? 1 : 0.55, transition: "opacity 0.2s" }}>
              <h3 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: "0 0 4px", transition: "color 0.2s",
                color: i === active ? "#5f26e5" : "#111827" }}>
                {s.year} — {lang === "th" ? s.title : s.titleEn}
              </h3>
              <p style={{ ...KT, fontSize: "14px", lineHeight: "1.7", color: "#374151", margin: 0 }}>
                {lang === "th" ? s.desc : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
