import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/epicmedia.iq' },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        once: true,
      },
    })

    tl.from('.contact-heading', {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
    .from('.contact-body', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    }, '-=0.6')
    .from('.contact-cta', {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4')
    .from('.contact-card', {
      x: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    }, '-=0.8')
    .from('.contact-arabic', {
      opacity: 0,
      duration: 1.5,
    }, '-=0.4')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad relative min-h-[80vh] overflow-hidden content-auto"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Neon pulse grid */}
      <div className="absolute inset-0 neon-pulse-grid pointer-events-none" />

      {/* Iraqi pattern */}
      <div className="absolute inset-0 iraqi-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="container-wide relative z-10 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              className="contact-heading font-display font-semibold text-warm mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                textShadow: '0 0 60px rgba(255, 107, 107, 0.3)',
                lineHeight: 0.95,
              }}
            >
              Let's Create Something Epic
            </h2>

            <p
              className="contact-body font-body leading-relaxed mb-8 max-w-[520px] mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(1.0625rem, 1.3vw, 1.25rem)', color: 'rgba(244, 241, 222, 0.85)' }}
            >
              Have a story to tell? A brand to build? A vision to bring to life? We're ready to roll cameras. Based in Baghdad, creating for the world.
            </p>

            <a
              href="mailto:hello@epicmedia.iq"
              className="contact-cta inline-flex items-center px-12 py-4 bg-coral text-warm text-base font-body font-semibold uppercase tracking-[0.05em] rounded-full hover:bg-[#FF8585] hover:shadow-coral-glow hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: '0 4px 24px rgba(255, 107, 107, 0.3)' }}
            >
              Start Your Project
            </a>
          </div>

          {/* Right Column — Contact Card */}
          <div className="relative w-full lg:w-auto lg:flex-shrink-0">
            <div
              className="contact-card glass-card p-8 lg:p-10 w-full max-w-[380px] mx-auto"
              style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-coral/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <a href="tel:07774824244" className="font-body font-medium text-base text-warm hover:text-coral transition-colors duration-300">
                    0777 482 4244
                  </a>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/40 mt-0.5">
                    Call or WhatsApp
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <a href="mailto:hello@epicmedia.iq" className="font-body font-medium text-sm text-warm hover:text-coral transition-colors duration-300">
                    hello@epicmedia.iq
                  </a>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/40 mt-0.5">
                    Email us
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-coral/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm text-ivory/80">
                    14 Ramadan St., Baghdad, Iraq
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/40 mt-0.5">
                    Find us
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-purple/10">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-ivory/5 text-ivory/60 hover:text-coral hover:bg-coral/10 hover:scale-110 transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.name === 'Instagram' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Arabic Calligraphy Decorative */}
            <div
              className="contact-arabic absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-12 pointer-events-none select-none"
              dir="rtl"
            >
              <p
                className="font-arabic font-bold"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'rgba(255, 255, 255, 0.06)',
                  textShadow: '0 0 40px rgba(123, 44, 191, 0.2)',
                  lineHeight: 1.2,
                }}
              >
                من الفكرة<br />إلى الشاشة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
