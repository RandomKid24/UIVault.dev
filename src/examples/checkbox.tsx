import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CheckboxDemo() {
  const [items, setItems] = React.useState({ email: true, sms: false, push: false });
  const all = Object.values(items).every(Boolean);
  const some = Object.values(items).some(Boolean);
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="all"
          checked={all ? true : some ? 'indeterminate' : false}
          onCheckedChange={(v) => setItems({ email: !!v, sms: !!v, push: !!v })}
        />
        <Label htmlFor="all" className="font-semibold">Notify me by</Label>
      </div>
      {(Object.keys(items) as (keyof typeof items)[]).map((k) => (
        <div key={k} className="ml-6 flex items-center gap-2.5">
          <Checkbox id={k} checked={items[k]} onCheckedChange={(v) => setItems({ ...items, [k]: !!v })} />
          <Label htmlFor={k} className="font-normal capitalize">{k}</Label>
        </div>
      ))}
    </div>
  );
}
