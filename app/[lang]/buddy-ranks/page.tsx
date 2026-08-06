import { type Locale } from "../../../i18n-config";
import BuddyRanksClient from "./BuddyRanksClient";

export default async function BuddyRanksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <BuddyRanksClient lang={lang as Locale} />;
}
