'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const pillars = [
  {
    n: '01',
    titleEn: 'Installed by our own crews',
    titleAr: 'تركيب بأطقمنا الخاصة',
    bodyEn: 'No subcontracting, no substitutions. The team that quotes the work is the team that delivers it.',
    bodyAr: 'بلا تعهيد خارجي وبلا بدائل. الفريق الذي يسعّر العمل هو الفريق الذي ينفّذه.',
  },
  {
    n: '02',
    titleEn: 'Documented pull-out testing',
    titleAr: 'اختبار سحب موثّق',
    bodyEn: 'Every critical anchor installation is tested and documented — a 100% pull-out pass record.',
    bodyAr: 'كل تثبيت مرساة حرج يُختبر ويُوثّق — سجل نجاح 100% في اختبار السحب.',
  },
  {
    n: '03',
    titleEn: 'Certified HM-500 material',
    titleAr: 'مادة HM-500 معتمدة',
    bodyEn: 'Twelve international certifications across seven independent laboratories — verifiable on request.',
    bodyAr: 'اثنتا عشرة شهادة دولية عبر سبعة مختبرات مستقلة — قابلة للتحقق عند الطلب.',
  },
]

const specs = [
  { en: 'CARTRIDGE', ar: 'الخرطوشة', value: '390 ml' },
  { en: 'MIX RATIO', ar: 'نسبة الخلط', value: '3 : 1' },
  { en: 'VISCOSITY', ar: 'اللزوجة', value: '18–22 Pa·s' },
  { en: 'CURED DENSITY', ar: 'الكثافة بعد التصلب', value: '1.5 g/cm³' },
  { en: 'SHELF LIFE', ar: 'مدة الصلاحية', value: '≥12 mo' },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

interface Props {
  lang: 'en' | 'ar'
}

export function QualityPrice({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        background: 'oklch(95% 0.008 264)',
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
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}>
          {isAr ? 'الجودة والقيمة' : 'QUALITY & VALUE'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 264)' }}>
          {isAr ? 'التسعير حسب المشروع' : 'PRICED PER PROJECT'}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: 'clamp(3rem, 7vw, 7rem)' }}>
        {/* Left — statement + pillars */}
        <div>
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
              marginBottom: '1.25rem',
              textAlign: isAr ? 'right' : 'left',
            }}
          >
            {isAr ? 'مُصمّم وفق المواصفة. مُسعّر حسب المشروع.' : 'Engineered to spec. Priced per project.'}
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
              lineHeight: 1.7,
              maxWidth: '46ch',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
              textAlign: isAr ? 'right' : 'left',
            }}
          >
            {isAr
              ? 'لا نعرض أسعارًا ثابتة — كل هيكل مختلف. نسعّر العمل حسب نطاقه وموقعه وجدوله، ونضمن جودة لا تتغيّر مهما كان السعر.'
              : 'We don’t publish fixed prices — every structure is different. We quote by scope, site and schedule, and the quality never changes with the number.'}
          </motion.p>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ borderTop: '1px solid oklch(87% 0.012 264)' }}
          >
            {pillars.map((p) => (
              <motion.div
                key={p.n}
                variants={itemVariants}
                style={{ borderBottom: '1px solid oklch(87% 0.012 264)', paddingBlock: '1.5rem' }}
              >
                <div className={`flex gap-5 items-start ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span
                    className="font-incident shrink-0"
                    style={{ fontSize: '0.875rem', fontWeight: 900, color: 'oklch(41% 0.144 264)', letterSpacing: '-0.01em', paddingTop: '0.1rem' }}
                  >
                    {p.n}
                  </span>
                  <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <p className="font-body" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'oklch(14% 0.012 264)', lineHeight: 1.3, marginBottom: '0.4rem' }}>
                      {isAr ? p.titleAr : p.titleEn}
                    </p>
                    <p className="font-body" style={{ fontSize: '0.6875rem', color: 'oklch(54% 0.01 264)', lineHeight: 1.6 }}>
                      {isAr ? p.bodyAr : p.bodyEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — spec card + quote CTA */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: E }}
            style={{ background: 'oklch(99% 0.004 264)', border: '1px solid oklch(87% 0.012 264)', padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            <p
              className="font-body"
              style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'oklch(52% 0.01 264)', marginBottom: '1.5rem' }}
            >
              {isAr ? 'مواصفات HM-500 الفنية' : 'HM-500 TECHNICAL DATA'}
            </p>

            <div style={{ borderTop: '1px solid oklch(87% 0.012 264)' }}>
              {specs.map((s) => (
                <div
                  key={s.en}
                  className={`flex items-baseline justify-between py-3 ${isAr ? 'flex-row-reverse' : ''}`}
                  style={{ borderBottom: '1px solid oklch(87% 0.012 264)' }}
                >
                  <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(54% 0.01 264)' }}>
                    {isAr ? s.ar : s.en}
                  </span>
                  <span className="font-incident" style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.15rem)', fontWeight: 900, color: 'oklch(41% 0.144 264)', letterSpacing: '-0.01em' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote CTA — no prices, drive to contact */}
            <div style={{ marginTop: '2rem' }}>
              <Link
                href={`/${lang}/contact`}
                className="block w-full text-center py-4 font-body transition-colors duration-150"
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'oklch(99% 0 0)',
                  background: 'oklch(51% 0.207 29)',
                }}
              >
                {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
              </Link>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <MagneticButton strength={0.22}>
                  <Link
                    href={`/${lang}/comparison`}
                    className="font-body"
                    style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}
                  >
                    {isAr ? '← المواصفات الكاملة' : 'SEE FULL SPECIFICATIONS →'}
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
