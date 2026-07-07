/* Generic web-app shell — sidebar, topbar, overview stats, items grid/list,
   activity feed, add slide-over. A neutral starter for Pezza's personal apps. */
function AppShell() {
  const NS = window.PezzaDesignSystem_8fc740;
  const { Button, IconButton, Input, Badge, Card } = NS;
  const I = window.AppIcons;

  const [items, setItems] = React.useState(window.AppData.items);
  const [view, setView] = React.useState('overview');
  const [layout, setLayout] = React.useState('grid');
  const [query, setQuery] = React.useState('');
  const [adding, setAdding] = React.useState(false);

  const counts = React.useMemo(() => {
    const c = { all: items.length };
    window.AppData.groups.forEach(g => c[g.id] = items.filter(i => i.group === g.id).length);
    return c;
  }, [items]);

  const star = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, starred: !i.starred } : i));
  const addItem = ({ name, group, status }) => {
    setItems(prev => [{ id: Date.now(), name, group, status, meta: 'Just now', count: 0, starred: false }, ...prev]);
    setAdding(false);
    setView('all');
  };

  const isGroup = window.AppData.groups.some(g => g.id === view);
  const visible = items.filter(i => {
    const inView = view === 'all' || view === 'overview' ? true : view === 'starred' ? i.starred : isGroup ? i.group === view : true;
    return inView && i.name.toLowerCase().includes(query.toLowerCase());
  });

  const titleMap = { overview: 'Overview', all: 'All items', starred: 'Starred', activity: 'Activity' };
  const groupObj = window.AppData.groups.find(g => g.id === view);
  const title = titleMap[view] || (groupObj ? groupObj.name : 'Items');

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-app)', fontFamily: 'var(--font-ui)' }}>
      <window.AppSidebar active={view} onSelect={setView} counts={counts} />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-soft)', background: 'var(--bg-surface)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: 'var(--type-meta)', color: 'var(--text-faint)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Workspace</div>
            <h1 style={{ font: 'var(--weight-bold) var(--text-2xl)/1 var(--font-display)', color: 'var(--text-strong)', margin: '4px 0 0', letterSpacing: '-0.01em' }}>{title}</h1>
          </div>
          <div style={{ width: 240 }}>
            <Input placeholder="Search…" prefix={<I.Search size={16} />} value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>
          <Button variant="primary" iconLeft={<I.Plus size={15} />} onClick={()=>setAdding(true)}>New item</Button>
        </header>

        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-6)' }}>
          {view === 'overview' && <OverviewStats />}
          {view === 'activity' ? (
            <ActivityFeed />
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <h2 style={{ font: 'var(--weight-semi) var(--text-lg)/1 var(--font-display)', color: 'var(--text-strong)', margin: 0 }}>{view === 'overview' ? 'Recent items' : title}</h2>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{visible.length}</span>
                <div style={{ flex: 1 }} />
                <IconButton label="Grid view" active={layout==='grid'} onClick={()=>setLayout('grid')}><I.Grid size={17} /></IconButton>
                <IconButton label="List view" active={layout==='list'} onClick={()=>setLayout('list')}><I.List size={17} /></IconButton>
              </div>
              {visible.length === 0 ? <EmptyState query={query} /> : layout === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 'var(--space-4)' }}>
                  {visible.map(i => <window.AppRecordCard key={i.id} item={i} onStar={star} />)}
                </div>
              ) : <ListView items={visible} onStar={star} />}
            </>
          )}
        </div>
      </main>

      <window.AppAddPanel open={adding} onClose={()=>setAdding(false)} onAdd={addItem} />
    </div>
  );
}

function OverviewStats() {
  const { Card } = window.PezzaDesignSystem_8fc740;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-7)' }}>
      {window.AppData.stats.map((s, i) => (
        <Card key={i} padding="md">
          <div style={{ font: 'var(--type-meta)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>{s.label}</div>
          <div style={{ font: 'var(--weight-bold) var(--text-3xl)/1 var(--font-display)', color: 'var(--text-strong)', margin: '10px 0 6px', letterSpacing: '-0.02em' }}>{s.value}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--accent-dim)' }}>{s.delta}</div>
        </Card>
      ))}
    </div>
  );
}

function ListView({ items, onStar }) {
  const { Card, Badge } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  return (
    <Card padding="none" style={{ overflow: 'hidden' }}>
      {items.map((it, idx) => (
        <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px var(--space-5)', borderTop: idx ? '1px solid var(--border-hair)' : 'none' }}>
          <button onClick={()=>onStar(it.id)} aria-label="Star" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: it.starred ? 'var(--accent)' : 'var(--text-faint)', display: 'inline-flex' }}>
            {it.starred ? <I.StarFill size={15} /> : <I.Star size={15} />}
          </button>
          <span style={{ flex: 1, font: 'var(--weight-medium) var(--text-md)/1 var(--font-ui)', color: 'var(--text-strong)' }}>{it.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', width: 130, textAlign: 'right' }}>{it.meta}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-strong)', width: 40, textAlign: 'right' }}>{it.count}</span>
          <div style={{ width: 92, display: 'flex', justifyContent: 'flex-end' }}>{window.appStatusBadge(it.status, Badge)}</div>
        </div>
      ))}
    </Card>
  );
}

function ActivityFeed() {
  const { Card } = window.PezzaDesignSystem_8fc740;
  return (
    <div style={{ maxWidth: 560 }}>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        {window.AppData.activity.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px var(--space-5)', borderTop: i ? '1px solid var(--border-hair)' : 'none' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flex: 'none' }} />
            <span style={{ flex: 1, font: 'var(--text-sm)/1.4 var(--font-ui)', color: 'var(--text-body)' }}>
              <strong style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{a.who}</strong> {a.what} <strong style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{a.target}</strong>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{a.when}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function EmptyState({ query }) {
  const I = window.AppIcons;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '80px 0', color: 'var(--text-faint)' }}>
      <I.Grid size={38} />
      <p style={{ font: 'var(--type-body)', margin: 0 }}>{query ? `No items match “${query}”` : 'Nothing here yet'}</p>
    </div>
  );
}

window.AppShell = AppShell;
