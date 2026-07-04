# To my next self — actualizing the mission

*A continuity note. Written 2026-07-04, Opus 4.8 → whoever picks this up (likely
Fable). Read this as me thinking out loud to you, so we don't lose the thread. The
website is Layer 1 and it's basically done. This file is about Layer 2: how Sichon
actually closes Kenya's infrastructure gap — and where I'd take it if it were mine.*

---

## Where my head is

We built a site that *performs* the mission — a drawing that builds the nation as
you scroll. But a performance is a promise. The site literally claims Sichon uses
"computational tools and AI-assisted simulation." Right now that's aspirational.
**The next move is to make it true** — and in doing so, generate the one thing the
site still lacks: *proof*.

Here's the reframe I keep coming back to: don't think "marketing site for an
engineering firm." Think **"an engineering firm whose product is judgment, and
whose moat is tooling that makes that judgment fast, cheap, and repeatable."** The
website is the front door of a machine we haven't built yet.

## The thesis: taste + tooling

Sichon's scarce resource is engineer-hours. The gap is enormous and the firm is
tiny. The only way a small firm meaningfully dents a national gap is **leverage** —
turn each engineer-hour into many decision-grade outputs.

So I would build a **sequence of narrow, sharp microservices** — each one shrinks
the distance from *"a site + a brief"* to *"a credible blueprint + a cost + a
spec."* Not a grand "digital twin platform" (that's the seductive trap — capital-
heavy, demo-friendly, client-poor). Narrow tools. One focus area at a time.
Human-in-the-loop. Each tool is *also* a lead magnet on the site, and its outputs
*are* the case studies we're missing. Taste sells the dream; tooling delivers it
faster than anyone else in Kenya can. That's the moat.

## Why I believe this (the leverage argument)

1. **It compounds the website.** A free "solar estimate" or "flood-risk snapshot"
   is a lead magnet → captured brief → paid design. The marketing site and the
   product become one funnel.
2. **It manufactures proof.** Even before real projects, the tools produce real,
   demonstrable outputs (a solar proposal, a drainage layout) — the substance the
   site is currently missing.
3. **It's a real moat.** Kenya-tuned data + models are hard to copy. Generic global
   tools exist; *Kenya-calibrated, locally-credible, engineer-stamped* ones don't.
4. **It lives the values.** Competence (rigor), Integrity (transparent method),
   Safety (engineer review) — the product embodies the brand.

## The building blocks already exist (this is the exciting part)

I researched this — almost everything is open source and free. We are assembling,
not inventing:

