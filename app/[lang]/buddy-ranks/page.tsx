"use client";
import Image from "next/image";
import { motion } from "motion/react";
import RotatingCube from "../../components/RotatingCube";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PINK_GRAD = "linear-gradient(90deg, #ff008c 0%, #ff4fd8 100%)";

export default function BuddyRanksPage() {
  return (
    <div style={{
      ...KT,
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0c0720 0%, #1c1256 40%, #2b1a72 70%, #1c1256 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ── Navbar ── */}
      <nav className="br-nav" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 32px", maxWidth: "720px", width: "100%", margin: "0 auto", boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "48px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <Image src="/buddy-review-logo.png" alt="" fill sizes="140px"
              style={{ objectFit: "cover", objectPosition: "left center" }} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, whiteSpace: "nowrap" }}>Buddy Ranks</span>
        </div>
        <a href="#login" className="br-login-btn" style={{
          ...KT, display: "inline-flex", alignItems: "center", gap: "6px",
          border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50px",
          padding: "10px 20px", fontSize: "14px", fontWeight: 600,
          color: "#ffffff", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.5)",
          whiteSpace: "nowrap",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>
          เข้าสู่ระบบ
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="br-hero" style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        padding: "24px 32px 100px", maxWidth: "720px", width: "100%", margin: "0 auto", boxSizing: "border-box",
      }}>
        {/* AI badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "linear-gradient(90deg, #5f26e5 0%, #7c3aed 100%)",
          borderRadius: "50px", padding: "8px 20px", marginBottom: "28px",
        }}>
          <span style={{ fontSize: "14px" }}>✨</span>
          <span style={{ fontSize: "14px", fontWeight: 700 }}>AI วิเคราะห์บัญชี TikTok</span>
        </div>

        {/* Headline */}
        <h1 className="br-h1" style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, lineHeight: 1.25, margin: "0 0 24px" }}>
          Buddy Ranks<br/>
          รู้จักตัวตนของคุณ<br/>
          ผ่านพลังของ{" "}
          <span style={{ background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Data
          </span>
        </h1>

        {/* Subtext */}
        <p className="br-desc" style={{ fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", maxWidth: "540px", margin: "0 0 36px" }}>
          AI วิเคราะห์บัญชี TikTok เพื่อช่วยให้คุณเข้าใจคอนเทนต์ ผู้ติดตาม จุดแข็ง และแนวทางการเติบโตของคุณ
        </p>

        {/* CTA */}
        <a href="#login" className="br-cta-btn" style={{
          ...KT, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
          background: PINK_GRAD, borderRadius: "50px", padding: "18px 56px",
          fontSize: "17px", fontWeight: 700, color: "#ffffff", textDecoration: "none",
          boxShadow: "0 12px 32px rgba(255,0,140,0.35)", marginBottom: "24px",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>
          เข้าสู่ระบบ
        </a>

        {/* Trust line */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/></svg>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: 0 }}>
            เราใช้ข้อมูลเฉพาะสำหรับการวิเคราะห์<br/>
            วิเคราะห์ได้เฉพาะบัญชี Public เท่านั้น
          </p>
        </div>

        {/* Visual composition */}
        <div className="br-visual" style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
          {/* Rotating cube — decorative, floats near the phone mockup */}
          <div style={{ position: "absolute", top: "-10px", right: "0px", zIndex: 3, pointerEvents: "none" }}>
            <RotatingCube width={90} height={90} color={0xff2f9e} trigger="inView" />
          </div>

          <motion.div
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ease: "circInOut", duration: 1 }}
          >
            <Image
              src="/buddy-rank-phone.png"
              alt="Buddy Ranks — AI TikTok account analysis"
              width={1920}
              height={2000}
              className="br-phone-img"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
