import React from 'react';

/** Pezza checkbox — square, hairline, accent fill with a draw-on check.
    A real <button role="checkbox">: focusable and keyboard-operable by construction. */
export function Checkbox({ checked, onChange, disabled = false, label, style, ...rest }) {
  const [internal, setInternal] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };

  const box = (
    <button
      type="button"
      onClick={toggle}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      role="checkbox"
      aria-checked={isOn}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        padding: 0,
        flex: 'none',
        appearance: 'none',
        borderRadius: 'var(--radius-xs)',
        border: `1.5px solid ${isOn ? 'hsl(var(--accent))' : 'hsl(var(--border-strong))'}`,
        background: isOn ? 'hsl(var(--accent))' : 'transparent',
        boxShadow: focused ? '0 0 0 3px hsl(var(--accent) / 0.18)' : 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: isOn ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-out)' }}>
        <path d="M2.5 6.2L5 8.7L9.6 3.4" stroke="hsl(var(--text-onAccent))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  if (!label) return box;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {box}
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-lg)', color: 'hsl(var(--text-body))' }}>{label}</span>
    </label>
  );
}
