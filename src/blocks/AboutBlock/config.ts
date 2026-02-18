import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About',
    plural: 'About Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },

    // ---------- main image ----------
    {
      name: 'mainImage',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text', required: true },
      ],
    },

    {
      name: 'secondaryImage',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text', required: true },
      ],
    },

    // ---------- breakout ----------
    {
      name: 'breakout',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'alt', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },

    // ---------- companies ----------
    {
      name: 'companiesTitle',
      type: 'text',
    },
    {
      name: 'companies',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text', required: true },
      ],
    },

    // ---------- achievements ----------
    {
      name: 'achievementsTitle',
      type: 'text',
    },
    {
      name: 'achievementsDescription',
      type: 'textarea',
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
