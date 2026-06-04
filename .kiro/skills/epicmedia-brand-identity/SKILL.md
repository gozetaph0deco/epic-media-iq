---
name: epicmedia-brand-identity
description: Epic Media's complete brand identity — logo construction (the "epi" + "c" wordmark with "Media" nested inside the c), color palette, typography, voice, bilingual rules, and the no-AI-content rule. Use whenever editing the logo, colors, fonts, copy, or any visual/brand decision on the Epic Media website.
---

# Epic Media — Brand Identity

## The Logo (read this before touching the logo)
Wordmark: lowercase **`epic`**, built as `epi` + `c`, with the word **`Media` nested INSIDE the bowl of the `c`**.

- ✅ Correct: `Media` sits centered inside the `c`.
- ❌ Wrong (old version, do not reintroduce): `Media` placed to the right of / outside the `c`.
- Implemented once in `src/components/Logo.tsx`. **Always reuse `<Logo />`** — never re-inline the wordmark in Navbar/Footer/Hero.
  - Props: `className` (controls size via `font-size`, everything scales in `em`), `colorClass` (Tailwind text color, e.g. `text-warm`, `text-ivory`).
  - `Media` = `font-body`, uppercase, `font-size: 0.26em`, `opacity-80`, absolutely centered in the `c`.
- Primary logo color is brand purple `#7B2CBF`; on dark backgrounds render in `warm`/`ivory`.

## Identity
- Name: **Epic Media** (stylized `epicMedia`). Instagram: **@epicmedia.iq**. Based in Baghdad, Iraq.
- Tagline — EN: **"We shape tomorrow's brands."** · AR: **"نصنع علامات الغد"**
- Services: Digital Marketing · Content Creation · Production · Branding.

## Color Palette
| Token | Hex | Use |
|-------|-----|-----|
| deep | `#050401` | base background (near-black) |
| purple | `#7B2CBF` | primary brand / logo / accents |
| midpurple | `#5A189A` | gradients |
| darkpurple | `#240046` | gradient depth |
| coral | `#FF6B6B` | secondary accent, CTAs, highlights |
| ivory | `#F4F1DE` | body text on dark |
| warm | `#FFFDF7` | headings / logo on dark |

These exist as Tailwind colors (see `tailwind.config.js`): `bg-deep`, `text-purple`, `text-coral`, `text-ivory`, `text-warm`, etc.

## Typography
- Display / headings: **Syne** → `font-display`
- Body / UI: **Inter** → `font-body`
- Arabic (RTL): **Noto Kufi Arabic** → `font-arabic` (always set `dir="rtl"`)
- Note: legacy class `font-mono-accent` appears in markup but is NOT defined in the config — it's inert/harmless. Use `font-mono` (Space Mono) if a mono accent is actually needed.

## Voice & Bilingual Rules
- Tone: bold, cinematic, modern, confident. Short punchy lines.
- Site is bilingual EN + AR. Arabic lines use `font-arabic` + `dir="rtl"`, usually in coral at reduced opacity.

## CONTENT RULE — no AI in the portfolio
- **The portfolio / "Selected Work" must only show real client work.** Never place AI-generated images or video there.
- Known AI-generated posts to keep OUT of portfolio: the "Chicken Time" set (walking burger, three scientists, Mona Lisa + burger) — captioned as AI experiments.
- Real clients to feature: **Glamor Clinic** (identity), **NEKO** (Japanese restaurant branding/packaging), **ROKEN** (cafe & restaurant branding), **Aamar / اعمار** (design & decor rebrand).
