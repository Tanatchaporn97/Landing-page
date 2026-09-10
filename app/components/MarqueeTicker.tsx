const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export default function MarqueeTicker({ items }: { items: string[] }) {
  const track = [...items, ...items, ...items, ...items];
  return (
    <div className="ticker-band" style={{
      borderTop: "1px solid rgba(17,24,39,0.12)",
      borderBottom: "1px solid rgba(17,24,39,0.12)",
      overflow: "hidden",
      background: "transparent",
      padding: "14px 0",
    }}>
      <div className="ticker-track" style={{ display: "flex", width: "max-content" }}>
        {track.map((item, i) => (
          <span key={i} style={{ ...KT, display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5f26e5", whiteSpace: "nowrap", padding: "0 20px" }}>
            {item}
            <span style={{ marginLeft: "20px", color: "rgba(95,38,229,0.35)" }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        .ticker-track{ animation: ticker-scroll 28s linear infinite; }
        @keyframes ticker-scroll{
          from{ transform: translateX(0); }
          to{ transform: translateX(-25%); }
        }
        @media (prefers-reduced-motion: reduce){
          .ticker-track{ animation: none; }
        }
      `}</style>
    </div>
  );
}
