"use client";

import * as React from "react";
import { HTMLMotionProps, MotionConfig, motion } from "motion/react";

interface TextStaggerHoverProps {
  text: string;
  index: number;
  activeColor?: string;
  inactiveColor?: string;
}
interface HoverSliderImageProps {
  index: number;
}
interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "));
  const characters = words.map((word) => word.split("")).flat(1);
  return { words, characters };
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);
function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSlider");
  }
  return context;
}

export const HoverSlider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState<number>(0);
    const changeSlide = React.useCallback((index: number) => setActiveSlide(index), []);
    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps>(
  ({ text, index, activeColor = "#5f26e5", inactiveColor = "#9ca3af", className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const { characters } = splitText(text);
    const isActive = activeSlide === index;
    return (
      <span
        className={`relative inline-block origin-bottom overflow-hidden${className ? ` ${className}` : ""}`}
        {...props}
        ref={ref}
        onMouseEnter={() => changeSlide(index)}
      >
        {characters.map((char, i) => (
          <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
            <MotionConfig transition={{ delay: i * 0.025, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <motion.span className="inline-block" style={{ color: inactiveColor }} initial={{ y: "0%" }} animate={isActive ? { y: "-110%" } : { y: "0%" }}>
                {char}
                {char === " " && i < characters.length - 1 && <>&nbsp;</>}
              </motion.span>
              <motion.span className="absolute left-0 top-0 inline-block" style={{ color: activeColor }} initial={{ y: "110%" }} animate={isActive ? { y: "0%" } : { y: "110%" }}>
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>
    );
  }
);
TextStaggerHover.displayName = "TextStaggerHover";

export const HoverSlideDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { index: number }>(
  ({ index, className, style, children, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext();
    const isActive = activeSlide === index;
    return (
      <p
        ref={ref}
        className={className}
        style={{
          overflow: "hidden",
          maxHeight: isActive ? "80px" : "0px",
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? "8px" : "0px",
          transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease",
          ...style,
        }}
        {...props}
      >
        {children}
      </p>
    );
  }
);
HoverSlideDescription.displayName = "HoverSlideDescription";

const clipPathVariants = {
  visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)" },
};

export const HoverSliderImageWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full${className ? ` ${className}` : ""}`}
      {...props}
    />
  )
);
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<HTMLImageElement, HTMLMotionProps<"img"> & HoverSliderImageProps>(
  ({ index, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext();
    return (
      <motion.img
        className={`inline-block align-middle${className ? ` ${className}` : ""}`}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
        ref={ref}
        {...props}
      />
    );
  }
);
HoverSliderImage.displayName = "HoverSliderImage";
