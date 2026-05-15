import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { Article } from "@/lib/data";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${article.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-2.5 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium mb-3">
                {article.category.name}
              </span>
              <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {/* <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span> */}
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="overflow-hidden rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium">
            {article.category.name}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
            <span>{article.author}</span>
            {/* <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span> */}
          </div>
        </div>
      </article>
    </Link>
  );
}
