// The site's public address — the one source for metadataBase, canonical URLs, hreflang alternates,
// Open Graph images, JSON-LD, the sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL (in Vercel →
// Settings → Environment Variables) to the production domain once it is connected; until then the
// site is served from its Vercel address.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://landing-page-bubblely.vercel.app").replace(/\/$/, "");
