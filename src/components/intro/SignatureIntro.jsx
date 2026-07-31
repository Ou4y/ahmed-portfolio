import { motion, useReducedMotion } from 'motion/react'
import SignatureLogo from '../branding/SignatureLogo.jsx'

const premiumEase = [0.22, 1, 0.36, 1]

function SignatureIntro({ language, t }) {
  const shouldReduceMotion = useReducedMotion()
  const isArabic = language === 'ar'

  const fadeTransition = shouldReduceMotion
    ? { delay: 0.38, duration: 0.17, ease: 'easeOut' }
    : { delay: 3.3, duration: 0.7, ease: premiumEase }

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className="fixed inset-0 z-[200] min-h-[100dvh] overflow-hidden text-navy-deep"
      data-signature-intro=""
      role="status"
    >
      <span className="sr-only">{t.intro.announcement}</span>

      <motion.div
        animate={{ opacity: 0 }}
        className="absolute inset-0 grid min-h-[100dvh] place-items-center overflow-hidden bg-cream"
        initial={{ opacity: 1 }}
        transition={fadeTransition}
      >
        <motion.div
          animate={{ opacity: 1 }}
          aria-hidden="true"
          className="signature-intro-grid absolute inset-0"
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.12 }
              : { opacity: [0, 0.16, 0.1], scale: [0.92, 1.03, 1] }
          }
          aria-hidden="true"
          className="absolute size-[min(78vw,48rem)] rounded-full bg-gold blur-[110px]"
          initial={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2.4,
            ease: 'easeOut',
          }}
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8">
          <div
            aria-hidden="true"
            className="mb-5 flex w-[min(76vw,38rem)] items-center gap-3 sm:mb-7 sm:gap-5"
          >
            <motion.span
              animate={{ opacity: 1, scaleX: 1 }}
              className="h-px flex-1 origin-right bg-gradient-to-l from-gold via-gold/70 to-transparent"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scaleX: 0, transformOrigin: 'right' }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : 0.6,
                duration: shouldReduceMotion ? 0 : 1.1,
                ease: premiumEase,
              }}
            />
            <motion.span
              animate={{ opacity: 1, rotate: 45, scale: 1 }}
              className="size-2.5 border border-gold bg-gold/15 sm:size-3"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, rotate: 45, scale: 0.4 }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : 0.78,
                duration: shouldReduceMotion ? 0 : 0.65,
                ease: premiumEase,
              }}
            />
            <motion.span
              animate={{ opacity: 1, scaleX: 1 }}
              className="h-px flex-1 origin-left bg-gradient-to-r from-gold via-gold/70 to-transparent"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scaleX: 0, transformOrigin: 'left' }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : 0.6,
                duration: shouldReduceMotion ? 0 : 1.1,
                ease: premiumEase,
              }}
            />
          </div>

          <motion.div
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1, y: 0 }}
            className="w-[min(92vw,58rem)]"
            dir="ltr"
            initial={
              shouldReduceMotion
                ? false
                : {
                    clipPath: 'inset(0 100% 0 0)',
                    opacity: 0.4,
                    y: 8,
                  }
            }
            transition={{
              clipPath: {
                delay: shouldReduceMotion ? 0 : 1,
                duration: shouldReduceMotion ? 0 : 1.6,
                ease: premiumEase,
              },
              opacity: {
                delay: shouldReduceMotion ? 0 : 1,
                duration: shouldReduceMotion ? 0 : 0.8,
              },
              y: {
                delay: shouldReduceMotion ? 0 : 1,
                duration: shouldReduceMotion ? 0 : 1.1,
                ease: premiumEase,
              },
            }}
          >
            <SignatureLogo priority tone="light" variant="threeDMark" />
          </motion.div>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 text-center text-[0.68rem] leading-6 font-extrabold tracking-[0.2em] text-navy/72 uppercase sm:mt-9 sm:text-sm sm:tracking-[0.28em] rtl:font-bold rtl:tracking-normal"
            dir={isArabic ? 'rtl' : 'ltr'}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 2.4,
              duration: shouldReduceMotion ? 0 : 0.9,
              ease: premiumEase,
            }}
          >
            {t.intro.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignatureIntro
