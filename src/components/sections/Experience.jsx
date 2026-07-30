import { Check, Scale } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import ContractVector from '../vectors/ContractVector.jsx'

function Experience({ t }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-28 lg:py-32"
      id="experience"
    >
      <div className="absolute -top-40 -end-24 -z-10 size-[30rem] rounded-full border border-gold/10" />
      <div className="absolute -top-24 -end-8 -z-10 size-[20rem] rounded-full border border-gold/10" />
      <ContractVector className="pointer-events-none absolute -bottom-24 -start-14 -z-10 w-80 text-white/[0.035]" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-24">
          <Reveal>
            <SectionTitle
              description={t.experience.description}
              eyebrow={t.experience.eyebrow}
              theme="dark"
              title={t.experience.title}
            />
            <div className="mt-10 flex items-center gap-4 border-s border-gold/50 ps-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-navy-deep">
                <Scale aria-hidden="true" className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[0.66rem] font-extrabold tracking-[0.16em] text-white/45 uppercase rtl:tracking-normal">
                  {t.experience.contextLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-white/85">
                  {t.experience.contextValue}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-white/14">
            {t.experience.points.map((point, index) => (
              <Reveal
                className="flex min-h-16 items-center gap-4 border-b border-white/14 py-4"
                delay={index * 0.05}
                key={point}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/35 text-gold-light">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={2} />
                </span>
                <p className="text-sm leading-6 font-semibold text-white/72">
                  {point}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Experience
