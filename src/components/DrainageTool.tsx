import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import { counties } from '../data/solar'
import { estimateDrainage, slopes, zones, countyZone } from '../data/drainage'
import { OUTPUT_STAMP, STAMP_RULE, registry } from '../os/kernel'
import styles from './SolarTool.module.css'

/** This instrument's registration in the SICHON-OS kernel. */
const SELF = registry.find((i) => i.id === 'drainage-02')!

/**
 * Tool 02 — Drainage & flood snapshot body (rendered inside ToolsHub).
 * Rational-method peak runoff + Manning pipe sizing + on-plot retention,
 * calibrated to Kenyan climatic zones. Client-side, assumptions printed.
 */
export default function DrainageBody() {
  const [countyId, setCountyId] = useState('nairobi')
  const [roof, setRoof] = useState('')
  const [paved, setPaved] = useState('')
  const [green, setGreen] = useState('')
  const [slopeId, setSlopeId] = useState('gentle')
  const [outlet, setOutlet] = useState('yes')

  const est = useMemo(() => {
    return estimateDrainage({
      countyId,
      roofM2: parseFloat(roof) || 0,
      pavedM2: parseFloat(paved) || 0,
      greenM2: parseFloat(green) || 0,
      slopeId,
      hasOutlet: outlet === 'yes',
    })
  }, [countyId, roof, paved, green, slopeId, outlet])

  const zone = zones[countyZone[countyId] ?? 'semiarid']

  return (
    <div className={styles.grid}>
      {/* ── Inputs ── */}
      <Reveal className={styles.inputs}>
        <div className={styles.field}>
          <label htmlFor="dr-county">Your county</label>
          <select id="dr-county" value={countyId} onChange={(e) => setCountyId(e.target.value)}>
            {counties.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="dr-roof">Roof area, m²</label>
            <input id="dr-roof" type="number" inputMode="numeric" min="0"
              placeholder="e.g. 180" value={roof} onChange={(e) => setRoof(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="dr-paved">Paved area, m²</label>
            <input id="dr-paved" type="number" inputMode="numeric" min="0"
              placeholder="e.g. 120" value={paved} onChange={(e) => setPaved(e.target.value)} />
          </div>
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="dr-green">Garden / green, m²</label>
            <input id="dr-green" type="number" inputMode="numeric" min="0"
              placeholder="e.g. 200" value={green} onChange={(e) => setGreen(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="dr-slope">Site slope</label>
            <select id="dr-slope" value={slopeId} onChange={(e) => setSlopeId(e.target.value)}>
              {slopes.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="dr-outlet">Formal outlet nearby? (road drain, culvert)</label>
          <select id="dr-outlet" value={outlet} onChange={(e) => setOutlet(e.target.value)}>
            <option value="yes">Yes — there is a drain to discharge to</option>
            <option value="no">No — the plot must handle its own water</option>
          </select>
        </div>

        <p className={styles.assumptions}>
          Rational method (Q = C·i·A) with a 1-hr, ~10-year design storm ·
          {' '}{zone.name} zone ≈ {zone.i10} mm/hr (TRRL East African-derived) ·
          Manning n 0.013, standard concrete pipes · roof C 0.90, paved 0.85,
          green 0.25.
        </p>
      </Reveal>

      {/* ── Spec plate ── */}
      <Reveal delay={0.08} className={styles.plateWrap}>
        {est ? (
          <div className={styles.plate} aria-live="polite">
            <div className={styles.plateHead}>
              <span className={styles.plateStamp}>{OUTPUT_STAMP[SELF.outputClass]}</span>
              <span className={styles.plateLoc}>
                {zone.name} · {zone.i10} mm/hr design storm
              </span>
            </div>

            <div className={styles.hero}>
              <span className={styles.heroValue}>{est.peakLps}</span>
              <span className={styles.heroUnit}>L/s peak runoff</span>
            </div>

            <dl className={styles.stats}>
              <div><dt>Catchment</dt><dd>{est.areaM2.toLocaleString()} m²</dd></div>
              <div><dt>Runoff coeff.</dt><dd>C = {est.weightedC}</dd></div>
              <div><dt>Pipe required</dt><dd>{est.pipeMm ? `Ø ${est.pipeMm} mm` : '> 900 mm — major'}</dd></div>
              <div><dt>At slope</dt><dd>{est.slopeLabel}</dd></div>
              <div><dt>Storm volume</dt><dd>{est.stormVolM3} m³/hr</dd></div>
              <div><dt>Retain on-plot</dt><dd>{est.retainM3} m³ ≈ {est.soakPits} soak pit{est.soakPits > 1 ? 's' : ''}</dd></div>
            </dl>

            {est.flags.map((f) => (
              <p key={f} className={styles.note}>{f}</p>
            ))}

            <div className={styles.plateActions}>
              <a href="#desk" className={styles.cta}>
                Get the full assessment — KSh 45,000 →
              </a>
              <span className={styles.disclaimer}>{STAMP_RULE}</span>
            </div>
          </div>
        ) : (
          <div className={`${styles.plate} ${styles.plateEmpty}`}>
            <span className={styles.plateStamp}>AWAITING INPUT</span>
            <p>
              Enter your surfaces — peak runoff, pipe size, and on-plot retention
              compute here, instantly, in your browser.
            </p>
          </div>
        )}
      </Reveal>
    </div>
  )
}
