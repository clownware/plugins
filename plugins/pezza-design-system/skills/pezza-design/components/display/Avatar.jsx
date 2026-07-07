import React from 'react';

/** Pezza avatar — square-rounded or round, ink fallback with initials or the emblem. */
export function Avatar({ src, alt = '', initials, size = 40, shape = 'round', emblem = false, style, ...rest }) {
  const radius = shape === 'square' ? 'var(--radius-md)' : 'var(--radius-round)';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: 'none',
        borderRadius: radius,
        overflow: 'hidden',
        background: 'hsl(var(--ink-1000))',
        color: 'hsl(var(--ink-0))',
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--weight-semi)',
        fontSize: Math.round(size * 0.4),
        letterSpacing: '0.02em',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : emblem ? (
        <img src="../../assets/logo/emblem-white.svg" alt={alt} style={{ width: '54%', height: '54%', objectFit: 'contain' }} />
      ) : (
        initials
      )}
    </span>
  );
}
