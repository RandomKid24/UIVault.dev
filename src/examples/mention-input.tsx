import * as React from 'react';
import { MentionInput } from '@/components/ui/mention-input';

const people = [
  { id: '1', name: 'Aarav', role: 'Engineering' },
  { id: '2', name: 'Diya', role: 'Design' },
  { id: '3', name: 'Rohan', role: 'Sales' },
  { id: '4', name: 'Isha', role: 'People Ops' },
  { id: '5', name: 'Kabir', role: 'Finance' },
];

export default function MentionInputDemo() {
  const [text, setText] = React.useState('Looping in @');
  return (
    <div className="w-full max-w-sm pb-48">
      <MentionInput value={text} onChange={setText} people={people} />
      <p className="mt-2 px-1 text-xs text-muted-foreground">Type @ then a name. Arrow keys and Enter pick.</p>
    </div>
  );
}
