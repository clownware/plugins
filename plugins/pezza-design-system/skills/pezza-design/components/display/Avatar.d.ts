import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Fallback initials when no src. */
  initials?: string;
  /** Pixel size (width=height). Default 40. */
  size?: number;
  shape?: 'round' | 'square';
  /** Use the Pezza emblem as the fallback instead of initials. */
  emblem?: boolean;
}

export function Avatar(props: AvatarProps): JSX.Element;
