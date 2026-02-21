'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

import type { Post, Service } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData =
  | (Pick<Post, 'slug' | 'categories' | 'meta' | 'title'> & { relationTo?: 'posts' })
  | (Pick<Service, 'slug' | 'meta' | 'title'> & { relationTo?: 'services'; categories?: never })

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'services'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo: relationToFromProps,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title, relationTo: relationToFromDoc } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const relationTo = relationToFromProps || relationToFromDoc || 'posts'
  const href = `/${relationTo}/${slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative flex flex-col h-full border border-border rounded-2xl overflow-hidden bg-card hover:cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2',
        className,
      )}
      ref={card.ref}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        {!metaImage && (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground italic">
            No image available
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            fill
            imgClassName="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        )}

        {/* Category Badge */}
        {showCategories && hasCategories && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                return (
                  <span
                    key={index}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-md rounded-full border border-white/20 text-foreground"
                  >
                    {titleFromCategory}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          {titleToUse && (
            <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          )}

          {description && (
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
              {sanitizedDescription}
            </p>
          )}
        </div>

        {/* Footer/Button */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50 group/btn">
          <span className="text-sm font-semibold flex items-center gap-2 group-hover/btn:text-primary transition-colors duration-300">
            Learn More
            <ArrowRight
              size={16}
              className="transform transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </span>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
