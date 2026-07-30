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
      title: `Search: ${searchQuery} | Boxing Essential`,
      description: `Search results for "${searchQuery}" on Boxing Essential.`,
      alternates: { canonical: BLOG_CANONICAL },
    };
  }

  return {
    title: categoryName
      ? `${categoryName} Articles | Boxing Essential`
      : "All Blogs | Boxing Essential",
    description: categoryName
      ? `Browse all ${categoryName} articles on Boxing Essential.`
      : "Expert boxing content covering training, nutrition, gear, and strategy.",
    alternates: { canonical: BLOG_CANONICAL },
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

  const categories = [
    { slug: "ALL", name: "All" },
    ...categorySlugs.map((slug) => ({ slug, name: slug })),
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