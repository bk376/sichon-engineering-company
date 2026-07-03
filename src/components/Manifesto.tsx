import Reveal from './Reveal'
import { manifesto } from '../data/content'
import styles from './Manifesto.module.css'

export default function Manifesto() {
  return (
    <section className={`section ${styles.manifesto}`} id="standard">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <Reveal>
              <p className={`eyebrow ${styles.eyebrowDark}`}>{manifesto.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className={styles.heading}>{manifesto.heading}</h2>
            </Reveal>
          </div>

          <div className={styles.right}>
            {manifesto.body.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className={styles.para}>{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.28}>
              <ul className={styles.promise}>
                {manifesto.promise.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.36}>
              <a href="#brief" className={styles.cta}>
                Send us a brief&nbsp;<span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
