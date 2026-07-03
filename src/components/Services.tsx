import Reveal from './Reveal'
import { services } from '../data/content'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">What we do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Four areas of practice.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From drawing boards to completed infrastructure — delivered with precision, within budget, and built to last.
            </p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {services.map((s, i) => (
            <Reveal as="div" key={s.id} delay={i * 0.05} className={styles.card}>
              <article id={s.id} className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.index}>{s.index}</span>
                  <h3 className={styles.title}>{s.title}</h3>
                </div>
                <p className={styles.summary}>{s.summary}</p>
                <ul className={styles.items}>
                  {s.items.map((it) => (
                    <li key={it}>
                      <span className={styles.dot} aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
