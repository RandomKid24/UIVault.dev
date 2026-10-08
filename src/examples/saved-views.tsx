import * as React from 'react';
import { SavedViews, type SavedView } from '@/components/ui/saved-views';

export default function SavedViewsDemo() {
  const [views, setViews] = React.useState<SavedView[]>([{ id: 'v1', name: 'My open tasks' }, { id: 'v2', name: 'Overdue invoices' }, { id: 'v3', name: 'On leave this week' }]);
  const [active, setActive] = React.useState<string>();
  return (
    <SavedViews
      views={views}
      activeId={active}
      onSelect={setActive}
      onSave={(name) => { const id = `v${Date.now()}`; setViews([...views, { id, name }]); setActive(id); }}
      onDelete={(id) => { setViews(views.filter((v) => v.id !== id)); if (active === id) setActive(undefined); }}
    />
  );
}
