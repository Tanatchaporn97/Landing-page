"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string; // Tailwind CSS grid span classes (e.g., "md:col-span-2")
};

interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  title: React.ReactNode;
  description?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>
    </motion.div>
  );
};

const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const trackX = useMotionValue(0);
  // Endless auto-slide: the grid is rendered twice side by side and the track
  // drifts left, wrapping by one grid width so the loop has no visible seam.
  // Pauses while a mouse hovers it or while it is being dragged.
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const AUTO_SPEED = 40; // px per second

  const wrap = (x: number) => {
    const period = gridRef.current?.offsetWidth ?? 0;
    if (period <= 0) return x;
    while (x <= -period) x += period;
    while (x > 0) x -= period;
    return x;
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce && !pausedRef.current && !draggingRef.current) {
        trackX.set(wrap(trackX.get() - AUTO_SPEED * dt));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageItems]);

  // Horizontal trackpad swipes / shift+wheel nudge the strip; a plain vertical
  // wheel is left alone so the page keeps scrolling.
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
    if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
    trackX.set(wrap(trackX.get() - dx));
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden py-16 sm:py-24"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="section-title font-bold section-h2-fixed" style={{
          fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif",
          fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
          fontFeatureSettings: "'pnum' on,'lnum' on",
        }}>
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            {description}
          </p>
        )}
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-12 w-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") pausedRef.current = true; }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") pausedRef.current = false; }}
      >
        <motion.div
          className="flex w-max"
          drag="x"
          dragMomentum={false}
          style={{ x: trackX }}
          onDragStart={() => { draggingRef.current = true; }}
          onDragEnd={() => { draggingRef.current = false; trackX.set(wrap(trackX.get())); }}
        >
          {[0, 1].map((copy) => (
            <motion.div
              key={copy}
              ref={copy === 0 ? gridRef : undefined}
              aria-hidden={copy === 1 || undefined}
              className="grid auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 pl-4 md:pl-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: "some" }}
            >
              {imageItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f26e5] focus-visible:ring-offset-2",
                    item.span
                  )}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => { if (!draggingRef.current) setSelectedItem(item); }}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                  tabIndex={copy === 0 ? 0 : -1}
                  aria-label={`View ${item.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={copy === 0 ? item.title : ""}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveImageBentoGallery;
