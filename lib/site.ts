// The site's public address, used for canonical URLs, hreflang alternates, Open Graph images,
// the sitemap and robots.txt. Until the agency.buddyreview.co domain is connected, the site is
// served from its Vercel address — switch this one value (or set NEXT_PUBLIC_SITE_URL) when it is.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://landing-page-bubblely.vercel.app").replace(/\/$/, "");
