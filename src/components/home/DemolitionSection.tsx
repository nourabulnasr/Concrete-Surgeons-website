'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const capabilities = [
  {
    slug: 'diamond-sawing',
    en: 'Diamond Sawing',
    ar: 'القطع الماسي',
    tagEn: 'Surgical-grade cuts through any concrete thickness',
    tagAr: 'قطع بدقة جراحية عبر أي سماكة خرسانية',
  },
  {
    slug: 'controlled-demolition',
    en: 'Controlled Demolition',
    ar: 'الهدم المتحكم',
    tagEn: 'Pre-engineered sequences — what stands is protected',
    tagAr: 'تسلسلات مهندسة مسبقاً — ما يبقى محمي',
  },
  {
    slug: 'drilling-anchoring',
    en: 'Drilling & Anchoring',
    ar: 'الحفر والتثبيت',
    tagEn: 'HM-500 post-installed anchors with pull-out documentation',
    tagAr: 'مثبتات HM-500 المثبتة لاحقاً مع توثيق اختبار السحب',
  },
  {
    slug: 'structural-retrofitting',
    en: 'Structural Retrofitting',
    ar: 'التدعيم الإنشائي',
    tagEn: 'CFRP strengthening — stronger than steel at a fraction of the weight',
    tagAr: 'تدعيم CFRP — أقوى من الفولاذ بجزء من وزنه',
  },
  {
    slug: 'firestop',
    en: 'Firestop',
    ar: 'العزل الناري',
    tagEn: 'Code-compliant passive fire protection at every penetration',
    tagAr: 'حماية سلبية من الحريق متوافقة مع الكود عند كل فتحة',
  },
  {
    slug: 'concrete-polishing',
    en: 'Concrete Polishing',
    ar: 'تلميع الخرسانة',
    tagEn: 'Industrial floor rehabilitation — rough to showroom-ready',
    tagAr: 'تأهيل الأرضيات الصناعية من الخشن إلى مستوى صالة العرض',
  },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: E } },
}

interface Props { lang: 'en' | 'ar' }

export function DemolitionSection({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        background: 'oklch(97% 0.008 75)',
        borderTop: '1px solid oklch(87% 0.014 75)',
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* 03 / STRUCTURAL SERVICES */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-12 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
          03 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)' }}>
          {isAr ? 'الخدمات الإنشائية' : 'STRUCTURAL SERVICES'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(40% 0.01 75)' }}>
          {isAr ? 'ست تخصصات — مقاول واحد مسؤول' : 'SIX CAPABILITIES — ONE ACCOUNTABLE CONTRACTOR'}
        </span>
      </motion.div>

      {/* Monumental "6" — ghost behind the list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: E }}
        style={{ marginBottom: '0.5rem' }}
      >
        <span
          className="font-incident block select-none"
          style={{
            fontSize: 'clamp(6rem, 22vw, 18rem)',
            fontWeight: 900,
            lineHeight: 0.84,
            letterSpacing: '-0.04em',
            color: 'oklch(87% 0.01 75)',
          }}
        >
          6
        </span>
      </motion.div>

      {/* Capabilities tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease: E }}
        className="font-body"
        style={{
          fontSize: 'clamp(0.5rem, 0.9vw, 0.6875rem)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'oklch(50% 0.01 75)',
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
        }}
      >
        {isAr
          ? 'قطع · هدم · حفر · تدعيم · عزل ناري · تلميع'
          : 'SAWING · DEMOLITION · DRILLING · RETROFITTING · FIRESTOP · POLISHING'}
      </motion.p>

      {/* Indexed capabilities list */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}
      >
        {capabilities.map((cap, i) => (
          <motion.div key={cap.slug} variants={itemVariants}>
            <Link
              href={`/${lang}/services/${cap.slug}`}
              className="group block"
              style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
            >
              <div
                className="grid items-center py-5 md:py-6"
                style={{
                  gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr auto',
                  gap: 'clamp(1rem, 3vw, 2.5rem)',
                  paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                }}
              >
                <span
                  className="font-incident block"
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: 'oklch(80% 0.012 75)',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <div
                    className="font-display uppercase group-hover:text-[oklch(60%_0.20_65)] transition-colors duration-150"
                    style={{
                      fontSize: 'clamp(1rem, 1.8vw, 1.6rem)',
                      color: 'oklch(12% 0.025 75)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                    }}
                  >
                    {isAr ? cap.ar : cap.en}
                  </div>
                  <p
                    className="font-body mt-1 hidden md:block"
                    style={{
                      fontSize: '0.625rem',
                      color: 'oklch(54% 0.01 75)',
                      lineHeight: 1.5,
                    }}
                  >
                    {isAr ? cap.tagAr : cap.tagEn}
                  </p>
                </div>

                <span
                  className="font-body group-hover:text-[oklch(60%_0.20_65)] transition-colors duration-150"
                  style={{ fontSize: '0.75rem', color: 'oklch(48% 0.015 75)' }}
                >
                  {isAr ? '←' : '→'}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ marginTop: '2.5rem', textAlign: isAr ? 'right' : 'left' }}
      >
        <MagneticButton strength={0.25}>
          <Link
            href={`/${lang}/services`}
            className="font-body"
            style={{
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.20 65)',
            }}
          >
            {isAr ? '← كل التخصصات' : 'ALL CAPABILITIES →'}
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
