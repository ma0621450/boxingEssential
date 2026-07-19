import { groq } from 'next-sanity';

/** Hide posts scheduled for the future; keep legacy posts without a date. */
const isLive = `(!defined(publishedAt) || publishedAt <= now())`;

// ─── Blog Queries (excludes News) ────────────────────────────

export const getPaginatedBlogs = groq`
  *[
    _type == "post" && 
    category != "News" && 
    defined(slug.current) &&
    ${isLive} &&
    (
      $category == "ALL" || 
      category == $category
    )
  ] | order(publishedAt desc) [$start..$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url,
        metadata { dimensions }
      },
      alt
    },
    category,
    tags
  }
`;

export const getBlogsCount = groq`
  count(*[
    _type == "post" && 
    category != "News" && 
    defined(slug.current) &&
    ${isLive} &&
    (
      $category == "ALL" || 
      category == $category
    )
  ])
`;

// ─── Single Post by Slug ──────────────────────────────────────

export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug && ${isLive}][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    rawHtml,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions }
        }
      }
    },
    mainImage {
      asset->{
        _id,
        url,
        metadata { dimensions }
      },
      alt
    },
    category,
    tags,
    faqs[] {
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      focusKeyword,
      ogImage {
        asset->{ url }
      }
    },
    author-> {
      name,
      image {
        asset->{ url }
      },
      bio
    }
  }
`;

// ─── Related Posts ────────────────────────────────────────────

export const getBlogCategories = groq`
  array::unique(*[_type == "post" && category != "News" && defined(category) && ${isLive}].category)
`;

export const getAffiliateProductCategories = groq`
  array::unique(*[_type == "affiliateProduct" && defined(category)].category)
`;

export const getFeaturedAffiliateProducts = groq`
  *[_type == "affiliateProduct" && featured == true && defined(url)] | order(_createdAt desc) [0..3] {
    _id,
    title,
    description,
    price,
    "image": image.asset->url,
    "affiliateUrl": url,
    category
  }
`;

export const getBlogsByTrainingCategory = groq`
  *[
    _type == "post" &&
    category != "News" &&
    category == $category &&
    defined(slug.current) &&
    ${isLive}
  ] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category,
    author-> {
      name
    }
  }
`;

export const getRelatedPosts = groq`
  *[
    _type == "post" && 
    category == $category && 
    slug.current != $slug &&
    defined(slug.current) &&
    ${isLive}
  ] | order(publishedAt desc) [0..3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category
  }
`;

// ─── News Queries ─────────────────────────────────────────────

export const getPaginatedNews = groq`
  *[
    _type == "post" && 
    category == "News" &&
    defined(slug.current) &&
    ${isLive}
  ] | order(publishedAt desc) [$start..$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category
  }
`;

export const getNewsCount = groq`
  count(*[
    _type == "post" && 
    category == "News" &&
    defined(slug.current) &&
    ${isLive}
  ])
`;

// ─── Affiliate Products ───────────────────────────────────────

const affiliateProductFields = `
  _id,
  title,
  "slug": slug.current,
  url,
  price,
  brand,
  image {
    asset->{ url },
    alt
  },
  description,
  category,
  rating,
  reviewCount,
  featured,
  ctaText
`;

export const getAffiliateProducts = groq`
  *[
    _type == "affiliateProduct" &&
    defined(slug.current) &&
    (
      $category == "ALL" ||
      category == $category
    )
  ] | order(_createdAt desc) {
    ${affiliateProductFields}
  }
`;

export const getAffiliateProductBySlug = groq`
  *[
    _type == "affiliateProduct" &&
    slug.current == $slug &&
    category == $category
  ][0] {
    ${affiliateProductFields},
    gallery[] {
      asset->{ url },
      alt,
      caption
    },
    keyFeatures,
    specifications[] { label, value },
    benefits,
    pros,
    cons,
    expertReview,
    comparisonProducts[] {
      name,
      price,
      rating,
      highlight,
      url,
      isCurrent
    },
    rawHtml,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, url, metadata { dimensions } }
      }
    },
    faqs[] { question, answer },
    seo {
      metaTitle,
      metaDescription,
      focusKeyword,
      ogImage { asset->{ url } }
    }
  }
`;

export const getAffiliateProductSlugs = groq`
  *[_type == "affiliateProduct" && defined(slug.current)] {
    "slug": slug.current,
    category
  }
`;

export const getRelatedAffiliateProducts = groq`
  *[
    _type == "affiliateProduct" &&
    category == $category &&
    slug.current != $slug &&
    defined(slug.current)
  ] | order(_createdAt desc) [0..3] {
    ${affiliateProductFields}
  }
`;

// ─── Tutorials (see lib/tutorial-queries.ts for full queries) ─

export { getTutorialsByCategory } from "./tutorial-queries";

// ─── Sitemap (for SEO) ────────────────────────────────────────

export const getAllPostSlugs = groq`
  *[_type == "post" && defined(slug.current) && ${isLive}] {
    "slug": slug.current,
    _updatedAt,
    category
  }
`;

// ─── Search Queries ───────────────────────────────────────────

export const searchBlogs = groq`
  *[
    _type == "post" && 
    category != "News" &&
    defined(slug.current) &&
    ${isLive} &&
    (
      title match $query
      || excerpt match $query
      || pt::text(rawHtml) match $query
      || tags[] match $query
      || category match $query
    )
  ] | score(
    boost(title match $query, 3),
    boost(excerpt match $query, 2),
    pt::text(rawHtml) match $query,
    boost(tags[] match $query, 2),
    boost(category match $query, 1)
  ) | order(_score desc) [$start..$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    _score,
    mainImage {
      asset->{
        _id,
        url,
        metadata { dimensions }
      },
      alt
    },
    category,
    tags
  }
`;

export const searchBlogsCount = groq`
  count(*[
    _type == "post" && 
    category != "News" &&
    defined(slug.current) &&
    ${isLive} &&
    (
      title match $query
      || excerpt match $query
      || pt::text(rawHtml) match $query
      || tags[] match $query
      || category match $query
    )
  ])
`;

// ─── News Search Queries ──────────────────────────────────────

export const searchNews = groq`
  *[
    _type == "post" && 
    category == "News" &&
    defined(slug.current) &&
    ${isLive} &&
    (
      title match $query
      || excerpt match $query
      || pt::text(rawHtml) match $query
      || tags[] match $query
    )
  ] | score(
    boost(title match $query, 3),
    boost(excerpt match $query, 2),
    pt::text(rawHtml) match $query,
    boost(tags[] match $query, 2)
  ) | order(_score desc) [$start..$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    _score,
    mainImage {
      asset->{
        _id,
        url,
        metadata { dimensions }
      },
      alt
    },
    category,
    tags
  }
`;

export const searchNewsCount = groq`
  count(*[
    _type == "post" && 
    category == "News" &&
    defined(slug.current) &&
    ${isLive} &&
    (
      title match $query
      || excerpt match $query
      || pt::text(rawHtml) match $query
      || tags[] match $query
    )
  ])
`;
