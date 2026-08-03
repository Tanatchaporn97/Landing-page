import Link from "next/link";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InfluencerHero from "../../components/InfluencerHero";
import PathToPartnership from "../../components/PathToPartnership";
import { type Locale } from "../../../i18n-config";

// Lazy load below-the-fold components
const TestimonialsGrid = dynamic(() => import("../../components/TestimonialsGrid"));
const LogoMarquee = dynamic(() => import("../../components/LogoMarquee"));
const SuccessStoriesSlider = dynamic(() => import("../../components/SuccessStoriesSlider"));
const ContactFormSection = dynamic(() => import("../../components/ContactFormSection"));
const FAQAccordion = dynamic(() => import("../../components/FAQAccordion"));

import { getDictionary } from "../../../get-dictionary";

export default async function InfluencerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div style={{ ...KT, minHeight: "100vh", backgroundImage: "url('/light-purple-gradient-bg-3.jpg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "top center", overflowX: "hidden" }}>

      {/* ── Navbar ── */}
      <Navbar lang={lang as Locale} variant="influencer" />


      {/* ── Hero ── */}
      <InfluencerHero />

      {/* ── Hero → Logos fade overlay ── */}
      <div style={{ height: "80px", marginTop: "-80px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 6, pointerEvents: "none" }} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee />


      {/* ── Opportunity Banner ── */}
      <section className="inf-section" style={{
        background: "transparent",
        padding: "100px 48px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{
            ...KT,
            fontSize: "clamp(32px,3.5vw,52px)",
            fontWeight: 800,
            lineHeight: 1.25,
            margin: "0 0 32px",
          }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              โอกาสใหม่
            </span>
            <br />
            <span style={{ color: "#111827" }}>เริ่มต้นได้ที่นี่</span>
          </h2>
          <p className="desc-text" style={{
            ...KT,
            color: "#111827",
            fontSize: "18px",
            lineHeight: 1.85,
            margin: 0,
            fontWeight: 400,
          }}>
            Buddy Review ทำให้การเป็นอินฟลูเอนเซอร์เป็นเรื่องง่ายขึ้น ด้วยระบบที่เชื่อมคุณกับแบรนด์ชั้นนำ<br />
            พร้อมทีมงานที่ช่วยเหลือในทุกขั้นตอน เพิ่มโอกาสสร้างรายได้จากการรีวิว
          </p>
        </div>
      </section>

      {/* ── Path to Partnership ── */}
      <PathToPartnership />

      {/* ── Unlock Exclusive Opportunities ── */}
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, margin: 0, lineHeight: 1.2, color: "#111827" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>Unlock Exclusive </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Opportunities</span>
            </h2>
          </div>

          {/* 3-column: left features | phone | right features */}
          <div className="unlock-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "2px", alignItems: "center" }}>

            {/* Left features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                { img: "/unlocked-exclusive/Unlocked Exclusive-01.png", title: "แบรนด์เชื่อถือได้", desc: "ไม่มีแบรนด์เงียบ ไม่มีงานปลอม\nมีแต่ความโปร" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-02.png", title: "จ่ายตรง ไม่มีเบี้ยว", desc: "งานจบ เงินไม่หาย กดเบิกเองได้ทุกเมื่อ รับตามรอบแบบตรงเวลา" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-03.png", title: "รีวิวได้ครบ", desc: "จบทุกแพลตฟอร์ม ให้คุณสามารถมีโอกาส รับงานรีวิวได้หลากหลายช่องทาง" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center — phone */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(95,38,229,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
              <Image
                className="unlock-phone-img"
                src="/buddy-rank-phone.png"
                alt="Buddy Rank"
                width={608}
                height={1200}
                style={{ width: "608px", height: "auto", display: "block", position: "relative", zIndex: 1 }}
              />
            </div>

            {/* Right features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {[
                { img: "/unlocked-exclusive/Unlocked Exclusive-04.png", title: "สิทธิพิเศษเฉพาะคุณ", desc: "ร่วมกิจกรรมและรับรางวัลสุดเอ็กซ์คลูซีฟ" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-05.png", title: "มืออาชีพที่อยู่เคียงข้างคุณ", desc: "ทำงานได้อย่างมั่นใจ ด้วยทีมงานมืออาชีพ และระบบที่ช่วยให้ทุกอย่างง่ายขึ้น" },
                { img: "/unlocked-exclusive/Unlocked Exclusive-06.png", title: "แมทช์งานที่ใช่", desc: "รู้งานใหม่ก่อนใคร ด้วยระบบคัดกรองที่แมทช์งานตรงใจ ให้คุณได้ทำงานที่ใช่จากสิ่งที่ชอบ" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div className="icon-wrap-lg" style={{ position: "relative", width: "78px", height: "78px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                    <Image className="unlock-icon-img" src={item.img} alt={item.title} width={172} height={172} style={{ width: "172px", height: "172px", objectFit: "contain" }} />
                  </div>
                  <div style={{ maxWidth: "800px" }}>
                    <h3 className="card-h3 unlock-title" style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: "0 0 8px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="unlock-desc" style={{ ...KT, fontSize: "15px", color: "#000000", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── Case Studies ── */}
      <SuccessStoriesSlider />


      {/* ── Testimonials ── */}
      <section className="inf-section" style={{ background: "transparent", padding: "100px 48px" }}>
        <div className="testimonials-outer" style={{ maxWidth: "1294px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "flex-start" }}>
          {/* Left: title */}
          <div className="testimonials-title" style={{ flex: "0 0 320px", paddingTop: "160px" }}>
            <h2 style={{
              ...KT,
              fontSize: "clamp(36px,4vw,58px)", fontWeight: 800,
              color: "#111827",
              margin: "0 0 20px", lineHeight: 1.15,
            }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>What </span>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontStyle: "italic", background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", whiteSpace: "nowrap" }}>
                They Say
              </span>
            </h2>
            <p style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
              เสียงจริงจากอินฟลูเอนเซอร์ที่ร่วมงานกับ Buddy Review
            </p>
          </div>
          {/* Right: masonry grid */}
          <div style={{ flex: 1 }}>
            <TestimonialsGrid dict={dict} />
          </div>
        </div>
      </section>


      {/* ── FAQs ── */}
      <FAQAccordion faqs={dict?.faqPage?.faqsInfluencer} lang={lang as Locale} variant="influencer" dict={dict} />

      {/* ── Contact Form ── */}
      <ContactFormSection lang={lang as Locale} dict={dict?.contactForm} />

      {/* ── Footer ── */}
      <Footer lang={lang as Locale} variant="influencer" dict={dict} />

    </div>
  );
}
