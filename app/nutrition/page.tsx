import { getCategoryBySlug, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Apple } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Nutrition | Boxing Essential",
    description: "Boxing nutrition plans, diet tips, supplements, and meal prep guides for peak performance.",
  };
}

export default function NutritionPage() {
  const category = getCategoryBySlug("nutrition")!;
  const categoryArticles = getArticlesByCategory("nutrition");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Nutrition" }]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
            <Apple className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Nutrition</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {category.description} Fuel your body right with evidence-based nutrition advice tailored for boxers and combat athletes.
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
          <p className="text-muted-foreground">No nutrition articles yet. Check back soon!</p>
        </div>
      )}

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
