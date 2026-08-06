"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "../../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function BlogNavbar({ lang = "th" }: { lang?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = lang === "th"
    ? { contactUs: "ติดต่อเรา", imInfluencer: "ฉันคืออินฟลูเอนเซอร์" }
    : { contactUs: "Contact Us", imInfluencer: "I'm an Influencer" };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
      <nav style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px" }}
        className="flex items-center justify-between nav-landing">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <Image src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"} alt="Buddy Review" className="nav-logo" width={138} height={48} style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }} />
        </Link>
        <div className="desktop-nav-btns flex items-center gap-3">
          <a href={`/${lang}#contact`}
            className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
            {t.contactUs}
          </a>
          <Link href={`/${lang}/influencer`}
            className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", ...(scrolled ? { color: "#5f26e5" } : {}) }}>
            {t.imInfluencer}
          </Link>
          <button onClick={() => {
            if (!pathname) return;
            const nextLang = lang === "th" ? "en" : "th";
            router.push(pathname.replace(`/${lang}`, `/${nextLang}`));
          }}
            className="btn-hero px-5 py-3 rounded-full ml-1"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, ...(scrolled ? { color: "#5f26e5" } : {}) }}>
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
        <div style={{ marginTop: "10px", background: "rgba(15,10,40,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "24px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <a href={`/${lang}#contact`} onClick={() => setMenuOpen(false)}
            className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
            {t.contactUs}
          </a>
          <Link href={`/${lang}/influencer`} onClick={() => setMenuOpen(false)}
            className="btn-hero rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center", color: "#ffffff" }}>
            {t.imInfluencer}
          </Link>
          <button onClick={() => {
            setMenuOpen(false);
            if (!pathname) return;
            const nextLang = lang === "th" ? "en" : "th";
            router.push(pathname.replace(`/${lang}`, `/${nextLang}`));
          }}
            className="btn-hero rounded-full"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", color: "#ffffff" }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
      )}
    </div>
  );
}
