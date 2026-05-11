'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

const clients = [
  {
    name: 'Petrojet',
    nameAr: 'بتروجيت',
    industry: 'Oil & Gas',
    industryAr: 'نفط وغاز',
    noteEn: 'Pipeline and refinery infrastructure',
    noteAr: 'بنية تحتية لخطوط الأنابيب والمصافي',
  },
  {
    name: 'Horizon Egypt',
    nameAr: 'هورايزون مصر',
    industry: 'Real Estate',
    industryAr: 'عقارات',
    noteEn: 'Residential high-rise structural work',
    noteAr: 'أعمال إنشائية في المباني السكنية الشاهقة',
  },
  {
    name: 'Eng. Adnan Saffarini Office',
    nameAr: 'مكتب م. عدنان صفاريني',
    industry: 'Engineering Consultancy',
    industryAr: 'استشارات هندسية',
    noteEn: 'Structural assessment and retrofit',
    noteAr: 'تقييم إنشائي وتدعيم',
  },
  {
    name: 'Sika',
    nameAr: 'سيكا',
    industry: 'Construction Materials',
    industryAr: 'مواد بناء',
    noteEn: 'Certified installation partner',
    noteAr: 'شريك تركيب معتمد',
  },
  {
    name: 'Ministry of Housing',
    nameAr: 'وزارة الإسكان والمرافق',
    industry: 'Government',
    industryAr: 'قطاع حكومي',
    noteEn: 'Public infrastructure projects',
    noteAr: 'مشاريع البنية التحتية العامة',
  },
  {
    name: 'CNBM / Sinoma',
    nameAr: 'CNBM / سينوما',
    industry: 'Construction',
    industryAr: 'إنشاءات',
    noteEn: 'Industrial facility retrofitting',
    noteAr: 'تدعيم المنشآت الصناعية',
  },
  {
    name: 'GSK',
    nameAr: 'GSK',
    industry: 'Pharmaceutical',
    industryAr: 'صناعات دوائية',
    noteEn: 'High-reach selective demolition',
    noteAr: 'هدم انتقائي عالي الارتفاع',
  },
  {
    name: 'Damietta Containers & Cargo',
    nameAr: 'دمياط للحاويات والشحن',
    industry: 'Port / Logistics',
    industryAr: 'موانئ ولوجستيات',
    noteEn: 'Marine infrastructure anchoring',
    noteAr: 'تثبيت بنية تحتية بحرية',
  },
]

interface Props {
  lang: 'en' | 'ar'
  dict: Dictionary
}

export function ClientsContent({ lang, dict }: Props) {
  const isAr = lang === 'ar'

  return (
    <div className="py-16">
      <div className="container">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
          className={`flex flex-wrap gap-x-16 gap-y-4 pb-12 mb-12 border-b border-[oklch(82%_0.015_75)] ${isAr ? 'flex-row-reverse' : ''}`}
        >
          {[
            { n: String(clients.length).padStart(2, '0'), label: isAr ? 'عميل رئيسي' : 'KEY CLIENTS' },
            { n: '5+', label: isAr ? 'قطاعات' : 'SECTORS' },
            { n: '500+', label: isAr ? 'مشروع منجز' : 'PROJECTS' },
          ].map((s) => (
            <div key={s.n}>
              <div
                className="font-incident"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'oklch(12% 0.025 75)',
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
                  color: 'oklch(50% 0.01 75)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Indexed client list */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          style={{ borderTop: '1px solid oklch(82% 0.015 75)' }}
        >
          {clients.map((client, i) => {
            const name = isAr ? client.nameAr : client.name
            const industry = isAr ? client.industryAr : client.industry
            const note = isAr ? client.noteAr : client.noteEn

            return (
              <motion.div
                key={client.name}
                variants={rowVariants}
                style={{ borderBottom: '1px solid oklch(82% 0.015 75)' }}
              >
                <div
                  className="grid items-center hover:bg-[oklch(96%_0.008_75)] transition-colors duration-150"
                  style={{
                    gridTemplateColumns: 'clamp(2rem, 4vw, 3.25rem) 1fr auto',
                    gap: 'clamp(1.25rem, 2.5vw, 2.5rem)',
                    paddingBlock: 'clamp(1.25rem, 2vh, 2rem)',
                    paddingInline: 'clamp(0.5rem, 1vw, 1rem)',
                  }}
                >
                  {/* Col 1: Index (RTL: right) */}
                  <span
                    className="font-incident"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      color: 'oklch(82% 0.012 75)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Col 2: Name + note */}
                  <div>
                    <div
                      className="font-display uppercase"
                      style={{
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.875rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                        color: 'oklch(12% 0.025 75)',
                      }}
                    >
                      {name}
                    </div>
                    <p
                      className="text-stone-400 mt-1 hidden md:block"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {note}
                    </p>
                  </div>

                  {/* Col 3: Industry badge (RTL: left) */}
                  <div className="hidden sm:block flex-shrink-0">
                    <span
                      className="font-body"
                      style={{
                        fontSize: '0.5rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'oklch(60% 0.20 65)',
                        display: 'block',
                      }}
                    >
                      {industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust statement + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: E }}
          className="mt-16 pt-10 border-t border-[oklch(82%_0.015_75)]"
        >
          <p
            className="text-stone-400 text-base leading-relaxed mb-8 max-w-[560px]"
            style={{ textAlign: isAr ? 'right' : 'left' }}
          >
            {isAr
              ? 'يختارنا أفضل المقاولين في المنطقة لأننا نقدم ما نعد به — دقة تقنية لا تتنازل، توثيق كامل، وصفر مفاجآت في الموقع.'
              : "The region's best contractors choose us because we deliver what we promise — technical precision without compromise, full documentation, and zero on-site surprises."}
          </p>
          <MagneticButton strength={0.3}>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-700 uppercase tracking-widest transition-colors hover:opacity-90"
              style={{
                background: 'oklch(60% 0.20 65)',
                color: 'oklch(12% 0.025 75)',
              }}
            >
              {dict.cta.primary}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  )
}
