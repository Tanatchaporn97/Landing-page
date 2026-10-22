"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import type { CSSProperties } from "react";

// Animated WebGL mesh-gradient background (from @paper-design/shaders-react), adapted from the
// "background-shader" waitlist demo into a reusable layer: it fills its positioned parent, sits
// behind content, and takes the colours / motion as props. If WebGL isn't available the canvas just
// stays empty, so keep a plain CSS gradient underneath as a fallback.
export interface BackgroundShaderProps {
  colors: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  scale?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  style?: CSSProperties;
  /** render-resolution cap — a soft mesh gradient looks the same at low resolution, and it saves GPU */
  maxPixelCount?: number;
  minPixelRatio?: number;
}

export default function BackgroundShader({
  colors,
  distortion = 0.8,
  swirl = 0.1,
  speed = 1,
  scale = 1,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  className,
  style,
  maxPixelCount = 360000,
  minPixelRatio = 0.5,
}: BackgroundShaderProps) {
  return (
    <MeshGradient
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      colors={colors}
      distortion={distortion}
      swirl={swirl}
      speed={speed}
      scale={scale}
      rotation={rotation}
      offsetX={offsetX}
      offsetY={offsetY}
      maxPixelCount={maxPixelCount}
      minPixelRatio={minPixelRatio}
    />
  );
}
