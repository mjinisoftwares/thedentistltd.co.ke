'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/utils'

export const HighImpactHero: React.FC<Page['hero']> = ({ slides }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  // Simple auto rotate - 10 seconds for better readability
  useEffect(() => {
    if (!slides?.length) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 10000)
    return () => clearInterval(id)
  }, [slides])

  if (!slides?.length) return null

  const slide = slides[index]
  const primaryLink = slide.links?.[0]?.link
  const secondaryLink = slide.links?.[1]?.link

  const desktopMedia = slide.desktop
  const mobileMedia = slide.mobile ?? slide.desktop

  // Simple, performant fade transition
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  // Simple slide-up for text
  const textVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  }

  return (
    <section className="relative overflow-hidden border-b ">
      {/* Static gradient for better performance (no animations) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary-20 to-secondary/30 z-0" />

      {/* Main container */}
      <div className="h-screen md:max-h-screen py-8 md:py-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="grid gap-4  md:gap-8 lg:grid-cols-2 items-center h-full"
          >
            {/* ================= TEXT ================= */}
            <motion.div
              variants={textVariants}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="items-center md:mt-[-10%]"
            >
              <Link
                href="#link"
                className="bg-primary/5 mb-8 bg-muted flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md"
              >
                <span className="text-sm text-foreground">Quality & Compassionate Dental Care</span>
                <div className="bg-background size-6 rounded-full">
                  <ArrowRight className="m-auto mt-1.3 size-3" />
                </div>
              </Link>

              {slide.richText && (
                <RichText
                  data={slide.richText}
                  enableGutter={false}
                  className={cn(
                    'max-w-none',
                    'prose-h1:font-bold prose-h1:text-2xl md:prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-0',
                    'prose-h2:font-normal prose-h2:text-base md:prose-h2:text-xl prose-h2:text-primary prose-h2:mt-4',
                    'prose-p:max-w-xl prose-p:text-muted-foreground prose-p:text-sm md:prose-p:text-base',
                  )}
                />
              )}

              {(primaryLink || secondaryLink) && (
                <motion.div
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                  {primaryLink && (
                    <CMSLink
                      {...primaryLink}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold"
                    >
                      <ArrowRight size={20} />
                    </CMSLink>
                  )}

                  {secondaryLink && (
                    <CMSLink
                      {...secondaryLink}
                      className="outline inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold"
                    >
                      <Phone size={20} />
                    </CMSLink>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* ================= IMAGE ================= */}
            <motion.div
              variants={fadeVariants}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="relative h-90 lg:h-screen rounded-lg lg:rounded-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 z-0" />

              {/* Desktop */}
              {desktopMedia && (
                <div className="hidden md:block h-screen relative">
                  <Media
                    resource={desktopMedia}
                    fill
                    priority
                    imgClassName="object-cover border-2 border-primary/70"
                  />
                </div>
              )}

              {/* Mobile */}
              {mobileMedia && (
                <div className="block md:hidden h-full relative">
                  <Media
                    resource={mobileMedia}
                    fill
                    priority
                    imgClassName="object-cover rounded-2xl border-2 border-primary/70"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
