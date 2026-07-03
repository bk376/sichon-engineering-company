import Reveal from './Reveal'
import { values } from '../data/content'
import styles from './Values.module.css'

export default function Values() {
  return (
    <section className={`section ${styles.values}`} id="values">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className={`eyebrow ${styles.eyebrowDark}`}>What we stand for</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.title}>Five values.<br />No exceptions.</h2>
          </Reveal>
        </div>

        <div className={styles.list}>
          {values.map((v, i) => (
            <Reveal as="div" key={v.title} delay={i * 0.05} className={styles.row}>
              <span className={styles.index}>{v.index}</span>
              <h3 className={styles.name}>{v.title}</h3>
              <p className={styles.body}>{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
