import { ThListIcon } from '@sanity/icons'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: ThListIcon,
  fields: [
    {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Name of the product',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
        title: 'Prices',
        name: 'prices',
        type: 'array',
        of: [{type: 'number'}],
        description: 'Small Price, Medium Price, Large OR Default Price',
        validation: Rule => Rule.max(3)
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended: Compressed JPEG images',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
}
