import { ThumbnailPreviewInput } from "../components/ThumbnailPreviewInput";
import { YoutubeUrlInput } from "../components/YoutubeUrlInput";

const categoryOptions = [
  { title: "Gym Training", value: "gym" },
  { title: "Boxing Training", value: "boxing" },
  { title: "Fitness Training", value: "fitness" },
];

export default {
  name: "tutorial",
  title: "Training Tutorial",
  type: "document",
  orderings: [
    {
      title: "Lesson Order",
      name: "lessonOrderAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "lessonOrder", direction: "asc" },
      ],
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "lessonOrder",
      title: "Lesson Number",
      type: "number",
      description:
        "Sequence within the category (Lesson 1, 2, 3…). Tutorials are sorted by this number on the site.",
      validation: (Rule: any) => Rule.required().min(1).integer(),
      initialValue: 1,
    },
    {
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      validation: (Rule: any) => Rule.required(),
      components: { input: YoutubeUrlInput },
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      readOnly: true,
      description:
        "Required. Auto-filled from the YouTube URL when you paste or change the video link.",
      options: { hotspot: true },
      components: { input: ThumbnailPreviewInput },
      fields: [{ name: "alt", type: "string", title: "Alt text", readOnly: true }],
      validation: (Rule: any) =>
        Rule.required().error(
          "Add a YouTube URL above and wait for the thumbnail to load."
        ),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      readOnly: true,
      description:
        "Auto-filled from the YouTube URL. Updates when you paste or change the video link.",
    },
    {
      name: "views",
      title: "Views Label",
      type: "string",
      description: 'Display label, e.g. "15.2K"',
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "featured",
      title: "Featured in Category",
      type: "boolean",
      description: "Show as the hero lesson on the training category page.",
      initialValue: false,
    },
    {
      name: "description",
      title: "Lesson Objectives",
      type: "text",
      rows: 5,
      description: "Training objectives and outline shown on the lesson page.",
    },
    {
      name: "seo",
      title: "SEO & Social",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "e.g. Footwork Drills Lesson 3 | Boxing Training | Boxing Essential",
          validation: (Rule: any) => Rule.max(70),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Defaults to the lesson thumbnail if empty.",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      lessonOrder: "lessonOrder",
      media: "thumbnail",
    },
    prepare({ title, category, lessonOrder }: any) {
      const categoryLabel =
        categoryOptions.find((c) => c.value === category)?.title ?? category;
      return {
        title,
        subtitle: `Lesson ${lessonOrder ?? "?"} · ${categoryLabel}`,
      };
    },
  },
};
