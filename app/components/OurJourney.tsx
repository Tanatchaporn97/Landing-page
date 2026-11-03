"use client";
import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { type Locale } from "../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
// soft purple shadow cast by each picture's own shape (same tone as the cards in the 2026 visual);
// 2026 carries its shadows inside the artwork, so it skips this
const OBJ_SHADOW = "drop-shadow(0 14px 22px rgba(60,30,150,0.22)) drop-shadow(0 3px 6px rgba(60,30,150,0.10))";

const JOURNEY_STEPS = [
  { year: "2015 - 2017", img: "/about-us/2015-2017.png", ratio: "2084 / 1876",
    subtitle: "เราได้ทดลองและพัฒนาโปรดักต์หลากหลายโซลูชัน", subtitleEn: "Exploring Ideas, Building Solutions",
    desc: "เพื่อตอบโจทย์ผู้บริโภคคนไทย จากความมุ่งมั่นนี้เองที่ทำให้เราค้นพบโปรดักต์ที่สามารถแก้ปัญหาและมอบคุณค่าให้กับแบรนด์และอินฟลูเอนเซอร์ที่ต่อมาเราใช้ชื่อเรียกว่า 'Buddy Review'",
    descEn: "Our journey began with experimenting and developing solutions for Thai consumers. Along the way, we discovered an opportunity to solve real challenges for brands and influencers, leading to the creation of Buddy Review." },
  { year: "2018", img: "/about-us/2018.webp", ratio: "887 / 575",
    subtitle: "เปิดตัว Buddy Review", subtitleEn: "The Launch of Buddy Review",
    desc: "Soft Launch อย่างเป็นทางการ ด้วยการเป็นแพลตฟอร์มที่พลิกโฉมวงการ ที่ทำให้แบรนด์และอินฟลูเอนเซอร์สามารถร่วมงานกันได้สะดวกมากขึ้น ปัญหาน้อยลง ด้วยเทคโนโลยีบนแพลตฟอร์มที่มีประสิทธิภาพ",
    descEn: "Buddy Review officially soft-launched its platform, connecting brands and influencers through technology that simplifies collaboration and streamlines workflows." },
  { year: "2019", img: "/about-us/2019.webp", ratio: "1400 / 1237", imgWidth: "90%",
    subtitle: "ก้าวสำคัญสู่ความมั่นคง", subtitleEn: "Building a Stronger Foundation",
    desc: "เริ่มก่อตั้งบริษัท 'บับเบิลลี จำกัด' อย่างเป็นทางการ เพื่อรองรับการเติบโตและสร้างความเชื่อมั่นให้กับลูกค้า พร้อมกับการพัฒนาระบบการจัดการและบริการที่ดียิ่งขึ้นเพื่อตอบโจทย์ลูกค้าในทุกกลุ่ม",
    descEn: "Bubblely Co., Ltd. was officially established to strengthen our business foundation, build client confidence, and improve our management systems and services." },
  { year: "2020", img: "/about-us/2020.webp", ratio: "1400 / 580",
    subtitle: "เติบโตท่ามกลางความท้าทาย", subtitleEn: "Growing Through Challenges",
    desc: "ท่ามกลางสถานการณ์ COVID-19 Buddy Review ยังคงพัฒนาบริการและแพลตฟอร์มอย่างต่อเนื่อง พร้อมจัดแคมเปญช่วยเหลือแบรนด์ SME โดยร่วมมือกับอิ⁠น⁠ฟ⁠ลู⁠เ⁠อ⁠น⁠เ⁠ซ⁠อ⁠ร์จิ⁠ต⁠อ⁠า⁠ส⁠า เพื่อสนับสนุนให้ธุรกิจและทุกฝ่ายก้าวผ่านช่วงเวลาที่ยากลำบากไปด้วยกัน",
    descEn: "During the COVID-19 pandemic, Buddy Review continued improving its platform and services while collaborating with volunteer influencers on campaigns to support SME brands through challenging times." },
  { year: "2022", img: "/about-us/2022.png", ratio: "3275 / 1166", wide: true,
    subtitle: "ขยายทีมครั้งใหญ่", subtitleEn: "A Major Team Expansion",
    desc: "Buddy Review เดินหน้าขยายทีมงานค⁠รั้⁠ง⁠สำ⁠คั⁠ญ เพื่อรองรับการเติบโตของธุรกิจและความต้องการของลูกค้าที่เพิ่มขึ้น พร้อมเสริมความแข็งแกร่งในการให้บริการและบริหารแคมเปญ Influencer Marketing ได้อย่างมีประสิทธิภาพยิ่งขึ้น",
    descEn: "Buddy Review significantly expanded its team to meet increasing client demand and strengthen its capabilities in managing influencer marketing campaigns." },
  { year: "2024", img: "/about-us/2024.png", ratio: "1328 / 600", wide: true, maxWidth: "310px",
    subtitle: "อีกก้าวความสำเร็จ", subtitleEn: "Another Milestone of Success",
    desc: "เราได้ถูกจัดอันดับเป็นอันดับ 4 บริษัทหมวด Advertising & Marketing ที่เติบโตเร็วที่สุดในเอเชียแปซิฟิกจากการจัดอันดับโดย Financial Times",
    descEn: "Buddy Review was ranked No. 4 among the fastest-growing companies in the Advertising & Marketing category in Asia-Pacific by the Financial Times." },
  { year: "2025", img: "/about-us/2025.png", ratio: "1600 / 626", wide: true, maxWidth: "530px",
    subtitle: "ตอกย้ำความสำเร็จอีกขั้น", subtitleEn: "Recognized for Excellence in Thailand",
    desc: "เราได้คว้าอันดับที่ 1 บริษัทหมวด Advertising & Marketing ที่มีอัตราการเติบโตที่เร็วที่สุดในประเทศไทยโดย Financial Times และยังได้รับรางวัล Top MarTech Providers for Growing Business 2025 โดย Content Shifu อีกด้วย",
    descEn: "Buddy Review was ranked No. 1 among the fastest-growing companies in Thailand's Advertising & Marketing category by the Financial Times and received the Top MarTech Providers for Growing Business 2025 award from Content Shifu." },
  { year: "2026", img: "/about-us/2026-match-v6.png", ratio: "1880 / 1180", wide: true, maxWidth: "440px", ownShadow: true,
    subtitle: "ฐานข้อมูล Influencer ทะลุ 1 ล้านโปรไฟล์", subtitleEn: "Influencer Database Surpasses 1 Million Profiles",
    desc: "เราขยายฐานข้อมูล Influencer จนมีมากกว่า 1 ล้านโปรไฟล์จากหลายแพลตฟอร์ม และนำข้อมูลเหล่านี้มาพัฒนา KOL Discovery ให้แบรนด์ค้นหา Influencer ได้ตรงความต้องการมากขึ้น รวมถึง Buddy Rank ที่ช่วยวิเคราะห์โปรไฟล์และแนะนำแนวทางพัฒนาช่องให้กับ Influencer",
    descEn: "Our influencer database surpassed 1 million profiles across multiple platforms, supporting the development of KOL Discovery to help brands find suitable influencers and Buddy Rank to analyze creator profiles and recommend ways to grow their channels." },
];

