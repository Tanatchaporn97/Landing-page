"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

export interface CardItem {
  id: string;
  category: ReactNode;
  title: ReactNode;
  src: string;
  alt?: string;
  /** Optional link — the whole card becomes clickable. */
  href?: string;
  /** Optional large mark rendered bottom-left (e.g. a letter). */
  mark?: ReactNode;
}

const defaultCards: CardItem[] = [
  {
    id: "1",
    category: "Design Excellence",
    title: <>Elegant experiences, thoughtfully created.</>,
    src: "https://cdn.21st.dev/assets/localized/0ac23730453fa82560c6dc05f844229755b3a58250902ada80291abc44fabed4.webp",
  },
  {
    id: "2",
    category: "Quality",
    title: <>Attention to detail, from start to finish.</>,
    src: "https://cdn.21st.dev/assets/localized/fc2ea5740d2d320ddaf5f8a31715ba6e8b9ac6952d623a2236d382bdc54d9510.webp",
  },
  {
    id: "3",
    category: "Technology",
    title: <>Powerful solutions, beautifully engineered.</>,
    src: "https://cdn.21st.dev/assets/localized/1d7b11d323cee946156033115e6a6b8e19653128a20c950add3bd0be32256df4.webp",
  },
  {
    id: "4",
    category: "Growth",
    title: (
      <>
        Built to scale,
        <br /> ready to lead.
      </>
    ),
    src: "https://cdn.21st.dev/assets/localized/d537dca16bfaedaa5a6c72f762c0a7a2b6430cf43e972cb80e84cab0688aa27d.webp",
  },
];

interface AppleCardCarouselProps {
  /** Replaces the default "Get to know shadcnspace" heading. */
  header?: ReactNode;
  cards?: CardItem[];
  /** Horizontal padding for header, strip and controls (Tailwind classes). */
  gutterClassName?: string;
  /** Extra classes merged onto each slide / card / title (e.g. to fit all cards on wide screens). */
  itemClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  /** Show the ↗ button in each card's bottom-right corner (default true). */
  showArrow?: boolean;
  /** Overrides the dark legibility gradient laid over each photo. */
  scrimClassName?: string;
}

const AppleCardCarousel = ({
  header,
  cards = defaultCards,
  gutterClassName = "px-4 sm:px-8",
  itemClassName,
  cardClassName,
  titleClassName,
  showArrow = true,
  scrimClassName = "bg-gradient-to-b from-black/75 via-black/20 to-black/60",
}: AppleCardCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    api.on("scroll", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
      api.off("scroll", update);
    };
  }, [api]);

  return (
    <div className="w-full py-5 sm:py-10">
      {/* Header */}
      <div className={`${gutterClassName} mb-8 sm:mb-12`}>
        {header ?? (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900">
            Get to know shadcnspace
          </h2>
        )}
      </div>

      {/* Card Strip */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className={`-ml-6 ${gutterClassName} py-4`}>
          {cards.map((card) => {
            const inner = (
              <div className={cn("group relative w-70 h-115 sm:w-80 sm:h-130 lg:w-92.5 lg:h-150 border border-black/5 overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-2xl hover:scale-102 transition-transform duration-300 cursor-pointer", cardClassName)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={
                    card.alt ||
                    (typeof card.title === "string"
                      ? card.title
                      : typeof card.category === "string"
                        ? card.category
                        : "")
                  }
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* legibility scrim: darker at top (text) and bottom (mark + button) */}
                <div className={cn("absolute inset-0", scrimClassName)} />
                <div className="relative z-10 flex flex-col gap-3 sm:gap-4 text-white">
                  <p className="text-sm sm:text-base font-medium">
                    {card.category}
                  </p>
                  <p className={cn("text-2xl sm:text-3xl font-medium tracking-tight leading-tight", titleClassName)}>
                    {card.title}
                  </p>
                </div>

                {(card.mark || showArrow) && (
                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <div>{card.mark}</div>
                    {showArrow && (
                      <span className="h-10 w-10 shrink-0 rounded-full shadow-xs bg-white group-hover:bg-white/80 flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:rotate-45 will-change-transform" />
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
            return (
              <CarouselItem key={card.id} className={cn("pl-6 basis-auto", itemClassName)}>
                {card.href ? (
                  <Link href={card.href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f26e5]">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Bottom-right controls — hidden when every card already fits */}
      <div className={cn("flex justify-end gap-2 mt-6", gutterClassName, !canScrollPrev && !canScrollNext && "hidden")}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="h-10 w-10 rounded-full bg-white shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next"
          className="h-10 w-10 rounded-full bg-white shadow-xs"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppleCardCarousel;
