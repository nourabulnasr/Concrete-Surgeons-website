const LOGO_URL = 'https://csmisr.com/logo.jpg'

export function buildAlternates(lang: string, path: string) {
  return {
    canonical: `https://csmisr.com/${lang}${path}`,
    languages: {
      en: `https://csmisr.com/en${path}`,
      ar: `https://csmisr.com/ar${path}`,
      'x-default': `https://csmisr.com/en${path}`,
    },
  }
}

export function buildOG(lang: string, title: string, description: string, path = '') {
  return {
    url: `https://csmisr.com/${lang}${path}`,
    siteName: 'Concrete Surgeons',
    locale: lang === 'ar' ? 'ar_EG' : 'en_US',
    type: 'website' as const,
    title,
    description,
    images: [{ url: LOGO_URL, width: 512, height: 512, alt: 'Concrete Surgeons — Diamond Sawing & Structural Retrofitting Egypt' }],
  }
}

export function buildTwitter(title: string, description: string) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
  }
}

export function buildIcons() {
  return {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
  }
}
