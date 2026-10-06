import * as React from 'react';
import { TreeView } from '@/components/ui/tree-view';

const nodes = [
  { id: 'co', label: 'Acme Inc', children: [
    { id: 'eng', label: 'Engineering', children: [{ id: 'a', label: 'Aarav Mehta' }, { id: 'b', label: 'Isha Rao' }] },
    { id: 'des', label: 'Design', children: [{ id: 'c', label: 'Kabir Shah' }] },
    { id: 'ceo', label: 'Leadership' },
  ] },
];

export default function TreeViewDemo() {
  const [sel, setSel] = React.useState('a');
  return <TreeView className="w-64 rounded-lg border p-2" nodes={nodes} selected={sel} onSelect={(n) => setSel(n.id)} />;
}
