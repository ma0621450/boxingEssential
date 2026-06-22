import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { escapeXml, sitemapImageXml } from "@/lib/site-image-url";
import { groq } from "next-sanity";

export const revalidate = 3600;

const getAllPostSlugsForSitemap = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }
`;

export async function GET() {
  const baseUrl = "https://www.boxingessential.com";

  let posts: {
    slug: string;
    _updatedAt: string;
    publishedAt: string;
    imageUrl: string | null;
  }[] = [];

  try {
    posts = await client.fetch(
      getAllPostSlugsForSitemap,
      {},
      {
        next: { revalidate: 3600 },
      }
    );
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  const currentDate = new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${posts
  .map(
    (post) => `
    <url>
        <loc>${baseUrl}/${post.slug}</loc>
        <lastmod>${new Date(
          post._updatedAt || post.publishedAt || currentDate
        ).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>

        ${sitemapImageXml(post.imageUrl)}
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
