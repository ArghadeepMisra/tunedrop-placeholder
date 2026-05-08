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
  page.tsx              # composes 6 section components + PageLoader
  layout.tsx            # metadata + OG tags + viewport + fonts (tunedrop.org)
  globals.css           # Tailwind v4 tokens + base styles + ping-slow keyframes
  icon.png              # Favicon (Next.js convention: auto-generates link tags)
  articles/
    page.tsx            # Articles listing (async, paginated via searchParams)
    loading.tsx         # Skeleton loading state (pulse cards)
    error.tsx           # Error boundary (fetch failure recovery)
    [slug]/
      page.tsx          # Article detail (async dynamic route + generateMetadata)
  features/
    feed/
      page.tsx          # Static feature info page — Dynamic Feed
    post-types/
      page.tsx          # Static feature info page — Post Types
    sharing/
      page.tsx          # Static feature info page — Link Previews
components/
  sections/             # Hero, Feed, PostTypes, Sharing, StreamingApps, FinalCTA
  ui/
    globe.tsx           # R3F globe (client-only)
    scroll-reveal.tsx   # Reusable Framer Motion scroll animation wrapper
    section.tsx         # Standard section wrapper (py-16 px-6 md:px-12 max-w-6xl)
    split-layout.tsx    # CSS grid two-column wrapper (4fr_8fr, optionally reversed)
    tilt-box.tsx        # 3D perspective tilt wrapper (rotateY, mouse tracking)
    page-loader.tsx     # Full-screen loading overlay (used on homepage only)
    playlist-card.tsx   # Feed playlist demo card (server component, no hooks)
    post-card.tsx        # Post type demo card (client, framer-motion animations)
    whatsapp-bubble.tsx # WhatsApp link preview mockup (server component)
    platform-pill.tsx    # Streaming platform link button (client, motion.a)
    sparkles.tsx         # Canvas-based particle effect (client-only)
data/
  globe.json            # GeoJSON country polygons for the globe (417 KB)
lib/
  globe-data.ts         # Globe config + arc data (extracted from Hero.tsx)
  constants.ts          # Platforms data, post card data, shared color constants
  articles.ts           # Article type, async fetch functions, ISR (backend-ready)
public/
  favicon.png           # 48x48 PNG favicon (resized from tunedrop_logo)
  tunedrop_logo.jpg     # Resized Tunedrop logo for favicon source
