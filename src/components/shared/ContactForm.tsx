'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/dictionaries'
import { services } from '@/lib/services'

type ContactDict = Dictionary['contact']

export function ContactForm({ dict, lang }: { dict: ContactDict; lang: 'en' | 'ar' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [honeypot, setHoneypot] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (honeypot) return // bot detected

    setStatus('loading')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white border border-[oklch(82%_0.015_75)] px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[oklch(60%_0.20_65)] transition-colors'

  const labelClass = 'block text-xs uppercase tracking-widest text-stone-500 mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>{dict.nameLabel}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={dict.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{dict.phoneLabel}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={dict.phonePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>{dict.emailLabel}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={dict.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>{dict.serviceLabel}</label>
        <select
          id="service"
          name="service"
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">{dict.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {lang === 'ar' ? s.nameAr : s.nameEn}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>{dict.projectLabel}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.projectPlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'success' && (
        <div className="px-4 py-3 bg-[oklch(92%_0.06_145)] text-sm text-green-800 rounded-sm">
          {dict.successMessage}
        </div>
      )}
      {status === 'error' && (
        <div className="px-4 py-3 bg-[oklch(95%_0.03_28)] text-sm text-red-700 rounded-sm">
          {dict.errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-[oklch(60%_0.20_65)] text-[oklch(12%_0.025_75)] text-sm font-700 uppercase tracking-widest rounded-sm hover:bg-[oklch(52%_0.20_62)] disabled:opacity-60 transition-colors"
      >
        {status === 'loading' ? '...' : dict.submitLabel}
      </button>
    </form>
  )
}
