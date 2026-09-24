"use client";
import Image from "next/image";
import { Building2, Users2, ArrowRight, Check } from "lucide-react";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const PLATFORM_ICON: Record<string, string> = {
  instagram: "/social-icons/instagram.png",
  tiktok: "/social-icons/tiktok.png",
  youtube: "/social-icons/youtube.png",
  facebook: "/social-icons/facebook.png",
};

type CreatorCard = {
  img: string;
  platform: keyof typeof PLATFORM_ICON;
  categoryTh: string;
  categoryEn: string;
  followers: string;
  likes: string;
  comments: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
};

const CREATORS: CreatorCard[] = [
  { img: "/trust-influencers/cheese.jpg", platform: "instagram", categoryTh: "ครีเอเตอร์แฟชั่น", categoryEn: "Fashion Creator",
    followers: "1.2M", likes: "4.8%", comments: "1.2%", top: "6%", left: "-5%", rotate: -4 },
  { img: "/trust-influencers/ryoko.jpg", platform: "tiktok", categoryTh: "ครีเอเตอร์บิวตี้", categoryEn: "Beauty Creator",
    followers: "832K", likes: "5.2%", comments: "1.4%", top: "6%", right: "-5%", rotate: 4 },
  { img: "/trust-influencers/puifai.jpg", platform: "instagram", categoryTh: "ครีเอเตอร์ไลฟ์สไตล์", categoryEn: "Lifestyle Creator",
    followers: "654K", likes: "4.1%", comments: "1.0%", top: "58%", left: "-3%", rotate: -3 },
  { img: "/trust-influencers/yam.jpg", platform: "youtube", categoryTh: "ครีเอเตอร์บันเทิง", categoryEn: "Entertainment Creator",
    followers: "908K", likes: "6.3%", comments: "2.3%", top: "58%", right: "-3%", rotate: 3 },
];

const STATS = [
  { valueTh: "12.4M", valueEn: "12.4M", labelTh: "การเข้าถึง", labelEn: "Reach", delta: "+28%" },
  { valueTh: "856K", valueEn: "856K", labelTh: "การมีส่วนร่วม", labelEn: "Engagement", delta: "+32%" },
  { valueTh: "8.9M", valueEn: "8.9M", labelTh: "ยอดวิว", labelEn: "Video Views", delta: "+41%" },
  { valueTh: "12.6K", valueEn: "12.6K", labelTh: "คอนเวอร์ชัน", labelEn: "Conversions", delta: "+35%" },
];

const SPLIT = [
  { platform: "tiktok" as const, pct: 52, color: "#111827" },
  { platform: "instagram" as const, pct: 28, color: "#5f26e5" },
  { platform: "youtube" as const, pct: 12, color: "#ff0089" },
  { platform: "facebook" as const, pct: 8, color: "#c9bff2" },
];

function donutSegments() {
  let acc = 0;
  const r = 26;
  const c = 2 * Math.PI * r;
  return SPLIT.map((s) => {
    const dash = (s.pct / 100) * c;
    const seg = { ...s, dasharray: `${dash} ${c - dash}`, offset: -((acc / 100) * c) };
    acc += s.pct;
    return seg;
  });
}

