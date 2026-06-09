import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCTA } from "@/components/product-cta";
import { ProductRating } from "@/components/product-rating";
import { ProductFAQ } from "@/components/product-faq";
import { ProductComparisonTable } from "@/components/product-comparison-table";
import {
  KeyFeatures,
  Specifications,
  Benefits,
  ProsAndCons,
  ExpertReview,
} from "@/components/product-info-sections";
import { RelatedProducts } from "@/components/related-products";
import { ArticleContent } from "@/components/article-content";
import { ShareDropdown } from "@/components/share-dropdown";
import { serverClient, urlFor } from "@/lib/sanity";
import {
  getAffiliateProductBySlug,
  getAffiliateProductSlugs,
  getRelatedAffiliateProducts,
} from "@/lib/queries";
import { getCategoryBySlug, getCategoryName } from "@/lib/product-categories";
import { mapSanityProduct } from "@/lib/affiliate-product";
import { extractTOC, injectHeadingIds } from "@/lib/extract-toc";
import { TableOfContents } from "@/components/table-of-contents";

const SITE_URL = "https://boxingessential.com";
const PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=1200";

export async function generateStaticParams() {
  const products = await serverClient.fetch(getAffiliateProductSlugs);
  return products.map((p: { slug: string; category: string }) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await serverClient.fetch(getAffiliateProductBySlug, {
    category,
    slug,
  });

  if (!product) return { title: "Not Found" };

  const imageUrl = product.image?.asset?.url
    ? urlFor(product.image).width(1200).url()
    : product.seo?.ogImage?.asset?.url ?? PLACEHOLDER_IMAGE;

  const title =
    product.seo?.metaTitle ||
    `${product.title} Review | ${getCategoryName(category)} | Boxing Essential`;
  const description =
    product.seo?.metaDescription ||
    product.description ||
    `Read our complete review, features, pros and cons, specifications, and buying guide for ${product.title}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/shop/${category}/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/shop/${category}/${slug}`,
      images: [{ url: imageUrl }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  if (!getCategoryBySlug(category)) notFound();

  const product = await serverClient.fetch(getAffiliateProductBySlug, {
    category,
    slug,
  });

  if (!product) notFound();

  const categoryName = getCategoryName(category);
  const mainImageUrl = product.image?.asset?.url
    ? urlFor(product.image).width(1200).url()
    : PLACEHOLDER_IMAGE;

  const galleryImages = (product.gallery ?? [])
    .filter((img: { asset?: { url?: string } }) => img.asset?.url)
    .map((img: { asset: { url: string }; alt?: string; caption?: string }) => ({
      url: urlFor(img).width(800).url(),
      alt: img.alt,
      caption: img.caption,
    }));

  const relatedRaw = await serverClient.fetch(getRelatedAffiliateProducts, {
    category,
    slug,
  });
  const relatedProducts = relatedRaw.map(mapSanityProduct);

  const shareUrl = `${SITE_URL}/shop/${category}/${slug}`;
  const tocItems = product.rawHtml ? extractTOC(product.rawHtml) : [];
  const processedHtml = product.rawHtml ? injectHeadingIds(product.rawHtml) : null;

  const categoryShopUrl = `${SITE_URL}/shop?category=${category}`;

  const breadcrumbItems = [
    { label: "Shop", href: "/shop" },
    { label: categoryName, href: `/shop?category=${category}` },
    { label: product.title },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: categoryShopUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: shareUrl,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [mainImageUrl, ...galleryImages.map((g: { url: string }) => g.url)],
    description: product.description,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    offers: {
      "@type": "Offer",
      price: product.price?.replace(/[^0-9.]/g, "") || undefined,
      priceCurrency: "USD",
      url: product.url,
      availability: "https://schema.org/InStock",
    },
  };

  const reviewSchema = product.expertReview
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: { "@type": "Product", name: product.title },
        reviewBody: product.expertReview,
        author: {
          "@type": "Organization",
          name: "Boxing Essential",
        },
        ...(product.rating && {
          reviewRating: {
            "@type": "Rating",
            ratingValue: product.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }),
      }
    : null;

  const faqSchema =
    product.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map(
            (faq: { question: string; answer: string }) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })
          ),
        }
      : null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boxing Essential",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          <div>
            {/* Above the fold: Gallery + Product Info */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
              <ProductGallery
                mainImage={mainImageUrl}
                gallery={galleryImages}
                productName={product.title}
              />

              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                  {categoryName}
                  {product.brand && ` · ${product.brand}`}
                </span>

                <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                  {product.title}
                </h1>

                <ProductRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />

                {product.description && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="mt-6">
                  <ProductCTA
                    url={product.url}
                    price={product.price}
                    ctaText={product.ctaText ?? "Shop Now"}
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <ShareDropdown url={shareUrl} title={product.title} />
                </div>

                {product.keyFeatures?.length > 0 && (
                  <div className="mt-8">
                    <KeyFeatures features={product.keyFeatures} />
                  </div>
                )}
              </div>
            </div>

            {/* Product detail sections */}
            <div className="space-y-0">
              <Specifications specs={product.specifications ?? []} />
              <Benefits benefits={product.benefits ?? []} />
              <ProsAndCons pros={product.pros ?? []} cons={product.cons ?? []} />
              <ExpertReview review={product.expertReview ?? ""} />
              <ProductComparisonTable products={product.comparisonProducts ?? []} />
            </div>

            {/* Mid-page CTA */}
            <div className="my-12 p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center">
              <h2 className="text-xl font-black mb-2">Ready to Buy?</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Get the best price on {product.title} from our trusted partner.
              </p>
              <ProductCTA
                url={product.url}
                ctaText={product.ctaText ?? "Shop Now"}
                variant="sticky"
              />
            </div>

            <ProductFAQ faqs={product.faqs ?? []} />

            {/* SEO content section */}
            {(processedHtml || product.content?.length > 0) && (
              <section className="mt-12 prose-boxing" aria-label="Product guide">
                <h2 className="text-2xl font-black mb-6 not-prose">
                  Complete Buying Guide
                </h2>
                <ArticleContent
                  processedHtml={processedHtml}
                  content={product.content}
                />
              </section>
            )}

            <RelatedProducts products={relatedProducts} />

            <div className="mt-12 p-6 bg-secondary/20 rounded-2xl border border-border/30 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Affiliate Disclosure:</strong> Boxing Essential is
                reader-supported. When you buy through links on our site, we may
                earn an affiliate commission at no extra cost to you.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[180px] space-y-6">
              {tocItems.length > 0 && <TableOfContents items={tocItems} />}
              <div className="p-5 rounded-2xl border border-border/50 bg-card">
                <p className="text-sm font-bold mb-3">{product.title}</p>
                {product.price && (
                  <p className="text-xl font-black mb-4">{product.price}</p>
                )}
                <ProductCTA
                  url={product.url}
                  ctaText={product.ctaText ?? "Shop Now"}
                  variant="sticky"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
