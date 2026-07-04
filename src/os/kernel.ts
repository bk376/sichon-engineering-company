/* ═══════════════════════════════════════════════════════════
   SICHON-OS · AUTHORITY KERNEL v1
   ───────────────────────────────────────────────────────────
   The permission core of the entity. Every instrument (tool,
   microservice, agent) Sichon ships MUST import this kernel:

     1. registered in the instrument registry with an autonomy level,
     2. its outputs classified (PRELIM | STAMPED),
     3. its binding acts routed through requiresKey(),
     4. its governance language sourced from here — not hand-written.

   This file is the seed of the platform package (`@sichon/os`).
   When services split out (FastAPI etc.), this contract ports
   with them: same ladder, same keys, same rules, every runtime.

   Constitutional basis: docs/SICHON-OS.md (esp. §1 ladder, §7 keys).
   ═══════════════════════════════════════════════════════════ */

/** The Two Keys — constitutional root of the entity (§7).
    Identity by platform handle; never rendered on the public body. */
export const KEYS = Object.freeze({
  K1: 'bk376',
  K2: 'KropK',
} as const)

/** SHA-256 commitment to the godfather clause. Verifiable by revealing
    the preimage held by the keyholders. Embedded in every ops pulse. */
export const ATTESTATION =
  'sha256:3c38f8086aeb037097a190c06e64dbee02be0138b3281cbc1d6e4ca70b3f2f71'

/* ── The autonomy ladder (§1) ── */
export type Autonomy = 'L0' | 'L1' | 'L2' | 'L3'

/** Classes of acts an instrument or agent can perform. */
export type ActClass =
  | 'bind'    // contracts, payments, stamped deliverables → L0, human key
  | 'propose' // proposals, bids, invoices drafted → L1, human sends
  | 'publish' // estimates, site data, self-critiques → L2, agent acts
  | 'compute' // pure calculation, checks, hygiene → L3, fully autonomous

export function autonomyOf(act: ActClass): Autonomy {
  switch (act) {
    case 'bind': return 'L0'
    case 'propose': return 'L1'
    case 'publish': return 'L2'
    case 'compute': return 'L3'
  }
}

/** True when an act cannot leave the desk without a human key. */
export function requiresKey(act: ActClass): boolean {
  return act === 'bind' || act === 'propose'
}

/* ── Instrument registry ── */
export type OutputClass = 'PRELIM' | 'STAMPED'

export type Instrument = {
  id: string
  name: string
  version: string
  /** Highest act class this instrument performs autonomously. */
  autonomy: ActClass
  outputClass: OutputClass
}

/** Every live instrument of the desk. Tools register here or don't ship. */
export const registry: Instrument[] = [
  {
    id: 'solar-01',
    name: 'Solar estimator',
    version: '1.0.0',
    autonomy: 'publish', // L2: computes + publishes estimates on its own
    outputClass: 'PRELIM',
  },
]

/* ── Governance language (single source — instruments render these) ── */
export const STAMP_RULE =
  'Planning estimate. Final design needs a site survey and review by a licensed engineer.'

export const OUTPUT_STAMP: Record<OutputClass, string> = {
  PRELIM: 'PRELIM · FOR PLANNING',
  STAMPED: 'REVIEWED · EBK STAMPED',
}

/** Number of keyholders — the only key fact the public body may display. */
export const KEY_COUNT = Object.keys(KEYS).length
