import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  labels: {
    singular: 'Team Block',
    plural: 'Team Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Team',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our dream team',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'During the working process, we perform regular fitting with the client because he is the only person who can feel whether a new suit fits or not.',
      required: true,
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      required: true,
      label: 'Select Team Members',
    },
  ],
}
