import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assetUrl } from '../lib/assetUrl'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Glamor Clinic — Brand Identity',
    arabic: 'جلامور — الهوية البصرية',
    category: 'Brand Identity',
    description: 'A clean, elegant identity for Glamor beauty & dental clinic — a refined wordmark and a soft floral mark that reads instantly while still feeling premium.',
    image: assetUrl('/assets/project-glamor.jpg'),
    stats: [
      { value: 'Logo', label: 'Design' },
      { value: 'Identity', label: 'System' },
    ],
  },
  {
    title: 'NEKO — Japanese Bites',
    arabic: 'نيكو — هوية ومنتجات',
    category: 'Branding & Packaging',
    description: 'A modern identity for NEKO, blending Japanese type-craft with a bold purple & red palette. Logo, cups, and packaging mockups built into one cohesive system.',
    image: assetUrl('/assets/project-neko.jpg'),
    stats: [
      { value: 'Brand', label: 'Identity' },
      { value: 'Packaging', label: 'Mockups' },
    ],
  },
  {
    title: 'ROKEN — Cafe & Restaurant',
    arabic: 'رُكن — كافيه ومطعم',
    category: 'Cafe Branding',
    description: 'A warm Arabic-calligraphy logo and full brand kit for ROKEN cafe — green and terracotta tones, social templates, and a story-led visual language.',
    image: assetUrl('/assets/project-roken.jpg'),
    stats: [
      { value: 'Logo', label: 'Calligraphy' },
      { value: 'Brand', label: 'Kit' },
    ],
  },
  {
    title: 'Aamar — Design & Decor',
    arabic: 'اعمار — للتصميم والديكور',
    category: 'Rebrand & Social',
    description: 'A complete rebrand for Aamar interior design & decor — a geometric mark and a polished social campaign that turns spaces into stories worth sharing.',
    image: assetUrl('/assets/project-aamar.jpg'),
    stats: [
      { value: 'Rebrand', label: 'Identity' },
      { value: 'Social', label: 'Campaign' },
    ],
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-heading', {
        y: 30, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      })

      const cards = section.querySelectorAll('.project-card')
      cards.forEach((card) => {
        const img = card.querySelector('.project-image')
        const content = card.querySelector('.project-content')

        gsap.from(img, {
          x: -80, opacity: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 75%', once: true },
        })
        gsap.from(content, {
          x: 40, opacity: 0, duration: 1, delay: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 75%', once: true },
        })
      })

      gsap.from('.portfolio-viewall', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power4.out',
        scrollTrigger: { trigger: '.portfolio-viewall', start: 'top 90%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-pad relative bg-deep content-auto"
    >
      <div className="absolute inset-0 neon-pulse-grid opacity-30 pointer-events-none" />

      <div className="container-wide relative z-10">
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <h2
            className="portfolio-heading font-display font-semibold text-warm"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            Real Brands. Real Work.
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:gap-20">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card glass-card p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 group hover:border-coral/30 hover:shadow-card transition-all duration-300"
            >
              <div className="project-image relative w-full lg:w-[55%] aspect-video rounded-2xl overflow-hidden flex-shrink-0 bg-purple/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={720}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.2), rgba(255, 107, 107, 0.15))' }}
                />
              </div>

              <div className="project-content w-full lg:w-[45%] text-left">
                <span className="inline-block px-3 py-1 rounded-lg bg-purple/15 text-purple font-mono text-[11px] uppercase tracking-wider mb-3">
                  {project.category}
                </span>

                <h3
                  className="font-display font-semibold text-warm mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  {project.title}
                </h3>

                <p className="font-body text-sm text-ivory/70 leading-relaxed mb-2">
                  {project.description}
                </p>

                <p className="font-arabic text-sm mb-4" dir="rtl" style={{ color: 'rgba(255, 107, 107, 0.6)' }}>
                  {project.arabic}
                </p>

                <div className="flex gap-6 mb-5">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-1.5">
                      <span className="font-display font-semibold text-lg text-warm">{stat.value}</span>
                      <span className="font-mono text-[10px] text-ivory/40 uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-viewall text-center mt-12 lg:mt-16">
          <a
            href="https://instagram.com/epicmedia.iq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-9 py-3.5 border-[1.5px] border-purple/40 text-purple text-sm font-body font-semibold rounded-full hover:bg-purple/15 hover:border-purple hover:shadow-glow transition-all duration-300"
          >
            See More on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
