import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";

type ComparisonProduct = {
  name: string;
  price?: string;
  rating?: number;
  highlight?: string;
  url?: string;
  isCurrent?: boolean;
};

export function ProductComparisonTable({
  products,
}: {
  products: ComparisonProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="mt-12" aria-labelledby="comparison-heading">
      <h2 id="comparison-heading" className="text-2xl font-black mb-6">
        How It Compares
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-border/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/30 border-b border-border/50">
              <th className="text-left px-4 py-3 font-bold">Product</th>
              <th className="text-left px-4 py-3 font-bold">Price</th>
              <th className="text-left px-4 py-3 font-bold">Rating</th>
              <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">
                Highlight
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={i}
                className={`border-b border-border/30 last:border-0 ${
                  product.isCurrent ? "bg-primary/5" : ""
                }`}
              >
                <td className="px-4 py-3 font-semibold">
                  {product.name}
                  {product.isCurrent && (
                    <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      This product
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{product.price ?? "—"}</td>
                <td className="px-4 py-3">
                  {product.rating ? (
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {product.highlight ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {product.url && !product.isCurrent && (
                    <Link
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
