import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type ScatterItem = {
  label: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  kind: "image" | "notepad" | "number";
  img?: string;
  value?: string;
};

// Kept strictly in the left/right margins (outside the ~900px centered
// text column) so nothing ever overlaps the heading/paragraph/stat cards.
const ITEMS_TH: ScatterItem[] = [
  { label: "แพลนคอนเทนต์ล่วงหน้า", top: "2%",  left: "1%",  width: "190px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "แบรนด์พันธมิตร",       top: "40%", left: "2%",  width: "170px", rotate: 3,  kind: "number", value: "1,000+" },
  { label: "บล็อกให้ความรู้",       top: "72%", left: "1%",  width: "170px", rotate: -2, kind: "notepad" },

  { label: "วิเคราะห์ Performance", top: "1%",  left: "85%", width: "180px", rotate: 4,  kind: "image", img: "/icon-network.png" },
  { label: "ประสบการณ์ในวงการ",     top: "39%", left: "86%", width: "160px", rotate: -3, kind: "number", value: "5+ ปี" },
  { label: "แคมเปญไลฟ์สด",         top: "72%", left: "84%", width: "180px", rotate: 2,  kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
];

const ITEMS_EN: ScatterItem[] = [
  { label: "Plan Content Ahead",   top: "2%",  left: "1%",  width: "190px", rotate: -5, kind: "image", img: "/path-to-partnership/Step-4-screen.png" },
  { label: "Brand Partners",       top: "40%", left: "2%",  width: "170px", rotate: 3,  kind: "number", value: "1,000+" },
  { label: "The Creator Blog",     top: "72%", left: "1%",  width: "170px", rotate: -2, kind: "notepad" },

  { label: "Performance Analytics", top: "1%",  left: "85%", width: "180px", rotate: 4,  kind: "image", img: "/icon-network.png" },
  { label: "Years In The Industry", top: "39%", left: "86%", width: "160px", rotate: -3, kind: "number", value: "5+" },
  { label: "Live Campaigns",        top: "72%", left: "84%", width: "180px", rotate: 2,  kind: "image", img: "/path-to-partnership/Step-6-screen.png" },
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
              <Image src={item.img!} alt="" fill sizes="190px" style={{ objectFit: "cover" }} />
            </div>
          )}

          {item.kind === "notepad" && (
            <div style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", padding: "18px 16px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: "1px", background: "rgba(17,24,39,0.15)", margin: "10px 0" }} />
              ))}
            </div>
          )}

          {item.kind === "number" && (
            <div style={{ background: "#ffffff", borderRadius: "16px", boxShadow: "0 12px 28px rgba(95,38,229,0.14)", padding: "20px 16px", textAlign: "center" }}>
              <span style={{
                ...KT, fontSize: "30px", fontWeight: 800, lineHeight: 1,
                background: "linear-gradient(45deg, #5f25e5 0%, #ff0089 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {item.value}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
