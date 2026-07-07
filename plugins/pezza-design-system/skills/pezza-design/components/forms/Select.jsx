import React from 'react';

/** Pezza select — hairline field matching Input, custom chevron. */
export function Select({ size = 'md', invalid = false, children, style, ...rest }) {
  const sizes = {
    sm: { height: 32, font: 'var(--text-sm)', pad: 10 },
    md: { height: 40, font: 'var(--text-md)', pad: 12 },
    lg: { height: 48, font: 'var(--text-md)', pad: 14 },
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', width: style?.width || 'auto' }}>
      <select
        onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          width: '100%',
          height: s.height,
          padding: `0 ${s.pad + 22}px 0 ${s.pad}px`,
          background: 'var(--bg-surface)',
          color: 'var(--text-strong)',
          border: `1px solid ${invalid ? 'var(--err)' : focused ? 'var(--accent)' : 'var(--border-soft)'}`,
          borderRadius: 'var(--radius-sm)',
          boxShadow: focused && !invalid ? '0 0 0 3px rgba(0,229,192,0.18)' : 'none',
          fontFamily: 'var(--font-ui)',
          fontSize: s.font,
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
          ...style,
        }}
      >
        {children}
      </select>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
        style={{ position: 'absolute', right: s.pad, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
