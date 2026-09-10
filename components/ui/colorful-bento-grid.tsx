import Image from "next/image";

export interface ColorfulBentoItem {
  img: string;
  title: string;
  desc: string;
  gradient: string;
  rotate: number;
  span?: boolean;
}

export function ColorfulBentoGrid({ items }: { items: ColorfulBentoItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className={`cbg-card group relative overflow-hidden rounded-2xl px-6 py-8 flex flex-col items-center justify-center text-center gap-4 ${item.span ? "md:col-span-2" : ""}`}
          style={{ background: item.gradient, minHeight: "300px", ["--cbg-rotate" as string]: `${item.rotate}deg` }}
        >
          {item.img && (
            <div className="relative w-20 h-20 shrink-0 rounded-full bg-white/95 shadow-md p-3">
              <Image src={item.img} alt={item.title} fill sizes="80px" style={{ objectFit: "contain", padding: "10px" }} />
            </div>
          )}
          <h3 className="text-xl font-bold px-6 py-2 bg-white/90 text-[#111827] rounded-full whitespace-nowrap">
            {item.title}
          </h3>
          <p className="max-w-xs text-[15px] leading-relaxed text-white/95 font-medium">
            {item.desc}
          </p>
        </div>
      ))}
      <style>{`
        .cbg-card{
          transform: rotate(var(--cbg-rotate, 0deg));
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cbg-card:hover{
          transform: rotate(var(--cbg-rotate, 0deg)) scale(1.05);
          box-shadow: -6px 6px 32px 8px rgba(95,38,229,0.28);
        }
      `}</style>
    </div>
  );
}
