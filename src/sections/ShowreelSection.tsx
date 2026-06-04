import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REELS = [
  '/assets/reel1.mp4',
  '/assets/reel2.mp4',
  '/assets/reel3.mp4',
  '/assets/reel4.mp4',
  '/assets/reel5.mp4',
  '/assets/reel6.mp4',
]

const FEATURES = [
  {
    title: 'Story-Driven Production',
    description: 'Every frame serves the narrative. We script, shoot, and edit with story at the center — from short-form social content to full-scale commercial productions.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="12" width="40" height="24" rx="2" />
        <line x1="4" y1="20" x2="44" y2="20" />
        <circle cx="16" cy="16" r="2" fill="#FF6B6B" />
        <circle cx="24" cy="16" r="2" fill="#FF6B6B" />
        <line x1="14" y1="28" x2="34" y2="28" />
        <line x1="14" y1="32" x2="28" y2="32" />
      </svg>
    ),
  },
  {
    title: 'Full-Cycle Creative',
    description: 'Concept, design, production, post — all under one roof. Our end-to-end workflow means faster turnaround, consistent quality, and a single creative vision from start to finish.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" />
        <polygon points="24,10 34,16 34,28 24,34 14,28 14,16" opacity="0.5" />
        <polygon points="24,16 30,20 30,26 24,30 18,26 18,20" opacity="0.3" />
      </svg>
    ),
  },
]

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Brand Partners' },
  { value: null, text: 'Baghdad', label: 'Based in Iraq' },
]

export default function ShowreelSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState([0, 0])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 70%', once: true },
    })

    tl.from('.showreel-heading', { y: 40, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.showreel-body', { y: 20, opacity: 0, duration: 0.8, ease: 'power4.out' }, '-=0.6')
      .from('.showreel-arabic', { y: 20, opacity: 0, duration: 0.8, ease: 'power4.out' }, '-=0.55')
      .from('.showreel-card', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power4.out' }, '-=0.4')
      .from('.showreel-stat', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power4.out' }, '-=0.3')

    const countObj = { a: 0, b: 0 }
    const countTween = gsap.to(countObj, {
      a: 500,
      b: 50,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.showreel-stats-row', start: 'top 80%', once: true },
      onUpdate: () => setCounts([Math.round(countObj.a), Math.round(countObj.b)]),
    })

    return () => {
      tl.kill()
      countTween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Video grid background */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2">
        {REELS.map((src, i) => (
          <video
            key={i}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Overlays for legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,4,1,0.82) 0%, rgba(5,4,1,0.62) 40%, rgba(5,4,1,0.72) 70%, rgba(5,4,1,0.92) 100%)',
        }}
      />
      <div className="absolute inset-0 z-[1] iraqi-pattern opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-32 lg:py-40 flex flex-col items-center text-center">
        {/* Heading */}
        <h2
          className="showreel-heading font-display font-semibold text-warm mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            textShadow: '0 0 50px rgba(123, 44, 191, 0.3)',
            lineHeight: 0.95,
          }}
        >
          Where Ideas Become Reality
        </h2>

        {/* Body text */}
        <p className="showreel-body font-body text-ivory/80 max-w-[640px] leading-relaxed mb-4" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>
          From the first concept to the final post, we turn ideas into content people actually watch, share, and remember. A Baghdad studio building brands, campaigns, and identities across every screen.
        </p>

        {/* Arabic quote */}
        <p
          className="showreel-arabic font-arabic mb-12"
          dir="rtl"
          style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)', color: 'rgba(255, 107, 107, 0.6)' }}
        >
          من الفكرة إلى الواقع — نحوّل الرؤى إلى محتوى يعيشه الناس
        </p>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 w-full max-w-[800px]">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="showreel-card glass-card p-8 flex-1 text-left group hover:border-coral/40 hover:shadow-card transition-all duration-400"
            >
              <div className="mb-5 group-hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-xl text-warm mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-ivory/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="showreel-stats-row flex flex-wrap justify-center gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <div key={i} className="showreel-stat text-center">
              <p
                className="font-display font-semibold text-warm"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {stat.value !== null ? counts[i] + stat.suffix : stat.text}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ivory/50 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
