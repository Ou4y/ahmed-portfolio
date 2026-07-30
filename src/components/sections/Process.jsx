import { FileSearch, ListChecks, MessageSquareText, Scale } from 'lucide-react'
import processSteps from '../../data/processSteps.js'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const icons = {
  message: MessageSquareText,
  documents: FileSearch,
  consultation: Scale,
  plan: ListChecks,
}

function Process({ language, t }) {
  return (
    <section className="bg-cream py-24 sm:py-28 lg:py-36" id="process">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            description={t.process.description}
            eyebrow={t.process.eyebrow}
            title={t.process.title}
          />
        </Reveal>

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute top-10 bottom-10 start-[1.45rem] w-px bg-line sm:start-[1.95rem] lg:inset-x-[12.5%] lg:top-[2.45rem] lg:bottom-auto lg:h-px lg:w-auto" />
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-7">
            {processSteps[language].map((step, index) => {
              const Icon = icons[step.icon]

              return (
                <Reveal
                  as="article"
                  className="relative grid grid-cols-[3rem_1fr] gap-5 sm:grid-cols-[4rem_1fr] lg:block lg:text-center"
                  delay={index * 0.06}
                  key={step.id}
                >
                  <div className="relative z-10 grid size-12 place-items-center rounded-full border border-gold/45 bg-cream text-gold shadow-[0_0_0_8px_#f8f5ef] sm:size-16 lg:mx-auto">
                    <Icon
                      aria-hidden="true"
                      className="size-5 sm:size-6"
                      strokeWidth={1.55}
                    />
                  </div>
                  <div className="pt-1 lg:pt-8">
                    <p className="mb-2 text-[0.66rem] font-extrabold tracking-[0.14em] text-gold uppercase rtl:tracking-normal">
                      {t.process.stepLabel}{' '}
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-lg font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Process
