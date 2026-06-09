import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { BoxingHeadlinesMarquee } from "@/components/boxing-headlines-marquee";
import { UpcomingBouts } from "@/components/upcoming-bouts";
import { ArticleCard } from "@/components/article-card";
import { getHomeLiveData } from "@/lib/home-live-data";
import { serverClient } from "@/lib/sanity";
import { getPaginatedNews, getPaginatedBlogs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { bouts, headlines } = await getHomeLiveData();

  // Fetch latest 3 news from Sanity
  const latestNews = await serverClient.fetch(getPaginatedNews, {
    start: 0,
    end: 2, // 3 posts (0,1,2)
  });

  // Fetch latest 6 blogs from Sanity (optional — add a section)
  const latestBlogs = await serverClient.fetch(getPaginatedBlogs, {
    category: "ALL",
    start: 0,
    end: 5, // 6 posts
  });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100vh] overflow-hidden">

  {/* BACKGROUND VIDEO */}
  <video
    src="/video.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full object-cover object-center scale-105 -z-20"
  />

  {/* DARK GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-background -z-10" />

  {/* RED GLOW EFFECT */}
  {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" /> */}

  {/* MAIN CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">

    <div className="max-w-3xl">

      {/* HEADLINE */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white">
        Train smarter.{" "}
        <span className="text-primary">Fight better.</span>{" "}
        Stay stronger.
      </h1>

      {/* DESCRIPTION */}
      <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
        Your complete resource for boxing training, nutrition, gear reviews, and fight strategy.
        Expert-backed content for every level.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex flex-wrap gap-3">

        <Link
          href="/blog"
          className="h-11 px-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105"
        >
          Read Blogs
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/contact-us"
          className="h-11 px-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 hover:border-primary transition-all hover:scale-105"
        >
          <Target className="h-4 w-4" />
          Contact Us
        </Link>

      </div>

    </div>
  </div>
</section>

      {bouts && bouts.length > 0 ? <UpcomingBouts bouts={bouts} /> : null}

      {headlines && headlines.length > 0 ? <BoxingHeadlinesMarquee headlines={headlines} /> : null}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <p className="text-sm text-muted-foreground mt-1">Expert training guides and gear reviews</p>
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
          {latestBlogs.map((article: any) => (
            <ArticleCard key={article.slug} article={article} />
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
          {latestNews.map((article: any) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}