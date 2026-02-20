import React from 'react'
import type { Service } from '@/payload-types'
import { Media } from '@/components/Media'

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const { hero, title } = service
  const { heroImage, heroImageMobile, heroTitle, heroSubtitle } = hero || {}

  return (
    <section className="w-full py-16 md:py-24 ">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Hero Image */}
          <div className="mt-8 relative h-[60vh] md:h-[80vh] w-full">
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
                  imgClassName="block md:hidden object-cover w-full h-auto"
                  resource={heroImage}
                />
              )
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mt-24 md:mt-12 px-6 md:px-16 max-w-4xl">
              <h1 className="  text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                {heroTitle || title}
              </h1>

              {heroSubtitle && (
                <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
