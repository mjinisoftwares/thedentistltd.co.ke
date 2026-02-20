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
    <section className="relative py-28 border-t border-border">
      <div className="container">
        {/* Section Header */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="mx-auto mb-6 max-w-3xl text-center">
            {sectionTitle && (
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{sectionTitle}</h2>
            )}
            {sectionSubtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{sectionSubtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
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
                    'group h-full rounded-xl transition-all duration-300',
                    cardStyles[safeCardStyle],
                    safeCardStyle !== 'none' && 'hover:-translate-y-1',
                  )}
                >
                  {/* Optional Image */}
                  {enableImage && image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <Media
                        resource={image}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Rich Text */}
                  {richText && (
                    <div className="prose max-w-none dark:prose-invert">
                      <RichText
                        data={richText}
                        enableGutter={false}
                        className={cn(
                          'prose-h1:font-bold prose-h1:text-2xl md:prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-0',
                          'prose-h2:font-bold prose-h2:text-2xl prose-h2:text-foreground mb-0',
                          'prose-h3:font-medium prose-h3:text-xl prose-h3:text-primary prose-h3:mt-2',
                          'prose-p:max-w-xl prose-p:text-muted-foreground prose-p:text-sm md:prose-p:text-base',
                        )}
                      />
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
