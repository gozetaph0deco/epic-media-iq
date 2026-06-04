---
name: epicmedia-project-map
description: Map of the Epic Media website codebase — stack, folder layout, what each section/component does, where assets and editable data arrays live, custom CSS classes, and how to run/build. Use whenever locating files, adding/editing a section or project, swapping assets, or running the dev server.
---

# Epic Media Website — Project Map

## Stack
React + Vite + TypeScript · Tailwind CSS v3 (shadcn theme) · GSAP + ScrollTrigger (scroll animation) · Lenis (smooth scroll) · three.js (`SandDriftCanvas` particles). Project root: `website/app/`.

## Layout
```
website/app/
  index.html
  tailwind.config.js      # brand colors + font families
  vite.config.ts          # dev server port = 3000, base './'
  public/assets/          # images + videos served at /assets/*
  src/
    App.tsx               # Lenis + ScrollTrigger setup; renders section order
    index.css             # global styles, brand component classes, keyframes
    components/
      Logo.tsx            # the epi+c wordmark (Media inside c) — single source of truth
      Navbar.tsx          # fixed nav, uses <Logo>, navLinks array
      Footer.tsx          # uses <Logo>, navLinks + socialLinks arrays
      SandDriftCanvas.tsx # three.js background particles (fixed, behind everything)
    sections/
      HeroSection.tsx       # splash: animated <Logo> only + tagline + scroll cue
      ShowreelSection.tsx   # video-grid background + heading/caption + cards + stats
      PortfolioSection.tsx  # "Selected Work" — real client projects
      ContactSection.tsx    # contact form / details
```

## Section order
Edited in `src/App.tsx`: Hero → Showreel → Portfolio → Contact (Navbar above, Footer below).

## Editable data (top of each file)
- `PortfolioSection.tsx` → `PROJECTS[]` (title, arabic, category, description, image, stats). Add/swap projects here.
- `ShowreelSection.tsx` → `REELS[]` (`/assets/reel1-6.mp4` background grid), `FEATURES[]`, `STATS[]`.
- `Navbar.tsx` / `Footer.tsx` → `navLinks[]`; Footer also `socialLinks[]`.

## Assets (`public/assets/`, referenced as `/assets/...`)
- Portfolio images: `project-glamor.jpg`, `project-neko.jpg`, `project-roken.jpg`, `project-aamar.jpg`.
- Showreel clips: `reel1.mp4` … `reel6.mp4`.
- To add: copy file into `public/assets/`, then reference `/assets/<file>` in the relevant data array. (Original Instagram source content lives one level up in `epicmedia content/`.)

## Custom CSS (`src/index.css`)
- `.hero-aurora` (animated multi-radial bg), `.hero-vignette`, `.hero-logo-glow` — hero only.
- `.glass-card`, `.neon-pulse-grid`, `.iraqi-pattern`, `.gradient-bg` — reusable surfaces.
- Keyframes: `aurora-drift`, `logo-glow` (in index.css); `gradient-shift`, `grid-pulse`, `scroll-dot` (in tailwind.config.js).

## Animation conventions
GSAP timelines fire on `ScrollTrigger` with `once: true`. Elements are targeted by class hooks (e.g. `.showreel-heading`, `.project-card`, `.portfolio-label`). Keep these class names when editing markup or animations break.

## Run / Build (Windows PowerShell — path has spaces, quote it!)
```powershell
cd "C:\Users\pupgj\OneDrive\Desktop\epicmedia content\website\app"
npm install      # first time only
npm run dev      # → http://localhost:3000
npm run build    # tsc + vite build (verify after changes)
```
Common mistakes: unquoted `cd` (spaces break it) and running `npm run dev` from the wrong folder ("Missing script: dev").
