import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// oklch(98% 0.006 80) → #090e16   oklch(60% 0.20 65) → #e09318
// oklch(82% 0.015 75) → #1a2535   oklch(10% 0.025 75) → #f4f4f6
// oklch(55% 0.01 75) → #9aa0a8

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const isAr = lang === 'ar'

  const tagline = isAr
    ? 'قطع ماسي · هدم متحكم · تدعيم إنشائي'
    : 'Diamond Sawing · Controlled Demolition · Structural Retrofitting'

  const sub = isAr ? 'متخصصون إنشائيون — مصر والخليج منذ 2007' : 'Structural Specialists — Egypt & Gulf Since 2007'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#090e16',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          position: 'relative',
        }}
      >
        {/* Top amber corner accent */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 3,
              height: 120,
              background: '#e09318',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 120,
              height: 3,
              background: '#e09318',
            }}
          />
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 0 }}>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#e09318',
              marginBottom: 24,
            }}
          >
            {sub}
          </div>

          {/* Company name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#f4f4f6',
              letterSpacing: '-0.02em',
              marginBottom: 28,
            }}
          >
            <span>CONCRETE</span>
            <span>SURGEONS</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: '#9aa0a8',
              letterSpacing: '0.04em',
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1a2535',
            paddingTop: 28,
          }}
        >
          {/* CS monogram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: '#e09318',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                color: '#090e16',
                letterSpacing: '-0.02em',
              }}
            >
              CS
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9aa0a8',
              }}
            >
              csmisr.com
            </div>
          </div>

          {/* HM-500 badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 20px',
              border: '1px solid #1a2535',
            }}
          >
            <div style={{ width: 20, height: 1, background: '#e09318' }} />
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(224, 147, 24, 0.7)',
              }}
            >
              HM-500 · 7 Certifications · 26 Tested Properties
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
