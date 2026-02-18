'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <section className="relative my-24">
      {/* subtle background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-4 gap-y-10 gap-x-8 lg:grid-cols-12 lg:gap-x-12">
          {columns?.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <motion.div
                key={index}
                custom={index}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  size !== 'full' && 'md:col-span-2',
                )}
              >
                {/* card wrapper */}
                <div className="group relative h-full rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* glow hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
                  </div>

                  <div className="relative z-10 space-y-5">
                    {richText && (
                      <div className="prose prose-neutral max-w-none dark:prose-invert">
                        <RichText data={richText} enableGutter={false} />
                      </div>
                    )}

                    {enableLink && link && (
                      <div className="pt-2">
                        <CMSLink
                          {...link}
                          className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
