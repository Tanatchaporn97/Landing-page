"use client";
import { Rocket, Eye, CheckCircle2, Store, Clapperboard, Repeat } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };
const PIERSON = { fontFamily: "'Pierson','Noto Sans Thai',sans-serif" };

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
    <div>
      {/* Centered heading + description */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
        textAlign: "center", maxWidth: "620px", margin: "0 auto 56px",
      }}>
        <Badge variant="outline">Business Objectives</Badge>
        <h3 style={{
          ...PIERSON, fontSize: "clamp(28px,3.3vw,48px)", fontWeight: 800,
          margin: 0, lineHeight: 1.15,
        }}>
          <span style={{ color: "#111827" }}>Start With Your </span>
          <span style={{ background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            whiteSpace: "nowrap" }}>
            Goal
          </span>
        </h3>
        <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {lang === "th"
            ? "เริ่มจากเป้าหมายของแบรนด์ แล้วดูว่า Influencer Marketing แบบไหนเหมาะกับโจทย์ของคุณ"
            : "Start with your brand's goal, then find the Influencer Marketing approach that fits your objective."}
        </p>
      </div>

      {/* 3-column × 2-row grid — hover-animated card: border lights up, icon inverts to a
          solid gradient fill, and a decorative accent line grows along the left edge */}
      <div className="bg-cards-grid-v2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px 24px" }}>
        {GOALS.map((item, idx) => (
          <motion.div
            key={item.num}
            className="goal-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            style={{
              position: "relative", display: "flex", flexDirection: "column", gap: "16px",
              borderRadius: "16px", border: "1px solid rgba(95,38,229,0.12)",
              padding: "28px 24px", cursor: "pointer",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Accent line — purple→pink on hover */}
            <span className="goal-card-accent" style={{
              position: "absolute", left: "-1px", top: "24px", bottom: "24px", width: "2px",
              background: "rgba(95,38,229,0.15)", transition: "background 0.3s ease",
            }} />

            <div className="goal-card-icon" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "56px", height: "56px", borderRadius: "16px", flexShrink: 0,
              background: "#ffffff", border: "1px solid rgba(95,38,229,0.12)",
              boxShadow: "0 8px 24px rgba(95,38,229,0.14)",
              transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            }}>
              <item.Icon size={26} stroke="url(#goalIconGradient)" strokeWidth={2} />
            </div>
            <h4 style={{ ...KT, fontSize: "18px", fontWeight: 700, margin: 0, lineHeight: 1.3, color: "#5f26e5" }}>
              {item.title}
            </h4>
            <p style={{ ...KT, fontSize: "16px", lineHeight: 1.7, margin: 0, color: "#374151" }}>
              {lang === "th" ? item.desc : item.descEn}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Shared gradient definition used by every goal icon above (purple → pink, matches site CI) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="goalIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5f25e5" />
            <stop offset="100%" stopColor="#ff0089" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        .goal-card:hover{
          border-color: rgba(95,38,229,0.5);
          box-shadow: 0 16px 32px -12px rgba(95,38,229,0.25);
          transform: translateY(-4px);
        }
        .goal-card:hover .goal-card-accent{
          background: linear-gradient(180deg, #5f26e5 0%, #ff0089 100%);
        }
        .goal-card:hover .goal-card-icon{
          background: linear-gradient(135deg, #5f26e5 0%, #ff0089 100%);
          box-shadow: 0 8px 20px rgba(95,38,229,0.35);
          transform: scale(1.08) rotate(-4deg);
        }
        .goal-card:hover .goal-card-icon svg{
          stroke: #ffffff !important;
        }
        @media (max-width: 900px){
          .bg-cards-grid-v2{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px){
          .bg-cards-grid-v2{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
