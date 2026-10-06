"use client";
import { useEffect, useRef } from "react";

export interface FanVideo {
  src: string;
  name: string;
}

const EDGE_ZONE = 0.22;
const HOVER_SPEED_MAX = 9;
const AUTO_SPEED = 1;

export default function VideoScrollFan({ videos }: { videos: FanVideo[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const hoverSpeedRef = useRef(0);
  const looped = [...videos, ...videos, ...videos];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".vsf-card"));

    // The strip position is kept as a float and written to scrollLeft each frame.
    // Phones round scrollLeft to whole (device) pixels, so the old
    // `scrollLeft += 0.7` was rounded straight back and the strip never moved.
    let pos = 0;
    let lastSet = -1;

    const applyLayout = () => {
      // pick up any change made outside this loop (drag, wheel, wrap)
      if (lastSet < 0 || Math.abs(scroller.scrollLeft - lastSet) > 1.5) pos = scroller.scrollLeft;
      if (!draggingRef.current) pos += AUTO_SPEED + hoverSpeedRef.current;

      const setWidth = scroller.scrollWidth / 3;
      if (setWidth > 0) {
        if (pos >= setWidth * 2) pos -= setWidth;
        else if (pos <= 0) pos += setWidth;
      }
      if (!draggingRef.current) scroller.scrollLeft = pos;
      lastSet = scroller.scrollLeft;

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
        const scale = 1 + edgeT * edgeT * 0.28;
        const translateY = abs * abs * 26;
        const rotate = p * abs * 10;

        card.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
        card.style.zIndex = String(Math.round(100 - abs * 50));
        card.style.opacity = String(1 - Math.max(0, abs - 0.92) * 6);
      });

      rafRef.current = requestAnimationFrame(applyLayout);
    };

    rafRef.current = requestAnimationFrame(applyLayout);

    // Only horizontal gestures (trackpad side-swipe / shift+wheel) move the
    // strip; a normal vertical wheel is left alone so the page keeps scrolling.
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      if (dx === 0) return;
      e.preventDefault();
      scroller.scrollLeft += dx;
    };

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      dragStartX.current = e.clientX;
      dragStartScroll.current = scroller.scrollLeft;
      scroller.setPointerCapture(e.pointerId);
      scroller.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (draggingRef.current) {
        const dx = e.clientX - dragStartX.current;
        scroller.scrollLeft = dragStartScroll.current - dx;
        return;
      }

      const rect = scroller.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;

      if (relX < EDGE_ZONE) {
        const t = 1 - relX / EDGE_ZONE;
        hoverSpeedRef.current = -t * t * HOVER_SPEED_MAX;
      } else if (relX > 1 - EDGE_ZONE) {
        const t = (relX - (1 - EDGE_ZONE)) / EDGE_ZONE;
        hoverSpeedRef.current = t * t * HOVER_SPEED_MAX;
      } else {
        hoverSpeedRef.current = 0;
      }
    };
    const endDrag = () => {
      draggingRef.current = false;
      scroller.style.cursor = "grab";
    };
    const onMouseLeave = () => {
      hoverSpeedRef.current = 0;
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointerleave", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("mouseleave", onMouseLeave);

    scroller.scrollLeft = scroller.scrollWidth / 3;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", endDrag);
      scroller.removeEventListener("pointerleave", endDrag);
      scroller.removeEventListener("pointercancel", endDrag);
      scroller.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [videos]);

  // Play only the clips that are (nearly) on screen; pause the rest. A clip's
  // file is fetched the first time it comes into view.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const vids = Array.from(scroller.querySelectorAll<HTMLVideoElement>("video.vsf-video"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (!v.getAttribute("src") && v.dataset.src) { v.src = v.dataset.src; v.preload = "auto"; }
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    }, { root: scroller, rootMargin: "0px 150px", threshold: 0.01 });
    vids.forEach((v) => io.observe(v));
    // also stop everything while the whole strip is scrolled off the page
    const pageIo = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) vids.forEach((v) => { if (!v.paused) v.pause(); });
      else vids.forEach((v) => { io.unobserve(v); io.observe(v); });
    }, { threshold: 0 });
    pageIo.observe(scroller);
    return () => { io.disconnect(); pageIo.disconnect(); };
  }, [videos]);

  return (
    <div className="vsf-wrap" style={{ position: "relative", width: "100%", margin: "0 auto" }}>
      <div
        ref={scrollerRef}
        className="vsf-scroller"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          overflowX: "auto",
          // must be hidden, not visible: with overflow-x auto the browser turns
          // "visible" into "auto", and the tilted/raised cards made the strip
          // scroll up and down by itself under the mouse wheel
          overflowY: "hidden",
          cursor: "grab",
          padding: "64px 56px 44px",
          scrollbarWidth: "none",
          touchAction: "pan-y",
        }}
      >
        {looped.map((v, i) => (
          <div
            key={v.src + i}
            className="vsf-card"
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: "clamp(168px, 18vw, 252px)",
              aspectRatio: "9 / 16",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
              willChange: "transform",
            }}
          >
            {/* src is attached only when the card nears the viewport (see the
                IntersectionObserver effect) — the strip renders 3× copies of
                every clip, and loading all of them at once starved other
                videos on the page of bandwidth. */}
            <video
              data-src={v.src}
              className="vsf-video"
              muted
              loop
              playsInline
              preload="none"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none", background: "#e9e1f7" }}
            />
          </div>
        ))}
      </div>
      <style>{`
        .vsf-scroller::-webkit-scrollbar{ display: none; }
        /* phones: smaller clips so ~3 full videos fit across the screen */
        @media (max-width: 640px){
          .vsf-scroller{ gap: 12px !important; padding: 36px 16px 30px !important; }
          .vsf-card{ width: 26vw !important; border-radius: 18px !important; box-shadow: 0 10px 22px rgba(0,0,0,0.14) !important; }
        }
      `}</style>
    </div>
  );
}
