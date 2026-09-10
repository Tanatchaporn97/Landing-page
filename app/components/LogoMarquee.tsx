"use client";
import Image from "next/image";

const LOGO_FILES_ROW1 = [
  "clients-logo-05.png","clients-logo-06.png","clients-logo-11.png","clients-logo-15.png","clients-logo-23.png",
  "watsons.webp","optimum.png","scb.webp","siangpure.png","smartheart.png",
  "soap-and-glory.png","teepol.png","true-money.png","puthai.png",
];
const LOGO_FILES_ROW2 = [
  "boots-logo.png","bose-logo.png","cp-all-logo.webp","clients-logo-24.png","clients-logo-31.png",
  "auntie-annes.webp","bobbi-dog.png","d-nee.png","daikin.png","fineline.png",
  "me-o.png","mega-bangna.png","momchoice.png","moonlight-glow-logo.png",
];
const LOGOS_ROW1 = LOGO_FILES_ROW1.map((f) => (
  <Image key={f} src={`/logos-clients/${f}`} alt={f.replace(/\.(png|webp)$/,"")} className="logo-marquee-img" width={200} height={86} priority style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));
const LOGOS_ROW2 = LOGO_FILES_ROW2.map((f) => (
  <Image key={f} src={`/logos-clients/${f}`} alt={f.replace(/\.(png|webp)$/,"")} className="logo-marquee-img" width={200} height={86} priority style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
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

export default function LogoMarquee({ bgClassName, fadeColor = "#ffffff" }: { bgClassName?: string; fadeColor?: string } = {}) {
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
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`, zIndex: 2, pointerEvents: "none" }} />
    </section>
  );
}
