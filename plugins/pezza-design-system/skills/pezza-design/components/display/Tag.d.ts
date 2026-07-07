import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Render in Space Mono (default true). */
  mono?: boolean;
  /** Show an × remove button. */
  removable?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
