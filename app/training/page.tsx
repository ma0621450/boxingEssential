import { Blogs, getCategoryBySlug, getArticlesByCategory } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowRight, Dumbbell } from "lucide-react";
import { TrainingRequestForm } from "@/components/training-request-form";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Training | Boxing Essential",
    description: "Boxing training programs, workouts, drills, and conditioning guides to level up your skills and stamina.",
  };
}

export default function TrainingPage() {
  const category = getCategoryBySlug("training")!;
  const categoryArticles = getArticlesByCategory("training");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Training" }]} />

      <div className="relative mb-10 flex flex-col items-center justify-center py-24 px-6 rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
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

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-md">
            Boxing Training School
          </h1>
          <p className="text-gray-200/90 leading-relaxed max-w-2xl text-lg lg:text-xl drop-shadow">
            {category.description} Whether you&apos;re building your base or sharpening advanced techniques, our training content is designed by coaches and fighters who know what works in the ring.
          </p>
        </div>
      </div>

      {/* Interactive Training Request Form */}
      <TrainingRequestForm />

      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Dumbbell className="text-red-600" /> Related Blogs
        </h2>
      </div>

      {categoryArticles.length > 0 ? (
        <div>
          <Link href="/blog" className="flex justify-end items-center gap-2 cursor-pointer mb-6 text-primary/80 font-semibold transition-colors">
            View All Blogs <ArrowRight className="text-primary/80" />
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No training Blogs yet. Check back soon!</p>
        </div>
      )}

    </div>
  );
}
