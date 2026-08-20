"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

function MenuToggle({ isOpen, toggle, color }: { isOpen: boolean; toggle: () => void; color: string }) {
  return (
    <button type="button" className="hamburger-btn" onClick={toggle}
      style={{ background: "none", border: "none", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", width: "44px", height: "44px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
  const pathname = usePathname();
  const router = useRouter();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 40);
    const previous = scrollY.getPrevious() ?? current;
    const diff = current - previous;
    if (Math.abs(diff) > 2) setScrollDirection(diff > 0 ? "down" : "up");
  });

  const hideNav = scrollDirection === "down" && scrolled && !menuOpen;

  const toggleLang = () => {
    const nextLang = lang === "th" ? "en" : "th";
    if (!pathname) return;
    router.push(pathname.replace(`/${lang}`, `/${nextLang}`));
    setMenuOpen(false);
  };

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const th = { contactUs: "ติดต่อเรา", imInfluencer: "ฉันคืออินฟลูเอนเซอร์", applyNow: "สมัครเลย", applyLine: "สมัครผ่านไลน์", successStories: "เรื่องราวความสำเร็จ", blog: "บทความ" };
  const en = { contactUs: "Contact Us", imInfluencer: "I'm an Influencer", applyNow: "Apply Now", applyLine: "Apply via LINE", successStories: "Success Stories", blog: "Blog" };
  const t = lang === "th" ? th : en;
  const isFaqPage = pathname?.includes("/faq");
  const forceDarkText = scrolled || variant === "influencer" || isFaqPage;

  const navLinks = variant === "influencer"
    ? [
        { label: t.applyNow, href: "https://www.buddyreview.co/app/new-campaigns" },
        { label: t.applyLine, href: "https://line.me/ti/p/~@buddyreview" },
      ]
    : [
        { label: t.contactUs, href: `/${lang}#contact` },
        { label: t.successStories, href: `/${lang}/success` },
        { label: t.blog, href: `/${lang}/blog` },
        { label: t.imInfluencer, href: `/${lang}/influencer` },
      ];

  return (
    <>
      {/* ── Expanding circle background ── */}
      <div
        className="nav-circle-bg"
        style={{
          position: "fixed",
          height: "3rem",
          width: "3rem",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #5f26e5 0%, #ff0089 100%)",
          zIndex: 298,
          transform: menuOpen ? "scale(80)" : "scale(0)",
          transition: "transform 800ms cubic-bezier(0.86, 0, 0.07, 1)",
        }}
      />

      {/* ── Full-screen nav overlay ── */}
      <div
        className="nav-full-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          zIndex: 299,
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: menuOpen
            ? "opacity 400ms 400ms, visibility 0s"
            : "opacity 300ms, visibility 0s 300ms",
        }}
      >
        <ul style={{ listStyle: "none", padding: "0 24px", margin: 0, textAlign: "center", width: "100%" }}>
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ margin: "0.4rem 0" }}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...KT,
                  display: "inline-block",
                  padding: "0.8rem 2rem",
                  color: "#ffffff",
                  fontSize: "clamp(22px, 5vw, 48px)",
                  fontWeight: 700,
                  textDecoration: "none",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.04em",
                  transition: "color 200ms, transform 200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                <span style={{ marginRight: "1rem", color: "rgba(255,255,255,0.4)", fontSize: "0.55em", verticalAlign: "middle", fontWeight: 400 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle */}
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={toggleLang}
            style={{
              ...KT,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "50px",
              padding: "10px 36px",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.12em",
            }}
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
      </div>

      {/* ── Navbar ── */}
      <motion.div
        style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: menuOpen ? 300 : 100, pointerEvents: "none" }}
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

          {/* Desktop CTA buttons */}
          <div className="desktop-nav-btns flex items-center gap-3">
            {variant === "influencer" ? (
              <>
                <Link href="https://www.buddyreview.co/app/new-campaigns"
                  className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
                  style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
                  {t.applyNow}
                </Link>
                <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer"
                  className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
                  style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: forceDarkText ? "#5f26e5" : undefined }}>
                  {t.applyLine}
                </a>
                <button onClick={toggleLang}
                  className="btn-hero px-5 py-3 rounded-full"
                  style={{ ...KT, fontSize: "16px", fontWeight: 600, color: forceDarkText ? "#5f26e5" : undefined }}>
                  {lang === "th" ? "EN" : "TH"}
                </button>
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
              </>
            )}
          </div>

          {/* Hamburger — all screen sizes */}
          <MenuToggle
            isOpen={menuOpen}
            toggle={() => setMenuOpen((o) => !o)}
            color={menuOpen ? "#ffffff" : forceDarkText ? "#5f26e5" : "#ffffff"}
          />
        </nav>
      </motion.div>
    </>
  );
}
