import React from 'react';

/**
 * Props for the waveform motif.
 * @startingPoint section="Music" subtitle="Waveform, now-playing & metadata rows" viewport="700x140"
 */
export interface WaveBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of bars. Default 48. */
  bars?: number;
  /** 0–1 played fraction (accent fill). */
  progress?: number;
  /** Pixel height. Default 48. */
  height?: number;
  /** PRNG seed for the bar pattern. */
  seed?: number;
  /** Override the played-bar color. Default accent. */
  playedColor?: string;
}

/**
 * Waveform progress/scrubber motif — the brand's signature audio element.
 */
export function WaveBar(props: WaveBarProps): JSX.Element;
