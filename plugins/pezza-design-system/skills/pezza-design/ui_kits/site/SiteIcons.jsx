/* Site icons — monoline, matches brand. */
const SIc = (paths) => (props) => React.createElement('svg', {
  width: props.size || 18, height: props.size || 18, viewBox: '0 0 24 24',
  fill: props.fill ? 'currentColor' : 'none', stroke: props.fill ? 'none' : 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', ...props,
}, paths.map((d, i) => React.createElement('path', { key: i, d })));

window.SiteIcons = {
  Play:    (p) => React.createElement('svg', { width: p.size||18, height: p.size||18, viewBox:'0 0 24 24', fill:'currentColor', ...p }, React.createElement('path', { d:'M6 4l14 8-14 8V4z' })),
  Pause:   SIc(['M8 5v14', 'M16 5v14']),
  Soundcloud: SIc(['M3 16v-4', 'M6 17v-7', 'M9 17v-9', 'M12 17V9a4 4 0 0 1 8 0v8z']),
  Bandcamp:SIc(['M4 16l4-8h12l-4 8z']),
  Instagram: SIc(['M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z', 'M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0', 'M17 7h.01']),
  Arrow:   SIc(['M5 12h14', 'M13 6l6 6-6 6']),
  Calendar:SIc(['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M4 9h16', 'M9 4V2', 'M15 4V2']),
};
