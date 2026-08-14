import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://www.yourdomain.com/sitemap.xml', // TODO: เปลี่ยนเป็น Domain จริงของคุณ
  };
}
