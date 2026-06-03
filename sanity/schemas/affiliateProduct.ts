export default {
  name: 'affiliateProduct',
  title: 'Affiliate Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Affiliate Link',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (optional)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gear Reviews', value: 'Gear Reviews' },
          { title: 'Training Equipment', value: 'Training Equipment' },
          { title: 'Apparel', value: 'Apparel' },
        ],
      },
    },
  ],
};
