'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { useRef } from 'react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: E } },
}

const fieldEntries = [
  {
    nameEn: 'GSK Pharmaceutical — High-Reach Selective Demolition',
    nameAr: 'GSK الدوائية — هدم انتقائي عالي الارتفاع',
    detailEn: 'Operational facility · Zero production downtime · Egypt · 2023',
    detailAr: 'منشأة تشغيلية · صفر توقف إنتاجي · مصر · 2023',
  },
  {
    nameEn: 'Damietta Port — Marine Infrastructure Anchoring',
    nameAr: 'ميناء دمياط — تثبيت بنية تحتية بحرية',
    detailEn: 'Wet environment installation · HM-500 adhesive anchors · Damietta · 2023',
    detailAr: 'تركيب في بيئة رطبة · مثبتات HM-500 اللاصقة · دمياط · 2023',
  },
  {
    nameEn: '840 Façade Anchors — 100% Pull-Out Pass Rate',
    nameAr: '840 مثبت واجهة — معدل نجاح 100% في اختبار السحب',
    detailEn: 'HM-500 epoxy system · Cladding installation · Egypt · 2024',
    detailAr: 'نظام إيبوكسي HM-500 · تركيب كسوة واجهة · مصر · 2024',
  },
  {
    nameEn: 'CFRP Structural Retrofit — Cairo Commercial Tower',
    nameAr: 'تدعيم CFRP إنشائي — برج تجاري بالقاهرة',
    detailEn: 'Beam & column strengthening · Third-party load verified · Cairo · 2022',
    detailAr: 'تقوية كمرات وأعمدة · تحقق ثالث من الحمل · القاهرة · 2022',
  },
]

function ParallaxHero({ isAr }: { isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y = useSpring(rawY, { stiffness: 50, damping: 18 })

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`flex items-end gap-6 ${isAr ? 'flex-row-reverse' : ''}`}
        style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}
      >
        <motion.span
          className="font-incident block select-none"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: E }}
          style={{
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            color: 'oklch(10% 0.025 75)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.88,
            y,
          }}
        >
          500+
        </motion.span>
        <motion.div
          className="pb-2 hidden md:block"
          initial={{ opacity: 0, x: isAr ? 8 : -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: E, delay: 0.2 }}
        >
          <span
            className="font-body block"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.5625rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'oklch(50% 0.01 75)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {isAr ? 'مشاريع مكتملة' : 'PROJECTS COMPLETED'}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export function ProjectsTeaser({ dict: _dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
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
      {/* 04 / FIELD RECORD */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-baseline gap-5 mb-12"
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
          04 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 75)' }}>
          {isAr ? 'سجل الميدان' : 'FIELD RECORD'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.015 75)' }}>
          {isAr ? '500+ مشروع — مصر والخليج' : '500+ PROJECTS — EGYPT & THE GULF'}
        </span>
      </motion.div>

      {/* Parallax 500+ number */}
      <ParallaxHero isAr={isAr} />

      {/* Field entries */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}
      >
        {fieldEntries.map((entry, i) => {
          const name = isAr ? entry.nameAr : entry.nameEn
          const detail = isAr ? entry.detailAr : entry.detailEn

          return (
            <motion.div
              key={entry.nameEn}
              variants={itemVariants}
              style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
            >
              <div
                className="grid items-center py-5 md:py-6"
                style={{
                  gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr',
                  gap: 'clamp(1rem, 3vw, 2.5rem)',
                  paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                }}
              >
                <span
                  className="font-incident block"
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: 'oklch(80% 0.015 75)',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div
                    className="font-body"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.2vw, 1.0625rem)',
                      color: 'oklch(20% 0.02 75)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {name}
                  </div>
                  <p
                    className="font-body mt-1"
                    style={{
                      fontSize: '0.625rem',
                      color: 'oklch(50% 0.01 75)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ marginTop: '2.5rem', textAlign: isAr ? 'right' : 'left' }}
      >
        <Link
          href={`/${lang}/projects`}
          className="font-body"
          style={{
            fontSize: '0.5625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'oklch(45% 0.01 75)',
          }}
        >
          {isAr ? '← عرض سجل الميدان الكامل' : 'View full field record →'}
        </Link>
      </motion.div>
    </section>
  )
}
