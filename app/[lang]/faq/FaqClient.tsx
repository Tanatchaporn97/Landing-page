"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Lazy load below-the-fold components
const FAQAccordion = dynamic(() => import("../../components/FAQAccordion"));

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

import { type Locale } from "../../../i18n-config";

export default function FaqClient({ lang, dict }: { lang: Locale, dict: any }) {
  const searchParams = useSearchParams();
  const fromInfluencer = searchParams.get("from") === "influencer";
  const [activeTab, setActiveTab] = useState(fromInfluencer ? "influencer" : "brand");

  const CATEGORIES = [
    { key: "brand", label: dict?.faqPage?.tabBrand || "สำหรับแบรนด์", faqs: dict?.faqPage?.faqsBrand || [] },
    { key: "influencer", label: dict?.faqPage?.tabInfluencer || "สำหรับอินฟลูเอนเซอร์", faqs: dict?.faqPage?.faqsInfluencer || [] },
  ];

  const active = CATEGORIES.find(c => c.key === activeTab)!;

  return (
    <div className="background" style={{ ...KT, overflowX: "hidden" }}>
      <Navbar lang={lang} variant="home" />

      {/* Hero */}
      <section className="faq-hero-section" style={{ padding: "160px 48px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 className="section-title text-center font-bold"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 20px" }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{dict?.faqPage?.title || "FAQs"}</span>
          </h1>
          <p className="desc-text" style={{ ...KT, fontSize: "16px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            {dict?.faqPage?.desc || "ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อทีมงานของเราได้ตลอดเวลา"}
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
                style={{ ...KT, fontSize: "16px", fontWeight: 600, borderRadius: "50px", padding: "12px 36px", cursor: "pointer", transition: "background 0.25s, color 0.25s, border-color 0.25s", background: activeTab === cat.key ? "#5f26e5" : "rgba(255,255,255,0.22)", backdropFilter: activeTab === cat.key ? "none" : "blur(18px)", WebkitBackdropFilter: activeTab === cat.key ? "none" : "blur(18px)", border: activeTab === cat.key ? "1px solid transparent" : "1px solid rgba(255,255,255,0.45)", color: activeTab === cat.key ? "#ffffff" : "#5f26e5", boxShadow: activeTab === cat.key ? "0 4px 20px rgba(95,38,229,0.25)" : "0 2px 8px rgba(0,0,0,0.06)" }}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="faq-accordion-wrap"><FAQAccordion faqs={active.faqs} variant="home" hideCta={true} oneColumn={true} hideTitle={true} lang={lang} dict={dict} /></div>

          {/* next step for each audience: brands → contact form, influencers → sign up via LINE */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "-24px" }}>
            {activeTab === "brand" ? (
              <Link href={`/${lang}/contact`} className="btn-glass-purple"
                style={{ ...KT, borderRadius: "50px", padding: "14px 40px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
                {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
              </Link>
            ) : (
              <a href="https://line.me/R/ti/p/@buddysupport" target="_blank" rel="noopener noreferrer" className="btn-glass-purple"
                style={{ ...KT, borderRadius: "50px", padding: "14px 40px", fontSize: "16px", fontWeight: 600, textDecoration: "none", gap: "10px" }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .348-.281.629-.629.629H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.628-.63.349 0 .63.285.63.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                {lang === "th" ? "สมัครเป็นอินฟลูฯ" : "Apply as an Influencer"}
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer lang={lang} variant={fromInfluencer ? "influencer" : "home"} dict={dict} />
    </div>
  );
}
