import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Newspaper } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareDropdown } from "@/components/share-dropdown";
import { ArticleCard } from "@/components/article-card";
import { serverClient, urlFor } from "@/lib/sanity";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries";
import { groq } from "next-sanity";
import { ArticleContent } from "@/components/article-content";
import { AdBanner } from "@/components/ad-banner";
import { extractTOC, injectHeadingIds } from "@/lib/extract-toc";

export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs = await serverClient.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await serverClient.fetch(getPostBySlug, { slug });

  if (!article) return { title: "Not Found" };

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).url()
    : "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg";

  const isNews = article.category?.toLowerCase() === "news";

  return {
    title: article.seo?.metaTitle || `${article.title} | Boxing Essential`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : [],
      images: [{ url: imageUrl }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await serverClient.fetch(getPostBySlug, { slug });

  if (!article) notFound();

  const isNews = article.category?.toLowerCase() === "news";
  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).url()
    : "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg";
  const dateStr = article.publishedAt || new Date().toISOString();

  const tocItems = article.rawHtml ? extractTOC(article.rawHtml) : [];
  const processedHtml = article.rawHtml ? injectHeadingIds(article.rawHtml) : null;
  const shareUrl = `https://boxingessential.com/${article.slug}`;

  const relatedPosts = await serverClient.fetch(getRelatedPosts, {
    category: article.category,
    slug: article.slug,
  });
  const relatedItems = relatedPosts.slice(0, 3);

  // ─── NEWS LAYOUT ─────────────────────────────────────────
  if (isNews) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: article.seo?.metaTitle || article.title,
              description: article.seo?.metaDescription || article.excerpt,
              image: imageUrl,
              datePublished: dateStr,
              author: {
                "@type": "Person",
                name: article.author?.name || "Boxing Essential",
              },
              publisher: {
                "@type": "Organization",
                name: "Boxing Essential",
              },
            }),
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <Breadcrumbs
            items={[
              { label: "News", href: "/news" },
              { label: article.title },
            ]}
          />

          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
            <article>
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-primary font-bold uppercase tracking-wider text-sm">
                  <Newspaper className="h-4 w-4" />
                  Breaking News
                </div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {article.author?.name || "Boxing Essential"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(dateStr).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <ShareDropdown url={shareUrl} title={article.title} image={imageUrl} align="right" />
                </div>
              </header>

              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 720px"
                  priority
                />
              </div>

              {article.excerpt && (
                <p className="text-xl font-medium text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
                  {article.excerpt}
                </p>
              )}

              <div className="prose-boxing">
                <ArticleContent
                  processedHtml={processedHtml}
                  content={article.content}
                />
              </div>

              <AdBanner />

              {relatedItems.length > 0 && (
                <section className="mt-12 pt-8 border-t border-border/50">
                  <h2 className="text-xl font-bold mb-6">Related News</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedItems.map((post: { _id: string }) => (
                      <ArticleCard key={post._id} article={post} />
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-[180px] space-y-8 pb-10">
                {tocItems.length > 0 && (
                  <div className="bg-secondary/10 rounded-2xl p-6 border border-border/50">
                    <TableOfContents items={tocItems} />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  // ─── BLOG LAYOUT ─────────────────────────────────────────
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.seo?.metaTitle || article.title,
            description: article.seo?.metaDescription || article.excerpt,
            image: imageUrl,
            datePublished: dateStr,
            author: {
              "@type": "Person",
              name: article.author?.name || "Boxing Essential",
            },
            publisher: {
              "@type": "Organization",
              name: "Boxing Essential",
            },
          }),
        }}
      />

      {article.faqs && article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: article.faqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Blogs", href: "/blog" },
            { label: article.category, href: "/blog" },
            { label: article.title },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href="/blog"
                  className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {article.category}
                </Link>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {article.author?.name || "Boxing Essential"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(dateStr).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <ShareDropdown url={shareUrl} title={article.title} image={imageUrl} align="right" />
              </div>
            </header>

            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <Image
                src={imageUrl}
                alt={article.mainImage?.alt || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            <div className="prose-boxing">
              <ArticleContent
                processedHtml={processedHtml}
                content={article.content}
              />
            </div>

            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-12 pt-8 border-t border-border/50" id="faq">
                <h2 className="text-2xl font-black tracking-tight leading-tight mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {article.faqs.map((faq: any, i: number) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-border/50 bg-secondary/5"
                    >
                      <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-2">
                        <span className="text-primary font-black">Q:</span>
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {article.faqs && article.faqs.length > 0 && <AdBanner />}

            {relatedItems.length > 0 && (
              <section className="mt-12 pt-8 border-t border-border/50">
                <h2 className="text-xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedItems.map((post: { _id: string }) => (
                    <ArticleCard key={post._id} article={post} />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-[180px] space-y-8 pb-10">
              {tocItems.length > 0 && (
                <div className="bg-secondary/10 rounded-2xl p-6 border border-border/50">
                  <TableOfContents items={tocItems} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}