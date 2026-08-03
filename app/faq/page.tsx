"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const SOCIAL = [
  { icon: "/social/FB.png",     name: "Facebook",      href: "https://www.facebook.com/buddyreview" },
  { icon: "/social/IG.png",     name: "Instagram",     href: "https://www.instagram.com/buddyreview_th/" },
  { icon: "/social/TT.png",     name: "TikTok",        href: "https://www.tiktok.com/@buddyreview.th?_t=ZS-8t3L41XuOX4&_r=1" },
  { icon: "/social/Line.png",   name: "Line Official", href: "https://line.me/R/ti/p/@buddysupport" },
  { icon: "/social/YT.png",     name: "YouTube",       href: "https://www.youtube.com/@buddyreview7134" },
  { icon: "/social/Linkin.png", name: "LinkedIn",      href: "https://th.linkedin.com/company/buddy-review" },
  { icon: "/social/Lemon8.png", name: "Lemon8",        href: "https://s.lemon8-app.com/s/GgNUhrhUMR" },
];

const FAQS_BRAND = [
  { q: "Buddy Review ให้บริการอะไรบ้าง", a: "เราให้บริการทำ Influencer Marketing แบบครบวงจร ตั้งแต่การวางกลยุทธ์ เลือกอินฟลูเอนเซอร์ที่เหมาะสม ติดต่อประสานงาน ตรวจสอบงาน และวัดผลสัมฤทธิ์แคมเปญ" },
  { q: "บริการของเราดีกว่าทำเองยังไง?", a: "การใช้บริการของเราช่วยให้คุณประหยัดเวลาและลดความยุ่งยากในการค้นหา คัดเลือก เจรจา และบริหารจัดการอินฟลูเอนเซอร์จำนวนมาก เรามีเครื่องมือและฐานข้อมูลที่แม่นยำ รวมถึงทีมงานมืออาชีพที่ดูแลให้คุณครบทุกขั้นตอน ตั้งแต่การวางแผนไปจนถึงการวัดผล ทำให้คุณมั่นใจได้ว่าจะได้อินฟลูเอนเซอร์ที่เหมาะสมและแคมเปญที่มีประสิทธิภาพสูงสุด" },
  { q: "คิดค่าบริการอย่างไร?", a: "ค่าบริการขึ้นกับขนาดแคมเปญ จำนวนอินฟลูเอนเซอร์ และบริการที่คุณต้องการ โดยเรามีขั้นต่ำในการทำแคมเปญอยู่ที่ 100,000 บาทต่อแคมเปญ" },
  { q: "ต้องเตรียมอะไรบ้างก่อนเริ่มแคมเปญ?", a: "แจ้งวัตถุประสงค์แคมเปญ งบประมาณ กลุ่มเป้าหมาย และรายละเอียดสินค้า/บริการ ส่วนที่เหลือเราจะดูแลให้ทั้งหมด" },
  { q: "ใช้อะไรในการคัดเลือกอินฟลูเอนเซอร์?", a: "เราใช้ระบบวิเคราะห์ข้อมูลเชิงลึก (Data-Driven Matching) ที่สามารถดูได้ทั้ง Demographic, Engagement, Unique Follower Overlap และประวัติการทำแคมเปญ เพื่อคัดเลือกอินฟลูเอนเซอร์ตรงกับเป้าหมายของแบรนด์และแมทช์กับกลุ่มผู้ติดตามของอินฟลูเอนเซอร์มากที่สุด" },
  { q: "สามารถขอรีพอร์ตเมื่อจบแคมเปญได้หรือไม่?", a: "คุณจะได้รับรายงานผลแคมเปญที่ครอบคลุม เช่น ยอด Reach, Engagement, ROI, อินฟลูเอนเซอร์ที่ทำผลงานดีสุด และข้อมูลเชิงลึกสำหรับพัฒนาในการทำแคมเปญถัดไป" },
  { q: "สามารถเลือกอินฟลูเอนเซอร์เองได้ไหม?", a: "หากคุณมีอินฟลูเอนเซอร์ที่สนใจเป็นพิเศษ สามารถให้เราติดต่อหรือแนะนำอินฟลูเอนเซอร์ที่คล้ายคลึงกันได้ โดยเราจะเป็นคนติดต่อให้กับคุณเองทั้งหมด" },
  { q: "แคมเปญสามารถลงได้บนแพลตฟอร์มไหนบ้าง?", a: "เรารองรับทุกแพลตฟอร์มหลัก เช่น Instagram, Facebook, TikTok, YouTube, X (Twitter), และ Lemon8 โดยเราสามารถแนะนำความเหมาะสมกับกลุ่มเป้าหมาย คอนเทนต์และจุดประสงค์แคมเปญ" },
];

