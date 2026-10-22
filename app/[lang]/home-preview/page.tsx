import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import HomeSplitHero from "../../components/HomeSplitHero";
import HomeHeroFocus from "../../components/HomeHeroFocus";
import ImpactStats from "../../components/ImpactStats";
import { type Locale } from "../../../i18n-config";

// Preview of the homepage's top only — hero + number stats — for reviewing / iterating on
// those two sections on their own. Same components as the real homepage, so changes show here too.
// Kept out of search results.
export const metadata: Metadata = {
  title: "Homepage preview — Hero & Stats",
  robots: { index: false, follow: false },
};

export default async function HomePreview({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="hero-bg min-h-screen flex flex-col overflow-x-hidden"
      style={{ fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" }}>
      <Navbar variant="home" lang={lang as Locale} />
      {/* desktop: new focus layout; phones / tablets keep the homepage's own mobile hero */}
      <div className="hp-desktop"><HomeHeroFocus lang={lang as "th" | "en"} /></div>
      <div className="hp-mobile"><HomeSplitHero lang={lang as "th" | "en"} /></div>
      <style>{`.hp-mobile .split-hero-desktop{ display: none !important; }
        @media (min-width: 900px){ .hp-mobile{ display: none; } } @media (max-width: 899px){ .hp-desktop{ display: none; } }`}</style>
      {/* stats continue the hero's bottom tone, then ease out to white */}
      <div style={{ position: "relative", background: "var(--hf-blend)" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, #ffffff 100%)", pointerEvents: "none" }} />
        <ImpactStats lang={lang as "th" | "en"} background="transparent" style={{ position: "relative", marginTop: 0 }} />
      </div>
    </div>
  );
}
