'use client'
import Image from 'next/image'
import { motion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PDF = '/docs/hm500-verification.pdf'

// Each document = a real page extracted from the HM-500 technical submittal.
// `page` maps to the page inside hm500-verification.pdf (1-based) so the link
// opens the source document at the exact page in a new tab.
const documents = [
  {
    img: '/certs/cert-1.jpg',
    page: 1,
    titleEn: 'CTC Test Report',
    titleAr: 'تقرير اختبار CTC',
    metaEn: 'Independent bonding-strength test data — HM-500',
    metaAr: 'بيانات اختبار قوة الترابط المستقلة — HM-500',
  },
  {
    img: '/certs/cert-2.jpg',
    page: 2,
    titleEn: 'Accreditation Authorities',
    titleAr: 'هيئات الاعتماد',
    metaEn: 'CTC · CNAS · ILAC-MRA · CMA',
    metaAr: 'CTC · CNAS · ILAC-MRA · CMA',
  },
  {
    img: '/certs/cert-3.jpg',
    page: 3,
    titleEn: 'CNAS & ILAC-MRA',
    titleAr: 'CNAS و ILAC-MRA',
    metaEn: 'International laboratory accreditation',
    metaAr: 'اعتماد المختبرات الدولي',
  },
  {
    img: '/certs/cert-4.jpg',
    page: 4,
    titleEn: 'CMA Accreditation',
    titleAr: 'اعتماد CMA',
    metaEn: 'China Metrology Accreditation + assessment',
    metaAr: 'اعتماد القياس الصيني + التقييم',
  },
  {
    img: '/certs/cert-5.jpg',
    page: 5,
    titleEn: 'Project Approval',
    titleAr: 'اعتماد المشروع',
    metaEn: 'Nubaria–Sadat speed-train station — review notice',
    metaAr: 'محطة قطار نبارية–السادات — إشعار مراجعة',
  },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

interface Props {
  lang: 'en' | 'ar'
}

export function CertGallery({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        background: 'oklch(98.5% 0.002 264)',
        borderTop: '1px solid oklch(87% 0.012 264)',
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span
          className="font-body"
          style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}
        >
          {isAr ? 'الوثائق' : 'THE DOCUMENTS'}
        </span>
        <span
          className="font-body hidden md:inline"
          style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 264)' }}
        >
          {isAr ? 'افتح واقرأ بنفسك' : 'OPEN AND READ THEM YOURSELF'}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: E }}
        className="font-display uppercase"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.02,
          color: 'oklch(12% 0.012 264)',
          maxWidth: '18ch',
          marginBottom: '1rem',
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {isAr ? 'الأوراق، لا الادّعاءات فقط.' : 'The paperwork, not just the claims.'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-body"
        style={{
          fontSize: '0.8125rem',
          color: 'oklch(48% 0.007 264)',
          lineHeight: 1.6,
          maxWidth: '46ch',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {isAr
          ? 'تقارير اختبار مستقلة وسجلات اعتماد نظام إيبوكسي HM-500. كل وثيقة قابلة للفتح والقراءة.'
          : 'Independent test reports and accreditation records for the HM-500 epoxy system. Every document opens in full — read it yourself.'}
      </motion.p>

      {/* Document shelf */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        {documents.map((doc, i) => (
          <motion.a
            key={doc.img}
            variants={itemVariants}
            href={`${PDF}#page=${doc.page}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            aria-label={`${isAr ? doc.titleAr : doc.titleEn} — ${isAr ? 'افتح المستند (PDF)' : 'open document (PDF)'}`}
          >
            {/* Document scan */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '1190 / 1684',
                overflow: 'hidden',
                border: '1px solid oklch(87% 0.012 264)',
                background: 'oklch(100% 0 0)',
                boxShadow: '0 1px 2px oklch(20% 0.012 264 / 0.04)',
              }}
            >
              <Image
                src={doc.img}
                alt={`${isAr ? doc.titleAr : doc.titleEn} — ${isAr ? doc.metaAr : doc.metaEn} — Concrete Surgeons HM-500`}
                fill
                sizes="(max-width: 767px) 45vw, (max-width: 1200px) 30vw, 18vw"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              {/* Hover overlay — view cue */}
              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, oklch(20% 0.04 264 / 0.55) 0%, transparent 45%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.875rem',
                }}
              >
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'oklch(99% 0 0)',
                  }}
                >
                  {isAr ? 'افتح المستند ↗' : 'VIEW DOCUMENT ↗'}
                </span>
              </div>

              {/* Index */}
              <span
                className="font-incident select-none"
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  [isAr ? 'right' : 'left']: '0.625rem',
                  fontSize: '0.875rem',
                  fontWeight: 900,
                  color: 'oklch(41% 0.144 264)',
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Caption */}
            <div style={{ marginTop: '0.875rem', textAlign: isAr ? 'right' : 'left' }}>
              <div
                className="font-display uppercase group-hover:text-[oklch(41%_0.144_264)] transition-colors duration-150"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'oklch(16% 0.011 264)',
                  lineHeight: 1.15,
                }}
              >
                {isAr ? doc.titleAr : doc.titleEn}
              </div>
              <p
                className="font-body"
                style={{
                  marginTop: '0.25rem',
                  fontSize: '0.625rem',
                  color: 'oklch(54% 0.01 264)',
                  lineHeight: 1.45,
                }}
              >
                {isAr ? doc.metaAr : doc.metaEn}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
