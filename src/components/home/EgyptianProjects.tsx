'use client'
import { motion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const projects = [
  {
    n: '01',
    nameEn: 'New Nubaria-Alsadat Speed Train Station',
    nameAr: 'محطة قطار السرعة نبارية-السادات الجديدة',
    consultantEn: 'ECG / SISTRA',
    consultantAr: 'ECG / SISTRA',
    standardEn: 'ASTM C900-19',
    standardAr: 'ASTM C900-19',
    resultEn: '14.98 N/mm²',
    resultAr: '14.98 نيوتن/مم²',
    modeEn: 'Steel Failure',
    modeAr: 'فشل الفولاذ',
    isPass: true,
  },
  {
    n: '02',
    nameEn: 'Smart Village Conference Center',
    nameAr: 'مركز مؤتمرات القرية الذكية',
    consultantEn: 'SG Consultant / BOREC',
    consultantAr: 'SG Consultant / BOREC',
    standardEn: 'ECP 208-2005 / ASTM E488',
    standardAr: 'ECP 208-2005 / ASTM E488',
    resultEn: '35t pull-out',
    resultAr: '35 طن سحب',
    modeEn: 'Steel Failure',
    modeAr: 'فشل الفولاذ',
    isPass: true,
  },
  {
    n: '03',
    nameEn: 'CY Shield Administrative Building, Fifth Settlement',
    nameAr: 'مبنى CY Shield الإداري، التجمع الخامس',
    consultantEn: 'INSPIRE / AACE · Ain Shams Univ.',
    consultantAr: 'INSPIRE / AACE · جامعة عين شمس',
    standardEn: 'EN 1881:2006',
    standardAr: 'EN 1881:2006',
    resultEn: '12 specimens',
    resultAr: '12 عينة',
    modeEn: 'Steel / Concrete Failure',
    modeAr: 'فشل الفولاذ / الخرسانة',
    isPass: true,
  },
  {
    n: '04',
    nameEn: 'Sadat Express Train Station',
    nameAr: 'محطة قطار السادات السريع',
    consultantEn: 'SYSTRA / ECG · Cairo University',
    consultantAr: 'SYSTRA / ECG · جامعة القاهرة',
    standardEn: 'BS 5080-1 / BS 8539:2012',
    standardAr: 'BS 5080-1 / BS 8539:2012',
    resultEn: '6 rebars tested',
    resultAr: '6 قضبان مختبرة',
    modeEn: 'Steel Failure',
    modeAr: 'فشل الفولاذ',
    isPass: true,
  },
  {
    n: '05',
    nameEn: '40 West Hotel — SODIC Hospitality',
    nameAr: '40 ويست هوتيل — SODIC للضيافة',
    consultantEn: 'KAF Consultant',
    consultantAr: 'KAF Consultant',
    standardEn: 'Material Approval',
    standardAr: 'اعتماد المواد',
    resultEn: 'All batches approved',
    resultAr: 'جميع الدفعات معتمدة',
    modeEn: 'Approved',
    modeAr: 'معتمد',
    isPass: true,
  },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: E } },
}

interface Props { lang: 'en' | 'ar' }

export function EgyptianProjects({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        background: 'oklch(99% 0.004 264)',
        borderTop: '1px solid oklch(87% 0.012 264)',
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* 05 / VERIFIED IN THE FIELD */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}>
          05 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 264)' }}>
          {isAr ? 'مثبت ميدانياً' : 'VERIFIED IN THE FIELD'}
        </span>
      </motion.div>

      {/* Statement */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: E }}
        style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <h2
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(1.35rem, 3vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.015em',
            lineHeight: 1.05,
            color: 'oklch(12% 0.012 264)',
          }}
        >
          {isAr
            ? 'خمسة مشاريع. خمسة مختبرات مستقلة.\nنتيجة واحدة: فشل الفولاذ.'
            : 'FIVE PROJECTS. FIVE INDEPENDENT LABS.\nONE RESULT: STEEL FAILURE.'}
        </h2>
        <p
          className="font-body mt-3"
          style={{
            fontSize: '0.625rem',
            color: 'oklch(50% 0.01 264)',
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            maxWidth: '58ch',
          }}
        >
          {isAr
            ? '"فشل الفولاذ" يعني أن الترابط أقوى من الفولاذ نفسه. يستسلم الحديد قبل أن يتخلى الإيبوكسي.'
            : '"Steel Failure" means the bond outlasted the steel itself. The rebar yields before the epoxy lets go.'}
        </p>
      </motion.div>

      {/* Projects list */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{ borderTop: '1px solid oklch(87% 0.012 264)' }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.n}
            variants={itemVariants}
            style={{ borderBottom: '1px solid oklch(87% 0.012 264)' }}
          >
            <div
              className="grid items-start py-5 md:py-7"
              style={{
                gridTemplateColumns: 'clamp(2rem, 4vw, 3.5rem) 1fr auto',
                gap: 'clamp(1rem, 3vw, 2.5rem)',
                paddingInline: 'clamp(0.25rem, 1vw, 0.75rem)',
              }}
            >
              {/* Index */}
              <span
                className="font-incident block"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  color: 'oklch(82% 0.012 264)',
                  fontWeight: 900,
                  lineHeight: 1,
                  paddingTop: '0.1rem',
                }}
              >
                {p.n}
              </span>

              {/* Name + meta */}
              <div>
                <div
                  className="font-display uppercase"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.6vw, 1.35rem)',
                    color: 'oklch(12% 0.012 264)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    marginBottom: '0.5rem',
                  }}
                >
                  {isAr ? p.nameAr : p.nameEn}
                </div>
                <div className={`flex flex-wrap gap-x-3 gap-y-0.5 items-center ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'oklch(55% 0.01 264)' }}>
                    {isAr ? p.consultantAr : p.consultantEn}
                  </span>
                  <span style={{ color: 'oklch(80% 0.012 264)', fontSize: '0.375rem' }}>·</span>
                  <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'oklch(60% 0.01 264)' }}>
                    {isAr ? p.standardAr : p.standardEn}
                  </span>
                </div>
              </div>

              {/* Result + badge */}
              <div style={{ textAlign: isAr ? 'left' : 'right', flexShrink: 0 }}>
                <div
                  className="font-incident"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)',
                    fontWeight: 900,
                    color: 'oklch(41% 0.144 264)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isAr ? p.resultAr : p.resultEn}
                </div>
                <div
                  style={{
                    marginTop: '0.35rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.2rem 0.45rem',
                    background: 'oklch(42% 0.18 145 / 0.08)',
                    border: '1px solid oklch(42% 0.18 145 / 0.28)',
                  }}
                >
                  <span
                    className="font-body"
                    style={{ fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'oklch(42% 0.18 145)', whiteSpace: 'nowrap' }}
                  >
                    {isAr ? p.modeAr : p.modeEn}
                  </span>
                  <span style={{ color: 'oklch(42% 0.18 145)', fontSize: '0.4rem' }}>✓</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
