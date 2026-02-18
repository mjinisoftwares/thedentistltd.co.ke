import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { ServiceCardGrid } from '@/components/ServiceCardGrid'

interface ServiceBlockProps {
  id?: string
  title?: string
  subtitle?: string
  services?: Array<number | { id: number }>
}

export const ServiceBlock: React.FC<ServiceBlockProps> = async (props) => {
  const { id, title, subtitle, services: serviceRelations } = props

  let servicesData: any[] = []

  if (serviceRelations && serviceRelations.length > 0) {
    const payload = await getPayload({ config: configPromise })

    const serviceIds = serviceRelations.map((service) => {
      if (typeof service === 'object') return service.id
      return service
    })

    const fetchedServices = await payload.find({
      collection: 'services',
      depth: 1,
      where: {
        id: {
          in: serviceIds,
        },
      },
    })

    servicesData = fetchedServices.docs
  }

  return (
    <div id={`block-${id}`}>
      <ServiceCardGrid servicesData={servicesData} title={title} subtitle={subtitle} />
    </div>
  )
}
