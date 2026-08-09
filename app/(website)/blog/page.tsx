import { serverClient } from "@/lib/sanity";
import { getPaginatedBlogs, getBlogsCount, searchBlogs, searchBlogsCount, getBlogCategories } from "@/lib/queries";
import { ArticleCard } from "@/components/article-card";
import { BlogFilters } from "@/components/blog-filters";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { BlogPageClient } from "@/components/blog-page-client";
import { SITE_BASE_URL } from "@/lib/sitemap-data";

export const revalidate = 3600;
const POSTS_PER_PAGE = 12;
const BLOG_CANONICAL = `${SITE_BASE_URL}/blog`;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const categoryName = category && category !== "ALL" ? category : null;
  const searchQuery = q?.trim();

  if (searchQuery) {
    return {
      title: `Search: ${searchQuery}`,
      description: `Search results for "${searchQuery}" across Boxing Essential boxing articles and guides.`,
      alternates: { canonical: BLOG_CANONICAL },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: categoryName ? `${categoryName} Articles` : "Boxing Blog — Guides, Gear & Training",
    description: categoryName
      ? `Browse ${categoryName} articles on Boxing Essential — tips, reviews, and training advice.`
      : "Expert boxing articles on training, nutrition, gear reviews, fight strategy, and live match coverage.",
    alternates: { canonical: BLOG_CANONICAL },
    openGraph: {
      title: categoryName
        ? `${categoryName} Articles | Boxing Essential`
        : "Boxing Blog | Boxing Essential",
      description: categoryName
        ? `All ${categoryName} posts from Boxing Essential.`
        : "Training, nutrition, gear, and strategy articles for boxers at every level.",
      url: BLOG_CANONICAL,
      type: "website",
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const { category, page, q } = await searchParams;
  const selectedCategory = category || "ALL";
  const searchQuery = q?.trim() || "";
  const currentPage = Math.max(1, parseInt(page || "1"));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const isSearch = searchQuery.length > 0;

  const [blogs, totalCount, categorySlugs] = await Promise.all([
    isSearch
      ? serverClient.fetch(searchBlogs, { query: `${searchQuery}*`, start, end } as any)
      : serverClient.fetch(getPaginatedBlogs, { category: selectedCategory, start, end }),
    isSearch
      ? serverClient.fetch(searchBlogsCount, { query: `${searchQuery}*` } as any)
      : serverClient.fetch(getBlogsCount, { category: selectedCategory }),
    serverClient.fetch<string[]>(getBlogCategories),
  ]);

  // "Live Match" is always shown, even before any post uses it
  const uniqueCategories = Array.from(new Set([...categorySlugs, "Live Match"]));

  const categories = [
    { slug: "ALL", name: "All" },
    ...uniqueCategories.map((slug) => ({ slug, name: slug })),
  ];

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <BlogPageClient
      blogs={blogs}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
      isSearch={isSearch}
      categories={categories}
    />
  );
}