import Navbar from './components/layout/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import SkipLink from './components/ui/SkipLink.jsx'
import useLanguage from './hooks/useLanguage.js'

function App() {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <>
      <SkipLink>{t.accessibility.skipToContent}</SkipLink>
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        t={t}
      />
      <main id="main-content">
        <Hero t={t} />
      </main>
    </>
  )
}

export default App
