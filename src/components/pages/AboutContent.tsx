'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: E } },
}

const timeline = [
  {
    yearEn: '2007',
    yearAr: '٢٠٠٧',
    eventEn: 'Founded in UAE — diamond sawing + controlled demolition pioneer',
    eventAr: 'التأسيس في الإمارات — رائد القطع الماسي والهدم المتحكم',
  },
  {
    yearEn: '2009–14',
    yearAr: '٢٠٠٩–١٤',
    eventEn: 'Dubai Metro, Abu Dhabi infrastructure — Gulf market benchmark',
    eventAr: 'مترو دبي، بنية تحتية أبوظبي — معيار السوق الخليجي',
  },
  {
    yearEn: '2015',
    yearAr: '٢٠١٥',
    eventEn: 'Cairo office opens — Egypt & North Africa expansion',
    eventAr: 'افتتاح مكتب القاهرة — التوسع في مصر وشمال أفريقيا',
  },
  {
    yearEn: '2024+',
    yearAr: '٢٠٢٤+',
    eventEn: 'Market leader in Egypt — 6 capabilities, 500+ projects',
    eventAr: 'الرائد في مصر — 6 تخصصات، +500 مشروع',
  },
]

interface Props {
  dict: Dictionary
  lang: 'en' | 'ar'
}

export function AboutContent({ dict, lang }: Props) {
  const isAr = lang === 'ar'
  const a = dict.about

  const values = [
    { title: a.value1Title, body: a.value1Body },
    { title: a.value2Title, body: a.value2Body },
    { title: a.value3Title, body: a.value3Body },
  ]

  return (
    <>
      {/* Cinematic dark founding-year hero */}
      <div
        data-navbar-dark="true"
        style={{
          background: 'oklch(7% 0.02 75)',
          borderBottom: '1px solid oklch(15% 0.015 75)',
          paddingTop: 'clamp(7rem, 14vh, 11rem)',
          paddingBottom: 'clamp(3rem, 6vh, 5rem)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Subtle grain overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: E }}
            className={`flex items-center gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
              —
            </span>
            <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'oklch(40% 0.01 75)' }}>
              {a.eyebrow}
            </span>
          </motion.div>

          {/* "2007" monumental */}
          <motion.div
            className={`flex items-end gap-6 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: E, delay: 0.05 }}
          >
            <span
              className="font-incident select-none"
              style={{
                fontSize: 'clamp(5rem, 16vw, 14rem)',
                fontWeight: 900,
                lineHeight: 0.84,
                color: 'oklch(96% 0.008 75)',
                letterSpacing: '-0.04em',
              }}
            >
              2007
            </span>
            <div className="pb-3 hidden md:block">
              <span
                className="font-body block"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'oklch(32% 0.01 75)',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {isAr ? 'سنة التأسيس' : 'YEAR FOUNDED'}
              </span>
            </div>
          </motion.div>

          {/* Headline + subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: E, delay: 0.18 }}
          >
            <div
              style={{
                width: 'clamp(3rem, 8vw, 6rem)',
                height: '1px',
                background: 'oklch(22% 0.015 75)',
                marginBottom: '1.5rem',
                marginInlineStart: isAr ? 'auto' : undefined,
              }}
            />
            <h1
              className="font-display font-800 uppercase"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                color: 'oklch(88% 0.008 75)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                marginBottom: '0.5rem',
                textAlign: isAr ? 'right' : 'left',
              }}
            >
              {a.headline}
            </h1>
            <p
              className="font-display font-600 uppercase"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.75rem)',
                color: 'oklch(60% 0.20 65)',
                textAlign: isAr ? 'right' : 'left',
              }}
            >
              {a.subheadline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: body + founder */}
            <div>
              <div className="space-y-6 mb-10">
                {[a.body, a.founding, a.today].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: E, delay: i * 0.08 }}
                    className={i === 0 ? 'text-lead text-stone-600 leading-relaxed' : 'text-base text-stone-500 leading-relaxed'}
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Founder callout */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: E }}
                className={`flex items-center gap-5 py-6 border-t border-[oklch(82%_0.015_75)] ${isAr ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'oklch(60% 0.20 65)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'oklch(12% 0.025 75)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  KA
                </div>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div className="text-sm font-600 text-stone-700">{a.founderName}</div>
                  <div className="text-xs text-stone-500 uppercase tracking-widest mt-0.5">{a.founderTitle}</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: E, delay: 0.1 }}
                className={`mt-8 flex flex-col sm:flex-row gap-3 ${isAr ? 'sm:flex-row-reverse' : ''}`}
              >
                <MagneticButton strength={0.3}>
                  <Link
                    href={`/${lang}/contact`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-700 uppercase tracking-widest transition-colors hover:opacity-90"
                    style={{
                      background: 'oklch(60% 0.20 65)',
                      color: 'oklch(12% 0.025 75)',
                    }}
                  >
                    {dict.cta.primary}
                  </Link>
                </MagneticButton>
                <Link
                  href={`/${lang}/projects`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-600 uppercase tracking-widest transition-colors hover:bg-[oklch(95%_0.008_75)]"
                  style={{
                    border: '1px solid oklch(82% 0.015 75)',
                    color: 'oklch(45% 0.01 75)',
                  }}
                >
                  {dict.projects.viewAll}
                </Link>
              </motion.div>
            </div>

            {/* Right: values + timeline */}
            <div>
              {/* Values */}
              <h2 className="label-eyebrow mb-6" style={{ textAlign: isAr ? 'right' : 'left' }}>
                {a.valuesHeadline}
              </h2>
              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12"
                style={{
                  borderTop: '1px solid oklch(82% 0.015 75)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  background: 'oklch(82% 0.015 75)',
                }}
              >
                {values.map(({ title, body }, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-6"
                    style={{ background: 'oklch(98% 0.006 80)' }}
                  >
                    <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span
                        className="font-incident flex-shrink-0"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: 'oklch(60% 0.20 65)',
                          lineHeight: 1.1,
                          marginTop: '0.1rem',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                        <h3
                          className="font-display font-700 uppercase mb-1.5"
                          style={{
                            fontSize: '1rem',
                            color: 'oklch(18% 0.025 75)',
                          }}
                        >
                          {title}
                        </h3>
                        <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Timeline */}
              <h3 className="label-eyebrow mb-6" style={{ textAlign: isAr ? 'right' : 'left' }}>
                {isAr ? 'التاريخ' : 'Timeline'}
              </h3>
              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ borderTop: '1px solid oklch(82% 0.015 75)' }}
              >
                {timeline.map(({ yearEn, yearAr, eventEn, eventAr }) => (
                  <motion.div
                    key={yearEn}
                    variants={itemVariants}
                    className={`flex gap-6 items-start py-4 ${isAr ? 'flex-row-reverse' : ''}`}
                    style={{ borderBottom: '1px solid oklch(92% 0.01 75)' }}
                  >
                    <span
                      className="font-incident flex-shrink-0"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 900,
                        color: 'oklch(60% 0.20 65)',
                        width: '4.5rem',
                        lineHeight: 1.2,
                        textAlign: isAr ? 'right' : 'left',
                      }}
                    >
                      {isAr ? yearAr : yearEn}
                    </span>
                    <span
                      className="text-sm text-stone-500 leading-relaxed"
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      {isAr ? eventAr : eventEn}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
