import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { SortableList } from '@/components/ui/sortable-list';

interface Step { id: string; title: string; owner: string; tag: string }

export default function SortableListDemo() {
  const [steps, setSteps] = React.useState<Step[]>([
    { id: 'a', title: 'Collect documents', owner: 'Isha Nair', tag: 'HR' },
    { id: 'b', title: 'Create email and accounts', owner: 'Rohan Das', tag: 'IT' },
    { id: 'c', title: 'Assign a buddy', owner: 'Aarav Mehta', tag: 'Team' },
    { id: 'd', title: 'Schedule day-one orientation', owner: 'Meera Iyer', tag: 'HR' },
    { id: 'e', title: 'Order laptop', owner: 'Vikram Joshi', tag: 'IT' },
  ]);
  return (
    <div className="grid w-full max-w-md gap-2">
      <SortableList items={steps} onChange={setSteps} renderItem={(s, i) => (
        <div className="flex items-center gap-2">
          <span className="w-4 text-xs tabular-nums text-muted-foreground">{i + 1}</span>
          <div className="min-w-0 flex-1"><p className="truncate font-medium">{s.title}</p><p className="text-xs text-muted-foreground">{s.owner}</p></div>
          <Badge>{s.tag}</Badge>
        </div>
      )} />
      <p className="px-1 text-xs text-muted-foreground">Drag a row, or Tab to a grip and press the up and down arrows.</p>
    </div>
  );
}
