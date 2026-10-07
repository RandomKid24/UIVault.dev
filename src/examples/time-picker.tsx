import * as React from 'react';
import { TimePicker } from '@/components/ui/time-picker';

export default function TimePickerDemo() {
  const [a, setA] = React.useState('09:30');
  const [b, setB] = React.useState('17:45');
  return (
    <div className="grid justify-items-start gap-4">
      <div className="grid gap-1.5"><span className="text-xs text-muted-foreground">Shift starts (12-hour)</span><TimePicker value={a} onValueChange={setA} minuteStep={15} /></div>
      <div className="grid gap-1.5"><span className="text-xs text-muted-foreground">Shift ends (24-hour)</span><TimePicker value={b} onValueChange={setB} hour12={false} minuteStep={15} /></div>
      <p className="text-xs text-muted-foreground">Click a part, then use arrow keys or type. Value: {a} to {b}</p>
    </div>
  );
}
