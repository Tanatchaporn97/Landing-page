"use client";
import { useEffect, useRef, useState } from "react";

export default function ScatterScale({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.offsetWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} style={{ width: "100%", maxWidth: `${width}px`, margin: "0 auto", height: `${height * scale}px`, overflow: "hidden" }}>
      <div style={{ position: "relative", width: `${width}px`, height: `${height}px`, transform: `scale(${scale})`, transformOrigin: "top center" }}>
        {children}
      </div>
    </div>
  );
}
