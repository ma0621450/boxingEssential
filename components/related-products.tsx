import { ShopProductCard } from "@/components/shop-product-card";
import type { AffiliateProduct } from "@/lib/affiliate-product";

export function RelatedProducts({ products }: { products: AffiliateProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="mt-16" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-black mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
