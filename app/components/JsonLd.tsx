import { SITE_URL } from "@/lib/site";

// Structured data (schema.org JSON-LD) for search engines.
// SiteJsonLd: the business (ProfessionalService) + the WebSite, on every page.
// FaqJsonLd: an FAQPage built from the same Q&As the page shows.

type Lang = "th" | "en";

const SAME_AS = [
  "https://www.facebook.com/buddyreview",
  "https://www.instagram.com/buddyreview_th/",
  "https://www.tiktok.com/@buddyreview.th",
  "https://www.youtube.com/@buddyreview7134",
  "https://th.linkedin.com/company/buddy-review",
  "https://www.lemon8-app.com/@buddyreview.th",
];

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SiteJsonLd({ lang }: { lang: Lang }) {
  const th = lang === "th";
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Buddy Review",
    legalName: th ? "บริษัท บับเบิลลี จำกัด" : "Bubblely Co., Ltd.",
    description: th
      ? "เปลี่ยนงบการตลาดให้เป็นยอดขายด้วย Influencer Marketing ที่ขับเคลื่อนด้วยข้อมูล Buddy Review คัดครีเอเตอร์ที่ใช่ พร้อมรายงานผลทุกแคมเปญ"
      : "Turn your marketing budget into sales with data-driven influencer marketing. Buddy Review selects the right creators and reports results on every campaign.",
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/buddy-review-purple-logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: "+66886861676",
    email: "info@buddyreview.co",
    priceRange: "฿฿",
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      streetAddress: th
        ? "1010 อาคารชินวัตรทาวเวอร์ 3 ห้อง 603 ชั้น 6 ถนนวิภาวดีรังสิต"
        : "1010 Shinawatra Tower 3, Room 603, 6th Floor, Vibhavadi Rangsit Rd",
      addressLocality: th ? "แขวงจตุจักร เขตจตุจักร" : "Chatuchak",
      addressRegion: th ? "กรุงเทพมหานคร" : "Bangkok",
      postalCode: "10900",
      addressCountry: "TH",
    },
    hasMap: "https://maps.app.goo.gl/q1jxiJsAzfqtQpXM7",
    areaServed: { "@type": "Country", name: "Thailand" },
    knowsAbout: ["Influencer Marketing", "KOL Marketing", "Creator Campaigns", "Social Media Marketing", "Affiliate & Live Commerce"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+66886861676",
      email: "info@buddyreview.co",
      areaServed: "TH",
      availableLanguage: ["Thai", "English"],
    },
    sameAs: SAME_AS,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Buddy Review",
    url: `${SITE_URL}/${lang}`,
    inLanguage: th ? "th-TH" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <>
      <Script data={business} />
      <Script data={website} />
    </>
  );
}

// "[label](url)" links inside answers become plain text for search engines
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/⁠/g, "") },
    })),
  };
  return <Script data={data} />;
}
