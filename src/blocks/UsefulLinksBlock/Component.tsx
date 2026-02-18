'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import type {
  Page,
  UsefulLink,
  UsefulLinksBlock as UsefulLinksBlockProps,
} from '../../payload-types'
import { cn } from '@/utilities/ui'

export const UsefulLinksBlockComponent: React.FC<UsefulLinksBlockProps> = ({
  title,
  description,
  limit = 8,
  layout = 'list',
}) => {
  const [links, setLinks] = useState<UsefulLink[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/useful-links?limit=${limit}&sort=order&depth=1`)
        const data = await res.json()
        setLinks(data.docs || [])
      } catch (error) {
        console.error('Failed to fetch useful links:', error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [limit])

  if (!isLoading && links.length === 0 && !title && !description) return null

  const isGrid = layout === 'grid'

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        {(title || description) && (
          <div className="mb-12 max-w-2xl">
            {title && <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>}
            {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        <div
          className={cn(
            'grid gap-4',
            isGrid ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1',
          )}
        >
          {isLoading
            ? Array.from({ length: limit || 4 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-muted/50" />
              ))
            : links.map((link) => {
                const page = typeof link.page === 'object' ? (link.page as Page) : null
                const href = link.type === 'internal' ? `/${page?.slug || ''}` : link.url || '#'
                const isInternal = link.type === 'internal'

                const content = (
                  <div className="flex h-full items-center justify-between p-5">
                    <span className="font-medium">{link.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                )

                const className = cn(
                  'group block rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-md',
                  !isGrid && 'max-w-2xl',
                )

                if (isInternal) {
                  return (
                    <Link key={link.id} href={href} className={className}>
                      {content}
                    </Link>
                  )
                }

                return (
                  <a
                    key={link.id}
                    href={href}
                    target={link.newTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                )
              })}
        </div>
      </div>
    </section>
  )
}
