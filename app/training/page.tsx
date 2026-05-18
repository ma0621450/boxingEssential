import { getCategoryBySlug, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowRight, Dumbbell, Award, Flame, Sparkles } from "lucide-react";
import { TrainingRequestForm } from "@/components/training-request-form";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Training School Portal | Boxing Essential",
    description: "Access our dedicated boxing training tracks: Gym Strength, Boxing Technique, and Fitness Cardio conditioning.",
  };
}

export default function TrainingPage() {
  const category = getCategoryBySlug("training")!;
  const categoryArticles = getArticlesByCategory("training");

  const tracks = [
    {
      slug: "gym",
      title: "Gym Training School",
      tagline: "STRENGTH & POWER",
      description: "Build foundational power and physical conditioning with athletic weights and explosive compound movements.",
      icon: Dumbbell,
      color: "border-red-600/30 hover:border-red-600 hover:shadow-red-600/5",
      badgeColor: "bg-red-600/10 text-red-600 dark:bg-red-600/20 dark:text-red-400"
    },
    {
      slug: "boxing",
      title: "Boxing Training School",
      tagline: "RING SKILLS & STRATEGY",
      description: "Master boxing fundamentals, footwork, pocket slipping, and advanced counterpunching combinations.",
      icon: Award,
      color: "border-amber-600/30 hover:border-amber-600 hover:shadow-amber-600/5",
      badgeColor: "bg-amber-600/10 text-amber-600 dark:bg-amber-600/20 dark:text-amber-400"
    },
    {
      slug: "fitness",
      title: "Fitness Training School",
      tagline: "CARDIO CONDITIONAL",
      description: "Burn fat and build lung capacity with shadowboxing intervals, jump rope, and agility ladder HIIT routines.",
      icon: Flame,
      color: "border-emerald-600/30 hover:border-emerald-600 hover:shadow-emerald-600/5",
      badgeColor: "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-600/20 dark:text-emerald-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Training Portal" }]} />

      {/* Hero Header Portal */}
      <div className="relative mb-12 flex flex-col items-center justify-center py-24 px-6 rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/trainingbgvideo.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Welcome to Boxing Academy
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-md">
            Boxing Training School
          </h1>
          <p className="text-zinc-200/90 leading-relaxed text-base lg:text-lg drop-shadow">
            {category.description} Explore our three highly specialized video training divisions below. Select a school track to access tailored masterclass video archives, specific drills, and specialized programs.
          </p>
        </div>
      </div>

      {/* THREE SPECIALIZED TRACKS SECTION */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Choose Your Training Division
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl mx-auto">
            Select a pathway to unlock specialized video tutorials, advanced bag combinations, and dedicated guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <Link
                key={track.slug}
                href={`/training/${track.slug}`}
                className={`bg-card p-6 md:p-8 rounded-2xl border-2 shadow transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 ${track.color}`}
              >
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider mb-4 ${track.badgeColor}`}>
                    {track.tagline}
                  </span>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-lg text-white bg-zinc-950 dark:bg-zinc-900 group-hover:bg-red-600 transition-colors duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-foreground group-hover:text-red-600 transition-colors duration-300">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors pt-4 border-t border-border/40">
                  Enter Training School <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trainer Request Form */}
      <section className="border-t border-border/60 py-16">
        <TrainingRequestForm />
      </section>

      {/* Related Blogs Portal */}
      <section className="border-t border-border/60 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="text-red-600" /> Academy Blog Guides
          </h2>
          <Link href="/blog" className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-bold transition-colors">
            View All Blogs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No training Blogs yet. Check back soon!</p>
          </div>
        )}
      </section>

    </div>
  );
}
