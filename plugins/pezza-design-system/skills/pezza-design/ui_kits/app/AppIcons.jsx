/* App icons — monoline, 1.6 stroke, rounded. Matches the Pezza mark. */
const AIc = (paths) => (props) => React.createElement('svg', {
  width: props.size || 18, height: props.size || 18, viewBox: '0 0 24 24',
  fill: props.fill ? 'currentColor' : 'none', stroke: props.fill ? 'none' : 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', ...props,
}, paths.map((d, i) => React.createElement('path', { key: i, d })));

window.AppIcons = {
  Home:     AIc(['M4 11l8-7 8 7', 'M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9']),
  Grid:     AIc(['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z']),
  Star:     AIc(['M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z']),
  Activity: AIc(['M3 12h4l3 8 4-16 3 8h4']),
  Inbox:    AIc(['M4 13l2-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1l2 7v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z', 'M4 13h5l1 2h4l1-2h5']),
  Folder:   AIc(['M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z']),
  Archive:  AIc(['M3 4h18v4H3z', 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8', 'M9 12h6']),
  Search:   AIc(['M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M16 16l5 5']),
  Plus:     AIc(['M12 5v14', 'M5 12h14']),
  List:     AIc(['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01']),
  Settings: AIc(['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z']),
  StarFill: (p) => React.createElement('svg', { width: p.size||18, height: p.size||18, viewBox:'0 0 24 24', fill:'currentColor', ...p }, React.createElement('path', { d:'M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z' })),
};
