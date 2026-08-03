"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function Navbar({
  variant = "influencer",
  lang = "th",
}: {
  variant?: "home" | "influencer";
  lang?: "th" | "en";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(currentScrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also try listening on document body just in case it's the scroll container
    document.body.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleLang = () => {
    const nextLang = lang === "th" ? "en" : "th";
    if (!pathname) return;
    const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);
    router.push(newPath);
    setMenuOpen(false);
  };

  const th = { contactUs: "ติดต่อเรา", imInfluencer: "ฉันคืออินฟลูเอนเซอร์", applyNow: "สมัครเลย", applyLine: "สมัครผ่านไลน์" };
  const en = { contactUs: "Contact Us", imInfluencer: "I'm an Influencer", applyNow: "Apply Now", applyLine: "Apply via LINE" };
  const t = lang === "th" ? th : en;

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
        <Link href={`/${lang}`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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
          {variant === "influencer" ? (
            <>
              <Link href="https://www.buddyreview.co/app/new-campaigns"
                className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
                style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
                {t.applyNow}
              </Link>
              <a href="https://line.me/ti/p/~@buddyreview"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
                style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: "#5f26e5" }}>
                {t.applyLine}
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
          <button onClick={toggleLang}
            className="btn-hero px-5 py-3 rounded-full ml-1"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, ...(variant === "influencer" || scrolled ? { color: "#5f26e5" } : {}) }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
        {/* Hamburger button — mobile only */}
        <button type="button" className="hamburger-btn" onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", width: "44px", height: "44px", flexShrink: 0, flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}>
          <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: variant === "home" && !scrolled ? "#ffffff" : "#5f26e5", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}) }} />
          <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: variant === "home" && !scrolled ? "#ffffff" : "#5f26e5", borderRadius: "2px", transition: "opacity 0.25s", ...(menuOpen ? { opacity: 0 } : {}) }} />
          <span className="hamburger-bar" style={{ display: "block", width: "22px", height: "2px", background: variant === "home" && !scrolled ? "#ffffff" : "#5f26e5", borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", ...(menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}) }} />
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
          {variant === "influencer" ? (
            <>
              <Link href="https://www.buddyreview.co/app/new-campaigns" onClick={() => setMenuOpen(false)}
                className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
                style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
                {t.applyNow}
              </Link>
              <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                className="btn-hero rounded-full whitespace-nowrap"
                style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center", color: "#ffffff" }}>
                {t.applyLine}
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
          <button onClick={toggleLang}
            className="btn-hero rounded-full"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", color: "#ffffff" }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
      )}
    </div>
  );
}
