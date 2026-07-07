/* New-item slide-over panel for the generic app shell. */
function AddPanel({ open, onClose, onAdd }) {
  const { Button, Input, Select } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  const [name, setName] = React.useState('');
  const [group, setGroup] = React.useState('inbox');
  const [status, setStatus] = React.useState('active');

  React.useEffect(() => { if (open) { setName(''); setGroup('inbox'); setStatus('active'); } }, [open]);

  const labelStyle = { font: 'var(--type-meta)', color: 'hsl(var(--text-muted))', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' };

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,11,0.32)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) var(--ease-out)', zIndex: 20 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, zIndex: 21,
        background: 'hsl(var(--bg-surface))', borderLeft: '1px solid hsl(var(--border-soft))',
        boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)', boxSizing: 'border-box',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-base) var(--ease-crossfade)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ font: 'var(--type-heading)', fontSize: 'var(--text-3xl)', color: 'hsl(var(--text-strong))', margin: 0 }}>New item</h2>
          <button onClick={onClose} aria-label="Close" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'hsl(var(--text-muted))' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>Name</span>
          <Input placeholder="e.g. Weekly digest" value={name} onChange={(e)=>setName(e.target.value)} autoFocus />
        </label>

        <div style={{ display: 'flex', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <span style={labelStyle}>Group</span>
            <Select value={group} onChange={(e)=>setGroup(e.target.value)} style={{ width: '100%' }}>
              {window.AppData.groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </Select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <span style={labelStyle}>Status</span>
            <Select value={status} onChange={(e)=>setStatus(e.target.value)} style={{ width: '100%' }}>
              <option value="active">Active</option>
              <option value="review">Review</option>
              <option value="draft">Draft</option>
            </Select>
          </label>
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" block onClick={onClose}>Cancel</Button>
          <Button variant="primary" block iconLeft={<I.Plus size={15} />} onClick={() => { if (name.trim()) onAdd({ name: name.trim(), group, status }); }}>Create item</Button>
        </div>
      </div>
    </>
  );
}
window.AppAddPanel = AddPanel;
