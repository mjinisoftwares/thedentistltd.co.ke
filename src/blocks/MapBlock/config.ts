import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'mapId',
      type: 'text',
      defaultValue: 'bf51a910020fa25a',
      required: true,
    },
    {
      name: 'defaultLat',
      type: 'number',
      defaultValue: 22.54992,
      required: true,
    },
    {
      name: 'defaultLng',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'defaultZoom',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'height',
      type: 'text',
      defaultValue: '500px',
      admin: {
        description: 'CSS height (e.g. 400px, 60vh)',
      },
    },
  ],
}
