'use client'
import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const certs = [
  {
    nameEn: 'Safety Report',
    nameAr: 'تقرير السلامة',
    authorityEn: 'CTC — National Center of Quality Supervision',
    authorityAr: 'المركز الوطني للإشراف على الجودة',
  },
  {
    nameEn: 'Non-Toxic Report',
    nameAr: 'تقرير عدم السمية',
    authorityEn: 'National Building Materials Test Center',
    authorityAr: 'المركز الوطني لاختبار مواد البناء',
  },
  {
    nameEn: 'Horizontal Flame Resistance',
    nameAr: 'مقاومة اللهب الأفقي',
    authorityEn: 'National Fire Systems QC Center',
    authorityAr: 'مركز ضمان جودة أنظمة الحريق',
  },
  {
    nameEn: 'Non-Ethanediamine',
    nameAr: 'خلو من الإيثانولامين',
    authorityEn: 'National Building Materials Test Center',
    authorityAr: 'المركز الوطني لاختبار مواد البناء',
  },
  {
    nameEn: 'Acute Oral Toxicity',
    nameAr: 'السمية الفموية الحادة',
    authorityEn: 'Shanghai CDC',
    authorityAr: 'مركز مكافحة أمراض شنغهاي',
  },
  {
    nameEn: 'Welding Resistance',
    nameAr: 'مقاومة اللحام',
    authorityEn: 'Independent Laboratory',
    authorityAr: 'مختبر مستقل',
  },
  {
    nameEn: 'Anchor Fatigue Test',
    nameAr: 'اختبار إجهاد المثبت',
    authorityEn: 'Independent Laboratory',
    authorityAr: 'مختبر مستقل',
  },
]

interface Props {
  lang: 'en' | 'ar'
}

export function CertFilmStrip({ lang }: Props) {
  const isAr = lang === 'ar'
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Check at effect time — avoids React state-driven conditional renders
    // which conflict with GSAP's pin-spacer DOM mutations
    if (prefersReduced || !sectionRef.current || !trackRef.current) return
    if (window.matchMedia('(max-width: 767px)').matches) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  if (prefersReduced) {
    return (
      <section
        data-navbar-dark="true"
        style={{
          background: 'oklch(8% 0.02 75)',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
          borderTop: '1px solid oklch(15% 0.015 75)',
        }}
      >
        <div className="container">
          <p className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)', marginBottom: '3rem' }}>
            {isAr ? '03 / سجل الاعتمادات' : '03 / CERTIFICATION RECORD'}
          </p>
          <div style={{ borderTop: '1px solid oklch(20% 0.015 75)' }}>
            {certs.map((cert) => (
              <div key={cert.nameEn} style={{ borderBottom: '1px solid oklch(20% 0.015 75)', padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-body" style={{ fontSize: '0.875rem', color: 'oklch(80% 0.008 75)' }}>
                  {isAr ? cert.nameAr : cert.nameEn}
                </span>
                <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: 'oklch(42% 0.18 145)' }}>
                  {isAr ? 'اجتاز' : 'PASS'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Same DOM on both mobile and desktop.
  // Desktop: GSAP pins this section and translates the track horizontally.
  // Mobile:  CSS (csm-cert-track class) makes it overflow-x snap-scroll.
  return (
    <section
      ref={sectionRef}
      data-navbar-dark="true"
      className="csm-cert-section"
      style={{
        overflow: 'hidden',
        background: 'oklch(8% 0.02 75)',
        borderTop: '1px solid oklch(15% 0.015 75)',
      }}
    >
      <div
        ref={trackRef}
        className="csm-cert-track"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: 'max-content',
          height: '100svh',
          willChange: 'transform',
        }}
      >
        {/* Section label card */}
        <div
          style={{
            width: 'clamp(18rem, 28vw, 28rem)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 4rem)',
            borderRight: '1px solid oklch(18% 0.015 75)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: E }}
          >
            <p className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)', marginBottom: '1.5rem' }}>
              03 /
            </p>
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
                color: 'oklch(96% 0.008 75)',
                whiteSpace: 'pre-line',
              }}
            >
              {isAr ? 'سجل\nالاعتمادات' : 'CERTIFICATION\nRECORD'}
            </h2>
            <p className="font-body" style={{ marginTop: '1.5rem', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(38% 0.01 75)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {isAr ? 'سبعة مختبرات مستقلة\nست وعشرون خاصية إنشائية' : 'SEVEN INDEPENDENT\nLABORATORIES'}
            </p>
            <p className="font-body hidden md:block" style={{ marginTop: '3rem', fontSize: '0.4375rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(28% 0.01 75)' }}>
              {isAr ? '← مرر للاستكشاف' : 'SCROLL TO EXPLORE →'}
            </p>
          </motion.div>
        </div>

        {/* Cert cards */}
        {certs.map((cert, i) => {
          const name = isAr ? cert.nameAr : cert.nameEn
          const authority = isAr ? cert.authorityAr : cert.authorityEn

          return (
            <div
              key={cert.nameEn}
              style={{
                width: 'clamp(20rem, 30vw, 32rem)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 3.5rem)',
                borderRight: '1px solid oklch(18% 0.015 75)',
              }}
            >
              <span
                className="font-incident select-none"
                style={{
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: 'oklch(14% 0.018 75)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <div
                  className="font-display uppercase"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.875rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    color: 'oklch(96% 0.008 75)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {name}
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.5625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'oklch(40% 0.01 75)',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                  }}
                >
                  {authority}
                </p>
                <span
                  className="font-body"
                  style={{
                    display: 'inline-block',
                    fontSize: '0.4375rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'oklch(42% 0.18 145)',
                    border: '1px solid oklch(32% 0.18 145)',
                    padding: '0.3rem 0.6rem',
                  }}
                >
                  {isAr ? 'اجتاز' : 'PASS'}
                </span>
              </div>
            </div>
          )
        })}

        {/* End spacer */}
        <div style={{ width: 'clamp(8rem, 15vw, 16rem)', flexShrink: 0, display: 'flex', alignItems: 'flex-end', padding: '3rem 2rem' }}>
          <p className="font-body" style={{ fontSize: '0.4375rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(28% 0.01 75)' }}>
            {isAr ? 'HM-500 — ٢٦ خاصية' : 'HM-500 — 26 PROPERTIES'}
          </p>
        </div>
      </div>
    </section>
  )
}
