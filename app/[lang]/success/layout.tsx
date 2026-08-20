import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default async function SuccessLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <Navbar lang={lang as Locale} variant="home" />
      {children}
      <Footer lang={lang as Locale} variant="home" dict={dict} />
    </>
  );
}
