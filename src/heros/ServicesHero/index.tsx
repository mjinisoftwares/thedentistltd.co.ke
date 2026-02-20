'use client'

import React from 'react'
import { format } from 'date-fns'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { Service } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/utils'

interface ServiceHeroProps {
  service: Service
  className?: string
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service, className }) => {
  const { hero, title, summary, updatedAt, icon } = service
  const { heroImage, heroImageMobile, heroTitle, heroSubtitle } = hero || {}

  return (
    <section className={cn('mt-32 mb-8', className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          {/* Title */}
          <h1 className="mt-12 max-w-3xl text-5xl font-semibold text-pretty ">
            {heroTitle || title}
          </h1>

          {/* Subtitle / Summary */}
          <h3 className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {heroSubtitle || summary}
          </h3>

          {/* Meta Row */}
          <div className="flex items-center gap-3 text-sm md:text-base">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback>{icon?.charAt(0) || 'S'}</AvatarFallback>
            </Avatar>

            <span className="flex items-center gap-2">
              {icon && <DynamicIcon name={icon as IconName} className="h-4 w-4 text-primary" />}
              <span className="font-semibold">The Dentist LTD</span>
              <span className="ml-1 text-muted-foreground">
                • Updated {format(new Date(updatedAt), 'MMMM d, yyyy')}
              </span>
            </span>
          </div>

          {/* Hero Image */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
              <Media
                priority
                imgClassName="w-full h-full object-cover"
                resource={heroImageMobile ?? heroImage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
