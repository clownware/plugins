/* Pezza — DJ/producer site. Dark, photographic. Hero, player, discography, dates. */
const BG = {
  galaxy: '../../assets/img/bg-galaxy.webp',
  desert: '../../assets/img/bg-desert.webp',
  sunset: '../../assets/img/bg-sunset.webp',
  smoke:  '../../assets/img/bg-smoke-wide.webp',
};

function SiteNav() {
  const I = window.SiteIcons;
  const link = (t) => <a href="#" style={{ font: 'var(--weight-medium) var(--text-lg)/1 var(--font-ui)', color: 'hsl(var(--ink-300))', textDecoration: 'none', letterSpacing: '0.02em' }}
    onMouseEnter={(e)=>e.currentTarget.style.color='hsl(var(--ink-0))'} onMouseLeave={(e)=>e.currentTarget.style.color='hsl(var(--ink-300))'}>{t}</a>;
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 28, padding: '18px 40px', background: 'rgba(10,10,11,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid hsl(var(--ink-800))' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../../assets/logo/emblem-white.png" alt="" style={{ height: 24 }} />
        <span style={{ font: 'var(--weight-bold) var(--text-xl)/1 var(--font-display)', letterSpacing: '0.2em', color: 'hsl(var(--ink-0))' }}>PEZZA</span>
      </div>
      <div style={{ flex: 1 }} />
      {link('Releases')}{link('Sets')}{link('Live')}{link('About')}
      <window.PezzaDesignSystem_8fc740.Button variant="accent" size="sm" iconLeft={<I.Play size={13} />}>Latest set</window.PezzaDesignSystem_8fc740.Button>
    </nav>
  );
}

