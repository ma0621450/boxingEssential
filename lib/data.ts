export type Category = {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
  featured: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateUrl: string;
  category: string;
};

export const categories: Category[] = [
  {
    slug: "training",
    name: "Training",
    description: "Workouts, drills, and training programs to level up your boxing skills.",
    articleCount: 24,
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    description: "Diet plans, supplements, and meal prep for peak boxing performance.",
    articleCount: 18,
  },
  {
    slug: "gear-reviews",
    name: "Gear Reviews",
    description: "Honest reviews of boxing gloves, bags, wraps, and training equipment.",
    articleCount: 31,
  },
  {
    slug: "fight-strategy",
    name: "Fight Strategy",
    description: "Tactical breakdowns, fight analysis, and ring intelligence.",
    articleCount: 15,
  },
  {
    slug: "beginner-guides",
    name: "Beginner Guides",
    description: "Everything new boxers need to know to get started the right way.",
    articleCount: 22,
  },
];

export const articles: Article[] = [
  {
    slug: "best-boxing-gloves-2025",
    title: "The 10 Best Boxing Gloves in 2025: A Complete Buying Guide",
    excerpt: "Finding the right pair of boxing gloves can make or break your training. We tested over 30 pairs to bring you the definitive list of the best boxing gloves for every budget and skill level.",
    category: categories[2],
    author: "Marcus Rivera",
    date: "2025-05-08",
    readTime: "12 min read",
    featuredImage: "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  },
  {
    slug: "boxing-workout-beginners",
    title: "The Ultimate Boxing Workout Plan for Beginners",
    excerpt: "Starting boxing can feel overwhelming. This step-by-step workout plan takes you from day one through your first month of training with structured routines.",
    category: categories[4],
    author: "Sarah Chen",
    date: "2025-05-06",
    readTime: "10 min read",
    featuredImage: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  },
  {
    slug: "boxing-diet-plan",
    title: "Boxing Diet Plan: What to Eat for Peak Performance",
    excerpt: "Nutrition is the foundation of every great boxer. Learn exactly what to eat before training, on rest days, and during fight camp to maximize your performance.",
    category: categories[1],
    author: "Dr. James Okonkwo",
    date: "2025-05-04",
    readTime: "15 min read",
    featuredImage: "https://images.pexels.com/photos/3775544/pexels-photo-3775544.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  },
  {
    slug: "how-to-jab",
    title: "How to Throw a Perfect Jab: Technique Breakdown",
    excerpt: "The jab is the most important punch in boxing. Master the mechanics, timing, and variations that make this punch your most valuable weapon.",
    category: categories[0],
    author: "Marcus Rivera",
    date: "2025-05-02",
    readTime: "8 min read",
    featuredImage: "https://images.pexels.com/photos/6212970/pexels-photo-6212970.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    slug: "counter-fighting-guide",
    title: "The Art of Counter Fighting: How to Hit and Not Get Hit",
    excerpt: "Counter fighting separates good boxers from great ones. Learn the timing, distance management, and setups that make counter-punching devastating.",
    category: categories[3],
    author: "Tony Delgado",
    date: "2025-04-30",
    readTime: "11 min read",
    featuredImage: "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    slug: "hand-wraps-guide",
    title: "Hand Wraps 101: How to Wrap Your Hands Like a Pro",
    excerpt: "Proper hand wrapping prevents injuries and improves punching power. This guide covers three proven wrapping techniques used by professional fighters.",
    category: categories[2],
    author: "Sarah Chen",
    date: "2025-04-28",
    readTime: "7 min read",
    featuredImage: "https://images.pexels.com/photos/4761330/pexels-photo-4761330.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    slug: "boxing-cardio-workout",
    title: "5 Boxing Cardio Workouts That Build Championship Stamina",
    excerpt: "Boxing demands elite-level conditioning. These five cardio workouts are designed specifically for fighters who need to go the distance.",
    category: categories[0],
    author: "Marcus Rivera",
    date: "2025-04-25",
    readTime: "9 min read",
    featuredImage: "https://images.pexels.com/photos/4761362/pexels-photo-4761362.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    slug: "boxing-weight-cutting",
    title: "Weight Cutting in Boxing: The Safe and Effective Approach",
    excerpt: "Weight cutting is a science, not a punishment. Learn the methods that professional boxers use to make weight safely without sacrificing performance.",
    category: categories[1],
    author: "Dr. James Okonkwo",
    date: "2025-04-22",
    readTime: "13 min read",
    featuredImage: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    slug: "boxing-stance-guide",
    title: "Orthodox vs Southpaw: Choosing the Right Boxing Stance",
    excerpt: "Your stance is the foundation of everything you do in the ring. Understand the differences, advantages, and how to choose what works for you.",
    category: categories[4],
    author: "Tony Delgado",
    date: "2025-04-20",
    readTime: "6 min read",
    featuredImage: "https://images.pexels.com/photos/6212962/pexels-photo-6212962.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Cleto Reyes Training Gloves",
    description: "Premium leather training gloves with superior wrist support and hand-crafted quality. Used by professional fighters worldwide.",
    price: "$199.99",
    image: "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Gloves",
  },
  {
    id: "2",
    name: "Winning MS-500 Boxing Gloves",
    description: "The gold standard of boxing gloves. Multi-layer foam padding with unparalleled protection for long training sessions.",
    price: "$349.99",
    image: "https://images.pexels.com/photos/4761330/pexels-photo-4761330.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Gloves",
  },
  {
    id: "3",
    name: "Ringside IMF Tech Sparring Gloves",
    description: "Intermediate-level sparring gloves with IMF tech padding. Great balance of protection and feel at a reasonable price.",
    price: "$89.99",
    image: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Gloves",
  },
  {
    id: "4",
    name: "Title Gel World Bag Gloves",
    description: "Bag-specific gloves with gel padding for heavy bag work. Durable construction that withstands daily training.",
    price: "$69.99",
    image: "https://images.pexels.com/photos/6212970/pexels-photo-6212970.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Gloves",
  },
  {
    id: "5",
    name: "Mexican Style Hand Wraps (180\")",
    description: "Semi-elastic hand wraps that provide a custom, supportive fit. 180-inch length for full hand and wrist coverage.",
    price: "$12.99",
    image: "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Wraps",
  },
  {
    id: "6",
    name: "Optimum Nutrition Gold Standard Whey",
    description: "The most trusted protein powder for athletes. Fast-absorbing whey with 24g protein per serving to support recovery.",
    price: "$54.99",
    image: "https://images.pexels.com/photos/3775544/pexels-photo-3775544.jpeg?auto=compress&cs=tinysrgb&w=400",
    affiliateUrl: "#",
    category: "Supplements",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
