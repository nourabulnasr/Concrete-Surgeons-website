import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { ComparisonContent } from '@/components/comparison/ComparisonContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.comparisonTitle,
    description: dict.meta.comparisonDescription,
    alternates: {
      canonical: `https://csmisr.com/${lang}/comparison`,
      languages: {
        en: 'https://csmisr.com/en/comparison',
        ar: 'https://csmisr.com/ar/comparison',
      },
    },
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return <ComparisonContent dict={dict} lang={lang as 'en' | 'ar'} />
}
