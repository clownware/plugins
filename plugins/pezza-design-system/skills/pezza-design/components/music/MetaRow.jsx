import React from 'react';

/**
 * Pezza MetaRow — a single tracklist / release-credit line in Space Mono.
 * The metadata register: index, title, and right-aligned technical tags.
 */
export function MetaRow({ index, title, artist, bpm, musicKey, duration, active = false, onClick, style, ...rest }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--bg-raised)' : 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'var(--font-mono)',
        transition: 'background var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick && !active) e.currentTarget.style.background = 'var(--bg-sunken)'; }}
      onMouseLeave={(e) => { if (onClick && !active) e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      <span style={{ fontSize: 'var(--text-2xs)', color: active ? 'var(--accent)' : 'var(--text-faint)' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-strong)' }}>{title}</span>
        {artist && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}> — {artist}</span>}
      </span>
      <span style={{ display: 'inline-flex', gap: 'var(--space-4)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-mono)' }}>
        {bpm && <span style={{ color: 'var(--accent)' }}>{bpm} BPM</span>}
        {musicKey && <span>{musicKey}</span>}
        {duration && <span style={{ color: 'var(--text-faint)' }}>{duration}</span>}
      </span>
    </div>
  );
}
