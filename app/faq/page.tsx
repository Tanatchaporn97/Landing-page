"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Lazy load below-the-fold components
const FAQAccordion = dynamic(() => import("../components/FAQAccordion"));
const ContactFormSection = dynamic(() => import("../components/ContactFormSection"));

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

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

function FaqPageContent() {
  const searchParams = useSearchParams();
  const fromInfluencer = searchParams.get("from") === "influencer";
  const [activeTab, setActiveTab] = useState(fromInfluencer ? "influencer" : "brand");
  const active = CATEGORIES.find(c => c.key === activeTab)!;
  const contactHref = fromInfluencer ? "/influencer#contact" : "/#contact";

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/light-purple-gradient-bg-3.jpg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "top center", overflowX: "hidden" }}>
      {fromInfluencer ? <Navbar variant="influencer" /> : <Navbar variant="home" />}

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
          <div style={{ marginTop: "-100px" }}><FAQAccordion faqs={active.faqs} variant="influencer" hideCta={true} /></div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection lang="th" />

      <Footer variant={fromInfluencer ? "influencer" : "home"} />
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
