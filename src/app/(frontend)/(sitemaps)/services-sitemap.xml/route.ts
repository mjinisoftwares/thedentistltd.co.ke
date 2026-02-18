import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getServicesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'services',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = (results.docs || [])
      .filter((service) => Boolean(service?.slug))
      .map((service) => ({
        loc: `${SITE_URL}/services/${service?.slug}`,
        lastmod: service.updatedAt || dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      }))

    // Add the main services index page
    const servicesIndex = {
      loc: `${SITE_URL}/services`,
      lastmod: dateFallback,
      changefreq: 'monthly' as const,
      priority: 0.9,
    }

    return [servicesIndex, ...sitemap]
  },
  ['services-sitemap'],
  {
    tags: ['services-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getServicesSitemap()

  return getServerSideSitemap(sitemap)
}
