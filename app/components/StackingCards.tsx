"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  useScroll,
  useMotionValueEvent,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react";

interface StackingCardsProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
  /** Height of the sticky viewport each card settles into (e.g. "70vh"). */
  stickyHeight?: string;
  /** Vertical px offset added per card index once settled, creating the cascading peek. */
  peekOffset?: number;
}

interface StackingCardItemProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  index: number;
}

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  stickyHeight = "70vh",
  peekOffset = 28,
  style,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  // `position: sticky` silently fails to track the viewport whenever any
  // ancestor sets a non-visible overflow (this codebase's shared `.hero-bg`
  // wrapper sets `overflow-x-hidden` on every page) — the containing block
  // for "stuck" calculations becomes that ancestor instead of the viewport,
  // so the element just scrolls away in normal flow instead of pinning.
  // Emulating sticky manually with `position: fixed` (which always resolves
  // against the viewport, ignoring ancestor overflow) sidesteps that bug
  // without having to touch the shared global wrapper.
  const [bounds, setBounds] = useState<{ left: number; width: number; top: number; height: number } | null>(null);
  const [p, setP] = useState(() => scrollYProgress.get());
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ left: rect.left, width: rect.width, top: rect.top + window.scrollY, height: rect.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  let wrapperStyle: React.CSSProperties;
  if (!bounds) {
    wrapperStyle = { position: "relative", height: stickyHeight };
  } else if (p <= 0) {
    wrapperStyle = { position: "absolute", top: 0, left: 0, width: "100%", height: stickyHeight };
  } else if (p >= 1) {
    wrapperStyle = { position: "absolute", bottom: 0, left: 0, width: "100%", height: stickyHeight };
  } else {
    wrapperStyle = {
      position: "fixed",
      top: 0,
      left: bounds.left,
      width: bounds.width,
      height: stickyHeight,
    };
  }

  return (
    <StackingCardsContext.Provider value={{ progress: scrollYProgress, scaleMultiplier, totalCards, peekOffset }}>
      <div className={className} ref={targetRef} style={{ position: "relative", ...style }} {...props}>
        <div style={{ ...wrapperStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {children}
        </div>
      </div>
    </StackingCardsContext.Provider>
  );
}

export const StackingCardItem = ({
  index,
  className,
  style,
  children,
  ...props
}: StackingCardItemProps) => {
  const { progress, scaleMultiplier, totalCards = 0, peekOffset = 28 } = useStackingCardsContext();

  // Each card slides/fades in over a short window as scroll progress crosses
  // its own threshold, then stays put (just shrinking a touch further) while
  // later cards settle at a growing offset on top of it — a persistent,
  // visibly overlapping stack rather than a one-at-a-time handoff.
  const introStart = index / totalCards;
  const introEnd = introStart + 0.5 / totalCards;
  const scaleTo = 1 - (totalCards - 1 - index) * (scaleMultiplier ?? 0.03);

  const [p, setP] = useState(() => progress.get());
  useMotionValueEvent(progress, "change", (v) => setP(v));

  const introT = clamp01((p - introStart) / (introEnd - introStart));
  const y = 80 * (1 - introT);
  const opacity = introT;
  const scaleT = clamp01((p - introStart) / (1 - introStart));
  const scale = 1 + (scaleTo - 1) * scaleT;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: index * peekOffset,
        zIndex: index + 1,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        transformOrigin: "top center",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
  peekOffset?: number;
} | null>(null);

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);
  if (!context) throw new Error("StackingCardItem must be used within StackingCards");
  return context;
};
