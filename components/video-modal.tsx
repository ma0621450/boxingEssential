"use client";

import { useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Eye,
  Calendar,
  Sparkles,
} from "lucide-react";
import type { Tutorial } from "@/lib/tutorial";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface VideoModalProps {
  video: Tutorial;
  allCategoryVideos: Tutorial[];
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export function VideoModal({
  video,
  allCategoryVideos,
  onClose,
  onNavigate,
}: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const currentIndex = allCategoryVideos.findIndex((v) => v.slug === video.slug);
  const prevVideo = currentIndex > 0 ? allCategoryVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < allCategoryVideos.length - 1
      ? allCategoryVideos[currentIndex + 1]
      : null;

  const relatedVideos = allCategoryVideos
    .filter((v) => v.slug !== video.slug)
    .slice(0, 3);

  const featuredProducts = products.slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-start bg-black/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl bg-background rounded-3xl border border-border shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border/60">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="mt-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600/10 text-red-600 dark:bg-red-600/20 dark:text-red-400 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> {video.lessonLabel} ·{" "}
                {video.categoryLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-3 leading-tight text-foreground">
                {video.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
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
            </div>

            <div className="mt-6 border-t border-border/50 pt-5">
              <h3 className="font-bold text-lg mb-2 text-foreground">
                Lesson Objectives
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                {video.description}
              </p>
            </div>

            <div className="mt-8 border-t border-border/50 pt-5 flex items-center justify-between">
              {prevVideo ? (
                <button
                  type="button"
                  onClick={() => onNavigate(prevVideo.slug)}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
                  <div className="text-left hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">
                      {prevVideo.lessonLabel}
                    </span>
                    <span className="truncate max-w-[150px] block">{prevVideo.title}</span>
                  </div>
                  <span className="sm:hidden">Prev</span>
                </button>
              ) : (
                <div className="w-10" />
              )}

              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                {video.lessonLabel} of {allCategoryVideos.length}
              </div>

              {nextVideo ? (
                <button
                  type="button"
                  onClick={() => onNavigate(nextVideo.slug)}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">
                      {nextVideo.lessonLabel}
                    </span>
                    <span className="truncate max-w-[150px] block">{nextVideo.title}</span>
                  </div>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>
          </div>

          <div className="bg-secondary/15 p-6 md:p-8 space-y-8 flex flex-col justify-start">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Next Up in Category
              </h3>
              <div className="space-y-3">
                {relatedVideos.map((rv) => (
                  <button
                    key={rv.slug}
                    type="button"
                    onClick={() => onNavigate(rv.slug)}
                    className="w-full flex gap-3 text-left group p-1.5 rounded-lg hover:bg-secondary transition-colors"
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
                      <h4 className="text-xs font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-red-600 transition-colors">
                        {rv.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground block mt-1">
                        {rv.views} views
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/60 pt-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4 text-red-500" /> Recommended Gear
              </h3>
              <div className="space-y-3">
                {featuredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur"
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

            <div className="border-t border-border/60 pt-6">
              <Link
                href={`/videos/${video.slug}`}
                className="block w-full text-center px-4 py-2.5 bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl text-sm font-bold transition"
              >
                Open Full Lesson Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
