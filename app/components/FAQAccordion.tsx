"use client";
import { useState } from "react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const DEFAULT_FAQS = [
  { q: "สมัครแล้วจะได้งานทันทีไหม?", a: "หลังจากสมัครเรียบร้อย ระบบจะพิจารณาความเหมาะสมของแคมเปญที่เข้ามา หากมีแคมเปญที่ตรงกับโปรไฟล์ของคุณ ระบบจะแจ้งเตือนเพื่อให้คุณเข้าร่วมได้ทันที" },
  { q: "ทำไมสมัครแล้วไม่มีงาน?", a: "งานแต่ละแคมเปญขึ้นอยู่กับกลุ่มเป้าหมายของแบรนด์ หากยังไม่มีงาน แนะนำให้คุณอัปเดตโปรไฟล์และเพิ่มช่องทางโซเชียลให้ครบถ้วน เพื่อเพิ่มโอกาสถูกจับคู่กับแคมเปญที่เหมาะสม" },
  { q: "ต้องเชื่อมบัญชีโซเชียลมีเดียหรือไม่?", a: "แนะนำให้เชื่อมบัญชีโซเชียลให้ครบเพื่อให้ระบบสามารถดึงสถิติ เพื่อจับคู่แคมเปญที่เหมาะสมได้อัตโนมัติ หากพบปัญหาในการเชื่อมต่อบัญชี สามารถติดต่อได้ที่ LINE @buddysupport" },
  { q: "ค่าตอบแทนจ่ายเมื่อไหร่?", a: "ระบบจะจ่ายค่าตอบแทนเป็นระบบแต้ม โดย 10 แต้ม = 1 บาท โดยนักรีวิวต้องทำการถอนเงินด้วยตัวเองพร้อมยื่นเอกสารในการถอนเงิน เปิดให้แลกเงินในช่วงต้นของเดือน และโอนเงินให้ระหว่างวันที่ 15–20 ของเดือนถัดไป (หลังจากตรวจสอบเอกสารเรียบร้อย) โดยจะมี SMS แจ้งเตือนจากธนาคาร ก่อนจะมีเงินเข้าบัญชีก่อน 3 วัน" },
  { q: "ทำไมมีแจ้งเตือนแล้ว เงินยังไม่เข้า?", a: "ก่อนที่เงินจะเข้าบัญชีธนาคารจริง จะมีการแจ้งเตือนล่วงหน้าจากธนาคาร ว่ากำลังจะมีเงินเข้า ซึ่งอาจทำให้เข้าใจว่าได้รับเงินแล้ว แต่เงินจะถูกโอนตามวันและเวลาที่ธนาคารได้ระบุในข้อความ" },
  { q: "ต้องใช้เอกสารอะไรในการรับเงิน?", a: "ใช้สำเนาบัตรประชาชน, เลขบัญชีธนาคารและสำเนาบัญชีธนาคารเพื่อใช้ในการเบิกถอนเงิน" },
  { q: "มีค่าธรรมเนียมการแลกเงินหรือไม่?", a: "มีค่าธรรมเนียมในการโอนเงิน 8 บาทต่อครั้ง และจำเป็นต้องแลกแต้มขึ้นต่ำ 2,000 แต้มขึ้นไป (200 บาท) ตัวอย่าง: สมมติว่ามี 2,500 แต้ม ซึ่งเท่ากับ 250 บาท เมื่อต้องการแลกเงิน ระบบจะหักค่าธรรมเนียมในการโอนเงิน 8 บาท ดังนั้นคุณจะได้รับเงินเข้าบัญชีทั้งสิ้น 242 บาท" },
  { q: "ลืมอีเมลหรือเข้าระบบไม่ได้ ต้องทำยังไง?", a: "ติดต่อทีมซัพพอร์ตได้ทาง LINE: @buddysupport โดยแจ้งชื่อบัญชี เพื่อให้ทีมงานตรวจสอบและทำการรีเซ็ตรหัสผ่าน" },
];