const FAQS_INFLUENCER = [
  { q: "สมัครแล้วจะได้งานทันทีไหม?", a: "หลังจากสมัครเรียบร้อย ระบบจะพิจารณาความเหมาะสมของแคมเปญที่เข้ามา หากมีแคมเปญที่ตรงกับโปรไฟล์ของคุณ ระบบจะแจ้งเตือนเพื่อให้คุณเข้าร่วมได้ทันที" },
  { q: "ทำไมสมัครแล้วไม่มีงาน?", a: "งานแต่ละแคมเปญขึ้นอยู่กับกลุ่มเป้าหมายของแบรนด์ หากยังไม่มีงาน แนะนำให้คุณอัปเดตโปรไฟล์และเพิ่มช่องทางโซเชียลให้ครบถ้วน เพื่อเพิ่มโอกาสถูกจับคู่กับแคมเปญที่เหมาะสม" },
  { q: "ต้องเชื่อมบัญชีโซเชียลมีเดียหรือไม่?", a: "แนะนำให้เชื่อมบัญชีโซเชียลให้ครบเพื่อให้ระบบสามารถดึงสถิติ เพื่อจับคู่แคมเปญที่เหมาะสมได้อัตโนมัติ หากพบปัญหาในการเชื่อมต่อบัญชี สามารถติดต่อได้ที่ LINE @buddysupport" },
  { q: "ค่าตอบแทนจ่ายเมื่อไหร่?", a: "ระบบจะจ่ายค่าตอบแทนเป็นระบบแต้ม โดย 10 แต้ม = 1 บาท โดยนักรีวิวต้องทำการถอนเงินด้วยตัวเองพร้อมยื่นเอกสารในการถอนเงิน เปิดให้แลกเงินในช่วงต้นของเดือน และโอนเงินให้ระหว่างวันที่ 15–20 ของเดือนถัดไป (หลังจากตรวจสอบเอกสารเรียบร้อย)" },
  { q: "ทำไมมีแจ้งเตือนแล้ว เงินยังไม่เข้า?", a: "ก่อนที่เงินจะเข้าบัญชีธนาคารจริง จะมีการแจ้งเตือนล่วงหน้าจากธนาคาร ว่ากำลังจะมีเงินเข้า ซึ่งอาจทำให้เข้าใจว่าได้รับเงินแล้ว แต่เงินจะถูกโอนตามวันและเวลาที่ธนาคารได้ระบุในข้อความ" },
  { q: "ต้องใช้เอกสารอะไรในการรับเงิน?", a: "ใช้สำเนาบัตรประชาชน เลขบัญชีธนาคาร และสำเนาบัญชีธนาคารเพื่อใช้ในการเบิกถอนเงิน" },
  { q: "มีค่าธรรมเนียมการแลกเงินหรือไม่?", a: "มีค่าธรรมเนียมในการโอนเงิน 8 บาทต่อครั้ง และจำเป็นต้องแลกแต้มขึ้นต่ำ 2,000 แต้มขึ้นไป (200 บาท) ตัวอย่าง: สมมติว่ามี 2,500 แต้ม ซึ่งเท่ากับ 250 บาท เมื่อต้องการแลกเงิน ระบบจะหักค่าธรรมเนียมในการโอนเงิน 8 บาท ดังนั้นคุณจะได้รับเงินเข้าบัญชีทั้งสิ้น 242 บาท" },
  { q: "ลืมอีเมลหรือเข้าระบบไม่ได้ ต้องทำยังไง?", a: "ติดต่อทีมซัพพอร์ตได้ทาง LINE: @buddysupport โดยแจ้งชื่อบัญชี เพื่อให้ทีมงานตรวจสอบและทำการรีเซ็ตรหัสผ่าน" },
];

