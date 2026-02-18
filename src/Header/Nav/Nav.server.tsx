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
    if (item.linkType === 'external') {
      return item.externalUrl || '#'
    }
    const internal = item.internal
    if (typeof internal === 'object' && internal !== null && 'slug' in internal) {
      return internal.slug === 'index' ? '/' : `/${internal.slug || ''}`
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
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
      {items.map((item, i) => {
        const hasChildren = item.children && item.children.length > 0

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
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-accent/50 transition-all duration-200"
          >
            {item.label}
            {item.newTab && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'center' | 'right'>('center')

  useEffect(() => {
    if (!buttonRef.current || !dropdownRef.current) return

    const updatePosition = () => {
      const button = buttonRef.current
      const dropdown = dropdownRef.current
      if (!button || !dropdown) return

      const buttonRect = button.getBoundingClientRect()
      const dropdownWidth = dropdown.offsetWidth
      const viewportWidth = window.innerWidth

      // Calculate available space on each side

      // Check if dropdown would overflow on the right
      const wouldOverflowRight = buttonRect.left + dropdownWidth > viewportWidth - 16 // 16px buffer
      const wouldOverflowLeft = buttonRect.right - dropdownWidth < 16

      if (wouldOverflowRight && !wouldOverflowLeft) {
        // Align to the right side of the button
        setDropdownPosition('right')
      } else if (wouldOverflowLeft && !wouldOverflowRight) {
        // Align to the left side of the button
        setDropdownPosition('left')
      } else {
        // Center by default
        setDropdownPosition('center')
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)

    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  const getPositionStyles = () => {
    switch (dropdownPosition) {
      case 'left':
        return {
          left: '0',
          right: 'auto',
          transform: 'translateX(0)',
        }
      case 'right':
        return {
          left: 'auto',
          right: '0',
          transform: 'translateX(0)',
        }
      default:
        return {
          left: '40%',
          right: 'auto',
          transform: 'translateX(-40%)',
        }
    }
  }

  return (
    <div className="relative group" role="none">
      <button
        ref={buttonRef}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-accent/50 transition-all duration-200 group"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {item.label}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown menu */}
      <div
        ref={dropdownRef}
        className="absolute top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50"
        style={getPositionStyles()}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="bg-popover bg-gradient-to-br from-primary/5 via-primary-20 to-secondary/30 backdrop-blur-sm border rounded-xl shadow-xl overflow-hidden max-w-[90vw]">
          {/* Nested navigation grid */}
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 min-w-[300px] max-w-[600px] w-max">
              {item.children!.map((child, j) => (
                <Link
                  key={j}
                  href={getHref(child)}
                  target={getTarget(child)}
                  rel={getRel(child)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/80 transition-all duration-200 group/item"
                  role="menuitem"
                >
                  {/* {child.icon && (
                    <div className="flex-shrink-0 w-12 h-12  flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover/item:from-primary/20 group-hover/item:to-primary/10 transition-all duration-200">
                      <span className="text-base font-semibold">{child.icon}</span>
                    </div>
                  )} */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-foreground">{child.label}</span>
                      {child.newTab && (
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    {child.description && (
                      <div className="text-sm text-muted-foreground mt-0.5 line-clamp-3 leading-relaxed">
                        {child.description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Optional footer with view all link */}
          {item.children!.length > 6 && (
            <div className="border-t p-2 bg-muted/50">
              <Link
                href={getHref(item)}
                className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-md hover:bg-accent/50"
              >
                View all {item.label}
                <ChevronDown className="w-3 h-3 -rotate-90 flex-shrink-0" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
