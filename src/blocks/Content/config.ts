import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },

  {
    name: 'enableImage',
    type: 'checkbox',
    label: 'Add Image?',
  },

  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableImage),
    },
  },

  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures, defaultFeatures }) => [
        ...rootFeatures,
        ...defaultFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        LinkFeature(),
      ],
    }),
    label: false,
  },

  {
    name: 'enableLink',
    type: 'checkbox',
  },

  link({
    overrides: {
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'soft',
      options: [
        { label: 'No Card (Plain)', value: 'none' },
        { label: 'Soft Background', value: 'soft' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Elevated (Shadow)', value: 'elevated' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
