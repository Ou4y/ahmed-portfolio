import Navbar from './components/layout/Navbar.jsx'
import Container from './components/ui/Container.jsx'
import SectionTitle from './components/ui/SectionTitle.jsx'
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
        <section
          className="flex min-h-[calc(100svh-4.75rem)] items-center bg-cream py-24"
          id="home"
        >
          <Container>
            <SectionTitle
              eyebrow={t.hero.eyebrow}
              title={t.hero.title}
              description={t.hero.description}
            />
          </Container>
        </section>
      </main>
    </>
  )
}

export default App
