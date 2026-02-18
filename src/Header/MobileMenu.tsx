'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Calendar } from 'lucide-react'
import type { Header } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

type NavItem = NonNullable<Header['navItems']>[number]
type ChildItem = NonNullable<NavItem['children']>[number]

interface MobileMenuProps {
  items: NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  const getHref = (item: NavItem | ChildItem): string => {
    if (item.linkType === 'external') {
      return item.externalUrl || '#'
    }
    // Handle both number ID and Page object
    const internal = item.internal
    if (typeof internal === 'object' && internal !== null && 'slug' in internal) {
      return `/${internal.slug || ''}`
    }
    return '#'
  }

  const getTarget = (item: NavItem | ChildItem): string | undefined => {
    return 'newTab' in item && item.newTab ? '_blank' : undefined
  }

  const getRel = (item: NavItem | ChildItem): string | undefined => {
    return 'newTab' in item && item.newTab ? 'noopener noreferrer' : undefined
  }

  return (
    <>
      <button
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-background p-6 overflow-y-auto w-3/4"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>

          <nav className="space-y-4">
            {items.map((item, i) => {
              const hasChildren = item.children && item.children.length > 0
              const isActive = active === i

              if (hasChildren) {
                return (
                  <div key={i} className="border-b pb-2">
                    <button
                      className="flex w-full justify-between items-center font-medium py-2"
                      onClick={() => setActive(isActive ? null : i)}
                      aria-expanded={isActive}
                      aria-controls={`mobile-submenu-${i}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isActive && (
                      <div id={`mobile-submenu-${i}`} className="pl-4 pt-2 space-y-2" role="region">
                        {item.children!.map((child, j) => (
                          <Link
                            key={j}
                            href={getHref(child)}
                            target={getTarget(child)}
                            rel={getRel(child)}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-3 py-3 px-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                          >
                            {child.icon && (
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                <span className="text-sm font-medium">{child.icon}</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground">{child.label}</div>
                              {child.description && (
                                <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {child.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={i}
                  href={getHref(item)}
                  target={getTarget(item)}
                  rel={getRel(item)}
                  onClick={() => setOpen(false)}
                  className="block font-medium py-2 border-b hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Book Appointment Button */}
          <div className="mt-8 flex w-full justify-between gap-4 border-b pb-4">
            <Link
              href="/book-appointment"
              className=" inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <ThemeSelector />
          </div>
        </div>
      )}
    </>
  )
}
