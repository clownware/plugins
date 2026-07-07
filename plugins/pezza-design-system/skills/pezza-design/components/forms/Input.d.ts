import React from 'react';

/**
 * Props for the text field.
 * @startingPoint section="Forms" subtitle="Inputs, selects, toggles & checkboxes" viewport="700x220"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Error state — red border. */
  invalid?: boolean;
  /** Render value in Space Mono (for BPM, catalog ids, codes). */
  mono?: boolean;
  /** Leading adornment (icon node). */
  prefix?: React.ReactNode;
  /** Trailing adornment (unit label / icon). */
  suffix?: React.ReactNode;
}

/**
 * Text field with accent focus ring.
 */
export function Input(props: InputProps): JSX.Element;
