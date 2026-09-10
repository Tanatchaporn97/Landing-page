import Image from "next/image";

export interface ColorfulBentoItem {
  img: string;
  title: string;
  desc: string;
  gradient: string;
}

// Fixed asymmetric bento layout (3 columns × 3 rows):
//   [ tall      ][ wide             ]
//   [ tall      ][ small ][ small   ]
//   [ wide             ][ small     ]
// Item order maps 1:1 to these 6 slots.
const SLOTS = [
  { gridColumn: "1 / 2", gridRow: "1 / 3" },
  { gridColumn: "2 / 4", gridRow: "1 / 2" },
  { gridColumn: "2 / 3", gridRow: "2 / 3" },
  { gridColumn: "3 / 4", gridRow: "2 / 3" },
  { gridColumn: "1 / 3", gridRow: "3 / 4" },
  { gridColumn: "3 / 4", gridRow: "3 / 4" },
];

export function ColorfulBentoGrid({ items }: { items: ColorfulBentoItem[] }) {
  return (
    <div className="cbg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(170px, auto)", gap: "20px" }}>
      {items.map((item, i) => (
        <div
          key={item.title}
          className="cbg-card group relative overflow-hidden rounded-[28px] flex flex-col text-left"
          style={{ background: item.gradient, ...SLOTS[i % SLOTS.length] }}
        >
          <div className="relative z-10 px-7 pt-7">
            <h3 className="text-white font-bold" style={{ fontSize: "clamp(19px,1.8vw,24px)", lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <p className="text-white/85 font-medium" style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "8px", maxWidth: "34ch" }}>
              {item.desc}
            </p>
          </div>
          {item.img && (
            <div className="cbg-icon relative flex-1 min-h-[90px]">
              <Image src={item.img} alt="" fill sizes="240px" style={{ objectFit: "contain", objectPosition: "bottom right" }} />
            </div>
          )}
        </div>
      ))}
      <style>{`
        .cbg-card{ transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .cbg-card:hover{ transform: translateY(-4px); box-shadow: 0 16px 40px rgba(95,38,229,0.28); }
        .cbg-icon{ padding: 8px 8px 0 0; opacity: 0.96; }
        @media (max-width: 860px){
          .cbg-grid{ grid-template-columns: 1fr !important; }
          .cbg-card{ grid-column: auto !important; grid-row: auto !important; min-height: 260px; }
        }
      `}</style>
    </div>
  );
}
