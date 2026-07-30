import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary:
    'bg-gold text-navy-deep shadow-[0_12px_28px_rgba(201,162,39,0.2)] hover:bg-gold-light',
  secondary:
    'border border-navy/20 bg-white/70 text-navy hover:border-gold/70 hover:bg-white',
  outline:
    'border border-white/30 bg-white/5 text-white hover:border-gold hover:bg-white/10',
  text: 'text-navy hover:text-navy-soft',
}

function Button({
  href,
  children,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  showIcon = true,
  className = '',
  external = false,
  type = 'button',
  ...props
}) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-[-90deg]"
          strokeWidth={1.8}
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  )
}

export default Button
