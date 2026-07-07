Avatar with image, initials, or emblem fallback. Round or square-rounded.

```jsx
<Avatar src="/dj.jpg" size={48} />
<Avatar initials="CP" />
<Avatar emblem shape="square" size={56} />
```

Note: the `emblem` fallback path is relative to a component-card in `components/<group>/`. In a UI kit, pass `src` to the white emblem at the kit-correct path instead.
