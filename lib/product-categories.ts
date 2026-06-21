export type ProductCategory = {
  slug: string;
  name: string;
};

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getCategoryName(slug: string): string {
  return slugToTitle(slug);
}

export function mapProductCategories(slugs: string[]): ProductCategory[] {
  return slugs.map((slug) => ({
    slug,
    name: getCategoryName(slug),
  }));
}
