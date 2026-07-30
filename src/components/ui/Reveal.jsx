import { motion, useReducedMotion } from 'motion/react'

function Reveal({
  as = 'div',
  delay = 0,
  amount = 0.2,
  className = '',
  children,
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionComponent = motion.create(as)

  return (
    <MotionComponent
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.58,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionComponent>
  )
}

export default Reveal
