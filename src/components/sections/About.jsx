import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

function About({ t }) {
  const details = [
    {
      label: t.about.yearsLabel,
      value: t.hero.experienceNumber,
      accent: true,
    },
    { label: t.about.roleLabel, value: t.about.roleValue },
    { label: t.about.focusLabel, value: t.about.focusValue },
  ]

  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-36" id="about">
      <div className="absolute top-0 end-0 h-px w-1/3 bg-gradient-to-l from-gold/70 to-transparent rtl:bg-gradient-to-r" />
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-navy px-7 py-10 text-white shadow-card sm:px-10 sm:py-12">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-transparent rtl:bg-gradient-to-l" />
              <span className="font-display block text-[9rem] leading-[0.72] font-semibold text-gold-light sm:text-[11rem]">
                {t.hero.experienceNumber}
              </span>
              <p className="mt-7 max-w-44 text-sm leading-6 font-bold text-white/62">
                {t.about.yearsLabel}
              </p>
              <ArrowUpRight
                aria-hidden="true"
                className="absolute end-8 bottom-8 size-12 text-white/10 rtl:-rotate-90"
                strokeWidth={1}
              />
            </div>
            <div className="absolute -end-4 -bottom-4 -z-10 size-full rounded-2xl border border-gold/45" />
          </Reveal>

          <div>
            <Reveal>
              <SectionTitle
                eyebrow={t.about.eyebrow}
                title={t.about.title}
              />
            </Reveal>

            <div className="mt-7 space-y-5">
              {t.about.paragraphs.map((paragraph, index) => (
                <Reveal delay={index * 0.055} key={paragraph}>
                  <p
                    className={`text-pretty text-base leading-8 sm:text-[1.05rem] ${
                      index === t.about.paragraphs.length - 1
                        ? 'border-s-2 border-gold ps-6 font-semibold text-navy'
                        : 'text-muted'
                    }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 border-y border-line">
              {details.map((detail, index) => (
                <Reveal
                  className="grid gap-2 border-b border-line py-5 last:border-b-0 sm:grid-cols-[0.8fr_1.2fr] sm:items-center"
                  delay={index * 0.055}
                  key={detail.label}
                >
                  <span className="text-xs font-extrabold tracking-[0.12em] text-muted uppercase rtl:tracking-normal">
                    {detail.label}
                  </span>
                  <span
                    className={`font-semibold ${
                      detail.accent
                        ? 'font-display text-4xl text-gold'
                        : 'text-base leading-7 text-navy'
                    }`}
                  >
                    {detail.value}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
