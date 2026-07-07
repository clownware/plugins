import React from 'react';

export type BadgeTone = 'neutral' | 'ink' | 'accent' | 'ok' | 'warn' | 'err';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
