"use client";
import Image from "next/image";
import { motion } from "motion/react";

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
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));
const LOGOS_ROW2 = LOGO_FILES_ROW2.map((f) => (
  <Image key={f} src={`/logos/${f}`} alt={f.replace(".png","")} className="logo-marquee-img" width={200} height={86} style={{ height:"86px", width:"auto", objectFit:"contain", display:"block" }} />
));

function LogoMarqueeRow({ logos, direction }: { logos: React.ReactNode[], direction: "left"|"right" }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow:"hidden", width:"100%" }}>
      <motion.div
        className="logo-marquee-track"
        style={{ display:"flex", alignItems:"center", gap:"56px", width:"max-content" }}
        animate={{ x: direction === "left" ? ["0%","-50%"] : ["-50%","0%"] }}
        transition={{ duration: 35, ease:"linear", repeat: Infinity }}
      >
        {doubled.map((logo, i) => (
          <div key={i} className="logo-marquee-item" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", height:"64px" }}>
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="brand-logos-section" style={{
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 5%, rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.42) 15%, rgba(255,255,255,0.64) 20%, rgba(255,255,255,0.82) 25%, rgba(255,255,255,0.93) 30%, rgba(255,255,255,0.98) 35%, #ffffff 40%, #ffffff 55%, rgba(255,255,255,0.97) 60%, rgba(255,255,255,0.88) 66%, rgba(255,255,255,0.72) 73%, rgba(255,255,255,0.52) 80%, rgba(255,255,255,0.3) 87%, rgba(255,255,255,0.1) 94%, rgba(255,255,255,0) 100%)",
      padding: "120px 0 120px",
      overflow: "hidden",
      marginTop: "-90px",
      position: "relative",
      zIndex: 5,
      maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
    }}>
      <LogoMarqueeRow logos={LOGOS_ROW1} direction="left" />
      <div className="logo-marquee-row-gap" style={{ height: "32px" }} />
      <LogoMarqueeRow logos={LOGOS_ROW2} direction="right" />
    </section>
  );
}
