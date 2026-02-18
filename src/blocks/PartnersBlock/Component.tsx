import type { Media } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PartnersSlider } from '@/components/PartnersInfiniteSlider'

interface PartnersBlockProps {
  id?: string
  partners?: Array<number | { id: number }>
  title?: string
  subtitle?: string
  speed?: number
  direction?: 'left' | 'right'
}

export const PartnersBlock: React.FC<PartnersBlockProps> = async (props) => {
  const { id, partners: partnerRelations, title, subtitle, speed, direction } = props

  let partners: Array<{
    id: string
    name: string
    logo: {
      url: string
      alt?: string
    }
    website: string
  }> = []

  if (partnerRelations && partnerRelations.length > 0) {
    const payload = await getPayload({ config: configPromise })

    // Fetch the actual partner documents
    const partnerIds = partnerRelations.map((partner) => {
      if (typeof partner === 'object') return partner.id
      else return partner
    })

    const fetchedPartners = await payload.find({
      collection: 'partners',
      depth: 2,
      where: {
        id: {
          in: partnerIds,
        },
      },
    })

    // Transform the data to match the PartnersSlider interface
    partners = fetchedPartners.docs.map((partner: any) => ({
      id: partner.id.toString(),
      name: partner.name,
      logo: {
        url: (partner.logo as Media)?.url || '',
        alt: (partner.logo as Media)?.alt || partner.name,
      },
      website: partner.website,
    }))
  }

  return (
    <div className="my-12 " id={`block-${id}`}>
      <PartnersSlider
        partners={partners}
        title={title}
        subtitle={subtitle}
        speed={speed}
        direction={direction}
      />
    </div>
  )
}
