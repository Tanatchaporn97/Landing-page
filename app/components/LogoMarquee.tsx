"use client";
import Image from "next/image";

const LOGO_FILES_ROW1 = [
  "upper-clients-logo-05.png","upper-clients-logo-06.png","upper-clients-logo-11.png","upper-clients-logo-12.png",
  "upper-clients-logo-15.png","upper-clients-logo-23.png","upper-clients-logo-32.png","upper-clients-logo-33.png",
  "upper-clients-logo-34.png","upper-clients-logo-35.png","upper-clients-logo-36.png","upper-clients-logo-37.png",
  "upper-clients-logo-50.png","upper-clients-logo-51.png","upper-clients-logo-ptt.png",
];
const LOGO_FILES_ROW2 = [
  "lower-clients-logo-24.png","lower-clients-logo-31.png","lower-clients-logo-38.png","lower-clients-logo-39.png",
  "lower-clients-logo-40.png","lower-clients-logo-41.png","lower-clients-logo-42.png","lower-clients-logo-43.png",
  "lower-clients-logo-44.png","lower-clients-logo-45.png","lower-clients-logo-46.png","lower-clients-logo-47.png",
  "lower-clients-logo-48.png","lower-clients-logo.png",
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

// Fades the logo rows to transparent at the left/right edges via a CSS mask
// instead of a flat-color overlay — that way it always blends with whatever
// is actually behind the section (solid color or a gradient) with no risk of
// the fade color mismatching the real background at that point.
const EDGE_MASK = "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)";

export default function LogoMarquee({ bgClassName, background, headingStyle }: { bgClassName?: string; background?: string; headingStyle?: React.CSSProperties } = {}) {
  return (
    <section className={`brand-logos-section ${bgClassName || "client-bg"}`} style={{
      padding: "120px 0 120px",
      overflow: "hidden",
      marginTop: "-90px",
      position: "relative",
      zIndex: 5,
      ...(background ? { background } : {}),
    }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(28px,3.3vw,48px)",
        margin: "0 0 48px",
        position: "relative",
        zIndex: 3,
      }}>
        <span style={{ ...headingStyle, background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "#111827", backgroundClip: "unset", color: "#111827" }}>Our </span>
        <span style={{ ...headingStyle }}>Clients</span>
      </h2>
      <div style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}>
        <LogoMarqueeRow logos={LOGOS_ROW1} direction="left" />
        <div className="logo-marquee-row-gap" style={{ height: "32px" }} />
        <LogoMarqueeRow logos={LOGOS_ROW2} direction="right" />
      </div>
    </section>
  );
}
