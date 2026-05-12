import type { Metadata, Viewport } from 'next'
import { Chivo, Barlow_Condensed, Cairo, Big_Shoulders } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, locales, getDictionary } from '@/lib/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { PageTransition } from '@/components/providers/PageTransition'
import { LenisProvider } from '@/components/layout/LenisProvider'
import '../globals.css'

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  display: 'swap',
})

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-incident',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0c09' },
    { media: '(prefers-color-scheme: light)', color: '#0e0c09' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    metadataBase: new URL('https://csmisr.com'),
    title: {
      default: dict.meta.homeTitle,
      template: '%s | Concrete Surgeons',
    },
    description: dict.meta.homeDescription,
    openGraph: {
      siteName: 'Concrete Surgeons',
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `https://csmisr.com/${lang}`,
      languages: {
        en: 'https://csmisr.com/en',
        ar: 'https://csmisr.com/ar',
        'x-default': 'https://csmisr.com/en',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const isRTL = lang === 'ar'

  return (
    <html
      lang={lang}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${chivo.variable} ${barlowCondensed.variable} ${cairo.variable} ${bigShoulders.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[oklch(99%_0.004_80)] text-[oklch(12%_0.025_75)] antialiased font-body">
        <Navbar dict={dict.nav} lang={lang as 'en' | 'ar'} />
        <LenisProvider>
          <MotionProvider>
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
          </MotionProvider>
        </LenisProvider>
        <Footer dict={dict.footer} lang={lang as 'en' | 'ar'} />
      </body>
    </html>
  )
}
