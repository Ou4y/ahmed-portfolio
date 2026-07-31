import { ArrowUp } from 'lucide-react'
import { navigationItems, siteConfig } from '../../data/site.js'
import SignatureLogo from '../branding/SignatureLogo.jsx'
import Container from '../ui/Container.jsx'

function Footer({ t }) {
  const currentYear = new Date().getFullYear()
  const hasContactDetails = Object.values(siteConfig.contact).some(Boolean)

  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start lg:py-16">
          <div>
            <a
              aria-label={`${t.hero.title} — ${t.footer.backToTop}`}
              className="group inline-block w-full max-w-[22rem]"
              href="#home"
            >
              <SignatureLogo
                className="w-full transition duration-300 group-hover:brightness-110"
                tone="dark"
                variant="full"
              />
            </a>
          </div>

          <nav
            aria-label={t.footer.navigationLabel}
            className="flex max-w-xl flex-wrap gap-x-5 gap-y-3 md:justify-end"
          >
            {navigationItems.map((item) => (
              <a
                className="text-xs font-bold text-white/55 transition hover:text-gold-light"
                href={`#${item.id}`}
                key={item.id}
              >
                {t.nav[item.labelKey]}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="text-[0.65rem] font-extrabold tracking-[0.14em] text-gold-light uppercase rtl:tracking-normal">
            {t.footer.disclaimerTitle}
          </p>
          <p className="mt-3 max-w-5xl text-xs leading-6 text-white/60">
            {t.footer.disclaimer}
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-[0.68rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {t.hero.title}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {!hasContactDetails && (
              <span className="text-gold-light/70">
                {t.contact.detailsPending}
              </span>
            )}
            <a
              className="inline-flex items-center gap-2 font-bold text-white/68 transition hover:text-gold-light"
              href="#home"
            >
              {t.footer.backToTop}
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
