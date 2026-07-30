import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Files,
  Handshake,
  ShieldCheck,
} from 'lucide-react'
import expertise from '../../data/expertise.js'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const icons = {
  building: Building2,
  file: FileText,
  briefcase: BriefcaseBusiness,
  handshake: Handshake,
  files: Files,
  shield: ShieldCheck,
}

function Expertise({ language, t }) {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36" id="expertise">
      <Container>
        <Reveal>
          <SectionTitle
            description={t.expertise.description}
            eyebrow={t.expertise.eyebrow}
            title={t.expertise.title}
          />
        </Reveal>

        <div className="mt-14 grid border-b border-line md:grid-cols-2 md:gap-x-12 lg:mt-20 lg:gap-x-20">
          {expertise[language].map((item, index) => {
            const Icon = icons[item.icon]

            return (
              <Reveal
                as="article"
                className="group relative grid grid-cols-[3.25rem_1fr] gap-4 border-t border-line py-7 transition-colors sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:py-9"
                delay={(index % 2) * 0.06}
                key={item.id}
              >
                <span className="font-display text-2xl text-gold/70 sm:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <h3 className="max-w-sm text-lg leading-7 font-bold text-navy transition-colors group-hover:text-navy-soft sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-gold transition duration-300 group-hover:bg-navy group-hover:text-gold-light">
                      <Icon
                        aria-hidden="true"
                        className="size-[1.15rem]"
                        strokeWidth={1.6}
                      />
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-muted sm:text-[0.95rem]">
                    {item.description}
                  </p>
                  <span className="sr-only">
                    {t.expertise.itemLabel} {index + 1}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Expertise
