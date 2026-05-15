"use client";

import { useState, useEffect } from "react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="" aria-label="Table of contents">
      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
        On This Page
      </h4>
      <ul className="space-y-2 border-l border-border/50">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm py-1 pl-4 -ml-px border-l-2 transition-colors ${
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              style={{ paddingLeft: `${(item.level - 2) * 12 + 16}px` }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
