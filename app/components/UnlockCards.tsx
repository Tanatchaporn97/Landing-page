const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

type Item = { img: string; bg: string; title: string; desc: string };

export default function UnlockCards({ items }: { items: Item[] }) {
  return (
    <div className="unlock-blocks-wrap" style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "8px" }}>
      {items.map((item) => (
        <div key={item.title}
          className="unlock-block"
          style={{
            flex: "0 0 300px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            borderRadius: "24px",
            padding: "32px",
            background: item.bg,
          }}
        >
          <h3 style={{ ...KT, fontSize: "22px", fontWeight: 700, color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>
            {item.title}
          </h3>
          <p style={{ ...KT, fontSize: "15px", lineHeight: 1.75, color: "#374151", margin: 0 }}>
            {item.desc}
          </p>
        </div>
      ))}

      <style>{`
        .unlock-blocks-wrap::-webkit-scrollbar{ display: none; }
        @media (max-width: 760px){
          .unlock-block{ flex-basis: 260px; }
        }
      `}</style>
    </div>
  );
}
