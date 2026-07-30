function AbstractLegalPattern({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 720"
    >
      <circle cx="1070" cy="114" r="230" stroke="currentColor" opacity="0.08" />
      <circle cx="1070" cy="114" r="166" stroke="currentColor" opacity="0.08" />
      <circle cx="1070" cy="114" r="104" stroke="currentColor" opacity="0.08" />
      <path
        d="M0 612h1200M118 0v720M0 558h1200M176 0v720"
        stroke="currentColor"
        opacity="0.045"
      />
      <path
        d="m923 580 91-91 91 91-91 91-91-91Z"
        stroke="currentColor"
        opacity="0.09"
      />
      <path
        d="M46 68h148M46 84h92M1034 306h118M1064 322h88"
        stroke="currentColor"
        opacity="0.1"
      />
    </svg>
  )
}

export default AbstractLegalPattern
