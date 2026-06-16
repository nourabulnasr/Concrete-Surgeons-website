'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { services } from '@/lib/services'
import type { Service } from '@/lib/services'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const sidebarList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

const sidebarItem = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: E } },
}

interface Props {
  service: Service
  lang: 'en' | 'ar'
  currentIndex: number
  dict: Dictionary
}

export function ServiceDetailContent({ service, lang, currentIndex, dict }: Props) {
  const isAr = lang === 'ar'

  const name = isAr ? service.nameAr : service.nameEn
  const tagline = isAr ? service.taglineAr : service.taglineEn
  const description = isAr ? service.descriptionAr : service.descriptionEn
  const useCases = isAr ? service.useCasesAr : service.useCasesEn
  const process = isAr ? service.processAr : service.processEn

  const nextService = services[(currentIndex + 1) % services.length]
  const nextName = isAr ? nextService.nameAr : nextService.nameEn

  const paragraphs = description.split('\n\n')

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-0">
        <div className="container">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: E }}
            className={`flex items-center gap-2 text-xs text-[oklch(48%_0.007_264)] mb-10 uppercase tracking-widest ${isAr ? 'flex-row-reverse justify-end' : ''}`}
          >
            <Link href={`/${lang}`} className="hover:text-[oklch(38%_0.008_264)] transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-[oklch(86%_0.005_264)]">/</span>
            <Link href={`/${lang}/services`} className="hover:text-[oklch(38%_0.008_264)] transition-colors">
              {dict.services.sectionLabel}
            </Link>
            <span className="text-[oklch(86%_0.005_264)]">/</span>
            <span className="text-[oklch(58%_0.006_264)]">{name}</span>
          </motion.nav>

          {/* Hero row: monumental number + title */}
          <div className={`flex items-end gap-6 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
            <motion.span
              layoutId={`service-num-${service.slug}`}
              className="font-incident select-none hidden md:block flex-shrink-0"
              style={{
                fontSize: 'clamp(5rem, 11vw, 10rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                color: 'oklch(90% 0.01 264)',
                letterSpacing: '-0.02em',
              }}
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </motion.span>

            <div className="flex-1 pb-2">
              <motion.h1
                layoutId={`service-name-${service.slug}`}
                className="font-display uppercase"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.0,
                  color: 'oklch(12% 0.012 264)',
                  marginBottom: '0.75rem',
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                {name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, clipPath: isAr ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.65, ease: E, delay: 0.15 }}
                className="font-body"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                  color: 'oklch(41% 0.144 264)',
                  maxWidth: '600px',
                  lineHeight: 1.5,
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                {tagline}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width amber hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: E, delay: 0.25 }}
        style={{
          height: '1px',
          background: 'oklch(41% 0.144 264 / 0.4)',
          transformOrigin: isAr ? 'right' : 'left',
        }}
      />

      {/* Main content */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Description — 2/3 */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: E, delay: i * 0.08 }}
                    className="text-[oklch(48%_0.007_264)] leading-relaxed text-base"
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="space-y-10">
              {/* Use cases */}
              <div>
                <h3 className="label-eyebrow mb-5">{dict.services.useCases}</h3>
                <motion.ul
                  variants={sidebarList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {useCases.map((uc, i) => (
                    <motion.li
                      key={i}
                      variants={sidebarItem}
                      className={`flex items-start gap-3 text-sm text-[oklch(48%_0.007_264)] ${isAr ? 'flex-row-reverse' : ''}`}
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 rounded-full"
                        style={{
                          width: '4px',
                          height: '4px',
                          background: 'oklch(41% 0.144 264)',
                          display: 'inline-block',
                        }}
                      />
                      <span style={{ textAlign: isAr ? 'right' : 'left' }}>{uc}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Process */}
              <div>
                <h3 className="label-eyebrow mb-5">{dict.services.ourProcess}</h3>
                <motion.ol
                  variants={sidebarList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {process.map((step, i) => (
                    <motion.li
                      key={i}
                      variants={sidebarItem}
                      className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}
                    >
                      <span
                        className="font-display font-700 flex-shrink-0 mt-0.5"
                        style={{
                          fontSize: '0.6875rem',
                          color: 'oklch(41% 0.144 264)',
                          width: '1.25rem',
                          textAlign: isAr ? 'right' : 'left',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-sm text-[oklch(48%_0.007_264)]"
                        style={{ textAlign: isAr ? 'right' : 'left' }}
                      >
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>

              {/* CTA box */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: E }}
                className="p-6"
                style={{
                  background: 'oklch(96% 0.008 264)',
                  border: '1px solid oklch(82% 0.012 264)',
                }}
              >
                <p
                  className="text-sm text-[oklch(58%_0.006_264)] mb-4"
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  {isAr ? 'هل تحتاج هذه الخدمة؟ تواصل معنا اليوم.' : 'Need this service? Get in touch today.'}
                </p>
                <MagneticButton strength={0.25} style={{ width: '100%' }}>
                  <Link
                    href={`/${lang}/contact`}
                    className="block w-full text-center py-3 text-xs font-700 uppercase tracking-widest transition-colors hover:opacity-90"
                    style={{
                      background: 'oklch(51% 0.207 29)',
                      color: 'oklch(99% 0 264)',
                    }}
                  >
                    {dict.cta.primary}
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Next service */}
      <div style={{ borderTop: '1px solid oklch(82% 0.012 264)' }}>
        <Link
          href={`/${lang}/services/${nextService.slug}`}
          className={`group container flex items-center justify-between py-8 hover:opacity-75 transition-opacity ${isAr ? 'flex-row-reverse' : ''}`}
        >
          <span
            className="font-body"
            style={{
              fontSize: '0.5625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'oklch(55% 0.01 264)',
            }}
          >
            {isAr ? 'الخدمة التالية' : 'Next Service'}
          </span>
          <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span
              className="font-display uppercase font-700 group-hover:text-[oklch(12%_0.012_264)] transition-colors"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                color: 'oklch(45% 0.01 264)',
              }}
            >
              {nextName}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[oklch(58%_0.006_264)] group-hover:translate-x-1 transition-transform"
              style={{ transform: isAr ? 'scaleX(-1)' : undefined }}
            >
              <path
                d="M1 8h14M9 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
    </>
  )
}
