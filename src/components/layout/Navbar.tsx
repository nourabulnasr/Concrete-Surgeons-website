'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'

type NavDict = Dictionary['nav']

export function Navbar({ dict, lang }: { dict: NavDict; lang: 'en' | 'ar' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const otherLang = lang === 'en' ? 'ar' : 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const links = [
    { href: `/${lang}/services`, label: dict.services },
    { href: `/${lang}/projects`, label: dict.projects },
    { href: `/${lang}/clients`, label: dict.clients },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'oklch(98% 0.006 80 / 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(87% 0.014 75)' : '1px solid transparent',
      }}
    >
      <nav
        className="flex items-center justify-between"
        style={{
          height: '3.75rem',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* Logo — pure wordmark, no icon box */}
        <Link
          href={`/${lang}`}
          className="group flex items-center gap-2.5"
          aria-label="Concrete Surgeons — Home"
        >
          <span
            className="font-body"
            style={{
              fontSize: '0.4375rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.20 65)',
            }}
          >
            CS /
          </span>
          <span
            className="font-display uppercase group-hover:text-[oklch(60%_0.20_65)] transition-colors duration-200"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'oklch(12% 0.025 75)',
            }}
          >
            {lang === 'ar' ? 'جراحو الخرسانة' : 'Concrete Surgeons'}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="font-body transition-colors duration-150"
                style={{
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: isActive ? 'oklch(60% 0.20 65)' : 'oklch(45% 0.01 75)',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href={`/${otherLang}`}
            className="font-body transition-colors duration-150 hover:text-[oklch(40%_0.01_75)]"
            style={{
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.01 75)',
            }}
          >
            {dict.lang}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="font-body"
            style={{
              padding: '0.6rem 1.25rem',
              background: 'oklch(60% 0.20 65)',
              color: 'oklch(12% 0.025 75)',
              fontSize: '0.5625rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'background 0.15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'oklch(52% 0.20 62)' }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'oklch(60% 0.20 65)' }}
          >
            {dict.getQuote}
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center gap-[5px] p-2"
        >
          {([0, 1, 2] as const).map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '1.125rem',
                height: '1px',
                background: menuOpen ? 'oklch(60% 0.20 65)' : 'oklch(45% 0.01 75)',
                transition: 'transform 0.2s ease, opacity 0.15s ease, background 0.15s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden"
            style={{
              background: 'oklch(96% 0.008 80)',
              borderBottom: '1px solid oklch(87% 0.014 75)',
            }}
          >
            <div style={{ paddingInline: 'clamp(1.5rem, 5vw, 5rem)', paddingBlock: '1.25rem' }}>
              {links.map(({ href, label }, i) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.15 }}
                    style={{ borderBottom: '1px solid oklch(89% 0.012 75)' }}
                  >
                    <Link
                      href={href}
                      className="font-body block py-3.5"
                      style={{
                        fontSize: '0.5625rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: isActive ? 'oklch(60% 0.20 65)' : 'oklch(40% 0.01 75)',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="flex items-center justify-between pt-5">
                <Link
                  href={`/${otherLang}`}
                  className="font-body"
                  style={{
                    fontSize: '0.5625rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'oklch(60% 0.01 75)',
                  }}
                >
                  {dict.lang}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="font-body"
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: 'oklch(60% 0.20 65)',
                    color: 'oklch(12% 0.025 75)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {dict.getQuote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
