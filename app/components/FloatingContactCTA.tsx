"use client";
import { useState } from "react";
import Image from "next/image";
import ContactFormModal from "./ContactFormModal";

export default function FloatingContactCTA({ lang }: { lang: "th" | "en" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={lang === "th" ? "ติดต่อเรา" : "Contact us"}
        className="floating-contact-btn"
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 400,
          width: "50px", height: "50px", borderRadius: "50%",
          background: "#5f26e5",
          border: "none", boxShadow: "0 8px 24px rgba(95,38,229,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
        }}
      >
        <span style={{
          width: "26px", height: "26px",
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
          <Image src="/bd-mark.svg" alt="Buddy Review" fill sizes="26px" style={{ objectFit: "contain" }} />
        </span>
      </button>

      <ContactFormModal open={open} onClose={() => setOpen(false)} lang={lang} />

      <style>{`
        .floating-contact-btn:hover{ transform: scale(1.06); }
        .floating-contact-btn{ transition: transform 0.2s ease; }
        @media (max-width: 600px){
          .floating-contact-btn{ width: 44px !important; height: 44px !important; bottom: 16px !important; right: 16px !important; }
        }
      `}</style>
    </>
  );
}
