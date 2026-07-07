import React from 'react';

/**
 * Pezza Button — geometric grotesque label, restrained rounding,
 * confident motion. Variants map to the monochrome brand: solid ink,
 * outline hairline, ghost, and a sparing accent.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: '0 14px', font: 'var(--text-sm)', gap: 7 },
    md: { height: 40, padding: '0 20px', font: 'var(--text-sm)', gap: 8 },
    lg: { height: 48, padding: '0 28px', font: 'var(--text-md)', gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--text-strong)',
      color: 'var(--text-inverse)',
      border: '1px solid var(--text-strong)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--accent-ink)',
      border: '1px solid var(--accent)',
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      style={{
        display: block ? 'flex' : 'inline-flex',
        width: block ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        font: `var(--weight-medium) ${s.font}/1 var(--font-ui)`,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
