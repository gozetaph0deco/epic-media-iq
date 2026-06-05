import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from './Logo'
import { scrollToSelector, scrollToTop, useLenis } from '../context/LenisContext'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/epicmedia.iq' },
]

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Studio', href: '#showreel' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
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
    }, footer)

    return () => ctx.revert()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSelector(href, lenis)
  }

  return (
    <footer ref={footerRef} className="relative bg-deep border-t border-purple/15 pt-16 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          <div className="footer-col">
            <div className="flex items-center mb-4">
              <Logo className="text-3xl" />
            </div>
            <p className="font-display font-semibold text-xl text-ivory mb-2">Epic Media IQ</p>
            <p className="font-body text-sm text-ivory/50 leading-relaxed mb-2">
              We shape tomorrow&apos;s brands.<br />
              Baghdad — 14 Ramadan St., Iraq
            </p>
            <p className="font-arabic text-[13px] text-ivory/40" dir="rtl">
              نصنع علامات الغد
            </p>
          </div>

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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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

        <div className="border-t border-purple/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/30">
            &copy; 2026 Epic Media IQ. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToTop(lenis)}
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:border-coral/40 hover:shadow-coral-glow transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4 text-ivory/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
