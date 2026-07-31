import {
  Building2,
  Check,
  FileSignature,
  Landmark,
  UsersRound,
} from 'lucide-react'
import practiceAreas from '../../data/practiceAreas.js'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const icons = {
  building: Building2,
  contract: FileSignature,
  investment: Landmark,
  employment: UsersRound,
}

function PracticeAreas({ language, t }) {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36" id="expertise">
      <Container>
        <Reveal>
          <SectionTitle
            description={t.practiceAreas.description}
            eyebrow={t.practiceAreas.eyebrow}
            title={t.practiceAreas.title}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20">
          {practiceAreas[language].map((area, index) => {
            const Icon = icons[area.icon]
            const headingId = `practice-area-${area.id}`

            return (
              <Reveal
                className="h-full"
                delay={(index % 2) * 0.06}
                key={area.id}
              >
                <article
                  aria-labelledby={headingId}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-cream p-6 shadow-[0_18px_60px_rgba(7,24,39,0.04)] transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card sm:p-8"
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="grid size-12 place-items-center rounded-xl bg-navy text-gold-light transition duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.55}
                      />
                    </span>
                    <span className="font-display text-3xl text-gold/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className="mt-7 text-2xl leading-8 font-bold text-navy"
                    id={headingId}
                  >
                    {area.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-[0.95rem]">
                    {area.description}
                  </p>

                  <div className="mt-7 border-t border-line pt-6">
                    <p className="text-[0.65rem] font-extrabold tracking-[0.14em] text-navy-soft uppercase rtl:tracking-normal">
                      {t.practiceAreas.servicesLabel}
                    </p>
                    <ul className="mt-5 grid gap-x-7 gap-y-3 lg:grid-cols-1 xl:grid-cols-2">
                      {area.services.map((service) => (
                        <li
                          className="flex items-start gap-3 text-sm leading-6 text-ink"
                          key={service}
                        >
                          <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                            <Check
                              aria-hidden="true"
                              className="size-2.5"
                              strokeWidth={2.4}
                            />
                          </span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="sr-only">
                    {t.practiceAreas.itemLabel} {index + 1}
                  </span>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default PracticeAreas
