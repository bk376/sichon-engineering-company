/* ═══════════════════════════════════════════════════════════
   SOLAR ESTIMATOR — Kenya-calibrated physics, client-side.
   Tool 01 of the Sichon engineering desk.

   Sources (verified July 2026):
   - PVOUT (specific yield, kWh/kWp/day): Global Solar Atlas /
     World Bank "Kenya — Solar irradiation and PV power potential"
     long-term county-level averages (Kenya mean ≈ 4.5).
   - Tariff: KPLC domestic energy charges (Jul 2025, frozen 2026):
     DC1 ≤30 kWh 12.23 · DC2 31–100 kWh 16.45 · DC3 >100 kWh 19.08
     KSh/kWh — all-in with levies ≈ 1.5–1.7×. We use a blended
     all-in figure per band below.
   - Installed cost, grid-tie (no battery): ~KSh 70k–110k per kWp
     (Kenya installer market surveys, 2025/26). Midpoint 90k.
   - Net metering is NOT operational in Kenya → savings modeled on
     self-consumption only (default 80% of generation usable).

   Every output is a preliminary planning estimate. Final design
   requires a site survey and review by a licensed (EBK) engineer.
   ═══════════════════════════════════════════════════════════ */

export type County = { id: string; name: string; pvout: number }

/** Long-term average specific yield, kWh/kWp/day (GSA-derived, rounded). */
export const counties: County[] = [
  { id: 'nairobi', name: 'Nairobi', pvout: 4.3 },
  { id: 'mombasa', name: 'Mombasa', pvout: 4.5 },
  { id: 'kisumu', name: 'Kisumu', pvout: 4.7 },
  { id: 'nakuru', name: 'Nakuru', pvout: 4.7 },
  { id: 'eldoret', name: 'Uasin Gishu (Eldoret)', pvout: 4.8 },
  { id: 'kiambu', name: 'Kiambu / Thika', pvout: 4.4 },
  { id: 'machakos', name: 'Machakos', pvout: 4.9 },
  { id: 'kajiado', name: 'Kajiado', pvout: 4.9 },
  { id: 'kitui', name: 'Kitui', pvout: 5.0 },
  { id: 'embu', name: 'Embu', pvout: 4.7 },
  { id: 'meru', name: 'Meru', pvout: 4.8 },
  { id: 'nyeri', name: 'Nyeri', pvout: 4.6 },
  { id: 'laikipia', name: 'Laikipia (Nanyuki)', pvout: 5.0 },
  { id: 'kilifi', name: 'Kilifi / Malindi', pvout: 4.6 },
  { id: 'kwale', name: 'Kwale', pvout: 4.5 },
  { id: 'lamu', name: 'Lamu', pvout: 4.7 },
  { id: 'taita', name: 'Taita-Taveta (Voi)', pvout: 5.0 },
  { id: 'garissa', name: 'Garissa', pvout: 5.2 },
  { id: 'wajir', name: 'Wajir', pvout: 5.3 },
  { id: 'mandera', name: 'Mandera', pvout: 5.4 },
  { id: 'isiolo', name: 'Isiolo', pvout: 5.1 },
  { id: 'marsabit', name: 'Marsabit', pvout: 5.3 },
  { id: 'turkana', name: 'Turkana (Lodwar)', pvout: 5.3 },
  { id: 'narok', name: 'Narok', pvout: 4.8 },
  { id: 'kericho', name: 'Kericho', pvout: 4.4 },
  { id: 'kisii', name: 'Kisii', pvout: 4.4 },
  { id: 'kakamega', name: 'Kakamega', pvout: 4.5 },
  { id: 'bungoma', name: 'Bungoma', pvout: 4.6 },
  { id: 'homabay', name: 'Homa Bay', pvout: 4.8 },
  { id: 'other', name: 'Elsewhere in Kenya', pvout: 4.5 },
]

