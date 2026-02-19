'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { Calendar } from 'lucide-react'

import { DesktopNav } from './Nav/Nav.server'
import { MobileMenu } from './MobileMenu'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { TopBar } from './TopBar'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme])

  // ✅ Scroll controller
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = data?.navItems || []

  return (
    <>
      {/* ✅ pass hidden prop */}
      <TopBar hidden={scrolled} />

      <header
        className={`py-2  fixed left-0 right-0 z-40 bg-background border-b transition-all duration-300 ${
          scrolled ? 'top-0' : 'top-8'
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
        role="banner"
      >
        <div className="container h-24 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" aria-label="Go to homepage">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* DESKTOP NAV */}
          <div className="flex-1 flex justify-center">
            <DesktopNav items={navItems} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ThemeSelector />
            </div>

            <Link
              href="/book-appointment"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>

            <MobileMenu items={navItems} />
          </div>
        </div>
      </header>
    </>
  )
}
