'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CTASection({ dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const c = dict.cta
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        background: 'oklch(98% 0.006 80)',
        borderTop: '1px solid oklch(87% 0.014 75)',
      }}
    >
      {/* 05 / CONTACT */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-baseline gap-5 mb-12"
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.20 65)' }}>
          05 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 75)' }}>
          {isAr ? 'التواصل' : 'CONTACT'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.015 75)' }}>
          {isAr ? 'استجابة خلال 24 ساعة — القاهرة ومصر والخليج' : '24-HOUR RESPONSE — CAIRO, EGYPT & THE GULF'}
        </span>
      </motion.div>

      {/* Two-column layout */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end"
        style={{ gap: 'clamp(3rem, 6vw, 6rem)' }}
      >
        {/* Headline column */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: E }}
        >
          <h2
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: 'oklch(12% 0.025 75)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 0.95,
            }}
          >
            {c.headline}
          </h2>
          <p
            className="font-body"
            style={{
              marginTop: '1.5rem',
              fontSize: '0.6875rem',
              color: 'oklch(45% 0.01 75)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {c.body}
          </p>
        </motion.div>

        {/* Contact actions column */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ minWidth: 'clamp(14rem, 22vw, 20rem)' }}
        >
          <div style={{ borderTop: '1px solid oklch(87% 0.014 75)' }}>
            <a
              href="tel:+201028588003"
              className="group flex items-baseline justify-between py-4"
              style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
            >
              <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
                {isAr ? 'هاتف' : 'PHONE'}
              </span>
              <span
                className="font-body group-hover:text-[oklch(35%_0.01_75)] transition-colors duration-150"
                style={{ fontSize: '0.75rem', color: 'oklch(35% 0.01 75)', letterSpacing: '0.05em' }}
              >
                +20 102 858 8003
              </span>
            </a>

            <a
              href="https://wa.me/201028588003"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between py-4"
              style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
            >
              <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
                WHATSAPP
              </span>
              <span
                className="font-body group-hover:text-[oklch(35%_0.01_75)] transition-colors duration-150"
                style={{ fontSize: '0.75rem', color: 'oklch(35% 0.01 75)' }}
              >
                {isAr ? '← ابدأ محادثة' : 'Start a conversation →'}
              </span>
            </a>

            <a
              href="mailto:info@csmisr.com"
              className="group flex items-baseline justify-between py-4"
              style={{ borderBottom: '1px solid oklch(87% 0.014 75)' }}
            >
              <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 75)' }}>
                {isAr ? 'بريد' : 'EMAIL'}
              </span>
              <span
                className="font-body group-hover:text-[oklch(35%_0.01_75)] transition-colors duration-150"
                style={{ fontSize: '0.75rem', color: 'oklch(35% 0.01 75)', letterSpacing: '0.02em' }}
              >
                info@csmisr.com
              </span>
            </a>

            <div className="pt-6">
              <MagneticButton strength={0.28}>
                <Link
                  href={`/${lang}/contact`}
                  className="font-body"
                  style={{
                    fontSize: '0.5625rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'oklch(60% 0.20 65)',
                  }}
                >
                  {isAr ? `← ${c.primary}` : `${c.primary} →`}
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
