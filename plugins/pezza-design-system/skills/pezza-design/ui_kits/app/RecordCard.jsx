/* Record card + status mapping for the generic app shell. */
function appStatusBadge(status, Badge) {
  const map = {
    active:   { tone: 'ok',      label: 'Active' },
    review:   { tone: 'warn',    label: 'Review' },
    draft:    { tone: 'neutral', label: 'Draft' },
    archived: { tone: 'neutral', label: 'Archived' },
  };
  const s = map[status] || map.draft;
  return <Badge tone={s.tone} dot={status !== 'draft' && status !== 'archived'}>{s.label}</Badge>;
}

function RecordCard({ item, onStar }) {
  const { Card, Badge, IconButton } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  const dim = item.status === 'archived';
  return (
    <Card padding="md" interactive style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ font: 'var(--weight-semi) var(--text-2xl)/1.15 var(--font-display)', color: dim ? 'hsl(var(--text-muted))' : 'hsl(var(--text-strong))' }}>{item.name}</div>
        <button onClick={(e)=>{ e.stopPropagation(); onStar(item.id); }} aria-label="Star" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: item.starred ? 'hsl(var(--accent))' : 'hsl(var(--text-faint))', display: 'inline-flex', padding: 2 }}>
          {item.starred ? <I.StarFill size={16} /> : <I.Star size={16} />}
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontFamily: 'var(--font-mono)' }}>
        <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, color: dim ? 'hsl(var(--text-faint))' : 'hsl(var(--text-strong))', lineHeight: 1 }}>{item.count}</span>
        <span style={{ fontSize: 'var(--text-sm)', color: 'hsl(var(--text-muted))', letterSpacing: 'var(--tracking-mono)' }}>entries</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid hsl(var(--border-hair))' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'hsl(var(--text-faint))' }}>{item.meta}</span>
        {appStatusBadge(item.status, Badge)}
      </div>
    </Card>
  );
}
window.AppRecordCard = RecordCard;
window.appStatusBadge = appStatusBadge;
