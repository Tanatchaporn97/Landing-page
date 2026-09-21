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
        "relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0 },
        hover: { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      {...props}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)`,
        }}
      />

      {/* Main Image — sized to the icon itself (plus a small margin) instead
          of a flex-1 region, so it doesn't leave a lot of empty space above
          and below the icon. */}
      <motion.div
        className="relative z-10 flex items-center justify-center py-2"
        variants={{
          initial: { scale: 1, y: 0 },
          hover: { scale: 1.3, y: -20 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={tag} className="w-40 h-40 object-contain" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 mt-3 rounded-lg border border-black/5 bg-white/80 p-4 backdrop-blur-sm">
        <p
          className="mb-1.5 text-xl font-bold leading-snug"
          style={{ ...KT, color: "var(--feature-color)" }}
        >
          {tag}
        </p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
