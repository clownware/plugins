import React from 'react';

/** Pezza checkbox — square, hairline, accent fill with a draw-on check. */
export function Checkbox({ checked, onChange, disabled = false, label, style, ...rest }) {
  const [internal, setInternal] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };

  const box = (
    <span
      onClick={toggle}
      role="checkbox"
      aria-checked={isOn}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        flex: 'none',
        borderRadius: 'var(--radius-xs)',
        border: `1.5px solid ${isOn ? 'hsl(var(--accent))' : 'hsl(var(--border-strong))'}`,
        background: isOn ? 'hsl(var(--accent))' : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: isOn ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-out)' }}>
        <path d="M2.5 6.2L5 8.7L9.6 3.4" stroke="hsl(var(--accent-ink))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  if (!label) return box;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {box}
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', color: 'hsl(var(--text-body))' }}>{label}</span>
    </label>
  );
}
