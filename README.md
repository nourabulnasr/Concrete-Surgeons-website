# csmisr.com — Concrete Surgeons Website

## Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion v11+)
- **i18n**: Native Next.js `app/[lang]/` pattern with JSON dictionaries
- **Fonts**: Barlow Condensed (EN display) + Chivo (EN body) + Cairo (AR)
- **Hosting**: Vercel (target)

## Routes
| Path | Description |
|------|-------------|
| `/en` or `/ar` | Homepage |
| `/[lang]/services` | All 6 services |
| `/[lang]/services/[slug]` | Service detail with Schema.org |
| `/[lang]/projects` | Case studies grid |
| `/[lang]/clients` | Client logos |
| `/[lang]/about` | Company story + timeline |
| `/[lang]/contact` | Form + contact info |
| `/sitemap.xml` | Auto-generated with hreflang |
| `/robots.txt` | Allows all, blocks /api/ |
| `/api/contact` | Contact form POST handler |

## Services (6)
1. `diamond-sawing`
2. `controlled-demolition`
3. `drilling-anchoring`
4. `structural-retrofitting`
5. `firestop`
6. `concrete-polishing`

## i18n
- Default: `en` — root `/` auto-redirects based on Accept-Language
- `src/proxy.ts` handles locale detection
- Dictionaries: `src/dictionaries/en.json` and `src/dictionaries/ar.json`
- Arabic: `dir="rtl"`, `lang="ar"`, Cairo font

## SEO
- LocalBusiness JSON-LD on homepage
- Service JSON-LD + BreadcrumbList on each service page
- hreflang on every page (EN + AR)
- sitemap.xml with full EN/AR hreflang coverage
- robots.txt pointing to sitemap

## Dev Commands
```bash
npm run dev    # http://localhost:3000
npm run build
npm run start
```

## Deploy
```bash
vercel deploy --prod
# Then update DNS: CNAME csmisr.com → cname.vercel-dns.com
```

## Before Launch Checklist
- [ ] Replace +201000000000 with real phone/WhatsApp
- [ ] Replace info@csmisr.com with verified email
- [ ] Add real client logos to clients page
- [ ] Add real project photos + update projects data in `/[lang]/projects/page.tsx`
- [ ] Connect email service in `/api/contact/route.ts` (Resend recommended)
- [ ] Add OG images (1200x630) for social sharing
- [ ] Add favicon set
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Verify domain in Google Business Profile
