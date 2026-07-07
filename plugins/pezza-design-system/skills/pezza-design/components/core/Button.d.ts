import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the primary action button.
 * @startingPoint section="Core" subtitle="Buttons, icon buttons & action rows" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. Default 'primary' (solid ink). Use 'accent' sparingly. */
  variant?: ButtonVariant;
  /** Default 'md'. */
  size?: ButtonSize;
  /** Stretch full width. */
  block?: boolean;
  disabled?: boolean;
  /** Optional leading icon node. */
  iconLeft?: React.ReactNode;
  /** Optional trailing icon node. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action button for the Pezza system.
 */
export function Button(props: ButtonProps): JSX.Element;
