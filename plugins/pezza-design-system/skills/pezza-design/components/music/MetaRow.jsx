import React from 'react';

/**
 * Pezza MetaRow — a single tracklist / release-credit line in Space Mono.
 * The metadata register: index, title, and right-aligned technical tags.
 * When onClick is provided the row is a real button target: focusable,
 * Enter/Space operable, with the system focus ring.
 */
export function MetaRow({ index, title, artist, bpm, musicKey, duration, active = false, onClick, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const interactive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-current={active || undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
      } : undefined}
      onFocus={interactive ? () => setFocused(true) : undefined}
      onBlur={interactive ? () => setFocused(false) : undefined}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'hsl(var(--bg-raised))' : 'transparent',
        boxShadow: focused ? '0 0 0 3px hsl(var(--accent) / 0.18)' : 'none',
        outline: 'none',
        cursor: interactive ? 'pointer' : 'default',
        fontFamily: 'var(--font-mono)',
        transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { if (interactive && !active) e.currentTarget.style.background = 'hsl(var(--bg-sunken))'; }}
      onMouseLeave={(e) => { if (interactive && !active) e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      <span style={{ fontSize: 'var(--text-sm)', color: active ? 'hsl(var(--accent))' : 'hsl(var(--text-faint))' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 'var(--text-lg)', color: 'hsl(var(--text-strong))' }}>{title}</span>
        {artist && <span style={{ fontSize: 'var(--text-lg)', color: 'hsl(var(--text-muted))' }}> — {artist}</span>}
      </span>
      <span style={{ display: 'inline-flex', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'hsl(var(--text-muted))', letterSpacing: 'var(--tracking-mono)' }}>
        {bpm && <span>{bpm} BPM</span>}
        {musicKey && <span>{musicKey}</span>}
        {duration && <span style={{ color: 'hsl(var(--text-faint))' }}>{duration}</span>}
      </span>
    </div>
  );
}
