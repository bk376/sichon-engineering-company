/* ═══════════════════════════════════════════════════════════
   THE DESK — productized, fixed-price, engineer-stamped
   deliverables (SICHON-OS §5). This is how the entity earns.

   Payment rails:
   - NOW (zero setup): WhatsApp order + 50% M-Pesa deposit to the
     desk line; receipt confirms commissioning.
   - WHEN ARMED by a key: per-SKU payment links (IntaSend/Pesapal/
     Flutterwave — static-site friendly). Paste the link into
     `paymentLink` and the buy button upgrades itself.

   Prices are v1 hypotheses — TREASURY reprices from win-rate data.
   ═══════════════════════════════════════════════════════════ */

export type Sku = {
  id: string
  index: string
  name: string
  priceKsh: number
  turnaround: string
  from?: string
  includes: string[]
  /** Payment link (IntaSend/Pesapal/Flutterwave). Empty = WhatsApp flow. */
  paymentLink?: string
  /** Not yet purchasable — joins the waitlist via WhatsApp. */
  waitlist?: boolean
}

export const skus: Sku[] = [
  {
    id: 'SOLAR-STAMP',
    index: '01',
    name: 'Stamped solar design',
    priceKsh: 15_000,
    turnaround: '72 hours',
    from: 'Starts from your free estimate above',
    includes: [
      'Load audit & system sizing',
      'Panel layout & wiring schematic',
      'Bill of quantities, real market prices',
      'Reviewed by a licensed engineer',
      'Installer-ready — any contractor can build it',
    ],
  },
  {
    id: 'SITE-SNAP',
    index: '02',
    name: 'Site feasibility snapshot',
    priceKsh: 30_000,
    turnaround: '5 days',
    includes: [
      'Terrain, slope & access analysis',
      'Drainage & flood exposure',
      'Solar & utilities assessment',
      'Risk register + recommendation memo',
      'Decision-grade before you buy or build',
    ],
  },
  {
    id: 'FLOOD-CHECK',
    index: '03',
    name: 'Drainage & flood assessment',
    priceKsh: 45_000,
    turnaround: '7 days',
    includes: [
      'Catchment delineation from elevation data',
      'Runoff estimation & culvert/drain sizing',
      'Flood-risk mapping for your parcel',
      'Mitigation options, costed',
    ],
    waitlist: true,
  },
  {
    id: 'WALL-PRELIM',
    index: '04',
    name: 'Retaining wall preliminary design',
    priceKsh: 60_000,
    turnaround: '7 days',
    includes: [
      'Wall type selection for soil & height',
      'Stability checks & typical sections',
      'Drainage detailing behind the wall',
      'Preliminary BoQ for tendering',
    ],
    waitlist: true,
  },
]

export const deposit = {
  percent: 50,
  note: 'Commission with a 50% deposit — balance on delivery. Every deliverable is reviewed before it leaves the desk.',
}

/** Approximate KES per USD for dual-currency display (indicative only). */
export const usdRate = 129

/**
 * Money traffic — worldwide by design (SICHON-OS §4).
 * `live` rails work today with zero extra setup; the rest are declared on
 * the desk and arranged person-to-person on WhatsApp until a key arms the
 * dedicated account/link (IntaSend/Flutterwave for cards, PayPal handle,
 * USDC treasury address).
 */
export const rails = [
  { id: 'mpesa', label: 'M-Pesa', live: true },
  { id: 'card', label: 'Visa / Mastercard', live: true },
  { id: 'paypal', label: 'PayPal', live: true },
  { id: 'usdc', label: 'USDC', live: true },
  { id: 'wise', label: 'Wise / bank transfer', live: true },
] as const

export const railsNote =
  'Paying from anywhere on Earth is fine — Nairobi, London, Dallas, Dubai. Order on WhatsApp and we route your rail of choice.'
