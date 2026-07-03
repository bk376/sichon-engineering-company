import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'
import { brief, company } from '../data/content'
import styles from './Brief.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const KEY_SET = brief.web3formsKey && !brief.web3formsKey.startsWith('REPLACE')

export default function Brief() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill hidden fields; humans never see it.
    if (String(data.get('website') || '')) {
      setStatus('success')
      return
    }

    const name = String(data.get('name') || '')
    const org = String(data.get('org') || '')
    const focus = String(data.get('focus') || '')
    const location = String(data.get('location') || '')
    const message = String(data.get('message') || '')

    // Graceful fallback: no Web3Forms key yet → compose an email.
    if (!KEY_SET) {
      const subject = encodeURIComponent(`Project brief — ${name || 'New enquiry'}`)
      const body = encodeURIComponent(
        `Name: ${name}\nOrganisation: ${org}\nFocus: ${focus}\nLocation: ${location}\n\n${message}`,
      )
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }

    try {
      setStatus('submitting')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: brief.web3formsKey,
          subject: `Project brief — ${name}`,
          from_name: 'Sichon website',
          name, org, focus, location, message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`section ${styles.brief}`} id="brief">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <Reveal>
              <p className="eyebrow">Start a brief</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className={styles.title}>Tell us what you’re building.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.lead}>
                A road, a wall, a solar array, a whole site — or just an idea that needs an engineer’s eye.
                Send the shape of it and we’ll come back with a considered next step.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.direct}>
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={styles.formWrap}>
            {status === 'success' ? (
              <div className={styles.success} role="status">
                <span className={styles.successMark} aria-hidden="true" />
                <h3>Thank you.</h3>
                <p>
                  {KEY_SET
                    ? 'Your brief has reached us. We read every one and will reply personally.'
                    : 'Your email is ready to send — just hit send in your mail app. We reply to every brief personally.'}
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                {/* honeypot — hidden from humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />
                <div className={styles.field}>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="org">Organisation <span>(optional)</span></label>
                  <input id="org" name="org" type="text" autoComplete="organization" />
                </div>
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label htmlFor="focus">What you’re building</label>
                    <select id="focus" name="focus" defaultValue="">
                      <option value="" disabled>Choose an area…</option>
                      {brief.focusOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="location">Location <span>(county / town)</span></label>
                    <input id="location" name="location" type="text" placeholder="e.g. Nairobi" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">The brief</label>
                  <textarea id="message" name="message" rows={4} required placeholder="Scope, scale, timeline, anything relevant…" />
                </div>

                {status === 'error' && (
                  <p className={styles.err}>Something went wrong. Please email us directly at {company.email}.</p>
                )}

                <button className={styles.submit} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send brief'} <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
