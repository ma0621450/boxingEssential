import { serverClient } from "@/lib/sanity";
import { getPaginatedNews, getNewsCount, searchNews, searchNewsCount } from "@/lib/queries";
import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { NewsPageClient } from "@/components/news-page-client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Newspaper } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 3600;
const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Boxing News | Boxing Essential",
  description: "Latest boxing results, fight announcements, world rankings, and breaking news.",
  alternates: { canonical: "https://boxingessential.com/news" },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page, q } = await searchParams;
  const searchQuery = q?.trim() || "";
  const currentPage = Math.max(1, parseInt(page || "1"));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const isSearch = searchQuery.length > 0;

  const [news, totalCount] = await Promise.all([
    isSearch
      ? serverClient.fetch(searchNews, { query: `${searchQuery}*`, start, end } as any)
      : serverClient.fetch(getPaginatedNews, { start, end }),
    isSearch
      ? serverClient.fetch(searchNewsCount, { query: `${searchQuery}*` } as any)
      : serverClient.fetch(getNewsCount),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <NewsPageClient
      news={news}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={searchQuery}
      isSearch={isSearch}
    />
  );
}