import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PartnersBlock } from '@/blocks/PartnersBlock/Component'
import StatsBlock from '@/blocks/Stats/Component'
import { FeaturesBlockComponent } from '@/blocks/FeaturesBlock/Component'
import FAQsBlock from '@/blocks/FaqBlock/Component'
import { CardBlock } from '@/blocks/CardsBlock/Component'
import { GalleryBlock } from '@/blocks/galleryBlock/Component'
import { ServiceBlock } from '@/blocks/ServiceBlock/Component'
import { TeamBlockComponent } from '@/blocks/TeamBlock/Component'
import { UsefulLinksBlockComponent } from './UsefulLinksBlock/Component'
import { AboutBlockComponent } from './AboutBlock/Component'
import { Feature2BlockComponent } from './Feature2Block/Component'
import { MapBlockComponent } from './MapBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  featuresBlock: FeaturesBlockComponent,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  partnersBlock: PartnersBlock,
  stats: StatsBlock,
  faqsBlock: FAQsBlock,
  cardBlock: CardBlock,
  galleryBlock: GalleryBlock,
  serviceBlock: ServiceBlock,
  teamBlock: TeamBlockComponent,
  usefulLinksBlock: UsefulLinksBlockComponent,
  about: AboutBlockComponent,
  feature2: Feature2BlockComponent,
  mapBlock: MapBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="block" key={index}>
                  {/* @ts-expect-error - block type union conflict */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
