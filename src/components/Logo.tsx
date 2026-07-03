type LogoProps = {
  /** Show the full wordmark next to the mark */
  wordmark?: boolean
  /** Color of the wordmark text (mark uses accent + this) */
  tone?: 'ink' | 'paper'
  className?: string
}

/**
 * Sichon mark + wordmark. Swap this component's SVG for a supplied
 * brand logo later without touching the layout.
 */
export default function Logo({ wordmark = true, tone = 'ink', className }: LogoProps) {
  const text = tone === 'paper' ? 'var(--on-dark)' : 'var(--ink)'
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.62rem' }}
      aria-label="Sichon Engineering Company"
    >
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ flex: '0 0 auto' }}>
        <rect width="64" height="64" rx="13" fill="var(--ink-band)" />
        <rect x="16" y="19" width="32" height="6" rx="1" fill="var(--accent)" />
        <rect x="16" y="29" width="24" height="6" rx="1" fill="var(--on-dark)" />
        <rect x="16" y="39" width="32" height="6" rx="1" fill="var(--accent)" />
      </svg>
      {wordmark && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.12rem',
            letterSpacing: '-0.01em',
            color: text,
            lineHeight: 1,
          }}
        >
          Sichon
        </span>
      )}
    </span>
  )
}
