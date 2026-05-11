'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useReducedMotion,
  animate,
} from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── ORCHESTRATION VARIANTS ───────────────────────────────────────────────────
// Parent carries stagger — children inherit automatically (propagation)
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: E } },
}

// Clip-path wipe (RTL-aware — defined inside render so isAr is in scope)
const makeWipeVariants = (isAr: boolean) => ({
  hidden: {
    opacity: 0,
    clipPath: isAr ? 'inset(0 0% 0 100%)' : 'inset(0 100% 0 0%)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0%)',
    transition: { duration: 0.5, ease: E },
  },
})

// Spring hover variants for rows
const rowHoverVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } },
}
const rowHoverVariantsRTL = {
  rest: { x: 0 },
  hover: { x: -4, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } },
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({
  to,
  duration = 1.4,
  className,
  style,
}: {
  to: number
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) {
      count.set(to)
      return
    }
    const ctrl = animate(count, to, { duration, ease: E })
    return ctrl.stop
  }, [inView, count, to, duration, prefersReduced])

  return (
    <motion.span ref={ref} className={className} style={style}>
      {rounded}
    </motion.span>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const specRows: Array<{
  property: { en: string; ar: string }
  std: string
  hilti: string
  hm500spec: string
  hm500lab: string
  winner: boolean
}> = [
  { property: { en: 'Bonding Strength', ar: 'قوة الترابط' }, std: '≥ 11 MPa', hilti: '11.7 MPa', hm500spec: '≥ 12 MPa', hm500lab: '≥ 13 MPa', winner: true },
  { property: { en: 'Compressive Strength', ar: 'مقاومة الضغط' }, std: '≥ 60 MPa', hilti: '82.7 MPa', hm500spec: '≥ 80 MPa', hm500lab: '≥ 99 MPa', winner: true },
  { property: { en: 'Splitting Tensile Strength', ar: 'مقاومة الشد الانشقاقي' }, std: '≥ 8.5 MPa', hilti: '—', hm500spec: '≥ 10.2 MPa', hm500lab: '≥ 13 MPa', winner: false },
  { property: { en: 'Anti-Shear Strength', ar: 'مقاومة القص' }, std: '≥ 10 MPa', hilti: '—', hm500spec: '≥ 17 MPa', hm500lab: '≥ 18 MPa', winner: false },
  { property: { en: 'Heat Deflection Temperature', ar: 'درجة حرارة الانعطاف الحراري' }, std: '—', hilti: '50°C', hm500spec: '65°C', hm500lab: '—', winner: true },
  { property: { en: 'Elongation at Break', ar: 'الاستطالة عند الكسر' }, std: '—', hilti: '0.011', hm500spec: '≥ 1.2%', hm500lab: '—', winner: true },
  { property: { en: 'Compressive Modulus', ar: 'معامل الضغط' }, std: '—', hilti: '2600 MPa', hm500spec: '—', hm500lab: '—', winner: false },
  { property: { en: 'Tensile Strength', ar: 'مقاومة الشد' }, std: '—', hilti: '49.3 MPa', hm500spec: '—', hm500lab: '—', winner: false },
]

const curingRows = [
  ['-5°C', '60 min', '72 h'],
  ['0°C', '45 min', '48 h'],
  ['10°C', '30 min', '24 h'],
  ['20°C', '15 min', '12 h'],
  ['≥ 30°C', '20 min', '6 h'],
]

const certRows: Array<{
  en: string; ar: string
  authority: { en: string; ar: string }
  result: { en: string; ar: string }
}> = [
  { en: 'Safety Report', ar: 'تقرير السلامة', authority: { en: 'CTC — National Center of Quality Supervision', ar: 'المركز الوطني للإشراف على الجودة' }, result: { en: 'Pass', ar: 'اجتاز' } },
  { en: 'Non-Toxic Report', ar: 'تقرير عدم السمية', authority: { en: 'National Building Materials Test Center', ar: 'المركز الوطني لاختبار مواد البناء' }, result: { en: 'Zero benzene, xylene, VOCs', ar: 'صفر بنزين وزيلين ومركبات عضوية متطايرة' } },
  { en: 'Horizontal Flame Resistance', ar: 'مقاومة اللهب الأفقي', authority: { en: 'National Fire Systems QC Center', ar: 'مركز ضمان جودة أنظمة الحريق' }, result: { en: 'HB Level — Non-flammable', ar: 'درجة HB — غير قابل للاشتعال' } },
  { en: 'Non-Ethanediamine', ar: 'خلو من الإيثانولامين', authority: { en: 'National Building Materials Test Center', ar: 'المركز الوطني لاختبار مواد البناء' }, result: { en: 'Not detected', ar: 'غير مكتشف' } },
  { en: 'Acute Oral Toxicity', ar: 'السمية الفموية الحادة', authority: { en: 'Shanghai CDC', ar: 'مركز مكافحة أمراض شنغهاي' }, result: { en: 'LD50 > 20,000 mg/kg — Practically non-toxic', ar: 'LD50 > 20,000 ملغ/كغ — غير سام عملياً' } },
  { en: 'Welding Resistance', ar: 'مقاومة اللحام', authority: { en: 'Independent Laboratory', ar: 'مختبر مستقل' }, result: { en: 'Pass', ar: 'اجتاز' } },
  { en: 'Anchor System Fatigue Test', ar: 'اختبار إجهاد نظام المثبت', authority: { en: 'Independent Laboratory', ar: 'مختبر مستقل' }, result: { en: '100% pull-out pass guarantee', ar: 'ضمان اجتياز سحب 100%' } },
]

const techAdvantages: Array<{
  en: { title: string; body: string }
  ar: { title: string; body: string }
}> = [
  {
    en: { title: 'Vacuum-packed dual-cartridge', body: 'Vacuum filling eliminates air voids before the adhesive reaches the nozzle — the primary failure mode in low-quality epoxy anchors. Consistent quality across every batch.' },
    ar: { title: 'خرطوشة مزدوجة معبأة بالفراغ', body: 'التعبئة بالفراغ تزيل فقاعات الهواء قبل وصول اللاصق إلى الفوهة — وهو سبب الفشل الرئيسي في مثبتات الإيبوكسي الرديئة. جودة ثابتة في كل دفعة.' },
  },
  {
    en: { title: 'Nano technology (100 nm particles)', body: 'Excellent thixotropic property — stays in position when injected overhead or horizontal without sagging. Critical for the varied anchor orientations on live construction sites.' },
    ar: { title: 'تقنية النانو (100 نانومتر)', body: 'خاصية ثيكسوتروبية ممتازة — يبقى في مكانه عند الحقن فوق الرأس أو أفقياً دون تدفق. حاسم لزوايا التثبيت المتنوعة في مواقع البناء النشطة.' },
  },
  {
    en: { title: 'Elastic spheroid toughness', body: 'Rubber-like elastic particles distributed through the matrix absorb impact and vibration. HM-500 flexes under dynamic load. Standard epoxies are brittle and crack.' },
    ar: { title: 'مرونة الجسيمات الكروية', body: 'جسيمات مطاطية مرنة موزعة في المصفوفة تمتص الصدمات والاهتزازات. HM-500 يلتوي تحت الحمل الديناميكي. الإيبوكسي العادي هش وينكسر.' },
  },
]

// ─── SECTION HEADER (shared pattern) ─────────────────────────────────────────
function SectionHeader({
  number,
  label,
  descriptor,
}: {
  number: string
  label: string
  descriptor?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-baseline gap-5 mb-10"
    >
      <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
        {number}
      </span>
      <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 75)' }}>
        {label}
      </span>
      {descriptor && (
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.015 75)' }}>
          {descriptor}
        </span>
      )}
    </motion.div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function ComparisonContent({ dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const isAr = lang === 'ar'
  const c = dict.comparison
  const prefersReduced = useReducedMotion()

  // Scroll-driven hero compression
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const heroScale = useSpring(rawScale, { stiffness: 100, damping: 22 })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const wipe = makeWipeVariants(isAr)
  const arrowHover = isAr ? rowHoverVariantsRTL : rowHoverVariants

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col"
        style={{
          minHeight: '75vh',
          background: 'oklch(95% 0.01 75)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: 'clamp(6rem, 14vh, 10rem)',
          paddingBottom: 'clamp(3rem, 6vh, 5rem)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 20%, oklch(85% 0.06 75 / 0.3), transparent)' }}
        />

        <motion.div
          className="relative z-10 flex-1 flex flex-col justify-between"
          style={{
            scale: prefersReduced ? undefined : heroScale,
            opacity: prefersReduced ? undefined : heroOpacity,
          }}
        >
          {/* Section indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className={`flex items-center flex-wrap gap-5 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
              {isAr ? 'بيانات الاعتماد' : 'CERTIFICATION DATA'}
            </span>
            <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
              HM-500 / HILTI RE 500 V3
            </span>
          </motion.div>

          {/* "26" counter + vertical label */}
          <div
            className={`flex items-end gap-5 md:gap-8 my-8 md:my-12 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: E, delay: 0.3 }}
            >
              <AnimatedCounter
                to={26}
                duration={1.4}
                className="font-incident block select-none"
                style={{
                  fontSize: 'clamp(7rem, 28vw, 22rem)',
                  color: 'oklch(10% 0.025 75)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 0.88,
                }}
              />
            </motion.div>

            {/* Vertical label — desktop only */}
            {!isAr && (
              <motion.div
                className="hidden md:block pb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: E, delay: 0.7 }}
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
                  TESTED PROPERTIES
                </span>
              </motion.div>
            )}
            {isAr && (
              <motion.p
                className="pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: E, delay: 0.7 }}
                style={{ fontSize: '0.5625rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)' }}
              >
                خاصية مختبرة
              </motion.p>
            )}
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: E, delay: 0.85 }}
          >
            <div
              style={{ height: '1px', background: 'oklch(87% 0.014 75)', marginBottom: '1.5rem' }}
            />
            <p
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.875rem)',
                color: 'oklch(12% 0.025 75)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                maxWidth: '52ch',
              }}
            >
              {isAr
                ? 'سبعة مختبرات مستقلة. ست وعشرون خاصية إنشائية. صفر أرقام تسويقية.'
                : 'Seven independent laboratories. Twenty-six structural properties. Zero marketing figures.'}
            </p>
            <p
              className="font-body"
              style={{
                marginTop: '1rem',
                fontSize: '0.6875rem',
                color: 'oklch(45% 0.01 75)',
                lineHeight: 1.65,
                maxWidth: '58ch',
              }}
            >
              {c.intro}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 01 / MECHANICAL PERFORMANCE ────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          background: 'oklch(98% 0.006 80)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <SectionHeader
          number="01 /"
          label={isAr ? 'الأداء الميكانيكي' : 'MECHANICAL PERFORMANCE'}
          descriptor={isAr ? 'HM-500 مقابل Hilti RE 500 V3' : 'HM-500 VS HILTI RE 500 V3'}
        />

        {/* Table header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid mb-2"
          style={{
            gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr)',
            gap: 'clamp(0.75rem, 2vw, 2rem)',
            paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid oklch(80% 0.015 75)',
          }}
        >
          {[
            isAr ? 'الخاصية' : 'PROPERTY',
            isAr ? 'المعيار' : 'STD',
            isAr ? 'Hilti' : 'HILTI',
            'HM-500',
          ].map((h) => (
            <span key={h} className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
              {h}
            </span>
          ))}
        </motion.div>

        {/* Rows — orchestrated with stagger + clip-path wipe */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
        >
          {specRows.map((row) => (
            <motion.div
              key={row.property.en}
              variants={wipe}
              className="grid group"
              initial="rest"
              whileHover="hover"
              style={{
                gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr)',
                gap: 'clamp(0.75rem, 2vw, 2rem)',
                paddingBlock: 'clamp(0.875rem, 1.5vh, 1.25rem)',
                paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                borderTop: '1px solid oklch(89% 0.012 75)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(92% 0.015 75)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {/* Property name */}
              <div className="font-body" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9375rem)', color: 'oklch(20% 0.02 75)', fontWeight: 500, lineHeight: 1.3 }}>
                {isAr ? row.property.ar : row.property.en}
              </div>

              {/* Standard */}
              <div className="font-body" style={{ fontSize: 'clamp(0.6875rem, 1vw, 0.875rem)', color: 'oklch(32% 0.04 240)', lineHeight: 1.3 }}>
                {row.std}
              </div>

              {/* Hilti */}
              <div className="font-body" style={{ fontSize: 'clamp(0.6875rem, 1vw, 0.875rem)', color: 'oklch(40% 0.01 75)', lineHeight: 1.3 }}>
                {row.hilti}
              </div>

              {/* HM-500 — winner highlighted amber */}
              <motion.div
                variants={arrowHover}
                className="font-body flex items-center gap-2"
                style={{
                  fontSize: 'clamp(0.6875rem, 1vw, 0.875rem)',
                  color: row.winner ? 'oklch(60% 0.20 65)' : 'oklch(55% 0.04 240)',
                  fontWeight: row.winner ? 600 : 400,
                  lineHeight: 1.3,
                }}
              >
                {row.hm500lab !== '—' ? row.hm500lab : row.hm500spec}
                {row.winner && (
                  <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'oklch(42% 0.18 145)' }}>
                    {isAr ? 'أعلى' : 'LEADS'}
                  </span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-body"
          style={{ marginTop: '1.5rem', fontSize: '0.5625rem', color: 'oklch(55% 0.01 75)', lineHeight: 1.65, maxWidth: '70ch' }}
        >
          {c.disclaimer}
        </motion.p>
      </section>

      {/* ── 02 / CURING PERFORMANCE ─────────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          background: 'oklch(95% 0.01 75)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <SectionHeader
          number="02 /"
          label={isAr ? 'أداء المعالجة' : 'CURING PERFORMANCE'}
          descriptor={isAr ? 'وقت المعالجة حسب درجة الحرارة' : 'TIME BY TEMPERATURE'}
        />

        {/* Curing note */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: E }}
          className="font-body"
          style={{
            fontSize: '0.75rem',
            color: 'oklch(35% 0.01 75)',
            lineHeight: 1.65,
            maxWidth: '58ch',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}
        >
          {c.curingNote}
        </motion.p>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid mb-2"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 'clamp(1rem, 3vw, 3rem)',
            paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid oklch(80% 0.015 75)',
          }}
        >
          {[c.curingTemp, c.curingWorking, c.curingFull].map((h) => (
            <span key={h} className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
              {h}
            </span>
          ))}
        </motion.div>

        {/* Curing rows — staggered wipe */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
        >
          {curingRows.map((row, i) => (
            <motion.div
              key={i}
              variants={wipe}
              className="grid"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 'clamp(1rem, 3vw, 3rem)',
                paddingBlock: '1rem',
                paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                borderTop: '1px solid oklch(89% 0.012 75)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(92% 0.015 75)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {row.map((cell, j) => (
                <span
                  key={j}
                  className="font-body"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.1vw, 0.9375rem)',
                    color: j === 2 ? 'oklch(60% 0.20 65)' : 'oklch(62% 0.03 240)',
                    fontWeight: j === 2 ? 600 : 400,
                  }}
                >
                  {cell}
                </span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 03 / INDEPENDENT CERTIFICATIONS ─────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          background: 'oklch(98% 0.006 80)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <SectionHeader
          number="03 /"
          label={isAr ? 'الاعتمادات المستقلة' : 'INDEPENDENT CERTIFICATIONS'}
          descriptor={isAr ? 'سبعة مختبرات' : 'SEVEN LABORATORIES'}
        />

        {/* "7" counter */}
        <motion.div
          className={`flex items-end gap-5 ${isAr ? 'flex-row-reverse' : ''}`}
          style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <AnimatedCounter
            to={7}
            duration={0.9}
            className="font-incident block select-none"
            style={{
              fontSize: 'clamp(4rem, 14vw, 10rem)',
              color: 'oklch(10% 0.025 75)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 0.88,
            }}
          />
          <motion.p
            className="pb-2 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)' }}
          >
            {isAr ? 'شهادات مستقلة' : 'INDEPENDENT CERTIFICATIONS'}
          </motion.p>
        </motion.div>

        {/* Cert index — staggered fadeUp */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}
        >
          {certRows.map((cert, i) => (
            <motion.div
              key={cert.en}
              variants={fadeUpVariants}
              className="grid items-center"
              initial="rest"
              whileHover="hover"
              style={{
                gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr auto',
                gap: 'clamp(1rem, 3vw, 2.5rem)',
                paddingBlock: 'clamp(1rem, 1.5vh, 1.5rem)',
                paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                borderBottom: '1px solid oklch(87% 0.014 75)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(92% 0.015 75)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span className="font-incident block" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'oklch(80% 0.015 75)', fontWeight: 900, lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <div className="font-body" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.0625rem)', color: 'oklch(20% 0.02 75)', fontWeight: 500, lineHeight: 1.2 }}>
                  {isAr ? cert.ar : cert.en}
                </div>
                <p className="font-body mt-1 hidden md:block" style={{ fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)' }}>
                  {isAr ? cert.authority.ar : cert.authority.en}
                </p>
                <p className="font-body mt-0.5" style={{ fontSize: '0.625rem', color: 'oklch(42% 0.04 240)', lineHeight: 1.5 }}>
                  {isAr ? cert.result.ar : cert.result.en}
                </p>
              </div>

              <motion.span
                variants={arrowHover}
                className="font-body"
                style={{ fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'oklch(42% 0.18 145)' }}
              >
                {isAr ? 'اجتاز' : 'PASS'}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 04 / WHY IT PERFORMS DIFFERENTLY ────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          background: 'oklch(95% 0.01 75)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <SectionHeader
          number="04 /"
          label={isAr ? 'سبب الأداء المختلف' : 'WHY IT PERFORMS DIFFERENTLY'}
          descriptor={isAr ? 'المزايا التقنية' : 'TECHNICAL DIFFERENTIATORS'}
        />

        {/* Advantages — staggered */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}
        >
          {techAdvantages.map((adv, i) => {
            const item = isAr ? adv.ar : adv.en
            return (
              <motion.div
                key={adv.en.title}
                variants={fadeUpVariants}
                className="grid items-start py-8 md:py-10"
                style={{
                  gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr',
                  gap: 'clamp(1rem, 3vw, 2.5rem)',
                  paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
                  borderBottom: '1px solid oklch(87% 0.014 75)',
                }}
              >
                <span className="font-incident block" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'oklch(80% 0.015 75)', fontWeight: 900, lineHeight: 1, paddingTop: '0.2rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="font-display uppercase" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', color: 'oklch(12% 0.025 75)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                    {item.title}
                  </div>
                  <p className="font-body" style={{ marginTop: '0.75rem', fontSize: 'clamp(0.8125rem, 0.9vw, 0.9375rem)', color: 'oklch(45% 0.03 240)', lineHeight: 1.72, maxWidth: '58ch' }}>
                    {item.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── 05 / SPECIFY HM-500 ──────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(5rem, 10vh, 8rem)',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          background: 'oklch(98% 0.006 80)',
          borderTop: '1px solid oklch(87% 0.014 75)',
        }}
      >
        <SectionHeader
          number="05 /"
          label={isAr ? 'حدد HM-500 لمشروعك' : 'SPECIFY HM-500'}
          descriptor={isAr ? 'نحن نوفر ونركب' : 'WE SUPPLY AND INSTALL'}
        />

        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end"
          style={{ gap: 'clamp(3rem, 6vw, 6rem)' }}
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: E }}
          >
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: 'oklch(12% 0.025 75)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                lineHeight: 0.95,
              }}
            >
              {isAr ? c.ctaHeadline : c.ctaHeadline}
            </h2>
            <p
              className="font-body"
              style={{ marginTop: '1.25rem', fontSize: '0.6875rem', color: 'oklch(45% 0.01 75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {c.ctaBody}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{ minWidth: 'clamp(12rem, 18vw, 18rem)' }}
          >
            <div style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}>
              <Link
                href={`/${lang}/contact`}
                className="font-body block py-4 hover:text-[oklch(60%_0.20_65)] transition-colors duration-150"
                style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)', borderBottom: '1px solid oklch(87% 0.014 75)' }}
              >
                {isAr ? `← ${dict.cta.primary}` : `${dict.cta.primary} →`}
              </Link>
              <a
                href={`/${lang}/services/drilling-anchoring`}
                className="font-body block py-4 hover:text-[oklch(55%_0.04_240)] transition-colors duration-150"
                style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)', borderBottom: '1px solid oklch(87% 0.014 75)' }}
              >
                {isAr ? '← خدمة الحفر والتثبيت' : 'Drilling & Anchoring service →'}
              </a>
              <a
                href="tel:+201028588003"
                className="font-body block py-4 hover:text-[oklch(55%_0.04_240)] transition-colors duration-150"
                style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}
              >
                +20 102 858 8003
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
