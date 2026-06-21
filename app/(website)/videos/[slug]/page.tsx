import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { serverClient } from "@/lib/sanity";
import {
  getBlogsByTrainingCategory,
  getFeaturedAffiliateProducts,
} from "@/lib/queries";
import {
  getTutorialBySlug,
  getTutorialsByCategory,
  getRelatedTutorials,
  getAllTutorialSlugs,
} from "@/lib/tutorial-queries";
import {
  mapSanityTutorial,
  mapSanityTutorials,
  getCategoryLabel,
  type SanityTutorial,
} from "@/lib/tutorial";
import { withYoutubeDuration, withYoutubeDurationList } from "@/lib/enrich-tutorial";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TrainingRequestForm } from "@/components/training-request-form";
import { ArticleCard } from "@/components/article-card";
import {
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const SITE_URL = "https://boxingessential.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tutorials = await serverClient.fetch(getAllTutorialSlugs);
  return tutorials.map((t: { slug: string }) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const raw = await serverClient.fetch(getTutorialBySlug, { slug });
  if (!raw) return {};

  const tutorial = mapSanityTutorial(raw);
  const categoryLabel = getCategoryLabel(tutorial.category);

  const title =
    raw.seo?.metaTitle ||
    `${tutorial.title} | ${tutorial.lessonLabel} | ${categoryLabel}`;
  const description =
    raw.seo?.metaDescription ||
    tutorial.description.slice(0, 160) ||
    `Watch ${tutorial.lessonLabel} of our ${categoryLabel} series: ${tutorial.title}`;

  const ogImage =
    raw.seo?.ogImage?.asset?.url ??
    raw.thumbnail?.asset?.url ??
    PLACEHOLDER_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/videos/${slug}` },
    openGraph: {
      title,
      description,
      type: "video.other",
      url: `${SITE_URL}/videos/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 675, alt: tutorial.title }],
    },
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawFetched = await serverClient.fetch(getTutorialBySlug, { slug });
  if (!rawFetched) notFound();
  const raw = await withYoutubeDuration(rawFetched);

  const categoryRaw = await withYoutubeDurationList(
    await serverClient.fetch<SanityTutorial[]>(getTutorialsByCategory, {
      category: raw.category,
    })
  );
  const categoryVideos = mapSanityTutorials(categoryRaw);
  const video = categoryVideos.find((v) => v.slug === slug);
  if (!video) notFound();

  const currentIndex = categoryVideos.findIndex((v) => v.slug === slug);
  const prevVideo = currentIndex > 0 ? categoryVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < categoryVideos.length - 1 ? categoryVideos[currentIndex + 1] : null;

  const relatedRaw = await withYoutubeDurationList(
    await serverClient.fetch<SanityTutorial[]>(getRelatedTutorials, {
      category: raw.category,
      slug,
    })
  );
  const relatedVideos = mapSanityTutorials(relatedRaw);

  const [relatedBlogs, products] = await Promise.all([
    serverClient.fetch(getBlogsByTrainingCategory, {
      category: getCategoryLabel(raw.category),
    }),
    serverClient.fetch(getFeaturedAffiliateProducts),
  ]);

  const categoryTitle = getCategoryLabel(video.category);
  const shareUrl = `${SITE_URL}/videos/${slug}`;

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: raw.publishedAt,
    duration: video.duration,
    contentUrl: video.youtubeUrl,
    embedUrl: video.embedUrl,
    url: shareUrl,
    isPartOf: {
      "@type": "Course",
      name: `${categoryTitle} School`,
      provider: { "@type": "Organization", name: "Boxing Essential" },
    },
    hasPart: {
      "@type": "Clip",
      name: video.lessonLabel,
      position: video.lessonNumber,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: `${SITE_URL}/training/${video.category}`,
      },
      { "@type": "ListItem", position: 3, name: video.title, item: shareUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: categoryTitle, href: `/training/${video.category}` },
            { label: video.lessonLabel },
            { label: video.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-xl border border-border/40">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-red-600/10 text-red-600 uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> {video.lessonLabel} ·{" "}
                {categoryTitle}
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-4 leading-tight">
                {video.title}
              </h1>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground border-b border-border/50 pb-5">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {video.views} Views
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Published {video.date}
                </span>
                <span className="font-semibold text-foreground bg-secondary/80 px-2 py-0.5 rounded">
                  Duration: {video.duration}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="font-black text-lg mb-3">Lesson Objectives</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {video.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              {prevVideo ? (
                <Link
                  href={`/videos/${prevVideo.slug}`}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600" />
                  <div className="text-left hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">
                      {prevVideo.lessonLabel}
                    </span>
                    <span className="truncate max-w-[150px] block text-foreground group-hover:text-red-600">
                      {prevVideo.title}
                    </span>
                  </div>
                  <span className="sm:hidden">Prev</span>
                </Link>
              ) : (
                <div className="w-10" />
              )}

              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {video.lessonLabel} of {categoryVideos.length}
              </div>

              {nextVideo ? (
                <Link
                  href={`/videos/${nextVideo.slug}`}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">
                      {nextVideo.lessonLabel}
                    </span>
                    <span className="truncate max-w-[150px] block text-foreground group-hover:text-red-600">
                      {nextVideo.title}
                    </span>
                  </div>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600" />
                </Link>
              ) : (
                <div className="w-10" />
              )}
            </div>
          </div>

          <div className="space-y-8">
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
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded">
                        L{rv.lessonNumber}
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/75 px-1 py-0.5 rounded text-[10px] text-white font-mono">
                        {rv.duration}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-red-600">
                        {rv.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground block mt-1">
                        {rv.views} views
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {products.length > 0 && (
              <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 border-b border-border/40 pb-2 flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4 text-red-500" /> Recommended
                </h3>
                <div className="space-y-3">
                  {products.map((prod: { _id: string; title: string; price?: string; image?: string; affiliateUrl: string }) => (
                    <div
                      key={prod._id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary">
                        {prod.image && (
                          <Image
                            src={prod.image}
                            alt={prod.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold truncate">{prod.title}</h4>
                        <span className="text-xs text-red-500 font-extrabold">
                          {prod.price}
                        </span>
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
            )}

            <div className="w-full aspect-[300/250] bg-secondary/30 rounded-3xl border border-dashed border-border/80 flex flex-col items-center justify-center text-center p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">
                Sponsor Advertisement
              </span>
              <div className="text-xs font-bold text-foreground/80">
                Boxing Essential Gloves & Gear
              </div>
              <Link
                href="/shop"
                className="mt-4 px-5 py-2 bg-zinc-800 text-[10px] text-white hover:bg-zinc-700 rounded-lg font-bold transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <section className="border-t border-border/60 py-16 mt-12">
          <TrainingRequestForm defaultType={`${video.category}-training`} />
        </section>

        {relatedBlogs.length > 0 && (
          <section className="border-t border-border/60 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  Highly Relevant Blogs
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
              {relatedBlogs.map((blog: { _id: string; slug: string }) => (
                <ArticleCard key={blog._id} article={blog} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
