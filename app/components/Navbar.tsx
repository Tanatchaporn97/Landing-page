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
        { label: t.successStories, href: `/${lang}/success` },
        { label: t.blog, href: `/${lang}/blog` },
        { label: t.applyNow, href: "https://www.buddyreview.co/app/new-campaigns" },
        { label: t.applyLine, href: "https://line.me/ti/p/~@buddyreview" },
        { label: t.contactUs, href: `/${lang}#contact` },
      ]
    : [
        { label: t.successStories, href: `/${lang}/success` },
        { label: t.blog, href: `/${lang}/blog` },
        { label: t.imInfluencer, href: `/${lang}/influencer` },
        { label: t.contactUs, href: `/${lang}#contact` },
      ];

  return (
    <>
      {/* ── Fullscreen overlay (CodingNepal style) ── */}
      <div
        className="nav-overlay-wrapper"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 299,
          background: `
          radial-gradient(ellipse 70% 70% at top right, rgba(255,200,225,.75) 0%, rgba(255,210,232,.45) 35%, transparent 70%),
          radial-gradient(ellipse 75% 75% at bottom left, rgba(188,165,255,.75) 0%, rgba(205,186,255,.45) 35%, transparent 72%),
          linear-gradient(135deg, #d9c5ff 0%, #ecd7f9 45%, #f7d5ea 100%)
        `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity 0.4s ease, visibility 0.4s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "center" }}>
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ margin: "0.55rem 0" }}>
              <a href={link.href} onClick={() => setMenuOpen(false)} className="nav-overlay-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "2.5rem" }}>
          <button
            onClick={toggleLang}
            style={{
              ...KT,
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(95,38,229,0.25)",
              borderRadius: "50px",
              padding: "10px 36px",
              color: "#5f26e5",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.12em",
              transition: "background 0.25s",
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

          {/* Right-side group: CTA buttons + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

            <MenuToggle
              isOpen={menuOpen}
              toggle={() => setMenuOpen((o) => !o)}
              color={menuOpen ? "#5f26e5" : forceDarkText ? "#5f26e5" : "#ffffff"}
            />
          </div>
        </nav>
      </motion.div>
    </>
  );
}
