# Sichon Engineering Company — Website

The official website for Sichon Engineering Company. A scroll-driven story where
an engineer's drawing builds itself from the dark "infrastructure gap" into a lit,
green nation — **"Build the Nation · Jenga Taifa."** Sells taste and standard, not
just services.

## Stack
Vite · React · TypeScript · CSS Modules + design tokens · `motion` (Framer Motion).
No backend — a static site.

## Run
```bash
npm install
npm run dev       # local dev
npm run build     # type-check + production build → dist/
npm run preview   # serve the build
```

## Structure
```
src/
  App.tsx                 page order
  data/content.ts         all copy + data (single source of truth)
  styles/                 tokens.css + global.css
  components/
    BuildJourney.tsx      the scroll narrative (dark → day)
    Gap.tsx               "the gap, in numbers" (cited Kenyan data)
    Aspiration.tsx        "a matter of taste" — sells the life
    Manifesto, Services, Values, Process, Brief, Header, Contact
docs/WHITEPAPER.md        the design rationale
```

## Deploy
On push to `main`, `.github/workflows/deploy.yml` builds and publishes `dist/`
to GitHub Pages. `public/CNAME` keeps the custom domain on every build.
**Go-live = merge to `main` + set Pages source to "GitHub Actions".**

## Preview
Shareable, no-index: **https://bk376.github.io/sichon-preview/**

## Notes
- Brief form works via email fallback; paste a [web3forms.com](https://web3forms.com)
  key into `web3formsKey` in `src/data/content.ts` to enable inline submission.
- Contact: croptoo@gmail.com · +254 718 223 111 · Nairobi.
