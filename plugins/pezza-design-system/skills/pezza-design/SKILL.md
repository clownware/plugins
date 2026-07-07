---
name: pezza-design
description: Use this skill to generate well-branded interfaces and assets for Pezza — a monochrome, photography-driven personal brand spanning a light web-app register and a dark DJ/producer register — for production or throwaway prototypes/mocks. Contains design guidelines, HSL-channel tokens, brand SVGs (animatable stroke mark + official outlines), a prose layer, a motion system, React primitives, and two UI kit starters.
user-invocable: true
---

## Hard rules (violating any of these breaks the brand)

1. **Accent is a cursor, never a fill.** `--accent` (Crossfade Cyan) appears only on: links (hover/active), focus rings, waveform/playhead moments, one "now playing"-class glow per view. Never backgrounds, never gradients, never decorative.
2. **Monochrome discipline.** Grayscale Ink ramp + the one accent + muted status colors. No new hues, no gradients (the one exception: `--protect-gradient`, which is ink, not color). Photography carries the color.
3. **The mark's rules are law.** Never filled, never outlined, never recolored (accent variant excepted, digital only), never distorted. Clearspace = one stroke-square. Two lockups only: bare emblem, and emblem + wordmark horizontal.
4. **Protection gradient is mandatory over photography.** Any text or mark on a photo sits over `--protect-gradient` (PhotoHero bakes this in).
5. **The metadata register is the signature.** Every technical value — BPM, key, catalog #, dates, counts, Lighthouse scores, commit refs, stack labels — is Space Mono (MetaLabel), usually uppercase. Music and dev values share one voice.
6. **Three faces, three jobs.** Space Grotesk = display/UI/wordmark (ALL CAPS, 0.18em tracking). Space Mono = metadata. Inter = long-form prose only, via `.prose`.
7. **Prose links rest as ink** (1px underline); accent only on hover/active.
8. **Press = scale (.97 buttons / .92 icons), no bounce.** Hover = sunken fill or border darken.
9. **Motion is gated.** Everything respects `prefers-reduced-motion`. No infinite loops in product UI — looping only in the sting/demo contexts.
10. **No emoji anywhere.** Monoline SVG icons (1.6 stroke, rounded; nearest CDN match is Lucide).
11. **Tokens are bare HSL channels** — always wrap at use: `hsl(var(--accent) / .25)`. Never hardcode hexes outside `tokens/`.

## File map

- `readme.md` — the full brand guide (content voice, visual foundations, motion in practice, iconography, index). Read it first.
- `styles.css` — the entry point; imports all tokens + prose. `tokens/`: colors (HSL channels, light default, `[data-theme="dark"]`/`.on-dark` for the stage register), typography (chassis ladder xs–8xl + `--type-*` role shorthands), spacing, effects (shadows, glow, `--protect-gradient`, motion tokens). `tokens/base.json` bridges into the Astro Performance Starter pipeline.
- `brand/` — `emblem.svg` (ONE continuous stroke path, length 82.12uu — the animatable master), mono/accent variants, `favicon.svg` (heavier sub-32px build), `lockup-horizontal.svg` (+ editable companion). Official filled outlines live in `assets/logo/*.svg`.
- `prose.css` — opt-in `.prose` scope: Inter body at 68ch, Grotesk headings, mono code blocks with language label, ink syntax ramp + accent on strings.
- `motion/` — `motion.css` + `motion.js`: draw-on, crossfade-wipe, playhead (@property), hover/press utilities; `sting.html` (standalone 2.4s brand sting, loop-for-capture); `motion.html` specimen.
- `components/` — React primitives (Button, IconButton, Avatar, Badge, Card, Tag, Checkbox, Input, Select, Switch, MetaRow, WaveBar, **MetaLabel**, **PhotoHero**), each as `.jsx` + `.d.ts` + `.prompt.md` + card.
- `ui_kits/app/` — light web-app shell starter. `ui_kits/site/` — dark DJ/producer site starter.
- `assets/img/` — photographic backgrounds (WebP primary, JPG fallback).

## Usage modes

**Artifacts** (slides, mocks, throwaway prototypes): copy assets out, produce static HTML linking `styles.css`; add `motion/motion.css` only if the piece needs motion.

**Production code**: copy assets, follow the tokens and rules above; `tokens/base.json` feeds the Astro starter's pipeline. Use the stroke emblem for any draw-on/animated context and the official outlines (`assets/logo/`) for static placement.

If invoked without guidance, ask what the user wants to build, ask a few focused questions, then act as an expert designer producing HTML artifacts or production code as fits the need.
