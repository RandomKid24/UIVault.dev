import * as React from 'react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';

export default function PullToRefreshDemo() {
  const [items, setItems] = React.useState(['Aarav punched in', 'Diya applied for leave', 'Payroll draft created']);
  const refresh = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setItems((l) => [`New update at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`, ...l]);
  };
  return (
    <div className="w-full max-w-xs">
      <PullToRefresh onRefresh={refresh} className="h-64 rounded-xl border bg-card">
        <ul className="divide-y">{items.map((t, i) => <li key={t + i} className="px-4 py-3 text-[13px]">{t}</li>)}</ul>
      </PullToRefresh>
      <p className="mt-2 px-1 text-xs text-muted-foreground">Drag down from the top (touch or mouse).</p>
    </div>
  );
}
