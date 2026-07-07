/* Generic app sidebar — emblem lockup, nav + groups, settings footer. */
function AppSidebar({ active, onSelect, counts }) {
  const I = window.AppIcons;
  const navItem = (id, label, Icon, count) => {
    const on = active === id;
    return (
      <button key={id} onClick={() => onSelect(id)} style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
        padding: '9px 12px', border: 'none', borderRadius: 'var(--radius-sm)',
        background: on ? 'var(--bg-raised)' : 'transparent',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        cursor: 'pointer', textAlign: 'left',
        font: 'var(--weight-medium) var(--text-sm)/1 var(--font-ui)',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      }}
        onMouseEnter={(e)=>{ if(!on) e.currentTarget.style.background='var(--bg-sunken)'; }}
        onMouseLeave={(e)=>{ if(!on) e.currentTarget.style.background='transparent'; }}>
        <Icon size={18} style={{ color: on ? 'var(--accent)' : 'currentColor', flex: 'none' }} />
        <span style={{ flex: 1 }}>{label}</span>
        {count != null && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{count}</span>}
      </button>
    );
  };
  const heading = (t) => <div style={{ font: 'var(--type-meta)', color: 'var(--text-faint)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', padding: '0 12px 8px' }}>{t}</div>;

  return (
    <aside style={{ width: 232, flex: 'none', height: '100%', boxSizing: 'border-box',
      background: 'var(--bg-surface)', borderRight: '1px solid var(--border-soft)',
      display: 'flex', flexDirection: 'column', padding: 'var(--space-5) var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 22px' }}>
        <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--ink-1000)', display: 'grid', placeItems: 'center' }}>
          <img src="../../assets/logo/emblem-white.png" alt="" style={{ width: 17 }} />
        </span>
        <span style={{ font: 'var(--weight-bold) var(--text-md)/1 var(--font-display)', letterSpacing: '0.18em', color: 'var(--text-strong)' }}>PEZZA</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {window.AppData.nav.map(n => navItem(n.id, n.name, I[n.icon], n.id === 'all' ? counts.all : null))}
      </nav>

      {heading('Groups')}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {window.AppData.groups.map(g => navItem(g.id, g.name, I[g.icon], counts[g.id]))}
      </nav>

      <div style={{ flex: 1 }} />
      <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '9px 12px',
        border: 'none', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'var(--text-muted)',
        cursor: 'pointer', font: 'var(--weight-medium) var(--text-sm)/1 var(--font-ui)' }}>
        <I.Settings size={18} /> <span>Settings</span>
      </button>
    </aside>
  );
}
window.AppSidebar = AppSidebar;
