import React from 'react';

/** Pezza toggle switch — ink track, snaps with crossfade easing; accent when on. */
export function Switch({ checked, onChange, disabled = false, label, style, ...rest }) {
  const [internal, setInternal] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };

  const sw = (
    <button
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      style={{
        position: 'relative',
        width: 44,
        height: 26,
        flex: 'none',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        background: isOn ? 'hsl(var(--accent))' : 'hsl(var(--border-strong))',
        transition: 'background var(--dur-base) var(--ease-crossfade)',
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: isOn ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: 'var(--radius-round)',
          background: 'hsl(var(--ink-0))',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--dur-base) var(--ease-crossfade)',
        }}
      />
    </button>
  );

  if (!label) return sw;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {sw}
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', color: 'hsl(var(--text-body))' }}>{label}</span>
    </label>
  );
}
