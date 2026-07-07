Solid-ink action button in Space Grotesk — use for the single primary action in a view; `accent` only for waveform/now-playing moments.

```jsx
<Button variant="primary" size="md" onClick={save}>Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="accent" iconLeft={<PlayIcon/>}>Play set</Button>
```

Variants: `primary` (solid ink), `secondary` (hairline outline), `ghost` (text only), `accent` (Crossfade Cyan — sparing). Sizes: `sm` 32px, `md` 40px, `lg` 48px. Press state shrinks to 0.97. Pass `block` to fill width.
