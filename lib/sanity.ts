import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  // Token can see drafts under older API defaults; keep production on published only.
  perspective: 'published',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/** True when source has a usable Sanity asset ref/id (not a broken/null expansion). */
function hasImageAsset(source: any): boolean {
  if (!source) return false;
  if (typeof source === "string") return true;
  return Boolean(
    source.asset?._ref ||
      source.asset?._id ||
      source.asset?.url ||
      source._ref ||
      source._id
  );
}

/**
 * Safe image URL for CMS images. Handles missing mainImage, deleted assets
 * (GROQ expands to `{ asset: null }`), and plain asset URLs from queries.
 */
export function getSanityImageUrl(source: any): string | null {
  if (!hasImageAsset(source)) return null;
  if (source?.asset?.url) return source.asset.url;
  try {
    return builder.image(source).url();
  } catch {
    return null;
  }
}
