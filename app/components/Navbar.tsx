"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, stagger, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const ACCENT = "#5f26e5";

const navListVariants: Variants = {
  open: { transition: { delayChildren: stagger(0.07, { startDelay: 0.15 }) } },
  closed: { transition: { delayChildren: stagger(0.05, { from: "last" }) } },
};

const itemVariants: Variants = {
  open: { y: 0, opacity: 1, transition: { y: { type: "spring", stiffness: 1000, velocity: -100 } } },
  closed: { y: 24, opacity: 0, transition: { y: { type: "spring", stiffness: 1000 } } },
};

const panelVariants: Variants = {
  open: (radius: number) => ({
    clipPath: `circle(${radius}px at calc(100% - 28px) 0px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 28px) 0px)",
    transition: { delay: 0.15, type: "spring", stiffness: 400, damping: 40 },
  },
};

function usePanelRadius(ref: React.RefObject<HTMLDivElement | null>) {
  const [radius, setRadius] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      setRadius(Math.hypot(width, height) + 40);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return radius;
}

function MenuToggle({ isOpen, toggle, color }: { isOpen: boolean; toggle: () => void; color: string }) {
  const pathProps = { fill: "transparent", strokeWidth: "2.2", stroke: color, strokeLinecap: "round" as const };
  return (
    <button type="button" className="hamburger-btn" onClick={toggle}
      style={{ background: "none", border: "none", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", width: "44px", height: "44px", flexShrink: 0, alignItems: "center", justifyContent: "center" }}>
      <svg width="22" height="22" viewBox="0 0 23 23">
        <motion.path
          {...pathProps}
          animate={isOpen ? "open" : "closed"}
          variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" } }}
        />
        <motion.path
          {...pathProps}
          d="M 2 9.423 L 20 9.423"
          animate={isOpen ? "open" : "closed"}
          variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          {...pathProps}
          animate={isOpen ? "open" : "closed"}
          variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346" } }}
        />
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
  const panelRef = useRef<HTMLDivElement>(null);
  const radius = usePanelRadius(panelRef);

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

  const th = { contactUs: "ติดต่อเรา", imInfluencer: "ฉันคืออินฟลูเอนเซอร์", applyNow: "สมัครเลย", applyLine: "สมัครผ่านไลน์" };
  const en = { contactUs: "Contact Us", imInfluencer: "I'm an Influencer", applyNow: "Apply Now", applyLine: "Apply via LINE" };
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
            </>
          )}
          <button onClick={toggleLang}
            className="btn-hero px-5 py-3 rounded-full ml-1"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, color: forceDarkText ? "#5f26e5" : undefined }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
        {/* Hamburger button — mobile only */}
        <MenuToggle
          isOpen={menuOpen}
          toggle={() => setMenuOpen((o) => !o)}
          color={menuOpen ? "#ffffff" : forceDarkText ? "#5f26e5" : "#ffffff"}
        />
      </nav>

      {/* Mobile circle-reveal menu */}
      <motion.div
        ref={panelRef}
        custom={radius}
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={panelVariants}
        style={{
          marginTop: "10px",
          background: "rgba(15,10,40,0.94)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "24px",
          padding: "20px 24px",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <motion.div
          variants={navListVariants}
          animate={menuOpen ? "open" : "closed"}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {variant === "influencer" ? (
            <>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="https://www.buddyreview.co/app/new-campaigns" onClick={() => setMenuOpen(false)}
                  className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
                  style={itemStyle}>
                  {t.applyNow}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                  className="btn-hero rounded-full whitespace-nowrap"
                  style={{ ...itemStyle, color: "#ffffff" }}>
                  {t.applyLine}
                </a>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href={`/${lang}#contact`} onClick={() => setMenuOpen(false)}
                  className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
                  style={itemStyle}>
                  {t.contactUs}
                </a>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/${lang}/influencer`} onClick={() => setMenuOpen(false)}
                  className="btn-hero rounded-full whitespace-nowrap"
                  style={{ ...itemStyle, color: "#ffffff" }}>
                  {t.imInfluencer}
                </Link>
              </motion.div>
            </>
          )}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={toggleLang}
              className="btn-hero rounded-full"
              style={{ ...itemStyle, width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", color: "#ffffff" }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