/* ── Model constants (all sourced above) ── */
export const model = {
  /** Blended all-in KSh/kWh for a >100 kWh/month household (energy + levies). */
  tariffAllIn: 28,
  /** All-in tariff used when consumption ≤ 100 kWh/month. */
  tariffAllInLow: 24,
  /** Installed grid-tie cost per kWp, KSh. */
  costPerKwp: { low: 70_000, mid: 90_000, high: 110_000 },
  /** Panel: 550 W monocrystalline. */
  panelKw: 0.55,
  /** Roof area per kWp incl. access/spacing, m². */
  m2PerKwp: 4.8,
  /** Share of generation used on-site (no net metering in Kenya; most home
      load is evening — honest blended figure, not the industry's flattery). */
  selfUse: 0.65,
  /** System lifetime for context, years. */
  lifeYears: 25,
} as const

export type SolarInput = {
  countyId: string
  /** Monthly consumption in kWh (direct) … */
  monthlyKwh?: number
  /** … or monthly bill in KSh (converted via tariff). */
  monthlyBillKsh?: number
  /** Optional usable roof area, m². Caps the system. */
  roofM2?: number
}

export type SolarEstimate = {
  county: County
  monthlyKwh: number
  tariff: number
  systemKwp: number
  panels: number
  roofNeededM2: number
  roofCapped: boolean
  annualGenKwh: number
  usableKwh: number
  savingsMonthKsh: number
  savingsYearKsh: number
  capexKsh: { low: number; mid: number; high: number }
  paybackYears: { best: number; mid: number; worst: number }
  lifetimeSavingsKsh: number
  lowConsumption: boolean
}

/** Pure estimator — deterministic, unit-testable, no I/O. */
export function estimateSolar(input: SolarInput): SolarEstimate | null {
  const county = counties.find((c) => c.id === input.countyId) ?? null
  if (!county) return null

  // Consumption: prefer explicit kWh; else derive from the bill.
  let tariff: number = model.tariffAllIn
  let monthlyKwh = input.monthlyKwh ?? 0
  if (!monthlyKwh && input.monthlyBillKsh) {
    monthlyKwh = input.monthlyBillKsh / tariff
  }
  if (!monthlyKwh || monthlyKwh <= 0) return null
  if (monthlyKwh <= 100) tariff = model.tariffAllInLow

  const lowConsumption = monthlyKwh < 30 // lifeline band — solar rarely pays

  // Size the array to match consumption (self-consumption world).
  const dailyKwh = (monthlyKwh * 12) / 365
  let kwpTarget = dailyKwh / county.pvout

  // Roof cap.
  const maxByRoof = input.roofM2 ? input.roofM2 / model.m2PerKwp : Infinity
  const roofCapped = kwpTarget > maxByRoof
  if (roofCapped) kwpTarget = maxByRoof
  if (kwpTarget <= 0) return null

  // Panel-quantized system.
  const panels = Math.max(1, Math.ceil(kwpTarget / model.panelKw))
  const systemKwp = +(panels * model.panelKw).toFixed(2)
  const roofNeededM2 = Math.ceil(systemKwp * model.m2PerKwp)

  // Energy & money.
  const annualGenKwh = Math.round(systemKwp * county.pvout * 365)
  const annualConsumption = monthlyKwh * 12
  const usableKwh = Math.round(
    Math.min(annualGenKwh * model.selfUse, annualConsumption),
  )
  const savingsYearKsh = Math.round(usableKwh * tariff)
  const savingsMonthKsh = Math.round(savingsYearKsh / 12)

  const capexKsh = {
    low: Math.round(systemKwp * model.costPerKwp.low),
    mid: Math.round(systemKwp * model.costPerKwp.mid),
    high: Math.round(systemKwp * model.costPerKwp.high),
  }
  const pb = (capex: number) => +(capex / savingsYearKsh).toFixed(1)
  const paybackYears = {
    best: pb(capexKsh.low),
    mid: pb(capexKsh.mid),
    worst: pb(capexKsh.high),
  }
  const lifetimeSavingsKsh = Math.round(
    savingsYearKsh * model.lifeYears - capexKsh.mid,
  )

  return {
    county, monthlyKwh: Math.round(monthlyKwh), tariff,
    systemKwp, panels, roofNeededM2, roofCapped,
    annualGenKwh, usableKwh, savingsMonthKsh, savingsYearKsh,
    capexKsh, paybackYears, lifetimeSavingsKsh, lowConsumption,
  }
}

/** KSh formatter: 1,234,567 → "1.23M", 456,000 → "456,000". */
export function ksh(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  return n.toLocaleString('en-KE')
}
