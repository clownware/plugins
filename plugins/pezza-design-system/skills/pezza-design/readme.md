# Pezza Design System

The brand system for **Pezza** — a personal identity spanning two registers:

1. **Personal web apps** (pantry, trackers, internal tools) — a clean, monochrome, utilitarian product surface.
2. **DJ / producer identity** — a dark, photographic music brand: one white mark over rotating imagery, with a Space Mono metadata layer for tracklists, BPM, key and catalog numbers.

The whole system hangs off one idea: **a monoline geometric monogram with an X-crossfader at its heart.** The X is a crossfader — that's both the logo and the animation language.

## Sources & assets
- `assets/logo/emblem-white.png` — the primary mark (white, transparent). Use on dark / photographic backgrounds.
- `assets/logo/emblem-black.png` — black variant for light backgrounds (generated from the white master).
- `assets/logo/emblem-accent.png` — Crossfade Cyan variant (digital/non-photo only — used sparingly).
- `assets/logo/brand-contact-sheet.png` — the original brand board showing the mark over desert / water / galaxy / smoke / ice photography.
- `assets/img/bg-*.jpg` — photographic backgrounds (galaxy, desert, sunset, smoke) cropped from the contact sheet.

> ⚠️ **Font substitution flag:** No brand font files were supplied. Per the brand brief, the system uses **Space Grotesk** (wordmark/display/UI) and **Space Mono** (metadata) loaded from Google Fonts — both libre/OFL, so they travel everywhere with zero licensing friction. If you intend a premium pairing instead (Neue Montréal / Söhne), supply the files and I'll swap them in.

---

## CONTENT FUNDAMENTALS

**Voice:** confident, spare, technical-but-human. Pezza is one person, not a company — so the copy is first-person/direct, never corporate "we deliver solutions" filler.

- **Casing:** The wordmark is **ALL CAPS** with wide tracking (`PEZZA`). UI headings are sentence case. Eyebrows / section labels / metadata are UPPERCASE in Space Mono. Body is sentence case.
- **Person:** Address the user directly ("Search…", "Add item", "Play EP"). On the artist side, statements are declarative and unsigned ("Four tracks of deep, weightless techno").
- **Length:** Short. Labels are 1–2 words. Descriptions are one sentence. No paragraphs in UI.
- **The metadata register is the signature.** Anything technical — BPM, key, catalog #, durations, quantities, expiry, timestamps, counts — is set in **Space Mono**, often uppercase, often spaced. This is what makes the system read as "producer / maker" rather than generic. Examples: `124 BPM`, `CAT# PZA-007`, `A♭ min`, `2 bottles · exp. AUG`, `24BIT/44.1K`.
- **Numbers earn their place.** Don't decorate with stats. A number appears because it's a real quantity (tempo, count, date).
- **Emoji:** none. The brand is monochrome and typographic; emoji would break it. Use the monoline icon set instead.
- **Tone words:** weightless, deep, clean, technical, nocturnal. Avoid: playful, bubbly, salesy.

---

## VISUAL FOUNDATIONS

**Color is photography, not a palette.** The mark is monochrome by design; the artwork carries the color. The system is built on a **true grayscale Ink ramp** (`--ink-1000` → `--ink-0`) so the white mark always reads, plus **one** electric accent.

- **Accent — Crossfade Cyan (`#00E5C0`).** The single digital hue. Used like a cursor: links, the waveform, focus rings, the active track, a now-playing glow. **Never** a fill field, never a gradient, never decorative. On light backgrounds use `--accent-dim` for contrast.
- **Status** hues (ok/warn/err) exist but are muted and rare — the brand is not colorful.
- **Two themes:** light (`--bg-app: ink-50`) for the app/product surface; dark/stage (`[data-theme="dark"]` or `.on-dark`, `--bg-app: ink-1000`) for the music identity. Dark is the *native* register.

