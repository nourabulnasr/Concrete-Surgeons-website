'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { useRef } from 'react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

const projects = [
  {
    slug: 'gsk-high-reach-demolition',
    titleEn: 'GSK — High-Reach Selective Demolition',
    titleAr: 'GSK — هدم انتقائي عالي الارتفاع',
    locationEn: 'Egypt',
    locationAr: 'مصر',
    serviceEn: 'Controlled Demolition',
    serviceAr: 'الهدم المتحكم',
    yearComplete: '2023',
    descriptionEn: 'High-reach demolition of a pharmaceutical facility while maintaining adjacent operational areas. Zero production downtime.',
    descriptionAr: 'هدم عالي الارتفاع لمنشأة صناعية دوائية مع الحفاظ على المناطق التشغيلية المجاورة. صفر توقف إنتاجي.',
    client: 'GSK',
  },
  {
    slug: 'damietta-port-anchoring',
    titleEn: 'Damietta Port — Marine Infrastructure Anchoring',
    titleAr: 'ميناء دمياط — تثبيت بنية تحتية بحرية',
    locationEn: 'Damietta, Egypt',
    locationAr: 'دمياط، مصر',
    serviceEn: 'Drilling & Anchoring',
    serviceAr: 'الحفر والتثبيت',
    yearComplete: '2023',
    descriptionEn: 'Post-installed adhesive anchoring for marine quay structures. Wet environment installation with full pull-out documentation.',
    descriptionAr: 'تثبيت لاصق لاحق لهياكل أرصفة بحرية. تركيب في بيئة رطبة مع توثيق كامل لاختبار السحب.',
    client: 'Damietta Containers & Cargo',
  },
  {
    slug: 'diamond-wire-cutting',
    titleEn: 'Diamond Wire Sawing — Structural Opening',
    titleAr: 'قطع بالسلك الماسي — فتحة إنشائية',
    locationEn: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    serviceEn: 'Diamond Sawing',
    serviceAr: 'القطع الماسي',
    yearComplete: '2023',
    descriptionEn: 'Diamond wire sawing for large structural openings in a high-rise concrete core. Dust-free, vibration-free cutting in an occupied building.',
    descriptionAr: 'قطع بالسلك الماسي لفتحات إنشائية كبيرة في قلب خرساني. قطع خالٍ من الغبار والاهتزاز في مبنى مأهول.',
    client: null,
  },
  {
    slug: 'cfrp-structural-retrofitting',
    titleEn: 'CFRP Structural Retrofitting — Commercial Tower',
    titleAr: 'تدعيم إنشائي CFRP — برج تجاري',
    locationEn: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    serviceEn: 'Structural Retrofitting',
    serviceAr: 'التدعيم الإنشائي',
    yearComplete: '2022',
    descriptionEn: 'CFRP laminate strengthening of beams and columns following structural assessment. Full load verification and documentation.',
    descriptionAr: 'تدعيم لاميناتCFRP للكمرات والأعمدة عقب التقييم الإنشائي. تحقق كامل من الحمل وتوثيق.',
    client: null,
  },
  {
    slug: 'controlled-demolition-industrial',
    titleEn: '6th of October — Industrial Selective Strip-Out',
    titleAr: 'السادس من أكتوبر — هدم انتقائي صناعي',
    locationEn: '6th of October, Egypt',
    locationAr: 'السادس من أكتوبر، مصر',
    serviceEn: 'Controlled Demolition',
    serviceAr: 'الهدم المتحكم',
    yearComplete: '2023',
    descriptionEn: 'Interior strip-out and partial slab demolition in an operational manufacturing facility using Brokk robotic demolition.',
    descriptionAr: 'هدم داخلي وهدم جزئي للألواح في منشأة تصنيع تشغيلية باستخدام روبوت بروك للهدم.',
    client: null,
  },
  {
    slug: 'rebar-anchoring-marine',
    titleEn: '840 Post-Installed Facade Anchors — 100% Pass Rate',
    titleAr: '840 مثبت واجهة مثبت لاحقاً — معدل نجاح 100%',
    locationEn: 'Egypt',
    locationAr: 'مصر',
    serviceEn: 'Drilling & Anchoring',
    serviceAr: 'الحفر والتثبيت',
    yearComplete: '2024',
    descriptionEn: '840 post-installed adhesive anchors for a façade cladding system using HM-500 epoxy. 100% pull-out test pass rate.',
    descriptionAr: '840 مثبت لاصق لاحق لنظام كسوة واجهة باستخدام إيبوكسي HM-500. معدل نجاح 100% في اختبار السحب.',
    client: null,
  },
]

