import { MetadataRoute } from 'next';
import { i18n } from '../i18n-config';
import { SITE_URL } from "@/lib/site";
import { BLOG_SLUGS, NEWSROOM_SLUGS } from "@/lib/posts";
import th from "../dictionaries/th.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${SITE_URL}`;

  // ใส่ชื่อ Path หน้าย่อยทั้งหมดที่มีในโปรเจกต์ (ไม่ต้องใส่ /th หรือ /en เพราะโค้ดจะวนลูปเพิ่มให้อัตโนมัติ)
  const staticRoutes = [
    '', // หน้าแรก
    '/brand',
    '/influencer',
    '/about',
    '/contact',
    '/success',
    '/success-stories',
    '/blog',
    '/newsroom',
    '/buddy-ranks',
    '/faq',
  ];
  // หน้ารายละเอียด: บทความ ข่าว และเคสความสำเร็จ
  const detailRoutes = [
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    ...NEWSROOM_SLUGS.map((s) => `/newsroom/${s}`),
    ...th.successStories.map((s: { slug: string }) => `/success/${s.slug}`),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  [...staticRoutes, ...detailRoutes].forEach((route) => {
    i18n.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly', // หน้าแรกมักจะอัปเดตบ่อยกว่า
        priority: route === '' ? 1.0 : staticRoutes.includes(route) ? 0.8 : 0.6, // ให้ความสำคัญกับหน้าแรกสุด (เต็ม 1.0)
        alternates: {
          languages: Object.fromEntries(i18n.locales.map((l) => [l, `${baseUrl}/${l}${route}`])),
        },
      });
    });
  });

  return sitemapEntries;
}
