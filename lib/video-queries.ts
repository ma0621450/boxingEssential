import { groq } from "next-sanity";

export const getAllVideos = groq`
  *[_type == "video"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "category": category->slug.current,
    "thumbnail": thumbnail.asset->url,
    duration,
    views,
    "date": _createdAt,
    "youtubeUrl": youtubeUrl
  }
`;

export const getVideoBySlugQuery = groq`
  *[_type == "video" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "category": category->slug.current,
    "thumbnail": thumbnail.asset->url,
    duration,
    views,
    "date": _createdAt,
    "youtubeUrl": youtubeUrl
  }
`;

export const getVideosByCategoryQuery = groq`
  *[_type == "video" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "category": category->slug.current,
    "thumbnail": thumbnail.asset->url,
    duration,
    views,
    "date": _createdAt
  }
`;

export const getRelatedVideosQuery = groq`
  *[_type == "video" && category->slug.current == $category && slug.current != $slug] | order(_createdAt desc) [0..3] {
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    duration,
    views
  }
`;