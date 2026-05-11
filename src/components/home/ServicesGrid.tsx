'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { services } from '@/lib/services'
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

export function ServicesGrid({ dict: _dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        background: 'oklch(98% 0.006 80)',
        borderTop: '1px solid oklch(87% 0.014 75)',
      }}
    >
      {/* 02 / FIELD APPLICATIONS */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-baseline gap-5 mb-12"
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
          02 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 75)' }}>
          {isAr ? 'تخصصات الميدان' : 'FIELD APPLICATIONS'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.015 75)' }}>
          {isAr ? 'ست تخصصات — مقاول واحد مسؤول' : 'SIX CAPABILITIES — ONE ACCOUNTABLE CONTRACTOR'}
        </span>
      </motion.div>

      {/* Services index */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}
      >
        {services.map((service, i) => {
          const name = isAr ? service.nameAr : service.nameEn
          const tagline = isAr ? service.taglineAr : service.taglineEn

          return (
            <motion.div
              key={service.slug}
              variants={itemVariants}
            >
              <Link
                href={`/${lang}/services/${service.slug}`}
                className="group block"
                style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
              >
                <div
                  className="grid items-center py-6 md:py-8 group-hover:bg-[oklch(92%_0.015_75)] transition-colors duration-150"
                  style={{
                    gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr auto',
                    gap: 'clamp(1rem, 3vw, 2.5rem)',
                    paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                  }}
                >
                  {/* Index number */}
                  <motion.span
                    layoutId={`service-num-${service.slug}`}
                    className="font-incident block group-hover:text-[oklch(60%_0.20_65)] transition-colors duration-150"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                      color: 'oklch(80% 0.015 75)',
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>

                  {/* Name + tagline */}
                  <div>
                    <motion.div
                      layoutId={`service-name-${service.slug}`}
                      className="font-display uppercase"
                      style={{
                        fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
                        color: 'oklch(12% 0.025 75)',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                      }}
                    >
                      {name}
                    </motion.div>
                    <p
                      className="font-body mt-1.5 hidden md:block"
                      style={{
                        fontSize: '0.6875rem',
                        color: 'oklch(45% 0.01 75)',
                        lineHeight: 1.55,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {tagline}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span
                    className="font-body group-hover:text-[oklch(35%_0.01_75)] transition-colors duration-150"
                    style={{
                      fontSize: '0.75rem',
                      color: 'oklch(55% 0.01 75)',
                    }}
                  >
                    {isAr ? '←' : '→'}
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
        style={{ marginTop: '2.5rem', textAlign: isAr ? 'right' : 'left' }}
      >
        <Link
          href={`/${lang}/services`}
          className="font-body"
          style={{
            fontSize: '0.5625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'oklch(45% 0.01 75)',
          }}
        >
          {isAr ? '← عرض كل التخصصات' : 'View all capabilities →'}
        </Link>
      </motion.div>
    </section>
  )
}
