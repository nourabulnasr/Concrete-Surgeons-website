import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/metadata'
import { services, getService } from '@/lib/services'
import { ServiceDetailContent } from '@/components/pages/ServiceDetailContent'

export async function generateStaticParams() {
  const langs = ['en', 'ar']
  return langs.flatMap((lang) =>
    services.map((s) => ({ lang, slug: s.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const service = getService(slug)
  if (!service) return {}

  const name = lang === 'ar' ? service.nameAr : service.nameEn
  const tagline = lang === 'ar' ? service.taglineAr : service.taglineEn

  const title = `${name} | Concrete Surgeons Egypt`
  return {
    title,
    description: tagline,
    alternates: buildAlternates(lang, `/services/${slug}`),
    openGraph: buildOG(lang, title, tagline),
    twitter: buildTwitter(title, tagline),
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const service = getService(slug)
  if (!service) notFound()
  const dict = await getDictionary(lang)

  const name = lang === 'ar' ? service.nameAr : service.nameEn
  const currentIndex = services.findIndex((s) => s.slug === slug)

  const tagline = lang === 'ar' ? service.taglineAr : service.taglineEn
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: tagline,
    serviceType: name,
    serviceOutput: tagline,
    url: `https://csmisr.com/${lang}/services/${slug}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://csmisr.com',
      name: 'Concrete Surgeons',
      url: 'https://csmisr.com',
    },
    areaServed: ['Egypt', 'UAE', 'Saudi Arabia'],
    offers: {
      '@type': 'Offer',
      areaServed: ['Egypt', 'UAE', 'Saudi Arabia'],
      availableLanguage: ['English', 'Arabic'],
    },
    '@id': `https://csmisr.com/${lang}/services/${slug}`,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `https://csmisr.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: dict.services.sectionLabel, item: `https://csmisr.com/${lang}/services` },
      { '@type': 'ListItem', position: 3, name, item: `https://csmisr.com/${lang}/services/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <ServiceDetailContent
        service={service}
        lang={lang as 'en' | 'ar'}
        currentIndex={currentIndex}
        dict={dict}
      />
    </>
  )
}
