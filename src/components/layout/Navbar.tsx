'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Dictionary } from '@/lib/dictionaries'

type NavDict = Dictionary['nav']

export function Navbar({ dict, lang }: { dict: NavDict; lang: 'en' | 'ar' }) {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const otherLang = lang === 'en' ? 'ar' : 'en'
  const darkCountRef = useRef(new Map<Element, boolean>())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect dark sections entering top half of viewport
  useEffect(() => {
    const map = darkCountRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          map.set(entry.target, entry.isIntersecting)
        }
        setIsDark([...map.values()].some(Boolean))
      },
      { threshold: 0, rootMargin: '0px 0px -50% 0px' }
    )

    const observe = () => {
      document.querySelectorAll('[data-navbar-dark]').forEach((el) => observer.observe(el))
    }

    observe()
    // Re-observe after hydration (dynamic imports may add sections later)
    const t = setTimeout(observe, 800)
    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  }, [pathname])

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

  // Contextual colors
  const bg = isDark
    ? scrolled ? 'oklch(7% 0.02 75 / 0.92)' : 'transparent'
    : scrolled ? 'oklch(98% 0.006 80 / 0.97)' : 'transparent'

  const borderColor = scrolled
    ? isDark ? 'oklch(20% 0.015 75)' : 'oklch(87% 0.014 75)'
    : 'transparent'

  const logoAccent = 'oklch(60% 0.20 65)'
  const logoText = isDark ? 'oklch(92% 0.008 75)' : 'oklch(12% 0.025 75)'
  const linkBase = isDark ? 'oklch(58% 0.01 75)' : 'oklch(45% 0.01 75)'
  const langColor = isDark ? 'oklch(45% 0.01 75)' : 'oklch(60% 0.01 75)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        zIndex: 50,
        transition: 'background 0.35s, border-color 0.35s',
        background: bg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <nav
        className="flex items-center justify-between"
        style={{
          height: '3.75rem',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* Logo */}
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
              color: logoAccent,
              transition: 'color 0.3s',
            }}
          >
            CS /
          </span>
          <span
            className="font-display uppercase group-hover:opacity-70 transition-opacity duration-200"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: logoText,
              transition: 'color 0.3s',
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
                  color: isActive ? logoAccent : linkBase,
                  transition: 'color 0.3s',
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
            className="font-body transition-colors duration-150 hover:opacity-60"
            style={{
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: langColor,
              transition: 'color 0.3s',
            }}
          >
            {dict.lang}
          </Link>
          <MagneticButton strength={0.3}>
            <Link
              href={`/${lang}/contact`}
              className="font-body"
              style={{
                display: 'block',
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
          </MagneticButton>
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
                background: menuOpen ? logoAccent : linkBase,
                transition: 'transform 0.2s ease, opacity 0.15s ease, background 0.3s ease',
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
              background: isDark ? 'oklch(10% 0.02 75 / 0.97)' : 'oklch(96% 0.008 80)',
              borderBottom: `1px solid ${isDark ? 'oklch(20% 0.015 75)' : 'oklch(87% 0.014 75)'}`,
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
                    style={{ borderBottom: `1px solid ${isDark ? 'oklch(18% 0.015 75)' : 'oklch(89% 0.012 75)'}` }}
                  >
                    <Link
                      href={href}
                      className="font-body block py-3.5"
                      style={{
                        fontSize: '0.5625rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: isActive ? logoAccent : linkBase,
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
                  style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: langColor }}
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
