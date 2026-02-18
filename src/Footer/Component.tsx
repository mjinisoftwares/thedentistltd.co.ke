import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/utils'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const tagline = footerData?.tagline || 'Components made easy.'
  const menuColumns = footerData?.menuColumns || []
  const copyright = footerData?.copyright || '© 2024 Your Company. All rights reserved.'
  const bottomLinks = footerData?.bottomLinks || []

  return (
    <section
      className={cn(
        'mt-[-20%]  py-32 bg-black text-white dark:bg-card mt-auto border-t border-border',
      )}
    >
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            {/* Logo and Tagline Column */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/" aria-label="Go to homepage">
                  <Logo loading="eager" priority="high" />
                </Link>
              </div>
              <p className="mt-4 font-bold text-white/90">{tagline}</p>

              {/* Add ThemeSelector at the bottom of first column on mobile, adjust for desktop */}
              <div className="mt-6 lg:hidden">
                <ThemeSelector />
              </div>
            </div>

            {/* Dynamic Menu Columns */}
            {menuColumns.map((column, columnIdx) => (
              <div key={columnIdx} className="col-span-1">
                <h3 className="mb-4 font-bold text-white">{column.columnTitle}</h3>
                <ul className="space-y-4 text-white/70">
                  {column.links?.map(({ link }, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-white transition-colors">
                      <CMSLink {...link} className="text-white/70 hover:text-white" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section with Copyright and Legal Links */}
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/20 pt-8 text-sm font-medium text-white/70 md:flex-row md:items-center">
            <p>{copyright}</p>

            <div className="flex items-center gap-6">
              {/* ThemeSelector for desktop - hidden on mobile */}
              <div className="hidden lg:block">
                <ThemeSelector />
              </div>

              {/* Bottom Legal Links */}
              <ul className="flex gap-4">
                {bottomLinks.map(({ link }, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="underline-offset-4 hover:underline hover:text-white transition-colors"
                  >
                    <CMSLink {...link} className="text-white/70 hover:text-white" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
