import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type {
  Page,
  UsefulLink,
  UsefulLinksBlock as UsefulLinksBlockProps,
} from '../../payload-types'
import { cn } from '@/utilities/ui'
import { ChevronRight, ExternalLink } from 'lucide-react'

export const UsefulLinksBlockComponent: React.FC<UsefulLinksBlockProps> = async ({
  title,
  description,
  selectMethod = 'all',
  links: manualLinks,
  limit = 8,
  layout = 'grid',
}) => {
  let links: UsefulLink[] = []

  const payload = await getPayload({ config: configPromise })

  if (selectMethod === 'manual' && manualLinks && manualLinks.length > 0) {
    // manualLinks can be an array of IDs or populated objects
    const linkIds = manualLinks.map((link) => (typeof link === 'object' ? link.id : link))

    const fetchedLinks = await payload.find({
      collection: 'useful-links',
      depth: 1,
      where: {
        id: {
          in: linkIds,
        },
      },
      // Keep manual order
      sort: 'order',
    })

    // Sort manual links based on the original selection order if needed,
    // but here we trust Payload's order or the 'order' field.
    links = fetchedLinks.docs
    // Re-sort to match the manual selection order if order field is not used for that
    links.sort((a, b) => linkIds.indexOf(a.id) - linkIds.indexOf(b.id))
  } else if (selectMethod === 'all') {
    const fetchedLinks = await payload.find({
      collection: 'useful-links',
      depth: 1,
      limit: limit || 8,
      sort: 'order',
    })
    links = fetchedLinks.docs
  }

  if (links.length === 0 && !title && !description) return null

  const isGrid = layout === 'grid'

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {(title || description) && (
          <div className="mb-12 max-w-3xl">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4 text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-6',
            isGrid
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl',
          )}
        >
          {links.map((link) => {
            const page = typeof link.page === 'object' ? (link.page as Page) : null
            const isInternal = link.type === 'internal'
            const href = isInternal ? `/${page?.slug || ''}` : link.url || '#'

            const LinkWrapper = isInternal ? Link : 'a'
            const externalProps = !isInternal
              ? {
                  target: link.newTab ? '_blank' : '_self',
                  rel: 'noopener noreferrer',
                }
              : {}

            return (
              <LinkWrapper
                key={link.id}
                href={href}
                {...(externalProps as any)}
                className={cn(
                  'group flex flex-col h-full p-6 rounded-2xl border bg-card transition-all duration-300',
                  'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20',
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {isInternal ? <ChevronRight size={20} /> : <ExternalLink size={20} />}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>

                {link.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {link.description}
                  </p>
                )}

                <div className="mt-auto flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  {isInternal ? 'Learn More' : 'Visit Website'}
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </LinkWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
