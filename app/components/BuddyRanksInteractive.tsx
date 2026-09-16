"use client";
import { useState } from "react";
import ApplyPartnerships from "./ApplyPartnerships";
import CardFanCarousel, { type CardItem } from "./CardFanCarousel";

// Which mockup phones (by index into `cards`) bounce when each of the 3
// feature boxes above the fan carousel is hovered — indexed to match
// ApplyPartnerships' STEPS order (Audience, Content Ideas, Channel Strengths).
const BOUNCE_MAP: number[][] = [
  [0, 1],
  [2],
  [3, 4],
];

export default function BuddyRanksInteractive({ lang, cards }: { lang: "th" | "en"; cards: CardItem[] }) {
  const [hoverBox, setHoverBox] = useState<number | null>(null);
  const bounceIndices = hoverBox !== null ? BOUNCE_MAP[hoverBox] : [];

  return (
    <>
      {/* Apply For Partnerships — 3 numbered cards */}
      <ApplyPartnerships lang={lang} onHoverChange={setHoverBox} />

      {/* Hoverable fan carousel — numeric order left → right, center = 3 */}
      <div className="buddy-ranks-mockup-bleed" style={{ marginTop: "6.5rem" }}>
        <CardFanCarousel cards={cards} bounceIndices={bounceIndices} />
      </div>

      <style>{`
        @media (min-width: 768px) and (max-width: 1080px){
          .buddy-ranks-mockup-bleed{ margin-left: -32px; margin-right: -32px; }
        }
        /* Mobile: keep the fan inside the section's side padding instead of
           bleeding to the screen edge — scale it down per breakpoint so the
           outermost cards never spill past the viewport. */
        @media (max-width: 767px){
          .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.85); transform-origin: center center; }
        }
        @media (max-width: 639px){
          .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.75); }
        }
        @media (max-width: 479px){
          .buddy-ranks-mockup-bleed .fan-layout{ transform: scale(0.52); }
        }
      `}</style>
    </>
  );
}
