import { Languages } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

function LanguageSwitch({ language, label, nextLanguage, onToggle }) {
  return (
    <button
      aria-label={label}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-current/15 px-3.5 py-2 text-xs font-extrabold transition duration-300 hover:border-gold hover:text-gold"
      dir="ltr"
      onClick={onToggle}
      type="button"
    >
      <Languages aria-hidden="true" className="size-4" strokeWidth={1.8} />
      <span className="relative min-w-12 overflow-hidden text-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={language}
            animate={{ opacity: 1, y: 0 }}
            className="block"
            exit={{ opacity: 0, y: -5 }}
            initial={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.18 }}
          >
            {nextLanguage}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}

export default LanguageSwitch
