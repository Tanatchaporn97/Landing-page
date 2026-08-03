"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
        <nav style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: scrolled ? "1px solid rgba(95,38,229,0.15)" : "1px solid rgba(255,255,255,0.25)",
          borderRadius: "100px",
          paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px",
          transition: "background 0.3s, border-color 0.3s",
        }} className="flex items-center justify-between nav-landing">
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
          <div className="desktop-nav-btns flex items-center gap-3">
            <Link href="/#contact"
              className="btn-primary px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
              ติดต่อเรา
            </Link>
            <Link href="/influencer"
              className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", ...(scrolled ? { color: "#5f26e5" } : {}) }}>
              ฉันคืออินฟลูเอนเซอร์
            </Link>
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
            <Link href="/#contact" onClick={() => setMenuOpen(false)}
              className="btn-primary rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
              ติดต่อเรา
            </Link>
            <Link href="/influencer" onClick={() => setMenuOpen(false)}
              className="btn-hero rounded-full whitespace-nowrap"
              style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center", color: "#ffffff" }}>
              ฉันคืออินฟลูเอนเซอร์
            </Link>
          </div>
        )}
      </div>

      {children}

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #ffffff 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="footer-grid">
          <div>
            <Image src="/buddy-review-logo.png" alt="Buddy Review" className="footer-logo-img" width={166} height={58} style={{ height: "58px", width: "auto" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Image src="/award-mt2025.png" alt="MT Award 2025" width={75} height={85} style={{ height: "85px", width: "auto", objectFit: "contain" }} />
          </div>
          <div className="flex flex-col gap-8 footer-contact-col">
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              ติดต่อเรา<br/>
              <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
              <a href="mailto:Info@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
              <a href="mailto:Marketing@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
              <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
              <a href="mailto:Recruit@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
            </p>
            <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              <a href="tel:+66886861676" style={{ color: "#ffffff", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
              <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>Line: @buddysupport</a>
            </p>
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              <a href="/faq?from=influencer" style={{ color: "#ffffff", textDecoration: "none" }}>FAQs</a>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="font-normal text-right footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
              บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
            </p>
          </div>
          <div className="footer-social-row" style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: "/social/FB.png",     name: "Facebook",      href: "https://www.facebook.com/buddyreview" },
              { icon: "/social/IG.png",     name: "Instagram",     href: "https://www.instagram.com/buddyreview_th/" },
              { icon: "/social/TT.png",     name: "TikTok",        href: "https://www.tiktok.com/@buddyreview.th?_t=ZS-8t3L41XuOX4&_r=1" },
              { icon: "/social/Line.png",   name: "Line Official", href: "https://line.me/R/ti/p/@buddysupport" },
              { icon: "/social/YT.png",     name: "YouTube",       href: "https://www.youtube.com/@buddyreview7134" },
              { icon: "/social/Linkin.png", name: "LinkedIn",      href: "https://th.linkedin.com/company/buddy-review" },
              { icon: "/social/Lemon8.png", name: "Lemon8",        href: "https://s.lemon8-app.com/s/GgNUhrhUMR" },
            ].map((s) => (
              <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer"
                style={{ position: "relative", width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src={s.icon} alt={s.name} fill sizes="31px" style={{ objectFit: "contain" }} />
              </a>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="font-normal text-right footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#ffffff" }}>
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
              &nbsp;|&nbsp;
              <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "underline" }}>ข้อตกลงการใช้งาน</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
