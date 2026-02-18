import type { CollectionConfig } from 'payload'

export const UsefulLinks: CollectionConfig = {
  slug: 'useful-links',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Internal Page', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
    },

    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'internal',
      },
    },

    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'external',
      },
    },

    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}
