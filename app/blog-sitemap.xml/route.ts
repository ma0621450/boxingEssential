import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { sitemapImageXml } from "@/lib/site-image-url";
import { groq } from "next-sanity";

export const revalidate = 3600;

const getAllPostSlugsForSitemap = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())] {
    "slug": slug.current,
    _updatedAt,
    publishedAt,
    "imageAlt": mainImage.alt,
    "hasImage": defined(mainImage.asset)
  }
`;

export async function GET() {
  const baseUrl = "https://boxingessential.com";

  let posts: {
    slug: string;
    _updatedAt: string;
    publishedAt: string;
    imageAlt: string | null;
    hasImage: boolean;
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

        ${
          post.hasImage
            ? sitemapImageXml({ alt: post.imageAlt, fallbackSlug: post.slug })
            : ""
        }
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