function CreatorPhotoCard({ c, lang, delay }: { c: CreatorCard; lang: "th" | "en"; delay: number }) {
  return (
    <div
      className="creator-float-card bhv-wiggle"
      style={{
        position: "absolute", top: c.top, left: c.left, right: c.right,
        width: "180px",
        "--rot": `${c.rotate}deg`,
        animationDelay: `${delay}s`,
        zIndex: 2,
      } as React.CSSProperties}
    >
      <div style={{
        borderRadius: "20px", overflow: "hidden",
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 20px 40px -12px rgba(95,38,229,0.25)",
        border: "1px solid rgba(255,255,255,0.6)",
      }}>
      <div style={{ position: "relative", width: "100%", height: "150px" }}>
        <Image src={c.img} alt={lang === "th" ? c.categoryTh : c.categoryEn} fill sizes="180px" style={{ objectFit: "cover" }} />
        <div style={{
          position: "absolute", top: "10px", left: "10px", width: "28px", height: "28px", borderRadius: "50%",
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)", overflow: "hidden",
        }}>
          <Image src={PLATFORM_ICON[c.platform]} alt={c.platform} width={16} height={16} style={{ objectFit: "contain" }} />
        </div>
        {/* Pink "matched" badge — ties each card back to the pink criteria pill
            by shared color/icon instead of a drawn connector line. */}
        <div style={{
          position: "absolute", top: "10px", right: "10px", width: "22px", height: "22px", borderRadius: "50%",
          background: "#ff0089", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(255,0,137,0.45)",
        }}>
          <Check size={13} color="#ffffff" strokeWidth={3} />
        </div>
        <div style={{
          position: "absolute", bottom: "10px", left: "10px", display: "flex", alignItems: "center", gap: "4px",
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(6px)", borderRadius: "50px",
          padding: "4px 10px 4px 8px", fontSize: "10px", fontWeight: 700, color: "#111827",
        }}>
          {lang === "th" ? c.categoryTh : c.categoryEn}
          <span style={{ color: "#5f26e5" }}>›</span>
        </div>
      </div>
      <div style={{ padding: "10px 12px 12px", background: "rgba(255,255,255,0.35)" }}>
        <p style={{ ...KT, fontSize: "16px", fontWeight: 800, color: "#111827", margin: "0 0 6px", lineHeight: 1 }}>
          {c.followers} <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{lang === "th" ? "ผู้ติดตาม" : "Followers"}</span>
        </p>
        <div style={{ display: "flex", gap: "10px", fontSize: "11px", fontWeight: 600, color: "#374151" }}>
          <span>♡ {c.likes}</span>
          <span>💬 {c.comments}</span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function BrandHeroVisual({ lang }: { lang: "th" | "en" }) {
  const segments = donutSegments();

  return (
    <>
    <div className="bhv-desktop bhv-float" style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: "640px", margin: "0 auto" }}>
      {/* Ambient background blobs */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "260px", height: "260px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(95,38,229,0.12) 0%, transparent 70%)", filter: "blur(10px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "5%", width: "220px", height: "220px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,0,137,0.10) 0%, transparent 70%)", filter: "blur(10px)", zIndex: 0 }} />

      {/* One large pulsing circle, centered on the whole composition, big enough
          to reach all 4 creator cards — reads as "these 4 were selected together"
          via a single shared ripple instead of a ring per card or drawn lines. */}
      <div style={{
        position: "absolute", top: "48%", left: "50%", width: "92%", height: "92%",
        transform: "translate(-50%,-50%)", zIndex: 1, pointerEvents: "none",
      }}>
        <div className="bhv-pulse-ring-big" style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid rgba(255,0,137,0.45)",
        }} />
        <div className="bhv-pulse-ring-big" style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid rgba(255,0,137,0.45)", animationDelay: "1.1s",
        }} />
      </div>

      {/* Top node: Brand → Match with Creators */}
      <div style={{ position: "absolute", top: "16%", left: "50%", transform: "translateX(-50%)", zIndex: 3, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "50px",
          padding: "7px 16px", boxShadow: "0 8px 20px rgba(95,38,229,0.15)",
        }}>
          <Building2 size={14} color="#5f26e5" />
          <span style={{ ...KT, fontSize: "13px", fontWeight: 700, color: "#111827" }}>{lang === "th" ? "แบรนด์" : "Brand"}</span>
        </div>
        <p style={{ ...KT, fontSize: "11px", fontWeight: 600, color: "#5f26e5", margin: "6px 0 0", display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
          <ArrowRight size={12} /> {lang === "th" ? "จับคู่กับครีเอเตอร์" : "Match with Creators"}
        </p>
      </div>

      {/* Bottom node: Right Creator / Right Audience / Real Impact — mirrors
          the top "Brand" pill directly opposite it. Instead of drawn connector
          lines (which crossed messily behind the dashboard card), it ties to
          the 4 creator cards via a shared pink "matched" badge on each card
          plus a pulsing ring here, communicating the same relationship with
          color/motion instead of literal wires. */}
      <div style={{
        position: "absolute", top: "86%", left: "50%", transform: "translateX(-50%)", zIndex: 3,
        display: "flex", alignItems: "center", gap: "8px",
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)", borderRadius: "16px",
        padding: "10px 14px", boxShadow: "0 8px 20px rgba(255,0,137,0.12)",
      }}>
        <div style={{ position: "relative", width: "28px", height: "28px", flexShrink: 0 }}>
          <div className="bhv-pulse" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(255,0,137,0.5)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(255,0,137,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users2 size={14} color="#ff0089" />
          </div>
        </div>
        <div style={{ ...KT, fontSize: "11px", fontWeight: 700, color: "#111827" }}>
          {["Right Creator", "Right Audience", "Real Impact"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "5px", lineHeight: 1.6 }}>
              <span style={{ color: "#ff0089" }}>•</span>{t}
            </div>
          ))}
        </div>
      </div>

      {/* Right edge: platform icon stack */}
      <div style={{ position: "absolute", top: "18%", right: "-12%", display: "flex", flexDirection: "column", gap: "10px", zIndex: 3 }}>
        {(["tiktok", "instagram", "youtube", "x"] as const).map((p) => (
          <div key={p} style={{
            width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(95,38,229,0.12)",
          }}>
            <Image src={`/social-icons/${p === "x" ? "x" : p}.png`} alt={p} width={16} height={16} style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>

      {/* Center dashboard card */}
      <div style={{
        position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, 0)",
        width: "72%", maxWidth: "380px", zIndex: 2,
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)", borderRadius: "20px",
        boxShadow: "0 30px 60px -20px rgba(95,38,229,0.30)", padding: "18px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "8px", position: "relative", flexShrink: 0 }}>
              <Image src="/bd-mark.svg" alt="Buddy Review" fill sizes="26px" style={{ objectFit: "contain" }} />
            </div>
            <span style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#111827" }}>
              {lang === "th" ? "ผลลัพธ์แคมเปญ" : "Campaign Performance"}
            </span>
          </div>
          <span style={{ ...KT, fontSize: "10px", fontWeight: 600, color: "#9ca3af" }}>1–31 Aug</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px" }}>
          {STATS.map((s) => (
            <div key={s.labelEn}>
              <p style={{ ...KT, fontSize: "clamp(13px,1.6vw,16px)", fontWeight: 800, color: "#111827", margin: "0 0 2px", lineHeight: 1 }}>
                {s.valueEn}
              </p>
              <p style={{ ...KT, fontSize: "9px", fontWeight: 600, color: "#9ca3af", margin: "0 0 3px" }}>
                {lang === "th" ? s.labelTh : s.labelEn}
              </p>
              <p style={{ ...KT, fontSize: "9px", fontWeight: 700, color: "#16a34a", margin: 0 }}>↑ {s.delta}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "16px", alignItems: "center" }}>
          <div>
            <svg viewBox="0 0 200 50" width="100%" height="44" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bhv-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5f25e5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5f25e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,35 C15,33 25,10 40,15 C55,20 60,40 75,38 C90,36 95,15 110,18 C125,21 130,33 145,30 C160,27 165,18 180,20 L200,22 L200,50 L0,50 Z" fill="url(#bhv-area)" />
              <path d="M0,35 C15,33 25,10 40,15 C55,20 60,40 75,38 C90,36 95,15 110,18 C125,21 130,33 145,30 C160,27 165,18 180,20 L200,22" fill="none" stroke="#5f25e5" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="56" height="56" viewBox="0 0 64 64">
              {segments.map((s) => (
                <circle key={s.platform} cx="32" cy="32" r="26" fill="none" stroke={s.color} strokeWidth="9"
                  strokeDasharray={s.dasharray} strokeDashoffset={s.offset} transform="rotate(-90 32 32)" />
              ))}
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {SPLIT.map((s) => (
                <span key={s.platform} style={{ ...KT, fontSize: "9px", fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.color, display: "inline-block" }} />
                  {s.pct}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {CREATORS.map((c, i) => <CreatorPhotoCard key={c.categoryEn} c={c} lang={lang} delay={i * 0.4} />)}
    </div>

    {/* ── Mobile: simplified static stack — the desktop composition relies on
        absolute positioning tuned for a ~1:1 square, which collides badly if
        just shrunk, so mobile gets its own non-overlapping layout instead. ── */}
    <div className="bhv-mobile" style={{ display: "none" }}>
      <div style={{
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)",
        borderRadius: "18px", boxShadow: "0 16px 32px -14px rgba(95,38,229,0.28)",
        padding: "16px 18px", marginBottom: "14px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "24px", height: "24px", position: "relative", flexShrink: 0 }}>
              <Image src="/bd-mark.svg" alt="Buddy Review" fill sizes="24px" style={{ objectFit: "contain" }} />
            </div>
            <span style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#111827" }}>
              {lang === "th" ? "ผลลัพธ์แคมเปญ" : "Campaign Performance"}
            </span>
          </div>
          <span style={{ ...KT, fontSize: "10px", fontWeight: 600, color: "#9ca3af" }}>1–31 Aug</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          {STATS.map((s) => (
            <div key={s.labelEn}>
              <p style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#111827", margin: "0 0 2px", lineHeight: 1 }}>{s.valueEn}</p>
              <p style={{ ...KT, fontSize: "8px", fontWeight: 600, color: "#9ca3af", margin: "0 0 2px" }}>{lang === "th" ? s.labelTh : s.labelEn}</p>
              <p style={{ ...KT, fontSize: "8px", fontWeight: 700, color: "#16a34a", margin: 0 }}>↑ {s.delta}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {CREATORS.map((c) => (
          <div key={c.categoryEn} style={{
            borderRadius: "16px", overflow: "hidden",
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 12px 24px -10px rgba(95,38,229,0.22)", border: "1px solid rgba(255,255,255,0.6)",
          }}>
            <div style={{ position: "relative", width: "100%", height: "120px" }}>
              <Image src={c.img} alt={lang === "th" ? c.categoryTh : c.categoryEn} fill sizes="160px" style={{ objectFit: "cover" }} />
              <div style={{
                position: "absolute", top: "8px", left: "8px", width: "22px", height: "22px", borderRadius: "50%",
                background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)", overflow: "hidden",
              }}>
                <Image src={PLATFORM_ICON[c.platform]} alt={c.platform} width={12} height={12} style={{ objectFit: "contain" }} />
              </div>
            </div>
            <div style={{ padding: "8px 10px 10px" }}>
              <p style={{ ...KT, fontSize: "10px", fontWeight: 700, color: "#5f26e5", margin: "0 0 4px" }}>
                {lang === "th" ? c.categoryTh : c.categoryEn}
              </p>
              <p style={{ ...KT, fontSize: "13px", fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1 }}>
                {c.followers} <span style={{ fontSize: "9px", fontWeight: 600, color: "#6b7280" }}>{lang === "th" ? "ผู้ติดตาม" : "Followers"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @keyframes bhv-wiggle {
        0%, 100% { transform: rotate(var(--rot)) translateX(0); }
        25% { transform: rotate(var(--rot)) translateX(-5px); }
        75% { transform: rotate(var(--rot)) translateX(5px); }
      }
      .bhv-wiggle { animation: bhv-wiggle 3.4s ease-in-out infinite; }
      @keyframes bhv-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .bhv-float { animation: bhv-float 5s ease-in-out infinite; }
      @keyframes bhv-pulse {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.9); opacity: 0; }
      }
      .bhv-pulse { animation: bhv-pulse 2s ease-out infinite; }
      @keyframes bhv-pulse-ring-big {
        0% { transform: scale(0.75); opacity: 0.9; }
        100% { transform: scale(1); opacity: 0; }
      }
      .bhv-pulse-ring-big { animation: bhv-pulse-ring-big 2.2s ease-out infinite; }
      @media (max-width: 900px){
        .bhv-desktop{ display: none !important; }
        .bhv-mobile{ display: block !important; }
      }
    `}</style>
    </>
  );
}
