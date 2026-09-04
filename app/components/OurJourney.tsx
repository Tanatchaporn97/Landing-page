"use client";
import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { type Locale } from "../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const JOURNEY_STEPS = [
  { year: "2015 - 2017", img: "/about-us/2015-2017.png",
    subtitle: "เราได้ทดลองและพัฒนาโปรดักต์หลากหลายโซลูชัน", subtitleEn: "We Experimented With and Built Multiple Product Solutions",
    desc: "เพื่อตอบโจทย์ผู้บริโภคคนไทย จากความมุ่งมั่นนี้เองที่ทำให้เราค้นพบโปรดักต์ที่สามารถแก้ปัญหาและมอบคุณค่าให้กับแบรนด์และอินฟลูเอนเซอร์ที่ต่อมาเราใช้ชื่อเรียกว่า 'Buddy Review'",
    descEn: "To meet the needs of Thai consumers — and it was this determination that led us to a product that could solve real problems and deliver value to brands and influencers, which we later named 'Buddy Review.'" },
  { year: "2018", img: "/about-us/2018.webp",
    subtitle: "เปิดตัว Buddy Review", subtitleEn: "Buddy Review Launches",
    desc: "Soft Launch อย่างเป็นทางการ ด้วยการเป็นแพลตฟอร์มที่พลิกโฉมวงการ ที่ทำให้แบรนด์และอินฟลูเอนเซอร์สามารถร่วมงานกันได้สะดวกมากขึ้น ปัญหาน้อยลง ด้วยเทคโนโลยีบนแพลตฟอร์มที่มีประสิทธิภาพ",
    descEn: "We officially soft-launched a platform that reshaped the industry — making it easier for brands and influencers to collaborate, with fewer problems, thanks to efficient platform technology." },
  { year: "2019", img: "/about-us/2019.webp",
    subtitle: "ก้าวสำคัญสู่ความมั่นคง", subtitleEn: "A Major Step Toward Stability",
    desc: "เริ่มก่อตั้งบริษัท 'บับเบิลลี จำกัด' อย่างเป็นทางการ เพื่อรองรับการเติบโตและสร้างความเชื่อมั่นให้กับลูกค้า พร้อมกับการพัฒนาระบบการจัดการและบริการที่ดียิ่งขึ้นเพื่อตอบโจทย์ลูกค้าในทุกกลุ่ม",
    descEn: "We officially founded Bubblely Co., Ltd. to support our growth and build client confidence, alongside better management systems and services to serve every customer segment." },
  { year: "2020", img: "/about-us/2020.webp",
    subtitle: "เติบโตท่ามกลางความท้าทาย", subtitleEn: "Growing Through Challenges",
    desc: "แม้จะเป็นช่วงที่ท้าทายสำหรับหลายธุรกิจ แต่ Buddy Review ยังคงมุ่งมั่นพัฒนาบริการและแพลตฟอร์มอย่างต่อเนื่อง พร้อมยังทำแคมเปญช่วยเหลือแบรนด์ SME และร่วมมือกับอินฟลูเอนเซอร์ที่มีจิตอาสาในช่วง COVID-19 เพื่อก้าวข้ามและเติบโตผ่านเวลาที่ลำบากไปด้วยกัน",
    descEn: "Even through a challenging time for many businesses, Buddy Review kept developing our services and platform — running campaigns to support SME brands and partnering with volunteer-minded influencers through COVID-19, growing through hard times together." },
  { year: "2022", img: "/about-us/2022.png",
    subtitle: "ขยายทีมครั้งใหญ่", subtitleEn: "A Major Team Expansion",
    desc: "แม้จะเป็นช่วงที่ท้าทายสำหรับหลายธุรกิจ แต่ Buddy Review ยังคงมุ่งมั่นพัฒนาบริการและแพลตฟอร์มอย่างต่อเนื่อง พร้อมยังทำแคมเปญช่วยเหลือแบรนด์ SME และร่วมมือกับอินฟลูเอนเซอร์ที่มีจิตอาสาในช่วง COVID-19 เพื่อก้าวข้ามและเติบโตผ่านเวลาที่ลำบากไปด้วยกัน",
    descEn: "Even through a challenging time for many businesses, Buddy Review kept developing our services and platform — running campaigns to support SME brands and partnering with volunteer-minded influencers through COVID-19, growing through hard times together." },
  { year: "2024", img: "/about-us/2024.png",
    subtitle: "อีกก้าวความสำเร็จ", subtitleEn: "Another Milestone of Success",
    desc: "เราได้ถูกจัดอันดับเป็นอันดับ 4 บริษัทหมวด Advertising & Marketing ที่เติบโตเร็วที่สุดในเอเชียแปซิฟิกจากการจัดอันดับโดย Financial Times",
    descEn: "We were ranked No. 4 among the fastest-growing Advertising & Marketing companies in Asia-Pacific by the Financial Times." },
  { year: "2025", img: "/about-us/2025.png",
    subtitle: "ตอกย้ำความสำเร็จอีกขั้น", subtitleEn: "Cementing Our Success Further",
    desc: "เราได้คว้าอันดับที่ 1 บริษัทหมวด Advertising & Marketing ที่มีอัตราการเติบโตที่เร็วที่สุดในประเทศไทยโดย Financial Times และยังได้รับรางวัล Top MarTech Providers for Growing Business 2025 โดย Content Shifu อีกด้วย",
    descEn: "We claimed No. 1 among the fastest-growing Advertising & Marketing companies in Thailand by the Financial Times, and also received the Top MarTech Providers for Growing Business 2025 award from Content Shifu." },
];

