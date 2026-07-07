# DJ / Producer Site UI Kit

The brand's **native register**: dark, photographic, monochrome mark over rotating imagery, with the music metadata layer in Space Mono.

## Run
Open `index.html`. Loads `_ds_bundle.js` plus the kit scripts.

## What it demonstrates
- **Sticky nav** — emblem + PEZZA wordmark, blurred translucent bar, accent CTA.
- **Hero** (`SiteApp.jsx`) — full-bleed photographic background with a protection gradient, oversized display title, primary actions.
- **Set player** — circular accent play button (glows when playing), the signature `WaveBar` scrubber that animates progress, and a `MetaRow` tracklist (BPM / key / duration).
- **Discography** — clickable release grid; selecting one loads it into the player.
- **Live dates** — tour list with ticket / sold-out states.
- **Footer** — emblem, catalog credit, social icons.

## Composition
Primitives from `window.PezzaDesignSystem_8fc740`: `Button`, `WaveBar`, `MetaRow`, `Badge`, `Card`. Photographic backgrounds come from `assets/img/bg-*.jpg`. Icons are a local monoline set (`Icons.jsx`).

## Interactions
Play/pause toggles the animated waveform; clicking a track sets the active row; clicking a release swaps the loaded EP. All mock state.

## Note
Cover art uses the brand contact-sheet photography as placeholders with the white emblem overlaid — swap in real release artwork for production.
