import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'

const baseUrl = 'https://csmisr.com'
const locales = ['en', 'ar']

const staticPages = ['', '/services', '/projects', '/clients', '/about', '/contact', '/comparison']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${baseUrl}/${lang}${page}`])
        ),
      },
    })
  }

  // Service detail pages
  for (const service of services) {
    entries.push({
      url: `${baseUrl}/en/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${baseUrl}/${lang}/services/${service.slug}`])
        ),
      },
    })
  }

  return entries
}
