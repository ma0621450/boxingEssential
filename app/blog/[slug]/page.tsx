import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import { articles, products, getArticleBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/table-of-contents";
import { AffiliateBlock } from "@/components/affiliate-product-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { RelatedPosts } from "@/components/related-posts";
import { AdPlaceholder } from "@/components/ad-placeholder";

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
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const relatedArticles = articles
    .filter((a) => a.category.slug === article.category.slug && a.slug !== article.slug)
    .slice(0, 3);
  const gloveProducts = products.filter((p) => p.category === "Gloves");

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
            { label: "Articles", href: "/blog" },
            { label: article.category.name, href: `/${article.category.slug}` },
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
                  href={`/${article.category.slug}`}
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
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
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
            <div className="prose-boxing">
              <h2 id="introduction">Introduction</h2>
              <p>
                Finding the right pair of boxing gloves is one of the most important decisions you&apos;ll make as a fighter. Whether you&apos;re a beginner just stepping into the gym or a seasoned professional preparing for your next camp, the gloves you wear directly impact your hand protection, punching technique, and overall training quality.
              </p>
              <p>
                In this comprehensive guide, we&apos;ve tested over 30 pairs of boxing gloves across every price range and use case. Our team of coaches and fighters has spent hundreds of hours evaluating padding quality, wrist support, durability, and overall value to bring you the definitive list of the best boxing gloves available.
              </p>

              <AdPlaceholder location="In-article (top)" className="h-[90px] my-8" />

              <h2 id="key-features">Key Features to Consider</h2>
              <p>Before diving into our recommendations, it&apos;s important to understand what makes a great boxing glove. Here are the key factors we evaluate:</p>
              <ul>
                <li><strong>Padding Quality:</strong> Multi-layer foam vs. single-layer. Look for gloves with IMF (Injection Molded Foam) or multi-layer padding for superior shock absorption.</li>
                <li><strong>Wrist Support:</strong> A secure wrist closure prevents hyperextension. Look for gloves with long cuffs and quality hook-and-loop or lace closures.</li>
                <li><strong>Leather Quality:</strong> Genuine leather outlasts synthetic materials by years. Premium gloves use cowhide or goatskin leather.</li>
                <li><strong>Weight/Oz:</strong> 14-16oz for sparring, 10-12oz for bag work, 8-10oz for competition. Heavier gloves provide more protection.</li>
                <li><strong>Fit and Comfort:</strong> The glove should feel like a natural extension of your hand. Thumb placement and hand compartment size matter.</li>
              </ul>

              <h2 id="top-picks">Our Top Picks</h2>
              <p>After extensive testing, these are the boxing gloves that stood out from the rest. We&apos;ve categorized them by use case and budget to help you find the perfect match.</p>

              <NewsletterSignup variant="inline" />

              <h3 id="budget-option">Best Budget Option</h3>
              <p>
                For fighters on a budget, the Ringside IMF Tech gloves offer exceptional value. At under $100, you get multi-layer foam padding, genuine leather construction, and solid wrist support that punches well above its price class.
              </p>

              <h3 id="premium-option">Best Premium Option</h3>
              <p>
                The Winning MS-500 remains the gold standard of boxing gloves. While the price is steep, the unparalleled hand protection, custom-feel padding, and legendary durability make these a lifetime investment for serious fighters.
              </p>

              <AffiliateBlock
                title="Recommended Boxing Gloves"
                description="Our top picks based on extensive testing and real-world use."
                products={gloveProducts}
              />

              <h2 id="how-to-choose">How to Choose the Right Pair</h2>
              <p>Choosing boxing gloves comes down to three main questions:</p>
              <ol>
                <li><strong>What will you use them for?</strong> Sparring, bag work, or competition each require different glove weights and padding types.</li>
                <li><strong>How often do you train?</strong> Frequent training (3+ days/week) demands higher-quality gloves that can withstand daily use.</li>
                <li><strong>What&apos;s your budget?</strong> While we recommend investing in the best you can afford, excellent options exist at every price point.</li>
              </ol>

              <AdPlaceholder location="In-article (mid)" className="h-[90px] my-8" />

              <h2 id="faq">Frequently Asked Questions</h2>
              <div className="space-y-4 my-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                    <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <NewsletterSignup variant="compact" />
            </div>

            {/* Related Posts */}
            {relatedArticles.length > 0 && (
              <RelatedPosts articles={relatedArticles} />
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />

              <AdPlaceholder location="Sidebar" className="h-[250px]" />

              <NewsletterSignup variant="compact" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
