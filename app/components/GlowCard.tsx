"use client";
import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  // Narrowed to the site's own purple → pink gradient range (#5f25e5 → #ff0089)
  // instead of the original wide 300° spread, which wrapped through unrelated
  // green/yellow hues as the pointer crossed the card's horizontal center.
  purple: { base: 258, spread: 70 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

let stylesInjected = false;

// Injected once — the ::before/::after spotlight-border rules used by every [data-glow] card.
function injectGlowStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
  `;
  document.head.appendChild(style);
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "purple",
  style,
  ...rest
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectGlowStyles();
    const syncPointer = (e: PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      // The glow CSS uses `background-attachment: fixed`, so the radial-gradient
      // position is resolved in viewport coordinates — pass clientX/clientY as-is
      // (not element-relative) to match.
      el.style.setProperty("--x", e.clientX.toFixed(2));
      el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      el.style.setProperty("--y", e.clientY.toFixed(2));
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  return (
    <div
      ref={cardRef}
      data-glow
      className={className}
      style={{
        ["--base" as string]: base,
        ["--spread" as string]: spread,
        ["--radius" as string]: "24",
        ["--border-size" as string]: "2px",
        ["--spotlight-size" as string]: "180px",
        ["--hue" as string]: "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
        position: "relative",
        border: "var(--border-size) solid transparent",
        backgroundClip: "padding-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