function ParallaxNumber({ isAr }: { isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        className="font-incident block select-none"
        style={{
          fontSize: 'clamp(5rem, 18vw, 14rem)',
          color: 'oklch(10% 0.025 75)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 0.88,
          y,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: E }}
      >
        500+
      </motion.span>
    </div>
  )
}

export function ProjectsContent({ lang, dict }: { lang: 'en' | 'ar'; dict: Dictionary }) {
  const isAr = lang === 'ar'
  const p = dict.projects

  return (
    <div className="py-16">
      <div className="container">
        {/* Monumental number + label */}
        <div className={`flex items-end gap-6 mb-16 ${isAr ? 'flex-row-reverse' : ''}`}>
          <ParallaxNumber isAr={isAr} />
          <motion.div
            className="pb-3 hidden md:block"
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

        {/* Indexed project list */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ borderTop: '1px solid oklch(82% 0.015 75)' }}
        >
          {projects.map((project, i) => {
            const title = isAr ? project.titleAr : project.titleEn
            const location = isAr ? project.locationAr : project.locationEn
            const service = isAr ? project.serviceAr : project.serviceEn
            const description = isAr ? project.descriptionAr : project.descriptionEn

            return (
              <motion.div
                key={project.slug}
                variants={rowVariants}
                style={{ borderBottom: '1px solid oklch(82% 0.015 75)' }}
              >
                <div
                  className="grid items-start"
                  style={{
                    gridTemplateColumns: 'clamp(2.5rem, 4.5vw, 4rem) 1fr auto',
                    gap: 'clamp(1.5rem, 3vw, 3rem)',
                    paddingBlock: 'clamp(1.5rem, 2.5vh, 2.5rem)',
                    paddingInline: 'clamp(0.5rem, 1vw, 1rem)',
                  }}
                >
                  {/* Col 1: Index (RTL: right) */}
                  <span
                    className="font-incident"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      color: 'oklch(82% 0.012 75)',
                      paddingTop: '0.15rem',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Col 2: Title + description */}
                  <div>
                    <div
                      className="font-display uppercase mb-2"
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.75rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                        color: 'oklch(12% 0.025 75)',
                      }}
                    >
                      {title}
                    </div>
                    <p className="text-sm text-stone-400 leading-relaxed hidden md:block">
                      {description}
                    </p>
                  </div>

                  {/* Col 3: Meta — location · year · service (RTL: left) */}
                  <div className="hidden lg:flex flex-col items-end gap-1 pt-0.5">
                    <span
                      className="font-incident"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: 'oklch(87% 0.012 75)',
                        lineHeight: 1,
                      }}
                    >
                      {project.yearComplete}
                    </span>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '0.5rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'oklch(60% 0.20 65)',
                      }}
                    >
                      {service}
                    </span>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '0.5rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'oklch(60% 0.01 75)',
                      }}
                    >
                      {location}
                    </span>
                    {project.client && (
                      <span
                        className="font-body mt-1"
                        style={{
                          fontSize: '0.5rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'oklch(70% 0.01 75)',
                        }}
                      >
                        {project.client}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: E }}
          className="mt-16 pt-10 border-t border-[oklch(82%_0.015_75)] flex flex-col items-start gap-5"
        >
          <p className="text-stone-500 text-sm max-w-[480px]" style={{ textAlign: isAr ? 'right' : 'left' }}>
            {isAr
              ? 'هل مشروعك التالي على القائمة؟'
              : 'Is your next project on this list?'}
          </p>
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
        </motion.div>
      </div>
    </div>
  )
}
