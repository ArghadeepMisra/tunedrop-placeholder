# Tunedrop — Agent Notes

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 — CSS-first config via `@theme` in `app/globals.css` (no `tailwind.config.js`)
- Framer Motion, three-globe + @react-three/fiber, lucide-react

## Commands
```bash
npm install
npm run dev       # localhost:3000
npm run build     # production build + type check
npm run lint      # eslint (flat config via eslint.config.mjs)
```
No test runner is configured.

## Tailwind v4 Quirk
Styles and design tokens live entirely in `app/globals.css` using `@import "tailwindcss"` and `@theme inline`. Do not create a `tailwind.config.js`.

Brand colors are registered in the theme:
- `brand` → `#1877F2`
- `brand-light` → `#60A5FA`
- `brand-dark` → `#1565C0`
- `brand-darker` → `#0D47A1`

## 3D Globe
- `components/ui/globe.tsx` renders with `three-globe` inside R3F.
- It is **client-only** — always imported with `ssr: false` (see `Hero.tsx`).
- `next.config.ts` must keep `transpilePackages: ["three-globe"]` or the build breaks.
- Globe uses a **ref + state split**: `useRef` holds the `ThreeGlobe` instance for the animation loop / effects; `useState` signals readiness for the `<primitive>` render. ESLint disable comments are required for R3F patterns (ref access in render, state in effect, imperative Three.js mutation in `useFrame`).

## Repo Layout
```
app/
  page.tsx          # composes 6 section components
  layout.tsx        # metadata + OG tags + viewport (tunedrop.org)
  globals.css       # Tailwind v4 tokens + base styles
components/
  sections/         # Hero, Feed, PostTypes, Sharing, StreamingApps, FinalCTA
  ui/
    globe.tsx       # R3F globe (client-only)
    scroll-reveal.tsx   # Reusable Framer Motion scroll animation wrapper
    section.tsx         # Standard section wrapper (py-16 px-6 md:px-12 max-w-6xl)
    split-layout.tsx    # Two-column flex wrapper (optionally reversed)
data/
  globe.json        # GeoJSON country polygons for the globe
lib/
  globe-data.ts     # Globe config + arc data (extracted from Hero.tsx)
  constants.ts      # Platforms data, post card data, shared color constants
```

## Patterns
- Sections use `Section` + `SplitLayout` + `ScrollReveal` wrappers. Don't inline Framer Motion boilerplate.
- Hardcoded data lives in `lib/`, not inside components.
- Hero is wrapped in `<header>`, not `<section>`. Other sections use `<Section>`.

## Deployment
- Vercel (`vercel.json` present). Pushes to `main` deploy to production.
- Email capture stub mentioned in README (`app/api/subscribe/`) does not currently exist.

## TypeScript Paths
`@/*` maps to `./*` (repo root).

## React 19 Notes
- JSX namespace must be accessed via `React.JSX` when needed (avoid bare `JSX.IntrinsicElements`).
- R3F hooks trigger stricter ESLint rules (`react-hooks/refs`, `react-hooks/immutability`, `react-hooks/set-state-in-effect`). Use disable comments for intentional patterns.
