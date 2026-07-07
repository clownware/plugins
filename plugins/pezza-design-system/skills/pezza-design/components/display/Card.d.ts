import React from 'react';

/**
 * Flat surface container.
 * @startingPoint section="Display" subtitle="Cards, badges, tags & avatars" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Element tag to render. Default 'div'. */
  as?: keyof JSX.IntrinsicElements;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Lift + border darken on hover. */
  interactive?: boolean;
  /** Apply a soft drop shadow. */
  elevated?: boolean;
  children?: React.ReactNode;
}

/**
 * Flat surface container.
 */
export function Card(props: CardProps): JSX.Element;
