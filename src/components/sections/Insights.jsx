import { BookOpenText } from 'lucide-react'
import insights from '../../data/insights.js'
import Card from '../ui/Card.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

function Insights({ language, t }) {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36" id="insights">
      <Container>
        <Reveal>
          <SectionTitle
            description={t.insights.description}
            eyebrow={t.insights.eyebrow}
            title={t.insights.title}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20 lg:gap-7">
          {insights[language].map((insight, index) => (
            <Reveal
              as="article"
              className="h-full"
              delay={index * 0.07}
              key={insight.id}
            >
              <Card
                as="div"
                className="group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="flex items-center justify-between border-b border-line px-6 py-5">
                  <span className="text-[0.64rem] font-extrabold tracking-[0.14em] text-muted uppercase rtl:tracking-normal">
                    {t.insights.previewLabel}
                  </span>
                  <span className="font-display text-2xl text-gold/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="mb-8 grid size-11 place-items-center rounded-full bg-cream text-gold transition duration-300 group-hover:bg-navy group-hover:text-gold-light">
                    <BookOpenText
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.55}
                    />
                  </span>
                  <h3 className="text-balance text-xl leading-8 font-bold text-navy">
                    {insight.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                    {insight.description}
                  </p>
                  <p className="mt-8 border-t border-line pt-5 text-[0.65rem] font-extrabold tracking-[0.12em] text-navy-soft uppercase rtl:tracking-normal">
                    {t.insights.statusLabel}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Insights