const CATEGORIES = [
  { key: "brand", label: "สำหรับแบรนด์", faqs: FAQS_BRAND },
  { key: "influencer", label: "สำหรับอินฟลูเอนเซอร์", faqs: FAQS_INFLUENCER },
];

function FaqAccordion({ faqs }: { faqs: typeof FAQS_BRAND }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {faqs.map((item, i) => (
        <div key={i} style={{ background: open === i ? "#5f26e5" : "#ffffff", border: open === i ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: "16px", overflow: "hidden", boxShadow: open === i ? "0 8px 32px rgba(95,38,229,0.2)" : "0 2px 12px rgba(0,0,0,0.04)", transition: "background 0.25s" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ ...KT, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", textAlign: "left" }}>
            <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: open === i ? "#ffffff" : "#111827", lineHeight: 1.5 }}>{item.q}</span>
            <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", background: open === i ? "#ffffff" : "rgba(95,38,229,0.12)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease", transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>
          {open === i && <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

function SharedFooter({ textColor, gradientEnd }: { textColor: string; gradientEnd: string }) {
  return (
    <footer className="px-6" style={{ backgroundImage: `url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, ${gradientEnd} 100%)`, backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Flat 6-item grid: 2-col desktop, 1-col mobile (order: Logo,Award,Contact,Address,Social,Legal) */}
      <div className="footer-grid">

        {/* 1 — Logo */}
        <div>
          <img src="/buddy-review-logo.png" alt="Buddy Review" className="footer-logo-img" style={{ height: "58px", width: "auto" }} />
        </div>

        {/* 2 — Award */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img src="/award-mt2025.png" alt="MT Award 2025" style={{ height: "85px", width: "auto", objectFit: "contain" }} />
        </div>

        {/* 3 — Contact info */}
        <div className="flex flex-col gap-8 footer-contact-col">
          <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}>
            ติดต่อเรา<br/>
            <span style={{ fontWeight: 400 }}>General Inquiries:</span>{" "}
            <a href="mailto:Info@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
            <span style={{ fontWeight: 400 }}>Marketing Inquiries:</span>{" "}
            <a href="mailto:Marketing@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
            <span style={{ fontWeight: 400 }}>Careers:</span>{" "}
            <a href="mailto:Recruit@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Recruit@buddyreview.co</a>
          </p>
          <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}>
            <a href="tel:+66886861676" style={{ color: textColor, textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
            <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: "none" }}>Line: @buddysupport</a>
          </p>
          <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}><a href="/faq?from=influencer" style={{ color: textColor, textDecoration: "none" }}>FAQs</a></p>
        </div>

        {/* 4 — Address */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="font-normal text-right footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}>
            บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
          </p>
        </div>

        {/* 5 — Social icons */}
        <div className="footer-social-row" style={{ display: "flex", gap: "12px" }}>
          {SOCIAL.map(s => (
            <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer" style={{ width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <img src={s.icon} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </a>
          ))}
        </div>

        {/* 6 — Legal */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="font-normal text-right footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: textColor }}>
            <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
            &nbsp;|&nbsp;
            <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: "underline" }}>ข้อตกลงการใช้งาน</a>
          </p>
        </div>

      </div>
    </footer>
  );
}

function LandingNavbar() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
      <nav style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px" }}
        className="flex items-center justify-between nav-landing">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <img src="/buddy-review-purple-logo.png" alt="Buddy Review" className="nav-logo" style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }} />
        </Link>
        <div className="desktop-nav-btns flex items-center gap-3">
          <a href="/#contact"
            className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
            ติดต่อเรา
          </a>
          <Link href="/influencer"
            className="btn-hero px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none", color: "#5f26e5" }}>
            ฉันคืออินฟลูเอนเซอร์
          </Link>
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
        <div style={{ marginTop: "10px", background: "rgba(15,10,40,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "24px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <a href="/#contact" onClick={() => setMenuOpen(false)}
            className="btn-hero btn-hero-solid-purple rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center" }}>
            ติดต่อเรา
          </a>
          <Link href="/influencer" onClick={() => setMenuOpen(false)}
            className="btn-hero rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "15px", fontWeight: 600, textDecoration: "none", padding: "12px 20px", textAlign: "center", color: "#ffffff" }}>
            ฉันคืออินฟลูเอนเซอร์
          </Link>
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

