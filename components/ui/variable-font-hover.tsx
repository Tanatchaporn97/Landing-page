"use client";

import { useMemo, useState } from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type StaggerFrom = "first" | "last" | "center" | number;

interface VariableFontHoverProps {
  label: string;
  className?: string;
  /** e.g. "'wght' 400" */
  fromFontVariationSettings?: string;
  /** e.g. "'wght' 700" */
  toFontVariationSettings?: string;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  /** keep the "to" state while true (e.g. the selected tab) */
  active?: boolean;
  transition?: Transition;
}

const wghtOf = (s?: string, fallback = 400) => {
  const m = s?.match(/'wght'\s*([\d.]+)/);
  return m ? Number(m[1]) : fallback;
};

// Split into user-perceived characters so Thai vowels / tone marks stay with their consonant.
const graphemes = (text: string): string[] => {
  const Seg = (Intl as unknown as { Segmenter?: new (l?: string, o?: { granularity: string }) => { segment: (t: string) => Iterable<{ segment: string }> } }).Segmenter;
  if (Seg) return Array.from(new Seg(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  return Array.from(text);
};

// Hover a label and its letters step up in weight one after another (a ripple from
// `staggerFrom`). Works with variable fonts (font-variation-settings) and, for static
// families like Kanit, steps through the loaded font-weight instances.
export function VariableFontHover({
  label,
  className,
  fromFontVariationSettings = "'wght' 400",
  toFontVariationSettings = "'wght' 700",
  staggerDuration = 0.03,
  staggerFrom = "first",
  active = false,
  transition = { duration: 0.4, ease: "easeOut" } as Transition,
}: VariableFontHoverProps) {
  const [hovered, setHovered] = useState(false);
  const chars = useMemo(() => graphemes(label), [label]);
  const from = wghtOf(fromFontVariationSettings, 400);
  const to = wghtOf(toFontVariationSettings, 700);
  const on = hovered || active;

  const origin = (() => {
    const n = chars.length;
    if (staggerFrom === "first") return 0;
    if (staggerFrom === "last") return n - 1;
    if (staggerFrom === "center") return (n - 1) / 2;
    return Math.max(0, Math.min(n - 1, staggerFrom));
  })();

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" style={{ whiteSpace: "pre" }}>
        {chars.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={false}
            animate={{
              fontVariationSettings: on ? toFontVariationSettings : fromFontVariationSettings,
              fontWeight: on ? to : from,
            }}
            transition={{ ...transition, delay: Math.abs(i - origin) * staggerDuration }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
