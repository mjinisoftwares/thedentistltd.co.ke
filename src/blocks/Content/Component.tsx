'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  sectionTitle,
  sectionSubtitle,
  cardStyle = 'soft',
  columns,
}) => {
  const colsSpanClasses: Record<string, string> = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const cardStyles: Record<string, string> = {
    none: '',
    soft: 'bg-muted/40 backdrop-blur-sm',
    bordered: 'border bg-background',
    elevated: 'border bg-background shadow-lg hover:shadow-xl',
  }

  return (
    <section className="relative py-28">
      <div className="container">
        {/* Section Header */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            {sectionTitle && (
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{sectionTitle}</h2>
            )}
            {sectionSubtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{sectionSubtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {columns?.map((col, index) => {
            const { size, richText, enableLink, link, enableImage, image } = col
            const safeSize = size || 'oneThird'
            const safeCardStyle = cardStyle || 'soft'

            return (
              <motion.div
                key={index}
                custom={index}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={cn('col-span-1', colsSpanClasses[safeSize])}
              >
                <div
                  className={cn(
                    'group h-full rounded-2xl p-6 transition-all duration-300',
                    cardStyles[safeCardStyle],
                    safeCardStyle !== 'none' && 'hover:-translate-y-1',
                  )}
                >
                  {/* Optional Image */}
                  {enableImage && image && (
                    <div className="mb-6 overflow-hidden rounded-xl">
                      <Media
                        resource={image}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Rich Text */}
                  {richText && (
                    <div className="prose max-w-none dark:prose-invert">
                      <RichText data={richText} enableGutter={false} />
                    </div>
                  )}

                  {/* Optional Link */}
                  {enableLink && link && (
                    <div className="mt-6">
                      <CMSLink
                        {...link}
                        className="text-sm font-medium text-primary transition hover:underline"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
