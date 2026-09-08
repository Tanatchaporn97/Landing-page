"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";

type CSSVars = CSSProperties & Record<string, string | number | undefined>;

export interface HoverStackCard {
  id?: number;
  title: string;
  desc: string;
  icon?: string;
}

const CARD_BG = "rgba(255,255,255,0.22)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.45)";

interface PreparedHoverStackCard extends HoverStackCard {
  _rotation: number;
  _baseX: number;
  _baseZ: number;
}

export interface HoverStackProps {
  cards: HoverStackCard[];
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  hoverLift?: number;
  pushDistance?: number;
  spread?: number;
  rotation?: number;
  duration?: number;
  accentColor?: string;
  className?: string;
}

const PRESET_ROTATIONS = [-8, 4, -3, 5, -4, 6, 3, -6, 2, -5];

function CardBody({ card }: { card: HoverStackCard }) {
  return (
    <div className="relative z-[2] flex flex-1 flex-col justify-center gap-3">
      {card.icon && (
        <div className="relative shrink-0" style={{ width: "48px", height: "48px" }}>
          <Image src={card.icon} alt={card.title} fill sizes="48px" style={{ objectFit: "contain" }} />
        </div>
      )}
      <h3 className="m-0" style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.3, color: "#5f26e5" }}>
        {card.title}
      </h3>
      <p className="m-0" style={{ fontSize: "16px", lineHeight: 1.7, color: "#111827" }}>
        {card.desc}
      </p>
    </div>
  );
}

export default function HoverStack({
  cards,
  cardWidth = 280,
  cardHeight = 360,
  overlap = 96,
  hoverLift = 30,
  pushDistance = 235,
  spread = 24,
  rotation = 7,
  duration = 0.5,
  accentColor = "#5f26e5",
  className = "",
}: HoverStackProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );

  useEffect(() => {
    setHasMounted(true);
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
      if (event.matches) setActiveIndex(null);
    };

    setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const preparedCards: PreparedHoverStackCard[] = useMemo(() => {
    const rotationScale = rotation / 7;

    return cards.map((card, index) => {
      const presetRotation =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length] +
        (index % 2 === 0 ? 0 : 1);

      const baseX = index * overlap;

      return {
        ...card,
        _rotation: presetRotation * rotationScale,
        _baseX: baseX,
        _baseZ: index + 1,
      };
    });
  }, [cards, overlap, rotation]);

  const getCardStyle = (card: PreparedHoverStackCard, index: number): CSSVars => {
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    let x = card._baseX;
    let y = 0;
    let rotate = card._rotation;
    let zIndex = card._baseZ;
    let scale = 1;

    if (reduceMotion) {
      if (isActive) zIndex = 999;

      return {
        "--card-width": `${cardWidth}px`,
        "--card-height": `${cardHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`,
        zIndex,
        transition: "none",
        background: CARD_BG,
      };
    }

    let boxShadow;

    if (hasActive) {
      if (index < activeIndex) {
        x -= pushDistance;
        y -= spread * 0.4;
      } else if (index > activeIndex) {
        x += pushDistance;
        y += spread * 0.4;
      }

      if (isActive) {
        x = card._baseX;
        y = -hoverLift;
        rotate = 0;
        zIndex = 999;
        scale = 1.035;
        boxShadow = `0 0 0 3px ${accentColor}`;
      }
    }

    const activeMs = Math.max(0, duration) * 1000;
    const transition = isActive
      ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1), box-shadow ${activeMs * (900 / 700)}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
      : hasActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : `transform ${activeMs * (480 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${activeMs * (380 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return {
      "--card-width": `${cardWidth}px`,
      "--card-height": `${cardHeight}px`,
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      transition,
      background: CARD_BG,
      boxShadow,
    };
  };

  const totalWidth =
    preparedCards.length > 0
      ? preparedCards.at(-1)!._baseX + cardWidth
      : cardWidth;

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={`relative w-full px-[7vw] ${className}`}>
      {isTouch ? (
        <div className="flex flex-col gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id ?? index}
              className="relative flex min-h-[220px] w-full cursor-default select-none flex-col overflow-hidden rounded-3xl border p-6"
              style={{ background: CARD_BG, border: CARD_BORDER, backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
            >
              <CardBody card={card} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="relative mx-auto"
          style={{
            "--stack-width": `${totalWidth}px`,
            "--stack-height": `${cardHeight + (reduceMotion ? 0 : hoverLift) + 24}px`,
            width: "var(--stack-width)",
            height: "var(--stack-height)",
          } as CSSVars}
        >
          {preparedCards.map((card, index) => (
            <div
              key={card.id ?? index}
              className="absolute left-0 top-0 flex h-[var(--card-height)] w-[var(--card-width)] origin-[center_center] cursor-pointer select-none flex-col overflow-hidden rounded-2xl border p-6 will-change-transform"
              style={{ ...getCardStyle(card, index), border: CARD_BORDER, backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <CardBody card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
