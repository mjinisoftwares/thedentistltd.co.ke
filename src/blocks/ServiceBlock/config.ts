import type { Block } from 'payload'

export const ServiceBlock: Block = {
  slug: 'serviceBlock',
  interfaceName: 'ServiceBlock',
  labels: {
    singular: 'Service Section',
    plural: 'Service Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Complete Dental Services',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
      defaultValue: 'From general dentistry to advanced cosmetic procedures',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      label: 'Select Services',
    },
  ],
}
