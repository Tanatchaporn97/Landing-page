"use client";
import { useState } from "react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const DARK_BG = "transparent";

const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ContactFormSection({ lang = "th" }: { lang?: "th" | "en" }) {
  const [consented, setConsented] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const t = lang === "th" ? { contactUs: "ติดต่อเรา" } : { contactUs: "Contact Us" };

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
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "inline-block" }}>
              {t.contactUs}
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
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "ชื่อ-สกุล *" : "Full Name *"}</label>
                <input type="text" name="name" placeholder={lang === "th" ? "ชื่อ-นามสกุล" : "First and last name"} value={formData.name} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "อีเมล *" : "Email *"}</label>
                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* เบอร์โทร + ชื่อบริษัท */}
            <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "เบอร์โทรศัพท์ *" : "Phone Number *"}</label>
                <input type="tel" name="phone" placeholder="08X-XXX-XXXX" value={formData.phone} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "ชื่อบริษัท *" : "Company Name *"}</label>
                <input type="text" name="company" placeholder={lang === "th" ? "บริษัท..." : "Company..."} value={formData.company} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* งบประมาณ + note */}
            <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "งบประมาณ" : "Budget"}</label>
                <input type="text" name="budget" placeholder={lang === "th" ? "ระบุงบประมาณ" : "Enter your budget"} value={formData.budget} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                  display: "block", marginBottom: "8px" }}>{lang === "th" ? "ตำแหน่งงาน *" : "Job Title *"}</label>
                <input type="text" name="position" placeholder={lang === "th" ? "ระบุตำแหน่งงาน" : "Enter your job title"} value={formData.position} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none",
                    borderRadius: "10px", padding: "14px 16px", fontSize: "16px", color: "#111827",
                    outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* บรีฟ */}
            <div>
              <label style={{ ...KT, color: "#5f26e5", fontSize: "16px", fontWeight: 600,
                display: "block", marginBottom: "8px" }}>{lang === "th" ? "รายละเอียด / บรีฟ" : "Details / Brief"}</label>
              <textarea rows={5} name="brief" placeholder={lang === "th" ? "รายละเอียดโปรเจกต์ที่ต้องการให้เราช่วย..." : "Details of the project you'd like help with..."} value={formData.brief} onChange={handleFormChange}
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
              <p style={{ ...KT, color: "#6b7280", fontSize: "13px", lineHeight: "1.6", margin: 0, userSelect: "none" }}>
                {lang === "th" ? (
                  <>
                    ยินดีให้ Buddy Review เก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล ตามนโยบายความเป็นส่วนตัว{" "}
                    <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf"
                      target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>อ่านข้อตกลง</a>{" "}
                    และ{" "}
                    <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf"
                      target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>นโยบายความเป็นส่วนตัว</a>
                  </>
                ) : (
                  <>
                    I consent to Buddy Review collecting, using, and disclosing my personal data in accordance with the{" "}
                    <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf"
                      target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>Terms and Conditions</a>{" "}
                    and{" "}
                    <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf"
                      target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>Privacy Policy</a>
                  </>
                )}
              </p>
            </div>

            {/* Status messages */}
            {formStatus === "success" && (
              <p style={{ ...KT, color: "#16a34a", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                {lang === "th" ? "✓ ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว" : "✓ Submitted successfully — our team will contact you soon."}
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ ...KT, color: "#dc2626", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                {lang === "th" ? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" : "Something went wrong. Please try again."}
              </p>
            )}

            {/* Submit: pill button + circle arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button disabled={!consented || formStatus === "sending"}
                onClick={handleFormSubmit}
                className="cta-submit"
                style={{ ...KT, background: consented ? "#5f26e5" : "#d1d5db",
                  border: "none", borderRadius: "50px", color: "#ffffff",
                  fontSize: "16px", fontWeight: 600, padding: "16px 36px",
                  cursor: consented && formStatus !== "sending" ? "pointer" : "not-allowed",
                  transition: "background 0.2s" }}>
                {formStatus === "sending" ? (lang === "th" ? "กำลังส่ง..." : "Sending...") : (lang === "th" ? "ยืนยัน" : "Submit")}
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
