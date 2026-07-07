import React from 'react';

export interface MetaRowProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  title: string;
  artist?: string;
  /** BPM value (rendered in accent). */
  bpm?: number | string;
  /** Musical key, e.g. "A♭ min". */
  musicKey?: string;
  /** Duration string, e.g. "6:42". */
  duration?: string;
  active?: boolean;
  onClick?: () => void;
}

export function MetaRow(props: MetaRowProps): JSX.Element;
