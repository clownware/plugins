import React from 'react';

/**
 * The metadata register as a primitive.
 * @startingPoint section="Display" subtitle="Mono metadata - BPM, catalog, stack, dates" viewport="700x150"
 */
export interface MetaLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Segments joined with a middle dot: ["124 BPM", "A MIN", "CAT# PZA-007"]. */
  segments?: React.ReactNode[];
  /** Uppercase the whole label (the register's default voice). Default true. */
  uppercase?: boolean;
  /** Muted ink (default) or body ink for higher emphasis. */
  muted?: boolean;
  /** Mono scale step. Default 'sm' (12px). */
  size?: 'xs' | 'sm' | 'base';
  /** Escape hatch: custom children instead of segments. */
  children?: React.ReactNode;
}

/**
 * The metadata register as a primitive.
 */
export function MetaLabel(props: MetaLabelProps): JSX.Element;
