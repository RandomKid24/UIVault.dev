import * as React from 'react';
import { VirtualList } from '@/components/ui/virtual-list';

const rows = Array.from({ length: 100_000 }, (_, i) => ({ id: i + 1, name: `Employee ${i + 1}`, dept: ['Design', 'Sales', 'Finance', 'Ops'][i % 4]! }));

export default function VirtualListDemo() {
  return (
    <div className="w-full max-w-lg">
      <p className="mb-2 text-xs text-muted-foreground">100,000 rows, about 20 in the DOM at a time.</p>
      <VirtualList
        items={rows}
        rowHeight={44}
        aria-label="Employees"
        getKey={(r) => r.id}
        renderRow={(r) => (
          <div className="flex h-full items-center justify-between border-b px-4 text-sm">
            <span><span className="me-3 tabular-nums text-muted-foreground">#{r.id}</span>{r.name}</span>
            <span className="text-muted-foreground">{r.dept}</span>
          </div>
        )}
      />
    </div>
  );
}
