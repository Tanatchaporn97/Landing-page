"use client";
import { useEffect } from "react";
import { animate, hover } from "motion";

export default function UnlockIconHover() {
  useEffect(() => {
    return hover(".unlock-icon-img", (element) => {
      animate(element, { scale: 1.3 });
      return () => animate(element, { scale: 1 });
    });
  }, []);

  return null;
}
