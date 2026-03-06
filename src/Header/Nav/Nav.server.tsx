'use client'

import Link from 'next/link'
import type { Header } from '@/payload-types'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

type NavItem = NonNullable<Header['navItems']>[number]
type ChildItem = NonNullable<NavItem['children']>[number]

interface DesktopNavProps {
  items: NavItem[]
}

export function DesktopNav({ items }: DesktopNavProps) {
  if (!items?.length) return null

  const getHref = (item: NavItem | ChildItem): string => {
    if (item.linkType === 'external') return item.externalUrl || '#'

    const internal = item.internal
    if (typeof internal === 'object' && internal !== null && 'slug' in internal) {
      return internal.slug === 'index' ? '/' : `/${internal.slug || ''}`
    }

    return '#'
  }

  const getTarget = (item: NavItem | ChildItem) =>
    'newTab' in item && item.newTab ? '_blank' : undefined

  const getRel = (item: NavItem | ChildItem) =>
    'newTab' in item && item.newTab ? 'noopener noreferrer' : undefined

  return (
    <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
      {items.map((item, i) => {
        const hasChildren = item.children?.length

        if (hasChildren) {
          return (
            <NavDropdown
              key={i}
              item={item}
              getHref={getHref}
              getTarget={getTarget}
              getRel={getRel}
            />
          )
        }

        return (
          <Link
            key={i}
            href={getHref(item)}
            target={getTarget(item)}
            rel={getRel(item)}
            className="
            inline-flex items-center gap-1.5
            px-4 py-2 text-sm font-medium
            text-foreground/80
            hover:text-foreground
            hover:bg-accent
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            rounded-lg
            transition-colors
            "
          >
            {item.label}

            {item.newTab && <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />}
          </Link>
        )
      })}
    </nav>
  )
}

interface NavDropdownProps {
  item: NavItem
  getHref: (item: NavItem | ChildItem) => string
  getTarget: (item: NavItem | ChildItem) => string | undefined
  getRel: (item: NavItem | ChildItem) => string | undefined
}

function NavDropdown({ item, getHref, getTarget, getRel }: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)
  const toggle = () => setOpen((o) => !o)

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) close()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /* Close on escape */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="
        inline-flex items-center gap-1.5
        px-4 py-2 text-sm font-medium
        text-foreground/80
        hover:text-foreground
        hover:bg-accent
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        rounded-lg
        transition-colors
        "
      >
        {item.label}

        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      <div
        role="menu"
        aria-label={item.label}
        className={`
        absolute left-1/2 top-full z-50
        mt-2 w-max min-w-[320px]
        -translate-x-1/2
        rounded-xl border
        bg-popover
        shadow-xl
        transition-all
        duration-200
        ${open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
        `}
      >
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-[700px]">
          {item.children?.map((child, j) => (
            <Link
              key={j}
              href={getHref(child)}
              target={getTarget(child)}
              rel={getRel(child)}
              role="menuitem"
              className="
              group flex flex-col
              p-3 rounded-lg
              hover:bg-accent
              focus:bg-accent
              focus:outline-none
              transition-colors
              "
            >
              <div className="flex items-center gap-2 font-semibold text-foreground">
                {child.label}

                {child.newTab && <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />}
              </div>

              {child.description && (
                <p
                  className="
                  text-sm text-muted-foreground
                  group-hover:text-foreground
                  mt-1 leading-relaxed
                  "
                >
                  {child.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {item.children && item.children.length > 6 && (
          <div className="border-t p-3 bg-muted/30">
            <Link
              href={getHref(item)}
              className="
              flex items-center justify-center
              gap-1 text-sm font-medium
              text-muted-foreground
              hover:text-foreground
              transition-colors
              "
            >
              View all {item.label}
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
