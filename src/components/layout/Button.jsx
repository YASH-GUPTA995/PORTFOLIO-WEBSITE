const VARIANTS = {
  primary:
    'bg-primary text-background hover:bg-accent shadow-glow',
  outline:
    'border border-white/15 text-white hover:border-primary hover:text-primary bg-transparent',
  ghost: 'text-muted hover:text-white bg-transparent',
}

/**
 * Shared button used across the site. Renders as <a> when `href` is provided,
 * otherwise as a <button>.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon: Icon,
  type = 'button',
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus-visible:outline-primary'
  const classes = `${base} ${VARIANTS[variant]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto')
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
        {...rest}
      >
        {Icon && <Icon className="text-base" />}
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {Icon && <Icon className="text-base" />}
      {children}
    </button>
  )
}
