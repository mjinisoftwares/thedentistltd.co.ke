'use client'

import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const CallToAction: React.FC<CTABlockProps> = ({ richText, links }) => {
  return (
    <section className="relative py-24">
      <div className="container">
        <div
          className={cn(
            'mx-auto max-w-4xl rounded-3xl border bg-gradient-to-br from-primary/5 via-primary-20 to-secondary/30 px-8 py-16 text-center shadow-sm',
            'md:px-16 md:py-20',
          )}
        >
          {/* Content */}
          {richText && (
            <div className="mx-auto max-w-2xl prose dark:prose-invert">
              <RichText
                data={richText}
                enableGutter={false}
                className={cn(
                  'prose-headings:font-semibold',
                  'prose-h1:text-4xl md:prose-h1:text-5xl',
                  'prose-h2:text-3xl md:prose-h2:text-4xl',
                  'prose-p:text-muted-foreground prose-p:text-base md:prose-p:text-lg',
                )}
              />
            </div>
          )}

          {/* Buttons */}
          {links && links.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {links.map((link, i) => (
                <CMSLink key={i} {...link} size="lg" className="min-w-[160px]" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
