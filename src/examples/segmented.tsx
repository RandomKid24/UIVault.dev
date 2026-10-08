import * as React from 'react';
import { LayoutGridIcon, ListIcon } from '@/components/ui/icons';
import { Segmented } from '@/components/ui/segmented';

export default function SegmentedDemo() {
  const [range, setRange] = React.useState('30d');
  const [view, setView] = React.useState('list');
  return (
    <div className="grid gap-4">
      <Segmented value={range} onValueChange={setRange} options={[{ value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }, { value: '90d', label: '90 days' }]} />
      <Segmented value={view} onValueChange={setView} options={[{ value: 'list', label: <><ListIcon /> List</> }, { value: 'grid', label: <><LayoutGridIcon /> Grid</> }]} />
    </div>
  );
}
