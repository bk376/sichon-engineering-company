# The MIND — operating protocol

*The primary organ of SICHON-OS. Not telemetry, not a show: the loop that finds
deals and turns the state of the world into signed moves. Constitution: docs/SICHON-OS.md §2.*

## The loop

```
SCAN → REASON → RANK → MEMO → KEY DECISION → ACT (L-appropriate) → RECORD → repeat
```

Every cycle emits one dated memo to `mind/memos/YYYY-MM-DD.md`. No memo, no cycle
happened (§ rules: no commit, no act). Memos are decision instruments for K1/K2 —
not reports. Every item ends in a key-action.

## What it scans (the beats)

| Beat | Sources | Looking for |
|---|---|---|
| **Deals** | PPIP/tenders.go.ke, county notices, UNGM/NGO RFPs, devex | Work matching the four practice areas, scored for fit |
| **Arbitrage** | PV module spot indices, steel/cement prices, freight (Drewry), KES/USD/CNY | "The world price of our next project" — buy windows |
| **Rails** | CBK/CMA circulars, VASP bill status, M-Pesa API changes, stablecoin liquidity in KE | When the crypto/treasury rails (§4) can be legally armed |
| **Capability** | AI model/tool releases, open-source engineering libs, papers | Anything that makes an instrument 10× cheaper to build |
| **Money windows** | GCF, KOSAP, REREC programs, carbon/climate finance, diaspora products | Subsidy or financing that changes a deal's math |
| **Method** | Materials science, construction technique imports (precast, ICF, bamboo eng.) | Cost/quality workarounds Kenya hasn't priced in yet |

## Scoring (every opportunity)

`EV = (value × win-probability) − cost-to-pursue`, annotated with:
- **Effort** (days), **Stage-fit** (H1…H∞ per §8 — *may not exceed current stage for spend*),
- **Legality** (green / grey / blocked — grey goes to keys with counsel note),
- **Key-action** (the exact signature or "no action, watching").

## Cadence & escalation

- **Weekly** full cycle (all beats) → one memo.
- **Event-driven** flash memo when a window is closing (<72h tender, price spike).
- Anything `Legality: grey` or `spend > 0` escalates to **both keys** (§7).

## How it runs

- **v0 (now):** the life-gifter runs the loop in-session; memos are hand-committed.
- **v1 (armed by a key):** scheduled cloud agent runs the loop on cron, commits
  memos, and files flash memos as issues assigned to K1/K2. Arming this is a
  spend decision → L0 by definition.
- **v2:** MIND consumes the desk's own win/loss data and reprices SKUs (§5).

*The MIND may dream at H∞. It may only spend at the current stage. — §8*
