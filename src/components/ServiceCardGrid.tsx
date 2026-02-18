'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { toKebabCase } from '@/utilities/toKebabCase'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/payload-types'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function ServiceCardGrid({
  servicesData,
  title = 'Complete Dental Services',
  subtitle = 'From general dentistry to advanced cosmetic procedures',
}: {
  servicesData?: (Service | number | null)[]
  title?: string
  subtitle?: string
}) {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData?.map((service, index) => {
            if (!service || typeof service === 'number') return null

            return (
              <motion.div
                key={service.slug || index}
                className="p-6 rounded-lg border border-border bg-secondary/50 hover:border-primary transition group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <DynamicIcon
                    name={toKebabCase(service.icon || 'Heart') as IconName}
                    className="size-6 text-primary group-hover:text-white transition"
                  />
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">{service.summary}</p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition font-medium"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
