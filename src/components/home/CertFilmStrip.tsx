'use client'
import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const certs = [
  {
    nameEn: 'ISO 9001:2015',
    nameAr: 'ISO 9001:2015',
    authorityEn: 'TQCSI — Australia',
    authorityAr: 'TQCSI — أستراليا',
  },
  {
    nameEn: 'CE Mark',
    nameAr: 'علامة CE',
    authorityEn: 'European Conformity',
    authorityAr: 'المطابقة الأوروبية',
  },
  {
    nameEn: 'UKAS Management Systems',
    nameAr: 'أنظمة إدارة UKAS',
    authorityEn: 'UK Accreditation Service',
    authorityAr: 'هيئة الاعتماد البريطانية',
  },
  {
    nameEn: 'TÜV Rheinland',
    nameAr: 'TÜV راينلاند',
    authorityEn: 'Germany',
    authorityAr: 'ألمانيا',
  },
  {
    nameEn: 'JAS-ANZ',
    nameAr: 'JAS-ANZ',
    authorityEn: 'Joint Accreditation — Australia / New Zealand',
    authorityAr: 'الاعتماد المشترك — أستراليا / نيوزيلندا',
  },
  {
    nameEn: 'TQCSI',
    nameAr: 'TQCSI',
    authorityEn: 'Total Quality Certification Services International',
    authorityAr: 'خدمات التصديق على الجودة الكلية الدولية',
  },
  {
    nameEn: 'ECM',
    nameAr: 'ECM',
    authorityEn: 'Italy',
    authorityAr: 'إيطاليا',
  },
  {
    nameEn: 'ICRI',
    nameAr: 'ICRI',
    authorityEn: 'International Concrete Repair Institute',
    authorityAr: 'المعهد الدولي لإصلاح الخرسانة',
  },
  {
    nameEn: 'AACB',
    nameAr: 'AACB',
    authorityEn: 'Association of Accredited Certification Bodies',
    authorityAr: 'رابطة هيئات التصديق المعتمدة',
  },
  {
    nameEn: 'IAF',
    nameAr: 'IAF',
    authorityEn: 'International Accreditation Forum',
    authorityAr: 'المنتدى الدولي للاعتماد',
  },
  {
    nameEn: 'CMA / MA',
    nameAr: 'CMA / MA',
    authorityEn: 'China Metrology Accreditation',
    authorityAr: 'اعتماد القياس الصيني',
  },
  {
    nameEn: 'CNAS + ILAC-MRA',
    nameAr: 'CNAS + ILAC-MRA',
    authorityEn: 'China National Accreditation + International Mutual Recognition',
    authorityAr: 'الاعتماد الوطني الصيني + التقدير المتبادل الدولي',
  },
]

interface Props {
  lang: 'en' | 'ar'
}

export function CertFilmStrip({ lang }: Props) {
  const isAr = lang === 'ar'
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Raw scroll progress → spring-smoothed x translation
  const scrollX = useMotionValue(0)
  const springX = useSpring(scrollX, { stiffness: 80, damping: 20, restDelta: 0.5 })

  useEffect(() => {
    if (prefersReduced) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile) return

    // Set outer container height = 100svh + horizontal scroll distance
    // so the sticky section has exactly the right scroll budget.
    const measure = () => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return
      const extra = track.scrollWidth - window.innerWidth + 80
      outer.style.height = `calc(100svh + ${Math.max(0, extra)}px)`
    }
    measure()
    window.addEventListener('resize', measure)

    // Map vertical scroll progress → horizontal x offset
    const update = () => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return
      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const maxX = -(track.scrollWidth - window.innerWidth + 80)
      scrollX.set(progress * maxX)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', update)
    }
  }, [prefersReduced, scrollX])

  if (prefersReduced) {
    return (
      <section
        style={{
          background: 'oklch(96% 0.01 75)',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <div className="container">
          <p
            className="font-body"
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.20 65)',
              marginBottom: '3rem',
            }}
          >
            {isAr ? 'سجل الاعتمادات' : 'CERTIFICATION RECORD'}
          </p>
          <div style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}>
            {certs.map((cert) => (
              <div
                key={cert.nameEn}
                style={{
                  borderBottom: '1px solid oklch(87% 0.014 75)',
                  padding: '1.25rem 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  className="font-body"
                  style={{ fontSize: '0.875rem', color: 'oklch(14% 0.025 75)' }}
                >
                  {isAr ? cert.nameAr : cert.nameEn}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.4375rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'oklch(42% 0.18 145)',
                  }}
                >
                  {isAr ? 'اجتاز' : 'PASS'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    // Outer: tall div that provides the scroll budget for the sticky section.
    // Height is set dynamically in useEffect (desktop only).
    // On mobile, CSS overrides to height: auto via .csm-cert-outer.
    <div
      ref={outerRef}
      className="csm-cert-outer"
      style={{ position: 'relative' }}
    >
      {/* Sticky section — stays in view while outer scrolls past */}
      <section
        className="csm-cert-section"
        style={{
          background: 'oklch(96% 0.01 75)',
          borderTop: '1px solid oklch(87% 0.014 75)',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
          height: '100svh',
        }}
      >
        {/* Track: motion.div so x MotionValue drives horizontal translation */}
        <motion.div
          ref={trackRef}
          className="csm-cert-track"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            width: 'max-content',
            height: '100%',
            willChange: 'transform',
            x: springX,
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
              borderRight: '1px solid oklch(87% 0.014 75)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: E }}
            >
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.0,
                  color: 'oklch(12% 0.025 75)',
                  whiteSpace: 'pre-line',
                }}
              >
                {isAr ? 'سجل\nالاعتمادات' : 'CERTIFICATION\nRECORD'}
              </h2>
              <p
                className="font-body"
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.625rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'oklch(54% 0.01 75)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {isAr
                  ? 'اثنتا عشرة شهادة دولية\nسبعة مختبرات مستقلة'
                  : 'TWELVE INTERNATIONAL\nCERTIFICATIONS'}
              </p>
              <p
                className="font-body hidden md:block"
                style={{
                  marginTop: '3rem',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'oklch(44% 0.01 75)',
                }}
              >
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
                  borderRight: '1px solid oklch(87% 0.014 75)',
                }}
              >
                <span
                  className="font-incident select-none"
                  style={{
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    fontWeight: 900,
                    lineHeight: 0.88,
                    letterSpacing: '-0.04em',
                    color: 'oklch(88% 0.01 75)',
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
                      color: 'oklch(12% 0.025 75)',
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
                      color: 'oklch(58% 0.01 75)',
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
          <div
            style={{
              width: 'clamp(8rem, 15vw, 16rem)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '3rem 2rem',
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: '0.4375rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'oklch(44% 0.01 75)',
              }}
            >
              {isAr ? 'HM-500 — ١٢ شهادة' : 'HM-500 — 12 CERTIFICATIONS'}
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
