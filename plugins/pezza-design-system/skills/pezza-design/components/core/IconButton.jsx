import React from 'react';

/**
 * Pezza IconButton — square, hairline or ghost, for toolbar / nav actions.
 * Pass an inline SVG or icon node as children.
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  active = false,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const dims = { sm: 32, md: 40, lg: 48 };
  const d = dims[size] || dims.md;

  const variants = {
    ghost: {
      background: active ? 'hsl(var(--bg-sunken))' : 'transparent',
      color: active ? 'hsl(var(--text-strong))' : 'hsl(var(--text-muted))',
      border: '1px solid transparent',
    },
    outline: {
      background: 'transparent',
      color: 'hsl(var(--text-body))',
      border: '1px solid hsl(var(--border-soft))',
    },
    solid: {
      background: 'hsl(var(--text-strong))',
      color: 'hsl(var(--text-inverse))',
      border: '1px solid hsl(var(--text-strong))',
    },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: d,
        height: d,
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!active && variant === 'ghost') e.currentTarget.style.background = 'hsl(var(--bg-sunken))'; }}
      onMouseLeave={(e) => { if (!active && variant === 'ghost') e.currentTarget.style.background = 'transparent'; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.92)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
