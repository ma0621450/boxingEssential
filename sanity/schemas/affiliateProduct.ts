const categoryOptions = [
  { title: "Boxing Gloves", value: "boxing-gloves" },
  { title: "Punching Bags", value: "punching-bags" },
  { title: "Boxing Shoes", value: "boxing-shoes" },
  { title: "Protective Gear", value: "protective-gear" },
  { title: "Home Gym Equipment", value: "home-gym-equipment" },
  { title: "Recovery Equipment", value: "recovery-equipment" },
  { title: "Supplements", value: "supplements" },
  { title: "Best Deals", value: "best-deals" },
];

export default {
  name: "affiliateProduct",
  title: "Affiliate Product",
  type: "document",
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
      name: "url",
      title: "Affiliate Link",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      description: 'e.g. "$89.99"',
    },
    {
      name: "brand",
      title: "Brand",
      type: "string",
    },
    {
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "gallery",
      title: "Product Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief product summary shown above the fold.",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: "reviewCount",
      title: "Review Count",
      type: "number",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Shop Now",
    },
    {
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    },
    {
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "pros",
      title: "Pros",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "cons",
      title: "Cons",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "expertReview",
      title: "Expert Review",
      type: "text",
      rows: 5,
    },
    {
      name: "comparisonProducts",
      title: "Comparison Table",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "rating", title: "Rating", type: "number" },
            { name: "highlight", title: "Key Highlight", type: "string" },
            { name: "url", title: "Affiliate URL", type: "url" },
            { name: "isCurrent", title: "Is Current Product", type: "boolean" },
          ],
        },
      ],
    },
    {
      name: "content",
      title: "SEO Content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }, { type: "htmlEmbed" }],
      description: "800–1200 words of unique SEO content below the product section.",
    },
    {
      name: "rawHtml",
      title: "SEO Content (HTML)",
      type: "text",
      description: "Alternative: raw HTML for the SEO content section.",
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
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
          description: "55–60 characters. e.g. Everlast Elite Pro Boxing Gloves Review 2026 | Features, Pros & Buy Guide",
          validation: (Rule: any) => Rule.max(70),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "150–160 characters.",
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: "focusKeyword",
          title: "Focus Keyword",
          type: "string",
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};
