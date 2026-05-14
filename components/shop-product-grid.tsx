"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import { ShopProductCard } from "@/components/shop-product-card";

export function ShopProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
        <h2 className="text-3xl font-black">Featured Gear</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/50 hover:bg-secondary text-secondary-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
