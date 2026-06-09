"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ShopProductCard } from "@/components/shop-product-card";
import { client } from "@/lib/sanity";
import { getAffiliateProducts } from "@/lib/queries";
import { mapSanityProduct } from "@/lib/affiliate-product";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { cn } from "@/lib/utils";

export function ShopProductGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const isValidCategory =
    categoryParam &&
    PRODUCT_CATEGORIES.some((c) => c.slug === categoryParam);

  const [activeCategory, setActiveCategory] = useState(
    isValidCategory ? categoryParam! : "All"
  );
  const [featuredOnly, setFeaturedOnly] = useState(!isValidCategory);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<ReturnType<typeof mapSanityProduct>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isValidCategory && categoryParam) {
      setActiveCategory(categoryParam);
      setFeaturedOnly(false);
    }
  }, [categoryParam, isValidCategory]);

  useEffect(() => {
    client
      .fetch(getAffiliateProducts, { category: "ALL" })
      .then((data) => setProducts(data.map(mapSanityProduct)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (featuredOnly) {
      result = result.filter((p) => p.featured);
    }

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    return result;
  }, [products, featuredOnly, activeCategory]);

  const activeCategoryName =
    activeCategory === "All"
      ? "All Categories"
      : PRODUCT_CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? activeCategory;

  const sectionTitle = featuredOnly ? "Featured Gear" : "All Gear";

  const filterSidebar = (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Show
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium group-hover:text-primary transition-colors">
            Featured only
          </span>
        </label>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Category
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/60 text-foreground"
              )}
            >
              All Categories
            </button>
          </li>
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/60 text-foreground"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {(activeCategory !== "All" || !featuredOnly) && (
        <button
          type="button"
          onClick={() => {
            setActiveCategory("All");
            setFeaturedOnly(true);
          }}
          className="text-sm text-primary font-semibold hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mb-12">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[180px] p-5 rounded-2xl border border-border/50 bg-card">
            <h2 className="font-black text-lg mb-6">Filters</h2>
            {filterSidebar}
          </div>
        </aside>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-black">{sectionTitle}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {loading
                  ? "Loading..."
                  : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
                {!loading && activeCategory !== "All" && ` · ${activeCategoryName}`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen((o) => !o)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 bg-card text-sm font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile filters panel */}
          {mobileFiltersOpen && (
            <div className="lg:hidden mb-6 p-5 rounded-2xl border border-border/50 bg-card">
              {filterSidebar}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl bg-secondary/30 animate-pulse"
                />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-border/50 bg-secondary/20">
              <p className="text-muted-foreground mb-4">No products match your filters.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setFeaturedOnly(false);
                }}
                className="text-primary font-semibold hover:underline"
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
