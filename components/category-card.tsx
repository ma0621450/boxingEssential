import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { toSitePath } from "@/lib/site-url";

export type CategoryCardData = {
  slug: string;
  name: string;
  description: string;
  articleCount?: number;
};

export function CategoryCard({ category }: { category: CategoryCardData }) {
  const Icon = Dumbbell;

  return (
    <Link
      href={toSitePath(category.slug)}
      className="group block p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
    </Link>
  );
}
