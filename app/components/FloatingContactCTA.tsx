"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import thDict from "../../dictionaries/th.json";
import enDict from "../../dictionaries/en.json";

const ContactFormSection = dynamic(() => import("./ContactFormSection"));

export default function FloatingContactCTA({ lang }: { lang: "th" | "en" }) {
  const [open, setOpen] = useState(false);
  const dict = lang === "th" ? thDict : enDict;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={lang === "th" ? "ติดต่อเรา" : "Contact us"}
        className="floating-contact-btn"
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 400,
          width: "64px", height: "64px", borderRadius: "50%",
          background: "#5f26e5",
          border: "none", boxShadow: "0 8px 24px rgba(95,38,229,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
        }}
      >
        <span style={{
          width: "48px", height: "48px", borderRadius: "50%", background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
          overflow: "hidden",
        }}>
          <Image src="/icon.png" alt="Buddy Review" fill sizes="48px" style={{ objectFit: "contain", padding: "8px" }} />
        </span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(17,24,39,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px", overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", width: "100%", maxWidth: "1100px", margin: "auto",
              background: "linear-gradient(180deg, #F9F6FE 0%, #F1EBFA 100%)",
              borderRadius: "28px", maxHeight: "90vh", overflowY: "auto",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={lang === "th" ? "ปิด" : "Close"}
              style={{
                position: "absolute", top: "16px", right: "16px", zIndex: 2,
                width: "36px", height: "36px", borderRadius: "50%", background: "#ffffff",
                border: "1px solid rgba(95,38,229,0.18)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <ContactFormSection lang={lang} dict={(dict as any).contactForm} />
          </div>
        </div>
      )}

      <style>{`
        .floating-contact-btn:hover{ transform: scale(1.06); }
        .floating-contact-btn{ transition: transform 0.2s ease; }
        @media (max-width: 600px){
          .floating-contact-btn{ width: 56px !important; height: 56px !important; bottom: 16px !important; right: 16px !important; }
        }
      `}</style>
    </>
  );
}
