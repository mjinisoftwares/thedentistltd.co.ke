'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { useTheme } from '@/providers/Theme'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      label: 'Services',
      sublinks: [
        { href: '/services#general', label: 'General Dentistry' },
        { href: '/services#cosmetic', label: 'Cosmetic Dentistry' },
        { href: '/services#orthodontics', label: 'Orthodontics' },
        { href: '/services#implants', label: 'Implants' },
      ],
    },
    { href: '/projects', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/dentist-logo.webp"
            alt="The Dentist Ltd Logo"
            width={50}
            height={50}
            className="hover:opacity-80 transition"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition">
              The Dentist Ltd
            </h1>
            <p className="text-xs text-muted-foreground">A Lifetime of Smiles</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const hasSublinks = 'sublinks' in link
            return (
              <div key={link.label} className="relative group">
                <Link
                  href={!hasSublinks ? link.href : '#'}
                  className="text-sm font-medium text-foreground hover:text-primary transition relative flex items-center gap-1 py-2"
                >
                  {link.label}
                  {hasSublinks && (
                    <ChevronDown size={16} className="group-hover:rotate-180 transition" />
                  )}
                </Link>

                {hasSublinks && (
                  <div className="absolute left-0 mt-0 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {link.sublinks?.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary/50 transition"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded-lg transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded-lg transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 hover:bg-secondary rounded transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-secondary/50">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => {
              const hasSublinks = 'sublinks' in link
              return (
                <div key={link.label}>
                  {hasSublinks ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        className="w-full text-left text-foreground hover:text-primary transition font-medium py-2 flex items-center justify-between"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="bg-background rounded pl-4 py-2 space-y-2">
                          {link.sublinks?.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className="block text-sm text-muted-foreground hover:text-primary transition py-1"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-foreground hover:text-primary transition font-medium py-2 block"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              )
            })}
            <Link
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium w-full text-center"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
