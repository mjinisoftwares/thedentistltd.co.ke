import type { Block } from 'payload'

export const UsefulLinksBlock: Block = {
  slug: 'usefulLinksBlock',
  interfaceName: 'UsefulLinksBlock',
  labels: {
    singular: 'Useful Links Block',
    plural: 'Useful Links Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Useful Links',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
    },

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'list',
      options: [
        { label: 'List', value: 'list' },
        { label: 'Grid', value: 'grid' },
      ],
    },
  ],
}
