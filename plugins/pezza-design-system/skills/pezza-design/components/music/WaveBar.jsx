import React from 'react';

/**
 * Pezza WaveBar — the audio-waveform motif. Accent bars on a dark track,
 * with a played/un-played split at `progress`. Deterministic bars from a seed
 * so it renders identically on server/print.
 */
export function WaveBar({ bars = 48, progress = 0.4, height = 48, seed = 7, playedColor, style, ...rest }) {
  // simple deterministic PRNG
  let s = seed;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s % 1000) / 1000; };
  const heights = Array.from({ length: bars }, () => 0.18 + rnd() * 0.82);
  const playedIdx = Math.floor(bars * progress);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height,
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            flex: 1,
            height: `${Math.round(h * 100)}%`,
            minWidth: 2,
            borderRadius: 2,
            background: i <= playedIdx ? (playedColor || 'hsl(var(--waveform))') : 'hsl(var(--border-strong))',
            opacity: i <= playedIdx ? 1 : 0.55,
            transition: 'background var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
          }}
        />
      ))}
    </div>
  );
}
