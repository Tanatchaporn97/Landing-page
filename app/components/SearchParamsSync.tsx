"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Reads the URL query (?cat=, ?from=, ?budget=…) and hands it to the page.
// useSearchParams makes a statically built page skip server rendering up to its nearest <Suspense>,
// so it lives in this empty component instead of the page itself — render it inside its own
// <Suspense fallback={null}> and the page's content stays in the server HTML for search engines.
export default function SearchParamsSync({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => { onChange(new URLSearchParams(searchParams.toString())); }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