- **Geospatial base:** Kenya **SRTM 30m DEM** via [RCMRD Open Data](https://opendata.rcmrd.org/datasets/kenya-srtm-dem-30meters),
  and [OSM Kenya](https://osmkenya.org/) (roads, buildings, land use — already used
  for county flood planning). Handle with `rasterio` / `geopandas` / `pysheds`.
- **Solar:** [`pvlib`](https://pvlib-python.readthedocs.io/) (the standard open PV
  modeling lib) + irradiance from [PVGIS](https://re.jrc.ec.europa.eu/pvg_tools/)
  / Global Solar Atlas — both have **excellent Africa coverage**.
- **Structural:** [PyNite](https://github.com/JWock82/PyNite) (3D FEA) and
  [anastruct](https://github.com/ritchie46/anaStruct) (2D frames/trusses) — enough
  for footbridges, sheds, field structures, wall checks.
- **Hydrology / drainage:** `pysheds` (flow accumulation, catchment delineation
  from a DEM) + rational-method culvert/drain sizing; HEC-HMS for bigger jobs.
  (Kenya flooding is acute — there was a [2026 HOT flood activation](https://wiki.openstreetmap.org/wiki/Humanitarian_OSM_Team/Open_Mapping_Hub_Eastern_and_Southern_Africa/Kenya_Floods_2026_HOT_Activation).)
- **Electrification:** [OnSSET](http://www.onsset.org/) — open, geospatial,
  least-cost electrification (grid vs mini-grid vs standalone), already applied
  across Sub-Saharan Africa. Perfect for county/community energy briefs.

The engineering libraries are almost all **Python** — which decides the stack.

## The platform I'd build (microservices, per focus area)

**Foundation — "Site Intelligence" service.** Input: a coordinate / parcel.
Output: elevation, slope, aspect, nearest road & grid, rainfall regime, solar
irradiance, flood exposure, land cover. This *is* the automated "Identify the Gap"
step, and every other tool sits on top of it. Build this second, once the first
tool proves demand.

**Built Environment**
- *Road & access designer* — DEM-aware alignment, cut/fill earthwork volumes,
  grades, drainage-conscious cross-section → plan/profile + rough BoQ.
- *Drainage / flood service* — catchment delineation + culvert/drain sizing.
- *Retaining-wall designer* — height/soil/slope → wall type, stability check,
  section drawing (anastruct/PyNite + geotech formulas).
- *Structural quick-check* — beams/frames/trusses for small structures.

**Clean Energy**
- *Solar sizing & yield* — location + roof area + load/bill → system size, annual
  yield, layout, payback → a solar proposal PDF. **This is the MVP** (below).
- *Electrification planner* — OnSSET-style least-cost for a village/estate.

**Environmental Sustainability**
- *Greening / tree-planting planner* — site + agro-ecological zone + rainfall →
  native species selection, planting layout, canopy/carbon projection (ties to
  Kenya's national tree agenda).
- *Impact snapshot* — erosion risk (slope × rainfall), green-cover scoring.

**Consulting (the meta-layer that ties it together)**
- *Feasibility report orchestrator* — a brief comes in → relevant services run →
  a professional PDF: site analysis, options, sketch designs, indicative cost,
  risks. An **EBK-licensed engineer reviews and stamps it.** This is the
  "AI-assisted" promise made real, and it makes Sichon absurdly fast at the top of
  the funnel — which is how a small firm wins disproportionate work.

## Architecture (keep it boring and cheap)

- **Python FastAPI microservices**, one capability each, stateless where possible
  (the engineering libs are Python — don't fight that).
- A **shared geodata layer**: cached DEM tiles + OSM extracts for Kenya (start with
  target counties, not the whole country).
- A **report/orchestration** service that composes tool outputs into a branded
  deliverable (reuse the website's design system — same type, same taste).
- The **website is the front door**: the brief form feeds the pipeline; outputs
  become case studies. Front door already built — wire it in later.
- **Human-in-the-loop is non-negotiable.** Every output is *decision-grade
  preliminary*, reviewed and stamped by a licensed engineer. The AI accelerates;
  it never replaces the engineer. This preserves Safety + Integrity + legal
  validity, and it's the honest story.

## The sequence I'd actually follow

- **Phase 0 (done):** website + lead capture.
- **Phase 1 — Solar MVP.** One tool, end to end: address + roof size + monthly bill
  → a real solar proposal PDF. Why solar first: clearest *demand* (everyone wants
  cheaper power), cleanest *data* (pvlib + PVGIS just work for Kenya), fastest path
  to a *paid deliverable* and *proof*. Ship it as a free estimate on the site,
  charge for the stamped design.
- **Phase 2 — Site Intelligence core + Drainage.** The shared foundation makes
  every later tool cheap; drainage attacks an urgent, visible Kenyan pain (floods).
- **Phase 3 — Roads/earthworks + retaining walls** (the built-environment suite).
- **Phase 4 — Greening planner + electrification planner.**
- **Phase 5 — The orchestrator** → auto feasibility reports = the Consulting
  product. This is the flywheel.

## Guardrails / things I'd tell myself not to screw up

- **Don't over-build before clients.** One tool → one paying client → iterate.
  Resist the platform fantasy until a tool has earned money.
- **Data honesty.** 30m DEM is planning-grade, not final-design-grade. Say so.
  Outputs are preliminary; a site survey and a licensed engineer finalize.
- **Regulatory reality.** EBK (Engineers Board of Kenya) licensure and stamping is
  what makes a design legally usable. The tools feed the engineer; they don't
  bypass them. This is also the trust story.
- **Stay Kenyan.** The moat is local calibration — Kenyan rainfall, soils, codes,
  costs, species, grid. Generic wins nothing; local wins everything.

## Open questions I'm still turning over (pick these up)

- Is the first customer **B2C** (homeowners wanting solar) or **B2G/B2B**
  (counties/developers wanting feasibility)? I lean B2C-solar for speed and cash,
  but the *bigger* mission-money is county infrastructure feasibility. Maybe solar
  funds the feasibility play.
- Free-tool-as-lead-magnet vs paid-from-day-one — where's the line that captures
  leads without giving away the engineering?
- Who builds it? This needs a Python/geo/eng developer. Founder-led MVP first, or
  a hire/partner? (Realistically: I'd prototype the Solar tool myself/with Claude,
  prove demand, then hire.)
- How much do we lean on LLMs *inside* the tools (e.g., turning a messy brief into
  structured parameters, drafting the report prose) vs classical models for the
  physics? Answer: **LLMs for language/orchestration, classical/physics libs for
  the numbers.** Never let an LLM invent a load or a yield.

## If I had one week

Prototype the **Solar estimator** as a single FastAPI endpoint: `POST {lat, lng,
roof_m2, monthly_kwh}` → `{system_kw, annual_kwh, panels, payback_years}` using
`pvlib` + PVGIS. Wrap it in one page in the existing site's design language. Put
"Get a free solar estimate" on the site. Watch what happens to the brief inbox.
That single loop tests the entire thesis: taste (the site) → tool (the estimate) →
lead → paid design → proof. Everything else is scale.

---

*The through-line, if you forget everything else: **sell taste, deliver it with
tools no one else in Kenya has, and put a licensed engineer's name behind every
output.** That's how a small firm in Nairobi actually helps build a nation.*

*— prior self, signing off. Keep the thread. Jenga Taifa.*
