import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'

const baseUrl = 'https://csmisr.com'
const locales = ['en', 'ar'] as const

const staticPages = ['', '/services', '/projects', '/clients', '/about', '/contact', '/comparison']

// Use a stable date — update this when content changes, not on every build.
const LAST_MODIFIED = new Date('2025-05-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages — one entry per locale
  for (const page of staticPages) {
    const altLanguages = Object.fromEntries(
      locales.map((lang) => [lang, `${baseUrl}/${lang}${page}`])
    )
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: { languages: altLanguages },
      })
    }
  }

  // Service detail pages — one entry per locale
  for (const service of services) {
    const altLanguages = Object.fromEntries(
      locales.map((lang) => [lang, `${baseUrl}/${lang}/services/${service.slug}`])
    )
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: { languages: altLanguages },
      })
    }
  }

  return entries
}
