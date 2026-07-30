import { ArrowDownRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import AbstractLegalPattern from '../vectors/AbstractLegalPattern.jsx'
import ContractVector from '../vectors/ContractVector.jsx'
import LegalScalesVector from '../vectors/LegalScalesVector.jsx'

const entrance = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function Hero({ t }) {
  const shouldReduceMotion = useReducedMotion()
  const initialState = shouldReduceMotion ? false : 'hidden'

  return (
    <section
      className="legal-grid relative isolate overflow-hidden bg-navy-deep text-white"
      id="home"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_38%,rgba(201,162,39,0.14),transparent_33%),radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.055),transparent_28%)] rtl:bg-[radial-gradient(circle_at_26%_38%,rgba(201,162,39,0.14),transparent_33%),radial-gradient(circle_at_88%_10%,rgba(255,255,255,0.055),transparent_28%)]" />
      <AbstractLegalPattern className="pointer-events-none absolute inset-0 -z-10 size-full text-white" />

      <Container className="relative">
        <div className="grid min-h-[calc(100svh-4.75rem)] items-center gap-16 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-14 lg:py-24">
          <motion.div
            animate="visible"
            className="relative z-10 max-w-3xl text-start"
            initial={initialState}
            transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.09 }}
          >
            <motion.p
              className="mb-5 flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-gold-light uppercase before:h-px before:w-10 before:bg-gold rtl:tracking-normal"
              variants={entrance}
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              className="font-display text-balance text-[clamp(4rem,11vw,7.5rem)] leading-[0.8] font-semibold tracking-[-0.055em] text-white rtl:tracking-normal"
              variants={entrance}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              className="mt-6 text-lg font-semibold text-gold-light sm:text-xl lg:text-2xl"
              variants={entrance}
            >
              {t.hero.role}
            </motion.p>
            <motion.p
              className="text-pretty mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9"
              variants={entrance}
            >
              {t.hero.description}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 min-[430px]:flex-row"
              variants={entrance}
            >
              <Button className="w-full min-[430px]:w-auto" href="#contact">
                {t.hero.primaryCta}
              </Button>
              <Button
                className="w-full min-[430px]:w-auto"
                href="#expertise"
                variant="outline"
              >
                {t.hero.secondaryCta}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, scale: 1, y: [0, -3, 0] }
            }
            className="relative mx-auto w-full max-w-[25rem]"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.975, y: 12 }
            }
            transition={{
              opacity: { duration: 0.7, delay: 0.18 },
              scale: { duration: 0.7, delay: 0.18 },
              y: {
                duration: 9,
                delay: 0.9,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <div className="absolute -inset-5 translate-x-3 translate-y-3 rounded-[1.75rem] border border-gold/45 rtl:-translate-x-3" />
            <div className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-gold/55 via-white/10 to-transparent p-px">
              <div className="size-full rounded-[1.3rem] bg-navy-deep" />
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 bg-cream shadow-portrait">
              <img
                alt={t.hero.imageAlt}
                className="size-full object-cover object-[50%_30%]"
                decoding="async"
                fetchPriority="high"
                height="425"
                loading="eager"
                src={siteConfig.portrait}
                width="425"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-deep/32 to-transparent" />
            </div>

            <motion.div
              animate={
                shouldReduceMotion ? undefined : { rotate: [0, 1.3, 0, -1, 0] }
              }
              className="absolute -top-12 -end-12 -z-10 size-44 text-gold/30 sm:-end-16 sm:size-52"
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <LegalScalesVector className="size-full" />
            </motion.div>

            <ContractVector className="absolute -bottom-10 -start-14 -z-10 w-28 text-white/14 sm:-start-20 sm:w-36" />

            <div className="absolute -bottom-7 -start-3 flex min-w-[9.5rem] items-center gap-3 rounded-xl border border-gold/35 bg-navy px-4 py-3 shadow-xl sm:-start-7">
              <span className="font-display text-4xl leading-none font-semibold text-gold-light">
                {t.hero.experienceNumber}
              </span>
              <span className="max-w-20 text-[0.68rem] leading-5 font-bold text-white/68">
                {t.hero.experienceLabel}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          className="grid border-t border-white/12 sm:grid-cols-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, delay: 0.65 }}
        >
          {t.hero.trustItems.map((item, index) => (
            <div
              className="flex min-h-20 items-center gap-4 border-b border-white/10 py-4 last:border-b-0 sm:border-e sm:border-b-0 sm:px-6 sm:first:ps-0 sm:last:border-e-0"
              key={item}
            >
              <span className="font-display text-2xl text-gold/75">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs leading-5 font-bold tracking-[0.08em] text-white/58 uppercase rtl:tracking-normal">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        <a
          aria-label={t.hero.secondaryCta}
          className="absolute end-10 bottom-28 hidden size-11 animate-bounce place-items-center rounded-full border border-white/12 text-white/40 transition hover:border-gold hover:text-gold lg:grid motion-reduce:animate-none"
          href="#about"
        >
          <ArrowDownRight
            aria-hidden="true"
            className="size-4 rtl:-rotate-90"
          />
        </a>
      </Container>
    </section>
  )
}

export default Hero
