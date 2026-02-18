import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {},
  admin: {
    defaultColumns: ['name', 'position', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    //Socials facebook, Insta and Linked
    {
      name: 'facebook',
      type: 'text',
    },
    {
      name: 'instagram',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },

    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}
