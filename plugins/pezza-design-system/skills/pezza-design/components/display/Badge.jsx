import React from 'react';

/** Pezza badge — small status pill. Mono label, muted tones, optional dot. */
export function Badge({ tone = 'neutral', dot = false, children, style, ...rest }) {
  const tones = {
    neutral: { bg: 'hsl(var(--bg-sunken))', fg: 'hsl(var(--text-muted))', dotC: 'hsl(var(--text-faint))' },
    ink:     { bg: 'hsl(var(--text-strong))', fg: 'hsl(var(--text-inverse))', dotC: 'hsl(var(--text-inverse))' },
    accent:  { bg: 'hsl(var(--accent) / 0.14)', fg: 'hsl(var(--link))', dotC: 'hsl(var(--accent))' },
    ok:      { bg: 'hsl(var(--ok) / 0.14)', fg: 'hsl(var(--ok-fg))', dotC: 'hsl(var(--ok))' },
    warn:    { bg: 'hsl(var(--warn) / 0.16)', fg: 'hsl(var(--warn-fg))', dotC: 'hsl(var(--warn))' },
    err:     { bg: 'hsl(var(--err) / 0.14)', fg: 'hsl(var(--err-fg))', dotC: 'hsl(var(--err))' },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 22,
        padding: '0 9px',
        background: t.bg,
        color: t.fg,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dotC, flex: 'none' }} />}
      {children}
    </span>
  );
}
