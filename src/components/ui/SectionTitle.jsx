function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'start',
  theme = 'light',
  className = '',
}) {
  const centered = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div
      className={`${centered ? 'mx-auto items-center text-center' : 'items-start text-start'} flex max-w-3xl flex-col ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-3 text-[0.7rem] font-extrabold tracking-[0.18em] uppercase before:h-px before:w-8 before:bg-gold ${
            isDark ? 'text-gold-light' : 'text-navy-soft'
          } rtl:tracking-normal`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-balance text-4xl leading-[0.98] font-semibold sm:text-5xl lg:text-6xl ${
          isDark ? 'text-white' : 'text-navy-deep'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-pretty mt-6 max-w-2xl text-base leading-8 sm:text-lg ${
            isDark ? 'text-white/65' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
