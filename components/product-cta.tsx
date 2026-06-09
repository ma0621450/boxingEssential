import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function ProductCTA({
  url,
  price,
  ctaText = "Shop Now",
  variant = "primary",
}: {
  url: string;
  price?: string;
  ctaText?: string;
  variant?: "primary" | "sticky";
}) {
  const baseClasses =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
      : "inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all";

  return (
    <div className={variant === "primary" ? "space-y-3" : ""}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={baseClasses}
      >
        {ctaText}
        <ExternalLink className="w-5 h-5" />
      </Link>
      {price && variant === "primary" && (
        <p className="text-2xl font-black">{price}</p>
      )}
      {variant === "primary" && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Secure checkout via trusted retailer</span>
        </div>
      )}
    </div>
  );
}
