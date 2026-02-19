'use client'

import React from 'react'
import Image from 'next/image'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { toKebabCase } from '@/utilities/toKebabCase'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

export const FeaturesBlockComponent: React.FC<FeaturesBlockProps> = ({
  title,
  description,
  featuresList,
  image,
}) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-primary-10 to-secondary/20 border-t border-b">
      <div className="container mx-auto ">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-24">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              {title && <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h2>}
              {description && (
                <p className="mt-4 text-base text-muted-foreground ">{description}</p>
              )}
            </div>
            <ul className="mt-6 divide-y border-y border-border">
              {featuresList?.map((feature, index) => (
                <li key={index} className="flex items-center gap-4 py-2 group">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <DynamicIcon
                      name={toKebabCase(feature.icon || 'Mail') as IconName}
                      className="size-5"
                    />
                  </div>
                  <span className="text-base font-medium text-foreground">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="relative lg:col-span-3">
            <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] overflow-hidden rounded-3xl border border-border/50 bg-muted p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {image && typeof image === 'object' && image.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || 'features illustration'}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    priority
                  />
                )}
              </div>
              {/* Optional: Add a subtle glow or decoration */}
              <div className="absolute -bottom-6 -right-6 -z-10 size-64 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
