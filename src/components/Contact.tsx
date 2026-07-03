import Reveal from './Reveal'
import Logo from './Logo'
import { company, nav } from '../data/content'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.cta}>
          <Reveal>
            <p className={`eyebrow ${styles.eyebrowDark}`}>Get in touch</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.title}>
              Let’s build something<br />that lasts.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={styles.channels}>
              <a href={`mailto:${company.email}`} className={styles.channel}>
                <span className={styles.channelLabel}>Email</span>
                <span className={styles.channelValue}>{company.email}</span>
              </a>
              <a href={`tel:${company.phoneHref}`} className={styles.channel}>
                <span className={styles.channelLabel}>Phone</span>
                <span className={styles.channelValue}>{company.phone}</span>
              </a>
              <div className={styles.channel}>
                <span className={styles.channelLabel}>Location</span>
                <span className={styles.channelValue}>{company.location}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <div className={styles.brandCol}>
            <Logo tone="paper" />
            <p className={styles.brandNote}>
              {company.name}
              <span className={styles.taifa}>{company.tagline} · {company.taglineSw}</span>
            </p>
          </div>

          <nav className={styles.footNav} aria-label="Footer">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
        </div>

        <div className={styles.legal}>
          <span>© {company.founded} {company.name}. All rights reserved.</span>
          <span className={styles.mono}>{company.location} · Est. {company.founded}</span>
        </div>
      </div>
    </footer>
  )
}
