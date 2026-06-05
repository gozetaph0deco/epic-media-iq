import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

const NAV_OFFSET = -80

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<(time: number) => void>(() => {})

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      instance.raf(time * 1000)
    }
    rafRef.current = onTick
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

export function scrollToSelector(selector: string, lenis: Lenis | null) {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2 })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop(lenis: Lenis | null) {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
