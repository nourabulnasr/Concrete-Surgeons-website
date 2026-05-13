import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/metadata'
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
    alternates: buildAlternates(lang, '/about'),
    openGraph: buildOG(lang, dict.meta.aboutTitle, dict.meta.aboutDescription, '/about'),
    twitter: buildTwitter(dict.meta.aboutTitle, dict.meta.aboutDescription),
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
    '@type': 'AboutPage',
    name: lang === 'ar' ? 'من نحن — جراحو الخرسانة' : 'About Concrete Surgeons',
    url: `https://csmisr.com/${lang}/about`,
    about: {
      '@id': 'https://csmisr.com',
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
