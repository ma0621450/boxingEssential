export type ProductCategory = {
  slug: string;
  name: string;
  description: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "boxing-gloves",
    name: "Boxing Gloves",
    description: "Expert-reviewed boxing gloves for training, sparring, and competition.",
  },
  {
    slug: "punching-bags",
    name: "Punching Bags",
    description: "Heavy bags, speed bags, and freestanding bags for home and gym training.",
  },
  {
    slug: "boxing-shoes",
    name: "Boxing Shoes",
    description: "Lightweight boxing shoes built for footwork, grip, and ring performance.",
  },
  {
    slug: "protective-gear",
    name: "Protective Gear",
    description: "Headgear, mouthguards, groin protectors, and hand wraps for safe training.",
  },
  {
    slug: "home-gym-equipment",
    name: "Home Gym Equipment",
    description: "Everything you need to build a complete boxing setup at home.",
  },
  {
    slug: "recovery-equipment",
    name: "Recovery Equipment",
    description: "Foam rollers, massage guns, and recovery tools for fighters.",
  },
  {
    slug: "supplements",
    name: "Supplements",
    description: "Protein, pre-workout, and recovery supplements for boxing athletes.",
  },
  {
    slug: "best-deals",
    name: "Best Deals",
    description: "Top-rated boxing gear at the best prices — updated regularly.",
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}
