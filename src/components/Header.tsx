import { useEffect, useState } from 'react'
import Logo from './Logo'
import { nav } from '../data/content'
import styles from './Header.module.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Sichon Engineering — home">
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={styles.link}>
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#brief" className={styles.cta}>
          Start a brief
        </a>

        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span data-open={open} />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="#brief" className={styles.mobileCta} onClick={() => setOpen(false)}>
            Start a brief
          </a>
        </nav>
      )}
    </header>
  )
}
