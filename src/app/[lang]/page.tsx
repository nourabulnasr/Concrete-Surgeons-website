import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/dictionaries'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/metadata'
import { CinematicHero } from '@/components/home/CinematicHero'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { DemolitionSection } from '@/components/home/DemolitionSection'
import { SupplySection } from '@/components/home/SupplySection'
import { ProductReveal } from '@/components/home/ProductReveal'
import { EgyptianProjects } from '@/components/home/EgyptianProjects'
import { CertFilmStrip } from '@/components/home/CertFilmStrip'
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser'
import { CTASection } from '@/components/home/CTASection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: buildAlternates(lang, ''),
    openGraph: buildOG(lang, dict.meta.homeTitle, dict.meta.homeDescription, ''),
    twitter: buildTwitter(dict.meta.homeTitle, dict.meta.homeDescription),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://csmisr.com',
    name: 'Concrete Surgeons',
    alternateName: 'جراحين الخرسانة',
    description:
      "Middle East's leading specialist in diamond sawing, controlled demolition, and structural retrofitting. Serving Egypt and the Gulf since 2007.",
    url: 'https://csmisr.com',
    telephone: '+201028588003',
    email: 'info@csmisr.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '70 Joseph Tito Street',
      addressLocality: 'New Nozha, Cairo',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0871,
      longitude: 31.3327,
    },
    foundingDate: '2007',
    image: 'https://csmisr.com/logo.jpg',
    logo: {
      '@type': 'ImageObject',
      url: 'https://csmisr.com/logo.jpg',
    },
    areaServed: ['Egypt', 'UAE', 'Saudi Arabia', 'Gulf'],
    knowsAbout: [
      'Diamond Sawing',
      'Controlled Demolition',
      'Structural Retrofitting',
      'CFRP Strengthening',
      'Concrete Drilling',
      'Firestop',
      'Concrete Polishing',
      'HM-500 Injectable Epoxy',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/ConcreteSurgeons/',
      'https://www.linkedin.com/in/khalid-allam-product-development-consultant/',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* 01 — Hero */}
      <CinematicHero dict={dict} lang={lang as 'en' | 'ar'} />
      {/* 02 — Two business arms overview */}
      <ServicesGrid dict={dict} lang={lang as 'en' | 'ar'} />
      {/* 03 — Demolition & Structural deep-dive */}
      <DemolitionSection lang={lang as 'en' | 'ar'} />
      {/* 04 — HM-500 supply deep-dive */}
      <SupplySection lang={lang as 'en' | 'ar'} />
      {/* 3D product reveal — no section number, immersive */}
      <ProductReveal lang={lang as 'en' | 'ar'} />
      {/* 05 — Verified in the field: 5 Egyptian projects */}
      <EgyptianProjects lang={lang as 'en' | 'ar'} />
      {/* Certifications film strip */}
      <CertFilmStrip lang={lang as 'en' | 'ar'} />
      {/* 500+ parallax teaser */}
      <ProjectsTeaser dict={dict} lang={lang as 'en' | 'ar'} />
      {/* 06 — Contact */}
      <CTASection dict={dict} lang={lang as 'en' | 'ar'} />
    </>
  )
}
