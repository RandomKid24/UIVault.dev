import * as React from 'react';
import { InlineEdit } from '@/components/ui/inline-edit';

export default function InlineEditDemo() {
  const [name, setName] = React.useState('Q4 hiring plan');
  return <div className="w-64"><InlineEdit value={name} onSave={setName} /></div>;
}
