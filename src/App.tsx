import { LenisProvider } from './context/LenisContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SandDriftCanvas from './components/SandDriftCanvas'
import HeroSection from './sections/HeroSection'
import ShowreelSection from './sections/ShowreelSection'
import PortfolioSection from './sections/PortfolioSection'
import ContactSection from './sections/ContactSection'

function App() {
  return (
    <LenisProvider>
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
    </LenisProvider>
  )
}

export default App
