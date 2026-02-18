import type { Block } from 'payload'

export const FAQsBlock: Block = {
  slug: 'faqsBlock',
  interfaceName: 'FAQsBlock',
  labels: {
    singular: 'FAQs Section',
    plural: 'FAQs Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'subtext',
      type: 'textarea',
      required: false,
      defaultValue: "Can't find what you're looking for? Contact our customer support team.",
    },
    {
      name: 'faqItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Clock', value: 'clock' },
            { label: 'Credit Card', value: 'credit-card' },
            { label: 'Truck', value: 'truck' },
            { label: 'Globe', value: 'globe' },
            { label: 'Package', value: 'package' },
            { label: 'User', value: 'user' },
            { label: 'Zap', value: 'zap' },
          ],
        },
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
