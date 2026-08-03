import { type Locale } from "../../../i18n-config";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default async function SuccessLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <Navbar lang={lang as Locale} variant="influencer" />
      {children}
      <Footer lang={lang as Locale} variant="home" />
    </>
  );
}
