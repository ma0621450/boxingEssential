"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Newspaper } from "lucide-react";
import { Blogs, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";

type SortOption = "latest" | "popular";

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const newsArticles = useMemo(() => {
    let result = getArticlesByCategory("news");

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }

    if (sort === "popular") {
      result = result.sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0));
    } else {
      result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "News" }]} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Newspaper className="h-6 w-6 text-primary" />
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
            Boxing News
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Stay up to date with the latest boxing results, major fight announcements, world rankings, and breaking news from across the globe.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search News..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Sort:</span>
          <div className="flex bg-secondary/50 p-1 rounded-md border border-border/50">
            <button
              onClick={() => setSort("latest")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${sort === "latest"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSort("popular")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${sort === "popular"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Popular
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6 font-medium">
        {newsArticles.length} news article{newsArticles.length !== 1 ? "s" : ""} found
      </p>

      {/* News Grid */}
      {newsArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border/50">
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">No news articles found for "{search}".</p>
          <button
            onClick={() => setSearch("")}
            className="mt-2 text-sm text-primary font-bold hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Boxing Highlights Banner */}
      <section className="mt-20 p-8 lg:p-12 rounded-3xl bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black uppercase italic mb-4">Want the hottest news first?</h2>
            <p className="text-gray-400 max-w-md">Follow our social channels for live fight updates, behind the scenes clips, and immediate result reactions.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/about#socials" className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-primary text-white font-black uppercase tracking-wider hover:scale-105 transition-all">
              Follow Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
