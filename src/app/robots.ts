import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Block AI training crawlers — standard practice for professional services
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai', 'Google-Extended', 'Claude-Web', 'PerplexityBot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://csmisr.com/sitemap.xml',
  }
}
