import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Rocket, Gem } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OurJourney from "../../components/OurJourney";
import AboutKeywordHero from "../../components/AboutKeywordHero";
import AboutBrandHero from "../../components/AboutBrandHero";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const META = {
  en: { title: "About Us | Buddy Review", description: "Learn more about Buddy Review, Thailand's influencer marketing agency." },
  th: { title: "เกี่ยวกับเรา | Buddy Review", description: "รู้จัก Buddy Review เอเจนซี่ Influencer Marketing ของไทย" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://agency.buddyreview.co/${lang}/about`,
      languages: { en: "https://agency.buddyreview.co/en/about", th: "https://agency.buddyreview.co/th/about" },
    },
    openGraph: {
      title: m.title, description: m.description,
      url: `https://agency.buddyreview.co/${lang}/about`,
      siteName: "Buddy Review",
      images: [{ url: "https://agency.buddyreview.co/og-image.jpg", width: 1200, height: 630 }],
      locale: lang === "th" ? "th_TH" : "en_US", type: "website",
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="background overflow-x-clip" style={{ ...KT, minHeight: "100vh" }}>
      <Navbar lang={lang as Locale} variant="home" onDark />
      <AboutBrandHero />
      <AboutKeywordHero />

      <section style={{ padding: "0 0 120px", textAlign: "center" }}>
        {/* intro copy (the company photo was removed; the keyword hero above opens the page) */}
        <div className="about-hero">
        <div style={{ flex: "0 0 auto", maxWidth: "960px", width: "100%", margin: "0 auto", padding: "0 48px 40px", boxSizing: "border-box" }}>
          <p className="desc-text" style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.85, margin: "44px 0 0" }}>
            {lang === "th"
              ? "Buddy Review คือ Influencer Marketing Agency ที่ให้บริการครบวงจร ตั้งแต่การวางกลยุทธ์ คัดเลือกอินฟลูเอนเซอร์ บริหารแคมเปญ ไปจนถึงการวัดผล โดยผสานความเชี่ยวชาญของทีมเข้ากับ Data และ Technology เพื่อช่วยให้แบรนด์ทำ Influencer Marketing ได้แม่นยำและวัดผลได้ชัดเจน"
              : "Buddy Review is a full-service influencer marketing agency — from strategy and influencer selection to campaign management and measurement. We combine our team's expertise with data and technology to help brands run influencer marketing that's precise and clearly measurable."}
          </p>
        </div>
        </div>

        {/* ── Vision / Mission / Value ── */}
        <div style={{ maxWidth: "1294px", margin: "40px auto 0", padding: "0 48px" }}>
          <div className="vmv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {(lang === "th" ? [
              { title: "Vision", desc: "ศูนย์กลาง Influencer Marketing ด้วยเทคโนโลยีล้ำสมัย เพื่อให้แบรนด์เข้าถึงผู้บริโภคอย่างมีประสิทธิภาพ", Icon: Eye },
              { title: "Mission", desc: "พัฒนาระบบที่ผสานเทคโนโลยีกับความเข้าใจตลาดอินฟลูเอนเซอร์ เพื่อตอบโจทย์ทุกความต้องการของแบรนด์", Icon: Rocket },
              { title: "Value", desc: "มอบแคมเปญพรีเมียมที่ปรับแต่งได้ เน้นผลลัพธ์ตรงเป้าและคุ้มค่า เพราะทุกแบรนด์ควรได้รับบริการที่ดีที่สุด", Icon: Gem },
            ] : [
              { title: "Vision", desc: "The hub of influencer marketing powered by cutting-edge technology, helping brands reach consumers effectively.", Icon: Eye },
              { title: "Mission", desc: "Building systems that blend technology with a deep understanding of the influencer market to meet every brand's needs.", Icon: Rocket },
              { title: "Value", desc: "Delivering customizable premium campaigns focused on real results and value — because every brand deserves the best service.", Icon: Gem },
            ]).map((item) => (
              <div key={item.title} className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                <div className="group-hover:border-white/90 transition-all duration-500" style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "24px",
                  padding: "48px 32px",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
                }}>
                  {/* Decorative animated layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/25 opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transform group-hover:scale-110 transition-all duration-700"
                      style={{ background: "radial-gradient(circle, rgba(95,38,229,0.25) 0%, transparent 70%)" }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  <div className="relative z-10">
                    <div className="relative mb-6 inline-flex">
                      <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ borderColor: "rgba(95,38,229,0.25)" }} />
                      <div className="absolute inset-0 rounded-full border animate-pulse" style={{ borderColor: "rgba(255,0,137,0.2)" }} />
                      <div className="relative p-5 rounded-full backdrop-blur-lg border border-white/70 shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500"
                        style={{ background: "rgba(255,255,255,0.6)" }}>
                        <div className="transform group-hover:rotate-180 transition-transform duration-700">
                          <item.Icon className="w-7 h-7" style={{ color: "#5f26e5" }} />
                        </div>
                      </div>
                    </div>

                    <h3 style={{ ...KT, fontSize: "clamp(24px,2.6vw,32px)", fontWeight: 800, margin: "0 0 20px",
                      background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {item.title}
                    </h3>
                    <p style={{ ...KT, fontSize: "16px", color: "#111827", lineHeight: 1.8, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Journey ── */}
        <OurJourney lang={lang as Locale} />

        {/* ── Meet Our Co-Founder ── */}
        <div style={{ maxWidth: "1100px", margin: "96px auto 0", padding: "0 48px" }}>
          <h2 className="section-title text-center font-bold mb-12 section-h2-fixed" style={{ ...KT, fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "72px",
            fontFeatureSettings: "'pnum' on,'lnum' on" }}>
            Meet Our{" "}
            <span style={{ background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Co-Founder
            </span>
          </h2>

          <div style={{ margin: "0 auto 48px" }}>
            <TestimonialSlider
              reviews={[
                { id: "phat", name: "ณพัชร รัตนถาวรกิติ (พัชร)", affiliation: "CEO, Co-founder",
                  quote: "เราสร้างอนาคตของ Influencer Marketing ด้วยวิสัยทัศน์ที่ชัดเจนและผลลัพธ์ที่พิสูจน์ได้",
                  imageSrc: "/co-founder/co-founder-2.jpg", thumbnailSrc: "/co-founder/co-founder-2.jpg" },
                { id: "nick", name: "ณัฏฐดนัย รักตประจิต (นิค)", affiliation: "Co-founder",
                  quote: "เราสร้างการตลาดอินฟลูเอนเซอร์ที่ไม่ได้แค่ 'ดัง' แต่สร้าง 'กำไรจริง'",
                  imageSrc: "/co-founder/co-founder-1.jpg", thumbnailSrc: "/co-founder/co-founder-1.jpg" },
                { id: "boss", name: "เศรษฐพร ศรีวิไล (บอส)", affiliation: "Co-founder",
                  quote: "เทคโนโลยีของเราคือขุมพลังที่เปลี่ยนทุกข้อมูล สู่ผลลัพธ์ที่แม่นยำ",
                  imageSrc: "/co-founder/co-founder-3.jpg", thumbnailSrc: "/co-founder/co-founder-3.jpg" },
              ]}
              className="bg-white/25 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(95,38,229,0.15)]"
            />
          </div>

          <a href={`/${lang}#contact`} className="btn-glass-purple"
            style={{ ...KT, borderRadius: "50px", padding: "14px 40px", textDecoration: "none", fontSize: "16px", fontWeight: 600 }}>
            {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
          </a>
        </div>

        <style>{`
          @media (max-width: 760px){
            .cofounder-grid{ grid-template-columns: 1fr !important; max-width: 320px !important; }
            .about-hero > div:last-child{ padding: 0 24px 28px !important; }
          }
        `}</style>
      </section>

      {/* ── Life at Buddy ── photos from "About Us/Selected Gallery". The grid flows by column in
           2 rows, so items go in stacked pairs (2 wide or 2 small landscapes) then 2 portraits — no holes. */}
      <InteractiveImageBentoGallery
        title={<>Life at{" "}
          <span style={{ background: "linear-gradient(45deg,#5f25e5 0%,#ff0089 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Buddy
          </span>
        </>}
        imageItems={[
          { id: 11, title: lang === "th" ? "ทริปประจำปีบริษัท" : "Annual Company Trip", desc: lang === "th" ? "ทุกคนพร้อมหน้าริมทะเล" : "The whole team together by the sea", url: "/life-at-buddy/life-11.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 2, title: lang === "th" ? "แลกของขวัญปีใหม่" : "Gift Exchange", desc: lang === "th" ? "ลุ้นของขวัญกันสนุกสนาน" : "Surprises all around", url: "/life-at-buddy/life-02.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 1, title: lang === "th" ? "ออกบูธงานอีเวนต์" : "Event Booth", desc: lang === "th" ? "พาแบรนด์ไปพบผู้คนในงาน" : "Bringing the brand to the show", url: "/life-at-buddy/life-01.jpg", span: "md:row-span-2" },
          { id: 5, title: lang === "th" ? "ตกปลากลางทะเล" : "Fishing Trip", desc: lang === "th" ? "กิจกรรมผ่อนคลายกลางทะเล" : "A relaxing day out on the water", url: "/life-at-buddy/life-05.jpg", span: "md:row-span-2" },
          { id: 9, title: lang === "th" ? "นั่งเรือเที่ยวเกาะ" : "Island Boat Ride", desc: lang === "th" ? "ล่องเรือไปด้วยกันทั้งทีม" : "Cruising between the islands together", url: "/life-at-buddy/life-09.jpg", span: "md:row-span-1" },
          { id: 12, title: lang === "th" ? "ดินเนอร์ริมชายหาด" : "Beachside Dinner", desc: lang === "th" ? "มื้อค่ำสุดพิเศษริมทะเล" : "A special evening by the sea", url: "/life-at-buddy/life-12.jpg", span: "md:row-span-1" },
          { id: 16, title: lang === "th" ? "โชว์ดนตรีสด" : "Live Music Night", desc: lang === "th" ? "ขึ้นเวทีร้องเพลงสุดมันส์" : "Taking the mic for a live performance", url: "/life-at-buddy/life-16.jpg", span: "md:row-span-2" },
          { id: 7, title: lang === "th" ? "ของขวัญปีใหม่" : "New Year Gifts", desc: lang === "th" ? "ส่งความสุขรับปีใหม่ด้วยกัน" : "Ringing in the new year together", url: "/life-at-buddy/life-07.jpg", span: "md:row-span-2" },
          { id: 3, title: lang === "th" ? "นั่งรถเที่ยวเกาะ" : "Island Ride", desc: lang === "th" ? "เดินทางรอบเกาะแบบท้องถิ่น" : "Getting around the island like a local", url: "/life-at-buddy/life-03.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 19, title: lang === "th" ? "ปาร์ตี้ฮาโลวีน" : "Halloween Party", desc: lang === "th" ? "แต่งตัวสุดครีเอทีฟที่ออฟฟิศ" : "Getting creative at the office", url: "/life-at-buddy/life-19.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 13, title: lang === "th" ? "ออกเรือตกปลา" : "Out at Sea", desc: lang === "th" ? "สนุกไปกับลมทะเล" : "Fun in the sea breeze", url: "/life-at-buddy/life-13.jpg", span: "md:row-span-2" },
          { id: 23, title: lang === "th" ? "บุคคลต้นแบบของทีม" : "Team Role Model", desc: lang === "th" ? "แรงบันดาลใจให้ทีมทุกคน" : "Inspiring the whole team", url: "/life-at-buddy/life-23.jpg", span: "md:row-span-2" },
          { id: 17, title: lang === "th" ? "งานเลี้ยงกลางแจ้ง" : "Outdoor Gala Dinner", desc: lang === "th" ? "ค่ำคืนสังสรรค์ใต้แสงไฟ" : "An evening celebration under the lights", url: "/life-at-buddy/life-17.jpg", span: "md:row-span-1" },
          { id: 8, title: lang === "th" ? "มื้ออาหารพร้อมหน้าทีม" : "Team Meal Together", desc: lang === "th" ? "กินข้าวพร้อมหน้ากันทั้งทีม" : "Sharing a meal as one team", url: "/life-at-buddy/life-08.jpg", span: "md:row-span-1" },
          { id: 14, title: lang === "th" ? "วันพักผ่อนกลางทะเล" : "A Day at Sea", desc: lang === "th" ? "ผ่อนคลายไปกับสายลมและทะเล" : "Relaxing out on the open water", url: "/life-at-buddy/life-14.jpg", span: "md:row-span-2" },
          { id: 22, title: lang === "th" ? "เข้าคิวรับอาหาร" : "Buffet Time", desc: lang === "th" ? "ต่อแถวรับของอร่อยด้วยกัน" : "Lining up for the good stuff", url: "/life-at-buddy/life-22.jpg", span: "md:row-span-2" },
          { id: 4, title: lang === "th" ? "ปาร์ตี้สังสรรค์" : "Team Night Out", desc: lang === "th" ? "ปลดปล่อยหลังเลิกงาน" : "Unwinding together after hours", url: "/life-at-buddy/life-04.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 10, title: lang === "th" ? "ระหว่างทางไปเที่ยว" : "On the Way", desc: lang === "th" ? "รอยยิ้มตลอดการเดินทาง" : "Smiles all the way there", url: "/life-at-buddy/life-10.jpg", span: "md:col-span-2 md:row-span-1" },
          { id: 18, title: lang === "th" ? "มุ่งหน้าสู่ท่าเรือ" : "Heading to the Pier", desc: lang === "th" ? "พร้อมออกเดินทางไปด้วยกัน" : "Setting off on the next adventure", url: "/life-at-buddy/life-18.jpg", span: "md:row-span-2" },
          { id: 20, title: lang === "th" ? "ต้อนรับผู้ร่วมงาน" : "Welcoming Guests", desc: lang === "th" ? "พูดคุยแลกเปลี่ยนในงานอีเวนต์" : "Connecting with visitors at the event", url: "/life-at-buddy/life-20.jpg", span: "md:row-span-2" },
          { id: 24, title: lang === "th" ? "ทีมงานที่บูธ" : "Team at the Booth", desc: lang === "th" ? "พร้อมต้อนรับทุกคนที่บูธ" : "Ready to welcome every visitor", url: "/life-at-buddy/life-24.jpg", span: "md:row-span-1" },
          { id: 21, title: lang === "th" ? "มอบของขวัญส่งท้ายปี" : "Year-End Gift Giving", desc: lang === "th" ? "ความสุขเล็กๆ ส่งท้ายปี" : "Small gifts to close out the year", url: "/life-at-buddy/life-21.jpg", span: "md:row-span-1" },
          { id: 15, title: lang === "th" ? "ลุ้นปลากินเบ็ด" : "Waiting for a Bite", desc: lang === "th" ? "รอจังหวะกันทั้งเรือ" : "The whole boat waiting for a catch", url: "/life-at-buddy/life-15.jpg", span: "md:row-span-2" },
          { id: 6, title: lang === "th" ? "สนุกกับการตกปลา" : "Fishing Fun", desc: lang === "th" ? "ยิ้มรับความสนุกกลางทะเล" : "All smiles out on the boat", url: "/life-at-buddy/life-06.jpg", span: "md:row-span-2" },
        ]}
      />

      <Footer lang={lang as Locale} variant="home" dict={dict} />
    </div>
  );
}
