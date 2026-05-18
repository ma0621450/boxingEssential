"use client";

import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Play, Eye, Calendar, Sparkles } from "lucide-react";
import { Video, getRelatedVideos } from "@/lib/videoData";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  video: Video;
  allCategoryVideos: Video[];
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export function VideoModal({ video, allCategoryVideos, onClose, onNavigate }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC key closing mechanism
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Click outside to close mechanism
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Find previous and next video slugs inside the active category
  const currentIndex = allCategoryVideos.findIndex((v) => v.slug === video.slug);
  const prevVideo = currentIndex > 0 ? allCategoryVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allCategoryVideos.length - 1 ? allCategoryVideos[currentIndex + 1] : null;

  // Pull related videos
  const relatedVideos = getRelatedVideos(video, 3);
  // Pull a couple of shop products for affiliate layout
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
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* LEFT / MAIN SECTION - Video & Details (2/3 width on desktop) */}
          <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border/60">
            
            {/* 16:9 Video Responsive Embed */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
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

            {/* Title & Metadata */}
            <div className="mt-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600/10 text-red-600 dark:bg-red-600/20 dark:text-red-400 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> {video.category} training
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-3 leading-tight text-foreground">
                {video.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {video.views} Views</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published {video.date}</span>
                <span className="font-semibold text-foreground bg-secondary/80 px-2 py-0.5 rounded">Duration: {video.duration}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 border-t border-border/50 pt-5">
              <h3 className="font-bold text-lg mb-2 text-foreground">Training Objectives & Outline</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                {video.description}
              </p>
            </div>

            {/* Prev / Next Navigation Controls */}
            <div className="mt-8 border-t border-border/50 pt-5 flex items-center justify-between">
              {prevVideo ? (
                <button
                  onClick={() => onNavigate(prevVideo.slug)}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
                  <div className="text-left hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">Previous Lesson</span>
                    <span className="truncate max-w-[150px] block">{prevVideo.title}</span>
                  </div>
                  <span className="sm:hidden">Prev Lesson</span>
                </button>
              ) : (
                <div className="w-10" />
              )}

              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Lesson {currentIndex + 1} of {allCategoryVideos.length}
              </div>

              {nextVideo ? (
                <button
                  onClick={() => onNavigate(nextVideo.slug)}
                  className="flex items-center gap-2 group text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-muted-foreground block font-normal">Next Lesson</span>
                    <span className="truncate max-w-[150px] block">{nextVideo.title}</span>
                  </div>
                  <span className="sm:hidden">Next Lesson</span>
                  <ChevronRight className="h-5 w-5 border border-border rounded-full p-0.5 group-hover:border-red-600 transition-colors" />
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

          </div>

          {/* RIGHT SECTION - Sidebar (1/3 width on desktop) */}
          <div className="bg-secondary/15 p-6 md:p-8 space-y-8 flex flex-col justify-start">
            
            {/* 1. Related Videos inside Category */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Next Up in Category
              </h3>
              <div className="space-y-3">
                {relatedVideos.map((rv) => (
                  <button
                    key={rv.slug}
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
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Affiliate Products Sidebar */}
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

            {/* 3. Ad Placement Spacer */}
            <div className="border-t border-border/60 pt-6">
              <div className="w-full aspect-[300/250] bg-secondary/35 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center text-center p-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">
                  Sponsor Ad
                </span>
                <div className="text-xs font-bold text-foreground/80">
                  Boxing Essential Gloves & Gear
                </div>
                <div className="text-[10px] text-muted-foreground/60 mt-1 max-w-[200px]">
                  Use promo code <span className="font-bold text-red-600">FIGHT20</span> for 20% off all sparring equipment.
                </div>
                <a 
                  href="/shop" 
                  className="mt-3 px-4 py-1.5 bg-zinc-800 text-[10px] text-white hover:bg-zinc-700 rounded-md font-bold transition"
                >
                  Shop Now
                </a>
              </div>
            </div>

            {/* 4. Newsletter CTA */}
            <div className="border-t border-border/60 pt-6 mt-auto">
              <div className="p-4 rounded-xl bg-red-600 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8" />
                <h4 className="font-black text-sm uppercase">Join Training Circle</h4>
                <p className="text-[10px] text-red-100 mt-1 leading-normal">
                  Get exclusive combinations and coaching guides sent direct to your inbox weekly.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="mt-3 flex gap-1">
                  <input 
                    required
                    type="email" 
                    placeholder="Enter email"
                    className="flex-1 px-2.5 py-1.5 text-xs rounded bg-white text-black outline-none"
                  />
                  <button 
                    type="submit" 
                    className="px-3 py-1.5 bg-black text-white hover:bg-zinc-900 text-xs font-bold rounded transition"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
