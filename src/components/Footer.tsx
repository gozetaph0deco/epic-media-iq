import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from './Logo'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/epicmedia.iq' },
  { name: 'TikTok', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'Behance', href: '#' },
]

const navLinks = [
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Services', href: '#showreel' },
  { label: 'About', href: '#showreel' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.from(footer.querySelectorAll('.footer-col'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        once: true,
      },
    })
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative bg-deep border-t border-purple/15 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="flex items-center mb-4">
              <Logo colorClass="text-ivory" className="text-3xl" />
            </div>
            <p className="font-display font-semibold text-xl text-ivory mb-2">Epic Media IQ</p>
            <p className="font-body text-sm text-ivory/50 leading-relaxed mb-2">
              We shape tomorrow's brands.<br />
              Baghdad — 14 Ramadan St., Iraq
            </p>
            <p className="font-arabic text-[13px] text-ivory/40" dir="rtl">
              نصنع علامات الغد
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-coral mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Contact Column */}
          <div className="footer-col">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-coral mb-6">Connect</p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-purple/20 text-ivory/60 hover:text-coral hover:border-coral/40 transition-all duration-300">
                    {link.name === 'Instagram' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    )}
                    {link.name === 'TikTok' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.4 0 .78.08 1.13.22v-3.5a6.37 6.37 0 00-1.13-.11A6.34 6.34 0 003.14 15.2a6.34 6.34 0 006.32 6.34 6.34 6.34 0 006.32-6.32V8.73a8.2 8.2 0 004.83 1.56V6.82a4.85 4.85 0 01-1.02-.13z"/></svg>
                    )}
                    {link.name === 'YouTube' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    )}
                    {link.name === 'Behance' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 2.211 1.168 2.911 2.632 2.911 1.168 0 2.178-.59 2.5-1.549h2.624zm-7.649-3.67h5.185c-.083-1.574-.913-2.293-2.481-2.293-1.459 0-2.474.757-2.704 2.293zM9.216 8.317v7.683c0 1.188-.088 2.067-.088 2.067H6.3s.1-.879.1-1.734c0 0-1.053 2.008-3.698 2.008C.391 18.341 0 16.645 0 15.549c0-2.694 2.281-3.62 5.053-3.62h1.434v-.343c0-1.1-.39-1.662-1.522-1.662-.727 0-1.434.254-1.824.728H.75C1.19 8.432 3.146 7.4 5.27 7.4c2.5 0 3.946 1.037 3.946 3.566v.343h.001v-.001zM6.486 13.533H5.39c-1.6 0-2.558.5-2.558 1.6 0 .866.5 1.489 1.6 1.489 1.733 0 2.054-1.372 2.054-2.39v-.699zM.032 5.5h6.123c1.489 0 2.557.39 2.557 1.824 0 1.061-.589 1.7-1.435 1.957v.022c1.061.221 1.7.955 1.7 2.104 0 1.49-1.037 2.524-3.047 2.524H.032V5.5zm6.054 3.155c.743 0 1.213-.389 1.213-1.126 0-.7-.434-1.037-1.213-1.037H2.71v2.163h3.376zm.156 3.42c.811 0 1.325-.434 1.325-1.193 0-.743-.48-1.126-1.325-1.126H2.71v2.319h3.532z"/></svg>
                    )}
                  </span>
                  <span className="font-mono text-[10px] text-ivory/40 uppercase">{link.name}</span>
                </a>
              ))}
            </div>
            <a href="tel:07774824244" className="block font-mono text-sm text-ivory hover:text-coral transition-colors duration-300 mb-1">
              0777 482 4244
            </a>
            <a href="mailto:hello@epicmedia.iq" className="block font-mono text-[13px] text-ivory/50 hover:text-ivory transition-colors duration-300">
              hello@epicmedia.iq
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/30">
            &copy; 2025 Epic Media IQ. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:border-coral/40 hover:shadow-coral-glow transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4 text-ivory/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
