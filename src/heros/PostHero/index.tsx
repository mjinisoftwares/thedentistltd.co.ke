'use client'

import React from 'react'
import { format } from 'date-fns'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const authorsToUse = (populatedAuthors || []).filter(
    (author): author is NonNullable<NonNullable<Post['populatedAuthors']>[number]> =>
      typeof author === 'object' && author !== null,
  )

  const authorsString = formatAuthors(authorsToUse) || ''
  const hasAuthors = authorsString.length > 0

  return (
    <section className={cn('mt-32 mb-8')}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {category.title}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-pretty md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Meta Row */}
          <div className="flex items-center gap-3 text-sm md:text-base">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback>{hasAuthors ? authorsString.charAt(0) : 'D'}</AvatarFallback>
            </Avatar>

            <span className="flex items-center gap-2">
              <span className="font-semibold">
                {hasAuthors ? authorsString : 'The Dentist LTD'}
              </span>
              {publishedAt && (
                <span className="ml-1 text-muted-foreground">
                  • Published {format(new Date(publishedAt), 'MMMM d, yyyy')}
                </span>
              )}
            </span>
          </div>

          {/* Hero Image */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg border">
              <Media priority imgClassName="w-full h-full object-cover" resource={heroImage} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
