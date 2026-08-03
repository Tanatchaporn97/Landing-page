import { Suspense } from "react";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import BlogClient from "./BlogClient";

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <BlogClient lang={lang as Locale} dict={dict} />
    </Suspense>
  );
}
