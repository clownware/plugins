import React from 'react';
import { MetaLabel } from './MetaLabel.jsx';

/** Full-bleed photographic hero. The protection gradient and mark/heading
    placement are baked in so the legibility rule is enforced by construction:
    photography NEVER carries text or the mark without --protect-gradient. */
export function PhotoHero({
  image,
  heading,
  meta = [],
  mark = null,
  markPosition = 'bottom-left',
  height = '72vh',
  children,
  style,
  ...rest
}) {
  const placements = {
    'bottom-left':   { alignItems: 'flex-start', textAlign: 'left' },
    'bottom-center': { alignItems: 'center', textAlign: 'center' },
  };
  const place = placements[markPosition] ?? placements['bottom-left'];

  return (
    <section
      className="on-dark"
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'hsl(var(--ink-1000))',
        ...style,
      }}
      {...rest}
    >
      {/* the legibility rule, enforced by construction */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--protect-gradient)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--space-7) var(--space-6)',
          gap: 'var(--space-3)',
          ...place,
        }}
      >
        {mark && (
          <div style={{ width: 56, color: 'hsl(var(--ink-0))', filter: 'drop-shadow(0 2px 12px hsl(var(--ink-1000) / .5))' }}>
            {mark}
          </div>
        )}
        {heading && (
          <h1
            style={{
              font: 'var(--type-display)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'hsl(var(--ink-0))',
              margin: 0,
              maxWidth: '16ch',
            }}
          >
            {heading}
          </h1>
        )}
        {meta.length > 0 && <MetaLabel segments={meta} muted={false} style={{ color: 'hsl(var(--ink-200))' }} />}
        {children}
      </div>
    </section>
  );
}
