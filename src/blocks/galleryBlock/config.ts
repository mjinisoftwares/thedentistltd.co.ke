import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const galleryItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'summary',
    type: 'richText',
    required: true,
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
  },
  link({
    overrides: {
      admin: {
        description: 'Optional link for "Read more"',
      },
    },
  }),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media', // single image
    required: true,
  },
]

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Gallery',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: galleryItemFields,
    },
  ],
}
