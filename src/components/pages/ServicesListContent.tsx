'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { services } from '@/lib/services'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.15 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

export function ServicesListContent({ lang, sectionLabel }: { lang: 'en' | 'ar'; sectionLabel: string }) {
  const isAr = lang === 'ar'

  const stats = [
    { n: '06', label: isAr ? 'تخصصات' : 'CAPABILITIES' },
    { n: '26', label: isAr ? 'عاماً في الميدان' : 'YEARS IN FIELD' },
    { n: '500+', label: isAr ? 'مشروع مكتمل' : 'PROJECTS DONE' },
  ]

  return (
    <div className="py-16">
      <div className="container">
        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
          className={`flex flex-wrap gap-x-16 gap-y-6 pb-14 mb-14 border-b border-[oklch(82%_0.012_264)] ${isAr ? 'flex-row-reverse' : ''}`}
        >
          {stats.map((s) => (
            <div key={s.n}>
              <div
                className="font-incident"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'oklch(12% 0.012 264)',
                  letterSpacing: '-0.03em',
                }}
              >
                {s.n}
              </div>
              <div
                className="font-body mt-1.5"
                style={{
                  fontSize: '0.5rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'oklch(50% 0.01 264)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Indexed services list */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          style={{ borderTop: '1px solid oklch(82% 0.012 264)' }}
        >
          {services.map((service, i) => {
            const name = isAr ? service.nameAr : service.nameEn
            const tagline = isAr ? service.taglineAr : service.taglineEn
            const appCount = (isAr ? service.useCasesAr : service.useCasesEn).length

            return (
              <motion.div key={service.slug} variants={rowVariants}>
                <Link
                  href={`/${lang}/services/${service.slug}`}
                  className="group block border-b border-[oklch(82%_0.012_264)]"
                >
                  <div
                    className="grid items-center transition-colors duration-150 group-hover:bg-[oklch(96%_0.008_264)]"
                    style={{
                      gridTemplateColumns: 'clamp(2.5rem, 4.5vw, 4rem) 1fr auto',
                      gap: 'clamp(1.5rem, 3vw, 3rem)',
                      paddingBlock: 'clamp(1.25rem, 2.5vh, 2.25rem)',
                      paddingInline: 'clamp(0.5rem, 1vw, 1rem)',
                    }}
                  >
                    {/* Col 1: Index number (RTL: renders on right) */}
                    <motion.span
                      layoutId={`service-num-${service.slug}`}
                      className="font-incident block group-hover:text-[oklch(41%_0.144_264)] transition-colors duration-200"
                      style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                        color: 'oklch(82% 0.012 264)',
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>

                    {/* Col 2: Name + tagline (center) */}
                    <div>
                      <motion.div
                        layoutId={`service-name-${service.slug}`}
                        className="font-display uppercase"
                        style={{
                          fontSize: 'clamp(1.3rem, 2.6vw, 2.25rem)',
                          color: 'oklch(12% 0.012 264)',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          lineHeight: 1.1,
                        }}
                      >
                        {name}
                      </motion.div>
                      <p
                        className="font-body mt-2 hidden md:block"
                        style={{
                          fontSize: '0.75rem',
                          color: 'oklch(50% 0.01 264)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {tagline}
                      </p>
                    </div>

                    {/* Col 3: app count + arrow (RTL: renders on left) */}
                    <div className="flex items-center gap-5">
                      <div className="hidden lg:block" style={{ textAlign: isAr ? 'left' : 'right' }}>
                        <div
                          className="font-body"
                          style={{
                            fontSize: '0.45rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'oklch(65% 0.01 264)',
                            marginBottom: '0.15rem',
                          }}
                        >
                          {isAr ? 'تطبيقات' : 'Applications'}
                        </div>
                        <div
                          className="font-incident"
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 900,
                            color: 'oklch(88% 0.01 264)',
                            lineHeight: 1,
                          }}
                        >
                          {String(appCount).padStart(2, '0')}
                        </div>
                      </div>
                      <span
                        className="font-body group-hover:text-[oklch(25%_0.01_264)] transition-colors"
                        style={{ fontSize: '0.875rem', color: 'oklch(60% 0.01 264)' }}
                      >
                        {isAr ? '←' : '→'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65, ease: E }}
          className="mt-14 text-sm text-[oklch(58%_0.006_264)] max-w-[520px]"
          style={{ textAlign: isAr ? 'right' : 'left' }}
        >
          {isAr
            ? 'نفذنا أكثر من 500 مشروع في مصر والخليج العربي — كل خدمة مدعومة بهندسة موثقة وضمان الأداء.'
            : 'Over 500 projects executed across Egypt and the Gulf. Every service backed by documented engineering and performance guarantees.'}
        </motion.p>
      </div>
    </div>
  )
}
