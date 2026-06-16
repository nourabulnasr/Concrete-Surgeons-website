'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: E } },
}

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
    nameEn: 'Anchor System Fatigue Test',
    nameAr: 'اختبار إجهاد نظام المثبت',
    authorityEn: 'Independent Laboratory',
    authorityAr: 'مختبر مستقل',
  },
]

export function TrustSection({ dict: _dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        background: 'oklch(95% 0.01 264)',
        borderTop: '1px solid oklch(87% 0.012 264)',
      }}
    >
      {/* 03 / CERTIFICATION RECORD */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-baseline gap-5 mb-12"
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}>
          03 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 264)' }}>
          {isAr ? 'سجل الاعتمادات' : 'CERTIFICATION RECORD'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.012 264)' }}>
          {isAr ? 'سبعة مختبرات — ست وعشرون خاصية إنشائية' : 'SEVEN LABORATORIES — TWENTY-SIX STRUCTURAL PROPERTIES'}
        </span>
      </motion.div>

      {/* Editorial statement */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, ease: E }}
        style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)', maxWidth: '64ch' }}
      >
        <p
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(1.4rem, 2.8vw, 2.5rem)',
            color: 'oklch(12% 0.012 264)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          {isAr
            ? 'سبعة مختبرات مستقلة. ست وعشرون خاصية إنشائية. نظام مثبت واحد اجتاز الكل.'
            : 'Seven independent laboratories. Twenty-six structural properties. One anchor system that passed them all.'}
        </p>
      </motion.div>

      {/* Certification index */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{ borderTop: '1px solid oklch(87% 0.012 264)' }}
      >
        {certs.map((cert, i) => {
          const name = isAr ? cert.nameAr : cert.nameEn
          const authority = isAr ? cert.authorityAr : cert.authorityEn

          return (
            <motion.div
              key={cert.nameEn}
              variants={itemVariants}
              style={{ borderBottom: '1px solid oklch(87% 0.012 264)' }}
            >
              <div
                className="grid items-center py-5 md:py-6"
                style={{
                  gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr auto',
                  gap: 'clamp(1rem, 3vw, 2.5rem)',
                  paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                }}
              >
                {/* Number */}
                <span
                  className="font-incident block"
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: 'oklch(80% 0.012 264)',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Name + authority */}
                <div>
                  <div
                    className="font-body"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.2vw, 1.0625rem)',
                      color: 'oklch(20% 0.012 264)',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {name}
                  </div>
                  <p
                    className="font-body mt-1 hidden md:block"
                    style={{
                      fontSize: '0.625rem',
                      color: 'oklch(50% 0.01 264)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {authority}
                  </p>
                </div>

                {/* Pass indicator */}
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.5625rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'oklch(42% 0.18 145)',
                  }}
                >
                  {isAr ? 'اجتاز' : 'PASS'}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* View full data */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ marginTop: '2.5rem', textAlign: isAr ? 'right' : 'left' }}
      >
        <Link
          href={`/${lang}/comparison`}
          className="font-body"
          style={{
            fontSize: '0.5625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'oklch(45% 0.01 264)',
          }}
        >
          {isAr ? '← عرض بيانات الاعتماد الكاملة' : 'View full certification data →'}
        </Link>
      </motion.div>
    </section>
  )
}
