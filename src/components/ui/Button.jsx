import './Button.css'

/**
 * Anchor-styled button with three variants: gold (filled), ghost (outline),
 * and whatsapp (gold). Renders an <a> when href is given, else a <button>.
 */
export default function Button({
  children,
  href,
  variant = 'gold',
  className = '',
  ...rest
}) {
  const cls = `btn btn--${variant} ${className}`.trim()
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        <span>{children}</span>
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      <span>{children}</span>
    </button>
  )
}
