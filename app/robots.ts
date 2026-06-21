export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: [
      "https://www.boxingessential.com/sitemap.xml",
      "https://www.boxingessential.com/static-sitemap.xml",
      "https://www.boxingessential.com/blog-sitemap.xml",
      "https://www.boxingessential.com/video-sitemap.xml",
    ],
  };
}
