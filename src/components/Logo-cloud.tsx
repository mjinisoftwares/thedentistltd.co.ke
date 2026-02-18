'use client'

import { motion, useMotionValue, useAnimationFrame, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Optimized spring configuration for smooth motion
const springConfig = {
  damping: 50,
  stiffness: 400,
  mass: 0.1,
  restSpeed: 0.001,
}

interface LogoCloudProps {
  autoPlay?: boolean
  speed?: number
  direction?: 'left' | 'right'
}

export default function LogoCloud({
  autoPlay = true,
  speed = 30,
  direction = 'left',
}: LogoCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const x = useMotionValue(0)
  const springX = useSpring(x, springConfig)

  // Smooth opacity for entrance animation
  const opacity = useSpring(0, { damping: 25, stiffness: 300 })
  const scale = useSpring(0.95, { damping: 25, stiffness: 300 })

  // Clone logos for seamless infinite scroll
  const extendedLogos = [...logos, ...logos, ...logos]

  useEffect(() => {
    setMounted(true)
    opacity.set(1)
    scale.set(1)
  }, [opacity, scale])

  useEffect(() => {
    if (!mounted) return

    const updateWidths = () => {
      if (containerRef.current) {
        const container = containerRef.current
        const content = container.firstChild as HTMLElement
        if (content) {
          setContainerWidth(container.offsetWidth)
          setContentWidth(content.scrollWidth / 3) // Divide by 3 since we have 3 copies
        }
      }
    }

    updateWidths()
    window.addEventListener('resize', updateWidths)
    return () => window.removeEventListener('resize', updateWidths)
  }, [mounted])

  useAnimationFrame(() => {
    if (!autoPlay || isHovered || !contentWidth || !mounted) return

    const currentX = x.get()
    const moveAmount = speed * (direction === 'left' ? -1 : 1)

    // Seamless reset when we've scrolled one full set
    if (direction === 'left' && currentX <= -contentWidth) {
      x.set(0)
    } else if (direction === 'right' && currentX >= contentWidth) {
      x.set(0)
    } else {
      x.set(currentX + moveAmount * 0.01)
    }
  })

  // Variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 200,
      },
    },
  }

  return (
    <section className="bg-gradient-to-b from-background/5 to-background/10 overflow-hidden py-8 md:py-12 mt-8 md:mt-16 shadow-sm border-y border-border/10">
      <div className="group relative m-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center md:flex-row">
          {/* Title Section with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:max-w-44 md:border-r md:pr-6 mt-6 md:mb-6 border-border/20"
          >
            <p className="text-end text-lg text-secondary-foreground/90 dark:text-secondary-foreground/90 md:mb-0 md:text-lg font-semibold relative">
              <span className="relative inline-block">
                Our Website Development Tech Stack
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </p>
          </motion.div>

          {/* Logos Section */}
          <motion.div
            ref={containerRef}
            className="relative py-6 md:w-[calc(100%-11rem)]"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Infinite Slider Container */}
            <motion.div
              className="flex gap-8 md:gap-12"
              style={{ x: springX }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {extendedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: 'spring' as const, damping: 15, stiffness: 300 },
                  }}
                  className="flex-shrink-0"
                >
                  <Link
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center group cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-full blur-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Image with smooth transform */}
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ type: 'spring', damping: 15 }}
                      >
                        <Image
                          className="mx-auto h-12 md:h-16 w-auto object-contain dark:brightness-90 
                                   transition-all duration-300 group-hover:brightness-110 
                                   dark:group-hover:brightness-100 relative z-10"
                          src={logo.src}
                          alt={logo.alt}
                          height={60}
                          width={160}
                          style={{ objectFit: 'contain' }}
                          priority={index < 8}
                        />
                      </motion.div>
                    </div>

                    {/* Logo name with animated underline */}
                    <motion.span
                      className="mt-4 text-sm md:text-base font-semibold text-foreground/80 
                               dark:text-secondary-foreground/90 relative"
                      whileHover={{ color: 'var(--primary)' }}
                    >
                      {logo.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient Overlays with Blur Effect */}
            <motion.div
              className="bg-gradient-to-r from-background via-background/80 to-transparent absolute inset-y-0 left-0 w-20 md:w-32 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="bg-gradient-to-l from-background via-background/80 to-transparent absolute inset-y-0 right-0 w-20 md:w-32 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />

            {/* Animated blur overlays */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-32 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'linear-gradient(90deg, var(--background) 0%, transparent 100%)',
                backdropFilter: 'blur(2px)',
              }}
            />
            <motion.div
              className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-32 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'linear-gradient(270deg, var(--background) 0%, transparent 100%)',
                backdropFilter: 'blur(2px)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ✅ Tech Stack Logos with Links (cleaned up duplicates)
const logos = [
  {
    src: '/nextjs.jpeg',
    alt: 'Next.js Logo',
    name: 'Next.js',
    link: 'https://nextjs.org/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    alt: 'React Logo',
    name: 'React',
    link: 'https://react.dev/',
  },
  {
    src: '/convex.svg',
    alt: 'Convex Logo',
    name: 'Convex',
    link: 'https://convex.dev/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/strapi-2.svg',
    alt: 'Strapi Logo',
    name: 'Strapi',
    link: 'https://strapi.io/',
  },
  {
    src: '/icons8-supabase.svg',
    alt: 'Supabase Logo',
    name: 'Supabase',
    link: 'https://strapi.io/',
  },
  {
    src: '/prisma-svgrepo-com.svg',
    alt: 'Prisma Logo',
    name: 'Prisma',
    link: 'https://strapi.io/',
  },
  {
    src: '/neon.jpeg',
    alt: 'Neon Logo',
    name: 'Neon',
    link: 'https://strapi.io/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
    alt: 'PostgreSQL Logo',
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
    alt: 'OpenAI Logo',
    name: 'OpenAI',
    link: 'https://openai.com/',
  },
  {
    src: '/wordpress-svgrepo-com.svg',
    alt: 'WordPress Logo',
    name: 'WordPress',
    link: 'https://wordpress.org/',
  },
  {
    src: '/payload.svg',
    alt: 'Payload CMS Logo',
    name: 'Payload CMS',
    link: 'https://payloadcms.com/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg',
    alt: 'WooCommerce Logo',
    name: 'WooCommerce',
    link: 'https://woocommerce.com/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
    alt: 'Shopify Logo',
    name: 'Shopify',
    link: 'https://www.shopify.com/',
  },
  {
    src: 'https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg',
    alt: 'Cloudinary Logo',
    name: 'Cloudinary',
    link: 'https://cloudinary.com/',
  },
  {
    src: '/figma-svgrepo-com.svg',
    alt: 'Figma Logo',
    name: 'Figma',
    link: 'https://www.figma.com/',
  },
]
