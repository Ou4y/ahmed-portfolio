import Container from './components/ui/Container.jsx'
import LanguageSwitch from './components/ui/LanguageSwitch.jsx'
import SectionTitle from './components/ui/SectionTitle.jsx'
import SkipLink from './components/ui/SkipLink.jsx'
import useLanguage from './hooks/useLanguage.js'

function App() {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <>
      <SkipLink>{t.accessibility.skipToContent}</SkipLink>
      <main id="main-content">
        <section className="flex min-h-screen items-center bg-cream py-24">
          <Container>
            <div className="mb-10 flex justify-end">
              <LanguageSwitch
                label={t.language.switchLabel}
                language={language}
                nextLanguage={t.language.nextLanguage}
                onToggle={toggleLanguage}
              />
            </div>
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
