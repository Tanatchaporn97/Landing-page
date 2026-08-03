"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
  );
}
