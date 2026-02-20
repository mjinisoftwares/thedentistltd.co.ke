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
      name: 'selectMethod',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'Show All (Dynamic)', value: 'all' },
        { label: 'Manual Selection', value: 'manual' },
      ],
    },

    {
      name: 'links',
      type: 'relationship',
      relationTo: 'useful-links',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.selectMethod === 'manual',
      },
    },

    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      admin: {
        condition: (_, siblingData) => siblingData.selectMethod === 'all',
      },
    },

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
  ],
}
