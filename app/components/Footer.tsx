import Image from "next/image";
import Link from "next/link";

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

export default function Footer({ variant = "influencer", lang = "th", dict }: { variant?: "home" | "influencer", lang?: "th" | "en", dict?: any }) {
  const textColor = variant === "home" ? "#ffffff" : "#F0E8FF";

  const t = lang === "th"
    ? { quickLinks: "เมนูลัด", home: "หน้าหลัก", successStories: "Success Stories", industryInsights: "Industry Insights", faqs: "FAQs", imInfluencer: "สำหรับอินฟลูเอนเซอร์", imBrand: "ฉันคือแบรนด์" }
    : { quickLinks: "Quick Links", home: "Home", successStories: "Success Stories", industryInsights: "Industry Insights", faqs: "FAQs", imInfluencer: "I'm an Influencer", imBrand: "I'm a Brand" };

  const faqHref = `/${lang}/faq${variant === "influencer" ? "?from=influencer" : ""}`;

  const QUICK_LINKS = [
    { label: t.home, href: `/${lang}` },
    { label: t.successStories, href: `/${lang}/success` },
    { label: t.industryInsights, href: `/${lang}/blog` },
    { label: t.faqs, href: faqHref },
    { label: t.imBrand, href: `/${lang}/brand` },
    { label: t.imInfluencer, href: `/${lang}/influencer` },
  ];

  return (
    <footer className="px-6 footer-bg" style={{ borderTop: "none", paddingTop: "80px", paddingBottom: "48px" }}>
      {/* 3-column layout: Logo/Company/Social — Quick Links — Contact */}
      <div className="footer-grid-3col" style={{ position: "relative", zIndex: 2 }}>

        {/* Left — Logo, company details, social icons */}
        <div className="footer-col footer-col-left">
          <Image src="/buddy-review-logo.png" alt="Buddy Review" className="footer-logo-img" width={166} height={58} loading="eager" style={{ height: "58px", width: "auto" }} />
          <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor, marginTop: "24px" }}>
            {dict?.footer?.address1 || "บริษัท บับเบิลลี จำกัด"}<br/>{dict?.footer?.address2 || "1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603"}<br/>{dict?.footer?.address3 || "ชั้น 6, ถนนวิภาวดีรังสิต,"}<br/>{dict?.footer?.address4 || "แขวงจตุจักร กรุงเทพฯ 10900"}
          </p>
          <div className="footer-social-row" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer"
                style={{ position: "relative", width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src={s.icon} alt={s.name} fill sizes="31px" loading="eager" style={{ objectFit: "contain" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Center — Quick links */}
        <div className="footer-col footer-col-center">
          <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor, marginBottom: "20px" }}>
            {t.quickLinks}
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {QUICK_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor, textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right — Contact details */}
        <div className="flex flex-col gap-8 footer-contact-col">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }} className="footer-award-row">
            <Image src="/award-mt2025.png" alt="MT Award 2025" width={75} height={85} loading="eager" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
            <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor, margin: 0 }}>
              {dict?.footer?.contact || "ติดต่อเรา"}
            </p>
          </div>
          <p className="font-medium footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}>
            <span style={{ fontWeight: 400 }}>{dict?.footer?.generalInquiries || "General Inquiries"}:</span>{" "}
            <a href="mailto:Info@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Info@buddyreview.co</a><br/>
            <span style={{ fontWeight: 400 }}>{dict?.footer?.marketingInquiries || "Marketing Inquiries"}:</span>{" "}
            <a href="mailto:Marketing@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Marketing@buddyreview.co</a><br/>
            <span style={{ fontWeight: 400 }}>{dict?.footer?.careers || "Careers"}:</span>{" "}
            <a href="mailto:Recruit@buddyreview.co" style={{ color: textColor, textDecoration: "underline" }}>Recruit@buddyreview.co</a>
          </p>
          <p className="font-normal footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: textColor }}>
            <a href="tel:+66886861676" style={{ color: textColor, textDecoration: "none" }}>Tel.: 088-686-1676</a><br/>
            <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: "none" }}>Line: @buddysupport</a>
          </p>
        </div>

      </div>

      {/* Legal row */}
      <div className="footer-legal-row" style={{ position: "relative", zIndex: 2 }}>
        <p className="font-normal footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: textColor }}>
          {dict?.footer?.copyright || "© 2025 Buddy Review. All rights reserved."}
          &nbsp;|&nbsp;
          <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer"
            style={{ color: textColor, textDecoration: "underline" }}>{dict?.footer?.privacyPolicy || (lang === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy")}</a>
          &nbsp;|&nbsp;
          <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer"
            style={{ color: textColor, textDecoration: "underline" }}>{dict?.footer?.termsAndConditions || (lang === "th" ? "ข้อตกลงการใช้งาน" : "Terms and Conditions")}</a>
        </p>
      </div>
    </footer>
  );
}
