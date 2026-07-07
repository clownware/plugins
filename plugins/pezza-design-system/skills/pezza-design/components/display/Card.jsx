import React from 'react';

/** Pezza surface card — flat, hairline border, minimal elevation. Depth comes from contrast. */
export function Card({
  as: Tag = 'div',
  padding = 'md',
  interactive = false,
  elevated = false,
  children,
  style,
  ...rest
}) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)' };
  const [hover, setHover] = React.useState(false);

  return (
    <Tag
      onMouseEnter={(e) => { setHover(true); rest.onMouseEnter && rest.onMouseEnter(e); }}
      onMouseLeave={(e) => { setHover(false); rest.onMouseLeave && rest.onMouseLeave(e); }}
      style={{
        background: 'hsl(var(--bg-surface))',
        border: '1px solid hsl(var(--border-soft))',
        borderRadius: 'var(--radius-lg)',
        padding: pads[padding] ?? pads.md,
        boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-none)',
        transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        cursor: interactive ? 'pointer' : 'default',
        ...(interactive && hover ? { borderColor: 'hsl(var(--border-strong))', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
