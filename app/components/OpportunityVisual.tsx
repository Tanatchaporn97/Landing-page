"use client";
import { motion } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function OpportunityVisual({ lang }: { lang: "th" | "en" }) {
  const t = lang === "th"
    ? { trustedClients: "ลูกค้าที่ไว้วางใจ", campaigns: "แคมเปญที่ส่งมอบ", network: "เครือข่ายอินฟลูเอนเซอร์" }
    : { trustedClients: "Trusted Clients", campaigns: "Campaigns Delivered", network: "Influencer Network" };

  return (
    <>
      {/* Stat cards — same scattered, hover-animated treatment as the Header */}
      <div className="hero-stat-cards" style={{ position: "relative", height: "260px" }}>
        <motion.div
          className="hero-stat-card"
          animate={{ rotate: -4 }}
          whileHover={{ rotate: -4, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{ position: "absolute", left: 0, top: "36px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 1, cursor: "pointer" }}
        >
          <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🤝</span>
          <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>1,000+</p>
          <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.trustedClients}</p>
        </motion.div>
        <motion.div
          className="hero-stat-card"
          animate={{ rotate: 2 }}
          whileHover={{ rotate: 2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{ position: "absolute", left: "169px", top: "62px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 2, cursor: "pointer" }}
        >
          <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🎯</span>
          <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>4,000+</p>
          <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.campaigns}</p>
        </motion.div>
        <motion.div
          className="hero-stat-card"
          animate={{ rotate: -2 }}
          whileHover={{ rotate: -2, y: -14, scale: 1.06, boxShadow: "0 20px 48px rgba(95,38,229,0.18)" }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{ position: "absolute", left: "325px", top: "10px", background: "#ffffff", borderRadius: "22px", padding: "23px 23px 21px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", width: "228px", zIndex: 3, cursor: "pointer" }}
        >
          <span style={{ fontSize: "23px", position: "absolute", top: "16px", right: "18px" }}>🌐</span>
          <p style={{ ...KT, fontSize: "31px", fontWeight: 800, margin: "0 0 5px", lineHeight: 1, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>95K+</p>
          <p style={{ ...KT, fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{t.network}</p>
        </motion.div>
      </div>
    </>
  );
}

export function OpportunityPhone() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <div style={{ position: "absolute", left: "40%", top: "30%", transform: "translate(-50%, -50%)", width: "110%", height: "55%", background: "#5f25e5", borderRadius: "50%", filter: "blur(60px)", opacity: 0.22, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "60%", top: "70%", transform: "translate(-50%, -50%)", width: "110%", height: "55%", background: "#ff0089", borderRadius: "50%", filter: "blur(60px)", opacity: 0.20, zIndex: 0, pointerEvents: "none" }} />
      <motion.img
        src="/path-to-partnership/Step-2.png"
        alt="Buddy Review app"
        whileHover={{ y: -14, scale: 1.04, rotate: 1.5 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        style={{ height: "520px", width: "auto", maxWidth: "100%", display: "block", objectFit: "contain", position: "relative", zIndex: 1, cursor: "pointer" }}
      />
    </div>
  );
}
