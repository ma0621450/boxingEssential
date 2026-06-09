import { getCategoryName } from "./product-categories";

export type AffiliateProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  description: string;
  price: string;
  image: string;
  affiliateUrl: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  ctaText?: string;
};

type SanityProduct = {
  _id: string;
  title: string;
  slug?: string;
  url: string;
  price?: string;
  image?: { asset?: { url?: string }; alt?: string };
  description?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  ctaText?: string;
  brand?: string;
};

const PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=800";

export function mapSanityProduct(raw: SanityProduct): AffiliateProduct {
  return {
    id: raw._id,
    name: raw.title,
    slug: raw.slug ?? "",
    category: raw.category,
    categoryName: getCategoryName(raw.category),
    description: raw.description ?? "",
    price: raw.price ?? "",
    image: raw.image?.asset?.url ?? PLACEHOLDER_IMAGE,
    affiliateUrl: raw.url,
    brand: raw.brand,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    featured: raw.featured,
    ctaText: raw.ctaText ?? "Shop Now",
  };
}

export function getProductPath(category: string, slug: string): string {
  return `/shop/${category}/${slug}`;
}
