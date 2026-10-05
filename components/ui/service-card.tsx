"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
// `motion` is the successor package to framer-motion (same API) and is what
// this project already ships, so import from it instead of adding framer-motion.
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// CVA for card variants — shadcn colour tokens (bg-card etc.) aren't defined in
// this project, so the variants use Buddy Review's palette instead.
const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        purple: "bg-[#5f26e5]/90 text-white",
        pink: "bg-[#ff0089]/85 text-white",
        violet: "bg-[#7c3aed]/90 text-white",
        glass: "bg-white/15 text-white border border-white/35 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_40px_-22px_rgba(10,0,60,0.6)]",
        // same light-lavender tone as the brand page "Think Smarter, Execute Better" cards
        lavender: "bg-gradient-to-br from-[#f6f2ff] to-[#e4dafb] text-gray-900 border border-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">,
    VariantProps<typeof cardVariants> {
  /** The main title of the card. */
  title: string;
  /** Optional supporting copy under the title. */
  description?: React.ReactNode;
  /** The URL the card's link should point to. */
  href: string;
  /** The source URL for the decorative image. */
  imgSrc: string;
  /** The alt text for the decorative image, for accessibility. */
  imgAlt: string;
  /** Link label (defaults to "LEARN MORE"). */
  ctaLabel?: string;
  /** Extra classes for the decorative image (size / position). */
  imgClassName?: string;
  /** Show the "LEARN MORE →" link (default true). */
  showCta?: boolean;
}

// Animation variants
const cardAnimation: Variants = {
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

const imageAnimation: Variants = {
  hover: { scale: 1.1, rotate: 3, x: 10, transition: { duration: 0.4, ease: "easeInOut" } },
};

const arrowAnimation: Variants = {
  hover: { x: 5, transition: { duration: 0.3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } },
};

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, description, href, imgSrc, imgAlt, ctaLabel = "LEARN MORE", imgClassName, showCta = true, ...props }, ref) => {
    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
        {...props}
      >
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          {description && <p className="mt-2 text-sm leading-relaxed opacity-85">{description}</p>}
          {showCta && (
            <Link
              href={href}
              aria-label={`Learn more about ${title}`}
              className="mt-auto pt-4 flex items-center text-sm font-semibold group-hover:underline w-fit"
            >
              {ctaLabel}
              <motion.span variants={arrowAnimation} className="inline-flex">
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.span>
            </Link>
          )}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imgSrc}
          alt={imgAlt}
          className={cn("absolute -right-8 -bottom-8 w-40 h-40 object-contain opacity-90 group-hover:opacity-100 pointer-events-none", imgClassName)}
          variants={imageAnimation}
        />
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
