import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'highImpact',
      required: true,
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type === 'lowImpact',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures, defaultFeatures }) => [
          ...rootFeatures,
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },

    // ✅ Carousel slides
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'richText',
          type: 'richText',
          label: false,
          editor: lexicalEditor({
            features: ({ rootFeatures, defaultFeatures }) => [
              ...rootFeatures,
              ...defaultFeatures,
              HeadingFeature({
                enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
              }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },

        linkGroup({
          overrides: { maxRows: 2 },
        }),

        {
          name: 'desktop',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Desktop Image',
        },

        {
          name: 'mobile',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Mobile Image',
        },
      ],
    },
  ],
}
