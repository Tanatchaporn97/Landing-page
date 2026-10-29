"use client";
import { useState } from "react";
import Link from "next/link";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

const DEFAULT_FAQS = [
  { q: "สมัครแล้ว ทำไมยังไม่มีงานเข้ามา?", a: "หลังจากสมัคร Buddy Review อาจยังไม่ได้รับงานทันที เนื่องจากแต่ละแคมเปญมีความต้องการและเกณฑ์การคัดเลือกอินฟลูเอนเซอร์ที่แตกต่างกัน ขึ้นอยู่กับความเหมาะสมของโปรไฟล์และกลุ่มเป้าหมายที่แบรนด์ต้องการ\nแนะนำให้กรอกข้อมูลโปรไฟล์ให้ครบถ้วน เชื่อมต่อช่องทางโซเชียลมีเดีย และอัปเดตข้อมูลให้เป็นปัจจุบันอยู่เสมอ เพื่อให้แบรนด์รู้จักคุณมากขึ้น และเพิ่มโอกาสในการได้รับงานที่เหมาะกับช่องของคุณ",
    qEn: "I've signed up — why haven't I received any jobs yet?", aEn: "After signing up with Buddy Review, you may not receive a job right away, because each campaign has its own requirements and influencer selection criteria, depending on how well your profile fits and the audience the brand wants to reach.\nWe recommend completing your profile, connecting your social media channels, and keeping your information up to date, so brands can get to know you better and you have a better chance of getting jobs that suit your channel." },
  { q: "ต้องเชื่อมบัญชีโซเชียลมีเดียหรือไม่?", a: "แนะนำให้เชื่อมบัญชีโซเชียลให้ครบเพื่อให้ระบบสามารถดึงสถิติ เพื่อจับคู่แคมเปญที่เหมาะสมได้อัตโนมัติ หากพบปัญหาในการเชื่อมต่อบัญชี สามารถติดต่อได้ที่ LINE @buddysupport",
    qEn: "Do I need to connect my social media accounts?", aEn: "We recommend connecting all of your social media accounts so the system can pull your stats and automatically match you with the right campaigns. If you run into any issues connecting an account, you can reach us on LINE @buddysupport." },
  { q: "ค่าตอบแทนจ่ายเมื่อไหร่?", a: "Buddy Review กำหนดรอบจ่ายค่าตอบแทนตามรูปแบบการรับงาน ดังนี้\n• กรณีนักรีวิวแลกแต้มผ่านระบบ: จ่ายค่าตอบแทนวันที่ 20 ของเดือน โดยต้องดำเนินการแลกแต้มและส่งข้อมูลที่เกี่ยวข้องให้ครบถ้วนภายในวันที่ 20 ของเดือน\n*กดแลกแต้มเดือนไหน จะได้รับค่าตอบแทนของเดือนถัดไป\n• กรณีบริษัท นิติบุคคล หรือรับงานผ่านใบเสนอราคา: จ่ายค่าตอบแทนวันที่ 7 ของเดือนถัดไป และเครดิตเทอมตามที่บริษัทกำหนด หากรับงานผ่านใบเสนอราคาต้องแนบใบเสนอราคาไว้ด้วย โดยต้องส่งงานและเอกสารให้ครบถ้วนภายในวันที่ 7 ของเดือน\nหากส่งข้อมูลหรือเอกสารล่าช้า อาจส่งผลต่อรอบจ่ายเงิน และหากวันจ่ายเงินตรงกับวันหยุด จะเลื่อนเป็นวันทำการถัดไป",
    qEn: "When is payment made?", aEn: "Buddy Review pays on a schedule that depends on how you take on work:\n• Reviewers redeeming points in the system: paid on the 20th of the month. Redeem your points and submit all related information by the 20th.\n*Points redeemed in a given month are paid out the following month.\n• Companies, juristic persons, or work taken on through a quotation: paid on the 7th of the following month, on the credit terms set by the company. If you take on work through a quotation, attach the quotation. Submit the work and all documents by the 7th.\nLate information or documents may move you to a later payment round, and if a payment date falls on a holiday, payment moves to the next business day." },
  { q: "ทำไมมีแจ้งเตือนแล้ว เงินยังไม่เข้า?", a: "ก่อนที่เงินจะเข้าบัญชีธนาคารจริง จะมีการแจ้งเตือนล่วงหน้าจากธนาคาร ว่ากำลังจะมีเงินเข้า ซึ่งอาจทำให้เข้าใจว่าได้รับเงินแล้ว แต่เงินจะถูกโอนตามวันและเวลาที่ธนาคารได้ระบุในข้อความ",
    qEn: "I got a notification, but why hasn't the money arrived yet?", aEn: "Before the money actually reaches your bank account, the bank sends an advance notification that a transfer is on its way, which can make it seem like the payment has already arrived. The funds will be transferred on the date and time stated in that notification." },
  { q: "ต้องใช้เอกสารอะไรในการรับเงิน?", a: "เอกสารที่ต้องเตรียมขึ้นอยู่กับรูปแบบการรับค่าตอบแทน ดังนี้\n• กรณีนักรีวิวทั่วไป: สำเนาบัตรประชาชน และสำเนาหน้าสมุดบัญชีธนาคาร\n• กรณีบริษัทหรือนิติบุคคล: สำเนาบัตรประชาชน สำเนาใบทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ.20) และสำเนาหน้าสมุดบัญชีธนาคารของบริษัท\nกรุณาตรวจสอบข้อมูลและจัดส่งเอกสารให้ครบถ้วน เพื่อป้องกันความล่าช้าในการรับเงิน ทั้งนี้ กรณีนิติบุคคลต้องจัดส่งใบเสร็จรับเงินหรือใบกำกับภาษีฉบับจริงภายใน 7 วันหลังได้รับเงิน",
    qEn: "What documents are required to receive payment?", aEn: "The documents you need depend on how you're paid:\n• Individual reviewers: a copy of your national ID card and a copy of your bank account book page.\n• Companies or juristic persons: a copy of the ID card, a copy of the VAT registration certificate (Por.Por.20), and a copy of the company's bank account book page.\nPlease check your details and send every document to avoid payment delays. Juristic persons must also send the original receipt or tax invoice within 7 days of receiving payment." },
  { q: "มีค่าธรรมเนียมในการแลกแต้มหรือไม่?", a: "การแลกแต้มเป็นเงินมีค่าธรรมเนียมการโอน 8 บาทต่อครั้ง โดยสามารถแลกแต้มได้ตั้งแต่ 2,000 แต้ม (200 บาท) ขึ้นไป ในอัตรา 10 แต้ม = 1 บาท\nตัวอย่าง: หากแลก 2,500 แต้ม คิดเป็น 250 บาท เมื่อหักค่าธรรมเนียม 8 บาท จะได้รับเงินเข้าบัญชี 242 บาท",
    qEn: "Is there a fee for redeeming points?", aEn: "Redeeming points for cash has a transfer fee of 8 THB per transaction. You can redeem from 2,000 points (200 THB) upward, at a rate of 10 points = 1 THB.\nExample: redeeming 2,500 points gives 250 THB; after the 8 THB fee, 242 THB is paid into your account." },
  { q: "ลืมอีเมลหรือเข้าระบบไม่ได้ ต้องทำยังไง?", a: "ติดต่อทีมซัพพอร์ตได้ทาง LINE: @buddysupport โดยแจ้งชื่อบัญชี เพื่อให้ทีมงานตรวจสอบและทำการรีเซ็ตรหัสผ่าน",
    qEn: "I forgot my email or can't log in — what should I do?", aEn: "Contact our support team on LINE: @buddysupport with your account name, and the team will verify your account and reset your password." },
];

