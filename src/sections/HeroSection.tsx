import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, MotionConfig } from 'framer-motion'
import Logo from '../components/Logo'

const ORBS = [
  { c: '#7B2CBF', size: 540, left: '8%', top: '16%', dur: 17, x: [0, 50, -30, 0], y: [0, -40, 30, 0] },
  { c: '#5A189A', size: 480, left: '68%', top: '24%', dur: 22, x: [0, -45, 35, 0], y: [0, 35, -25, 0] },
  { c: '#FF6B6B', size: 340, left: '46%', top: '78%', dur: 27, x: [0, 30, -40, 0], y: [0, -30, 20, 0] },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.2 })
        .from('.hero-logo .logo-char', { opacity: 0, y: 30, filter: 'blur(12px)', duration: 1.1, stagger: 0.08, ease: 'expo.out' })
        .from('.hero-logo .logo-media', { opacity: 0, scale: 0.6, duration: 0.7, ease: 'expo.out' }, '-=0.45')
        .from('.hero-tagline', { opacity: 0, y: 18, letterSpacing: '0.6em', duration: 1, ease: 'power3.out' }, '-=0.5')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-deep"
    >
      {/* Animated brand backdrop */}
      <MotionConfig reducedMotion="user">
        {ORBS.map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: o.size, height: o.size, left: o.left, top: o.top, background: o.c, filter: 'blur(100px)', opacity: 0.5 }}
            animate={{ x: o.x, y: o.y, scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </MotionConfig>
      <div className="absolute inset-0 iraqi-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />

      {/* Logo + tagline */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="hero-logo" style={{ filter: 'drop-shadow(0 0 60px rgba(123,44,191,0.55))' }}>
          <Logo colorClass="text-warm" className="text-[clamp(4rem,15vw,11rem)]" />
        </div>
        <p className="hero-tagline mt-7 font-body uppercase tracking-[0.35em] text-ivory/60 text-[11px] sm:text-sm">
          We shape tomorrow's brands
        </p>
      </div>
    </section>
  )
}
