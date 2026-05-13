"use client";

import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

type BoxingHeadlinesMarqueeProps = {
  headlines: string[];
};

export function BoxingHeadlinesMarquee({ headlines }: BoxingHeadlinesMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduceMotion) {
    return (
      <section
        className="border-y border-border/60 bg-card/40 backdrop-blur-sm"
        aria-label="Sports news headlines"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
          <div className="flex items-center gap-2 shrink-0 text-primary">
            <Newspaper className="h-4 w-4" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider">Sports wire</span>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {headlines.map((h) => (
              <li key={h} className="text-foreground/90">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      className="group/marquee border-y border-border/60 bg-gradient-to-r from-card via-secondary/30 to-card overflow-hidden"
      aria-label="Sports news headlines"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 shrink-0 text-primary sm:pr-2 sm:border-r sm:border-border/50">
          <Newspaper className="h-4 w-4" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Sports wire
          </span>
        </div>
        <div className="relative flex-1 min-w-0 overflow-hidden">
          <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
            <div className="flex gap-10 sm:gap-12 items-center shrink-0 pr-10 sm:pr-12">
              {headlines.map((headline) => (
                <span
                  key={headline}
                  className="text-sm sm:text-base text-foreground/90 whitespace-nowrap font-medium tracking-tight"
                >
                  <span className="text-primary mr-3" aria-hidden>
                    ●
                  </span>
                  {headline}
                </span>
              ))}
            </div>
            <div className="flex gap-10 sm:gap-12 items-center shrink-0 pr-10 sm:pr-12" aria-hidden>
              {headlines.map((headline) => (
                <span
                  key={`${headline}-dup`}
                  className="text-sm sm:text-base text-foreground/90 whitespace-nowrap font-medium tracking-tight"
                >
                  <span className="text-primary mr-3" aria-hidden>
                    ●
                  </span>
                  {headline}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
