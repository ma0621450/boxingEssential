import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { getSanityImageUrl } from "@/lib/sanity";
import { toSitePath } from "@/lib/site-url";

type RelatedPost = {
  slug: string;
  title: string;
  featuredImage?: string;
  mainImage?: { asset?: { url?: string } | null };
  category?: string | { name?: string };
};

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border/50">
      <h2 className="text-xl font-bold mb-6">Related Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((article) => {
          const categoryName =
            typeof article.category === "string"
              ? article.category
              : article.category?.name || "Uncategorized";
          const imageUrl =
            getSanityImageUrl(article.mainImage) ||
            article.featuredImage ||
            PLACEHOLDER_IMAGE;

          return (
            <Link key={article.slug} href={toSitePath(article.slug)} className="group block">
              <article className="overflow-hidden rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary/90 text-primary-foreground text-[10px] font-medium">
                    {categoryName}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
