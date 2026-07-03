import { motion } from 'motion/react'
import { hero, company } from '../data/content'
import styles from './Hero.module.css'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <BlueprintArt />

      <div className={`container ${styles.inner}`}>
        <motion.p className={styles.kicker} custom={0} variants={rise} initial="hidden" animate="show">
          <span className={styles.tick} />
          {hero.kicker}
        </motion.p>

        <h1 className={styles.title}>
          <motion.span className={styles.line} custom={1} variants={rise} initial="hidden" animate="show">
            {hero.line1}
          </motion.span>
          <motion.span className={`${styles.line} ${styles.accent}`} custom={2} variants={rise} initial="hidden" animate="show">
            {hero.line2}
          </motion.span>
        </h1>

        <motion.p className={styles.statement} custom={3} variants={rise} initial="hidden" animate="show">
          {hero.statement}
        </motion.p>

        <motion.div className={styles.actions} custom={4} variants={rise} initial="hidden" animate="show">
          <a href="#services" className={styles.primary}>
            Explore our work
          </a>
          <a href={`mailto:${company.email}`} className={styles.secondary}>
            Start a project&nbsp;<span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.ul className={styles.method} custom={5} variants={rise} initial="hidden" animate="show">
          {hero.method.map((m, i) => (
            <li key={m}>
              <span className={styles.methodNum}>{String(i + 1).padStart(2, '0')}</span>
              {m}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className={styles.coords} aria-hidden="true">
        <span>01°17′S&nbsp;·&nbsp;36°49′E</span>
        <span>NAIROBI · KENYA</span>
      </div>
    </section>
  )
}

/** Faint architectural line-art: contour lines + a structural truss span. */
function BlueprintArt() {
  return (
    <svg className={styles.art} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* contour topography */}
      <g stroke="var(--line)" fill="none" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M-50 ${360 + i * 62} C 240 ${300 + i * 62}, 520 ${430 + i * 62}, 820 ${360 + i * 62} S 1300 ${300 + i * 62}, 1500 ${380 + i * 62}`}
          />
        ))}
      </g>

      {/* structural truss span */}
      <g className={styles.truss} stroke="var(--accent)" strokeWidth="1.4" fill="none" opacity="0.55">
        <line x1="900" y1="250" x2="1380" y2="250" />
        <line x1="900" y1="320" x2="1380" y2="320" />
        {Array.from({ length: 8 }).map((_, i) => {
          const x0 = 900 + i * 60
          return <g key={i}>
            <line x1={x0} y1="250" x2={x0} y2="320" />
            <line x1={x0} y1="320" x2={x0 + 60} y2="250" />
          </g>
        })}
      </g>

      {/* vertical scan line accent */}
      <rect x="899" y="0" width="1.5" height="900" fill="url(#fade)" />
    </svg>
  )
}
