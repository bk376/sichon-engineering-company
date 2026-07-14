import Reveal from './Reveal'
import { manifesto, values, process, aspiration } from '../data/content'
import styles from './Standard.module.css'

/**
 * The Standard — one trust section, merged from what used to be four
 * (manifesto + values + process + the taste line). Storefront-lean: a
 * visitor gets who we are, what we promise, and what we stand for, in a
 * single scroll — then straight to the brief.
 */
export default function Standard() {
  return (
    <section className={`section ${styles.standard}`} id="standard">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className={`eyebrow ${styles.eyebrowDark}`}>{manifesto.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.heading}>{manifesto.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>{manifesto.body[0]}</p>
          </Reveal>
        </div>

        {/* What we stand for */}
        <Reveal delay={0.06}>
          <p className={styles.groupLabel}>What we stand for</p>
        </Reveal>
        <div className={styles.values}>
          {values.map((v, i) => (
            <Reveal as="div" key={v.title} delay={i * 0.04} className={styles.value}>
              <span className={styles.vIndex}>{v.index}</span>
              <h3 className={styles.vName}>{v.title}</h3>
              <p className={styles.vBody}>{v.body}</p>
            </Reveal>
          ))}
        </div>

        {/* How we work */}
        <Reveal delay={0.06}>
          <p className={styles.groupLabel}>How we work</p>
        </Reveal>
        <div className={styles.process}>
          {process.map((s, i) => (
            <Reveal as="div" key={s.index} delay={i * 0.05} className={styles.step}>
              <span className={styles.sNum}>{s.index}</span>
              <div>
                <h3 className={styles.sName}>{s.title}</h3>
                <p className={styles.sBody}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className={styles.close}>
            <p className={styles.closeLine}>{aspiration.close}</p>
            <a href="#desk" className={styles.cta}>See what you can commission&nbsp;<span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
