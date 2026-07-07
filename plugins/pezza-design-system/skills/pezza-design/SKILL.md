---
name: pezza-design
description: Use this skill to generate well-branded interfaces and assets for Pezza, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Two registers:** light monochrome **web-app** surface, and dark **photographic DJ/producer** identity. Pick the right one for the task.
- **One mark, white, over photography.** Never recolor (except the single Crossfade Cyan accent for digital), fill, or distort. `assets/logo/emblem-white.png` (dark bg), `emblem-black.png` (light bg).
- **Type:** Space Grotesk (display/UI, wordmark = ALL CAPS wide tracking), Space Mono (all metadata — BPM, key, catalog, counts, dates).
- **Color:** grayscale Ink ramp + one accent (`#00E5C0`) used like a cursor. Photography carries the color.
- **Tokens:** link `styles.css`; use the CSS custom properties, don't hardcode hexes.
- **Icons:** local monoline SVG set (1.6 stroke, rounded). No emoji. Nearest CDN match is Lucide.

## Files
- `readme.md` — full brand guide (CONTENT, VISUAL, ICONOGRAPHY, index).
- `styles.css` + `tokens/` — design tokens and fonts.
- `components/` — React primitives (Button, Input, Card, Badge, WaveBar, MetaRow, …).
- `ui_kits/app/` — generic web-app shell starter.
- `ui_kits/site/` — DJ/producer site starter.
- `assets/` — logos and photographic backgrounds.
