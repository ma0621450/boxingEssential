/**
 * @deprecated Use lib/tutorial-queries.ts — tutorials replaced the legacy video type.
 */
export {
  getAllTutorialSlugs as getAllVideos,
  getTutorialBySlug as getVideoBySlugQuery,
  getTutorialsByCategory as getVideosByCategoryQuery,
  getRelatedTutorials as getRelatedVideosQuery,
} from "./tutorial-queries";
