import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/metadata'
import { ClientsContent } from '@/components/pages/ClientsContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const title = lang === 'ar' ? 'عملاؤنا | جراحو الخرسانة مصر' : 'Our Clients | Concrete Surgeons Egypt'
  const description =
    lang === 'ar'
      ? 'المقاولون والمطورون والمهندسون الذين يثقون بجراحي الخرسانة في مصر والخليج.'
      : 'The contractors, developers, and engineers who trust Concrete Surgeons across Egypt and the Gulf.'
  return {
    title,
    description,
    alternates: buildAlternates(lang, '/clients'),
    openGraph: buildOG(lang, title, description, '/clients'),
    twitter: buildTwitter(title, description),
  }
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const isAr = lang === 'ar'

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-12 border-b border-[oklch(82%_0.012_264)]">
        <div className="container">
          <span className="label-eyebrow block mb-4">{dict.clients.sectionLabel}</span>
          <h1
            className="font-display font-700 uppercase text-[oklch(16%_0.011_264)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.05,
              maxWidth: '700px',
              textAlign: isAr ? 'right' : 'left',
            }}
          >
            {dict.clients.headline}
          </h1>
        </div>
      </div>

      <ClientsContent lang={lang as 'en' | 'ar'} dict={dict} />
    </>
  )
}
