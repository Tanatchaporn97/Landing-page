"use client";
import * as React from "react";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type ConflictingMotionProps =
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

interface TiltCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, ConflictingMotionProps> {
  children: React.ReactNode;
}

/**
 * Wraps its children in a subtle 3D tilt-on-mouse-move effect (rotateX/rotateY
 * driven by cursor position within the card), adapted from a standalone
 * "standard-card" demo. Kept theme-agnostic — callers own the visual style of
 * their content and only get the tilt physics from this wrapper.
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ className, children, style, ...props }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / rect.width - 0.5);
      y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
TiltCard.displayName = "TiltCard";
