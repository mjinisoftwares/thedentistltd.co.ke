'use client'

import React, { useEffect, useState } from 'react'

import type { StatsBlock as StatsBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & StatsBlockProps

// ---------- simple counter ----------
const CountUp: React.FC<{ value?: number | null; suffix?: string | null }> = ({
  value,
  suffix,
}) => {
  const target = typeof value === 'number' ? value : 0
  const [count, setCount] = useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const increment = target / 30
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 30)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix ?? ''}
    </span>
  )
}

// ---------- main block ----------
const StatsBlock: React.FC<Props> = ({ className, heading, stats }) => {
  return (
    <section className={cn('bg-primary text-background py-12 px-4', className)}>
      {heading && <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{heading}</h2>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-background/15 rounded-xl"
          >
            <p className="text-3xl lg:text-4xl font-bold mb-2 tabular-nums">
              <CountUp value={stat?.number} suffix={stat?.suffix} />
            </p>
            <span className="text-sm font-medium text-background/80 uppercase tracking-wide">
              {stat?.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBlock
