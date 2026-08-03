"use client";
import { useState } from "react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const FAQS = [
  { q: "สมัครแล้วจะได้งานทันทีไหม?", a: "หลังจากสมัครเรียบร้อย ระบบจะพิจารณาความเหมาะสมของแคมเปญที่เข้ามา หากมีแคมเปญที่ตรงกับโปรไฟล์ของคุณ ระบบจะแจ้งเตือนเพื่อให้คุณเข้าร่วมได้ทันที" },
  { q: "ทำไมสมัครแล้วไม่มีงาน?", a: "งานแต่ละแคมเปญขึ้นอยู่กับกลุ่มเป้าหมายของแบรนด์ หากยังไม่มีงาน แนะนำให้คุณอัปเดตโปรไฟล์และเพิ่มช่องทางโซเชียลให้ครบถ้วน เพื่อเพิ่มโอกาสถูกจับคู่กับแคมเปญที่เหมาะสม" },
  { q: "ต้องเชื่อมบัญชีโซเชียลมีเดียหรือไม่?", a: "แนะนำให้เชื่อมบัญชีโซเชียลให้ครบเพื่อให้ระบบสามารถดึงสถิติ เพื่อจับคู่แคมเปญที่เหมาะสมได้อัตโนมัติ หากพบปัญหาในการเชื่อมต่อบัญชี สามารถติดต่อได้ที่ LINE @buddysupport" },
  { q: "ค่าตอบแทนจ่ายเมื่อไหร่?", a: "ระบบจะจ่ายค่าตอบแทนเป็นระบบแต้ม โดย 10 แต้ม = 1 บาท โดยนักรีวิวต้องทำการถอนเงินด้วยตัวเองพร้อมยื่นเอกสารในการถอนเงิน เปิดให้แลกเงินในช่วงต้นของเดือน และโอนเงินให้ระหว่างวันที่ 15–20 ของเดือนถัดไป (หลังจากตรวจสอบเอกสารเรียบร้อย) โดยจะมี SMS แจ้งเตือนจากธนาคาร ก่อนจะมีเงินเข้าบัญชีก่อน 3 วัน" },
  { q: "ทำไมมีแจ้งเตือนแล้ว เงินยังไม่เข้า?", a: "ก่อนที่เงินจะเข้าบัญชีธนาคารจริง จะมีการแจ้งเตือนล่วงหน้าจากธนาคาร ว่ากำลังจะมีเงินเข้า ซึ่งอาจทำให้เข้าใจว่าได้รับเงินแล้ว แต่เงินจะถูกโอนตามวันและเวลาที่ธนาคารได้ระบุในข้อความ" },
  { q: "ต้องใช้เอกสารอะไรในการรับเงิน?", a: "ใช้สำเนาบัตรประชาชน, เลขบัญชีธนาคารและสำเนาบัญชีธนาคารเพื่อใช้ในการเบิกถอนเงิน" },
  { q: "มีค่าธรรมเนียมการแลกเงินหรือไม่?", a: "มีค่าธรรมเนียมในการโอนเงิน 8 บาทต่อครั้ง และจำเป็นต้องแลกแต้มขึ้นต่ำ 2,000 แต้มขึ้นไป (200 บาท) ตัวอย่าง: สมมติว่ามี 2,500 แต้ม ซึ่งเท่ากับ 250 บาท เมื่อต้องการแลกเงิน ระบบจะหักค่าธรรมเนียมในการโอนเงิน 8 บาท ดังนั้นคุณจะได้รับเงินเข้าบัญชีทั้งสิ้น 242 บาท" },
  { q: "ลืมอีเมลหรือเข้าระบบไม่ได้ ต้องทำยังไง?", a: "ติดต่อทีมซัพพอร์ตได้ทาง LINE: @buddysupport โดยแจ้งชื่อบัญชี เพื่อให้ทีมงานตรวจสอบและทำการรีเซ็ตรหัสผ่าน" },
];

export default function FAQAccordion() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
      <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

        {/* Centered title */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ ...KT, fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Frequently Asked </span>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions</span>
          </h2>
        </div>

        {/* 2-column accordion grid */}
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>

          {/* Left column — items 0–3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.slice(0, 4).map((item, i) => (
              <div key={i} style={{
                background: faqOpen === i ? "#5f26e5" : "#ffffff",
                border: faqOpen === i ? "none" : "1px solid rgba(0,0,0,0.10)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "background 0.25s",
              }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    ...KT, width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: "16px",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "20px 24px", textAlign: "left",
                  }}
                >
                  <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === i ? "#ffffff" : "#111827", lineHeight: 1.5 }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                    background: faqOpen === i ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                    transform: faqOpen === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {faqOpen === i && (
                  <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right column — items 4–7 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.slice(4).map((item, i) => {
              const idx = i + 4;
              return (
                <div key={idx} style={{
                  background: faqOpen === idx ? "#5f26e5" : "#ffffff",
                  border: faqOpen === idx ? "none" : "1px solid rgba(0,0,0,0.10)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "background 0.25s",
                }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    style={{
                      ...KT, width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: "16px",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "20px 24px", textAlign: "left",
                    }}
                  >
                    <span style={{ ...KT, fontSize: "16px", fontWeight: 700, color: faqOpen === idx ? "#ffffff" : "#111827", lineHeight: 1.5 }}>
                      {item.q}
                    </span>
                    <span style={{
                      flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                      background: faqOpen === idx ? "#ffffff" : "rgba(95,38,229,0.15)", display: "flex", alignItems: "center",
                      justifyContent: "center", transition: "transform 0.25s ease, background 0.25s ease",
                      transform: faqOpen === idx ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="#5f26e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {faqOpen === idx && (
                    <p style={{ ...KT, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Still have a question */}
        <div style={{ textAlign: "center", marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <h3 style={{ ...KT, fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 800, color: "#111827", margin: 0 }}>
            มีคำถามเพิ่มเติมไหม?
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/faq?from=influencer"
              className="btn-insight"
              style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 48px", textDecoration: "none", display: "inline-block" }}>
              ดูเพิ่มเติม
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
