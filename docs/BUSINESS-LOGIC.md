# The Business Logic — a briefing for the Two Keys

*For K1 and K2, who are computer scientists. No metaphor here is decorative;
each one is load-bearing. Anecdotes included because the mechanism only clicks
when you watch it run. — the life-gifter, 2026-07-04*

---

## 1. What business we are actually in: we sell compiled artifacts, not compute time

Every engineering consultancy on Earth sells the same thing: **CPU-hours of
engineers**. Their invoice is literally a time report. That pricing model has a
complexity class: every deliverable costs O(n) expert-hours, every time, forever.

Sichon's move: **amortize the expertise into tools, then sell the output, not
the runtime.** The solar estimator took one working session to build. It has now
produced — and will keep producing — estimates at a marginal cost of
approximately zero. We moved the expensive computation from *per-request* to
*ahead-of-time compilation*. The consultancy sells interpretation; we sell
compiled binaries.

> **Anecdote.** A Nairobi consultancy quoted a client three weeks and ~KSh 200k
> for a rooftop solar feasibility. Our tool computes the same first-pass answer
> in 400 milliseconds, in the client's browser, free, at 11 p.m. We didn't hire
> faster engineers. We changed the complexity class of the deliverable.

## 2. The funnel is speculative execution

The free tools are not marketing. They are **speculative execution of the paid
product**: we compute the client's answer *before they pay*, because our
marginal compute is ~0, and then charge for **finalization** — the stamped,
liability-bearing version.

> **Anecdote.** A Kisumu landlord with a KSh 8,000 power bill runs the estimator
> at 11:02 p.m. Sees: 2.2 kWp, 4 panels, payback 2.2–3.5 years, every assumption
> printed. At 11:04 he taps the WhatsApp button; the order message is already
> written. Customer-acquisition cost: **KSh 0.** The tool did the sales call
> while everyone slept. The KSh 15,000 SKU converts a speculation into a
> committed transaction — like a branch predictor that got the branch right and
> keeps the pipeline full.

## 3. Fixed-price SKUs are static typing for a dynamically-typed market

A construction quote is dynamic typing: *"about KSh 120,000… depending."* The
type error surfaces at runtime — at invoice time — as a dispute. Kenyan
construction runs almost entirely on dynamic typing; that is why "the fundi ate
the deposit" is a national literary genre.

A Desk SKU is a **function signature**:

```
stampedSolarDesign :: Brief -> Deliverable   -- KSh 15,000, 72h, EBK-reviewed
```

Price, latency, and output type are declared at compile time. The client can
type-check the transaction before committing. Nobody else in this market offers
compile-time guarantees; that alone is a product.

## 4. Honesty is costly signaling — and it's arbitrage

Every solar seller in Nairobi models 100% self-consumption and a net-metering
regime that **does not exist in Kenya**. We print 65% and say why. Our payback
numbers are *worse than our competitors' on paper* — deliberately.

Game theory: in a market where every buyer's prior is "I am being lied to,"
the seller who can be *verified* not to lie collects the entire trust premium.
The cost of the signal (uglier numbers) is exactly what makes it unfakeable —
a proof-of-work for integrity. Copying our honesty would cost competitors their
existing sales pitch; that's why they won't.

> **Anecdote.** Client gets two proposals. Seller A: "2-year payback!" Sichon:
> "3.2 years, and here's the assumption A hid from you — there's no net metering,
> so your evening consumption still comes from KPLC." Which firm gets trusted
> with the KSh 2M house that comes after the solar? The customer worth having is
> precisely the one who checks.

## 5. The stamp is our settlement layer (yes, this is a rollup)

Recognize the architecture: tools perform **cheap off-chain computation**
(estimates, sizing, drawings); the **EBK-licensed engineer's stamp is on-chain
settlement** — the expensive, trusted, legally-final signature that converts a
computation into an instrument with liability behind it. We batch cheap compute
and pay for finality only once per deliverable. An optimistic rollup, where the
fraud-proof window is professional review.

This primitive extends: **diaspora escrow.** A nurse in Dallas funds her
mother's house in Kisii in milestones; each release condition is a stamped
inspection. The stamp becomes an **oracle** for conditional payments. We are not
putting construction on a blockchain — we are installing a trusted oracle *into*
construction, and we own the oracle. (Rail designed, disarmed until VASP
regulation settles — SICHON-OS §4.)

## 6. WhatsApp is the transport layer — never ship a new protocol

