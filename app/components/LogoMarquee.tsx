"use client";
import Image from "next/image";

const LOGO_FILES_ROW1 = [
  "Clients Logo-03.png","Clients Logo-04.png","Clients Logo-05.png","Clients Logo-06.png",
  "Clients Logo-11.png","Clients Logo-13.png","Clients Logo-14.png","Clients Logo-16.png",
];
const LOGO_FILES_ROW2 = [
  "Clients Logo-07.png","Clients Logo-08.png","Clients Logo-09.png","Clients Logo-12.png",
  "Clients Logo-15.png","Clients Logo-17.png","Clients Logo-18.png","Clients Logo-20.png",
  "Clients Logo-21.png","Clients Logo-31.png",
];
const LOGOS_ROW1 = LOGO_FILES_ROW1.map((f) => (
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} priority style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));
const LOGOS_ROW2 = LOGO_FILES_ROW2.map((f) => (
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} priority style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));

function LogoMarqueeRow({ logos, direction }: { logos: React.ReactNode[], direction: "left"|"right" }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow:"hidden", width:"100%" }}>
      <div
        className={`logo-marquee-track ${direction === "left" ? "marquee-track-slow" : "marquee-track-slow-reverse"}`}
        style={{ display:"flex", alignItems:"center", gap:"56px", width:"max-content" }}
      >
        {doubled.map((logo, i) => (
          <div key={i} className="logo-marquee-item" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", height:"64px" }}>
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee({ bgClassName }: { bgClassName?: string } = {}) {
  return (
    <section className={`brand-logos-section ${bgClassName || "client-bg"}`} style={{
      padding: "120px 0 120px",
      overflow: "hidden",
      marginTop: "-90px",
      position: "relative",
      zIndex: 5,
    }}>
      <LogoMarqueeRow logos={LOGOS_ROW1} direction="left" />
      <div className="logo-marquee-row-gap" style={{ height: "32px" }} />
      <LogoMarqueeRow logos={LOGOS_ROW2} direction="right" />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />
    </section>
  );
}
