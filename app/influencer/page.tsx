"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQAccordion from "../components/FAQAccordion";
import TestimonialsGrid from "../components/TestimonialsGrid";
import LogoMarquee from "../components/LogoMarquee";
import SuccessStoriesSlider from "../components/SuccessStoriesSlider";

const PTP_STEPS = [
  { step: "01", img: "/path-to-partnership/Step-1.png", title: "สมัครเป็นอินฟลูกับเรา", desc: "สมัครบัญชีอินฟลูเอนเซอร์ง่ายๆ แค่ 5 นาที พร้อมเชื่อมต่อช่องทางโซเชียลมีเดีย ให้เรารู้จักคุณมากขึ้นและเปิดโอกาสในการร่วมงานกับแบรนด์ชั้นนำ" },
  { step: "02", img: "/path-to-partnership/Step-2.png", title: "ค้นหางานที่ใช่", desc: "เลือกดูงานรีวิวจากแบรนด์ดังที่คัดมาให้คุณโดยเฉพาะ เมื่อเจอที่ชอบก็คลิกสมัครได้เลย ไม่ต้องรอช้า!" },
  { step: "03", img: "/path-to-partnership/Step-3.png", title: "คอนเฟิร์มและรับบรีฟ", desc: "เมื่อได้รับการคัดเลือกจากแบรนด์ ทีมงานติดต่อกลับเพื่อคอนเฟิร์มการรับงานและส่งรายละเอียดบรีฟ" },
  { step: "04", img: "/path-to-partnership/Step-4.png", title: "สร้างสรรค์ได้เลย", desc: "สร้างสรรค์คอนเทนต์สุดปังในสไตล์ของคุณได้เต็มที่ จากนั้นส่งดราฟต์ให้เราตรวจสอบผ่านแพลตฟอร์มของเราได้เลยแบบง่ายๆ" },
  { step: "05", img: "/path-to-partnership/Step-5.png", title: "รอตรวจดราฟต์", desc: "ทีมงานจะแจ้งกลับทันทีหากมีการแก้ไข แต่ถ้าคอนเทนต์ของคุณพร้อมแล้ว ก็เตรียมตัวโพสต์ตามกำหนดการได้เลย" },
  { step: "06", img: "/path-to-partnership/Step-6.png", title: "ลงโพสต์", desc: "ได้เวลาไวรัล! โพสต์คอนเทนต์สุดปังของคุณให้กับผู้ติดตามของคุณได้เลย" },
  { step: "07", img: "/path-to-partnership/Step-7.png", title: "รับเงินได้เลย", desc: "โดยจ่ายเป็น Buddy Points ซึ่งสามารถนำพอยท์ไปแลกเป็นเงินสดได้ทันที ไม่มีเบี้ยว" },
];


export default function InfluencerPage() {
  const [ptpIndex, setPtpIndex] = useState(0);
  const [hoveredUnlock, setHoveredUnlock] = useState<number | null>(null);
  const ptpRef = useRef<HTMLDivElement>(null);


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
      <Navbar />


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
      <LogoMarquee />


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
      <SuccessStoriesSlider />


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
      <FAQAccordion />


      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}
