function SkipLink({ children }) {
  return (
    <a
      className="fixed top-3 start-3 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy-deep shadow-lg transition-transform focus:translate-y-0"
      href="#main-content"
    >
      {children}
    </a>
  )
}

export default SkipLink
