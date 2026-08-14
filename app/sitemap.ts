import { MetadataRoute } from 'next';
import { i18n } from '../i18n-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://agency.buddyreview.co';

  // ใส่ชื่อ Path หน้าย่อยทั้งหมดที่มีในโปรเจกต์ (ไม่ต้องใส่ /th หรือ /en เพราะโค้ดจะวนลูปเพิ่มให้อัตโนมัติ)
  const staticRoutes = [
    '', // หน้าแรก
    '/blog',
    '/buddy-ranks',
    '/category',
    '/faq',
    '/influencer',
    '/success',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  staticRoutes.forEach((route) => {
    i18n.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly', // หน้าแรกมักจะอัปเดตบ่อยกว่า
        priority: route === '' ? 1.0 : 0.8, // ให้ความสำคัญกับหน้าแรกสุด (เต็ม 1.0)
      });
    });
  });

  // ถ้าในอนาคตมีหน้ารายละเอียดแบบ Dynamic (เช่น /blog/my-post-1)
  // สามารถ Fetch ข้อมูลบทความจาก Database มาวนลูป .push() ใส่ใน sitemapEntries ตรงนี้ได้เลยครับ

  return sitemapEntries;
}
