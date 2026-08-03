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

export default function BlogFooter() {
  return (
    <footer className="px-6" style={{ backgroundImage: "url('/hero-bg.png'), linear-gradient(160deg, #09071a 0%, #1c1256 30%, #3d2a90 55%, #7b5cf6 75%, #e8e0ff 90%, #ffffff 100%)", backgroundSize: "cover", backgroundPosition: "center", borderTop: "none", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="footer-grid">
        <div>
          <img src="/buddy-review-logo.png" alt="Buddy Review" className="footer-logo-img" style={{ height: "58px", width: "auto" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img src="/award-mt2025.png" alt="MT Award 2025" style={{ height: "85px", width: "auto", objectFit: "contain" }} />
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
            <a href="/faq" style={{ color: "#ffffff", textDecoration: "none" }}>FAQs</a>
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="font-normal text-right footer-text" style={{ ...KT, fontSize: "16px", lineHeight: "160%", color: "#ffffff" }}>
            บริษัท บับเบิลลี จำกัด<br/>1010, อาคารชินวัตรทาวเวอร์ 3, ห้อง 603<br/>ชั้น 6, ถนนวิภาวดีรังสิต,<br/>แขวงจตุจักร กรุงเทพฯ 10900
          </p>
        </div>
        <div className="footer-social-row" style={{ display: "flex", gap: "12px" }}>
          {SOCIAL.map(s => (
            <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer" style={{ width: "31px", height: "31px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <img src={s.icon} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="font-normal text-right footer-text footer-legal" style={{ ...KT, fontSize: "14px", lineHeight: "140%", color: "#ffffff" }}>
            <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
            &nbsp;|&nbsp;
            <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "underline" }}>ข้อตกลงการใช้งาน</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
