import Reveal from './Reveal'
import { process } from '../data/content'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section className={`section ${styles.process}`} id="process">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">How we work</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Structured. Disciplined. Accountable.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Our approach is grounded in rigorous process, honest communication, and delivering exactly what we promise.
            </p>
          </Reveal>
        </div>

        <div className={styles.steps}>
          {process.map((s, i) => (
            <Reveal as="div" key={s.index} delay={i * 0.08} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={styles.num}>{s.index}</span>
                <span className={styles.node} aria-hidden="true" />
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
