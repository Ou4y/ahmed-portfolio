import { useEffect, useRef, useState } from 'react'
import { Menu, Scale, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { navigationItems } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import LanguageSwitch from '../ui/LanguageSwitch.jsx'

function Navbar({ language, t, onToggleLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const switchLanguage = () => {
    closeMenu()
    onToggleLanguage()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
      <Container>
        <nav
          aria-label={t.nav.navigationLabel}
          className="flex min-h-[4.75rem] items-center justify-between gap-5"
        >
          <a
            aria-label={`${t.hero.title} — ${t.hero.role}`}
            className="group flex min-w-0 items-center gap-3"
            href="#home"
            onClick={closeMenu}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy-deep">
              <Scale aria-hidden="true" className="size-5" strokeWidth={1.6} />
            </span>
            <span className="min-w-0">
              <span className="font-display block truncate text-xl leading-none font-semibold text-white sm:text-2xl">
                {t.hero.title}
              </span>
              <span className="mt-1 hidden truncate text-[0.62rem] font-bold tracking-[0.12em] text-white/50 uppercase sm:block rtl:tracking-normal">
                {t.footer.role}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
              <a
                className="rounded-full px-3.5 py-2.5 text-[0.78rem] font-bold text-white/68 transition hover:bg-white/5 hover:text-white"
                href={`#${item.id}`}
                key={item.id}
              >
                {t.nav[item.labelKey]}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch
              label={t.language.switchLabel}
              language={language}
              nextLanguage={t.language.nextLanguage}
              onToggle={switchLanguage}
            />
            <Button
              className="min-h-11 px-5"
              href="#contact"
              onClick={closeMenu}
            >
              {t.nav.consultation}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch
              label={t.language.switchLabel}
              language={language}
              nextLanguage={t.language.nextLanguage}
              onToggle={switchLanguage}
            />
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              ref={menuButtonRef}
              type="button"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden border-t border-white/10 bg-navy-deep lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="py-4">
              <div className="flex flex-col">
                {navigationItems.map((item, index) => (
                  <motion.a
                    animate={{ opacity: 1, x: 0 }}
                    className="flex min-h-12 items-center justify-between border-b border-white/8 py-3 text-sm font-bold text-white/75 last:border-0 hover:text-gold"
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: language === 'ar' ? 10 : -10 }}
                    key={item.id}
                    onClick={closeMenu}
                    transition={{ delay: index * 0.035, duration: 0.2 }}
                  >
                    <span>{t.nav[item.labelKey]}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs text-gold/70"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.a>
                ))}
                <Button
                  className="mt-5 w-full"
                  href="#contact"
                  onClick={closeMenu}
                >
                  {t.nav.consultation}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
