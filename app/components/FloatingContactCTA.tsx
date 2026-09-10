"use client";
import Link from "next/link";
import Image from "next/image";

export default function FloatingContactCTA({ lang }: { lang: "th" | "en" }) {
  return (
    <>
      <Link
        href={`/${lang}/contact`}
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
          width: "34px", height: "34px",
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
          <Image src="/bd-mark.svg" alt="Buddy Review" fill sizes="34px" style={{ objectFit: "contain" }} />
        </span>
      </Link>

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
