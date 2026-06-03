import { groq } from 'next-sanity';

// ─── Blog Queries (excludes News) ────────────────────────────

export const getPaginatedBlogs = groq`
  *[
    _type == "post" && 
    category != "News" && 
    defined(slug.current) &&
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
    (
      $category == "ALL" || 
      category == $category
    )
  ])
`;

// ─── Single Post by Slug ──────────────────────────────────────

export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0] {
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

export const getRelatedPosts = groq`
  *[
    _type == "post" && 
    category == $category && 
    slug.current != $slug &&
    defined(slug.current)
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
    defined(slug.current)
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
    defined(slug.current)
  ])
`;

// ─── Affiliate Products ───────────────────────────────────────

export const getAffiliateProducts = groq`
  *[
    _type == "affiliateProduct" &&
    (
      $category == "ALL" || 
      category == $category
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    url,
    price,
    image {
      asset->{ url }
    },
    description,
    category
  }
`;

// ─── Tutorials ────────────────────────────────────────────────

export const getTutorialsByCategory = groq`
  *[
    _type == "tutorial" && 
    category == $category
  ] | order(_createdAt desc) {
    _id,
    title,
    youtubeUrl,
    category,
    description
  }
`;

// ─── Sitemap (for SEO) ────────────────────────────────────────

export const getAllPostSlugs = groq`
  *[_type == "post" && defined(slug.current)] {
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
    (
      title match $query
      || excerpt match $query
      || pt::text(rawHtml) match $query
      || tags[] match $query
    )
  ])
`;