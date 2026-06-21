import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import heroBg from "@/public/aboutBg.jpg";
import { ShopProductGrid } from "@/components/shop-product-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { serverClient } from "@/lib/sanity";
import { getAffiliateProductCategories, getAffiliateProducts } from "@/lib/queries";
import { mapSanityProduct, type AffiliateProduct } from "@/lib/affiliate-product";
import { mapProductCategories, type ProductCategory } from "@/lib/product-categories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop Boxing Gear | Gloves, Bags, Shoes & More",
  description:
    "Expert-reviewed boxing gloves, punching bags, shoes, protective gear, and supplements. Curated affiliate picks from Boxing Essential.",
  alternates: { canonical: "https://boxingessential.com/shop" },
};

export default async function ShopPage() {
  const [categorySlugs, productRows] = await Promise.all([
    serverClient.fetch<string[]>(getAffiliateProductCategories),
    serverClient.fetch(getAffiliateProducts, { category: "ALL" }),
  ]);

  const categories: ProductCategory[] = mapProductCategories(categorySlugs);
  const products: AffiliateProduct[] = productRows.map(mapSanityProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Shop" }]} />

      <div className="relative mb-16 mt-6 flex flex-col items-center justify-center py-20 px-6 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 text-red-400 text-sm font-bold tracking-widest uppercase mb-6 border border-red-500/30">
            <ShoppingBag className="w-4 h-4" /> Pro Gear Hub
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-md">
            Train Like a Champion
          </h1>
          <p className="text-gray-300 leading-relaxed text-lg lg:text-xl drop-shadow">
            We&apos;ve handpicked the best gloves, wraps, and training equipment in the industry. Everything you need to perform at your peak, curated by professionals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-border/50">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Expert Vetted</h4>
            <p className="text-sm text-muted-foreground">Tested by pro coaches</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-border/50">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Premium Quality</h4>
            <p className="text-sm text-muted-foreground">Only the best brands</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-border/50">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Trusted Partners</h4>
            <p className="text-sm text-muted-foreground">Secure checkout & shipping</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-secondary/30" />}>
        <ShopProductGrid categories={categories} products={products} />
      </Suspense>

      <div className="mt-16 p-6 bg-secondary/20 rounded-2xl border border-border/30 text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Affiliate Disclosure:</strong> Boxing Essential is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This helps us keep creating high-quality training content.
        </p>
      </div>
    </div>
  );
}
