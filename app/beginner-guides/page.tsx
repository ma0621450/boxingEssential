import { getCategoryBySlug, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookOpen } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Beginner Guides | Boxing Essential",
    description: "Everything new boxers need to know to get started the right way with boxing.",
  };
}

export default function BeginnerGuidesPage() {
  const category = getCategoryBySlug("beginner-guides")!;
  const categoryArticles = getArticlesByCategory("beginner-guides");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Beginner Guides" }]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Beginner Guides</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {category.description} Start your boxing journey on the right foot with our beginner-friendly guides.
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
          <p className="text-muted-foreground">No beginner guide articles yet. Check back soon!</p>
        </div>
      )}

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
