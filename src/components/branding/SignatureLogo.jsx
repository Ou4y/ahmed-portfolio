import { siteConfig } from '../../data/site.js'

const logoVariants = {
  mark: {
    height: 451,
    src: siteConfig.signature.whiteMark,
    width: 1432,
  },
  full: {
    height: 688,
    src: siteConfig.signature.white,
    width: 1448,
  },
  threeDMark: {
    height: 451,
    src: siteConfig.signature.threeDMark,
    width: 1432,
  },
  transparent: {
    height: 685,
    src: siteConfig.signature.transparent,
    width: 1439,
  },
}

function SignatureLogo({
  alt = '',
  className = '',
  priority = false,
  tone = 'dark',
  variant = 'mark',
}) {
  const logo = logoVariants[variant]

  return (
    <span
      aria-hidden={alt ? undefined : 'true'}
      className={`signature-logo signature-logo--${tone} ${className}`}
      dir="ltr"
    >
      <img
        alt={alt}
        className="h-auto w-full"
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        height={logo.height}
        loading={priority ? 'eager' : 'lazy'}
        src={logo.src}
        width={logo.width}
      />
    </span>
  )
}

export default SignatureLogo
