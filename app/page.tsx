import Link from "next/link";
import { ArrowRight, Zap, Target } from "lucide-react";
import { categories } from "@/lib/data";
import { CategoryCard } from "@/components/category-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { BoxingHeadlinesMarquee } from "@/components/boxing-headlines-marquee";
import { HomeUpcomingFights } from "@/components/home-upcoming-fights";
import { HomeUpcomingEvents } from "@/components/home-upcoming-events";
import { getHomeLiveData } from "@/lib/home-live-data";

/** Vercel: build often runs without secrets; static HTML would hide API sections forever. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { fights, events, headlines } = await getHomeLiveData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Boxing Essential
              </span>
            </div>
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
                href="/training"
                className="h-11 px-6 inline-flex items-center gap-2 rounded-md border border-border bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                <Target className="h-4 w-4" />
                Training Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {fights.length > 0 ? <HomeUpcomingFights fights={fights} /> : null}

      {headlines.length > 0 ? <BoxingHeadlinesMarquee headlines={headlines} /> : null}

      {events.length > 0 ? <HomeUpcomingEvents events={events} /> : null}

      {/* Featured Blogs */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Blogs</h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular and in-depth content</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {featured.map((article, i) => (
            <ArticleCard key={article.slug} article={article} featured={i === 0} />
          ))}
        </div>
      </section> */}

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Explore by Category</h2>
          <p className="text-sm text-muted-foreground mt-1">Find exactly what you need</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Latest Blogs */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Latest Blogs</h2>
            <p className="text-sm text-muted-foreground mt-1">Fresh content, updated regularly</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section> */}

      {/* Affiliate Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Recommended Boxing Gloves</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Our top picks for training gloves, tested and reviewed by our team.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gearProducts.map((product) => (
            <AffiliateProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-4">
          Boxing Essential is reader-supported. We may earn a commission on purchases through our links.
        </p>
      </section> */}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <NewsletterSignup />
      </section>

      {/* Quick Links */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/beginner-guides"
            className="group flex items-center gap-4 p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all"
          >
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">New to Boxing?</h3>
              <p className="text-xs text-muted-foreground">Start with our beginner guides</p>
            </div>
          </Link>
          <Link
            href="/gear-reviews"
            className="group flex items-center gap-4 p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all"
          >
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Gear Reviews</h3>
              <p className="text-xs text-muted-foreground">Honest equipment recommendations</p>
            </div>
          </Link>
          <Link
            href="/training"
            className="group flex items-center gap-4 p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all"
          >
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Training Plans</h3>
              <p className="text-xs text-muted-foreground">Structured workout programs</p>
            </div>
          </Link>
        </div>
      </section> */}
    </>
  );
}
