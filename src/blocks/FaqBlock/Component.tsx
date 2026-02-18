'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'
import Link from 'next/link'
import type { FAQsBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = FAQsBlock & {
  className?: string
}

const FAQsBlock: React.FC<Props> = ({ className, heading, subtext, faqItems }) => {
  return (
    <section className={cn('bg-muted/50 dark:bg-background py-20', className)}>
      <div className="mx-auto container">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-20">
              {heading && (
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>
              )}
              {subtext && (
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {subtext}{' '}
                  <Link href="#" className="text-primary font-medium hover:underline">
                    customer support team
                  </Link>
                </p>
              )}
            </div>
          </div>
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems?.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background shadow-sm rounded-lg border px-4"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6 shrink-0 items-center justify-center">
                        {item.icon && (
                          <DynamicIcon name={item.icon as IconName} className="size-4" />
                        )}
                      </div>
                      <span className="text-left text-base font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="px-9">
                      <p className="text-base">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQsBlock
