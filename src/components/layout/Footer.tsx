'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Dictionary } from '@/lib/dictionaries'

type FooterDict = Dictionary['footer']

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

const serviceLinks = [
  { slug: 'diamond-sawing', en: 'Diamond Sawing', ar: 'القطع الماسي' },
  { slug: 'controlled-demolition', en: 'Controlled Demolition', ar: 'الهدم المتحكم' },
  { slug: 'drilling-anchoring', en: 'Drilling & Anchoring', ar: 'الحفر والتثبيت' },
  { slug: 'structural-retrofitting', en: 'Structural Retrofitting', ar: 'التدعيم الإنشائي' },
  { slug: 'firestop', en: 'Firestop', ar: 'العزل الناري' },
  { slug: 'concrete-polishing', en: 'Concrete Polishing', ar: 'تلميع الخرسانة' },
]

export function Footer({ dict, lang }: { dict: FooterDict; lang: 'en' | 'ar' }) {
  const isAr = lang === 'ar'

  return (
    <footer
      style={{
        background: 'oklch(7% 0.012 264)',
        borderTop: '1px solid oklch(15% 0.012 264)',
      }}
    >
      {/* Monumental wordmark */}
      <div
        style={{
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: 'clamp(4rem, 8vh, 6rem)',
          paddingBottom: '2rem',
          borderBottom: '1px solid oklch(15% 0.012 264)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: E }}
        >
          <Link href={`/${lang}`} aria-label="Concrete Surgeons — Home">
            <span
              className="font-display uppercase block select-none"
              style={{
                fontSize: 'clamp(2rem, 7vw, 6.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                color: 'oklch(96% 0.008 264)',
              }}
            >
              {isAr ? 'جراحو الخرسانة' : 'Concrete Surgeons'}
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Links grid */}
      <div
        style={{
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingBlock: 'clamp(3rem, 6vh, 5rem)',
          borderBottom: '1px solid oklch(15% 0.012 264)',
        }}
      >
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-10 ${isAr ? 'text-right' : 'text-left'}`}
          style={{ gap: 'clamp(2rem, 5vw, 5rem)' }}
        >
          {/* Services */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.4375rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'oklch(41% 0.144 264)',
                marginBottom: '1.5rem',
              }}
            >
              {dict.services}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${lang}/services/${s.slug}`}
                    className="font-body transition-colors duration-150 hover:text-[oklch(92%_0.008_264)]"
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      color: 'oklch(45% 0.01 264)',
                    }}
                  >
                    {lang === 'ar' ? s.ar : s.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.4375rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'oklch(41% 0.144 264)',
                marginBottom: '1.5rem',
              }}
            >
              {dict.company}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { href: `/${lang}/about`, en: 'About Us', ar: 'من نحن' },
                { href: `/${lang}/projects`, en: 'Projects', ar: 'المشاريع' },
                { href: `/${lang}/clients`, en: 'Our Clients', ar: 'عملاؤنا' },
                { href: `/${lang}/comparison`, en: 'Why HM-500', ar: 'لماذا HM-500' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors duration-150 hover:text-[oklch(92%_0.008_264)]"
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      color: 'oklch(45% 0.01 264)',
                    }}
                  >
                    {lang === 'ar' ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.4375rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'oklch(41% 0.144 264)',
                marginBottom: '1.5rem',
              }}
            >
              {dict.contact}
            </p>
            <address className="not-italic" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span
                className="font-body"
                style={{ fontSize: '0.75rem', color: 'oklch(38% 0.01 264)', lineHeight: 1.5 }}
              >
                {dict.address}
              </span>
              <a
                href="tel:+201028588003"
                className="font-body transition-colors duration-150 hover:text-[oklch(92%_0.008_264)]"
                style={{ fontSize: '0.75rem', color: 'oklch(50% 0.01 264)', letterSpacing: '0.04em' }}
              >
                +20 102 858 8003
              </a>
              <a
                href="mailto:info@csmisr.com"
                className="font-body transition-colors duration-150 hover:text-[oklch(92%_0.008_264)]"
                style={{ fontSize: '0.75rem', color: 'oklch(50% 0.01 264)' }}
              >
                info@csmisr.com
              </a>
              <MagneticButton strength={0.22}>
                <a
                  href="https://wa.me/201028588003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body transition-colors duration-150"
                  style={{
                    display: 'inline-block',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'oklch(41% 0.144 264)',
                    border: '1px solid oklch(28% 0.012 264)',
                    padding: '0.4rem 0.75rem',
                  }}
                >
                  {isAr ? 'واتساب ←' : '→ WhatsApp'}
                </a>
              </MagneticButton>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingBlock: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <p
          className="font-body"
          style={{ fontSize: '0.4375rem', letterSpacing: '0.15em', color: 'oklch(30% 0.01 264)', textTransform: 'uppercase' }}
        >
          © {new Date().getFullYear()} Concrete Surgeons — {dict.rights}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {[
            { href: 'https://wa.me/201028588003', label: 'WhatsApp' },
            { href: 'https://www.facebook.com/ConcreteSurgeons/', label: 'Facebook' },
            { href: 'https://www.linkedin.com/in/khalid-allam-product-development-consultant/', label: 'LinkedIn' },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body transition-colors duration-150 hover:text-[oklch(65%_0.01_264)]"
              style={{ fontSize: '0.4375rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(28% 0.01 264)' }}
            >
              {s.label}
            </a>
          ))}
          <span
            className="font-body"
            style={{ fontSize: '0.4375rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(22% 0.01 264)' }}
          >
            {isAr ? 'القاهرة، مصر — ٢٠٠٧' : 'Cairo, Egypt — Est. 2007'}
          </span>
        </div>
      </div>
    </footer>
  )
}
