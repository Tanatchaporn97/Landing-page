"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const LABELS = {
  th: {
    contactUs: "ติดต่อเรา", fullName: "ชื่อ-สกุล *", fullNamePlaceholder: "ชื่อ-นามสกุล",
    email: "อีเมล *", emailPlaceholder: "อีเมล", phone: "เบอร์โทรศัพท์ *", phonePlaceholder: "เบอร์โทรศัพท์",
    company: "ชื่อบริษัท *", companyPlaceholder: "บริษัท...", budget: "งบประมาณ", budgetPlaceholder: "ระบุงบประมาณ",
    jobTitle: "ตำแหน่งงาน *", jobTitlePlaceholder: "ระบุตำแหน่งงาน", brief: "รายละเอียด / บรีฟ",
    briefPlaceholder: "รายละเอียดโปรเจกต์ที่ต้องการให้เราช่วย...",
    consent1: "ฉันเข้าใจและยินยอมให้มีการเก็บรวบรวมข้อมูลส่วนบุคคลของฉันเพื่อวัตถุประสงค์ในการติดต่อกลับ หรือเพื่อนำเสนอข้อมูลตามที่ร้องขอ",
    consent2: "ยินดีให้ Buddy Review เก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล ตามนโยบายความเป็นส่วนตัว",
    terms: "อ่านข้อตกลง", and: "และ", privacy: "นโยบายความเป็นส่วนตัว",
    submitBtn: "ส่งข้อมูล", sendingBtn: "กำลังส่ง...",
    successMsg: "✓ ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว",
    errorMsg: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    consentWarning: "กรุณายอมรับเงื่อนไขและนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล",
    close: "ปิด",
  },
  en: {
    contactUs: "Contact Us", fullName: "Full Name *", fullNamePlaceholder: "Full name",
    email: "Email *", emailPlaceholder: "Email", phone: "Phone *", phonePlaceholder: "Phone number",
    company: "Company *", companyPlaceholder: "Company...", budget: "Budget", budgetPlaceholder: "Your budget",
    jobTitle: "Job Title *", jobTitlePlaceholder: "Your job title", brief: "Details / Brief",
    briefPlaceholder: "Tell us about your project...",
    consent1: "I understand and consent to the collection of my personal data for the purpose of being contacted back or receiving the requested information.",
    consent2: "I agree to let Buddy Review collect, use, and disclose my personal data according to the",
    terms: "Terms", and: "and", privacy: "Privacy Policy",
    submitBtn: "Submit", sendingBtn: "Sending...",
    successMsg: "✓ Submitted successfully. Our team will get back to you soon.",
    errorMsg: "Something went wrong. Please try again.",
    consentWarning: "Please accept the terms and privacy policy above before submitting.",
    close: "Close",
  },
};

const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ContactFormModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: "th" | "en" }) {
  const t = LABELS[lang];
  const [consented, setConsented] = useState(false);
  const [showConsentWarning, setShowConsentWarning] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", position: "", brief: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    if (!consented) {
      setShowConsentWarning(true);
      return;
    }
    setShowConsentWarning(false);
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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 900,
            background: "rgba(17,24,39,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px", overflowY: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", width: "100%", maxWidth: "620px",
              background: "#ffffff", borderRadius: "24px",
              boxShadow: "0 24px 64px rgba(17,24,39,0.30)",
              padding: "40px", boxSizing: "border-box",
              maxHeight: "calc(100vh - 48px)", overflowY: "auto",
              margin: "auto",
            }}
          >
            <button
              onClick={onClose}
              aria-label={t.close}
              style={{
                position: "absolute", top: "20px", right: "20px",
                width: "36px", height: "36px", borderRadius: "50%",
                border: "none", background: "#f3f4f6", color: "#111827",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "18px", lineHeight: 1,
              }}
            >
              ×
            </button>

            <h2 style={{
              ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 900, margin: "0 0 24px",
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {t.contactUs}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cfm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.fullName}</label>
                  <input type="text" name="name" placeholder={t.fullNamePlaceholder} value={formData.name} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.email}</label>
                  <input type="email" name="email" placeholder={t.emailPlaceholder} value={formData.email} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div className="cfm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.phone}</label>
                  <input type="tel" name="phone" placeholder={t.phonePlaceholder} value={formData.phone} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.company}</label>
                  <input type="text" name="company" placeholder={t.companyPlaceholder} value={formData.company} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div className="cfm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.budget}</label>
                  <input type="text" name="budget" placeholder={t.budgetPlaceholder} value={formData.budget} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.jobTitle}</label>
                  <input type="text" name="position" placeholder={t.jobTitlePlaceholder} value={formData.position} onChange={handleFormChange}
                    style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div>
                <label style={{ ...KT, color: "#5f26e5", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{t.brief}</label>
                <textarea rows={4} name="brief" placeholder={t.briefPlaceholder} value={formData.brief} onChange={handleFormChange}
                  style={{ ...KT, width: "100%", background: "#f5f5f5", border: "none", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", color: "#111827", outline: "none", resize: "none", boxSizing: "border-box", display: "block" }} />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
                onClick={() => { setConsented((c) => !c); setShowConsentWarning(false); }}>
                <div style={{
                  width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                  background: consented ? "#5f26e5" : "transparent",
                  border: consented ? "none" : (showConsentWarning ? "1.5px solid #dc2626" : "1.5px solid #9ca3af"),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, border 0.2s",
                }}>
                  {consented && <IconCheck color="#ffffff" />}
                </div>
                <p style={{ ...KT, margin: 0, fontSize: "16px", lineHeight: 1.6, color: "#111827" }}>
                  {t.consent2}{" "}
                  <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/terms_and_conditions.pdf"
                    target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>{t.terms}</a>{" "}
                  {t.and}{" "}
                  <a href="https://docs.google.com/viewer?url=https://business.buddyreview.co/document/privacy_policy.pdf"
                    target="_blank" rel="noopener noreferrer" style={{ color: "#5f26e5", textDecoration: "underline" }}>{t.privacy}</a>
                </p>
              </div>

              <p style={{ ...KT, margin: 0, fontSize: "16px", lineHeight: 1.6, color: "#111827" }}>{t.consent1}</p>

              {showConsentWarning && !consented && (
                <p style={{ ...KT, color: "#dc2626", fontSize: "13px", fontWeight: 600, margin: 0 }}>{t.consentWarning}</p>
              )}
              {formStatus === "success" && (
                <p style={{ ...KT, color: "#16a34a", fontSize: "14px", fontWeight: 600, margin: 0 }}>{t.successMsg}</p>
              )}
              {formStatus === "error" && (
                <p style={{ ...KT, color: "#dc2626", fontSize: "14px", fontWeight: 600, margin: 0 }}>{t.errorMsg}</p>
              )}

              <button disabled={formStatus === "sending"}
                onClick={handleFormSubmit}
                style={{
                  ...KT, background: consented ? "#5f26e5" : "#e5e7eb",
                  border: "none", borderRadius: "50px", color: consented ? "#ffffff" : "#9ca3af",
                  fontSize: "16px", fontWeight: 600, padding: "15px 36px",
                  cursor: formStatus !== "sending" ? "pointer" : "not-allowed",
                  transition: "background 0.2s, color 0.2s", alignSelf: "flex-start",
                }}>
                {formStatus === "sending" ? t.sendingBtn : t.submitBtn}
              </button>
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 560px){
              .cfm-grid-2{ grid-template-columns: 1fr !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
