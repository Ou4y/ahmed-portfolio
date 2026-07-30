import { Mail, MessageCircle, Phone, Scale } from 'lucide-react'
import { siteConfig } from '../../data/site.js'
import { createWhatsAppUrl } from '../../utils/whatsapp.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import LegalScalesVector from '../vectors/LegalScalesVector.jsx'

function getContactMethods(t) {
  const { phone, email, whatsapp } = siteConfig.contact

  return [
    whatsapp && {
      id: 'whatsapp',
      label: t.contact.whatsapp,
      value: whatsapp,
      href: createWhatsAppUrl(whatsapp, t.contact.whatsappMessage),
      icon: MessageCircle,
      external: true,
    },
    phone && {
      id: 'phone',
      label: t.contact.phone,
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      icon: Phone,
    },
    email && {
      id: 'email',
      label: t.contact.email,
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
  ].filter(Boolean)
}

function Contact({ t }) {
  const contactMethods = getContactMethods(t)
  const primaryMethod =
    contactMethods.find((method) => method.id === 'whatsapp') ??
    contactMethods[0]

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32" id="contact">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy-deep px-6 py-12 text-white shadow-portrait sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <div className="absolute -top-44 -end-40 -z-10 size-[30rem] rounded-full bg-gold/[0.07] blur-3xl" />
            <LegalScalesVector className="pointer-events-none absolute -end-20 -bottom-24 -z-10 w-80 text-gold/[0.08] sm:w-[28rem]" />

            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
              <div>
                <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-extrabold tracking-[0.18em] text-gold-light uppercase before:h-px before:w-9 before:bg-gold rtl:tracking-normal">
                  {t.contact.eyebrow}
                </p>
                <h2 className="font-display text-balance max-w-2xl text-4xl leading-[1.02] font-semibold sm:text-5xl lg:text-6xl">
                  {t.contact.title}
                </h2>
                <p className="text-pretty mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  {t.contact.description}
                </p>
                {primaryMethod && (
                  <Button
                    className="mt-9"
                    external={primaryMethod.external}
                    href={primaryMethod.href}
                    icon={primaryMethod.icon}
                  >
                    {t.contact.primaryCta}
                  </Button>
                )}
              </div>

              <div id="contact-details">
                {contactMethods.length > 0 ? (
                  <div className="divide-y divide-white/12 border-y border-white/12">
                    {contactMethods.map((method) => {
                      const Icon = method.icon

                      return (
                        <a
                          className="group flex min-h-20 items-center gap-4 py-4 transition hover:text-gold-light"
                          href={method.href}
                          key={method.id}
                          {...(method.external
                            ? {
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              }
                            : {})}
                        >
                          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/14 text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
                            <Icon
                              aria-hidden="true"
                              className="size-4.5"
                              strokeWidth={1.6}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[0.65rem] font-extrabold tracking-[0.14em] text-white/42 uppercase rtl:tracking-normal">
                              {method.label}
                            </span>
                            <span
                              className="mt-1 block truncate text-sm font-bold text-white/82"
                              dir={method.id === 'email' ? 'ltr' : undefined}
                            >
                              {method.value}
                            </span>
                          </span>
                        </a>
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gold/25 bg-white/[0.045] p-7 sm:p-8">
                    <span className="grid size-12 place-items-center rounded-full bg-gold text-navy-deep">
                      <Scale
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.6}
                      />
                    </span>
                    <p className="mt-6 text-base leading-8 font-semibold text-white/72">
                      {t.contact.detailsPending}
                    </p>
                  </div>
                )}
                <p className="mt-6 text-xs leading-6 text-white/42">
                  {t.contact.responseNote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default Contact
