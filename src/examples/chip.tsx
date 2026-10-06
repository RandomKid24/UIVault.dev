import * as React from 'react';
import { ChipGroup } from '@/components/ui/chip';

export default function ChipDemo() {
  const [v, setV] = React.useState(['Engineering']);
  return <ChipGroup value={v} onValueChange={setV} options={['Engineering', 'Design', 'Sales', 'Finance', 'People Ops']} />;
}
