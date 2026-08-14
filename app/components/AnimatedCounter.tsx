"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  target,
  startValue = 0,
  suffix = "",
  duration = 300,
}: {
  target: number;
  startValue?: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(startValue);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + (target - startValue) * eased;
          setValue(Math.round(currentValue));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, startValue, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}{suffix}
    </span>
  );
}
