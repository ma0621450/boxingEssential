"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { getTutorialsByCategory } from "@/lib/queries";
import { Blogs, Article } from "@/lib/data";
import { VideoModal } from "@/components/video-modal";
import { TrainingRequestForm } from "@/components/training-request-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleCard } from "@/components/article-card";
import { Play, Eye, Clock, Calendar, ArrowRight, Dumbbell, Award, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TrainingCategoryClientProps {
  category: "gym" | "boxing" | "fitness";
}

export function TrainingCategoryClient({ category }: TrainingCategoryClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideoSlug, setActiveVideoSlug] = useState<string | null>(null);
  const [categoryVideos, setCategoryVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sanityCategoryMap: any = {
      gym: "Gym Training",
      boxing: "Boxing Training",
      fitness: "Fitness Training"
    };

    client.fetch(getTutorialsByCategory, { category: sanityCategoryMap[category] })
      .then((data: any[]) => {
        // Map Sanity tutorial schema to UI expected format
        const mapped = data.map((d: any, index: number) => ({
          ...d,
          slug: d._id,
          thumbnail: "https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=800", // Default since Sanity schema didn't have thumbnail
          duration: "10:00",
          views: "1K+",
          date: new Date().toLocaleDateString()
        }));
        setCategoryVideos(mapped);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [category]);

  // 1. Featured video
  const featuredVideo = categoryVideos.length > 0 ? categoryVideos[0] : null;

  // 2. Pagination Math (8 videos per page)
  const videosPerPage = 8;
  const totalPages = Math.ceil(categoryVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = categoryVideos.slice(startIndex, startIndex + videosPerPage);

  // 3. Handle popstate back-button sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/videos/")) {
        const slug = path.split("/videos/")[1];
        setActiveVideoSlug(slug);
      } else {
        setActiveVideoSlug(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 4. Open / Close modal helpers
  const handleOpenModal = (slug: string) => {
    setActiveVideoSlug(slug);
    // Push the video URL to the history stack cleanly
    window.history.pushState({ videoSlug: slug }, "", `/videos/${slug}`);
  };

  const handleCloseModal = () => {
    setActiveVideoSlug(null);
    // Restore the category training page URL cleanly
    window.history.pushState(null, "", `/training/${category}`);
  };

  const handleNavigateModal = (slug: string) => {
    setActiveVideoSlug(slug);
    // Replace state or push state on inner navigation
    window.history.pushState({ videoSlug: slug }, "", `/videos/${slug}`);
  };

  const activeVideo = activeVideoSlug ? categoryVideos.find(v => v.slug === activeVideoSlug) : null;

  // 5. Category Details Mapping
  const categoryDetails = {
    gym: {
      title: "Gym Training School",
      tagline: "Strength, Power & Athletic Development",
      description: "Build the foundational strength, explosive power, and physical conditioning of a professional fighter. Access high-quality strength circuits, weight room walkthroughs, and core stability programs designed to unlock your body's athletic peak.",
      themeColor: "text-red-500",
      formType: "gym-training",
      icon: Dumbbell
    },
    boxing: {
      title: "Boxing Training School",
      tagline: "Ring Tactics, Footwork & Strategy",
      description: "Master the sweet science under the guidance of elite coaches. Access structured video drills detailing perfect punching mechanics, lateral footwork, pocket defense, head movement, and inside sparring combinations.",
      themeColor: "text-amber-500",
      formType: "boxing-training",
      icon: Award
    },
    fitness: {
      title: "Fitness Training School",
      tagline: "High-Energy Cardio & Calorie Burn",
      description: "Get in fighter shape without ever taking a punch. Our boxing fitness routines blend high-volume shadowboxing combinations, high-intensity interval conditioning (HIIT), and agility ladder flows to burn calories and build stamina.",
      themeColor: "text-emerald-500",
      formType: "fitness-training",
      icon: Flame
    }
  }[category];

  // 6. Pull and Filter Related Blogs
  const relatedBlogs = {
    gym: Blogs.filter(b => b.slug === "boxing-workout-beginners" || b.slug === "boxing-cardio-workout"),
    boxing: Blogs.filter(b => b.slug === "how-to-jab" || b.slug === "boxing-stance-guide" || b.slug === "counter-fighting-guide"),
    fitness: Blogs.filter(b => b.slug === "boxing-cardio-workout" || b.slug === "boxing-diet-plan")
  }[category];

  const CategoryIcon = categoryDetails.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: categoryDetails.title }
        ]}
      />

      {/* 1. HERO SECTION (Category Specific Featured Video) */}
      <section className="mt-6 mb-16">
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading tutorials...</div>
        ) : !featuredVideo ? (
          <div className="text-center py-20 text-muted-foreground">No tutorials found for this category.</div>
        ) : (
          <div className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">

              {/* Hero Left: Featured Video Thumbnail & Play Overlay */}
              <div
                className="lg:col-span-7 relative aspect-video bg-black cursor-pointer group"
                onClick={() => handleOpenModal(featuredVideo.slug)}
              >
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  fill
                  priority
                  className="object-cover opacity-80 group-hover:scale-[1.02] group-hover:opacity-90 transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition duration-300">
                    <Play className="h-8 w-8 md:h-10 md:w-10 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Banner indicator */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <CategoryIcon className="h-3.5 w-3.5" /> Featured Class
                </div>

                {/* Video metadata pill */}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur px-3 py-1 rounded text-xs font-mono text-white">
                  {featuredVideo.duration} • {featuredVideo.views} views
                </div>
              </div>

              {/* Hero Right: Copy details */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center text-white">
                <span className={cn("text-xs font-extrabold uppercase tracking-widest", categoryDetails.themeColor)}>
                  {categoryDetails.tagline}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-4 leading-tight">
                  {categoryDetails.title}
                </h1>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {categoryDetails.description}
                </p>

                <div className="border-t border-zinc-800 pt-6">
                  <span className="text-xs text-zinc-500 uppercase block font-semibold">Featured Lesson</span>
                  <h4 className="text-base md:text-lg font-bold text-zinc-100 mt-1 line-clamp-1">
                    {featuredVideo.title}
                  </h4>
                  <button
                    onClick={() => handleOpenModal(featuredVideo.slug)}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-red-600/10"
                  >
                    Watch Class <Play className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* 2. VIDEO GRID SECTION (PAGINATED) */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-5 mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
              <CategoryIcon className={cn("h-6 w-6", categoryDetails.themeColor)} /> Video Library
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Browse our masterclass training lessons ({categoryVideos.length} videos available).
            </p>
          </div>

          <div className="text-sm font-bold text-muted-foreground shrink-0 bg-secondary px-3 py-1 rounded">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedVideos.map((vid) => (
            <div
              key={vid.slug}
              className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer"
              onClick={() => handleOpenModal(vid.slug)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black shrink-0">
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition duration-300" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Pill */}
                <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                  {vid.duration}
                </div>
              </div>

              {/* Copy details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    <span>{vid.category}</span>
                    <span className="text-muted-foreground font-normal lowercase">{vid.views} views</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mt-2 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {vid.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border/40 font-mono">
                  <Calendar className="h-3.5 w-3.5" /> Published {vid.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-xl hover:bg-secondary transition disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={cn(
                  "w-10 h-10 rounded-xl font-bold text-sm transition",
                  currentPage === idx + 1
                    ? "bg-red-600 text-white shadow-md shadow-red-600/10"
                    : "border border-border hover:bg-secondary"
                )}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-xl hover:bg-secondary transition disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </section>

      {/* 3. FORM SECTION */}
      <section className="border-t border-border/60 py-16">
        <TrainingRequestForm defaultType={categoryDetails.formType} />
      </section>

      {/* 4. RELATED BLOGS SECTION */}
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

      {/* 5. DYNAMIC MODAL LIGHTBOX SYSTEM */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          allCategoryVideos={categoryVideos}
          onClose={handleCloseModal}
          onNavigate={handleNavigateModal}
        />
      )}
    </div>
  );
}
