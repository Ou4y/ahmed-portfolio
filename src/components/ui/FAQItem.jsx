import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

function FAQItem({ id, question, answer, isOpen, onToggle }) {
  const buttonId = `faq-${id}-button`
  const panelId = `faq-${id}-panel`

  return (
    <div className="border-b border-line first:border-t">
      <h3>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="group flex w-full items-center justify-between gap-5 py-6 text-start sm:py-7"
          id={buttonId}
          onClick={onToggle}
          type="button"
        >
          <span className="text-base leading-7 font-bold text-navy transition group-hover:text-navy-soft sm:text-lg">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition ${
              isOpen
                ? 'border-gold bg-gold text-navy-deep'
                : 'border-line text-gold group-hover:border-gold'
            }`}
          >
            {isOpen ? (
              <Minus className="size-4" strokeWidth={1.8} />
            ) : (
              <Plus className="size-4" strokeWidth={1.8} />
            )}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            aria-labelledby={buttonId}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            role="region"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-3xl pb-7 pe-12 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQItem
