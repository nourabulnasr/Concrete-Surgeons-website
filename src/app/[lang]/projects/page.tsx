import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { ProjectsContent } from '@/components/pages/ProjectsContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.projectsTitle,
    description: dict.meta.projectsDescription,
    alternates: {
      canonical: `https://csmisr.com/${lang}/projects`,
      languages: {
        en: 'https://csmisr.com/en/projects',
        ar: 'https://csmisr.com/ar/projects',
      },
    },
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const p = dict.projects
  const isAr = lang === 'ar'

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://csmisr.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: p.sectionLabel, item: `https://csmisr.com/${lang}/projects` },
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
          <span className="label-eyebrow block mb-4">{p.sectionLabel}</span>
          <h1
            className="font-display font-700 uppercase text-stone-900"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.05,
              maxWidth: '700px',
              textAlign: isAr ? 'right' : 'left',
            }}
          >
            {p.headline}
          </h1>
        </div>
      </div>

      <ProjectsContent lang={lang as 'en' | 'ar'} dict={dict} />
    </>
  )
}