export default function FAQAccordion({
  faqs = DEFAULT_FAQS,
  lang = "th",
  variant = "influencer",
  hideCta = false,
  oneColumn = false,
  hideTitle = false,
  dict,
}: {
  faqs?: Array<{ q: string; a: string; qEn?: string; aEn?: string }>;
  lang?: "th" | "en";
  variant?: "home" | "influencer";
  hideCta?: boolean;
  oneColumn?: boolean;
  hideTitle?: boolean;
  dict?: any;
}) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Split into left and right columns (single column skips the split)
  const half = oneColumn ? faqs.length : Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  // Home page uses a glassmorphism style while influencer page uses solid white cards
  const getCardStyle = (isOpen: boolean) => {
    if (variant === "home") {
      return {
        background: isOpen ? "#5f26e5" : "rgba(255,255,255,0.22)",
        backdropFilter: isOpen ? "none" : "blur(18px)",
        WebkitBackdropFilter: isOpen ? "none" : "blur(18px)",
        border: isOpen ? "none" : "1px solid rgba(255,255,255,0.45)",
        borderRadius: "24px",
      };
    }
    return {
      background: isOpen ? "#5f26e5" : "#ffffff",
      border: isOpen ? "none" : "1px solid rgba(0,0,0,0.10)",
      borderRadius: "16px",
    };
  };

  const getTextColor = (isOpen: boolean) => {
    if (variant === "home") {
      return {
        title: isOpen ? "#ffffff" : "#111827",
        desc: "rgba(255,255,255,0.85)",
      };
    }
    return {
      title: isOpen ? "#ffffff" : "#111827",
      desc: "rgba(255,255,255,0.75)",
    };
  };

  return (
    <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

        {/* Centered title */}
        {!hideTitle && (
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ ...KT, fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>{dict?.faqPage?.title?.split(' ')[0] || "Frequently Asked"} </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{dict?.faqPage?.title?.split(' ').slice(1).join(' ') || "Questions"}</span>
            </h2>
          </div>
        )}

        {/* Accordion grid — 2 columns, or 1 when oneColumn is set */}
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: oneColumn ? "1fr" : "1fr 1fr", gap: "16px", alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {leftFaqs.map((item, i) => {
              const isOpen = faqOpen === i;
              const colors = getTextColor(isOpen);
              return (
                <div key={i} className="faq-item" style={{
                  ...getCardStyle(isOpen),
                  overflow: "hidden",
                  transition: "background 0.25s",
                }}>
                  <button
                    className="faq-toggle-btn"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    style={{
                      ...KT, width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: "16px",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "20px 24px", textAlign: "left",
                    }}
                  >
                    <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: colors.title, lineHeight: 1.5 }}>
                      {lang === "en" && item.qEn ? item.qEn : item.q}
                    </span>
                    <span style={{
                      flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                      background: isOpen ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                      justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{ ...KT, fontSize: "15px", color: colors.desc, lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {lang === "en" && item.aEn ? item.aEn : item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {rightFaqs.map((item, i) => {
              const idx = i + leftFaqs.length;
              const isOpen = faqOpen === idx;
              const colors = getTextColor(isOpen);
              return (
                <div key={idx} className="faq-item" style={{
                  ...getCardStyle(isOpen),
                  overflow: "hidden",
                  transition: "background 0.25s",
                }}>
                  <button
                    className="faq-toggle-btn"
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    style={{
                      ...KT, width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: "16px",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "20px 24px", textAlign: "left",
                    }}
                  >
                    <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: colors.title, lineHeight: 1.5 }}>
                      {lang === "en" && item.qEn ? item.qEn : item.q}
                    </span>
                    <span style={{
                      flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                      background: isOpen ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                      justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{ ...KT, fontSize: "15px", color: colors.desc, lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {lang === "en" && item.aEn ? item.aEn : item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Still have a question */}
        {!hideCta && (
          <div style={{ textAlign: "center", marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <h3 style={{ ...KT, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 800, color: "#111827", margin: 0 }}>
              {dict?.home?.ctaTitle || (lang === "en" ? "Still have questions?" : "มีคำถามเพิ่มเติมไหม?")}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href={`/${lang}/faq`}
                className="btn-insight"
                style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 48px", textDecoration: "none", display: "inline-block" }}>
                {dict?.home?.viewMore || (lang === "en" ? "View More" : "ดูเพิ่มเติม")}
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