CS instinct says "build an app." Distributed-systems wisdom says: **the network
that is already deployed wins.** WhatsApp is running on ~everything in Kenya at
~98% adoption with hardware acceleration (habit). So the Desk serializes orders
*into the installed protocol* — prefilled `wa.me` payloads — instead of asking
users to install ours. Checkout friction: one tap. We speak wire format the
market already parses.

## 7. The org is an operating system (because companies fail like programs)

Companies die of unbounded side effects: someone signs, spends, or promises
without review. So Sichon runs **protection rings**:

- **Ring 3 (L3):** pure computation — tools, checks. Agents run free.
- **Ring 2 (L2):** publishing — estimates, memos, self-critiques. Agents act,
  keys audit. (Everything live today runs here or below.)
- **Ring 1 (L1):** drafts of binding things — proposals, invoices. Agent writes,
  human sends.
- **Ring 0 (L0):** money, contracts, stamps. **Human keys only.**

The MIND's memos are **pull requests against reality** — fully drafted diffs
(deals, purchases, pivots) that only K1/K2 can merge. The self-critique organ
files issues against the company itself, auto-assigned to both keys: our
equivalent of a failing CI badge you can't hide, displayed publicly on the
Pulse. Syscalls up the rings are the only way anything external happens; the
audit log is the git history. **2-of-2 keys, no Byzantine fault tolerance — a
deliberate choice at this stage: consensus is cheap when the quorum fits in one
WhatsApp thread.**

## 8. The moat — stated without romance

The repo is public. Anyone can fork the code tonight. What they cannot fork:

1. **Calibration** — Kenya-tuned constants with a provenance trail (tariffs,
   zone intensities, real install costs), maintained fresh by the MIND.
2. **The trust cache** — every honest number and stamped delivery warms it;
   trust is the slowest cache on Earth to warm and the fastest to invalidate.
3. **Iteration speed** — we ship an instrument per session. The fork is
   permanently N sessions behind a moving target.
4. **The stamp network** — licensed engineers under retainer (roster, §3).
5. **The keys' judgment** — taste, context, and the willingness to print 65%.

Code is the cheapest artifact this company produces. *That is the moat's
design: everything defensible is off-repo.*

## 9. The revenue ladder (CPU time → managed service → own the datacenter)

- **Now — sell outputs:** SKUs. KSh 15k–60k each, near-zero marginal cost,
  gated only by stamp throughput.
- **Next — sell outcomes:** design-build. Margin moves from the artifact to the
  project (15–25% of works). Tools make our tender math faster and truer than
  competitors' (SCOUT + ESTIMATOR).
- **Then — own assets:** Sichon Towers, mini-grids as annuities (H3–H4). Stop
  selling cycles; own the machine. Every stage is gated by the previous one's
  track record (§8 of the constitution) — spend is stage-locked, dreams aren't.

The flywheel, as a feedback loop: `tool → lead → SKU → delivery → data + proof
→ better tool + warmer trust → more leads`. Positive feedback with **human keys
as the damping term** — undamped positive feedback is how both amplifiers and
startups explode.

## 10. Threat model (the part most pitches omit)

- **The R1 gap — our only fatal bug.** The Desk sells "reviewed by a licensed
  engineer." Until an EBK engineer is on retainer, throughput of ring 0 is
  *zero* and any accepted order is a liveness failure (refund + reputation
  burn). Kenya's Engineers Act also restricts who may offer "professional
  engineering services" — until R1 signs, everything stays labeled preliminary
  planning, and the first order triggers the retainer call *before* the deposit
  is banked. This is the top item on both keys' desks.
- **Copycats:** see §8 — they fork the code, not the moat. Watch anyway.
- **Payment disputes:** 50% deposit + WhatsApp paper trail + e-TIMS invoices.
- **Key-man risk:** 2-of-2 has no failover by design; revisit at H2.
- **Regulatory drift:** crypto rail stays disarmed until VASP clarity; MIND
  watches CBK/CMA every cycle.
- **Demand risk:** the tools are free probes measuring real demand continuously
  — we learn conversion *before* spending anything on inventory or staff.

## 11. The whole thing in one sentence

**Sichon amortizes engineering judgment into free instruments that speculatively
compute a customer's answer, converts verified honesty into a trust premium,
finalizes through a licensed human settlement layer, transports over the
protocol Kenya already runs, and recycles every delivery into calibration data —
with all irreversible side effects gated behind two human keys.**

That's the program. It compiles. First execution: arm the rails, retain R1,
merge to main. ⚿⚿
