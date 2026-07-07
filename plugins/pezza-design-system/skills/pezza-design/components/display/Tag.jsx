import React from 'react';

/** Pezza tag — hairline chip, optional remove affordance. For filters, key/genre. */
export function Tag({ mono = true, removable = false, onRemove, children, style, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 26,
        padding: '0 10px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-soft)',
        color: 'var(--text-body)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
        fontSize: 'var(--text-2xs)',
        letterSpacing: mono ? 'var(--tracking-mono)' : '0',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 14, height: 14, padding: 0, border: 'none', background: 'transparent',
            color: 'var(--text-faint)', cursor: 'pointer',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1 1l7 7M8 1l-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        </button>
      )}
    </span>
  );
}
