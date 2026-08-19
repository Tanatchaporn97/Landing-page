"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const ACCENT = "#5f26e5";

function MenuToggle({ isOpen, toggle, color }: { isOpen: boolean; toggle: () => void; color: string }) {
  return (
    <button type="button" className="hamburger-btn" onClick={toggle}
      style={{ background: "none", border: "none", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", width: "44px", height: "44px", flexShrink: 0, alignItems: "center", justifyContent: "center" }}>
      <svg width="22" height="22" viewBox="0 0 23 23" fill="transparent" stroke={color} strokeWidth="2.2" strokeLinecap="round">
        {isOpen ? (
          <>
            <path d="M 3 16.5 L 17 2.5" />
            <path d="M 3 2.5 L 17 16.346" />
          </>
        ) : (
          <>
            <path d="M 2 2.5 L 20 2.5" />
            <path d="M 2 9.423 L 20 9.423" />
            <path d="M 2 16.346 L 20 16.346" />
          </>
        )}
      </svg>
    </button>
  );
}

export default function Navbar({
  variant = "influencer",
  lang = "th",
}: {
  variant?: "home" | "influencer";
  lang?: "th" | "en";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 40);
    const previous = scrollY.getPrevious() ?? current;
    const diff = current - previous;
    if (Math.abs(diff) > 2) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });

  const hideNav = scrollDirection === "down" && scrolled && !menuOpen;

  const toggleLang = () => {
    const nextLang = lang === "th" ? "en" : "th";
    if (!pathname) return;
    const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);
    router.push(newPath);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const th = { contactUs: "ติดต่อเรา", imInfluencer: "ฉันคืออินฟลูเอนเซอร์", applyNow: "สมัครเลย", applyLine: "สมัครผ่านไลน์", successStories: "เรื่องราวความสำเร็จ", blog: "บทความ" };
  const en = { contactUs: "Contact Us", imInfluencer: "I'm an Influencer", applyNow: "Apply Now", applyLine: "Apply via LINE", successStories: "Success Stories", blog: "Blog" };
  const t = lang === "th" ? th : en;
  const isFaqPage = pathname?.includes("/faq");
  const forceDarkText = scrolled || variant === "influencer" || isFaqPage;

  const itemStyle = { ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" as const, display: "block" };

  return (
    <motion.div
      style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100, pointerEvents: "none" }}
      className="nav-landing-wrap"
      animate={{ y: hideNav ? -120 : 0, opacity: hideNav ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav style={{
        background: forceDarkText ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: forceDarkText ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(255,255,255,0.25)",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        transition: "background 0.3s, border 0.3s",
        pointerEvents: "auto",
      }} className="nav-landing-inner">
        <Link href={`/${lang}`}>
          <Image
            src={forceDarkText ? "/buddy-review-purple-logo.png" : "/buddy-review-logo.png"}
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
                style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: forceDarkText ? "#5f26e5" : undefined }}>
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
                style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: forceDarkText ? "#5f26e5" : undefined }}>
                {t.imInfluencer}
              </Link>
              {/* Desktop hamburger dropdown */}
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="22" height="22" viewBox="0 0 23 23" fill="transparent" stroke={forceDarkText ? "#5f26e5" : "#ffffff"} strokeWidth="2.2" strokeLinecap="round">
                    {dropdownOpen ? (
                      <>
                        <path d="M 3 16.5 L 17 2.5" />
                        <path d="M 3 2.5 L 17 16.346" />
                      </>
                    ) : (
                      <>
                        <path d="M 2 2.5 L 20 2.5" />
                        <path d="M 2 9.423 L 20 9.423" />
                        <path d="M 2 16.346 L 20 16.346" />
                      </>
                    )}
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 16px)", right: 0,
                    background: "rgba(255,255,255,0.18)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.45)", borderRadius: "20px",
                    padding: "8px", minWidth: "220px", boxShadow: "0 8px 32px rgba(95,38,229,0.15)",
                    zIndex: 200,
                  }}>
                    {[
                      { label: t.successStories, href: `/${lang}#success-stories` },
                      { label: t.blog, href: `/${lang}/blog` },
                      { label: t.imInfluencer, href: `/${lang}/influencer` },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setDropdownOpen(false)}
                        style={{ ...KT, display: "block", padding: "12px 16px", fontSize: "15px", fontWeight: 600, color: "#ffffff", textDecoration: "none", borderRadius: "12px", transition: "background 0.15s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#5f26e5"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.3)", margin: "4px 8px" }} />
                    <button onClick={() => { toggleLang(); setDropdownOpen(false); }}
                      style={{ ...KT, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "12px 16px", fontSize: "15px", fontWeight: 600, color: "#ffffff", background: "none", border: "none", cursor: "pointer", borderRadius: "12px", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#5f26e5"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
                    >
                      <span>ภาษา</span>
                      <span style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "8px", padding: "2px 10px", fontSize: "13px" }}>
                        {lang === "th" ? "EN" : "TH"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {variant === "influencer" && (
            <button onClick={toggleLang}
              className="btn-hero px-5 py-3 rounded-full ml-1"
              style={{ ...KT, fontSize: "16px", fontWeight: 600, color: forceDarkText ? "#5f26e5" : undefined }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          )}
        </div>
        {/* Hamburger button — mobile only */}
        <MenuToggle
          isOpen={menuOpen}
          toggle={() => setMenuOpen((o) => !o)}
          color={menuOpen ? "#ffffff" : forceDarkText ? "#5f26e5" : "#ffffff"}
        />
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            marginTop: "10px",
            background: "rgba(15,10,40,0.94)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "24px",
            padding: "20px 24px",
            pointerEvents: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {variant === "influencer" ? (
              <>
                <Link href="https://www.buddyreview.co/app/new-campaigns" onClick={() => setMenuOpen(false)}
                  className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
                  style={itemStyle}>
                  {t.applyNow}
                </Link>
                <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                  className="btn-hero rounded-full whitespace-nowrap"
                  style={{ ...itemStyle, color: "#ffffff" }}>
                  {t.applyLine}
                </a>
              </>
            ) : (
              <>
                <a href={`/${lang}#contact`} onClick={() => setMenuOpen(false)}
                  className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
                  style={itemStyle}>
                  {t.contactUs}
                </a>
                <Link href={`/${lang}/influencer`} onClick={() => setMenuOpen(false)}
                  className="btn-hero rounded-full whitespace-nowrap"
                  style={{ ...itemStyle, color: "#ffffff" }}>
                  {t.imInfluencer}
                </Link>
              </>
            )}
            <button onClick={toggleLang}
              className="btn-hero rounded-full"
              style={{ ...itemStyle, width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", color: "#ffffff" }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
