import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { AboutContent } from '@/components/pages/AboutContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: {
      canonical: `https://csmisr.com/${lang}/about`,
      languages: {
        en: 'https://csmisr.com/en/about',
        ar: 'https://csmisr.com/ar/about',
      },
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Concrete Surgeons',
    alternateName: 'جراحين الخرسانة',
    url: 'https://csmisr.com',
    foundingDate: '2007',
    founder: {
      '@type': 'Person',
      name: 'Khaled Allam',
      jobTitle: 'Founder & CEO',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '70 Joseph Tito Street',
      addressLocality: 'New Nozha',
      addressRegion: 'Cairo',
      addressCountry: 'EG',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <AboutContent dict={dict} lang={lang as 'en' | 'ar'} />
    </>
  )
}
