import { notFound } from "next/navigation";
import Link from "next/link";
import { getVideosByCategory, getVideoBySlug, getRelatedVideos, videos } from "@/lib/videoData";
import { Blogs, products } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TrainingRequestForm } from "@/components/training-request-form";
import { ArticleCard } from "@/components/article-card";
import { Eye, Calendar, Clock, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params so all 26+ video pages are fully optimized and statically generated at build time
export async function generateStaticParams() {
  return videos.map((v) => ({
    slug: v.slug,
  }));
}

// Dynamically generate SEO headers and OpenGraph sharing tags for each training lesson
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    return {};
  }

  const categoryLabel = video.category.charAt(0).toUpperCase() + video.category.slice(1);

  return {
    title: `${video.title} | ${categoryLabel} Training`,
    description: video.description.slice(0, 160) + "...",
    openGraph: {
      title: video.title,
      description: video.description,
      type: "video.other",
      url: `https://boxingessential.com/videos/${slug}`,
      images: [
        {
          url: video.thumbnail,
          width: 1200,
          height: 675,
          alt: video.title,
        }
      ]
    },
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  // Fetch full category list to calculate Prev / Next indexes
  const categoryVideos = getVideosByCategory(video.category);
  const currentIndex = categoryVideos.findIndex((v) => v.slug === video.slug);
  const prevVideo = currentIndex > 0 ? categoryVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < categoryVideos.length - 1 ? categoryVideos[currentIndex + 1] : null;

  // Pull related videos (excluding active video)
  const relatedVideos = getRelatedVideos(video, 4);

  // Pull active products for monetization cards
  const featuredProducts = products.slice(0, 2);

  // Related blogs matching active training category
  const relatedBlogs = {
    gym: Blogs.filter(b => b.slug === "boxing-workout-beginners" || b.slug === "boxing-cardio-workout"),
    boxing: Blogs.filter(b => b.slug === "how-to-jab" || b.slug === "boxing-stance-guide" || b.slug === "counter-fighting-guide"),
    fitness: Blogs.filter(b => b.slug === "boxing-cardio-workout" || b.slug === "boxing-diet-plan")
  }[video.category];

  const categoryTitle = video.category.charAt(0).toUpperCase() + video.category.slice(1) + " Training";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Training Portal", href: "/training" },
          { label: categoryTitle, href: `/training/${video.category}` },
          { label: video.title }
        ]} 
      />

      {/* Main Grid - Player left, sidebar right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* LEFT / MAIN COLUMN - Video Player & Detailed descriptions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 16:9 Video Responsive Embed */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-xl border border-border/40">
            <video
              src="/trainingbgvideo.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Details header */}
          <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-red-600/10 text-red-600 dark:bg-red-600/20 dark:text-red-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" /> {video.category} training division
            </span>
            <h1 className="text-3xl md:text-4xl font-black mt-4 leading-tight text-foreground">
              {video.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground border-b border-border/50 pb-5">
              <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {video.views} Views</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published {video.date}</span>
              <span className="font-semibold text-foreground bg-secondary/80 px-2 py-0.5 rounded">Duration: {video.duration}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-black text-lg text-foreground mb-3">Lesson Objectives</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                {video.description}
              </p>
            </div>
          </div>

          {/* Prev / Next Lesson Navigation (Crawlers friendly standard links) */}
          <div className="flex items-center justify-between bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
            {prevVideo ? (
              <Link
                href={`/videos/${prevVideo.slug}`}
                className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
                <div className="text-left hidden sm:block">
                  <span className="text-xs text-muted-foreground block font-normal">Previous Lesson</span>
                  <span className="truncate max-w-[150px] block text-foreground group-hover:text-red-600 transition-colors">{prevVideo.title}</span>
                </div>
                <span className="sm:hidden">Prev Lesson</span>
              </Link>
            ) : (
              <div className="w-10" />
            )}

            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Lesson {currentIndex + 1} of {categoryVideos.length}
            </div>

            {nextVideo ? (
              <Link
                href={`/videos/${nextVideo.slug}`}
                className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-muted-foreground block font-normal">Next Lesson</span>
                  <span className="truncate max-w-[150px] block text-foreground group-hover:text-red-600 transition-colors">{nextVideo.title}</span>
                </div>
                <span className="sm:hidden">Next Lesson</span>
                <ChevronRight className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
              </Link>
            ) : (
              <div className="w-10" />
            )}
          </div>

        </div>

        {/* RIGHT COLUMN - Sidebar panels */}
        <div className="space-y-8">
          
          {/* 1. Next Up list */}
          <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 border-b border-border/40 pb-2">
              Next Up in Category
            </h3>
            <div className="space-y-4">
              {relatedVideos.map((rv) => (
                <Link
                  key={rv.slug}
                  href={`/videos/${rv.slug}`}
                  className="flex gap-3 group text-left p-1 rounded-lg hover:bg-secondary/40 transition-colors"
                >
                  <div className="relative w-20 aspect-video rounded overflow-hidden shrink-0 bg-black">
                    <Image
                      src={rv.thumbnail}
                      alt={rv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                      sizes="80px"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/75 px-1 py-0.5 rounded text-[10px] text-white font-mono">
                      {rv.duration}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-red-600 transition-colors">
                      {rv.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground block mt-1">{rv.views} views</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Gear reviews / Affiliate Products */}
          <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 border-b border-border/40 pb-2 flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4 text-red-500" /> Recommended Equipment
            </h3>
            <div className="space-y-3">
              {featuredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold truncate text-foreground">{prod.name}</h4>
                    <span className="text-xs text-red-500 font-extrabold">{prod.price}</span>
                  </div>
                  <a
                    href={prod.affiliateUrl}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    title="Buy Gear"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sponsor ad placement */}
          <div className="w-full aspect-[300/250] bg-secondary/30 rounded-3xl border border-dashed border-border/80 flex flex-col items-center justify-center text-center p-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">
              Sponsor Advertisement
            </span>
            <div className="text-xs font-bold text-foreground/80">
              Boxing Essential Gloves & Gear
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-1 max-w-[200px]">
              Use promo code <span className="font-bold text-red-600">FIGHT20</span> for 20% off all sparring equipment.
            </div>
            <Link 
              href="/shop" 
              className="mt-4 px-5 py-2 bg-zinc-800 text-[10px] text-white hover:bg-zinc-700 rounded-lg font-bold transition"
            >
              Shop Now
            </Link>
          </div>

          {/* 4. Newsletter subscriber CTA */}
          <div className="p-6 rounded-3xl bg-red-600 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8" />
            <h4 className="font-black text-sm uppercase">Join Training Circle</h4>
            <p className="text-[10px] text-red-100 mt-2 leading-normal">
              Get exclusive combinations and coaching guides sent direct to your inbox weekly.
            </p>
            <form className="mt-4 flex gap-1.5">
              <input 
                required
                type="email" 
                placeholder="Enter email address"
                className="flex-1 px-3 py-2 text-xs rounded bg-white text-black outline-none border-none"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-black text-white hover:bg-zinc-900 text-xs font-bold rounded transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Trainer Request Form */}
      <section className="border-t border-border/60 py-16 mt-12">
        <TrainingRequestForm defaultType={`${video.category}-training`} />
      </section>

      {/* Related Blogs Grid */}
      <section className="border-t border-border/60 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              Highly Relevant Guides
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Expand your training knowledge with deep-dive written articles.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-bold transition-colors"
          >
            All Blogs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBlogs.map((blog) => (
            <ArticleCard key={blog.slug} article={blog} />
          ))}
        </div>
      </section>

    </div>
  );
}
