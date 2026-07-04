# Project State — Sichon Engineering

> **Purpose:** a complete cache of the work and the mission so context survives a
> model/session switch. If you're a fresh model picking this up: read this, then
> `docs/WHITEPAPER.md` (design rationale) and `docs/ROADMAP.md` (how the mission
> becomes real infrastructure). Date of this snapshot: **2026-07-04**.

---

## 1. The mission (do not lose this)

Sichon Engineering Company (Nairobi, Est. 2026) exists to **close Kenya's
measurable infrastructure gap through disciplined engineering** — "engineering is
a civic responsibility." There are two layers:

- **Layer 1 — the face:** a website that is the best expression of the company.
  ✅ Largely built (this repo).
- **Layer 2 — the real mission:** actually deliver infrastructure — augmented by
  computation and AI-assisted simulation (the site already promises this). This is
  the *next frontier*. See **`docs/ROADMAP.md`**.

Ground-truth company brief: `Sichon Engineering Company.pdf` (in the sibling repo
`/home/benard/Projects/ProjectAI2026/sichon/sichon-engineering/`).

**Four focus areas:** Built Environment (roads, walls, drainage, recreation,
drawing & design) · Clean Energy (solar) · Environmental Sustainability (tree
planting) · Consulting.
**Five values (order matters):** Safety · Competence · Integrity · Respect · Aesthetics.
**Tagline:** Build the Nation · *Jenga Taifa*.
**Contact (exact):** croptoo@gmail.com · +254 718 223 111 · Nairobi.

---

## 2. What has been built (Layer 1)

Work lives on branch **`redesign`** (pushed to GitHub). The **live site is still
the old single-file `index.html`** and stays untouched until merged to `main`.

- **Stack:** Vite · React · TypeScript · CSS Modules + design tokens · `motion`
  (Framer Motion). Static site, no backend.
- **The idea:** a scroll-driven story — an engineer's drawing that *builds itself*
  from a dark "infrastructure gap" (night) into a lit, green nation (day), ending
  on **"Build the Nation · Jenga Taifa."** It doesn't describe the mission; it
  performs it. Positioning evolved to **sell taste / a lifestyle** — taste is a
  promise a new firm can make on day one, which answers the "no built proof yet"
  problem.
- **Page order / components** (`src/components/`):
  `BuildJourney` (the scroll narrative) → `Gap` (the gap in cited numbers) →
  `Aspiration` ("a matter of taste — we sell the life, not the concrete") →
  `Manifesto` ("We are new. That is the point.") → `Services` → `Values` →
  `Process` → `Brief` (form) → `Contact` (footer) + `MobileCTA` (sticky bar).
- **Content is centralised** in `src/data/content.ts` (single source of truth,
  incl. the cited Kenyan data).
- **Conversion:** brief form with required "how we reach you" reply field,
  honeypot anti-spam, Web3Forms path + mailto fallback; WhatsApp click-to-chat;
  sticky mobile CTA bar; "reply within 48h" reassurance.
- **Perf (measured, mobile, simulated throttling):** ~82 performance, **100
  accessibility, 100 best-practices**, CLS ~0, FCP 1.4s, LCP 1.5s.
- **Docs:** `docs/WHITEPAPER.md` (design manifesto), `docs/ROADMAP.md` (the vision).

### The cited "gap" data (real, sourced — keep accurate)
- **84.9%** of roads unpaved (140,099 / 164,967 km) — KNBS Economic Survey 2024.
- **1 in 4** without electricity (76% access, 2023) — World Bank / Our World in Data.
- **2M+** housing-unit deficit, +200k/yr — UN-Habitat / Vision 2030.
- **46.5%** of urban Kenyans in informal settlements — UN-Habitat.

---

## 3. Hosting (never break this)

- Repo `bk376/sichon-engineering-company`, GitHub Pages, custom domain
  `www.sichonengineering.com` (CNAME + HTTPS, apex + www).
- **Currently** Pages = "deploy from branch `main` /" (legacy). The redesign adds
  `.github/workflows/deploy.yml` (Actions → Pages) and keeps the domain via
  `public/CNAME`. **Go-live = merge `redesign`→`main` + switch Pages source to
  "GitHub Actions"** (`gh api -X POST .../pages -f build_type=workflow`).
- **Shareable preview** (separate repo `bk376/sichon-preview`, public + `noindex`,
  no CNAME, zero prod risk): **https://bk376.github.io/sichon-preview/**
  Redeploy = `npx vite build --base=/sichon-preview/ --outDir dist-preview`, strip
  CNAME, inject `noindex` meta + `robots.txt`, push to that repo's `main`.
- Collaborator **KropK** invited (write access).

---

## 4. Run / build

```bash
npm install
npm run dev       # local dev
npm run build     # tsc + vite build → dist/
npm run preview   # serve the build
```

---

## 5. Open TODOs / decisions pending

- [ ] **Go-live**: open PR `redesign`→`main`, or direct cutover (flip Pages to Actions).
- [ ] **Web3Forms key**: create at web3forms.com with `croptoo@gmail.com`, paste into
      `web3formsKey` in `src/data/content.ts` → inline form submission.
- [ ] **One real testimonial / first-client quote** — last thing blocking a 9.5 site.
- [ ] Optional: analytics + form-submit event (Plausible/Umami) to measure conversion.
- [x] Layer 2 Phase 1: **Solar estimator SHIPPED** (2026-07-04) — "Tools · 01" on
      the site, client-side Kenya-calibrated physics (`src/data/solar.ts` +
      `SolarTool.tsx`). The "computational tools" claim is now true.
- [ ] Layer 2 next: PDF proposal export for the solar tool; then Site-Intelligence
      core / drainage (see ROADMAP).

## 6. Honest rating (Layer 1): **9.0 / 10**
Concept 9.5 · craft 9 · substance 8.5 · place identity 8.5 · UX/conversion 9 ·
perf/a11y 8.5. Ceiling held by: real project proof, and TBT (~700ms, needs
prerender/SSR for a 90+ perf score).

## 7. Working style notes (for whoever continues)
The user (Benard) has strong taste, wants bold opinionated work and candid
critique, said "go wild — it's your idea," and enjoys well-written docs. Lead with
a recommendation and a creative swing; ground ambition in practical safety (don't
break hosting). See also the project memory files under `.claude/.../memory/`.
