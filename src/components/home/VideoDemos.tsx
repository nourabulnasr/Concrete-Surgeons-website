'use client'
import { useState } from 'react'
import { motion } from 'motion/react'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Provider = 'youtube' | 'vimeo'

// FIELD DEMO SLOTS
// To publish a clip, fill `provider` + `id` for a slot:
//   • YouTube (unlisted): id = the watch?v=XXXX value
//   • Vimeo: id = the numeric video id
// Leave provider/id null to keep the slot as a "coming soon" placeholder.
const demos: {
  provider: Provider | null
  id: string | null
  titleEn: string
  titleAr: string
  metaEn: string
  metaAr: string
}[] = [
  {
    provider: null,
    id: null,
    titleEn: 'High-reach demolition',
    titleAr: 'هدم عالي المدى',
    metaEn: 'Controlled teardown beside live operations',
    metaAr: 'هدم متحكم بجوار عمليات تشغيلية',
  },
  {
    provider: null,
    id: null,
    titleEn: 'HM-500 anchor installation',
    titleAr: 'تركيب مرساة HM-500',
    metaEn: 'Injection, setting and pull-out testing',
    metaAr: 'الحقن والضبط واختبار السحب',
  },
  {
    provider: null,
    id: null,
    titleEn: 'Diamond wire cutting',
    titleAr: 'القطع بالسلك الماسي',
    metaEn: 'Dust-free sectioning of reinforced concrete',
    metaAr: 'تقطيع خالٍ من الغبار للخرسانة المسلحة',
  },
]

function embedSrc(provider: Provider, id: string) {
  return provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${id}?autoplay=1`
}
function thumbSrc(provider: Provider, id: string) {
  // Vimeo needs an API call for thumbs; fall back to a neutral poster.
  return provider === 'youtube' ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  )
}

interface Props {
  lang: 'en' | 'ar'
}

export function VideoDemos({ lang }: Props) {
  const isAr = lang === 'ar'
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      data-navbar-dark="true"
      style={{
        background: 'oklch(9% 0.012 264)',
        borderTop: '1px solid oklch(20% 0.012 264)',
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(64% 0.12 264)' }}>
          {isAr ? 'لقطات ميدانية' : 'FIELD FOOTAGE'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 264)' }}>
          {isAr ? 'العمل كما يحدث' : 'THE WORK, AS IT HAPPENS'}
        </span>
      </motion.div>

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
          maxWidth: '18ch',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {isAr ? 'شاهد الطرق على أرض الواقع.' : 'Watch the methods on site.'}
      </motion.h2>

      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        {demos.map((d, i) => {
          const live = d.provider && d.id
          const isPlaying = active === i && live
          return (
            <motion.figure key={i} variants={itemVariants} style={{ margin: 0 }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  background: 'oklch(14% 0.012 264)',
                  border: '1px solid oklch(100% 0 0 / 0.08)',
                }}
              >
                {isPlaying ? (
                  <iframe
                    src={embedSrc(d.provider as Provider, d.id as string)}
                    title={isAr ? d.titleAr : d.titleEn}
                    allow="accelerated-encoder; autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  />
                ) : live ? (
                  // Click-to-load facade — keeps the page light until the user opts in.
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${isAr ? 'تشغيل' : 'Play'} — ${isAr ? d.titleAr : d.titleEn}`}
                    className="group"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', border: 0, padding: 0, background: 'transparent' }}
                  >
                    {thumbSrc(d.provider as Provider, d.id as string) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbSrc(d.provider as Provider, d.id as string)}
                        alt=""
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      />
                    )}
                    <span
                      style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'oklch(8% 0.012 264 / 0.35)', color: 'oklch(99% 0 0)',
                      }}
                    >
                      <span
                        className="group-hover:scale-110 transition-transform duration-300"
                        style={{
                          width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                          border: '1px solid oklch(99% 0 0 / 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'oklch(99% 0 0)',
                        }}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                  </button>
                ) : (
                  // Placeholder slot — awaiting client footage
                  <div
                    style={{
                      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '1rem',
                      color: 'oklch(50% 0.01 264)',
                    }}
                  >
                    <span
                      style={{
                        width: '3.25rem', height: '3.25rem', borderRadius: '50%',
                        border: '1px solid oklch(40% 0.012 264)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <PlayIcon />
                    </span>
                    <span className="font-body" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                      {isAr ? 'قريبًا' : 'COMING SOON'}
                    </span>
                  </div>
                )}
              </div>

              <figcaption style={{ marginTop: '1rem', textAlign: isAr ? 'right' : 'left' }}>
                <div
                  className="font-display uppercase"
                  style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'oklch(94% 0.008 264)', lineHeight: 1.15 }}
                >
                  {isAr ? d.titleAr : d.titleEn}
                </div>
                <p className="font-body" style={{ marginTop: '0.25rem', fontSize: '0.625rem', color: 'oklch(58% 0.01 264)', lineHeight: 1.45 }}>
                  {isAr ? d.metaAr : d.metaEn}
                </p>
              </figcaption>
            </motion.figure>
          )
        })}
      </motion.div>
    </section>
  )
}
