/* ═══════════════════════════════════════════════════════════
   DRAINAGE & FLOOD SNAPSHOT — Tool 02 of the desk.
   Rational-method runoff + Manning pipe sizing, Kenya-calibrated.

   Method basis (preliminary, planning-grade):
   - Peak runoff: Rational Method, Q = C·i·A — the standard for
     small urban catchments (< ~80 ha), as used in the Kenya roads
     & drainage design practice descended from the TRRL East
     African rainfall studies.
   - Design storm: 1-hr duration, ~10-year return intensity by
     climatic zone (Kenya Met / TRRL-derived, rounded):
     lake basin 80 · coast 70 · highlands 65 · semi-arid 55 ·
     arid 45 mm/hr.
   - Conveyance: Manning full-flow capacity, concrete n = 0.013,
     standard pipe diameters 225–900 mm.
   - Runoff coefficients (standard rational tables): roof 0.90,
     paved 0.85, green/garden 0.25.

   All outputs are preliminary. Final drainage design requires a
   site survey, actual IDF data, and a licensed engineer's review.
   ═══════════════════════════════════════════════════════════ */

export type ZoneId = 'lake' | 'coast' | 'highland' | 'semiarid' | 'arid'

export const zones: Record<ZoneId, { name: string; i10: number }> = {
  lake: { name: 'Lake basin', i10: 80 },
  coast: { name: 'Coastal', i10: 70 },
  highland: { name: 'Highlands', i10: 65 },
  semiarid: { name: 'Semi-arid', i10: 55 },
  arid: { name: 'Arid', i10: 45 },
}

/** County → climatic zone (same county ids as the solar table). */
export const countyZone: Record<string, ZoneId> = {
  nairobi: 'highland', kiambu: 'highland', nyeri: 'highland',
  nakuru: 'highland', eldoret: 'highland', embu: 'highland',
  meru: 'highland', narok: 'highland',
  kisumu: 'lake', kericho: 'lake', kisii: 'lake',
  kakamega: 'lake', bungoma: 'lake', homabay: 'lake',
  mombasa: 'coast', kilifi: 'coast', kwale: 'coast', lamu: 'coast',
  machakos: 'semiarid', kajiado: 'semiarid', kitui: 'semiarid',
  laikipia: 'semiarid', taita: 'semiarid', other: 'semiarid',
  isiolo: 'arid', garissa: 'arid', wajir: 'arid',
  mandera: 'arid', marsabit: 'arid', turkana: 'arid',
}

export const runoffC = { roof: 0.9, paved: 0.85, green: 0.25 } as const

export const slopes = [
  { id: 'flat', label: 'Flat (< 1%)', s: 0.005 },
  { id: 'gentle', label: 'Gentle (1–2%)', s: 0.01 },
  { id: 'moderate', label: 'Moderate (2–4%)', s: 0.02 },
  { id: 'steep', label: 'Steep (> 4%)', s: 0.04 },
] as const

const PIPES_MM = [225, 300, 375, 450, 525, 600, 750, 900]
const MANNING_N = 0.013
/** Effective volume of a typical 1.2 m Ø × 3 m soak pit, m³. */
const SOAK_PIT_M3 = 3.4

export type DrainageInput = {
  countyId: string
  roofM2: number
  pavedM2: number
  greenM2: number
  slopeId: string
  hasOutlet: boolean
}

export type DrainageEstimate = {
  zone: { name: string; i10: number }
  areaM2: number
  weightedC: number
  peakLps: number
  pipeMm: number | null
  slopeLabel: string
  stormVolM3: number
  retainM3: number
  soakPits: number
  flags: string[]
}

/** Manning full-flow capacity of a circular concrete pipe, m³/s. */
function pipeCapacity(dM: number, s: number): number {
  const area = (Math.PI * dM * dM) / 4
  const rH = dM / 4
  return (1 / MANNING_N) * area * Math.pow(rH, 2 / 3) * Math.sqrt(s)
}

/** Pure estimator — deterministic, unit-testable, no I/O. */
export function estimateDrainage(input: DrainageInput): DrainageEstimate | null {
  const zoneId = countyZone[input.countyId] ?? 'semiarid'
  const zone = zones[zoneId]
  const slope = slopes.find((s) => s.id === input.slopeId) ?? slopes[1]

  const roof = Math.max(0, input.roofM2 || 0)
  const paved = Math.max(0, input.pavedM2 || 0)
  const green = Math.max(0, input.greenM2 || 0)
  const areaM2 = roof + paved + green
  if (areaM2 <= 0) return null

  const weightedC =
    (roof * runoffC.roof + paved * runoffC.paved + green * runoffC.green) / areaM2

  // Rational method: Q [m³/s] = C · i [mm/hr] · A [m²] / 3.6e6
  const peakM3s = (weightedC * zone.i10 * areaM2) / 3.6e6
  const peakLps = Math.round(peakM3s * 1000 * 10) / 10

  // Smallest standard pipe with full-flow capacity ≥ peak.
  const pipeMm = PIPES_MM.find((d) => pipeCapacity(d / 1000, slope.s) >= peakM3s) ?? null

  // 1-hr design-storm runoff volume, m³.
  const stormVolM3 = Math.round((weightedC * zone.i10 * areaM2) / 1000)
  // On-site retention target: 50% with no outlet, 25% with one.
  const retainM3 = Math.round(stormVolM3 * (input.hasOutlet ? 0.25 : 0.5))
  const soakPits = Math.max(1, Math.ceil(retainM3 / SOAK_PIT_M3))

  const flags: string[] = []
  if (slope.id === 'flat' && weightedC > 0.5)
    flags.push('Flat site with mostly hard surfaces — high ponding risk. Retention and falls need careful design.')
  if (slope.id === 'steep' && green / areaM2 < 0.3)
    flags.push('Steep, hard site — erosion and downstream scour risk. Energy dissipation needed at outfalls.')
  if (!input.hasOutlet)
    flags.push('No formal outlet — the site must soak or store its own storm water on plot.')
  if (zoneId === 'lake')
    flags.push('Lake-basin intensities are Kenya’s highest — allow headroom above this preliminary sizing.')

  return {
    zone, areaM2, weightedC: Math.round(weightedC * 100) / 100,
    peakLps, pipeMm, slopeLabel: slope.label,
    stormVolM3, retainM3, soakPits, flags,
  }
}
