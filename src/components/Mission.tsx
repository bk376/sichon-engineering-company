import Reveal from './Reveal'
import { mission } from '../data/content'
import styles from './Mission.module.css'

export default function Mission() {
  return (
    <section className={`section ${styles.mission}`} id="mission">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <Reveal>
              <p className="eyebrow">Our mission</p>
            </Reveal>
            <Reveal delay={0.05}>
              <blockquote className={styles.quote}>
                “{mission.quote}”
              </blockquote>
            </Reveal>
          </div>

          <div className={styles.right}>
            {mission.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className={styles.para}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.stats}>
          {mission.stats.map((s, i) => (
            <Reveal as="div" key={s.label} delay={i * 0.06} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
