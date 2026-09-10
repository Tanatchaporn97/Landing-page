"use client";
import { useEffect, useRef } from "react";

export interface FanVideo {
  src: string;
  name: string;
}

export default function VideoScrollFan({ videos }: { videos: FanVideo[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".vsf-card"));

    const applyLayout = () => {
      const containerRect = scroller.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const half = containerRect.width / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        let p = (cardCenter - centerX) / half;
        p = Math.max(-1, Math.min(1, p));
        const abs = Math.abs(p);

        const edgeT = Math.max(0, (abs - 0.45) / 0.55);
        const scale = 1 + edgeT * edgeT * 0.42;
        const translateY = abs * abs * 26;
        const rotate = p * abs * 10;

        card.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
        card.style.zIndex = String(Math.round(100 - abs * 50));
      });

      rafRef.current = requestAnimationFrame(applyLayout);
    };

    rafRef.current = requestAnimationFrame(applyLayout);

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      scroller.scrollLeft += delta;
    };

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      dragStartX.current = e.clientX;
      dragStartScroll.current = scroller.scrollLeft;
      scroller.setPointerCapture(e.pointerId);
      scroller.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartX.current;
      scroller.scrollLeft = dragStartScroll.current - dx;
    };
    const endDrag = () => {
      draggingRef.current = false;
      scroller.style.cursor = "grab";
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointerleave", endDrag);
    scroller.addEventListener("pointercancel", endDrag);

    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", endDrag);
      scroller.removeEventListener("pointerleave", endDrag);
      scroller.removeEventListener("pointercancel", endDrag);
    };
  }, [videos]);

  return (
    <div
      ref={scrollerRef}
      className="vsf-scroller"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        overflowX: "auto",
        overflowY: "visible",
        cursor: "grab",
        padding: "60px 6vw 40px",
        scrollbarWidth: "none",
        touchAction: "pan-y",
      }}
    >
      {videos.map((v, i) => (
        <div
          key={v.src + i}
          className="vsf-card"
          style={{
            position: "relative",
            flex: "0 0 auto",
            width: "clamp(140px, 15vw, 210px)",
            aspectRatio: "9 / 16",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
            willChange: "transform",
          }}
        >
          <video
            src={v.src}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
          />
          {i === videos.length - 1 && (
            <div style={{
              position: "absolute", bottom: "12px", right: "12px",
              width: "30px", height: "30px", borderRadius: "50%",
              background: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          )}
        </div>
      ))}
      <style>{`
        .vsf-scroller::-webkit-scrollbar{ display: none; }
      `}</style>
    </div>
  );
}
