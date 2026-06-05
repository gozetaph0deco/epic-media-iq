import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Logo from './Logo'
import { scrollToSelector, scrollToTop, useLenis } from '../context/LenisContext'

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Studio', href: '#showreel' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.from(nav.querySelectorAll('.nav-item'), {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.2,
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToSelector(href, lenis)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[1000] h-20 flex items-center transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-deep/85 border-b border-purple/10'
          : 'bg-gradient-to-b from-deep/70 via-deep/20 to-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <a
          href="#hero"
          className="nav-item flex items-center group"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(false)
            scrollToTop(lenis)
          }}
        >
          <Logo className="text-2xl" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-item relative font-body font-medium text-sm uppercase tracking-[0.05em] text-ivory hover:text-coral transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-coral transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="nav-item hidden md:inline-flex items-center px-7 py-3 bg-purple text-warm text-sm font-body font-semibold uppercase tracking-[0.05em] rounded-full hover:bg-midpurple transition-all duration-300 hover:shadow-glow"
        >
          Start a Project
        </a>

        <button
          type="button"
          className="md:hidden nav-item flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`w-6 h-[2px] bg-warm transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-warm transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-warm transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      <div
        className={`md:hidden absolute top-20 left-0 right-0 backdrop-blur-xl bg-deep/95 border-b border-purple/10 transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body font-medium text-base uppercase tracking-[0.05em] text-ivory hover:text-coral transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-2 px-7 py-3 bg-purple text-warm text-sm font-body font-semibold uppercase tracking-[0.05em] rounded-full"
          >
            Start a Project
          </a>
        </div>
      </div>
    </nav>
  )
}
