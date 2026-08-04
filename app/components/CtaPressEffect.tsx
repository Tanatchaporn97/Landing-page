"use client";
import { useEffect } from "react";
import { animate, press } from "motion";

// Every CTA-style button/link across the site.
const CTA_SELECTOR = ".btn-hero, .btn-insight, .btn-line, .br-cta-btn, .br-login-btn, .hero-cta-btn-inf, .cta-submit";

export default function CtaPressEffect() {
  useEffect(() => {
    const attached = new WeakSet<Element>();
    const cancels: VoidFunction[] = [];

    const attach = () => {
      document.querySelectorAll(CTA_SELECTOR).forEach((el) => {
        if (attached.has(el)) return;
        attached.add(el);
        const cancelPress = press(el, (element) => {
          animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 });
          return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 500 });
        });
        cancels.push(cancelPress);
      });
    };

    // Catch CTAs already on the page, then keep watching for ones that
    // mount later via next/dynamic (contact form, FAQ, blog cards, etc.) —
    // press() only snapshots elements matching the selector at call time.
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cancels.forEach((cancel) => cancel());
    };
  }, []);

  return null;
}
