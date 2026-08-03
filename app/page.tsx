"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import LogoMarquee from "./components/LogoMarquee";
import CategoriesMarquee from "./components/CategoriesMarquee";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import KolPackagesSection from "./components/KolPackagesSection";
import BlogPostsSection from "./components/BlogPostsSection";
import FAQAccordion from "./components/FAQAccordion";
import ContactFormSection from "./components/ContactFormSection";
import Footer from "./components/Footer";


const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };


const DARK_BG = "transparent";

/* ── Icons ── */




const IconCheck = ({ color = "#5f26e5" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);




const FAQS_LANDING = [
          { q: "Buddy Review ให้บริการอะไรบ้าง", a: "เราให้บริการทำ Influencer Marketing แบบครบวงจร ตั้งแต่การวางกลยุทธ์ เลือกอินฟลูเอนเซอร์ที่เหมาะสม ติดต่อประสานงาน ตรวจสอบงาน และวัดผลสัมฤทธิ์แคมเปญ",
            qEn: "What services does Buddy Review offer?", aEn: "We provide full-service influencer marketing — from strategy planning and selecting the right influencers, to coordination, content review, and campaign performance measurement." },
          { q: "บริการของเราดีกว่าทำเองยังไง?", a: "การใช้บริการของเราช่วยให้คุณประหยัดเวลาและลดความยุ่งยากในการค้นหา คัดเลือก เจรจา และบริหารจัดการอินฟลูเอนเซอร์จำนวนมาก เรามีเครื่องมือและฐานข้อมูลที่แม่นยำ รวมถึงทีมงานมืออาชีพที่ดูแลให้คุณครบทุกขั้นตอน ตั้งแต่การวางแผนไปจนถึงการวัดผล ทำให้คุณมั่นใจได้ว่าจะได้อินฟลูเอนเซอร์ที่เหมาะสมและแคมเปญที่มีประสิทธิภาพสูงสุด",
            qEn: "How is your service better than doing it yourself?", aEn: "Using our service saves you time and removes the hassle of searching, vetting, negotiating with, and managing large numbers of influencers. We have precise tools and databases, plus a professional team handling every step from planning to measurement — so you can be confident you'll get the right influencers and the most effective campaign." },
          { q: "คิดค่าบริการอย่างไร?", a: "ค่าบริการขึ้นกับขนาดแคมเปญ จำนวนอินฟลูเอนเซอร์ และบริการที่คุณต้องการ โดยเรามีขั้นต่ำในการทำแคมเปญอยู่ที่ 100,000 บาทต่อแคมเปญ",
            qEn: "How is pricing calculated?", aEn: "Pricing depends on campaign size, number of influencers, and the services you need. Our minimum campaign budget is 100,000 THB per campaign." },
          { q: "ต้องเตรียมอะไรบ้างก่อนเริ่มแคมเปญ?", a: "แจ้งวัตถุประสงค์แคมเปญ งบประมาณ กลุ่มเป้าหมาย และรายละเอียดสินค้า/บริการ ส่วนที่เหลือเราจะดูแลให้ทั้งหมด",
            qEn: "What do I need to prepare before starting a campaign?", aEn: "Just share your campaign objective, budget, target audience, and product/service details — we'll take care of the rest." },
          { q: "ใช้อะไรในการคัดเลือกอินฟลูเอนเซอร์?", a: "เราใช้ระบบวิเคราะห์ข้อมูลเชิงลึก (Data-Driven Matching) ที่สามารถดูได้ทั้ง Demographic, Engagement, Unique Follower Overlap และประวัติการทำแคมเปญ เพื่อคัดเลือกอินฟลูเอนเซอร์ตรงกับเป้าหมายของแบรนด์และแมทช์กับกลุ่มผู้ติดตามของอินฟลูเอนเซอร์มากที่สุด",
            qEn: "How do you select influencers?", aEn: "We use a data-driven matching system that analyzes demographics, engagement, unique follower overlap, and campaign history — selecting influencers that align with your brand goals and best match their followers' audience." },
          { q: "สามารถขอรีพอร์ตเมื่อจบแคมเปญได้หรือไม่?", a: "คุณจะได้รับรายงานผลแคมเปญที่ครอบคลุม เช่น ยอด Reach, Engagement, ROI, อินฟลูเอนเซอร์ที่ทำผลงานดีสุด และข้อมูลเชิงลึกสำหรับพัฒนาในการทำแคมเปญถัดไป",
            qEn: "Can I get a report after the campaign ends?", aEn: "You'll receive a comprehensive campaign report covering Reach, Engagement, ROI, top-performing influencers, and insights to improve your next campaign." },
          { q: "สามารถเลือกอินฟลูเอนเซอร์เองได้ไหม?", a: "หากคุณมีอินฟลูเอนเซอร์ที่สนใจเป็นพิเศษ สามารถให้เราติดต่อหรือแนะนำอินฟลูเอนเซอร์ที่คล้ายคลึงกันได้ โดยเราจะเป็นคนติดต่อให้กับคุณเองทั้งหมด",
            qEn: "Can I choose my own influencers?", aEn: "If there's a specific influencer you're interested in, we can reach out on your behalf or recommend similar ones — we'll handle all the outreach for you." },
          { q: "แคมเปญสามารถลงได้บนแพลตฟอร์มไหนบ้าง?", a: "เรารองรับทุกแพลตฟอร์มหลัก เช่น Instagram, Facebook, TikTok, YouTube, X (Twitter), และ Lemon8 โดยเราสามารถแนะนำความเหมาะสมกับกลุ่มเป้าหมาย คอนเทนต์และจุดประสงค์แคมเปญ",
            qEn: "Which platforms can campaigns run on?", aEn: "We support all major platforms including Instagram, Facebook, TikTok, YouTube, X (Twitter), and Lemon8 — and can recommend the best fit based on your target audience, content, and campaign goals." },
        ];

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const t = lang === "th" ? th : en;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  const csRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const catSlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");




  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{
      ...KT,
      backgroundImage: "url('/light-gradient-landing-bg.jpg')",
      backgroundSize: "100% 100%",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
    }}>

      {/* ── Navbar ── */}
      <Navbar variant="home" lang={lang} onLangChange={setLang} />

      {/* ── Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 relative hero-section"
        style={{
          minHeight: "72vh",
          paddingTop: "128px",
          paddingBottom: "64px",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Background image */}
        <Image src="/header-landing-bg3.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" style={{
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }} />
        <div className="relative" style={{ maxWidth: "1100px", zIndex: 2 }}>
          <h1 className="font-bold uppercase mb-6 hero-h1"
            style={{ color: "#ffffff", fontSize: "clamp(28px,3.9vw,56px)", lineHeight: "84px", textAlign: "center",
              fontFeatureSettings: "'pnum' on,'lnum' on",
              textShadow: "0 2px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)" }}>
            {t.headline1}<br/>{t.headline2}
          </h1>
          <h2 className="font-normal mb-12"
            style={{ color: "#ffffff", fontSize: "clamp(18px,1.8vw,28px)", lineHeight: "1.7", textAlign: "center",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 48px" }}>
            From Strategy To Insight,<span className="hero-subline-break"> We Turn Influence Into Impact.</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#solutions" className="btn-hero font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none", color: "#5f26e5" }}>
              {t.imBrand}
            </a>
            <Link href="/influencer" className="btn-hero btn-hero-solid-purple font-semibold hero-btn"
              style={{ ...KT, fontSize: "16px", padding: "14px 32px", minWidth: "176px", borderRadius: "50px", textDecoration: "none" }}>
              {t.imInfluencer}
            </Link>
          </div>

          {/* Impact Stats — static figures from Success Stories section */}
          <div className="hero-stats-strip" style={{
            display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "22px",
            marginTop: "76px",
          }}>
            {[
              { value: "1,000,000+", label: lang === "th" ? "เครือข่ายอินฟลูเอนเซอร์" : "Influencer Network" },
              { value: "1,000+", label: lang === "th" ? "ลูกค้าที่ไว้วางใจ" : "Trusted Clients" },
              { value: "4,000+", label: lang === "th" ? "แคมเปญที่ส่งมอบ" : "Campaigns Delivered" },
            ].map((s) => (
              <div key={s.label} className="hero-stat-item" style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "6px",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                borderRadius: "20px",
                padding: "26px 20px",
                width: "280px",
                boxSizing: "border-box",
              }}>
                <span style={{
                  ...KT, fontSize: "clamp(20px,2.7vw,39px)", fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap",
                  background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {s.value}
                </span>
                <span style={{ ...KT, fontSize: "clamp(13px,1.3vw,20px)", fontWeight: 500, color: "#111827", lineHeight: 1.35, whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── Hero → Logos fade overlay ── */}
      <div style={{ height: "120px", marginTop: "-120px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", position: "relative", zIndex: 11, pointerEvents: "none" }} />

      {/* ── Brand Logos Marquee ── */}
      <LogoMarquee />

      {/* ── Your Trusted Partner ── */}
      <section style={{ background: DARK_BG, paddingTop: "80px", paddingBottom: "80px" }} className="px-6 trusted-section">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          {/* Heading */}
          <div className="text-center mb-12" style={{ maxWidth: "954px", margin: "0 auto 48px" }}>
            <h2 className="font-bold mb-6 heading-lh-55"
              style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "55px", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Your Trusted Partner in Thailand&apos;s<br/>Influencer Marketing Landscape
            </h2>
            <p className="font-normal desc-text"
              style={{ fontSize: "18px", lineHeight: "1.7", textAlign: "center",
                textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on",
                color: "#111827" }}>
              {lang === "th" ? (
                <>เอเจนซี่ Influencer Marketing ที่ผสานข้อมูล เทคโนโลยี และทีมผู้เชี่ยวชาญ<br/>
                เพื่อออกแบบแคมเปญที่แม่นยำ วัดผลได้ และสร้างการเติบโตทางธุรกิจอย่างยั่งยืน</>
              ) : (
                <>An Influencer Marketing agency blending data, technology, and expert teams<br/>
                to craft precise, measurable campaigns that drive sustainable business growth.</>
              )}
            </p>
          </div>

          {/* 4 Photo Cards */}
          <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { src: "/card1.jpg", title: "Built on Clarity",           desc: "ทำงานเป็นระบบที่ชัดเจนตามมาตรฐาน",       descEn: "Working within a clear, standardized system." },
              { src: "/card2.jpg", title: "Teamwork with Intelligence", desc: "ทีมที่เข้าใจ ทำให้ทุกแคมเปญสำเร็จ",       descEn: "A team that understands you, making every campaign succeed." },
              { src: "/card3.png", title: "Data-Driven Precision",      desc: "เทคโนโลยีช่วยให้คุณตัดสินใจง่ายขึ้น",     descEn: "Technology that makes your decisions easier." },
              { src: "/card4.png", title: "Success Delivered",          desc: "ทุกแคมเปญ มุ่งสู่ความสำเร็จที่ชัดเจน",     descEn: "Every campaign, driven toward clear, measurable success." },
            ].map((card) => (
              <div key={card.title} className="relative overflow-hidden photo-card-h"
                style={{ height: "403px", borderRadius: "24px" }}>
                <Image src={card.src} alt={card.title} fill className="object-cover object-top" sizes="280px"/>
                <div className="absolute bottom-0 left-0 right-0"
                  style={{ background: "linear-gradient(to top,rgba(95,38,229,1) 0%,rgba(95,38,229,0) 100%)",
                    padding: "29px 18px" }}>
                  <h3 className="text-white font-medium text-center"
                    style={{ fontSize: "24px", lineHeight: "1.2", textTransform: "capitalize",
                      fontFeatureSettings: "'pnum' on,'lnum' on", marginBottom: "8px" }}>
                    {card.title}
                  </h3>
                  <p className="text-white font-normal text-center"
                    style={{ fontSize: "16px", lineHeight: "1.5" }}>
                    {lang === "th" ? card.desc : card.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buddy Review Solutions ── */}
      <section id="solutions" style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>

          {/* Heading */}
          <h2 className="text-center font-bold mb-14 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on", color: "#111827", margin: "0 0 56px" }}>
            Buddy Review{" "}
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Solutions
            </span>
          </h2>

          {/* 4 services in 2×2 grid */}
          <div className="grid-4-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "32px 24px" }}>
              {[
                { icon: "/icon-photo-video.png", title: "Photo / Video Production",
                  desc: "การผลิตภาพถ่ายและวิดีโอสำหรับใช้ในคอนเทนต์และการสื่อสารของแบรนด์",
                  descEn: "Photo and video production for your brand's content and communications." },
                { icon: "/icon-onsite.png", title: "On-site Campaign & Staff Support",
                  desc: "การดูแลและประสานงานแคมเปญในสถานที่จริง พร้อมจัดทีมงานซัพพอร์ต",
                  descEn: "On-the-ground campaign management and coordination, with staff support included." },
                { icon: "/icon-ondemand.png", title: "On-Demand & Fast-Track Campaigns",
                  desc: "แคมเปญที่เริ่มและดำเนินงานได้รวดเร็ว ตอบโจทย์แบรนด์ในเวลาจำกัด",
                  descEn: "Campaigns that launch and run fast, built for brands working against the clock." },
                { icon: "/icon-network.png", title: "Influencer Network",
                  desc: "เครือข่ายอินฟลูเอนเซอร์ที่หลากหลาย เชื่อมต่อให้เหมาะกับแบรนด์ของคุณ",
                  descEn: "A diverse influencer network, matched to fit your brand." },
              ].map(({ icon, title, desc, descEn }) => (
                <div key={title} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="icon-wrap-lg" style={{ background: "#ede9f8", borderRadius: "50%",
                    width: "68px", height: "68px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "flex-start" }}>
                    <span style={{ display: "inline-block", width: "40px", height: "40px",
                      backgroundColor: "#5f26e5",
                      WebkitMaskImage: `url(${icon})`, WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
                      maskImage: `url(${icon})`, maskSize: "contain",
                      maskRepeat: "no-repeat", maskPosition: "center" }} />
                  </div>
                  <h3 className="card-h3" style={{ ...KT, fontSize: "24px", fontWeight: 700, color: "#111827",
                    lineHeight: "1.3", margin: 0 }}>{title}</h3>
                  <p style={{ ...KT, fontSize: "16px", lineHeight: "1.7", color: "#111827", margin: 0 }}>{lang === "th" ? desc : descEn}</p>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* ── Success Stories (card carousel, reference: ฉันคืออินฟลูเอนเซอร์ page) ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Heading — matches site-standard section heading style */}
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Success{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Stories</span>
          </h2>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button onClick={() => csRef.current?.scrollBy({ left: -400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(95,38,229,0.10)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 3L6 9l6 6" stroke="#5f26e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => csRef.current?.scrollBy({ left: 400, behavior: "smooth" })} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5f26e5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Cards scroll row */}
          <div ref={csRef} style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"], paddingBottom: "8px" }}>

            {/* ── Cards ── */}
            {[
              { href: "/success/nissin",         img: "/success-stories-2/Success stories-08.jpg", cat: "FOOD & BEVERAGE",  title: "Nissin",          tagline: "ปลุกกระแสคนหิวบนโซเชียลด้วยรสชาติใหม่ ต้มยำกุ้งแซ่บซีส",          taglineEn: "Sparking social media food cravings with a bold new flavor: spicy Tom Yum Kung cheese." },
              { href: "/success/ldc-dental",     img: "/success-stories-2/Success stories-09.jpg", cat: "DENTAL CARE",      title: "LDC Dental",      tagline: "รีวิวจัดฟันใสจากอินฟลูฯ สู่กิจกรรมสุดเอ็กซ์คลูซีฟจาก LDC Dental", taglineEn: "Clear-aligner reviews from influencers, leading into an exclusive event with LDC Dental." },
              { href: "/success/watsons",        img: "/success-stories-2/Success stories-10.jpg", cat: "HEALTH & BEAUTY",  title: "Watsons",         tagline: "House Brand ปังด้วยพลังอินฟลูฯ บน TikTok & Lemon8",               taglineEn: "House-brand products taking off with influencer power on TikTok & Lemon8." },
              { href: "/success/viu",            img: "/success-stories-2/Success stories-11.jpg", cat: "ENTERTAINMENT",    title: "Viu",             tagline: "อินฟลูเอนเซอร์พลังท้องถิ่น สร้างสีสันแคมเปญ อีสานชมวิว",          taglineEn: "Local-powered influencers bringing the \"Isan Chom Wiew\" campaign to life." },
              { href: "/success/ahc",            img: "/success-stories-2/Success stories-12.jpg", cat: "SKINCARE",         title: "AHC",             tagline: "ปลุกกระแสแบรนด์ด้วยอีเวนต์จากซีรีส์สุดไวรัล 'AHC Skin Game'",   taglineEn: "Igniting brand buzz with an event inspired by the viral series \"AHC Skin Game.\"" },
              { href: "/success/guss-damn-good", img: "/success-stories-2/Success stories-13.jpg", cat: "FOOD & BEVERAGE",  title: "Guss Damn Good",  tagline: "รสชาติที่มีเรื่องเล่า เมื่อไอศครีมเจอกับผงฟู้คลายกรดลดแน่นเฟ้อ",   taglineEn: "A flavor with a story: when ice cream meets antacid powder." },
            ].map(card => (
              <Link key={card.href} href={card.href} className="cs-card-link" style={{ textDecoration: "none", flexShrink: 0, width: "390px", scrollSnapAlign: "start" }}>
                <div className="cs-card" style={{
                  borderRadius: "28px", height: "520px",
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxSizing: "border-box",
                }}>
                  <div className="cs-card-img-clip" style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={card.img} alt={card.title} className="cs-card-img" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="cs-card-overlay" />
                  {/* Arrow button — top right */}
                  <div style={{ position: "absolute", top: "28px", right: "28px", zIndex: 2 }}>
                    <div className="cs-arrow-btn" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5f26e5", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="cs-arrow-path" d="M4 12L12 4M12 4H6M12 4V10" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  {/* Category pill */}
                  <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/category/${catSlug(card.cat)}`); }}
                      className="cs-cat-btn" style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: 700, color: "#ffffff", background: "#5f26e5", borderRadius: "50px", padding: "6px 16px", letterSpacing: "0.08em", border: "none", cursor: "pointer" }}
                    >
                      {card.cat}
                    </button>
                  </div>
                  {/* Bottom info */}
                  <div className="cs-card-title" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                    <h3 style={{ ...KT, fontSize: "29px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="cs-card-tagline" style={{ ...KT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"], overflow: "hidden" }}>{lang === "th" ? card.tagline : card.taglineEn}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* dummy spacer so last card doesn't stick to edge */}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>

          {/* ดูเพิ่มเติม CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <Link href="/success" className="btn-insight" style={{
              ...KT,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "14px 48px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {t.viewMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Influencers ── */}
      <section style={{ background: DARK_BG }} className="py-20 px-6">
        <div style={{ maxWidth: "1294px", margin: "0 auto" }}>
          <h2 className="section-title text-center font-bold mb-12"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "85px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Trust{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Influencers</span>
          </h2>

          {/* Infinite marquee — auto-slides right to left */}
          <TestimonialsCarousel lang={lang} />
        </div>
      </section>

      {/* ── Influencer Categories ── */}
      <section style={{ background: DARK_BG, overflow: "hidden" }} className="py-20">
        <div style={{ maxWidth: "1294px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
              textTransform: "capitalize", fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Influencer{" "}
            <span style={{
              background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Categories</span>
          </h2>
        </div>

        <CategoriesMarquee />
      </section>

      {/* ── KOL Campaign Packages ── */}
      <KolPackagesSection lang={lang} />

      {/* ── Industry Insights ── */}
      <BlogPostsSection lang={lang} />

      {/* ── FAQs ── */}
      <FAQAccordion faqs={FAQS_LANDING} lang={lang} variant="home" />

      {/* ── Contact Us ── */}
      <ContactFormSection lang={lang} />

      {/* ── Footer ── */}
      <Footer variant="home" />

    </div>
  );
}

const th = {
  contactUs:    "ติดต่อเรา",
  imInfluencer: "ฉันคืออินฟลูเอนเซอร์",
  imBrand:      "ฉันคือแบรนด์",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "พร้อมเริ่มต้นแล้วหรือยัง?",
  ctaSub:       "เข้าร่วมกับแบรนด์และอินฟลูเอนเซอร์หลายร้อยรายที่เติบโตกับ Buddy Review",
  viewMore:     "ดูเพิ่มเติม",
  readMore:     "อ่านเพิ่มเติม",
  showLess:     "ดูน้อยลง",
  stillHaveQuestions: "มีคำถามเพิ่มเติมไหม?",
};

const en = {
  contactUs:    "Contact Us",
  imInfluencer: "I'm an Influencer",
  imBrand:      "I'm a Brand",
  headline1:    "DATA-POWERED INFLUENCER MARKETING",
  headline2:    "FOR MEASURABLE GROWTH",
  subline:      "From Strategy To Insight, We Turn Influence Into Impact.",
  ctaTitle:     "Ready to get started?",
  ctaSub:       "Join hundreds of brands and influencers already growing with Buddy Review.",
  viewMore:     "View More",
  readMore:     "Read More",
  showLess:     "Show Less",
  stillHaveQuestions: "Still have questions?",
};
