"use client";

import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { BlogSkeleton } from "@/components/blog-skeleton";
import { usePageTransition } from "@/components/page-transition-provider";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Newspaper } from "lucide-react";
import Link from "next/link";

type NewsPageClientProps = {
    news: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    searchQuery: string;
    isSearch: boolean;
};

export function NewsPageClient({
    news,
    totalCount,
    totalPages,
    currentPage,
    searchQuery,
    isSearch,
}: NewsPageClientProps) {
    const { isPending } = usePageTransition();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <Breadcrumbs items={[{ label: "News" }]} />

            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Newspaper className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
                        {isSearch ? "Search Results" : "Boxing News"}
                    </h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    {isSearch
                        ? `${totalCount} result${totalCount !== 1 ? "s" : ""} for "${searchQuery}"`
                        : "Stay up to date with the latest boxing results, fight announcements, world rankings, and breaking news."}
                </p>
            </div>

            <div className="mb-6">
                <SearchBar initialQuery={searchQuery} basePath="/news" />
            </div>

            {!isSearch && (
                <p className="text-sm text-muted-foreground mb-6 font-medium">
                    {totalCount} news article{totalCount !== 1 ? "s" : ""} found
                    {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
                </p>
            )}

            {isPending ? (
                <BlogSkeleton />
            ) : news.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article: any) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                searchQuery={isSearch ? searchQuery : undefined}
                                basePath="/news"
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border/50">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50">
                        <Newspaper className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">
                        {isSearch ? `No results found for "${searchQuery}".` : "No news articles found."}
                    </p>
                    {isSearch && (
                        <Link
                            href="/news"
                            className="mt-2 inline-block text-sm text-primary font-bold hover:underline"
                        >
                            View all news
                        </Link>
                    )}
                </div>
            )}

            {/* Boxing Highlights Banner */}
            <section className="mt-20 p-8 lg:p-12 rounded-3xl bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-black uppercase italic mb-4">
                            Want the hottest news first?
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Follow our social channels for live fight updates, behind the scenes clips, and immediate result reactions.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/about#socials"
                            className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-primary text-white font-black uppercase tracking-wider hover:scale-105 transition-all"
                        >
                            Follow Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}