**Type.** Space Grotesk for everything visible (geometric grotesque echoing the mark's construction; its `a`/`G` keep it human). Space Mono for the metadata layer. Wordmark = caps + `--tracking-wider` (0.18em). Display sizes go large (up to 96px on cover art / heroes); UI min ~14px.

**Backgrounds.** Either flat ink (app) or **full-bleed photography** (music). Photographic backgrounds always get a **protection gradient** (top-transparent → `ink-1000` at ~85%) so the white mark and text stay legible. Imagery vibe: cinematic, slightly faded, mixed warm/cool — desert, water, galaxy, smoke, ice. The mark sits centered with a soft `drop-shadow` over busy photos.

**Spacing & grid.** 4px base unit (`--space-*`) — same grid DNA as the monoline mark. Generous gutters (`--space-6`/`32px`) in app layouts.

**Radii.** Restrained. Cards `--radius-lg` (16px), controls `--radius-sm` (6px), true pills only for badges/switch. Nothing is overly soft. The mark itself has rounded terminals, so UI rounds *gently*, never bubbly.

**Borders & elevation.** Depth comes from **contrast and hairlines, not heavy shadow.** Surfaces are flat with 1px borders (`--border-soft`/`--border-hair`). Shadows are minimal (`--shadow-sm`/`md`); the one exception is `--glow-accent`, a cyan glow reserved for the playing waveform / now-playing button.

**Cards.** Flat, 1px hairline border, 16px radius, no shadow by default. `interactive` adds a 2px lift + border darken on hover. `elevated` adds a soft shadow when a card needs to float.

**Hover / press.** Hover = subtle background fill (`--bg-sunken`) or border darken; links brighten toward white/accent. Press = scale down (`0.97` buttons, `0.92` icon buttons) — quick and confident. No bounce.

**Motion — "the X is a crossfader."** Easings: `--ease-out` (most UI), `--ease-crossfade` (slide-overs, the switch knob, anything that "wipes"). Durations 120/220/420ms. The brand animation idiom is strokes that *draw on*, the X that *wipes/scratches*, two triangles that separate and recombine on a beat — built for a 2–3s logo sting (video intros, OBS/Twitch stingers). No infinite decorative loops in product UI.

**Transparency & blur.** Used for the sticky site nav (`rgba(ink-1000,0.6)` + `blur(12px)`) and photo protection gradients. Not used as a general "glassmorphism" style.

**Logo construction rules.** Clear space ≈ one stroke-square on every side. Never fill the mark, never add a stroke-on-stroke outline (it lives as negative space), never recolor (except the one accent variant for digital), never distort, never place on low-contrast. Two lockups only: **bare emblem** (avatars, favicons, merch) and **emblem + wordmark horizontal** (banners, cover art, press). Make a heavier-weight variant for sub-32px sizes.

---

## ICONOGRAPHY

- **No icon library dependency.** Icons are a small, hand-tuned **monoline set** drawn inline as SVG to match the mark: `stroke-width: 1.6`, `round` caps and joins, 24×24 viewBox. They live with each UI kit (`ui_kits/*/Icons.jsx`) and share one factory pattern.
- **Why monoline:** the logo is a monoline geometric mark, so icons must echo that weight and rounding. A filled or heavy icon set would clash.
- **Closest off-the-shelf match:** if you need a CDN set instead of the local one, **Lucide** is the nearest equivalent (same ~1.5–2px monoline, rounded geometric construction). Substitute Lucide and keep `stroke-width` ~1.6. *(Flagged: the kits ship the local set, not Lucide, to avoid a runtime dependency.)*
- **Emoji:** never. **Unicode** is used only for genuine musical glyphs in metadata (e.g. `♭`, `♯` in keys like `A♭ min`).
- **The emblem as an icon:** the white emblem doubles as the app icon / avatar fallback (`Avatar emblem`) and the favicon.

---

## INDEX

**Foundations**
- `styles.css` — global entry (import this one file). `@import`s everything below.
- `tokens/colors.css` — Ink ramp, Crossfade Cyan accent, status, light + dark semantic aliases.
- `tokens/typography.css` — families, scale, weights, tracking, role shorthands.
- `tokens/spacing.css` — spacing, radii, borders, shadows, motion (easings/durations), layout.
- `tokens/fonts.css` — Space Grotesk + Space Mono (Google Fonts).
- `guidelines/*.card.html` — foundation specimen cards (Brand, Colors, Type, Spacing) shown in the Design System tab.

**Components** (`window.PezzaDesignSystem_8fc740`)
- Core — `Button`, `IconButton` (`components/core/`)
- Forms — `Input`, `Select`, `Switch`, `Checkbox` (`components/forms/`)
- Display — `Card`, `Badge`, `Tag`, `Avatar` (`components/display/`)
- Music — `WaveBar`, `MetaRow` (`components/music/`) — the brand-specific producer primitives

**UI kits**
- `ui_kits/app/` — **generic web-app shell** (sidebar, overview, items grid/list, add slide-over). The starter for any personal app.
- `ui_kits/site/` — **DJ / producer site** (hero, waveform set player, discography, live dates).

**Assets** — `assets/logo/` (marks), `assets/img/` (photographic backgrounds).

**Skill** — `SKILL.md` makes this folder usable as a downloadable Agent Skill.
