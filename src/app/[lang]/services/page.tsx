import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/metadata'
import { ServicesListContent } from '@/components/pages/ServicesListContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDescription,
    alternates: buildAlternates(lang, '/services'),
    openGraph: buildOG(lang, dict.meta.servicesTitle, dict.meta.servicesDescription, '/services'),
    twitter: buildTwitter(dict.meta.servicesTitle, dict.meta.servicesDescription),
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const s = dict.services

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `https://csmisr.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: s.sectionLabel, item: `https://csmisr.com/${lang}/services` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />

      {/* Page header */}
      <div className="pt-32 pb-12 border-b border-[oklch(82%_0.015_75)]">
        <div className="container">
          <span className="label-eyebrow block mb-4">{s.sectionLabel}</span>
          <h1
            className="font-display font-700 uppercase text-stone-900"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.05,
              maxWidth: '700px',
            }}
          >
            {s.headline}
          </h1>
        </div>
      </div>

      <ServicesListContent lang={lang as 'en' | 'ar'} sectionLabel={s.sectionLabel} />
    </>
  )
}
