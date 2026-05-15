"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Blogs, categories } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";

type SortOption = "latest" | "popular";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("latest");
  const [showFilters, setShowFilters] = useState(false);

  const blogCategories = useMemo(() => categories.filter(c => c.slug !== "news"), []);

  const filtered = useMemo(() => {
    let result = Blogs.filter(a => a.category.slug !== "news");

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((a) => a.category.slug === selectedCategory);
    }

    if (sort === "popular") {
      result = result.sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0));
    } else {
      result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [search, selectedCategory, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
          All Blogs
        </h1>
        <p className="text-muted-foreground">
          Expert boxing content covering training, nutrition, gear, and strategy.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Blogs..."
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-10 px-4 rounded-md border text-sm font-medium transition-colors flex items-center gap-2 ${showFilters
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-input hover:bg-secondary"
              }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/30">
            <span className="text-sm font-medium text-muted-foreground">Category:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${!selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              All
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)
                }
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {cat.name}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort:</span>
              <button
                onClick={() => setSort("latest")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${sort === "latest"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSort("popular")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${sort === "popular"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                Popular
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Article Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-2">No Blogs found.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
            }}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  );
}
