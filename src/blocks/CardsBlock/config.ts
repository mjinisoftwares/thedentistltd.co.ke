import type { Block } from 'payload'
import { link } from '@/fields/link'

export const CardBlock: Block = {
  slug: 'cardBlock',
  interfaceName: 'CardBlock',
  labels: {
    singular: 'Card Carousel',
    plural: 'Card Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Gallery',
    },
    {
      name: 'demoLink',
      type: 'group',
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'shadow',
      options: [
        { label: 'Shadow', value: 'shadow' },
        { label: 'Outline', value: 'outline' },
        { label: 'Glassmorphism', value: 'glass' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
