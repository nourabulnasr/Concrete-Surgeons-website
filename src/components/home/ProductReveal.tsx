'use client'
import dynamic from 'next/dynamic'
import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

const HM500Scene = dynamic(() => import('@/components/3d/HM500Scene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: '1px solid oklch(30% 0.015 75)',
          borderTopColor: 'oklch(60% 0.20 65)',
          animation: 'csm-spin 0.9s linear infinite',
        }}
      />
    </div>
  ),
})

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  lang: 'en' | 'ar'
}

export function ProductReveal({ lang }: Props) {
  const isAr = lang === 'ar'
  const isMobile = useIsMobile()
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      scrollYProgress.set(progress)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [scrollYProgress])

  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2.2])
  const smoothRotation = useSpring(rawRotation, { stiffness: 35, damping: 18 })

  // Text phase opacities
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.38, 0.5], [0, 1, 1, 0])
  const phase2Opacity = useTransform(scrollYProgress, [0.42, 0.52, 0.78, 0.88], [0, 1, 1, 0])
  const phase3Opacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1])
  const dragHintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  if (isMobile || prefersReduced) {
    return (
      <section
        style={{
          background: 'oklch(9% 0.02 75)',
          padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid oklch(18% 0.015 75)',
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
              marginBottom: '1.5rem',
            }}
          >
            {isAr ? 'المنتج الرئيسي' : 'FLAGSHIP PRODUCT'}
          </p>
          <h2
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'oklch(96% 0.008 75)',
            }}
          >
            {isAr ? 'نظام التثبيت\nHM-500' : 'HM-500\nANCHOR SYSTEM'}
          </h2>
          <p
            className="font-body mt-6"
            style={{
              fontSize: '0.875rem',
              color: 'oklch(50% 0.01 75)',
              lineHeight: 1.7,
              maxWidth: '42ch',
            }}
          >
            {isAr
              ? 'مقاومة شد ≥ 13 ميغاباسكال — ≥ 99 ميغاباسكال ضغطي — 26 خاصية مثبتة ميدانياً'
              : '≥13 MPa bond strength — ≥99 MPa compressive — 26 field-proven properties'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={sectionRef}
      data-navbar-dark="true"
      style={{ height: '260vh', position: 'relative' }}
      aria-label={isAr ? 'عرض منتج HM-500 ثلاثي الأبعاد' : 'HM-500 product 3D reveal'}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          background: 'oklch(8% 0.02 75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid oklch(18% 0.015 75)',
        }}
      >
        {/* 3D Canvas — full bleed */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            contain: 'layout',
          }}
        >
          <HM500Scene scrollRotation={smoothRotation} />
        </div>

        {/* Text overlay — Phase 1 */}
        <motion.div
          style={{
            position: 'absolute',
            [isAr ? 'right' : 'left']: 'clamp(2rem, 6vw, 5rem)',
            bottom: 'clamp(4rem, 10vh, 7rem)',
            zIndex: 10,
            opacity: phase1Opacity,
            pointerEvents: 'none',
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.20 65)',
              marginBottom: '0.75rem',
            }}
          >
            {isAr ? 'المنتج الرئيسي' : 'FLAGSHIP PRODUCT'}
          </p>
          <h2
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              color: 'oklch(96% 0.008 75)',
            }}
          >
            {isAr ? 'نظام التثبيت\nHM-500' : 'HM-500\nANCHOR SYSTEM'}
          </h2>
        </motion.div>

        {/* Drag hint — vertical writing */}
        <motion.div
          style={{
            position: 'absolute',
            [isAr ? 'left' : 'right']: 'clamp(1.5rem, 3vw, 3rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: dragHintOpacity,
            pointerEvents: 'none',
          }}
        >
          <span
            className="font-body"
            style={{
              writingMode: 'vertical-rl',
              transform: isAr ? 'rotate(0deg)' : 'rotate(180deg)',
              fontSize: '0.4375rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'oklch(38% 0.01 75)',
            }}
          >
            {isAr ? '← اسحب' : 'drag →'}
          </span>
        </motion.div>

        {/* Text overlay — Phase 2: Specs */}
        <motion.div
          style={{
            position: 'absolute',
            [isAr ? 'left' : 'right']: 'clamp(2rem, 6vw, 5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: phase2Opacity,
            pointerEvents: 'none',
            maxWidth: '22rem',
            textAlign: isAr ? 'right' : 'left',
          }}
        >
          {[
            {
              n: '≥13',
              unit: 'MPa',
              label: isAr ? 'مقاومة شد' : 'BOND STRENGTH',
            },
            {
              n: '≥99',
              unit: 'MPa',
              label: isAr ? 'ضغط محوري' : 'COMPRESSIVE',
            },
            {
              n: '26',
              unit: '',
              label: isAr ? 'خاصية ميدانية مثبتة' : 'FIELD-PROVEN PROPERTIES',
            },
          ].map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: isAr ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: E }}
              style={{ marginBottom: '1.75rem' }}
            >
              <div
                className="font-incident"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'oklch(96% 0.008 75)',
                }}
              >
                {spec.n}
                {spec.unit && (
                  <span
                    style={{
                      fontSize: '0.35em',
                      letterSpacing: '0.1em',
                      color: 'oklch(60% 0.20 65)',
                      marginLeft: '0.3em',
                    }}
                  >
                    {spec.unit}
                  </span>
                )}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: '0.4375rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'oklch(45% 0.01 75)',
                  marginTop: '0.25rem',
                }}
              >
                {spec.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Text overlay — Phase 3: Payoff line */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 'clamp(4rem, 10vh, 7rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: phase3Opacity,
            pointerEvents: 'none',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <p
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: 'oklch(96% 0.008 75)',
              lineHeight: 1.1,
            }}
          >
            {isAr ? 'مصنوع ليثبت حيث يفشل الآخرون' : 'BUILT TO HOLD WHERE OTHERS FAIL'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
