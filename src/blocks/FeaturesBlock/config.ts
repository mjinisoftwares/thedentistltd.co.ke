import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'featuresBlock',
  interfaceName: 'FeaturesBlock',
  labels: {
    singular: 'Features Section',
    plural: 'Features Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Built for Scaling Teams',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Orrupti aut temporibus assumenda atque ab, accusamus sit, molestiae veniam laboriosam pariatur.',
    },
    {
      name: 'featuresList',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text', // free text to match any Lucide icon name
          required: true,
          defaultValue: 'Mail',
          admin: {
            description: 'Enter any Lucide icon name, e.g., Mail, Zap, User',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
