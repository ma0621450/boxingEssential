import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/lib/data";

export function AffiliateProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-md overflow-hidden bg-secondary/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">
          {product.category}
        </span>
        <h4 className="text-sm font-semibold mb-1.5">{product.name}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary">{product.price}</span>
          <Link
            href={product.affiliateUrl}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            Check Price
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AffiliateBlock({
  title,
  description,
  products,
}: {
  title: string;
  description?: string;
  products: Product[];
}) {
  return (
    <div className="my-8 p-6 rounded-xl border border-border/50 bg-secondary/20">
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <AffiliateProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-3">
        Boxing Essential is reader-supported. We may earn a commission on purchases through our links.
      </p>
    </div>
  );
}
