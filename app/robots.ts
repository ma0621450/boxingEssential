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
      "https://boxingessential.com/sitemap.xml",
      "https://boxingessential.com/static-sitemap.xml",
      "https://boxingessential.com/blog-sitemap.xml",
      "https://boxingessential.com/video-sitemap.xml",
    ],
  };
}
