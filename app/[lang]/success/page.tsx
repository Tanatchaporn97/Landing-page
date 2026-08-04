import { Suspense } from "react";
import { type Locale } from "../../../i18n-config";
import SuccessClient from "./SuccessClient";

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <SuccessClient lang={lang as Locale} />
    </Suspense>
  );
}
