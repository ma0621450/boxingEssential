import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Blogs, getArticleBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedPosts } from "@/components/related-posts";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { SocialShare } from "@/components/social-share";

const tocItems = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "key-features", text: "Key Features to Consider", level: 2 },
  { id: "top-picks", text: "Our Top Picks", level: 2 },
  { id: "budget-option", text: "Best Budget Option", level: 3 },
  { id: "premium-option", text: "Best Premium Option", level: 3 },
  { id: "how-to-choose", text: "How to Choose the Right Pair", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

const faqs = [
  {
    question: "What size boxing gloves should I get?",
    answer: "For training, 14-16oz gloves are standard. Heavier gloves offer more protection for sparring, while lighter gloves (10-12oz) are better for bag work and competition.",
  },
  {
    question: "How often should I replace my boxing gloves?",
    answer: "Quality gloves last 1-3 years depending on use frequency. Replace them when the padding compresses, the stitching fails, or you notice hand pain during training.",
  },
  {
    question: "Are expensive boxing gloves worth it?",
    answer: "Premium gloves offer better padding technology, durability, and wrist support. If you train 3+ times per week, investing in quality gloves pays off in protection and longevity.",
  },
  {
    question: "Can I use the same gloves for bag work and sparring?",
    answer: "It's not recommended. Bag gloves have firmer padding designed for impact, while sparring gloves need softer padding to protect your partner. Using separate gloves for each is ideal.",
  },
];

export async function generateStaticParams() {
  return Blogs.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Boxing Essential`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.featuredImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = Blogs
    .filter((a) => a.category.slug === article.category.slug && a.slug !== article.slug)
    .slice(0, 3);

  const isNews = article.category.slug === "news";
  const parentLabel = isNews ? "News" : "Blogs";
  const parentHref = isNews ? "/news" : "/blog";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.featuredImage,
            datePublished: article.date,
            author: {
              "@type": "Person",
              name: article.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Boxing Essential",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: parentLabel, href: parentHref },
            { label: article.category.name, href: isNews ? "/news" : `/${article.category.slug}` },
            { label: article.title },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          {/* Main content */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href={isNews ? "/news" : `/${article.category.slug}`}
                  className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {article.category.name}
                </Link>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {/* <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span> */}
              </div>
            </header>

            {/* Featured image */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            {/* Article body */}
            <div
              className="prose-boxing"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <SocialShare
              url={`https://boxingessential.com/blog/${article.slug}`}
              title={article.title}
              image={article.featuredImage}
            />


            {/* Related Posts */}
            {relatedArticles.length > 0 && (
              <RelatedPosts Blogs={relatedArticles} />
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8 pb-10">
              <div className="bg-secondary/10 rounded-2xl p-6 border border-border/50">
                <TableOfContents items={tocItems} />
              </div>

              <div className="rounded-2xl overflow-hidden border border-border/50">
                <AdPlaceholder location="Sidebar" className="h-[250px]" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
