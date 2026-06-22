import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { sitemapImageXml } from "@/lib/site-image-url";
import { groq } from "next-sanity";

export const revalidate = 3600;

const getAllTutorialSlugsForSitemap = groq`
  *[_type == "tutorial" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    publishedAt,
    "imageUrl": thumbnail.asset->url
  }
`;

export async function GET() {
  const baseUrl = "https://www.boxingessential.com";

  let tutorials: {
    slug: string;
    _updatedAt: string;
    publishedAt: string;
    imageUrl: string | null;
  }[] = [];

  try {
    tutorials = await client.fetch(
      getAllTutorialSlugsForSitemap,
      {},
      { next: { revalidate: 3600 } }
    );
  } catch (error) {
    console.error("Error fetching tutorials for sitemap:", error);
  }

  const currentDate = new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${tutorials
  .map(
    (tutorial) => `
    <url>
        <loc>${baseUrl}/videos/${tutorial.slug}</loc>
        <lastmod>${new Date(
          tutorial._updatedAt || tutorial.publishedAt || currentDate
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>

        ${sitemapImageXml(tutorial.imageUrl)}
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
