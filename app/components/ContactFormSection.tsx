"use client";
import { useState } from "react";
import { type Locale } from "../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const DARK_BG = "transparent";
const PINK_GRAD = "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)";

const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ContactFormSection({ lang = "th", dict }: { lang?: "th" | "en", dict: any }) {
  const [consented, setConsented] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const t = dict || {};

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    if (!consented) return;
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
        setConsented(false);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" style={{ background: DARK_BG }} className="py-20 px-6">
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

        {/* ── Top heading row ── */}
        <div className="contact-title-wrap" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
          gap: "40px", marginBottom: "56px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <h2 style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 900,
              margin: 0, lineHeight: "72px",
              display: "inline-block" }}>
              <span style={{ background: PINK_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.contactUs || "ติดต่อเรา"}</span>
            </h2>
          </div>
        </div>

        {/* ── Form + Image row ── */}
        <div className="contact-outer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "48px",
          alignItems: "stretch", marginBottom: "44px" }}>

          {/* Left: Form */}
          <div className="contact-form-panel" style={{ display: "flex", flexDirection: "column", gap: "20px",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.30)",
            borderRadius: "24px", padding: "36px 40px" }}>

            {/* ชื่อ-สกุล + อีเมล */}
            <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.fullName}</label>
                <input type="text" name="name" placeholder={t.fullNamePlaceholder} value={formData.name} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.email}</label>
                <input type="email" name="email" placeholder={t.emailPlaceholder} value={formData.email} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* เบอร์โทร + ชื่อบริษัท */}
            <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.phone}</label>
                <input type="tel" name="phone" placeholder={t.phonePlaceholder} value={formData.phone} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.company}</label>
                <input type="text" name="company" placeholder={t.companyPlaceholder} value={formData.company} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* งบประมาณ + note */}
            <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.budget}</label>
                <input type="text" name="budget" placeholder={t.budgetPlaceholder} value={formData.budget} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{t.jobTitle}</label>
                <input type="text" name="position" placeholder={t.jobTitlePlaceholder} value={formData.position} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* บรีฟ */}
            <div>
              <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                display: "block", marginBottom: "8px" }}>{t.brief}</label>
              <textarea rows={5} name="brief" placeholder={t.briefPlaceholder} value={formData.brief} onChange={handleFormChange}
                style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                  borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                  outline: "none", resize: "none", boxSizing: "border-box", display: "block" }} />
            </div>

            {/* Consent */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
              onClick={() => setConsented(c => !c)}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                background: consented ? "#5f26e5" : "transparent",
                border: consented ? "none" : "1.5px solid #9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, border 0.2s" }}>
                {consented && <IconCheck color="#ffffff" />}
              </div>
              <p style={{ ...KT, margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#666666" }}>
                {t.consent2}{" "}
                <a href="#" 
                  target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>{t.terms}</a>{" "}
                {t.and}{" "}
                <a href="#" 
                  target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>{t.privacy}</a>
              </p>
            </div>
            
            <p style={{ ...KT, margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#666666" }}>
              {t.consent1}
            </p>

            {/* Status messages */}
            {formStatus === "success" && (
              <p style={{ ...KT, color: "#16a34a", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                {t.successMsg || "✓ Submitted successfully"}
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ ...KT, color: "#dc2626", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                {t.errorMsg || "Something went wrong. Please try again."}
              </p>
            )}

            {/* Submit: pill button + circle arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button disabled={!consented || formStatus === "sending"}
                onClick={handleFormSubmit}
                className="cta-submit"
                style={{ ...KT, background: consented ? "#5f26e5" : "#e5e7eb",
                  border: "none", borderRadius: "50px", color: consented ? "#ffffff" : "#9ca3af",
                  fontSize: "16px", fontWeight: 600, padding: "16px 36px",
                  cursor: consented && formStatus !== "sending" ? "pointer" : "not-allowed",
                  transition: "background 0.2s, color 0.2s" }}>
                {formStatus === "sending" ? (t.sendingBtn || (lang === "en" ? "Sending..." : "กำลังส่ง...")) : (t.submitBtn || (lang === "en" ? "Submit" : "ส่งข้อมูล"))}
              </button>
            </div>

          </div>

          {/* Right: Info boxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.30)", borderRadius: "24px", padding: "24px" }}>
            {[
              {
                icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-location.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-location.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                title: lang === "th" ? "ที่อยู่" : "Address",
                lines: lang === "th"
                  ? ["1010, อาคารชินวัตรทาวเวอร์ 3,", "ห้อง 603, ชั้น 6,", "ถนนวิภาวดีรังสิต, แขวงจตุจักร กรุงเทพฯ 10900"]
                  : ["1010, Shinawatra Tower 3,", "Room 603, 6th Floor,", "Vibhavadi Rangsit Rd, Chatuchak, Bangkok 10900"],
              },
              {
                icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-call.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-call.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                title: lang === "th" ? "เบอร์โทร" : "Phone",
                lines: ["088-686-1676"],
              },
              {
                icon: <span style={{ display: "inline-block", width: "32px", height: "32px", backgroundColor: "#ffffff", WebkitMaskImage: "url(/icon-email.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: "url(/icon-email.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />,
                title: lang === "th" ? "อีเมล" : "Email",
                lines: ["info@buddyreview.co"],
              },
            ].map((col) => (
              <div key={col.title} style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: "16px",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.32)",
                borderRadius: "16px", padding: "20px 24px" }}>
                <div className="contact-icon-circle" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#5f26e5",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {col.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ ...KT, color: "#5f26e5", fontSize: "13px", fontWeight: 600, margin: 0 }}>{col.title}</p>
                  {col.lines.map((line) => (
                    <p key={line} style={{ ...KT, color: "#111827", fontSize: "15px", fontWeight: 700, margin: 0 }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Divider + Social */}
            <div style={{ borderTop: "1px solid #5f26e5", paddingTop: "20px" }}>
              <p style={{ ...KT, color: "#5f26e5", fontSize: "13px", fontWeight: 600, margin: "0 0 12px" }}>Follow us</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                    <span style={{ display: "inline-block", width: "31px", height: "31px",
                      backgroundColor: "#5f26e5",
                      WebkitMaskImage: `url(${s.icon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
                      maskImage: `url(${s.icon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
