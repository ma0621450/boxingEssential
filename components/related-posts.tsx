import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/data";

export function RelatedPosts({ Blogs }: { Blogs: Article[] }) {
  return (
    <section className="mt-12 pt-8 border-t border-border/50">
      <h2 className="text-xl font-bold mb-6">Related Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Blogs.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
            <article className="overflow-hidden rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary/90 text-primary-foreground text-[10px] font-medium">
                  {article.category.name}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground pt-2">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
