import HomeClientWrapper from "../components/HomeClientWrapper";
import { type Locale } from "../../i18n-config";
import { getDictionary } from "../../get-dictionary";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <HomeClientWrapper lang={lang as Locale} dict={dict.home} />;
}
