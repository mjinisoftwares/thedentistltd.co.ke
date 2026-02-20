'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import type { AboutBlock as AboutBlockProps, Media } from '@/payload-types'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

type Props = AboutBlockProps & {
  className?: string
}

const getMediaInfo = (media: number | Media | undefined | null) => {
  if (media && typeof media === 'object') {
    return {
      url: media.url || '',
      width: media.width || 800,
      height: media.height || 600,
    }
  }
  return { url: '', width: 800, height: 600 }
}

export const AboutBlockComponent: React.FC<Props> = ({
  className,
  title,
  description,
  mainImage,
  secondaryImage,
  breakout,
  companiesTitle,
  companies,
  achievementsTitle,
  achievementsDescription,
  achievements,
}) => {
  const mainImg = getMediaInfo(mainImage?.image)
  const secImg = getMediaInfo(secondaryImage?.image)
  const breakoutImg = getMediaInfo(breakout?.image)

  return (
    <section className={cn('py-16 md:py-32', className)}>
      <div className="container">
        <div className="mb-14 grid gap-8 text-center md:grid-cols-2 md:text-left">
          <h2 className="text-4xl font-bold md:text-5xl tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto">
            {mainImg.url && (
              <Image
                src={mainImg.url}
                alt={mainImage?.alt || 'Main about image'}
                width={mainImg.width}
                height={mainImg.height}
                className="h-full w-full rounded-2xl object-cover shadow-lg"
              />
            )}
          </div>

          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-muted p-8 md:w-1/2 lg:w-auto border border-border/50">
              {breakoutImg.url && (
                <div className="relative h-12 w-fit">
                  <Image
                    src={breakoutImg.url}
                    alt={breakout?.alt || ''}
                    width={breakoutImg.width}
                    height={breakoutImg.height}
                    className="h-full w-auto object-contain dark:invert"
                  />
                </div>
              )}

              <div>
                <p className="mb-2 text-xl font-bold">{breakout?.title}</p>
                <p className="text-muted-foreground leading-snug">{breakout?.description}</p>
              </div>

              {breakout?.buttonText && breakout?.buttonUrl && (
                <Button variant="outline" className="mr-auto rounded-full" asChild>
                  <a href={breakout.buttonUrl} target="_blank" rel="noopener noreferrer">
                    {breakout.buttonText}
                  </a>
                </Button>
              )}
            </div>

            <div className="relative grow basis-0 md:w-1/2 lg:w-auto aspect-[4/3] lg:aspect-auto">
              {secImg.url && (
                <Image
                  src={secImg.url}
                  alt={secondaryImage?.alt || 'Secondary image'}
                  width={secImg.width}
                  height={secImg.height}
                  className="h-full w-full rounded-2xl object-cover shadow-md"
                />
              )}
            </div>
          </div>
        </div>

        {companies && companies.length > 0 && (
          <div className="py-24 border-b border-border/50">
            {companiesTitle && (
              <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground mb-12">
                {companiesTitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {companies.map((company, idx) => {
                const logo = getMediaInfo(company.logo)
                return (
                  <div key={idx} className="flex items-center">
                    {logo.url && (
                      <Image
                        src={logo.url}
                        alt={company.alt || 'Company logo'}
                        width={logo.width}
                        height={logo.height}
                        className="h-8 w-auto md:h-10 object-contain dark:invert"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-24 relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-20">
          {/* background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-96 rounded-full bg-white blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-3xl font-bold md:text-5xl">{achievementsTitle}</h2>
            <p className="max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
              {achievementsDescription}
            </p>
          </div>

          <div className="relative z-10 mt-16 grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
            {achievements?.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <span className="text-5xl font-black md:text-7xl tracking-tighter transition-transform group-hover:scale-105 duration-300">
                  {item.value}
                </span>
                <p className="text-base md:text-lg font-medium text-primary-foreground/70 uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
