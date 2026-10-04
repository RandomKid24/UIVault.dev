import * as React from 'react';
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker';
import type { DateRange } from '@/components/ui/calendar';
import { Field } from '@/components/ui/label';
import { addDays, startOfDay } from '@/components/ui/calendar';

export default function DatePickerDemo() {
  const [joined, setJoined] = React.useState<Date>();
  const [leave, setLeave] = React.useState<DateRange>();
  const today = startOfDay(new Date());
  return (
    <div className="grid w-full max-w-xs gap-4">
      <Field label="Joining date" htmlFor="join" hint="Clear it with the x.">
        <DatePicker id="join" value={joined} onChange={setJoined} clearable />
      </Field>
      <Field label="Leave dates" htmlFor="leave" hint="Past dates are disabled.">
        <DateRangePicker id="leave" value={leave} onChange={setLeave} disabledDays={(d) => d < addDays(today, 0)} clearable />
      </Field>
    </div>
  );
}
