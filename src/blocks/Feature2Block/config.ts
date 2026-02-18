import { linkGroup } from '@/fields/linkGroup'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const Feature2: Block = {
  slug: 'feature2',
  interfaceName: 'Feature2Block',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    linkGroup({
      overrides: { maxRows: 2 },
    }),
  ],
}
