"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

// Define the props for the component
type ConflictingMotionProps =
  | "title"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onTransitionEnd";

interface AnimatedFeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, ConflictingMotionProps> {
  /** The card's heading */
  tag: string;
  /** The supporting description text, shown smaller than the heading */
  title: React.ReactNode;
  /** The URL for the central image */
  imageSrc: string;
  /** The color variant which determines the gradient and tag color */
  color: "orange" | "purple" | "blue";
}

// Define HSL color values for each variant to work with shadcn's theming
const colorVariants = {
  orange: {
    "--feature-color": "hsl(35, 91%, 55%)",
    "--feature-color-light": "hsl(41, 100%, 85%)",
    "--feature-color-dark": "hsl(24, 98%, 98%)",
  },
  purple: {
    "--feature-color": "hsl(262, 85%, 60%)",
    "--feature-color-light": "hsl(261, 100%, 87%)",
    "--feature-color-dark": "hsl(264, 100%, 98%)",
  },
  blue: {
    "--feature-color": "hsl(211, 100%, 60%)",
    "--feature-color-light": "hsl(210, 100%, 83%)",
    "--feature-color-dark": "hsl(216, 100%, 98%)",
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, tag, title, imageSrc, color, ...props }, ref) => {
  const cardStyle = colorVariants[color] as React.CSSProperties;

  return (
    <motion.div
      ref={ref}
      style={cardStyle}
      className={cn(
        "relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:gap-5 sm:p-5",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0 },
        hover: { y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      {...props}
    >
      {/* Background Gradient — anchored behind the icon on the left */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 12% 50%, var(--feature-color-light) 0%, transparent 55%)`,
        }}
      />

      {/* Icon — compact square tile beside the text instead of a tall block
          above it. The source PNGs are wide with lots of transparent side
          padding, so object-cover crops to the centered icon and fills the tile. */}
      <motion.div
        className="relative z-10 flex h-20 w-20 shrink-0 sm:h-24 sm:w-24 items-center justify-center rounded-2xl"
        style={{ background: "var(--feature-color-dark)" }}
        variants={{
          initial: { scale: 1, rotate: 0 },
          hover: { scale: 1.15, rotate: -6 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={tag} className="h-full w-full object-cover" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 min-w-0 flex-1">
        <p
          className="mb-1 text-lg font-bold leading-snug"
          style={{ ...KT, color: "var(--feature-color)" }}
        >
          {tag}
        </p>
        <p className="text-sm leading-relaxed text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
