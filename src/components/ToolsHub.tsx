import { useState } from 'react'
import Reveal from './Reveal'
import SolarBody from './SolarTool'
import DrainageBody from './DrainageTool'
import { registry } from '../os/kernel'
import styles from './ToolsHub.module.css'
import toolStyles from './SolarTool.module.css'

const tabs = [
  { id: 'solar', label: '01 · Solar' },
  { id: 'drainage', label: '02 · Drainage' },
] as const

type TabId = (typeof tabs)[number]['id']

/**
 * The instruments of the desk. Each tab is a registered instrument
 * (SICHON-OS kernel) running real physics client-side. The hub scales:
 * new tools add a tab, not a page.
 */
export default function ToolsHub() {
  const [tab, setTab] = useState<TabId>('solar')

  return (
    <section className={`section ${toolStyles.tool}`} id="tools">
      <div className="container">
        <div className={toolStyles.head}>
          <Reveal>
            <p className="eyebrow">The instruments · {registry.length} online</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Run the numbers yourself.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Public instruments computing with the same engineering data we design
              with — calibrated to Kenya, assumptions printed, no email required.
              Honest numbers, then your call.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className={styles.tabs} role="tablist" aria-label="Engineering tools">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`${styles.tab} ${tab === t.id ? styles.active : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {tab === 'solar' ? <SolarBody /> : <DrainageBody />}
      </div>
    </section>
  )
}
