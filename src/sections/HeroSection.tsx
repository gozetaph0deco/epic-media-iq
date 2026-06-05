import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, MotionConfig } from 'framer-motion'
import Logo from '../components/Logo'
import { scrollToSelector, useLenis } from '../context/LenisContext'
import { useIsMobile } from '../hooks/useIsMobile'

const ORBS = [
  { c: '#7B2CBF', size: 520, left: '-6%', top: '10%', dur: 19, x: [0, 55, -25, 0], y: [0, -35, 28, 0] },
  { c: '#5A189A', size: 460, left: '72%', top: '18%', dur: 24, x: [0, -40, 30, 0], y: [0, 30, -20, 0] },
  { c: '#FF6B6B', size: 300, left: '58%', top: '72%', dur: 28, x: [0, 25, -35, 0], y: [0, -25, 18, 0] },
  { c: '#240046', size: 380, left: '28%', top: '55%', dur: 21, x: [0, 20, -15, 0], y: [0, 15, -20, 0] },
]

const SERVICES = ['Brand Identity', 'Video Production', 'Social Campaigns', 'Motion Design']

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const isMobile = useIsMobile()
  const visibleOrbs = isMobile ? ORBS.slice(0, 2) : ORBS

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.15 })
        .from('.hero-badge', { opacity: 0, y: -12, duration: 0.7, ease: 'power3.out' })
        .from('.hero-logo-inner', {
          opacity: 0,
          yPercent: 12,
          scale: 0.92,
          filter: 'blur(16px)',
          duration: 1.1,
          ease: 'expo.out',
        }, '-=0.35')
        .fromTo('.logo-burst',
          { opacity: 0, scale: 0.5 },
          { opacity: 0.85, scale: 1.45, duration: 0.45, ease: 'power2.out' }, '-=0.7')
        .to('.logo-burst', { opacity: 0, duration: 0.85, ease: 'power2.in' }, '>-0.08')
        .from('.hero-headline', {
          opacity: 0,
          y: 28,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.55')
        .from('.hero-sub', {
          opacity: 0,
          y: 18,
          duration: 0.85,
          ease: 'power3.out',
        }, '-=0.65')
        .from('.hero-arabic', {
          opacity: 0,
          y: 14,
          duration: 0.75,
          ease: 'power3.out',
        }, '-=0.55')
        .from('.hero-cta', {
          opacity: 0,
          y: 16,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.45')
        .from('.hero-service', {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        }, '-=0.35')
        .from('.hero-scroll', { opacity: 0, y: -8, duration: 0.6, ease: 'power2.out' }, '-=0.2')

      gsap.to('.hero-logo', {
        y: -8,
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.4,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center bg-deep hero-aurora"
    >
      {/* Ambient layers */}
      <MotionConfig reducedMotion="user">
        {visibleOrbs.map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none mix-blend-screen"
            style={{
              width: isMobile ? o.size * 0.65 : o.size,
              height: isMobile ? o.size * 0.65 : o.size,
              left: o.left,
              top: o.top,
              background: o.c,
              filter: isMobile ? 'blur(70px)' : 'blur(110px)',
              opacity: isMobile ? 0.32 : 0.42,
            }}
            animate={{ x: o.x, y: o.y, scale: [1, 1.12, 0.96, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </MotionConfig>

      <div className="absolute inset-0 neon-pulse-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 iraqi-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />
      <div className="absolute inset-0 hero-grain pointer-events-none" />

      {/* Decorative frame lines */}
      <div className="absolute inset-x-6 top-24 bottom-24 lg:inset-x-10 pointer-events-none hidden md:block">
        <span className="hero-frame absolute left-0 top-0 h-16 w-16 border-l border-t border-purple/25" />
        <span className="hero-frame absolute right-0 top-0 h-16 w-16 border-r border-t border-purple/25" />
        <span className="hero-frame absolute left-0 bottom-0 h-16 w-16 border-l border-b border-coral/20" />
        <span className="hero-frame absolute right-0 bottom-0 h-16 w-16 border-r border-b border-coral/20" />
      </div>

      {/* Main content */}
      <div className="container-wide relative z-10 pt-28 pb-32 lg:pt-32 lg:pb-36">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-[780px]">
          {/* Studio badge */}
          <div className="hero-badge mb-8 inline-flex items-center gap-3 rounded-full border border-purple/20 bg-deep/40 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/55">
              Baghdad · Creative Studio
            </span>
          </div>

          {/* Logo mark */}
          <div className="hero-logo hero-logo-img relative mb-6 lg:mb-8">
            <span
              aria-hidden
              className="logo-burst pointer-events-none absolute left-1/2 top-1/2 -z-10 block h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(201,166,255,0.5) 0%, rgba(123,44,191,0.35) 30%, rgba(255,107,107,0.12) 52%, transparent 68%)',
                opacity: 0,
              }}
            />
            <div className="hero-logo-inner">
              <Logo className="text-[clamp(3rem,11vw,7.5rem)]" />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline font-display font-semibold leading-[0.95] tracking-tight text-warm mb-5"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}
          >
            We shape{' '}
            <span className="hero-headline-accent">tomorrow&apos;s</span>
            <br className="hidden sm:block" />
            {' '}brands
          </h1>

          <p className="hero-sub font-body text-ivory/75 max-w-[540px] leading-relaxed mb-3 text-[clamp(0.95rem,1.4vw,1.125rem)]">
            Epic Media is a Baghdad-based creative studio — film, identity, and campaigns
            built to be watched, shared, and remembered.
          </p>

          <p
            className="hero-arabic font-arabic text-coral/70 mb-10"
            dir="rtl"
            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
          >
            نصنع العلامات التي تتحرك الناس
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <button
              type="button"
              onClick={() => scrollToSelector('#portfolio', lenis)}
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-purple px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.08em] text-warm transition-all duration-300 hover:bg-midpurple hover:shadow-glow"
            >
              View Our Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollToSelector('#contact', lenis)}
              className="hero-cta inline-flex items-center rounded-full border border-ivory/15 bg-deep/30 px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.08em] text-ivory backdrop-blur-sm transition-all duration-300 hover:border-coral/40 hover:text-coral"
            >
              Start a Project
            </button>
          </div>

          {/* Service tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            {SERVICES.map((service) => (
              <span
                key={service}
                className="hero-service rounded-full border border-purple/15 bg-purple/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory/45"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollToSelector('#showreel', lenis)}
        className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/40 transition-colors hover:text-coral/70"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Explore</span>
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-ivory/15 p-1.5">
          <span className="block h-2 w-1 rounded-full bg-coral animate-scroll-dot" />
        </span>
      </button>
    </section>
  )
}
