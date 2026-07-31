import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import SEO from './components/layout/SEO.jsx'
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

function App() {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <>
      <SEO language={language} t={t} />
      <SkipLink>{t.accessibility.skipToContent}</SkipLink>
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        t={t}
      />
      <main id="main-content">
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
    </>
  )
}

export default App
