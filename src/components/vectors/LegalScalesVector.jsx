function LegalScalesVector({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 240 240"
    >
      <circle cx="120" cy="120" r="92" stroke="currentColor" opacity="0.24" />
      <circle cx="120" cy="120" r="72" stroke="currentColor" opacity="0.12" />
      <path
        d="M120 60v111m-31 10h62M74 91h92M120 67l-46 24m46-24 46 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="m74 91-22 41h44L74 91Zm92 0-22 41h44l-22-41Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M52 132c2 13 11 20 22 20s20-7 22-20m48 0c2 13 11 20 22 20s20-7 22-20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="120" cy="58" fill="currentColor" r="5" />
    </svg>
  )
}

export default LegalScalesVector