function Hero({ onPlay }) {
  const I = window.SiteIcons;
  return (
    <header style={{ position: 'relative', minHeight: 460, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img src={BG.smoke} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0.85) 100%)' }} />
      <div style={{ position: 'relative', padding: '0 40px 48px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ font: 'var(--type-meta)', color: 'hsl(var(--accent))', letterSpacing: 'var(--tracking-wide)' }}>NOW PLAYING</span>
          <span style={{ font: 'var(--type-meta)', color: 'hsl(var(--ink-400))' }}>· CAT# PZA-007</span>
        </div>
        <h1 style={{ font: 'var(--weight-bold) var(--text-8xl)/0.95 var(--font-display)', color: 'hsl(var(--ink-0))', margin: 0, letterSpacing: '-0.02em', maxWidth: 800 }}>Subsurface</h1>
        <p style={{ font: 'var(--type-body)', fontSize: 'var(--text-2xl)', color: 'hsl(var(--ink-200))', maxWidth: 520, marginTop: 16 }}>Four tracks of deep, weightless techno. Mastered for the floor and the headphones alike.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <window.PezzaDesignSystem_8fc740.Button variant="accent" size="lg" iconLeft={<I.Play size={16} />} onClick={onPlay}>Play EP</window.PezzaDesignSystem_8fc740.Button>
          <window.PezzaDesignSystem_8fc740.Button variant="secondary" size="lg" style={{ color: 'hsl(var(--ink-0))', borderColor: 'hsl(var(--ink-600))' }}>Bandcamp</window.PezzaDesignSystem_8fc740.Button>
        </div>
      </div>
    </header>
  );
}

function Player({ release, playing, progress, onToggle, activeTrack, setActiveTrack }) {
  const { WaveBar, MetaRow, IconButton, Badge } = window.PezzaDesignSystem_8fc740;
  const I = window.SiteIcons;
  return (
    <section className="on-dark" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40, alignItems: 'start' }}>
      {/* Cover */}
      <div>
        <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid hsl(var(--ink-800))' }}>
          <img src={BG[release.bg]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,11,0.25)', display: 'grid', placeItems: 'center' }}>
            <img src="../../assets/logo/emblem-white.png" alt="" style={{ width: 64, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,.5))' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <Badge tone="accent">{release.kind}</Badge>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-400))' }}>CAT# {release.cat} · {release.year}</span>
        </div>
        <h2 style={{ font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)', color: 'hsl(var(--ink-0))', margin: '10px 0 0' }}>{release.title}</h2>
      </div>

      {/* Player + tracklist */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', background: 'hsl(var(--ink-900))', border: '1px solid hsl(var(--ink-800))', borderRadius: 'var(--radius-lg)' }}>
          <button onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'} style={{
            width: 48, height: 48, flex: 'none', borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'hsl(var(--accent))', color: 'hsl(var(--accent-ink))', display: 'grid', placeItems: 'center',
            boxShadow: playing ? 'var(--glow-accent)' : 'none', transition: 'box-shadow var(--dur-base) var(--ease-out)',
          }}>
            {playing ? <I.Pause size={18} /> : <I.Play size={18} />}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-0))' }}>{release.tracks[activeTrack].t}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-400))' }}>{release.tracks[activeTrack].bpm} BPM · {release.tracks[activeTrack].key}</span>
            </div>
            <WaveBar progress={progress} height={40} seed={activeTrack * 5 + 3} />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          {release.tracks.map((t, i) => (
            <MetaRow key={i} index={i + 1} title={t.t} bpm={t.bpm} musicKey={t.key} duration={t.dur}
              active={i === activeTrack} onClick={() => setActiveTrack(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Discography({ onSelect, currentId }) {
  const { Card } = window.PezzaDesignSystem_8fc740;
  return (
    <section style={{ padding: '20px 40px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
        <h2 style={{ font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)', color: 'hsl(var(--ink-0))', margin: 0 }}>Releases</h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-500))' }}>{window.SiteData.releases.length} ON PEZZA REC.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        {window.SiteData.releases.map(r => {
          const on = r.id === currentId;
          return (
            <button key={r.id} onClick={() => onSelect(r.id)} style={{ textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: on ? '1.5px solid hsl(var(--accent))' : '1px solid hsl(var(--ink-800))', transition: 'border-color var(--dur-base) var(--ease-out)' }}>
                <img src={BG[r.bg]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,11,0.3)', display: 'grid', placeItems: 'center' }}>
                  <img src="../../assets/logo/emblem-white.png" alt="" style={{ width: 38 }} />
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ font: 'var(--weight-semi) var(--text-xl)/1.2 var(--font-display)', color: on ? 'hsl(var(--accent))' : 'hsl(var(--ink-0))' }}>{r.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'hsl(var(--ink-500))' }}>{r.cat}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Dates() {
  const I = window.SiteIcons;
  const { Button } = window.PezzaDesignSystem_8fc740;
  return (
    <section style={{ padding: '20px 40px 56px' }}>
      <h2 style={{ font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)', color: 'hsl(var(--ink-0))', margin: '0 0 20px' }}>Live</h2>
      <div style={{ border: '1px solid hsl(var(--ink-800))', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {window.SiteData.dates.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '18px 22px', borderTop: i ? '1px solid hsl(var(--ink-800))' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', color: 'hsl(var(--accent))', width: 70 }}>{d.date}</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--weight-semi) var(--text-2xl)/1.1 var(--font-display)', color: 'hsl(var(--ink-0))' }}>{d.city}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-500))' }}>{d.venue}</div>
            </div>
            {d.status === 'soldout'
              ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-500))', letterSpacing: '0.08em' }}>SOLD OUT</span>
              : <Button variant="secondary" size="sm" style={{ color: 'hsl(var(--ink-0))', borderColor: 'hsl(var(--ink-600))' }} iconRight={<I.Arrow size={14} />}>Tickets</Button>}
          </div>
        ))}
      </div>
    </section>
  );
}

function SiteFooter() {
  const I = window.SiteIcons;
  const social = (Icon) => <a href="#" style={{ color: 'hsl(var(--ink-400))', display: 'inline-flex' }} onMouseEnter={(e)=>e.currentTarget.style.color='hsl(var(--accent))'} onMouseLeave={(e)=>e.currentTarget.style.color='hsl(var(--ink-400))'}><Icon size={20} /></a>;
  return (
    <footer style={{ padding: '32px 40px', borderTop: '1px solid hsl(var(--ink-800))', display: 'flex', alignItems: 'center', gap: 16 }}>
      <img src="../../assets/logo/emblem-white.png" alt="" style={{ height: 22 }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--ink-500))' }}>© 2026 PEZZA RECORDINGS</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 18 }}>{social(I.Soundcloud)}{social(I.Bandcamp)}{social(I.Instagram)}</div>
    </footer>
  );
}

function SiteApp() {
  const [currentId, setCurrentId] = React.useState('pza007');
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0.32);
  const [activeTrack, setActiveTrack] = React.useState(0);
  const release = window.SiteData.releases.find(r => r.id === currentId);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => (p >= 1 ? 0 : p + 0.012)), 180);
    return () => clearInterval(id);
  }, [playing]);

  const selectRelease = (id) => { setCurrentId(id); setActiveTrack(0); setProgress(0.05); };

  return (
    <div className="on-dark" style={{ background: 'hsl(var(--ink-1000))', minHeight: '100%', fontFamily: 'var(--font-ui)' }}>
      <SiteNav />
      <Hero onPlay={() => setPlaying(true)} />
      <Player release={release} playing={playing} progress={progress}
        onToggle={() => setPlaying(p => !p)} activeTrack={activeTrack} setActiveTrack={setActiveTrack} />
      <Discography onSelect={selectRelease} currentId={currentId} />
      <Dates />
      <SiteFooter />
    </div>
  );
}
window.SiteApp = SiteApp;
