import Reveal from './Reveal'
import { aspiration } from '../data/content'
import styles from './Aspiration.module.css'

/** Small line-art vignette per scene, in the drawing language of the site. */
function Vignette({ i }: { i: number }) {
  const common = {
    width: 76,
    height: 60,
    viewBox: '0 0 76 60',
    fill: 'none',
    'aria-hidden': true as const,
  }
  const steel = 'var(--steel)'
  const accent = 'var(--accent)'
  const leaf = 'var(--leaf)'

  if (i === 0)
    // School run: road + street-light + rain
    return (
      <svg {...common}>
        <line x1="2" y1="50" x2="74" y2="50" stroke={steel} strokeWidth="1.2" />
        <path d="M26 50 L34 28 L42 28 L50 50" stroke={steel} strokeWidth="1.3" />
        <line x1="38" y1="50" x2="38" y2="28" stroke={accent} strokeWidth="1.4" strokeDasharray="3 4" />
        <line x1="14" y1="50" x2="14" y2="30" stroke={steel} strokeWidth="1.2" />
        <circle cx="14" cy="28" r="3.4" fill={accent} />
        <g stroke={steel} strokeWidth="0.8" opacity="0.6">
          <line x1="58" y1="16" x2="55" y2="24" /><line x1="64" y1="18" x2="61" y2="26" /><line x1="52" y1="20" x2="49" y2="28" />
        </g>
      </svg>
    )
  if (i === 1)
    // Evening: home + sun
    return (
      <svg {...common}>
        <line x1="2" y1="50" x2="74" y2="50" stroke={steel} strokeWidth="1.2" />
        <path d="M18 50 L18 32 L34 20 L50 32 L50 50 Z" stroke={steel} strokeWidth="1.3" />
        <rect x="30" y="38" width="8" height="12" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="1" />
        <circle cx="60" cy="18" r="7" fill={accent} fillOpacity="0.85" />
      </svg>
    )
  if (i === 2)
    // Commons: tree + gathering
    return (
      <svg {...common}>
        <line x1="2" y1="50" x2="74" y2="50" stroke={steel} strokeWidth="1.2" />
        <line x1="38" y1="50" x2="38" y2="30" stroke={steel} strokeWidth="1.3" />
        <g stroke={leaf} strokeWidth="1.3" fill={leaf} fillOpacity="0.12">
          <circle cx="38" cy="22" r="11" /><circle cx="30" cy="30" r="8" /><circle cx="46" cy="30" r="8" />
        </g>
        <g fill={steel}><circle cx="16" cy="47" r="2" /><circle cx="60" cy="47" r="2" /></g>
      </svg>
    )
  // Line: retaining wall + hill
  return (
    <svg {...common}>
      <path d="M2 22 C 20 14, 40 22, 74 12" stroke={steel} strokeWidth="1" opacity="0.55" />
      <line x1="2" y1="50" x2="74" y2="50" stroke={steel} strokeWidth="1.2" />
      <path d="M20 50 L20 34 L34 34 L34 30 L50 30 L50 50" stroke={steel} strokeWidth="1.3" />
      <g stroke={steel} strokeWidth="0.7" opacity="0.5">
        <line x1="24" y1="50" x2="21" y2="36" /><line x1="32" y1="50" x2="29" y2="36" /><line x1="42" y1="50" x2="39" y2="32" />
      </g>
    </svg>
  )
}

export default function Aspiration() {
  return (
    <section className={`section ${styles.aspiration}`} id="taste">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">{aspiration.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.heading}>{aspiration.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>{aspiration.lede}</p>
          </Reveal>
        </div>

        <div className={styles.scenes}>
          {aspiration.scenes.map((s, i) => (
            <Reveal as="div" key={s.moment} delay={i * 0.07} className={styles.scene}>
              <div className={styles.vignette}>
                <Vignette i={i} />
              </div>
              <span className={styles.moment}>{s.moment}</span>
              <p className={styles.line}>{s.line}</p>
              <span className={styles.tag}>{s.tag}</span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className={styles.close}>{aspiration.close}</p>
        </Reveal>
      </div>
    </section>
  )
}
