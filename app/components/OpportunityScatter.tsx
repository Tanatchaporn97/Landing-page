import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ScatterItem = {
  label: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  kind: "image" | "notepad" | "icons";
  img?: string;
};

const ITEMS_TH: ScatterItem[] = [
  { label: "แพลนคอนเทนต์ล่วงหน้า", top: "1%",  left: "2%",  width: "180px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "สตอรี่จากครีเอเตอร์จริง", top: "0%",  left: "30%", width: "150px", rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "วิเคราะห์ Performance", top: "3%",  left: "68%", width: "150px", rotate: -3, kind: "image", img: "/icon-network.png" },
  { label: "รับเงินผ่านมือถือ",      top: "36%", left: "85%", width: "140px", rotate: 4,  kind: "image", img: "/buddy-rank-phone.png" },
  { label: "บล็อกให้ความรู้",         top: "66%", left: "4%",  width: "160px", rotate: -2, kind: "notepad" },
  { label: "แบรนด์พาร์ทเนอร์ชั้นนำ",   top: "70%", left: "33%", width: "220px", rotate: 1,  kind: "icons" },
  { label: "แคมเปญไลฟ์สด",           top: "64%", left: "66%", width: "180px", rotate: -1, kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
];

const ITEMS_EN: ScatterItem[] = [
  { label: "Plan Content Ahead", top: "1%",  left: "2%",  width: "180px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "Real Creator Stories", top: "0%",  left: "30%", width: "150px", rotate: 3,  kind: "image", img: "/header-influencer-poster.jpg" },
  { label: "Performance Analytics", top: "3%",  left: "68%", width: "150px", rotate: -3, kind: "image", img: "/icon-network.png" },
  { label: "Get Paid On Your Phone", top: "36%", left: "85%", width: "140px", rotate: 4,  kind: "image", img: "/buddy-rank-phone.png" },
  { label: "The Creator Blog",      top: "66%", left: "4%",  width: "160px", rotate: -2, kind: "notepad" },
  { label: "Top Brand Partners",    top: "70%", left: "33%", width: "220px", rotate: 1,  kind: "icons" },
  { label: "Live Campaigns",        top: "64%", left: "66%", width: "180px", rotate: -1, kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
];

function ScatterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      ...KT, fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      textAlign: "center", margin: "0 0 10px",
      background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </p>
  );
}

export default function OpportunityScatter({ lang }: { lang: "th" | "en" }) {
  const items = lang === "th" ? ITEMS_TH : ITEMS_EN;

  return (
    <div className="opportunity-scatter" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((item) => (
        <div key={item.label} style={{
          position: "absolute", top: item.top, left: item.left, width: item.width,
          transform: `rotate(${item.rotate}deg)`,
        }}>
          <ScatterLabel>{item.label}</ScatterLabel>

          {item.kind === "image" && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "14px", overflow: "hidden", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", background: "#ffffff" }}>
              <Image src={item.img!} alt="" fill sizes="180px" style={{ objectFit: "cover" }} />
            </div>
          )}

          {item.kind === "notepad" && (
            <div style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", padding: "18px 16px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: "1px", background: "rgba(17,24,39,0.15)", margin: "10px 0" }} />
              ))}
            </div>
          )}

          {item.kind === "icons" && (
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              {["📸", "🎤", "🎬"].map((emoji, i) => (
                <div key={i} style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 8px 20px rgba(95,38,229,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {emoji}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
