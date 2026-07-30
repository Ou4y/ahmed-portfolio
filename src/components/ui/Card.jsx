const variants = {
  elevated:
    'border border-line bg-white shadow-card hover:-translate-y-1 hover:border-gold/45',
  outlined: 'border border-line bg-transparent hover:border-gold/50',
  dark: 'border border-white/10 bg-white/[0.045] text-white hover:border-gold/45',
}

function Card({
  as: Component = 'article',
  variant = 'elevated',
  className = '',
  children,
}) {
  return (
    <Component
      className={`rounded-2xl transition duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
}

export default Card
