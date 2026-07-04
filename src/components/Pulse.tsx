import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { KEY_COUNT, registry } from '../os/kernel'
import styles from './Pulse.module.css'

type Ops = {
  version: string
  heartbeat: string
  status: string
  focus: string
  changelog: { date: string; entry: string }[]
}

const REPO = 'bk376/sichon-engineering-company'

function relative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const h = Math.floor(ms / 3_600_000)
  if (h < 1) return 'under an hour ago'
  if (h < 48) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

/**
 * SICHON-OS · the Pulse. The entity's vital signs, read live from its own
 * repository and ops ledger. Not a dashboard aesthetic — actual telemetry:
 * if the heart stops, this section says so, publicly.
 */
export default function Pulse() {
  const [ops, setOps] = useState<Ops | null>(null)
  const [beat, setBeat] = useState<string | null>(null)
  const [critiques, setCritiques] = useState<number | null>(null)

  useEffect(() => {
    // Own ledger (always available — ships with the body).
    fetch(`${import.meta.env.BASE_URL}state/ops.json`)
      .then((r) => r.json())
      .then(setOps)
      .catch(() => {})
    // Live repo telemetry (graceful when rate-limited/offline).
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.pushed_at && setBeat(d.pushed_at))
      .catch(() => {})
    fetch(`https://api.github.com/repos/${REPO}/issues?labels=self-critique&state=open&per_page=1`)
      .then((r) => {
        if (!r.ok) return null
        const link = r.headers.get('link')
        const m = link?.match(/&page=(\d+)>; rel="last"/)
        return r.json().then((arr: unknown[]) => (m ? +m[1] : arr.length))
      })
      .then((n) => n !== null && n !== undefined && setCritiques(n))
      .catch(() => {})
  }, [])

  const heartbeat = beat ?? ops?.heartbeat
  const latest = ops?.changelog?.[0]

  return (
    <section className={styles.pulse} id="pulse" aria-label="Live company vitals">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <div className={styles.head}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>SICHON-OS · THE PULSE</span>
            <span className={styles.sub}>vital signs, read live from our own repository</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className={styles.vitals}>
            <div>
              <dt>Last heartbeat</dt>
              <dd>{heartbeat ? relative(heartbeat) : '—'}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className={ops?.status === 'nominal' ? styles.ok : undefined}>
                {ops?.status ?? '—'}
              </dd>
            </div>
            <div>
              <dt>Instruments online</dt>
              <dd>{registry.length}</dd>
            </div>
            <div>
              <dt>Open self-critiques</dt>
              <dd>{critiques ?? '0'}</dd>
            </div>
            <div>
              <dt>Keys</dt>
              <dd>{KEY_COUNT}/{KEY_COUNT}</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>{ops?.focus ?? '—'}</dd>
            </div>
          </dl>
        </Reveal>

        {latest && (
          <Reveal delay={0.12}>
            <p className={styles.log}>
              <span>{latest.date}</span> {latest.entry}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