```

## Architecture Decisions

### Interactive Cards (Sections 2-5)
- Each visual object (PlaylistCard, PostCard, WhatsAppBubble, PlatformPill) is clickable via `<Link>` wrapping.
- Routes: `/features/feed`, `/features/post-types`, `/features/sharing`
- "click to view" / "Click to Open App" label below each card — styled `text-green-400` with glow on hover, placed **inside TiltBox** to follow the tilt.
- StreamingApps platform pills have `target="_blank"` to external links (Spotify, Apple Music, YouTube Music).

### Feature Pages
- Feature pages (`/features/*`) are **static info pages**, NOT landing-page clones.
- No `ScrollReveal`, no `TiltBox`, no interactive demo cards.
- Pure server-rendered HTML with static content (text, icons, feature cards).
- Each has: header with `← Back to home` link, headline, body text, feature sections, copyright footer.
- Follows the same glass-morphism visual language (`border-white/10 bg-white/[0.03]`).

### TiltBox
- Wraps cards in a 3D perspective container (`perspective: 1000px`).
- `defaultRotateY` prop: sets the rest-state tilt angle.
- Mouse tracking uses horizontal cursor position for `rotateY` only.
- Transition: `0.08s ease-out` (fast snap).
- Each section gets its own direction: Feed/PostTypes/StreamingApps `-10`, Sharing `10`.
- For multi-card columns (PostTypes, StreamingApps): **one TiltBox wraps the entire column**, not each card.

### SplitLayout
- Uses CSS Grid: `md:grid-cols-[4fr_8fr]` — cards get 67% of the row.
- `reverse` prop swaps content order (text first vs card first).
- `items-center` for vertical centering.
- `gap-8` between columns.
- Card column uses `w-full` (no flex justify-center) — cards fill the column.

### Animation Timing
- All Framer Motion durations: `0.08s` to `0.5s` max.
- CSS transitions: `duration-150` (was 300-500ms).
- `animate-ping-slow`: `0.8s` loop (was 2s).
- ScrollReveal default: `0.25s`.
- PostCard entrance: `0.2s`.
- Hero globe fade: `0.5s`.
- Hero text: `0.25s`.

### Component Splitting Philosophy
- **Server by default**: Components are server components UNLESS they need hooks, event handlers, or browser APIs.
- `"use client"` only when necessary (5 were removed in the audit).
- Sections that compose children (`Feed`, `PostTypes`, `Sharing`, `StreamingApps`) are **server components** — text is pre-rendered, interactive children hydrate on the client.
- Pure presentational UI cards (`PlaylistCard`, `WhatsAppBubble`) are server components.
- Interactive cards (`PostCard`, `PlatformPill`, `TiltBox`, `ScrollReveal`) are client components.
- Inline Framer Motion objects are **hoisted to module constants** to avoid per-render allocations.

### Articles / Blog Architecture
- Data layer: `lib/articles.ts` — async `getAllArticles(page, limit)` and `getArticleBySlug(slug)`.
- **Backend-ready**: functions call `${API_BASE}/articles` via `fetchJSON()`. Set `NEXT_PUBLIC_API_BASE` env var to point at a real backend.
- Falls back to `[]` / `null` when the API is unreachable.
- Uses ISR (`next: { revalidate: 300 }`) for 5-minute cache on listing page.
- Articles are auto-hydrated with `formattedDate` via `fmtDate()`.
- Both pages (`/articles` and `/articles/[slug]`) are async server components.
- Listing page reads `?page=` from `searchParams` and passes to `getAllArticles(page, limit)`.
- Pagination buttons are `<Link>` elements (not buttons) for proper navigation.
- When zero articles: shows "No articles yet" empty state.
- When article not found: shows "Coming Soon" page.
- `loading.tsx`: 3 pulse-animated skeleton cards shown during fetch.
- `error.tsx`: error boundary with "Try Again" button that calls `reset()`.
- Detail page auto-detects content format: HTML content is rendered via `dangerouslySetInnerHTML`, plain text via `<p>`.

### Favicon
- Placed at `app/icon.png` — Next.js auto-generates proper `<link>` tags from this convention.
- Must be a small PNG (48x48 or 32x32). Large files (6MB+) won't load in browsers.
- No explicit `icons` metadata config needed — the convention file handles it.

### Page Loader
- `components/ui/page-loader.tsx`: full-screen "Tunedrop" + three pulsing dots.
- Used on **homepage only** (`app/page.tsx`), NOT in root layout.
- Dismisses on `window.load` + 400ms delay via `AnimatePresence` fade-out.

### Performance Optimizations (in `next.config.ts`)
- `transpilePackages: ["three-globe"]` — required for the globe chunk.
- `experimental.optimizePackageImports: ["lucide-react", "framer-motion"]` — tree-shakes icon lib and animation features.

## Patterns
- Sections use `Section` + `SplitLayout` + `ScrollReveal` wrappers. Don't inline Framer Motion boilerplate.
- Hardcoded data lives in `lib/`, not inside components.
- Hero is wrapped in `<header>`, not `<section>`. Other sections use `<Section>`.
- Cards wrapped in `<TiltBox>` for 3D effect with `defaultRotateY` prop per section.
- Interactive cards wrapped in `<Link>` (Next.js) with `className="block"`.
- Feature pages use plain `<div>` layout (no Section/SplitLayout/ScrollReveal).
- All pages share the same footer pattern: `border-t border-white/10 px-6 md:px-12 py-8` with copyright + tunedrop.org link.

## Styling Conventions
- Glass-morphism: `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl`.
- Card glow: `shadow-[0_0_50px_rgba(24,119,242,0.12)]`.
- Green labels: `text-green-400 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]`.
- Back links: `text-white/40 hover:text-brand transition-colors text-sm`.
- Section headings: `text-4xl md:text-6xl font-extrabold leading-tight tracking-tight`.
- Body text: `text-lg text-white/50 leading-relaxed`.
- Title separator: Use `|` not `—` in metadata titles.

## TypeScript Paths
`@/*` maps to `./*` (repo root).

## React 19 Notes
- JSX namespace must be accessed via `React.JSX` when needed (avoid bare `JSX.IntrinsicElements`).
- R3F hooks trigger stricter ESLint rules (`react-hooks/refs`, `react-hooks/immutability`, `react-hooks/set-state-in-effect`). Use disable comments for intentional patterns.

## Deployment
- Vercel (`vercel.json` present). Pushes to `main` deploy to production.
- Email capture stub mentioned in README (`app/api/subscribe/`) does not currently exist.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
