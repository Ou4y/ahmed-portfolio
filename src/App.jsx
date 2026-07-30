import Container from './components/ui/Container.jsx'
import SectionTitle from './components/ui/SectionTitle.jsx'

function App() {
  return (
    <main>
      <section className="flex min-h-screen items-center bg-cream py-24">
        <Container>
          <SectionTitle
            eyebrow="Ahmed Raafat"
            title="A bilingual legal portfolio is taking shape."
            description="The reusable visual foundation is ready for the full single-page experience."
          />
        </Container>
      </section>
    </main>
  )
}

export default App
