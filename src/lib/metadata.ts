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
    // OG image is generated per-locale by the dynamic opengraph-image route.
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
