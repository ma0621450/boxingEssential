import { SITE_BASE_URL } from "./sitemap-data";

/**
 * Rewrites remote CDN image URLs to this site's domain via Next.js image optimization.
 * Local /public paths are returned as absolute site URLs.
 */
export function toSiteImageUrl(
  imageUrl: string | null | undefined,
  width = 1200
): string | null {
  if (!imageUrl?.trim()) return null;

  const trimmed = imageUrl.trim();

  if (trimmed.startsWith("/")) {
    return `${SITE_BASE_URL}${trimmed}`;
  }

  try {
    const { hostname } = new URL(trimmed);
    if (hostname === "www.boxingessential.com" || hostname === "boxingessential.com") {
      return trimmed;
    }
  } catch {
    return null;
  }

  const params = new URLSearchParams({
    url: trimmed,
    w: String(width),
    q: "75",
  });

  return `${SITE_BASE_URL}/_next/image?${params.toString()}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapImageXml(imageUrl: string | null | undefined): string {
  const siteImage = toSiteImageUrl(imageUrl);
  if (!siteImage) return "";

  return `
        <image:image>
            <image:loc>${escapeXml(siteImage)}</image:loc>
        </image:image>
        `;
}
