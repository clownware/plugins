import React from 'react';

/** The metadata register as a primitive - Space Mono, dot-separated segments.
    Anything technical (BPM, key, catalog, dates, scores, stack labels) belongs here. */
export function MetaLabel({
  segments = [],
  uppercase = true,
  muted = true,
  size = 'sm',
  style,
  children,
  ...rest
}) {
  const sizes = { xs: 'var(--text-xs)', sm: 'var(--text-sm)', base: 'var(--text-base)' };
  const content = children ?? segments.flatMap((seg, i) =>
    i === 0 ? [seg] : [<span key={`dot-${i}`} aria-hidden="true">{' · '}</span>, seg]
  );

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: sizes[size] ?? sizes.sm,
        letterSpacing: 'var(--tracking-mono)',
        textTransform: uppercase ? 'uppercase' : 'none',
        color: muted ? 'hsl(var(--text-muted))' : 'hsl(var(--text-body))',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {content}
    </span>
  );
}
