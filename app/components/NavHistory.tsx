"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Session flags (sessionStorage, per tab):
//   br-pages — how many pages this tab has shown on the site; > 1 means a "Back"
//              click can return to the page (and section) the visitor came from
//   br-pop   — set while a browser back/forward navigation is landing, so pages
//              that normally reset to the top on entry can keep the restored scroll
//   br-scroll — last scroll position per path, re-applied on back/forward once
//              the page is tall enough (the browser's own restore can run before
//              long pages finish rendering and land short of the section)
const PAGES = "br-pages";
const POP = "br-pop";
const SCROLL = "br-scroll";

function read(key: string) {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string | null) {
  try { value === null ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, value); } catch {}
}

/** Mounted once in the layout: counts page views and flags back/forward navigations. */
export default function NavHistory() {
  const pathname = usePathname();
  useEffect(() => {
    const onPop = () => write(POP, "1");
    let pending = 0;
    const onScroll = () => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        const saved = JSON.parse(read(SCROLL) || "{}");
        saved[location.pathname] = Math.round(window.scrollY);
        write(SCROLL, JSON.stringify(saved));
      }, 150);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(pending);
    };
  }, []);
  useEffect(() => {
    write(PAGES, String(Number(read(PAGES) || 0) + 1));
    // back/forward: keep re-applying the saved position until the page is tall enough
    // to hold it (≈2s max); any wheel/touch/key from the visitor stops it
    let stopRestore = () => {};
    if (isHistoryNavigation()) {
      const target = JSON.parse(read(SCROLL) || "{}")[pathname];
      if (typeof target === "number" && target > 0) {
        let tries = 0, timer = 0;
        const stopEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
        stopRestore = () => { clearTimeout(timer); stopEvents.forEach((e) => window.removeEventListener(e, stopRestore)); };
        const tick = () => {
          if (Math.abs(window.scrollY - target) > 4) window.scrollTo(0, target);
          if (++tries < 20) timer = window.setTimeout(tick, 100); else stopRestore();
        };
        stopEvents.forEach((e) => window.addEventListener(e, stopRestore, { passive: true }));
        timer = window.setTimeout(tick, 50);
      }
    }
    // clear the flag once the new page's own mount effects have read it (this
    // component renders before the page, so its effect runs first)
    const t = setTimeout(() => write(POP, null), 100);
    return () => { clearTimeout(t); stopRestore(); };
  }, [pathname]);
  return null;
}

/** True while the current page was reached with the browser's back/forward. */
export function isHistoryNavigation() {
  return read(POP) === "1";
}

/** Go back to the previous page on the site (scroll restored to the section the
 *  visitor left); with no on-site history — e.g. a link opened in a new tab — go to `fallback`. */
export function historyBack(router: ReturnType<typeof useRouter>, fallback: string) {
  if (Number(read(PAGES) || 0) > 1 && window.history.length > 1) router.back();
  else router.push(fallback);
}

/** A link-styled back control for server components: behaves like `historyBack`,
 *  and stays a real link to `fallback` (no-JS, open-in-new-tab). */
export function HistoryBackLink({ fallback, className, style, children }: {
  fallback: string; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Link href={fallback} className={className} style={style}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        historyBack(router, fallback);
      }}>
      {children}
    </Link>
  );
}
