The metadata register, packaged. Space Mono, uppercase, dot-separated segments. Use it for EVERY technical value - it is what makes the system read "producer/maker". The register bridges domains: music values and dev/portfolio values share the same voice.

```jsx
<MetaLabel segments={["124 BPM", "A♭ MIN", "CAT# PZA-007"]} />
<MetaLabel segments={["ASTRO 6", "100/100 LH", "2026-07"]} />
<MetaLabel segments={["main @ 4927e37", "deploy 42s"]} uppercase={false} />
<MetaLabel segments={["react", "astro", "cloudflare"]} size="xs" />
```

Rules: real quantities only (a number earns its place); no emoji; one label per line of hierarchy - do not stack registers.
