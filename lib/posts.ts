// Article slugs, shared by the post pages (generateStaticParams) and the sitemap.
// Hidden posts drop out of every list, their pages 404 and they leave the sitemap; their content stays in
// blog/[slug]/page.tsx, so taking a slug off this list brings the article back.
export const HIDDEN_POSTS = ["how-to-start-influencer-campaign", "influencer-marketing-budget-by-objective", "how-to-choose-influencer-checklist", "instagram-2026-benchmark"];
export const BLOG_SLUGS = ["facebook-algorithm-2026", "adapt-content-for-each-platform", "how-to-start-influencer-campaign", "how-to-choose-influencer-marketing-agency", "how-to-find-the-right-influencer", "influencer-marketing-budget-by-objective", "how-to-choose-influencer-checklist", "instagram-2026-benchmark", "content-per-platform-fb-tiktok-ig", "social-media-insight-2026", "content-strategy-canvas", "tiktok-algorithm-9-techniques", "influencer-mapping-canvas", "6-copywriting-techniques"].filter((s) => !HIDDEN_POSTS.includes(s));
export const NEWSROOM_SLUGS = ["outing-trip-2025", "ais-infinite-smes-2026", "cp-all-influencer-trend-ep8", "peerpower-interview-buddy-review"];
