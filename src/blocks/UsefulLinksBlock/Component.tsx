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
import { ArrowRight, ExternalLink, Link2 } from 'lucide-react'

export const UsefulLinksBlockComponent: React.FC<UsefulLinksBlockProps> = async ({
  title,
  description,
  selectMethod = 'all',
  links: manualLinks,
  limit = 8,
}) => {
  let links: UsefulLink[] = []

  const payload = await getPayload({ config: configPromise })

  if (selectMethod === 'manual' && manualLinks && manualLinks.length > 0) {
    const linkIds = manualLinks.map((link) => (typeof link === 'object' ? link.id : link))

    const fetchedLinks = await payload.find({
      collection: 'useful-links',
      depth: 1,
      where: {
        id: {
          in: linkIds,
        },
      },
      sort: 'order',
    })

    links = fetchedLinks.docs
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

  return (
    <section className="py-12 md:py-16 bg-background/50">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-2 text-foreground">
                {title}
              </h2>
            )}
            {description && <p className="text-base text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                {...externalProps}
                className={cn(
                  'group relative flex items-center justify-between p-4 rounded-xl border bg-card/30 backdrop-blur-sm transition-all duration-300',
                  'hover:bg-background hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20',
                )}
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ease-out">
                    {isInternal ? <Link2 size={18} /> : <ExternalLink size={18} />}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                      {link.title}
                    </span>
                    {link.description && (
                      <span className="text-xs text-muted-foreground truncate opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {link.description}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <ArrowRight
                    size={18}
                    className="text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </LinkWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
