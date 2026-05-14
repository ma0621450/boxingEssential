import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import type { Product } from "@/lib/data";

export function ShopProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-secondary/20 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="text-xl font-black text-foreground">
            {product.price}
          </span>
          <Link
            href={product.affiliateUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-transform active:scale-95"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            Buy Now
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
