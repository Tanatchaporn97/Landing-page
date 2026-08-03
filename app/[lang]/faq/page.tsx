import { Suspense } from "react";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import FaqClient from "./FaqClient";

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <FaqClient lang={lang as Locale} dict={dict} />
    </Suspense>
  );
}
