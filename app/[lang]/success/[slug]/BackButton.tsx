"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ lang = "th" }: { lang?: "th" | "en" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: "50px", padding: "10px 22px",
        color: "#5f26e5", textDecoration: "none",
        fontSize: "15px", fontWeight: 500,
        cursor: "pointer", fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7"/>
      </svg>
      {lang === "th" ? "ย้อนกลับ" : "Back"}
    </button>
  );
}
