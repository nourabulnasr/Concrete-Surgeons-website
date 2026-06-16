'use client'

import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero({ dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const h = dict.hero
  const isAr = lang === 'ar'
  const prefersReduced = useReducedMotion()

  // Scroll-driven values — gated by prefersReduced at usage sites
  const { scrollY } = useScroll()

  const rawScale = useTransform(scrollY, [0, 600], [1, 0.08])
  const scale    = useSpring(rawScale, { stiffness: 120, damping: 22 })

  // "26" holds opacity until 350px, then exits by 550px
  const numberOpacity = useTransform(scrollY, [0, 350, 550], [1, 1, 0])

  // Context elements exit faster
  const contextOpacity = useTransform(scrollY, [0, 180, 400], [1, 0.8, 0])

  // Scroll cue disappears in first 150px
  const scrollCueOpacity = useTransform(scrollY, [0, 150], [1, 0])

  const scrollNumberStyle  = prefersReduced ? undefined : { scale, opacity: numberOpacity }
  const scrollContextStyle = prefersReduced ? undefined : { opacity: contextOpacity }
  const scrollCueStyle     = prefersReduced ? undefined : { opacity: scrollCueOpacity }

  return (
    <section
      className="relative min-h-svh overflow-hidden flex flex-col"
      style={{ background: 'oklch(98% 0.006 264)' }}
      aria-label="Hero"
    >
      {/* Ambient — subtle warm tint from bottom-left corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 10% 90%, oklch(80% 0.05 264 / 0.28), transparent)',
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative z-10 flex-1 flex flex-col"
        style={{
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: 'clamp(5.5rem, 12vh, 9rem)',
          paddingBottom: 'clamp(2rem, 4vh, 4rem)',
        }}
      >

        {/* Upper zone — number dominates this space */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Number row: "26" + vertical text (EN desktop) */}
          <div
            className={`flex items-end gap-4 md:gap-6 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            {/* Scroll compression wrapper — no entry animation here */}
            <motion.div style={scrollNumberStyle}>
              {/* Entry: scale-in + fade-in */}
              <motion.span
                className="font-incident block select-none"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: E, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(8.5rem, 35vw, 32rem)',
                  color: 'oklch(10% 0.012 264)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 0.88,
                }}
              >
                26
              </motion.span>
            </motion.div>

            {/* Vertical label — English only, desktop only */}
            {!isAr && (
              <motion.div
                className="hidden md:block pb-2"
                style={scrollContextStyle}
              >
                <motion.span
                  className="font-body block"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: E, delay: 0.58 }}
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'oklch(45% 0.01 264)',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  STRUCTURAL&nbsp;PROPERTIES&nbsp;TESTED
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Horizontal sub-label — mobile English + all Arabic */}
          <motion.div
            style={scrollContextStyle}
            className={!isAr ? 'md:hidden' : ''}
          >
            <motion.p
              className="font-body"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: E, delay: 0.6 }}
              style={{
                marginTop: '0.75rem',
                fontSize: '0.5625rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'oklch(45% 0.01 264)',
              }}
            >
              {isAr ? 'خاصية هندسية مختبرة' : 'STRUCTURAL PROPERTIES TESTED'}
            </motion.p>
          </motion.div>

        </div>

        {/* Lower zone — rule, indicator, body, CTAs */}
        <div style={{ marginTop: 'clamp(2rem, 4vh, 3.5rem)' }}>

          {/* Hairline rule — draws left-to-right (right-to-left in AR) */}
          <motion.div style={scrollContextStyle}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.25, ease: 'linear', delay: 0.85 }}
              style={{
                height: '1px',
                background: 'oklch(87% 0.012 264)',
                originX: isAr ? 1 : 0,
              }}
            />
          </motion.div>

          {/* Section indicator row */}
          <motion.div style={scrollContextStyle}>
            <motion.div
              className={`flex items-center flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}
              style={{ marginTop: '1.25rem', gap: '1.25rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.05 }}
            >
              <span
                className="font-body"
                style={{
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'oklch(41% 0.144 264)',
                }}
              >
                01 /
              </span>
              <span
                className="font-body"
                style={{
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'oklch(45% 0.01 264)',
                }}
              >
                {isAr ? 'مواصفات المادة' : 'MATERIAL SPECIFICATION'}
              </span>
              <span
                className="font-body"
                style={{
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'oklch(80% 0.012 264)',
                }}
              >
                {isAr ? 'جراحو الخرسانة — مصر' : 'CONCRETE SURGEONS — EGYPT'}
              </span>
            </motion.div>
          </motion.div>

          {/* Body text + CTAs */}
          <motion.div style={scrollContextStyle}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: E, delay: 1.15 }}
              style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
            >
              <p
                className="font-body"
                style={{
                  maxWidth: '52ch',
                  fontSize: 'clamp(0.8125rem, 0.5vw + 0.65rem, 0.9375rem)',
                  lineHeight: 1.72,
                  color: 'oklch(40% 0.01 264)',
                }}
              >
                {h.body}
              </p>

              <div
                className={`flex flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}
                style={{ marginTop: '2rem', gap: '1rem' }}
              >
                <Link
                  href={`/${lang}/contact`}
                  className="font-body inline-flex items-center"
                  style={{
                    padding: '0.875rem 1.5rem',
                    background: 'oklch(51% 0.207 29)',
                    color: 'oklch(99% 0 264)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'oklch(44% 0.20 29)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'oklch(51% 0.207 29)'
                  }}
                >
                  {h.cta}
                </Link>
                <Link
                  href={`/${lang}/comparison`}
                  className="font-body inline-flex items-center"
                  style={{
                    padding: '0.875rem 1.5rem',
                    border: '1px solid oklch(82% 0.012 264)',
                    color: 'oklch(45% 0.01 264)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'oklch(65% 0.01 264)'
                    e.currentTarget.style.color = 'oklch(35% 0.01 264)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'oklch(82% 0.012 264)'
                    e.currentTarget.style.color = 'oklch(45% 0.01 264)'
                  }}
                >
                  {h.ctaSecondary}
                </Link>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue — fades on first scroll movement */}
      <motion.div
        className={`absolute bottom-8 z-10 ${isAr ? 'right-[clamp(1.5rem,5vw,5rem)]' : 'left-[clamp(1.5rem,5vw,5rem)]'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.6 }}
        style={scrollCueStyle}
      >
        <motion.span
          className="font-body block"
          animate={prefersReduced ? {} : { opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '0.5625rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'oklch(55% 0.01 264)',
          }}
        >
          {isAr ? '↓ مرر' : '↓ scroll'}
        </motion.span>
      </motion.div>
    </section>
  )
}
