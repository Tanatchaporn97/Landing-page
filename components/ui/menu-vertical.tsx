"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
  /** called after an item is chosen (e.g. to close an overlay menu) */
  onItemClick?: () => void;
  className?: string;
  /** classes for each item's label (size / font / case) */
  itemClassName?: string;
}

const MotionLink = motion.create(Link);

// Vertical menu: on hover (or tap, on touch screens) an arrow slides in from the
// left and the label shifts right and takes the accent colour.
export const MenuVertical = ({
  menuItems = [],
  color = "#5f26e5",
  skew = 0,
  onItemClick,
  className,
  itemClassName,
}: MenuVerticalProps) => {
  return (
    <div className={cn("flex w-fit flex-col gap-4 px-10", className)}>
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav flex items-center gap-2 cursor-pointer text-[#1a0a3d]"
          initial="initial"
          whileHover="hover"
          whileTap="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", color: "inherit", opacity: 0 },
              hover: { x: 0, color, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-0"
          >
            <ArrowRight strokeWidth={3} className="size-8 sm:size-10" />
          </motion.div>

          <MotionLink
            href={item.href}
            onClick={onItemClick}
            variants={{
              initial: { x: -40, color: "inherit" },
              hover: { x: 0, color, skewX: skew },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn("font-semibold text-4xl no-underline", itemClassName)}
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
};
