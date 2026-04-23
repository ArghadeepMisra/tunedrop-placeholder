# Tunedrop

Coming-soon landing page for [tunedrop.org](https://tunedrop.org) — a social feed for sharing music playlists.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css`)
- **Framer Motion** — scroll-triggered section animations
- **three-globe + @react-three/fiber** — interactive 3D globe in the hero
- **lucide-react** — icons

## Local development

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build + type check
npm run lint
```

## Structure

```
app/
  page.tsx              # composes all six sections
  layout.tsx            # metadata and OG tags
  globals.css           # design tokens, base styles
  api/subscribe/        # email capture stub → { ok: true }

components/
  sections/             # Hero, Feed, PostTypes, Sharing, StreamingApps, FinalCTA
  ui/
    globe.tsx           # three-globe + R3F globe, loaded client-side only
    EmailCapture.tsx    # shared between Hero and FinalCTA

data/
  globe.json            # GeoJSON country polygons for the globe
```

## Deployment

Deployed on Vercel. Pushes to `main` go straight to production.

To collect emails for real, swap the stub in `app/api/subscribe/route.ts` for Resend, Loops, or a Supabase insert.
