'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { Feature2Block } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Script from 'next/script'

type Props = Feature2Block & {
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // <--- cast to tuple
    },
  },
}

export const Feature2BlockComponent: React.FC<Props> = ({ richText, image, links, className }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={cn('py-24 overflow-hidden bg-background', className)}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid items-center gap-12 md:gap-20 lg:grid-cols-2"
        >
          {/* IMAGE SIDE */}
          <motion.div
            variants={itemVariants}
            className="group relative w-full rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square"
          >
            <Media
              resource={image}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* CONTENT SIDE */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div variants={itemVariants} className="w-full">
              {richText && (
                <RichText
                  data={richText}
                  className="max-w-none 
                    prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mb-6
                    prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed"
                />
              )}
            </motion.div>

            {links && links.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-5 mt-10"
              >
                {links.map((linkItem, i) => (
                  <CMSLink
                    key={i}
                    {...linkItem.link}
                    className={cn(
                      'group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold transition-all duration-300 active:scale-95',
                      linkItem.link.appearance === 'default'
                        ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1'
                        : 'bg-muted/50 border border-border/50 hover:bg-muted',
                    )}
                  >
                    {linkItem.link.appearance === 'default' && (
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </CMSLink>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Featurable Badge Script - Only loads when section is visible */}
      {isVisible && (
        <Script
          src="https://featurable.com/assets/v2/badge_default.min.js"
          strategy="lazyOnload"
          defer
          charSet="UTF-8"
        />
      )}
    </section>
  )
}
