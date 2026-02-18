'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

type Props = GalleryBlockProps & {
  className?: string
}

export const GalleryBlock: React.FC<Props> = ({ heading, items, className }) => {
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
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <section className={cn('py-24 md:py-32', className)}>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          {heading && (
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{heading}</h2>
          )}
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: 'start',
              breakpoints: {
                '(max-width: 768px)': { dragFree: true },
              },
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {items?.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  className="pl-4 md:pl-8 basis-[85%] md:basis-[45%] lg:basis-[35%]"
                >
                  <div className="group flex flex-col h-full">
                    <div className="flex aspect-[3/2] overflow-hidden rounded-xl bg-muted relative">
                      {item.image && (
                        <Media
                          resource={item.image}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="mt-6 flex flex-col flex-grow">
                      <h3 className="mb-2 text-xl font-bold md:text-2xl">{item.title}</h3>
                      {item.summary && (
                        <div className="mb-6 line-clamp-3 text-sm text-muted-foreground md:text-base leading-relaxed">
                          <RichText data={item.summary} enableGutter={false} enableProse={false} />
                        </div>
                      )}
                      {item.link && (
                        <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                          <CMSLink
                            {...item.link}
                            label="" // using label from props or children
                          >
                            {item.link.label || 'Read more'}
                          </CMSLink>
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
