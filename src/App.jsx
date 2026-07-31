import { useEffect, useRef, useState } from 'react'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import SEO from './components/layout/SEO.jsx'
import SignatureIntro from './components/intro/SignatureIntro.jsx'
import About from './components/sections/About.jsx'
import Contact from './components/sections/Contact.jsx'
import Experience from './components/sections/Experience.jsx'
import FAQ from './components/sections/FAQ.jsx'
import Hero from './components/sections/Hero.jsx'
import Insights from './components/sections/Insights.jsx'
import PracticeAreas from './components/sections/PracticeAreas.jsx'
import Process from './components/sections/Process.jsx'
import SkipLink from './components/ui/SkipLink.jsx'
import useLanguage from './hooks/useLanguage.js'

const INTRO_SESSION_KEY = 'ahmed-raafat-signature-intro-seen'
const INTRO_DURATION = 4000
const REDUCED_MOTION_DURATION = 550

function getInitialIntroVisibility() {
  if (typeof window === 'undefined') {
    return true
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true'
  } catch {
    return true
  }
}

function App() {
  const { language, t, toggleLanguage } = useLanguage()
  const [showIntro, setShowIntro] = useState(getInitialIntroVisibility)
  const siteContentRef = useRef(null)

  useEffect(() => {
    if (!showIntro) {
      return undefined
    }

    const shouldReduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const duration = shouldReduceMotion
      ? REDUCED_MOTION_DURATION
      : INTRO_DURATION
    const previousOverflow = document.body.style.overflow
    const previousOverscrollBehavior = document.body.style.overscrollBehavior
    const siteContent = siteContentRef.current

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    siteContent?.setAttribute('inert', '')

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    } catch {
      // The intro still completes normally if session storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, duration)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      document.body.style.overscrollBehavior = previousOverscrollBehavior
      siteContent?.removeAttribute('inert')
    }
  }, [showIntro])

  return (
    <>
      <SEO language={language} t={t} />
      {showIntro && <SignatureIntro language={language} t={t} />}
      <div
        aria-hidden={showIntro ? 'true' : undefined}
        className={showIntro ? 'pointer-events-none select-none' : undefined}
        ref={siteContentRef}
      >
        <SkipLink>{t.accessibility.skipToContent}</SkipLink>
        <Navbar
          language={language}
          onToggleLanguage={toggleLanguage}
          t={t}
        />
        <main id="main-content" tabIndex="-1">
          <Hero t={t} />
          <About t={t} />
          <PracticeAreas language={language} t={t} />
          <Experience t={t} />
          <Process language={language} t={t} />
          <Insights language={language} t={t} />
          <FAQ language={language} t={t} />
          <Contact t={t} />
        </main>
        <Footer t={t} />
      </div>
    </>
  )
}

export default App
