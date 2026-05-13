import Link from "next/link";
import { Dumbbell, Apple, ShieldCheck, Swords, BookOpen } from "lucide-react";
import type { Category } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  training: Dumbbell,
  nutrition: Apple,
  "gear-reviews": ShieldCheck,
  "fight-strategy": Swords,
  "beginner-guides": BookOpen,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.slug] || Dumbbell;

  return (
    <Link
      href={`/${category.slug}`}
      className="group block p-6 rounded-lg border border-border/50 bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
    >
      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {category.description}
      </p>
      <span className="text-xs text-muted-foreground">
        {category.articleCount} Blogs
      </span>
    </Link>
  );
}
