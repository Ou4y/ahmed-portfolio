const sizes = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[90rem]',
}

function Container({
  as: Component = 'div',
  size = 'default',
  className = '',
  children,
}) {
  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-7 lg:px-10 ${sizes[size]} ${className}`}
    >
      {children}
    </Component>
  )
}

export default Container
