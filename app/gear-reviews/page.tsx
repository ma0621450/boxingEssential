import { getCategoryBySlug, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShieldCheck } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Gear Reviews | Boxing Essential",
    description: "Honest reviews of boxing gloves, hand wraps, heavy bags, and training equipment.",
  };
}

export default function GearReviewsPage() {
  const category = getCategoryBySlug("gear-reviews")!;
  const categoryArticles = getArticlesByCategory("gear-reviews");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Gear Reviews" }]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Gear Reviews</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {category.description} We test every product we recommend so you can buy with confidence.
        </p>
      </div>

      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No gear review articles yet. Check back soon!</p>
        </div>
      )}

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
