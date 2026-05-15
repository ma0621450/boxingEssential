import Link from "next/link";
import { ArrowRight, Zap, Target } from "lucide-react";
import { categories, Blogs } from "@/lib/data";
import { CategoryCard } from "@/components/category-card";
import { BoxingHeadlinesMarquee } from "@/components/boxing-headlines-marquee";
import { UpcomingBouts } from "@/components/upcoming-bouts";
import { ArticleCard } from "@/components/article-card";
import { getHomeLiveData } from "@/lib/home-live-data";

/** Vercel: build often runs without secrets; static HTML would hide API sections forever. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { bouts, headlines } = await getHomeLiveData();

  // Get latest 3 news articles
  const latestNews = [...Blogs]
    .filter(a => a.category.slug === "news")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            {/* <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Boxing Essential
              </span>
            </div> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Train smarter.{" "}
              <span className="text-primary">Fight better.</span>{" "}
              Stay stronger.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Your complete resource for boxing training, nutrition, gear reviews, and fight strategy. Expert-backed content for every level.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="h-11 px-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Read Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact-us"
                className="h-11 px-6 inline-flex items-center gap-2 rounded-md border border-border bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                <Target className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Odds API Scheduled Bouts */}
      {bouts && bouts.length > 0 ? <UpcomingBouts bouts={bouts} /> : null}

      {/* Boxing Headlines Marquee (Currents API) */}
      {headlines && headlines.length > 0 ? <BoxingHeadlinesMarquee headlines={headlines} /> : null}

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Explore by Category</h2>
          <p className="text-sm text-muted-foreground mt-1">Find exactly what you need</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories
            .filter((cat) => cat.slug !== "news")
            .map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Latest News</h2>
            <p className="text-sm text-muted-foreground mt-1">Fresh content, updated regularly</p>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestNews.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

    </>
  );
}
