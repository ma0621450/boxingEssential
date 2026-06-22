import { SITE_BASE_URL } from "./sitemap-data";
import { slugify } from "./slugify";

type SiteImagePathOptions = {
  alt?: string | null;
  fallbackSlug: string;
};

/** Builds a site URL path from image alt text, e.g. /boxing-nutrition-plan */
export function toSiteImagePath({ alt, fallbackSlug }: SiteImagePathOptions): string {
  const label = alt?.trim() || fallbackSlug;
  const slug = slugify(label) || slugify(fallbackSlug);
  return `/${slug}`;
}

export function toSiteImageUrl(options: SiteImagePathOptions): string | null {
  const path = toSiteImagePath(options);
  if (path === "/") return null;
  return `${SITE_BASE_URL}${path}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapImageXml(options: SiteImagePathOptions): string {
  const siteImage = toSiteImageUrl(options);
  if (!siteImage) return "";

  return `
        <image:image>
            <image:loc>${escapeXml(siteImage)}</image:loc>
        </image:image>
        `;
}