export default function OurJourney({ lang }: { lang: Locale }) {
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateProgress = useCallback(() => {
    const wrap = trackWrapRef.current;
    const progress = progressRef.current;
    if (!wrap || !progress) return;
    const rect = wrap.getBoundingClientRect();
    const threshold = window.innerHeight * 0.55;
    const raw = (threshold - rect.top) / rect.height;
    const t = Math.min(1, Math.max(0, raw));
    const heightPx = t * rect.height;
    progress.style.height = `${heightPx}px`;

    blockRefs.current.forEach((block, i) => {
      const dot = dotRefs.current[i];
      if (!block || !dot) return;
      dot.style.top = `${block.offsetTop + 18}px`;
      const passed = block.offsetTop + 18 <= heightPx;
      dot.style.background = passed
        ? "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)"
        : "#e5e0f5";
    });
  }, []);

  useEffect(() => {
    updateProgress();
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateProgress); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateProgress]);

  return (
    <div style={{ maxWidth: "1000px", margin: "80px auto 0", padding: "0 48px" }}>
      <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 56px" }}>
        <h2 className="section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: "0 0 20px" }}>
          Our{" "}
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Journey
          </span>
        </h2>
        <p className="desc-text" style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.85, margin: 0 }}>
          {lang === "th"
            ? <>จากจุดเริ่มต้นของ Influencer Marketing Platform สู่ Partner ที่ช่วยแบรนด์วางแผน บริหาร และวัดผล<br className="oj-br" /><span className="oj-sp"> </span>Influencer Marketing แบบ End-to-End ผ่านทีมผู้เชี่ยวชาญ Data และ Technology</>
            : "From an influencer marketing platform to a full-service strategic partner, combining industry expertise, data, and technology to help brands plan, manage, and measure campaigns from start to finish."}
        </p>
        {/* desktop: line 2 starts at "Influencer Marketing แบบ End-to-End…"; phones wrap naturally */}
        <style>{`.oj-sp{ display: none; } @media (max-width: 767px){ .oj-br{ display: none; } .oj-sp{ display: inline; } }`}</style>
      </div>

      <div ref={trackWrapRef} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* center divider — track + scroll-driven progress, same automation as How We Run Campaigns */}
        <div className="journey-center-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "4px", borderRadius: "2px", background: "rgba(95,38,229,0.12)", transform: "translateX(-50%)" }} />
        <div ref={progressRef} className="journey-center-line" style={{ position: "absolute", left: "50%", top: 0, width: "4px", borderRadius: "2px", background: "linear-gradient(180deg, #5f25e5 0%, #ff0089 100%)", transform: "translateX(-50%)", transition: "height 0.1s linear" }} />

        {JOURNEY_STEPS.map((_, i) => (
          <div key={`dot-${JOURNEY_STEPS[i].year}`}
            ref={(el) => { dotRefs.current[i] = el; }}
            className="journey-dot"
            style={{
              position: "absolute", left: "50%", top: 0,
              width: "16px", height: "16px", borderRadius: "50%",
              background: "#e5e0f5", border: "3px solid #ffffff",
              boxShadow: "0 2px 8px rgba(95,38,229,0.25)",
              transform: "translate(-50%, -50%)", zIndex: 1,
            }} />
        ))}

        {JOURNEY_STEPS.map((s, i) => {
          const onRight = i % 2 === 1;
          return (
            <div key={s.year} className="journey-step" style={{ marginTop: i === 0 ? 0 : "-56px" }}>
              <div
                ref={(el) => { blockRefs.current[i] = el; }}
                className="journey-block"
                style={{
                  position: "relative",
                  maxWidth: "44%",
                  marginLeft: onRight ? "auto" : 0,
                  marginRight: onRight ? 0 : "auto",
                  textAlign: onRight ? "right" : "left",
                }}>
                <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2,
                  background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.year}
                </h3>
                <p style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4, color: "#111827" }}>
                  {lang === "th" ? s.subtitle : s.subtitleEn}
                </p>
                <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: "0 0 24px", textWrap: "pretty" }}>
                  {lang === "th" ? s.desc : s.descEn}
                </p>
                {!s.wide && (
                  <div className="journey-img" style={{
                    position: "relative", width: s.imgWidth ?? "100%", aspectRatio: s.ratio, marginTop: "24px",
                    marginLeft: onRight ? "auto" : 0, marginRight: onRight ? 0 : "auto",
                  }}>
                    <Image src={s.img} alt={s.year} fill sizes="(max-width: 768px) 100vw, 460px" style={{ objectFit: "contain", objectPosition: onRight ? "right" : "left", filter: s.ownShadow ? undefined : OBJ_SHADOW }} />
                  </div>
                )}
              </div>

              {/* Wide-format photos break out of the 44% column so they render larger without cropping,
                  but stay aligned under the same side as their entry's text */}
              {s.wide && (
                <div className="journey-wide-img" data-year={s.year} style={{
                  position: "relative", width: "100%", maxWidth: s.maxWidth ?? "820px", aspectRatio: s.ratio,
                  marginTop: "24px",
                  marginLeft: onRight ? "auto" : 0,
                  marginRight: onRight ? 0 : "auto",
                }}>
                  <Image src={s.img} alt={s.year} fill sizes="(max-width: 900px) 100vw, 820px" style={{ objectFit: "contain", objectPosition: onRight ? "right" : "left", filter: s.ownShadow ? undefined : OBJ_SHADOW }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 860px){
          .journey-center-line, .journey-dot{ display: none !important; }
        }
        @media (max-width: 640px){
          /* phones: even out the photos — 2022's file is mostly transparent margin (photo ≈ 56% of its
             width), so crop to the photo and let it fill the column; the 2024 badge fills its whole file,
             so cap it to sit at a similar visual size */
          /* every year's picture sits centred in the column (text stays left-aligned) */
          .journey-img, .journey-wide-img:not([data-year="2022"]){ margin-left: auto !important; margin-right: auto !important; }
          .journey-img img, .journey-wide-img img{ object-position: center !important; }
          .journey-wide-img[data-year="2022"]{ aspect-ratio: 1841 / 1088 !important; width: 112% !important; max-width: 112% !important; margin-left: -6% !important; margin-right: -6% !important; }
          .journey-wide-img[data-year="2022"] img{ object-fit: cover !important; object-position: center !important; }
          .journey-wide-img[data-year="2024"]{ max-width: 66% !important; }
          .journey-block{ max-width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; text-align: left !important; }
          .journey-step{ margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
