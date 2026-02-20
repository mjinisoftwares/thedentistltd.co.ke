import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },

    // LEFT IMAGE (from media collection)
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Left Side Image',
    },

    {
      name: 'imageAlt',
      type: 'text',
      label: 'Image Alt Text',
      required: true,
    },

    // RIGHT CONTENT
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },

    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro Content',
    },
  ],
}