export default function OurJourney({ lang }: { lang: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateFocus = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const containerCenter = track.scrollLeft + track.clientWidth / 2;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      const t = Math.max(0, 1 - distance / (track.clientWidth * 0.55));
      const opacity = 0.22 + t * 0.78;
      const scale = 0.94 + t * 0.06;
      card.style.setProperty("--focus-opacity", opacity.toFixed(3));
      card.style.setProperty("--focus-scale", scale.toFixed(3));
    });
  }, []);

  useEffect(() => {
    updateFocus();
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateFocus); };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateFocus, lang]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * (track.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: "1294px", margin: "80px auto 0" }}>
      <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 40px", padding: "0 48px" }}>
        <h2 className="section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: 0 }}>
          Our{" "}
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Journey
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", padding: "0 48px", marginBottom: "16px" }}>
        <button className="arrow-cta-btn" onClick={() => scrollByCard(-1)} aria-label={lang === "th" ? "เลื่อนไปปีก่อนหน้า" : "Scroll to earlier year"}
          style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="arrow-cta-btn" onClick={() => scrollByCard(1)} aria-label={lang === "th" ? "เลื่อนไปปีถัดไป" : "Scroll to later year"}
          style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div ref={trackRef} className="journey-track" style={{
        display: "flex", gap: "32px", overflowX: "auto", scrollSnapType: "x mandatory",
        scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
        padding: "8px calc(50% - 150px) 24px",
      }}>
        {JOURNEY_STEPS.map((s, i) => (
          <div key={s.year}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="journey-card"
            style={{
              flexShrink: 0, width: "300px", scrollSnapAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              opacity: "var(--focus-opacity, 0.4)",
              transform: "scale(var(--focus-scale, 0.96))",
              transition: "opacity 0.15s linear, transform 0.15s linear",
            }}>
            <div style={{
              width: "148px", height: "148px", borderRadius: "50%", overflow: "hidden",
              position: "relative", border: "4px solid #ffffff",
              boxShadow: "0 12px 32px rgba(95,38,229,0.20)", marginBottom: "24px", flexShrink: 0,
            }}>
              <Image src={s.img} alt={s.year} fill sizes="148px" style={{ objectFit: "cover" }} />
            </div>
            <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2,
              background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {s.year}
            </h3>
            <p style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4, color: "#111827" }}>
              {lang === "th" ? s.subtitle : s.subtitleEn}
            </p>
            <p style={{ ...KT, fontSize: "14px", lineHeight: "1.7", color: "#374151", margin: 0 }}>
              {lang === "th" ? s.desc : s.descEn}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .journey-track::-webkit-scrollbar{ display: none; }
        @media (max-width: 640px){
          .journey-track{ padding-left: calc(50% - 130px) !important; padding-right: calc(50% - 130px) !important; }
          .journey-card{ width: 260px !important; }
        }
      `}</style>
    </div>
  );
}
