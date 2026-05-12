'use client'
import Link from 'next/link'
import { motion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const technologies = [
  {
    n: '01',
    titleEn: 'Vacuum Packing + Dual Planet Mixer',
    titleAr: 'التعبئة بالتفريغ + الخلاط الكوكبي المزدوج',
    bodyEn: 'No air bubbles. Every cartridge consistent — zero voids that cause anchor failure.',
    bodyAr: 'لا فقاعات هواء. كل خرطوشة متسقة — صفر من الفراغات التي تسبب فشل التثبيت.',
  },
  {
    n: '02',
    titleEn: 'Nano Technology (100nm particles)',
    titleAr: 'تقنية النانو (جسيمات 100 نانومتر)',
    bodyEn: 'Excellent thixotropic property — stays where applied. No sagging horizontal or vertical.',
    bodyAr: 'خاصية ثيكسوتروبية ممتازة — تبقى حيث تُطبق. لا ترهل على الأفقي أو الرأسي.',
  },
  {
    n: '03',
    titleEn: 'Elastic Spheroid Toughness Technology',
    titleAr: 'تقنية المتانة الكروية المرنة',
    bodyEn: 'Rubber-like particles absorb impact and vibration. Standard epoxies are brittle — HM-500 flexes under dynamic load.',
    bodyAr: 'جسيمات مطاطية تمتص الصدمات والاهتزازات. الإيبوكسي العادي هش — HM-500 مرن تحت الحمل الديناميكي.',
  },
  {
    n: '04',
    titleEn: 'Dual-Environment Chemistry',
    titleAr: 'كيمياء ثنائية البيئة',
    bodyEn: 'Combined hydrophilic + hydrophobic groups. Bonds in dry, damp, and wet environments. No primer required.',
    bodyAr: 'مجموعات محبة ومقاومة للماء مدمجة. تلتصق في البيئات الجافة والرطبة والمبللة. لا برايمر مطلوب.',
  },
]

const specs = [
  { labelEn: 'TENSILE STRENGTH',     labelAr: 'مقاومة الشد',     value: '≥55 MPa'      },
  { labelEn: 'COMPRESSIVE STRENGTH', labelAr: 'مقاومة الضغط',    value: '≥99 MPa'      },
  { labelEn: 'ANTI-SHEAR STRENGTH',  labelAr: 'مقاومة القص',     value: '≥18 MPa'      },
  { labelEn: 'FATIGUE RESISTANCE',   labelAr: 'مقاومة الإجهاد',  value: '2×10⁶ cycles' },
]

const techVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const techItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

interface Props { lang: 'en' | 'ar' }

export function SupplySection({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      data-navbar-dark="true"
      style={{
        background: 'oklch(9% 0.018 75)',
        borderTop: '1px solid oklch(15% 0.015 75)',
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* 04 / HM-500 SUPPLY */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-12 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
          04 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(50% 0.01 75)' }}>
          {isAr ? 'توريد HM-500' : 'HM-500 SUPPLY'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(22% 0.015 75)' }}>
          {isAr ? 'الموزع الإقليمي المعتمد — مصر' : 'AUTHORIZED REGIONAL DISTRIBUTOR · EGYPT'}
        </span>
      </motion.div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 items-start`} style={{ gap: 'clamp(4rem, 8vw, 8rem)' }}>

        {/* Left — product identity + specs */}
        <div>
          {/* "HM-500" monumental ghost */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
          >
            <span
              className="font-incident block select-none"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 11rem)',
                fontWeight: 900,
                lineHeight: 0.84,
                letterSpacing: '-0.03em',
                color: 'oklch(14% 0.02 75)',
              }}
            >
              HM-500
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: E }}
            className="font-body mt-5"
            style={{
              fontSize: 'clamp(0.5rem, 0.9vw, 0.6875rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'oklch(35% 0.01 75)',
              lineHeight: 1.8,
            }}
          >
            {isAr
              ? 'مواد لاصقة إيبوكسية قابلة للحقن عالية الأداء · ثنائية المكون · 390 مل'
              : 'HIGH PERFORMANCE INJECTABLE EPOXY ANCHOR ADHESIVE · TWO-COMPONENT · 390ML CARTRIDGE'}
          </motion.p>

          {/* Spec table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: E }}
            style={{ marginTop: '2.5rem', borderTop: '1px solid oklch(18% 0.015 75)' }}
          >
            {specs.map((s) => (
              <div
                key={s.labelEn}
                className={`flex items-baseline justify-between py-3.5 ${isAr ? 'flex-row-reverse' : ''}`}
                style={{ borderBottom: '1px solid oklch(14% 0.015 75)' }}
              >
                <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(35% 0.01 75)' }}>
                  {isAr ? s.labelAr : s.labelEn}
                </span>
                <span className="font-incident" style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)', fontWeight: 900, color: 'oklch(60% 0.20 65)', letterSpacing: '-0.01em' }}>
                  {s.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Guarantee box */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45, ease: E }}
            style={{
              marginTop: '2rem',
              padding: '1.25rem 1.5rem',
              border: '1px solid oklch(60% 0.20 65 / 0.25)',
              background: 'oklch(60% 0.20 65 / 0.04)',
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'oklch(60% 0.20 65)',
                lineHeight: 1.9,
              }}
            >
              {isAr
                ? '١٠٠٪ مضمون النجاح في أي اختبار سحب عشوائي في ظل عملية تركيب قياسية'
                : '100% GUARANTEED TO PASS ANY RANDOM PULL-OUT TEST UNDER STANDARD INSTALLATION PROCESS'}
            </p>
          </motion.div>
        </div>

        {/* Right — 4 proprietary technologies */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-body mb-8"
            style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'oklch(32% 0.01 75)' }}
          >
            {isAr ? 'أربع تقنيات احتكارية' : '4 PROPRIETARY TECHNOLOGIES'}
          </motion.p>

          <motion.div
            variants={techVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech.n}
                variants={techItem}
                style={{ borderTop: '1px solid oklch(16% 0.015 75)', paddingBlock: '1.5rem' }}
              >
                <div className={`flex gap-5 items-start ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span
                    className="font-incident shrink-0"
                    style={{ fontSize: '0.875rem', fontWeight: 900, color: 'oklch(28% 0.015 75)', letterSpacing: '-0.01em', paddingTop: '0.1rem' }}
                  >
                    {tech.n}
                  </span>
                  <div>
                    <p
                      className="font-body"
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'oklch(72% 0.01 75)',
                        lineHeight: 1.3,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {isAr ? tech.titleAr : tech.titleEn}
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: '0.625rem', color: 'oklch(40% 0.01 75)', lineHeight: 1.65 }}
                    >
                      {isAr ? tech.bodyAr : tech.bodyEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid oklch(16% 0.015 75)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ marginTop: '2.5rem' }}
          >
            <Link
              href={`/${lang}/comparison`}
              className="font-body"
              style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}
            >
              {isAr ? '← مقارنة المواصفات مع هيلتي' : 'COMPARE SPECIFICATIONS VS HILTI →'}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
