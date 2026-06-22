import { groq } from "next-sanity";

export const SITE_BASE_URL = "https://www.boxingessential.com";

export type SitemapLink = {
  href: string;
  label: string;
};

export type SitemapSection = {
  id: string;
  title: string;
  links: SitemapLink[];
};

export const STATIC_SITEMAP_SECTIONS: SitemapSection[] = [
  {
    id: "main",
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/news", label: "News" },
      { href: "/blog", label: "Blog" },
      { href: "/shop", label: "Shop" },
      { href: "/live", label: "Live Streams" },
      { href: "/about", label: "About Us" },
      { href: "/contact-us", label: "Contact" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    id: "training",
    title: "Training Schools",
    links: [
      { href: "/training/boxing", label: "Boxing School" },
      { href: "/training/fitness", label: "Fitness School" },
      { href: "/training/gym", label: "Gym School" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
    ],
  },
];

export const getSitemapPosts = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category
  }
`;

export const getSitemapTutorials = groq`
  *[_type == "tutorial" && defined(slug.current)] | order(category asc, lessonOrder asc) {
    title,
    "slug": slug.current,
    category
  }
`;

type SitemapPost = {
  title: string;
  slug: string;
  category?: string;
};

type SitemapTutorial = {
  title: string;
  slug: string;
  category?: string;
};

function dedupeBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function dedupeLinks(links: SitemapLink[]): SitemapLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function buildDynamicSections(
  posts: SitemapPost[],
  tutorials: SitemapTutorial[]
): SitemapSection[] {
  const uniquePosts = dedupeBySlug(posts);
  const uniqueTutorials = dedupeBySlug(tutorials);

  const news = uniquePosts.filter((p) => p.category?.toLowerCase() === "news");
  const blogs = uniquePosts.filter((p) => p.category?.toLowerCase() !== "news");

  const sections: SitemapSection[] = [];

  if (news.length) {
    sections.push({
      id: "news",
      title: "News Articles",
      links: dedupeLinks(
        news.map((post) => ({
          href: `/${post.slug}`,
          label: post.title,
        }))
      ),
    });
  }

  if (blogs.length) {
    sections.push({
      id: "blog-posts",
      title: "Blog Articles",
      links: dedupeLinks(
        blogs.map((post) => ({
          href: `/${post.slug}`,
          label: post.title,
        }))
      ),
    });
  }

  if (uniqueTutorials.length) {
    sections.push({
      id: "videos",
      title: "Training Videos",
      links: dedupeLinks(
        uniqueTutorials.map((tutorial) => ({
          href: `/videos/${tutorial.slug}`,
          label: tutorial.title,
        }))
      ),
    });
  }

  return sections;
}
