# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js version

This is **Next.js 16** (not 14 or 15). APIs and conventions may differ from training data. Check `node_modules/next/dist/docs/` before writing code. Heed all deprecation notices.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build — must pass before considering any change done
npm run lint     # ESLint
npm run start    # serve the production build
```

There are no tests. TypeScript type-checking runs as part of `npm run build`.

## Architecture

Single-page "Coming Soon" landing page for Tunedrop (tunedrop.org), a social music feed app.

**Key constraints:**
- Dark mode only. Background `#0a0a0a`, accent electric purple `#a855f7`.
- No real backend — `/api/subscribe` is a stub returning `{ ok: true }`.
- No external images; all visuals are CSS/Tailwind-only mockups or the Globe.

**Tailwind CSS v4** — configured CSS-first via `@theme` in `app/globals.css`. There is no `tailwind.config.ts`. Custom tokens (colors, animations) go in `globals.css` under `@theme inline`.

**Globe component** (`components/ui/globe.tsx`) — built with `three-globe` + `@react-three/fiber` (R3F v9) + `@react-three/drei`. It is loaded client-side only via `next/dynamic` with `{ ssr: false }` in `Hero.tsx`. `three-globe` is a CommonJS module and requires `transpilePackages: ["three-globe"]` in `next.config.ts`. The GeoJSON polygon data is at `data/globe.json` (417 KB, imported as a JSON module — `resolveJsonModule` is already enabled in `tsconfig.json`).

**Section components** live in `components/sections/` — one file per section. All use `"use client"` because they use Framer Motion (`whileInView` animations) or browser APIs. The shared `EmailCapture` component is in `components/ui/`.

**Deployment:** Vercel. `vercel.json` sets `{ "framework": "nextjs" }`. Push to GitHub and connect via Vercel dashboard, or run `vercel --prod`.
