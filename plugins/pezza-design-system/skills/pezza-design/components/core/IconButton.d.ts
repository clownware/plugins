import React from 'react';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Accessible label (also the title tooltip). */
  label: string;
  /** Toggled/selected state. */
  active?: boolean;
  disabled?: boolean;
  /** Icon node (inline SVG recommended). */
  children: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
