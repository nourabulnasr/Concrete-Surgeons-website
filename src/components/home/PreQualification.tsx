'use client'
import Image from 'next/image'
import { motion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Real project photographs pulled from the Concrete Surgeons company profile.
const work = [
  { img: '/projects/prequal/demolition-branded.jpg', w: 749, h: 406, en: 'High-reach demolition', ar: 'هدم عالي المدى' },
  { img: '/projects/prequal/demolition-highreach.jpg', w: 642, h: 736, en: 'Selective structural demolition', ar: 'هدم إنشائي انتقائي' },
  { img: '/projects/prequal/marine-quay.jpg', w: 752, h: 435, en: 'Marine quay construction', ar: 'إنشاء أرصفة بحرية' },
  { img: '/projects/prequal/tunnel-boring.jpg', w: 752, h: 366, en: 'Tunnel infrastructure', ar: 'بنية تحتية للأنفاق' },
  { img: '/projects/prequal/structural-reinforcement.jpg', w: 749, h: 562, en: 'Structural reinforcement', ar: 'تدعيم إنشائي' },
  { img: '/projects/prequal/demolition-aerial.jpg', w: 749, h: 546, en: 'Controlled building demolition', ar: 'هدم مبانٍ متحكم' },
  { img: '/projects/prequal/diamond-cutting.jpg', w: 733, h: 680, en: 'Diamond wire cutting', ar: 'قطع بالسلك الماسي' },
  { img: '/projects/prequal/tunnel-interior.jpg', w: 749, h: 473, en: 'Underground works', ar: 'أعمال تحت الأرض' },
]

// Client / authority logos — lead with the strongest names.
const clients = [
  { logo: '/clients/gsk.png', alt: 'GSK GlaxoSmithKline — high-reach selective demolition client' },
  { logo: '/clients/petrojet.png', alt: 'Petrojet — oil & gas infrastructure client' },
  { logo: '/clients/ministry-housing.png', alt: 'Ministry of Housing Egypt — government infrastructure client' },
  { logo: '/clients/sika.png', alt: 'Sika — certified installation partner' },
  { logo: '/clients/cnbm-sinoma.png', alt: 'CNBM / Sinoma — industrial construction client' },
  { logo: '/clients/dchc.jpeg', alt: 'Damietta Containers & Cargo — port infrastructure client' },
  { logo: '/clients/horizon-egypt.png', alt: 'Horizon Egypt — real estate developer client' },
  { logo: '/clients/saffarini.png', alt: 'Eng. Adnan Saffarini Office — structural engineering consultancy' },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: E } },
}

interface Props {
  lang: 'en' | 'ar'
}

export function PreQualification({ lang }: Props) {
  const isAr = lang === 'ar'

  return (
    <section
      data-navbar-dark="true"
      style={{
        background: 'oklch(10% 0.012 264)',
        borderTop: '1px solid oklch(20% 0.012 264)',
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
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(64% 0.12 264)' }}>
          {isAr ? 'التأهيل المسبق' : 'PRE-QUALIFICATION'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 264)' }}>
          {isAr ? 'مصر والخليج — منذ 2007' : 'EGYPT & THE GULF — SINCE 2007'}
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
          color: 'oklch(96% 0.008 264)',
          maxWidth: '20ch',
          marginBottom: '1rem',
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {isAr ? 'مؤهّلون مسبقًا لأعمالٍ لا تحتمل الفشل.' : 'Pre-qualified for work that cannot fail.'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-body"
        style={{
          fontSize: '0.8125rem',
          color: 'oklch(62% 0.01 264)',
          lineHeight: 1.6,
          maxWidth: '52ch',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {isAr
          ? 'هدم وأنفاق وأعمال بحرية وإنشائية منفّذة على أصعب المواقع في مصر والخليج.'
          : 'Demolition, tunnelling, marine and structural works delivered on Egypt and the Gulf’s most demanding sites.'}
      </motion.p>

      {/* Project photo wall — editorial masonry */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="columns-1 sm:columns-2 lg:columns-3"
        style={{ columnGap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
      >
        {work.map((p) => (
          <motion.figure
            key={p.img}
            variants={itemVariants}
            className="group relative break-inside-avoid"
            style={{ margin: 0, marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)', overflow: 'hidden', border: '1px solid oklch(100% 0 0 / 0.08)' }}
          >
            <Image
              src={p.img}
              alt={`${isAr ? p.ar : p.en} — Concrete Surgeons Egypt project`}
              width={p.w}
              height={p.h}
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <figcaption
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem',
                background: 'linear-gradient(to top, oklch(8% 0.012 264 / 0.85) 0%, transparent 55%)',
              }}
            >
              <span
                className="font-body"
                style={{
                  fontSize: '0.5625rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'oklch(99% 0 0)',
                }}
              >
                {isAr ? p.ar : p.en}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {/* Client logo band — light inset so marks stay legible on dark */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: E }}
        style={{
          marginTop: 'clamp(2.5rem, 5vh, 4rem)',
          background: 'oklch(97% 0.006 264)',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <p
          className="font-body"
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'oklch(48% 0.007 264)',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          {isAr ? 'موثوق من' : 'TRUSTED BY'}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          {clients.map((c) => (
            <Image
              key={c.logo}
              src={c.logo}
              alt={c.alt}
              width={140}
              height={48}
              sizes="140px"
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              style={{ width: 'auto', height: 'clamp(28px, 4vw, 40px)', objectFit: 'contain' }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
