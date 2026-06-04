import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SandDriftCanvas from './components/SandDriftCanvas'
import HeroSection from './sections/HeroSection'
import ShowreelSection from './sections/ShowreelSection'
import PortfolioSection from './sections/PortfolioSection'
import ContactSection from './sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="relative">
      <SandDriftCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <ShowreelSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
