"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <nav style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: scrolled ? "1px solid rgba(95,38,229,0.15)" : "1px solid rgba(255,255,255,0.25)",
        borderRadius: "100px",
        position: "fixed", top: "20px", left: "40px", right: "40px",
        zIndex: 100,
        paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={scrolled ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"}
            alt="Buddy Review"
            style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
      </nav>

      {children}

      {/* ── Footer ── */}
      <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #ffffff 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10"
          style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Left column */}
          <div className="flex flex-col gap-8" style={{ maxWidth: "515px" }}>
            <div>
              <img src="/buddy-review-logo.png" alt="Buddy Review" style={{ height: "58px", width: "auto" }} />
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
                  ติดต่อเรา<br/>
                  <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
                  <a href="mailto:Info@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
                  <a href="mailto:Marketing@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
                  <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
                  <a href="mailto:Recruit@buddyreview.co" style={{ color: "#ffffff", textDecoration: "underline" }}>Recruit@buddyreview.co</a>
                </p>
              </div>
              <p className="font-normal" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
                <a href="tel:+66886861676" style={{ color: "#ffffff", textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
                <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>Line: @buddysupport</a>
              </p>
              <p className="font-medium" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>FAQs</p>
            </div>
            <div>
              <div style={{ display: "flex", gap: "12px" }}>
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
                    style={{ width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={s.icon} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-end justify-between gap-10" style={{ minWidth: "340px" }}>
            <div className="flex items-center gap-4">
              <img src="/award-mt2025.png" alt="MT Award 2025" style={{ height: "85px", width: "auto", objectFit: "contain" }} />
            </div>
            <div className="flex flex-col items-end gap-4">
              <p className="font-normal text-right" style={{ ...KT, fontSize: "16px", lineHeight: "160%", maxWidth: "453px", color: "#ffffff" }}>
                บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
              </p>
            </div>
            <p className="font-normal text-right" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#ffffff" }}>
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
