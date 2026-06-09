import { groq } from "next-sanity";

const tutorialFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  lessonOrder,
  youtubeUrl,
  thumbnail {
    asset->{ url },
    alt
  },
  duration,
  views,
  publishedAt,
  featured,
  seo {
    metaTitle,
    metaDescription,
    ogImage { asset->{ url } }
  }
`;

export const getAllTutorialSlugs = groq`
  *[_type == "tutorial" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const getTutorialBySlug = groq`
  *[_type == "tutorial" && slug.current == $slug][0] {
    ${tutorialFields}
  }
`;

export const getTutorialsByCategory = groq`
  *[
    _type == "tutorial" &&
    category == $category &&
    defined(slug.current)
  ] | order(lessonOrder asc, publishedAt asc) {
    ${tutorialFields}
  }
`;

export const getRelatedTutorials = groq`
  *[
    _type == "tutorial" &&
    category == $category &&
    slug.current != $slug &&
    defined(slug.current)
  ] | order(lessonOrder asc) [0..3] {
    ${tutorialFields}
  }
`;
