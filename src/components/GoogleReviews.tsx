'use client'

import Script from 'next/script'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

// Skeleton for a single review card
const ReviewSkeleton = () => (
  <div className="flex flex-col gap-4 p-6 rounded-2xl bg-background/50 border border-border/50 shadow-sm">
    <div className="flex gap-3 items-center">
      <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="w-24 h-4 bg-muted animate-pulse rounded" />
        <div className="w-16 h-3 bg-muted animate-pulse rounded" />
      </div>
    </div>
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-muted animate-pulse fill-muted" />
      ))}
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <div className="w-full h-3 bg-muted animate-pulse rounded" />
      <div className="w-full h-3 bg-muted animate-pulse rounded" />
      <div className="w-[85%] h-3 bg-muted animate-pulse rounded" />
    </div>
  </div>
)

export default function ReviewsWidget() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent border-t border-border/50 py-24"
      >
        <div className="container px-4 mx-auto">
          <div className="relative z-10 mx-auto max-w-3xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="text-3xl font-bold md:text-5xl text-foreground mb-6 tracking-tight">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Discover why our patients trust us with their dental care through their authentic
                feedback.
              </p>
            </motion.div>
          </div>

          <div className="relative min-h-[450px] w-full max-w-6xl mx-auto">
            {/* ✅ Beautiful Loading State */}
            <AnimatePresence>
              {!isScriptLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewSkeleton />
                    <ReviewSkeleton />
                    <ReviewSkeleton />
                  </div>
                  <div className="mt-12 flex justify-center items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <span className="text-sm font-medium text-muted-foreground ml-2">
                      Fetching latest reviews...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ✅ Featurable Widget Mount Point */}
            <div
              id="featurable-5a433aab-1a36-4363-8405-a336c1cdcf23"
              data-featurable-async
              className="w-full h-full transition-opacity duration-700"
              style={{ opacity: isScriptLoaded ? 1 : 0 }}
            />
          </div>
        </div>
      </section>

      {/* ✅ Optimized Script Loading - Start earlier but keep it efficient */}
      <Script
        src="https://featurable.com/assets/v2/carousel_default.min.js"
        strategy="afterInteractive"
        charSet="UTF-8"
        onLoad={() => {
          // Give it a tiny bit of time to initialize the DOM
          setTimeout(() => setIsScriptLoaded(true), 500)
        }}
      />
    </>
  )
}
