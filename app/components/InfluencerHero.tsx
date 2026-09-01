"use client";
import { motion } from "motion/react";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const TEXT = {
  th: {
    h1Line1: "แมทช์งานที่ใช่",
    h1Line2: "ได้งานที่ชอบ",
    subhead: "จบปัญหาความยุ่งยากในการรีวิวแบบเดิม ๆ เชื่อมต่อกับแบรนด์ชั้นนำและสร้างรายได้จากสิ่งที่คุณรัก",
    applyNow: "สมัครเลย",
    applyLine: "สมัครผ่านไลน์",
    statTrustedClients: "ลูกค้าที่ไว้วางใจ",
    statCampaigns: "แคมเปญที่ส่งมอบ",
    statNetwork: "เครือข่ายอินฟลูเอนเซอร์",
  },
  en: {
    h1Line1: "Match the Right Job,",
    h1Line2: "Get Work You Love",
    subhead: "No more hassle with reviewing the old way. Connect with leading brands and earn from the things you love.",
    applyNow: "Apply Now",
    applyLine: "Apply via LINE",
    statTrustedClients: "Trusted Clients",
    statCampaigns: "Campaigns Delivered",
    statNetwork: "Influencer Network",
  },
};

export default function InfluencerHero({ lang = "th" }: { lang?: "th" | "en" }) {
  const t = lang === "th" ? TEXT.th : TEXT.en;
  return (
    <section className="hero-section-inf" style={{ padding: "120px 64px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #FFFFFF 0%, #F7F1FC 100%)" }}>

      {/* Background glow blobs */}
      <div style={{ position: "absolute", top: "-140px", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="hero-grid-inf" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

        {/* ── LEFT: title + desc + stat cards ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="hero-h1-inf" style={{ ...KT, fontWeight: 900, lineHeight: 1.06, marginTop: "1lh", marginBottom: "24px", fontSize: "clamp(48px,5.2vw,80px)", color: "#111827" }}>
            {t.h1Line1}<br />
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.h1Line2}
            </span>
          </h1>
          <h2 style={{ ...KT, color: "#111827", fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, lineHeight: 1.55, margin: "0 0 32px", maxWidth: "460px" }}>
            {t.subhead}
          </h2>

          <div className="hero-cta-row-inf" style={{ display: "flex", gap: "14px", marginBottom: "52px", flexWrap: "wrap" }}>
            <a href="https://www.buddyreview.co/app/new-campaigns" target="_blank" rel="noopener noreferrer"
              className="btn-hero-solid-purple hero-cta-btn-inf"
              style={{ ...KT, display: "inline-flex", alignItems: "center", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
              {t.applyNow}
            </a>
            <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer"
              className="btn-line hero-cta-btn-inf"
              style={{ ...KT, display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "50px", padding: "14px 28px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
              <Image src="/social/Line.png" alt="" width={22} height={22} style={{ width: "22px", height: "22px", flexShrink: 0 }} />
              {t.applyLine}
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
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.statTrustedClients}</p>
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
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.statCampaigns}</p>
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
              <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.statNetwork}</p>
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
  );
}
