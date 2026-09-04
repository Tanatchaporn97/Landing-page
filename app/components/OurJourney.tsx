"use client";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
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

function Sparkle({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 0c0 5.2 1.3 8 6 8-4.7 0-6 2.8-6 8 0-5.2-1.3-8-6-8 4.7 0 6-2.8 6-8z" fill={color} />
    </svg>
  );
}

export default function OurJourney({ lang }: { lang: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [path, setPath] = useState<{ d: string; w: number; h: number }>({ d: "", w: 0, h: 0 });

  const recompute = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.innerWidth < 860) { setPath({ d: "", w: 0, h: 0 }); return; }
    const cRect = container.getBoundingClientRect();
    const points = nodeRefs.current
      .filter((el): el is HTMLDivElement => !!el)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - cRect.left, y: r.top + r.height / 2 - cRect.top };
      });
    if (points.length < 2) return;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      const midY = (prev.y + cur.y) / 2;
      d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`;
    }
    setPath({ d, w: cRect.width, h: cRect.height });
  }, []);

  useLayoutEffect(() => {
    recompute();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(recompute, 120); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [recompute, lang]);

  const sparkleColors = ["#ff0089", "#5f25e5", "#ff8bc7"];

  return (
    <div style={{ maxWidth: "1000px", margin: "80px auto 0", padding: "0 48px" }}>
      <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 64px" }}>
        <h2 className="section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 700, lineHeight: 1.3, color: "#111827", margin: 0 }}>
          Our{" "}
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Journey
          </span>
        </h2>
      </div>

      <div ref={containerRef} style={{ position: "relative" }}>
        {path.d && (
          <svg
            width={path.w} height={path.h}
            viewBox={`0 0 ${path.w} ${path.h}`}
            style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journey-line" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5f25e5" />
                <stop offset="100%" stopColor="#ff0089" />
              </linearGradient>
            </defs>
            <path d={path.d} fill="none" stroke="url(#journey-line)" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}

        {JOURNEY_STEPS.map((s, i) => {
          const nodeOnLeft = i % 2 === 0;
          return (
            <div key={s.year}
              className="journey-row"
              style={{
                position: "relative", zIndex: 1,
                display: "flex",
                flexDirection: nodeOnLeft ? "row" : "row-reverse",
                alignItems: "center",
                gap: "40px",
                minHeight: "220px",
                padding: "24px 0",
              }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div ref={(el) => { nodeRefs.current[i] = el; }}
                  style={{
                    width: "148px", height: "148px", borderRadius: "50%", overflow: "hidden",
                    position: "relative", border: "4px solid #ffffff",
                    boxShadow: "0 12px 32px rgba(95,38,229,0.20)",
                  }}>
                  <Image src={s.img} alt={s.year} fill sizes="148px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", top: "-10px", [nodeOnLeft ? "right" : "left"]: "-10px" } as React.CSSProperties}>
                  <Sparkle color={sparkleColors[i % sparkleColors.length]} />
                </div>
              </div>

              <div style={{ flex: 1, textAlign: nodeOnLeft ? "left" : "right" }}>
                <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 800, margin: "0 0 6px", lineHeight: 1.2,
                  background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.year}
                </h3>
                <p style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.4, color: "#111827" }}>
                  {lang === "th" ? s.subtitle : s.subtitleEn}
                </p>
                <p style={{ ...KT, fontSize: "14px", lineHeight: "1.7", color: "#374151", margin: "0 0 0 auto", maxWidth: "440px",
                  marginLeft: nodeOnLeft ? 0 : "auto", marginRight: nodeOnLeft ? "auto" : 0 }}>
                  {lang === "th" ? s.desc : s.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 859px){
          .journey-row{ flex-direction: column !important; text-align: center !important; gap: 20px !important; }
          .journey-row > div:last-child{ text-align: center !important; }
          .journey-row > div:last-child p{ margin-left: auto !important; margin-right: auto !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
