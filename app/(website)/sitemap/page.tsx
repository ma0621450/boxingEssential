import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Map } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serverClient } from "@/lib/sanity";
import {
  SITE_BASE_URL,
  STATIC_SITEMAP_SECTIONS,
  buildDynamicSections,
  getSitemapPosts,
  getSitemapTutorials,
  type SitemapSection,
} from "@/lib/sitemap-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sitemap | Boxing Essential",
  description:
    "Browse all pages, blog posts, news articles, and training videos on Boxing Essential.",
  alternates: { canonical: `${SITE_BASE_URL}/sitemap` },
};

function SitemapSectionBlock({ section }: { section: SitemapSection }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border/50">
        {section.title}
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({section.links.length})
        </span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {section.links.map((link, index) => (
          <li key={`${section.id}-${link.href}-${index}`}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors leading-snug"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SitemapPage() {
  const [posts, tutorials] = await Promise.all([
    serverClient.fetch(getSitemapPosts),
    serverClient.fetch(getSitemapTutorials),
  ]);

  const dynamicSections = buildDynamicSections(posts, tutorials);
  const allSections = [...STATIC_SITEMAP_SECTIONS, ...dynamicSections];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Sitemap" }]} />

      <div className="flex items-start gap-4 mb-6">
        <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <Map className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-3">
            Sitemap
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            A complete list of pages on Boxing Essential — main sections, articles,
            and training videos.
          </p>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {allSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {section.title}
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {allSections.map((section) => (
          <SitemapSectionBlock key={section.id} section={section} />
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-border/50">
        <h2 className="text-lg font-bold mb-3">XML Sitemap</h2>
        <p className="text-sm text-muted-foreground mb-4">
          For search engines, use our machine-readable sitemap index:
        </p>
        <a
          href="/sitemap.xml"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {SITE_BASE_URL}/sitemap.xml
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
