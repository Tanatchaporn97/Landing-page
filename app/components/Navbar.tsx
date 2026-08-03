"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "100px",
      position: "fixed", top: "20px", left: "40px", right: "40px",
      zIndex: 100,
      paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img
          src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"}
          alt="Buddy Review"
          style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }}
        />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
    </nav>
  );
}
