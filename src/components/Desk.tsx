import Reveal from './Reveal'
import { skus, deposit, rails, railsNote, usdRate, type Sku } from '../data/desk'
import { company } from '../data/content'
import { OUTPUT_STAMP } from '../os/kernel'
import styles from './Desk.module.css'

function orderHref(sku: Sku): string {
  if (sku.paymentLink) return sku.paymentLink
  const msg = sku.waitlist
    ? `Waitlist: ${sku.id} — ${sku.name}. Notify me when it opens. My project: `
    : `Order ${sku.id} — ${sku.name} (KSh ${sku.priceKsh.toLocaleString()}). Project location: `
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`
}

/**
 * The Desk — fixed-price, tool-accelerated, engineer-stamped deliverables.
 * The entity's earning engine (SICHON-OS §5): nobody else in Kenya sells
 * engineering as an SKU with a printed price and a turnaround clock.
 */
export default function Desk() {
  return (
    <section className={`section ${styles.desk}`} id="desk">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">The Desk — fixed prices, real deadlines</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Engineering you can simply buy.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              No "request a quote" theatre. A printed price, a turnaround clock,
              and a licensed engineer's review on everything that leaves the desk.
            </p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {skus.map((sku, i) => (
            <Reveal as="div" key={sku.id} delay={i * 0.06} className={styles.card}>
              <article className={styles.inner}>
                <div className={styles.top}>
                  <span className={styles.index}>{sku.index}</span>
                  <span className={styles.badge}>
                    {sku.waitlist ? 'OPENING SOON' : OUTPUT_STAMP.STAMPED}
                  </span>
                </div>

                <h3 className={styles.name}>{sku.name}</h3>

                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    <span className={styles.cur}>KSh</span>
                    {sku.priceKsh.toLocaleString()}
                  </span>
                  <span className={styles.usd}>≈ ${Math.round(sku.priceKsh / usdRate)}</span>
                  <span className={styles.turnaround}>{sku.turnaround}</span>
                </div>

                {sku.from && <p className={styles.from}>{sku.from}</p>}

                <ul className={styles.includes}>
                  {sku.includes.map((it) => (
                    <li key={it}>
                      <span className={styles.tick} aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  className={`${styles.buy} ${sku.waitlist ? styles.buyWait : ''}`}
                  href={orderHref(sku)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {sku.waitlist ? 'Join the waitlist' : 'Commission this'}{' '}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className={styles.money}>
            <div className={styles.rails}>
              <span className={styles.railsLabel}>Money traffic — worldwide</span>
              <ul>
                {rails.map((r) => (
                  <li key={r.id}>{r.label}</li>
                ))}
              </ul>
            </div>
            <p className={styles.deposit}>{deposit.note} {railsNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