function InfluencerNavbar() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ position: "fixed", top: "20px", left: "40px", right: "40px", zIndex: 100 }} className="nav-landing-wrap">
      <nav style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", paddingLeft: "36px", paddingRight: "36px", paddingTop: "16px", paddingBottom: "16px" }}
        className="flex items-center justify-between nav-landing">
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/buddy-review-purple-logo.png" alt="Buddy Review" className="nav-logo" style={{ height: "48px", width: "auto", transition: "opacity 0.3s" }} />
        </Link>
        <div className="desktop-nav-btns flex items-center gap-3">
          <Link href="https://www.buddyreview.co/app/new-campaigns"
            className="btn-hero btn-hero-solid-purple px-6 py-3 rounded-full whitespace-nowrap"
            style={{ ...KT, fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
            สมัครเลย
          </Link>
          <a href="https://line.me/ti/p/~@buddyreview" target="_blank" rel="noopener noreferrer"
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
        <div style={{ marginTop: "10px", background: "rgba(15,10,40,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "24px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
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

function FaqPageContent() {
  const searchParams = useSearchParams();
  const fromInfluencer = searchParams.get("from") === "influencer";
  const [activeTab, setActiveTab] = useState(fromInfluencer ? "influencer" : "brand");
  const active = CATEGORIES.find(c => c.key === activeTab)!;
  const textColor = fromInfluencer ? "#F0E8FF" : "#ffffff";
  const gradientEnd = fromInfluencer ? "#F0E8FF" : "#ffffff";
  const contactHref = fromInfluencer ? "/influencer#contact" : "/#contact";

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/light-purple-gradient-bg-3.jpg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "top center", overflowX: "hidden" }}>
      {fromInfluencer ? <InfluencerNavbar /> : <LandingNavbar />}

      {/* Hero */}
      <section className="faq-hero-section" style={{ padding: "160px 48px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 className="section-title text-center font-bold"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 20px" }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>FAQs</span>
          </h1>
          <p className="desc-text" style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อทีมงานของเราได้ตลอดเวลา
          </p>
        </div>
      </section>

      {/* Category tabs + accordions */}
      <section className="faq-tabs-section" style={{ padding: "0 48px 80px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <div className="faq-tabs-row" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "56px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setActiveTab(cat.key)}
                className="faq-tab-btn"
                style={{ ...KT, fontSize: "16px", fontWeight: 600, borderRadius: "50px", padding: "12px 36px", border: "none", cursor: "pointer", transition: "background 0.25s, color 0.25s", background: activeTab === cat.key ? "#5f26e5" : "rgba(255,255,255,0.7)", color: activeTab === cat.key ? "#ffffff" : "#374151", boxShadow: activeTab === cat.key ? "0 4px 20px rgba(95,38,229,0.25)" : "0 2px 8px rgba(0,0,0,0.06)" }}>
                {cat.label}
              </button>
            ))}
          </div>
          <FaqAccordion faqs={active.faqs} />
        </div>
      </section>

      {/* มีคำถามเพิ่มเติมไหม? */}
      <section className="faq-cta-section" style={{ padding: "60px 48px 100px", textAlign: "center" }}>
        <h2 style={{ ...KT, fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 800, color: "#111827", margin: "0 0 24px" }}>
          มีคำถามเพิ่มเติมไหม?
        </h2>
        <Link href={contactHref}
          className="btn-hero-solid-purple faq-cta-btn"
          style={{ ...KT, display: "inline-flex", alignItems: "center", borderRadius: "50px", padding: "14px 48px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
          ติดต่อเรา
        </Link>
      </section>

      <SharedFooter textColor={textColor} gradientEnd={gradientEnd} />
    </div>
  );
}

export default function FaqPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <FaqPageContent />
    </Suspense>
  );
}
