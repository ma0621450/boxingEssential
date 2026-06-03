"use client";

import { ArticleCard } from "@/components/article-card";
import { BlogFilters } from "@/components/blog-filters";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { BlogSkeleton } from "@/components/blog-skeleton";
import { usePageTransition } from "@/components/page-transition-provider";

type BlogPageClientProps = {
    blogs: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    selectedCategory: string;
    searchQuery: string;
    isSearch: boolean;
    categories: { slug: string; name: string }[];
};

export function BlogPageClient({
    blogs,
    totalCount,
    totalPages,
    currentPage,
    selectedCategory,
    searchQuery,
    isSearch,
    categories,
}: BlogPageClientProps) {
    const { isPending } = usePageTransition();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
                    {isSearch ? "Search Results" : selectedCategory === "ALL" ? "All Blogs" : selectedCategory}
                </h1>
                <p className="text-muted-foreground">
                    {isSearch
                        ? `${totalCount} result${totalCount !== 1 ? "s" : ""} for "${searchQuery}"`
                        : "Expert boxing content covering training, gear, and strategy."}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <SearchBar initialQuery={searchQuery} />
                <BlogFilters categories={categories} selectedCategory={selectedCategory} />
            </div>

            {!isSearch && (
                <p className="text-sm text-muted-foreground mb-6">
                    {totalCount} article{totalCount !== 1 ? "s" : ""} found
                    {selectedCategory !== "ALL" && ` in ${selectedCategory}`}
                    {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
                </p>
            )}

            {isPending ? (
                <BlogSkeleton />
            ) : blogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {blogs.map((article: any) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                selectedCategory={selectedCategory}
                                searchQuery={isSearch ? searchQuery : undefined}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-2">
                        {isSearch ? `No results found for "${searchQuery}".` : "No blogs found."}
                    </p>
                    {isSearch && (
                        <p className="text-sm text-muted-foreground">
                            Try different keywords like "boxing gloves", "footwork", or "heavy bag".
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}