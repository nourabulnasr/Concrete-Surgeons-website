'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import type { Dictionary } from '@/lib/dictionaries'
import { useIsMobile } from '@/hooks/useIsMobile'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const PARTICLE_COUNT = isMobile ? 18 : 60
    const GRAIN_COUNT = isMobile ? 200 : 800

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let t = 0
    let running = true

    function draw() {
      if (!running || !ctx || !canvas || document.hidden) {
        if (running) rafRef.current = requestAnimationFrame(draw)
        return
      }
      ctx.clearRect(0, 0, W, H)

      // Two oscillating light cones
      for (let c = 0; c < 2; c++) {
        const cx = W * (0.3 + c * 0.4) + Math.sin(t * 0.0004 + c * Math.PI) * W * 0.12
        const cy = H * 0.1
        const r = Math.min(W, H) * 1.1
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, `rgba(210, 155, 80, ${0.06 + c * 0.02})`)
        grad.addColorStop(0.4, `rgba(180, 120, 50, 0.025)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }

      // Dust particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 150, 70, ${p.opacity})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }

      // Film grain overlay
      for (let i = 0; i < GRAIN_COUNT; i++) {
        const ga = Math.random() * 0.025
        ctx.fillStyle = `rgba(255,240,200,${ga})`
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1)
      }

      t++
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    })
    ro.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [prefersReduced, isMobile])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  )
}

interface Props {
  lang: 'en' | 'ar'
  dict: Dictionary
}

export function CinematicHero({ lang, dict: _dict }: Props) {
  const isAr = lang === 'ar'
  const prefersReduced = useReducedMotion()

  const { scrollY } = useScroll()
  const rawScale = useTransform(scrollY, [0, 700], [1, 0.06])
  const scale = useSpring(rawScale, { stiffness: 120, damping: 22 })
  const numberOpacity = useTransform(scrollY, [0, 350, 550], [1, 1, 0])
  const contextOpacity = useTransform(scrollY, [0, 180, 400], [1, 0.8, 0])

  return (
    <section
      data-navbar-dark="true"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(7% 0.02 75)',
        overflow: 'hidden',
      }}
    >
      <h1 className="sr-only">
        {isAr
          ? 'جراحو الخرسانة مصر — قطع الخرسانة بالماس، الهدم الهندسي، وتوريد إيبوكسي HM-500'
          : 'Concrete Surgeons Egypt — Diamond Sawing, Controlled Demolition & HM-500 Epoxy'}
      </h1>

      {/* Video bg — src swapped when Amr's footage is ready; graceful no-op if missing */}
      {!prefersReduced && (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/hero-drilling.mp4" type="video/mp4" />
        </video>
      )}

      {!prefersReduced && <CinematicCanvas />}

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 30% 20%, oklch(18% 0.035 65 / 0.5) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(14% 0.03 70 / 0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container relative z-10"
        style={{ paddingBlock: 'clamp(6rem, 14vh, 10rem)' }}
      >
        <div className={`flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>

          {/* Section indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: E }}
            style={{ opacity: prefersReduced ? 1 : contextOpacity }}
            className={`flex items-center gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <span
              className="font-body"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'oklch(60% 0.20 65)',
              }}
            >
              01 /
            </span>
            <span
              className="font-body"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'oklch(40% 0.01 75)',
              }}
            >
              {isAr ? 'جراحو الخرسانة' : 'CONCRETE SURGEONS'}
            </span>
          </motion.div>

          {/* Hairline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: E }}
            style={{
              width: 'clamp(3rem, 8vw, 7rem)',
              height: '1px',
              background: 'oklch(25% 0.015 75)',
              transformOrigin: isAr ? 'right' : 'left',
              marginBottom: '1.5rem',
            }}
          />

          {/* Main number — scroll-compressed */}
          <motion.div
            style={{
              scale: prefersReduced ? 1 : scale,
              opacity: numberOpacity,
              transformOrigin: isAr ? 'right' : 'left',
            }}
          >
            {/* "14" and ".98" on the same line with staggered entrance */}
            <div style={{ display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
              <motion.span
                className="font-incident select-none"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: E }}
                style={{
                  fontSize: 'clamp(5rem, 22vw, 20rem)',
                  fontWeight: 900,
                  lineHeight: 0.84,
                  letterSpacing: '-0.04em',
                  color: 'oklch(96% 0.008 75)',
                }}
              >
                14
              </motion.span>
              <motion.span
                className="font-incident select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65, ease: E }}
                style={{
                  fontSize: 'clamp(5rem, 22vw, 20rem)',
                  fontWeight: 900,
                  lineHeight: 0.84,
                  letterSpacing: '-0.04em',
                  color: 'oklch(96% 0.008 75)',
                }}
              >
                .98
              </motion.span>
            </div>

            {/* Unit — amber, slides in from the left */}
            <motion.p
              className="font-incident select-none"
              initial={{ opacity: 0, x: isAr ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.05, ease: E }}
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: 'oklch(60% 0.20 65)',
                lineHeight: 1,
                marginTop: '0.5rem',
              }}
            >
              N/MM²
            </motion.p>
          </motion.div>

          {/* Project label — clip-path wipe reveal */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.7, delay: 1.45, ease: E }}
            style={{ opacity: prefersReduced ? 1 : contextOpacity, marginTop: '1.25rem' }}
          >
            <p
              className="font-body"
              style={{
                fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'oklch(55% 0.01 75)',
                lineHeight: 1.6,
              }}
            >
              {isAr
                ? 'قوة الترابط · محطة قطار السرعة نبارية-السادات الجديدة'
                : 'BONDING STRENGTH · NEW NUBARIA-ALSADAT SPEED TRAIN STATION'}
            </p>
          </motion.div>

          {/* Stats — fade-up entrance, then scroll-fade-out */}
          <motion.div style={{ opacity: prefersReduced ? 1 : contextOpacity, marginTop: '1.5rem' }}>
            <motion.p
              className="font-body"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8, ease: E }}
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'oklch(35% 0.01 75)',
                lineHeight: 2,
              }}
            >
              {isAr
                ? '١٢ شهادة دولية · ٧ مختبرات معتمدة · ١٠٠٪ نجاح في اختبار الشد'
                : '12 INTERNATIONAL CERTIFICATIONS · 7 INDEPENDENT LABS · 100% PULL-OUT PASS RATE'}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — appears after full reveal sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        aria-hidden
      >
        <span
          className="font-body"
          style={{
            fontSize: '0.4375rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'oklch(35% 0.01 75)',
          }}
        >
          {isAr ? 'تمرير' : 'SCROLL'}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: '2rem', background: 'oklch(25% 0.015 75)' }}
        />
      </motion.div>
    </section>
  )
}
