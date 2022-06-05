import { ArchiveIcon } from '@sanity/icons'

export default {
  name: 'group',
  title: 'Group',
  type: 'document',
  icon: ArchiveIcon,
  fields: [
    
    {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Name of the group',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Order to appear on page (0 is the most priority)',
      validation: Rule => Rule.min(0)
    },
    {
        title: 'Available Sizes',
        name: 'sizes',
        type: 'array',
        of: [{type: 'string'}],
        description: 'Different prices for different sizes (S, M, L)',
        validation: Rule => Rule.custom(arr => {
          return arr.filter(x=>x.trim().length > 2).length === 0 ? true : 'No more than 2 characters allowed for an element';
        })
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'product' }
          ]
        }
      ],
      validation: Rule => Rule.unique()
    }
  ],
  preview: {
    select: {
        title: 'title',
        sub: 'products.length',
        prior: 'priority'
      },
      prepare(selection) {
        return {
          title: selection.title,
          subtitle: `Total Items: ${selection.sub} | Priority: ${selection.prior}`
        }
      },
  },
}
