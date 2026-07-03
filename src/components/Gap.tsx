import Reveal from './Reveal'
import { gap } from '../data/content'
import styles from './Gap.module.css'

export default function Gap() {
  return (
    <section className={`section ${styles.gap}`} id="gap">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">The gap, in numbers</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">The distance is measurable. So is the answer.</h2>
          </Reveal>
        </div>

        <div className={styles.list}>
          {gap.map((g, i) => (
            <Reveal as="div" key={g.figure} delay={i * 0.06} className={styles.row}>
              <div className={styles.figureCol}>
                <span className={styles.figure}>{g.figure}</span>
                <span className={styles.source}>{g.source}</span>
              </div>
              <div className={styles.bodyCol}>
                <p className={styles.label}>{g.label}</p>
                <p className={styles.detail}>{g.detail}</p>
              </div>
              <div className={styles.answerCol}>
                <span className={styles.answerLabel}>Our answer</span>
                <span className={styles.answer}>{g.answer}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