// "[label](/path)" inside an answer becomes an in-site link (locale prefixed);
// "[label](https://…)" opens the external page in a new tab; "tel:" / "mailto:" call or email directly
function withLinks(text: string, lang: string) {
  const linkStyle = { color: "inherit", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" };
  return text.split(/(\[[^\]]+\]\((?:\/|https:\/\/|tel:|mailto:)[^)]*\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(((?:\/|https:\/\/|tel:|mailto:)[^)]*)\)$/);
    if (!m) return part;
    if (m[2].startsWith("tel:") || m[2].startsWith("mailto:")) return <a key={i} href={m[2]} style={linkStyle}>{m[1]}</a>;
    return m[2].startsWith("/")
      ? <Link key={i} href={`/${lang}${m[2]}`} style={linkStyle}>{m[1]}</Link>
      : <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" style={linkStyle}>{m[1]}</a>;
  });
}

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
  variant?: "home" | "influencer" | "brand";
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

  // Home and Brand pages use a glassmorphism style while the influencer page uses solid white cards
  const getCardStyle = (isOpen: boolean) => {
    if (variant === "home" || variant === "brand") {
      return {
        background: isOpen ? "#5f26e5" : "rgba(255,255,255,0.22)",
        backdropFilter: isOpen ? "none" : "blur(18px)",
        WebkitBackdropFilter: isOpen ? "none" : "blur(18px)",
        border: isOpen ? "none" : "1px solid rgba(255,255,255,0.45)",
        boxShadow: isOpen ? "none" : "0 8px 32px rgba(95,38,229,0.10)",
        borderRadius: "24px",
      };
    }
    return {
      background: isOpen ? "#5f26e5" : "rgba(255,255,255,0.55)",
      backdropFilter: isOpen ? "none" : "blur(20px)",
      WebkitBackdropFilter: isOpen ? "none" : "blur(20px)",
      border: isOpen ? "none" : "1px solid rgba(255,255,255,0.6)",
      borderRadius: "16px",
    };
  };

  const getTextColor = (isOpen: boolean) => {
    if (variant === "home" || variant === "brand") {
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
            <h2 className="section-title font-bold section-h2-fixed" style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", fontFeatureSettings: "'pnum' on,'lnum' on", margin: 0 }}>
              {variant === "brand" ? (
                <>
                  <span style={{ ...PIERSON }}>Frequently Asked{" "}</span>
                  <span style={{ ...PIERSON, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions</span>
                </>
              ) : (
                <>
                  {/* the influencer page's Thai heading is in Thai */}
                  <span style={{ ...KT, fontWeight: 700 }}>{variant === "influencer" && lang === "th" ? "คำถาม" : "Frequently Asked "}</span>
                  <span style={{ ...KT, fontWeight: 700, background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{variant === "influencer" && lang === "th" ? "ที่พบบ่อย" : "Questions"}</span>
                </>
              )}
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
                    <p style={{ ...KT, fontSize: "16px", color: colors.desc, lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {String(lang === "en" && item.aEn ? item.aEn : item.a).split("\n").map((para, pi) => (
                        <span key={pi} style={{ display: "block", marginTop: pi ? "10px" : 0 }}>{withLinks(para, lang)}</span>
                      ))}
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
                    <p style={{ ...KT, fontSize: "16px", color: colors.desc, lineHeight: 1.85, margin: 0, padding: "0 24px 20px" }}>
                      {String(lang === "en" && item.aEn ? item.aEn : item.a).split("\n").map((para, pi) => (
                        <span key={pi} style={{ display: "block", marginTop: pi ? "10px" : 0 }}>{withLinks(para, lang)}</span>
                      ))}
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
            <h3 className="th-head" style={{ ...KT, fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 600, color: "#111827", margin: 0 }}>
              {variant === "influencer"
                ? (dict?.home?.ctaTitleInfluencer || (lang === "en" ? "Still have questions?" : "มีคำถามเพิ่มเติมไหม?"))
                : (dict?.home?.ctaTitle || (lang === "en" ? "Still have questions?" : "มีคำถามเพิ่มเติมไหม?"))}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {variant === "influencer" ? (
                // influencer page: same dark pill as its other CTAs
                <Link href={`/${lang}/faq`} className="inf-cta" style={KT}>
                  {dict?.home?.faqViewMore || (lang === "en" ? "View All FAQs" : "ดูคำถามที่พบบ่อยทั้งหมด")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ) : (
                <Link href={`/${lang}/faq`}
                  className="btn-glass-purple"
                  style={{ ...KT, borderRadius: "50px", fontSize: "16px", fontWeight: 600, padding: "14px 48px", textDecoration: "none" }}>
                  {dict?.home?.faqViewMore || (lang === "en" ? "View All FAQs" : "ดูคำถามที่พบบ่อยทั้งหมด")}
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
