import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },

    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        // ✅ numeric value for counter animation
        {
          name: 'number',
          type: 'number',
          required: true,
          label: 'Number to Count',
        },

        // ✅ optional suffix like + % K M etc
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix (optional)',
          admin: {
            placeholder: '+  %  K  M',
          },
        },

        // ✅ description text
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
      ],
    },

    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Accent', value: 'accent' },
      ],
      required: true,
    },

    // ✅ optional animation controls (pro level)
    {
      name: 'animationDuration',
      type: 'number',
      defaultValue: 1.6,
      admin: {
        step: 0.1,
      },
    },
  ],
}
