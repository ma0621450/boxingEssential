"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  // Map of id → <li> element ref
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // Auto-scroll the TOC list panel to keep the active item centred
  const scrollTocToActive = useCallback((id: string) => {
    const container = listRef.current;
    const activeEl = itemRefs.current.get(id);
    if (!container || !activeEl) return;

    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const itemTop = activeEl.offsetTop;
    const itemHeight = activeEl.offsetHeight;

    const isAbove = itemTop < containerTop;
    const isBelow = itemTop + itemHeight > containerTop + containerHeight;

    if (isAbove || isBelow) {
      container.scrollTo({
        top: itemTop - containerHeight / 2 + itemHeight / 2,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (!items.length) return;

    // Track which headings are currently intersecting
    const visibleEntries = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleEntries.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the heading with the highest intersection ratio that is in view
        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of visibleEntries) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // Fallback: if nothing visible, pick the last heading scrolled past
        if (!bestId) {
          for (const item of items) {
            const el = document.getElementById(item.id);
            if (!el) continue;
            if (el.getBoundingClientRect().top < 200) {
              bestId = item.id;
            }
          }
        }

        if (bestId) {
          setActiveId(bestId);
          scrollTocToActive(bestId);
        }
      },
      {
        // rootMargin: top shrink by navbar+banner height, bottom shrink by 40% of viewport
        rootMargin: "-180px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1.0],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, scrollTocToActive]);

  return (
    <nav aria-label="Table of contents">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3 pb-2 border-b border-border/40 shrink-0">
        On This Page
      </h4>
      <ul
        ref={listRef}
        className="space-y-0.5 border-l border-border/40 overflow-y-auto max-h-[60vh] scrollbar-thin pr-1"
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.pushState(null, "", `#${item.id}`);
                  }
                  setActiveId(item.id);
                  scrollTocToActive(item.id);
                }}
                className={[
                  "flex items-start gap-1.5 py-1.5 pr-2 text-sm leading-tight -ml-px border-l-2 transition-all duration-200",
                  item.level === 3 ? "pl-6" : "pl-4",
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/70",
                ].join(" ")}
              >
                {isActive && (
                  <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-primary" />
                )}
                <span className={isActive ? "" : "pl-2.5"}>{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
