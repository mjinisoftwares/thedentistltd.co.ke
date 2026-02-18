'use client'

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import type { CardBlock as CardBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

type Props = CardBlockProps & {
  className?: string
}

// ---------- card style variants ----------
const cardStyles: Record<string, string> = {
  shadow: 'bg-background shadow-sm border border-border',
  outline: 'bg-background border border-border',
  glass: 'backdrop-blur-xl bg-background/60 border border-border/20 shadow-sm',
  minimal: 'bg-transparent',
}

export const CardBlock: React.FC<Props> = ({
  heading,
  demoLink,
  items = [],
  cardStyle = 'shadow',
  className,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateSelection()
    carouselApi.on('select', updateSelection)
    carouselApi.on('reInit', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
      carouselApi.off('reInit', updateSelection)
    }
  }, [carouselApi])

  if (!items || items.length === 0) return null

  return (
    <section className={cn('py-24 md:py-32 overflow-hidden', className)}>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            {heading && (
              <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 leading-tight">
                {heading}
              </h2>
            )}

            {demoLink?.link && (
              <CMSLink
                {...demoLink.link}
                className="group inline-flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg text-primary"
                label="" // Suppress label to use children
              >
                {demoLink.link.label || 'Book a demo'}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </CMSLink>
            )}
          </div>

          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full size-10 md:size-12"
            >
              <ArrowLeft className="size-5" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full size-10 md:size-12"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {items?.map((item, index) => {
              const hasLink = item.link?.url || item.link?.reference?.value

              const CardContent = (
                <div className="group flex flex-col h-full">
                  <div
                    className={cn(
                      'rounded-2xl w-full overflow-hidden transition-all duration-300 group-hover:shadow-md',
                      cardStyles[cardStyle || 'shadow'],
                    )}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {item.image && (
                        <Media
                          resource={item.image}
                          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col flex-grow">
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold md:text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>

                    <p className="mb-6 line-clamp-3 text-sm text-muted-foreground md:text-base leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                      {item.link?.label || 'Read more'}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              )

              return (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-8 basis-[85%] md:basis-[45%] lg:basis-[35%] xl:basis-[30%]"
                >
                  {hasLink ? (
                    <CMSLink {...item.link} label="" className="block h-full no-underline">
                      {CardContent}
                    </CMSLink>
                  ) : (
                    CardContent
                  )}
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
