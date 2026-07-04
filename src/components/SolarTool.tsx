import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import { counties, estimateSolar, ksh, model } from '../data/solar'
import { OUTPUT_STAMP, STAMP_RULE, registry } from '../os/kernel'
import styles from './SolarTool.module.css'

/** This instrument's registration in the SICHON-OS kernel. */
const SELF = registry.find((i) => i.id === 'solar-01')!

type Mode = 'bill' | 'kwh'

/**
 * Tools · 01 — Solar estimator. Real Kenya-calibrated physics running
 * client-side (GSA yields, KPLC tariffs, local install costs). The first
 * working instrument of the Sichon engineering desk: the site stops
 * describing computational engineering and starts doing it.
 */
export default function SolarTool() {
  const [countyId, setCountyId] = useState('nairobi')
  const [mode, setMode] = useState<Mode>('bill')
  const [amount, setAmount] = useState('')
  const [roof, setRoof] = useState('')

  const est = useMemo(() => {
    const n = parseFloat(amount)
    if (!n || n <= 0) return null
    return estimateSolar({
      countyId,
      monthlyBillKsh: mode === 'bill' ? n : undefined,
      monthlyKwh: mode === 'kwh' ? n : undefined,
      roofM2: parseFloat(roof) > 0 ? parseFloat(roof) : undefined,
    })
  }, [countyId, mode, amount, roof])

  return (
    <section className={`section ${styles.tool}`} id="tools">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">Tools · 01 — Solar</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Run the numbers yourself.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Our first public instrument: a solar estimate computed with the same
              engineering data we design with — Global Solar Atlas yields for your
              county, current KPLC tariffs, real Kenyan install costs. No email
              required. Honest numbers, then your call.
            </p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {/* ── Inputs ── */}
          <Reveal className={styles.inputs}>
            <div className={styles.field}>
              <label htmlFor="st-county">Your county</label>
              <select id="st-county" value={countyId} onChange={(e) => setCountyId(e.target.value)}>
                {counties.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <div className={styles.modeRow}>
                <label htmlFor="st-amount">
                  {mode === 'bill' ? 'Monthly power bill (KSh)' : 'Monthly consumption (kWh)'}
                </label>
                <button
                  type="button"
                  className={styles.modeSwitch}
                  onClick={() => setMode(mode === 'bill' ? 'kwh' : 'bill')}
                >
                  {mode === 'bill' ? 'I know my kWh →' : '← Use my bill instead'}
                </button>
              </div>
              <input
                id="st-amount"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder={mode === 'bill' ? 'e.g. 8,000' : 'e.g. 280'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="st-roof">Usable roof area, m² <span>(optional)</span></label>
              <input
                id="st-roof"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="Leave blank if unsure"
                value={roof}
                onChange={(e) => setRoof(e.target.value)}
              />
            </div>

            <p className={styles.assumptions}>
              Assumes grid-tie, no battery · self-consumption {Math.round(model.selfUse * 100)}%
              (net metering is not yet operational in Kenya) · install cost
              KSh {ksh(model.costPerKwp.low)}–{ksh(model.costPerKwp.high)}/kWp ·
              KPLC all-in tariff ≈ KSh {model.tariffAllIn}/kWh.
            </p>
          </Reveal>

          {/* ── Spec plate ── */}
          <Reveal delay={0.08} className={styles.plateWrap}>
            {est ? (
              <div className={styles.plate} aria-live="polite">
                <div className={styles.plateHead}>
                  <span className={styles.plateStamp}>{OUTPUT_STAMP[SELF.outputClass]}</span>
                  <span className={styles.plateLoc}>
                    {est.county.name} · {est.county.pvout} kWh/kWp/day
                  </span>
                </div>

                <div className={styles.hero}>
                  <span className={styles.heroValue}>{est.systemKwp}</span>
                  <span className={styles.heroUnit}>kWp system</span>
                </div>

                <dl className={styles.stats}>
                  <div><dt>Panels (550 W)</dt><dd>{est.panels}</dd></div>
                  <div><dt>Roof needed</dt><dd>{est.roofNeededM2} m²</dd></div>
                  <div><dt>Yearly generation</dt><dd>{est.annualGenKwh.toLocaleString()} kWh</dd></div>
                  <div><dt>Monthly saving</dt><dd>KSh {ksh(est.savingsMonthKsh)}</dd></div>
                  <div><dt>Installed cost</dt><dd>KSh {ksh(est.capexKsh.low)}–{ksh(est.capexKsh.high)}</dd></div>
                  <div><dt>Payback</dt><dd>{est.paybackYears.best}–{est.paybackYears.worst} yrs</dd></div>
                </dl>

                <p className={styles.lifetime}>
                  ≈ <strong>KSh {ksh(est.lifetimeSavingsKsh)}</strong> net saving over
                  {' '}{model.lifeYears} years — plus power through blackouts with a
                  battery option.
                </p>

                {est.roofCapped && (
                  <p className={styles.note}>Sized to your roof — it covers part of your usage.</p>
                )}
                {est.lowConsumption && (
                  <p className={styles.note}>
                    At lifeline consumption (&lt;30 kWh) grid power is subsidised —
                    solar may not pay back quickly. We’ll tell you honestly.
                  </p>
                )}

                <div className={styles.plateActions}>
                  <a href="#desk" className={styles.cta}>
                    Turn this into a stamped design — KSh 15,000 →
                  </a>
                  <span className={styles.disclaimer}>{STAMP_RULE}</span>
                </div>
              </div>
            ) : (
              <div className={`${styles.plate} ${styles.plateEmpty}`}>
                <span className={styles.plateStamp}>AWAITING INPUT</span>
                <p>
                  Enter your county and monthly bill — the estimate computes here,
                  instantly, in your browser.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
