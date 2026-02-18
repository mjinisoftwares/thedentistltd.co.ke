import React from 'react'
import type { Service } from '@/payload-types'
import { Media } from '@/components/Media'

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const { hero, title } = service
  const { heroImage, heroImageMobile, heroTitle, heroSubtitle } = hero || {}

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center items-start overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            priority
            imgClassName="hidden md:block object-cover w-full h-full"
            resource={heroImage}
          />
        )}
        {heroImageMobile && typeof heroImageMobile !== 'string' ? (
          <Media
            priority
            imgClassName="block md:hidden object-cover w-full h-full"
            resource={heroImageMobile}
          />
        ) : (
          heroImage &&
          typeof heroImage !== 'string' && (
            <Media
              priority
              imgClassName="block md:hidden object-cover w-full h-full"
              resource={heroImage}
            />
          )
        )}
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 px-6 md:px-12">
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl mb-6">
            {heroTitle || title}
          </h1>

          {heroSubtitle && (
            <p className="max-w-2xl text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8 border-l-4 border-primary pl-6">
              {heroSubtitle}
            </p>
          )}

          {/* If there was no heroTitle, we might still want to show the collection title if it's different */}
          {heroTitle && heroTitle !== title && (
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-sm font-medium tracking-wide border border-white/20 uppercase">
              {title}
            </span>
          )}
        </div>
      </div>

      {/* Visual Decor */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
