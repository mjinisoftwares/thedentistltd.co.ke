import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'logo', 'website', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Company Logo',
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      label: 'Website URL',
      validate: (val: string | null | undefined) => {
        if (!val) return 'Please enter a valid URL'
        try {
          new URL(val)
          return true
        } catch {
          return 'Please enter a valid URL'
        }
      },
    },
  ],
}
