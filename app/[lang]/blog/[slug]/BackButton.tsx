"use client";
import { useRouter } from "next/navigation";
import { historyBack } from "../../../components/NavHistory";

export default function BackButton({ lang = "th", fallback = "blog" }: { lang?: "th" | "en"; fallback?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => historyBack(router, `/${lang}/${fallback}`)}
      className="btn-glass-purple"
      style={{
        borderRadius: "50px", padding: "10px 22px",
        textDecoration: "none",
        fontSize: "15px", fontWeight: 500,
        fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7"/>
      </svg>
      {lang === "th" ? "ย้อนกลับ" : "Back"}
    </button>
  );
}
