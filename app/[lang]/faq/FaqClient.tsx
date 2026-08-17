"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
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
      {fromInfluencer ? <Navbar lang={lang} variant="influencer" /> : <Navbar lang={lang} variant="home" />}

      {/* Hero */}
      <section className="faq-hero-section" style={{ padding: "160px 48px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 className="section-title text-center font-bold"
            style={{ fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px", fontFeatureSettings: "'pnum' on,'lnum' on", margin: "0 0 20px" }}>
            <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{dict?.faqPage?.title || "FAQs"}</span>
          </h1>
          <p className="desc-text" style={{ ...KT, fontSize: "18px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
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
                style={{ ...KT, fontSize: "16px", fontWeight: 600, borderRadius: "50px", padding: "12px 36px", border: "none", cursor: "pointer", transition: "background 0.25s, color 0.25s", background: activeTab === cat.key ? "#5f26e5" : "rgba(255,255,255,0.7)", color: activeTab === cat.key ? "#ffffff" : "#374151", boxShadow: activeTab === cat.key ? "0 4px 20px rgba(95,38,229,0.25)" : "0 2px 8px rgba(0,0,0,0.06)" }}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="faq-accordion-wrap"><FAQAccordion faqs={active.faqs} variant="home" hideCta={true} oneColumn={true} hideTitle={true} lang={lang} dict={dict} /></div>
        </div>
      </section>

      <Footer lang={lang} variant={fromInfluencer ? "influencer" : "home"} dict={dict} />
    </div>
  );
}
