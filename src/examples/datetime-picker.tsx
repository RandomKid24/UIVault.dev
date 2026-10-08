import * as React from 'react';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { Field } from '@/components/ui/label';
import { addDays, startOfDay } from '@/components/ui/calendar';

export default function DateTimePickerDemo() {
  const [at, setAt] = React.useState<Date>();
  const today = startOfDay(new Date());
  return (
    <div className="w-full max-w-xs">
      <Field label="Interview slot" htmlFor="slot" hint={at ? at.toISOString() : 'Pick a day, then set the time.'}>
        <DateTimePicker id="slot" value={at} onChange={setAt} disabledDays={(d) => d < addDays(today, 0)} />
      </Field>
    </div>
  );
}
