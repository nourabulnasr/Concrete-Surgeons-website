'use client'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Flagship product media. The real two-cartridge cutout ships today.
// To upgrade to a true turntable later, set PRODUCT_VIDEO to the clip path
// (e.g. '/videos/hm500-turntable.mp4') — the section swaps <img> → <video>
// with no other changes.
const PRODUCT_IMAGE = '/products/hm500-cartridges.png'
const PRODUCT_VIDEO: string | null = null

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

  // Scroll-driven product reveal: rise + settle, gentle parallax, subtle 3D tilt.
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.04, 1.0])
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20 })
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y = useSpring(rawY, { stiffness: 45, damping: 20 })
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])

  // Text phase opacities
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.38, 0.5], [0, 1, 1, 0])
  const phase2Opacity = useTransform(scrollYProgress, [0.42, 0.52, 0.78, 0.88], [0, 1, 1, 0])
  const phase3Opacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  if (isMobile || prefersReduced) {
    return (
      <section
        style={{
          background: 'oklch(99% 0.004 264)',
          padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid oklch(87% 0.012 264)',
        }}
      >
        <div className="container">
          <p
            className="font-body"
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'oklch(51% 0.207 29)',
              marginBottom: '1.5rem',
            }}
          >
            {isAr ? 'المنتج الرئيسي' : 'FLAGSHIP PRODUCT'}
          </p>

          <Image
            src={PRODUCT_IMAGE}
            alt={isAr
              ? 'خرطوشتا إيبوكسي HORSE HM-500 لتثبيت المراسي'
              : 'HORSE HM-500 injectable epoxy anchor adhesive — twin cartridges'}
            width={463}
            height={752}
            sizes="(max-width: 767px) 60vw, 320px"
            style={{ width: 'auto', height: 'clamp(16rem, 50vw, 22rem)', marginBottom: '2rem' }}
          />

          <h2
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'oklch(12% 0.012 264)',
              whiteSpace: 'pre-line',
            }}
          >
            {isAr ? 'نظام التثبيت\nHM-500' : 'HM-500\nANCHOR SYSTEM'}
          </h2>
          <p
            className="font-body mt-6"
            style={{
              fontSize: '0.875rem',
              color: 'oklch(45% 0.01 264)',
              lineHeight: 1.7,
              maxWidth: '42ch',
            }}
          >
            {isAr
              ? 'مقاومة شد ≥ 13 ميغاباسكال — ≥ 99 ميغاباسكال ضغطي — تصلب كامل 6 ساعات عند ≥30°م'
              : '≥13 MPa bond strength — ≥99 MPa compressive — 6-hr full cure at ≥30°C'}
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
      aria-label={isAr ? 'عرض منتج HM-500' : 'HM-500 product reveal'}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          background: 'oklch(8% 0.012 264)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid oklch(18% 0.012 264)',
          perspective: '1400px',
        }}
      >
        {/* Floor glow — grounds the product on the dark stage */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 45% 55% at 50% 52%, oklch(20% 0.03 29 / 0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Product media — swappable img/video, scroll-driven reveal */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            scale,
            y,
            rotateY,
            opacity: mediaOpacity,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 30px 50px oklch(0% 0 0 / 0.55))',
          }}
        >
          {PRODUCT_VIDEO ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ height: 'min(72vh, 660px)', width: 'auto', display: 'block' }}
            >
              <source src={PRODUCT_VIDEO} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={PRODUCT_IMAGE}
              alt={isAr
                ? 'خرطوشتا إيبوكسي HORSE HM-500 لتثبيت المراسي'
                : 'HORSE HM-500 injectable epoxy anchor adhesive — twin cartridges'}
              width={463}
              height={752}
              priority={false}
              sizes="(max-width: 1200px) 40vh, 660px"
              style={{ height: 'min(72vh, 660px)', width: 'auto', display: 'block' }}
            />
          )}
        </motion.div>

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
              color: 'oklch(51% 0.207 29)',
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
              color: 'oklch(96% 0.008 264)',
              whiteSpace: 'pre-line',
            }}
          >
            {isAr ? 'نظام التثبيت\nHM-500' : 'HM-500\nANCHOR SYSTEM'}
          </h2>
        </motion.div>

        {/* Scroll hint — vertical writing */}
        <motion.div
          style={{
            position: 'absolute',
            [isAr ? 'left' : 'right']: 'clamp(1.5rem, 3vw, 3rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: scrollHintOpacity,
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
              color: 'oklch(52% 0.01 264)',
            }}
          >
            {isAr ? '← مرر' : 'scroll →'}
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
            { n: '≥13', unit: 'MPa', label: isAr ? 'مقاومة شد' : 'BOND STRENGTH' },
            { n: '≥99', unit: 'MPa', label: isAr ? 'ضغط محوري' : 'COMPRESSIVE' },
            { n: '6', unit: 'HRS', label: isAr ? 'تصلب كامل ≥30°C' : 'FULL CURE AT ≥30°C' },
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
                  color: 'oklch(96% 0.008 264)',
                }}
              >
                {spec.n}
                {spec.unit && (
                  <span
                    style={{
                      fontSize: '0.35em',
                      letterSpacing: '0.1em',
                      color: 'oklch(51% 0.207 29)',
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
                  color: 'oklch(58% 0.01 264)',
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
              color: 'oklch(96% 0.008 264)',
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
