import React from 'react';

/**
 * Full-bleed photographic hero with the protection gradient baked in.
 * @startingPoint section="Display" subtitle="Photo hero - protection gradient enforced" viewport="900x420"
 */
export interface PhotoHeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Background photograph URL (the brand's cinematic imagery). */
  image: string;
  /** Display heading, set in --type-display over the protected zone. */
  heading?: React.ReactNode;
  /** Metadata segments rendered as a MetaLabel (release, BPM, date, stack). */
  meta?: React.ReactNode[];
  /** The mark slot - pass the emblem SVG (white over photography, never recolored). */
  mark?: React.ReactNode;
  /** Placement of mark + heading block. Default 'bottom-left'. */
  markPosition?: 'bottom-left' | 'bottom-center';
  /** CSS height. Default '72vh'. */
  height?: string;
  children?: React.ReactNode;
}

/**
 * Full-bleed photographic hero with the protection gradient baked in.
 */
export function PhotoHero(props: PhotoHeroProps): JSX.Element;
