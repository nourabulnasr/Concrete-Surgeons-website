'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ServicesGrid({ dict: _dict, lang }: { dict: Dictionary; lang: 'en' | 'ar' }) {
  const isAr = lang === 'ar'

  return (
    <section
      style={{
        paddingBlock: 'clamp(5rem, 10vh, 8rem)',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        background: 'oklch(99% 0.004 264)',
        borderTop: '1px solid oklch(87% 0.012 264)',
      }}
    >
      {/* 02 / WHAT WE DO */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-baseline gap-5 mb-12 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(41% 0.144 264)' }}>
          02 /
        </span>
        <span className="font-body" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(45% 0.01 264)' }}>
          {isAr ? 'ما نقوم به' : 'WHAT WE DO'}
        </span>
        <span className="font-body hidden md:inline" style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(80% 0.012 264)' }}>
          {isAr ? 'شركتان في شركة واحدة' : 'TWO BUSINESSES. ONE COMPANY.'}
        </span>
      </motion.div>

      {/* Two business arms — equal visual weight */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderTop: '1px solid oklch(87% 0.012 264)' }}
      >
        {/* Arm 1 — Demolition & Structural */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: E }}
          style={{ borderBottom: '1px solid oklch(87% 0.012 264)' }}
        >
          <Link
            href={`/${lang}/services`}
            className="group block"
            style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', height: '100%' }}
          >
            <span
              className="font-incident block"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.84,
                letterSpacing: '-0.03em',
                color: 'oklch(91% 0.008 264)',
                marginBottom: '1.5rem',
              }}
            >
              01
            </span>
            <div
              className="font-display uppercase group-hover:text-[oklch(41%_0.144_264)] transition-colors duration-200"
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
                color: 'oklch(12% 0.012 264)',
                marginBottom: '1rem',
              }}
            >
              {isAr ? 'خدمات الهدم والتدعيم' : 'DEMOLITION & STRUCTURAL SERVICES'}
            </div>
            <p
              className="font-body"
              style={{
                fontSize: '0.625rem',
                color: 'oklch(50% 0.01 264)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              {isAr
                ? 'القطع الماسي · الهدم المتحكم · الحفر والتثبيت · التدعيم الإنشائي · العزل الناري · تلميع الخرسانة'
                : 'Diamond Sawing · Controlled Demolition · Drilling & Anchoring · Structural Retrofitting · Firestop · Concrete Polishing'}
            </p>
            <span
              className="font-body group-hover:text-[oklch(35%_0.01_264)] transition-colors duration-150"
              style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 264)' }}
            >
              {isAr ? '← كل التخصصات' : 'ALL CAPABILITIES →'}
            </span>
          </Link>
        </motion.div>

        {/* Arm 2 — HM-500 Supply */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: E }}
          style={{ borderBottom: '1px solid oklch(87% 0.012 264)' }}
        >
          <Link
            href={`/${lang}/comparison`}
            className="group block"
            style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', height: '100%' }}
          >
            <span
              className="font-incident block"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.84,
                letterSpacing: '-0.03em',
                color: 'oklch(91% 0.008 264)',
                marginBottom: '1.5rem',
              }}
            >
              02
            </span>
            <div
              className="font-display uppercase group-hover:text-[oklch(41%_0.144_264)] transition-colors duration-200"
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
                color: 'oklch(12% 0.012 264)',
                marginBottom: '1rem',
              }}
            >
              {isAr ? 'توريد HM-500 الإيبوكسي' : 'HM-500 INJECTABLE EPOXY SUPPLY'}
            </div>
            <p
              className="font-body"
              style={{
                fontSize: '0.625rem',
                color: 'oklch(50% 0.01 264)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              {isAr
                ? 'الموزع الإقليمي المعتمد لـ HORSE Construction في مصر — 12 شهادة دولية · 14.98 نيوتن/مم² على محطة القطار'
                : 'Authorized regional distributor for HORSE Construction Egypt — 12 international certifications · 14.98 N/mm² on the speed train station'}
            </p>
            <span
              className="font-body group-hover:text-[oklch(35%_0.01_264)] transition-colors duration-150"
              style={{ fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.01 264)' }}
            >
              {isAr ? '← عرض المنتج' : 'VIEW PRODUCT →'}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
