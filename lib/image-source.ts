import { groq } from "next-sanity";
import { serverClient } from "@/lib/sanity";
import { slugify } from "@/lib/slugify";

export const getPostImageSources = groq`
  *[_type == "post" && defined(slug.current) && defined(mainImage.asset) && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())] {
    "slug": slug.current,
    "imageAlt": mainImage.alt,
    "imageUrl": mainImage.asset->url,
    "mimeType": mainImage.asset->mimeType
  }
`;

export const getTutorialImageSources = groq`
  *[_type == "tutorial" && defined(slug.current) && defined(thumbnail.asset)] {
    "slug": slug.current,
    "imageAlt": thumbnail.alt,
    "imageUrl": thumbnail.asset->url,
    "mimeType": thumbnail.asset->mimeType
  }
`;

type ImageSource = {
  slug: string;
  imageAlt?: string;
  imageUrl: string;
  mimeType?: string;
};

function imagePathSlug(source: Pick<ImageSource, "slug" | "imageAlt">): string {
  const fromAlt = source.imageAlt?.trim();
  return slugify(fromAlt || source.slug);
}

export async function getImageSourceMap(): Promise<Map<string, ImageSource>> {
  const [posts, tutorials] = await Promise.all([
    serverClient.fetch<ImageSource[]>(getPostImageSources),
    serverClient.fetch<ImageSource[]>(getTutorialImageSources),
  ]);

  const map = new Map<string, ImageSource>();

  for (const source of [...posts, ...tutorials]) {
    const pathSlug = imagePathSlug(source);
    if (!pathSlug || map.has(pathSlug)) continue;
    map.set(pathSlug, source);
  }

  return map;
}

export async function getImageSourceByPathSlug(
  pathSlug: string
): Promise<ImageSource | null> {
  const map = await getImageSourceMap();
  return map.get(pathSlug) ?? null;
}
