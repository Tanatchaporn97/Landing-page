"use client";
import { Rocket, Eye, CheckCircle2, Store, Clapperboard, Repeat } from "lucide-react";
import { motion } from "motion/react";
import { TiltCard } from "@/components/ui/standard-card";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const GOALS = [
  { num: "01", Icon: Rocket, title: "Launch",
    desc: "เปิดตัวสินค้า บริการ หรือแคมเปญใหม่",
    descEn: "Launch a new product, service, or campaign." },
  { num: "02", Icon: Eye, title: "Awareness",
    desc: "เพิ่มการมองเห็นและทำให้คนรู้จักแบรนด์มากขึ้น",
    descEn: "Increase visibility and brand recognition." },
  { num: "03", Icon: CheckCircle2, title: "Consideration",
    desc: "ช่วยให้คนเข้าใจสินค้า และมีเหตุผลมากขึ้นในการเลือกแบรนด์",
    descEn: "Help people understand your product and choose your brand with more confidence." },
  { num: "04", Icon: Store, title: "Trial & Store Visit",
    desc: "กระตุ้นให้คนทดลองสินค้า หรือเข้ามาที่หน้าร้าน",
    descEn: "Drive product trials or store visits." },
  { num: "05", Icon: Clapperboard, title: "Content & UGC",
    desc: "สร้างคอนเทนต์จาก Creator ที่แบรนด์นำไปใช้ต่อได้",
    descEn: "Create Creator-made content your brand can reuse." },
  { num: "06", Icon: Repeat, title: "Conversion & Always-on",
    desc: "กระตุ้น Action และทำ Creator Marketing ต่อเนื่องในระยะยาว",
    descEn: "Drive action and sustain long-term, always-on Creator Marketing." },
];

export default function BusinessGoalsSection({ lang }: { lang: "th" | "en" }) {
  return (
    <div className="bg-grid" style={{ display: "grid", gridTemplateColumns: "0.62fr 2fr", gap: "48px", alignItems: "start" }}>
      {/* Left — eyebrow, heading, description */}
      <div className="bg-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span style={{ ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "#5f26e5", textTransform: "uppercase" }}>
          {lang === "th" ? "วัตถุประสงค์ทางธุรกิจ" : "Business Objectives"}
        </span>
        <h3 style={{
          ...KT, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
          margin: 0, lineHeight: 1.15,
        }}>
          <span style={{ color: "#111827" }}>{lang === "th" ? "เริ่มจาก" : "Start With Your "}</span>
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            whiteSpace: "nowrap" }}>
            {lang === "th" ? "เป้าหมาย" : "Goal"}
          </span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "320px" }}>
          {lang === "th"
            ? "เริ่มจากเป้าหมายของแบรนด์ แล้วดูว่า Influencer Marketing แบบไหนเหมาะกับโจทย์ของคุณ"
            : "Start with your brand's goal, then find the Influencer Marketing approach that fits your objective."}
        </p>
      </div>

      {/* Right — 2×3 grid of goal cards */}
      <div className="bg-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", perspective: "1500px" }}>
        {GOALS.map((item, idx) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <TiltCard className="bg-card" style={{
              position: "relative", borderRadius: "20px", padding: "28px",
              background: "#f7f5fc",
              border: "1px solid rgba(95,38,229,0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}>
              <div style={{ transform: "translateZ(40px)" }}>
                <span style={{ ...KT, fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", color: "#9ca3af" }}>
                  {item.num}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "10px 0 12px" }}>
                  <div className="bg-card-icon" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "44px", height: "44px", borderRadius: "14px", flexShrink: 0,
                    background: "linear-gradient(135deg, #5f25e5 0%, #7c3aed 100%)",
                    transition: "transform 0.4s ease",
                  }}>
                    <item.Icon size={22} color="#ffffff" strokeWidth={2} />
                  </div>
                  <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: 0, lineHeight: 1.3, color: "#111827" }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, margin: 0, color: "#4b5563" }}>
                  {lang === "th" ? item.desc : item.descEn}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <style>{`
        .bg-card{ overflow: hidden; }
        .bg-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 16px 32px -8px rgba(95,38,229,0.25);
        }
        .bg-card:hover .bg-card-icon{
          transform: scale(1.1) rotate(-4deg);
        }
        @media (max-width: 900px){
          .bg-grid{ grid-template-columns: 1fr !important; }
          .bg-left{ max-width: none !important; }
        }
        @media (max-width: 560px){
          .bg-cards-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
