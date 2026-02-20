import type { Metadata } from 'next'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import ReviewsWidget from '@/components/ReviewsWrapper'
import { GoogleMap } from '@/components/GoogleMap'

// -----------------------------
// Static Params
// -----------------------------
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
  })

  return (
    pages.docs
      ?.filter((doc) => doc.slug && doc.slug !== 'home')
      .map((doc) => ({ slug: doc.slug })) ?? []
  )
}

// -----------------------------
// Types
// -----------------------------
type PageProps = {
  params: Promise<{
    slug?: string
  }>
}

// -----------------------------
// Page
// -----------------------------
export default async function Page({ params: paramsPromise }: PageProps) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = `/${decodedSlug}`

  const page = await queryPageBySlug(decodedSlug)

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pt-32">
      <PageClient />

      {/* allow redirects even for valid pages */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
      <ReviewsWidget />
      <GoogleMap />
    </article>
  )
}

// -----------------------------
// Metadata
// -----------------------------
export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug(decodedSlug)

  return generateMeta({ doc: page })
}

// -----------------------------
// Cached Query
// -----------------------------
const queryPageBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
    },
  })

  return (result.docs?.[0] ?? null) as RequiredDataFromCollectionSlug<'pages'> | null
})
