import React from 'react';

/** Pezza text input — hairline field, accent focus ring, mono-friendly. */
export function Input({
  size = 'md',
  invalid = false,
  mono = false,
  prefix = null,
  suffix = null,
  style,
  ...rest
}) {
  const sizes = {
    sm: { height: 32, font: 'var(--text-lg)', pad: 10 },
    md: { height: 40, font: 'var(--text-xl)', pad: 12 },
    lg: { height: 48, font: 'var(--text-xl)', pad: 14 },
  };
  const s = sizes[size] || sizes.md;

  const [focused, setFocused] = React.useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: s.height,
        padding: `0 ${s.pad}px`,
        background: 'hsl(var(--bg-surface))',
        border: `1px solid ${invalid ? 'hsl(var(--err))' : focused ? 'hsl(var(--accent))' : 'hsl(var(--border-soft))'}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: focused && !invalid ? '0 0 0 3px hsl(var(--accent) / 0.18)' : 'none',
        transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      {prefix && <span style={{ color: 'hsl(var(--text-faint))', display: 'inline-flex' }}>{prefix}</span>}
      <input
        onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          flex: 1,
          minWidth: 0,
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'hsl(var(--text-strong))',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
          fontSize: s.font,
          letterSpacing: mono ? 'var(--tracking-mono)' : '0',
        }}
      />
      {suffix && <span style={{ color: 'hsl(var(--text-faint))', display: 'inline-flex', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)' }}>{suffix}</span>}
    </div>
  );
}
