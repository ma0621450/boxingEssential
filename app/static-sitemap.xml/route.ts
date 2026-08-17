import { NextResponse } from "next/server";
import { SITE_ORIGIN } from "@/lib/site-url";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = SITE_ORIGIN;

  const currentDate = new Date();

  const staticRoutes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      path: "/blog",
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      path: "/news",
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      path: "/shop",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "/live",
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      path: "/training/boxing",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "/training/fitness",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "/training/gym",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "/about",
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      path: "/contact-us",
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      path: "/sitemap",
      priority: 0.4,
      changeFrequency: "weekly",
    },
    {
      path: "/privacy-policy",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      path: "/disclaimer",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      path: "/terms-and-conditions",
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${staticRoutes
  .map(
    (route) => `
    <url>
        <loc>${baseUrl}${route.path}</loc>
        <lastmod>${currentDate.toISOString()}</lastmod>
        <changefreq>${route.changeFrequency}</changefreq>
        <priority>${route.priority}</priority>
    </url>
`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
