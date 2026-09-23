import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

export interface ColorfulBentoItem {
  img: string;
  title: string;
  desc: string;
  gradient: string;
}

export function ColorfulBentoGrid({ items }: { items: ColorfulBentoItem[] }) {
  return (
    <div className="cbg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(220px, auto)", gap: "20px" }}>
      {items.map((item) => (
        <div
          key={item.title}
          className="cbg-card group relative overflow-hidden rounded-[28px] flex flex-col text-left"
          style={{ background: item.gradient }}
        >
          <div className="relative z-10 px-7 pt-6">
            <h3 className="text-white font-bold" style={{ ...KT, fontSize: "clamp(19px,1.8vw,24px)", lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <p className="text-white/85 font-medium" style={{ ...KT, fontSize: "16px", lineHeight: 1.6, marginTop: "8px", maxWidth: "34ch" }}>
              {item.desc}
            </p>
          </div>
          {item.img && (
            <div className="cbg-icon absolute" style={{ right: "16px", bottom: "16px", width: "clamp(80px,10vw,130px)", height: "clamp(80px,10vw,130px)" }}>
              <Image src={item.img} alt="" fill sizes="150px" style={{ objectFit: "contain" }} />
            </div>
          )}
        </div>
      ))}
      <style>{`
        .cbg-card{ transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .cbg-card:hover{ transform: translateY(-4px); box-shadow: 0 16px 40px rgba(95,38,229,0.28); }
        .cbg-icon{ opacity: 0.96; }
        @media (max-width: 860px){
          .cbg-grid{ grid-template-columns: 1fr !important; }
          .cbg-card{ grid-column: auto !important; grid-row: auto !important; min-height: 260px; }
        }
      `}</style>
    </div>
  );
}
