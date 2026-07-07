Full-bleed photographic hero for the music register. The protection gradient (`--protect-gradient`, transparent top to near-opaque ink) ships inside the component, so text and mark legibility over photography is enforced by construction - never place text on a photo any other way. The mark slot takes the white emblem SVG; it is never recolored over photography.

```jsx
<PhotoHero
  image="/assets/img/bg-galaxy.webp"
  mark={<img src="/brand/emblem-mono-white.svg" alt="" />}
  heading="Weightless Structure EP"
  meta={["PZA-007", "4 TRACKS", "OUT 2026-08"]}
/>
```

One hero per page. Pair with a `playhead` on the featured release below it - not on the hero itself.
