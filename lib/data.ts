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
  content: string;
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
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>Finding the right pair of boxing gloves is one of the most important decisions you'll make as a fighter. Whether you're a beginner just stepping into the gym or a seasoned professional preparing for your next camp, the gloves you wear directly impact your hand protection, punching technique, and overall training quality.</p>
      <p>In this comprehensive guide, we've tested over 30 pairs of boxing gloves across every price range and use case. Our team of coaches and fighters has spent hundreds of hours evaluating padding quality, wrist support, durability, and overall value to bring you the definitive list of the best boxing gloves available.</p>

      <h2 id="key-features">Key Features to Consider</h2>
      <p>Before diving into our recommendations, it's important to understand what makes a great boxing glove. Here are the key factors we evaluate:</p>
      <ul>
        <li><strong>Padding Quality:</strong> Multi-layer foam vs. single-layer. Look for gloves with IMF (Injection Molded Foam) or multi-layer padding for superior shock absorption.</li>
        <li><strong>Wrist Support:</strong> A secure wrist closure prevents hyperextension. Look for gloves with long cuffs and quality hook-and-loop or lace closures.</li>
        <li><strong>Leather Quality:</strong> Genuine leather outlasts synthetic materials by years. Premium gloves use cowhide or goatskin leather.</li>
      </ul>

      <h2 id="top-picks">Our Top Picks</h2>
      <p>After extensive testing, these are the boxing gloves that stood out from the rest. We've categorized them by use case and budget to help you find the perfect match.</p>
      
      <h3 id="budget-option">Best Budget Option</h3>
      <p>For fighters on a budget, the Ringside IMF Tech gloves offer exceptional value. At under $100, you get multi-layer foam padding, genuine leather construction, and solid wrist support that punches well above its price class.</p>

      <h3 id="premium-option">Best Premium Option</h3>
      <p>The Winning MS-500 remains the gold standard of boxing gloves. While the price is steep, the unparalleled hand protection, custom-feel padding, and legendary durability make these a lifetime investment for serious fighters.</p>

      <h2 id="how-to-choose">How to Choose the Right Pair</h2>
      <p>Choosing boxing gloves comes down to three main questions: What will you use them for? How often do you train? What's your budget?</p>
    `,
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
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>Boxing is one of the most physically demanding sports in the world, but it's also one of the most rewarding. For beginners, the key is to build a solid foundation of technique before worrying about power or speed.</p>
      <p>This guide provides a structured 4-week workout plan designed to get you comfortable with the basics while building the necessary conditioning to survive a full boxing session.</p>

      <h2 id="week-1">Week 1: The Basics</h2>
      <p>Focus on your stance and movement. You should spend at least 15 minutes each session just moving in your boxing stance, maintaining your balance.</p>
      <ul>
        <li>Shadowboxing: 3 rounds of 3 minutes</li>
        <li>Heavy Bag: 3 rounds of 3 minutes (straight punches only)</li>
        <li>Core work: 10 minutes</li>
      </ul>

      <h2 id="essential-drills">Essential Drills</h2>
      <p>The jab is your best friend. In your first month, 70% of your punches should be jabs. It sets up everything else and keeps your opponent at bay.</p>
    `,
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
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>A boxer's diet is as important as their roadwork. Without the right fuel, your body cannot recover from the intense demands of boxing training.</p>
      <p>This plan focuses on high-quality carbohydrates for energy, lean proteins for muscle recovery, and healthy fats for hormonal health.</p>

      <h2 id="pre-workout">Pre-Workout Nutrition</h2>
      <p>2-3 hours before training, focus on complex carbohydrates. Oatmeal with fruit or a turkey sandwich on whole-grain bread are excellent choices.</p>
      
      <h2 id="recovery">Post-Workout Recovery</h2>
      <p>The 30-minute window after training is critical. A protein shake combined with a fast-acting carb like a banana will kickstart the recovery process.</p>
    `,
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
    content: `
      <h2 id="introduction">The Importance of the Jab</h2>
      <p>Every legendary boxer had a great jab. From Muhammad Ali to Larry Holmes, the jab was the foundation of their success.</p>
      <p>A perfect jab isn't just about the arm; it's about the rotation of the shoulder, the snap of the wrist, and the step with the lead foot.</p>
    `,
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
    content: `
      <h2 id="introduction">What is Counter Fighting?</h2>
      <p>Counter fighting is the art of using your opponent's aggression against them. It requires patience, elite reflexes, and a deep understanding of rhythm.</p>
    `,
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
    content: `
      <h2 id="introduction">Why We Wrap</h2>
      <p>Hand wraps aren't for padding; they're for structural support. They keep the 27 small bones in your hand together when you impact the bag or an opponent.</p>
    `,
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
    content: `
      <h2 id="introduction">Championship Conditioning</h2>
      <p>Running is great, but boxing cardio is different. It's interval-based and high-intensity. You need to be able to explode, recover, and explode again.</p>
    `,
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
    content: `
      <h2 id="introduction">The Science of the Cut</h2>
      <p>Cutting weight should never be about starvation. It's about water manipulation and glycogen management.</p>
    `,
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
    content: `
      <h2 id="introduction">The Foundation</h2>
      <p>Your stance dictates your defense and your offense. While most people are orthodox, being a southpaw offers unique tactical advantages.</p>
    `,
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

